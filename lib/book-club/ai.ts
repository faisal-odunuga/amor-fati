import { eachDayOfInterval, formatISO } from 'date-fns';
import { createScheduleDraftSchema, type ScheduleDraftItem, type ScheduleItemType } from '@/lib/book-club/types';
import { getWeightForType } from '@/lib/book-club/progress';

const OPENAI_ENDPOINT = 'https://api.openai.com/v1/responses';

function inferTypeFromDate(day: Date): ScheduleItemType {
  if (day.getUTCDay() === 5) {
    return 'catchup';
  }

  if (day.getUTCDay() === 6) {
    return 'implementation';
  }

  return 'reading';
}

function buildDeterministicDraft(input: {
  startDate: string;
  endDate: string;
  chapters: string[];
}): ScheduleDraftItem[] {
  const days = eachDayOfInterval({
    start: new Date(`${input.startDate}T00:00:00Z`),
    end: new Date(`${input.endDate}T00:00:00Z`),
  });

  return days.map((day, index) => {
    const type = index === 10 ? 'event' : inferTypeFromDate(day);
    const chapter = input.chapters[index % input.chapters.length] ?? `Chapter ${index + 1}`;

    return {
      date: formatISO(day, { representation: 'date' }),
      dayIndex: index + 1,
      label:
        type === 'event'
          ? 'Live integration event'
          : type === 'implementation'
            ? `Implementation: ${chapter}`
            : type === 'catchup'
              ? 'Catch-up and reflection'
              : chapter,
      description:
        type === 'event'
          ? 'Host a guided discussion or community event to compound the reading.'
          : type === 'implementation'
            ? 'Translate the reading into one visible action and record proof.'
            : type === 'catchup'
              ? 'Recover unfinished chapters and consolidate your notes.'
              : 'Read, annotate, and extract the one decision that must change your behavior.',
      type,
      weight: getWeightForType(type),
    };
  });
}

export async function generateScheduleDraft(input: {
  startDate: string;
  endDate: string;
  chapters: string[];
  title: string;
}) {
  const parsed = createScheduleDraftSchema.parse(input);

  if (!process.env.OPENAI_API_KEY) {
    return buildDeterministicDraft(parsed);
  }

  const prompt = [
    'Distribute these chapters across the available days.',
    'Assign Fridays to catch-up.',
    'Assign Saturdays to implementation.',
    'Insert optional event days only when useful.',
    'Return strict JSON in the form [{ date, dayIndex, label, description, type, weight }].',
    `Title: ${parsed.title}`,
    `Start date: ${parsed.startDate}`,
    `End date: ${parsed.endDate}`,
    `Chapters: ${parsed.chapters.join(' | ')}`,
  ].join('\n');

  const response = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_SCHEDULE_MODEL ?? 'gpt-4.1-mini',
      input: prompt,
      text: {
        format: {
          type: 'json_schema',
          name: 'schedule_draft',
          schema: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              required: ['date', 'dayIndex', 'label', 'description', 'type', 'weight'],
              properties: {
                date: { type: 'string' },
                dayIndex: { type: 'number' },
                label: { type: 'string' },
                description: { type: 'string' },
                type: {
                  type: 'string',
                  enum: ['reading', 'catchup', 'implementation', 'event'],
                },
                weight: { type: 'number' },
              },
            },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    return buildDeterministicDraft(parsed);
  }

  const payload = await response.json();
  const outputText = payload.output?.[0]?.content?.[0]?.text;

  if (!outputText) {
    return buildDeterministicDraft(parsed);
  }

  return JSON.parse(outputText) as ScheduleDraftItem[];
}
