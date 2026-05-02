import { type ScheduleDraftItem } from '@/lib/book-club/types';

/**
 * Splits a single page range into N equal units.
 */
function performSmartSplit(start: number, end: number, unitsCount: number) {
  const totalPages = end - start + 1;
  const pagesPerDay = totalPages / unitsCount;
  
  const units = [];
  for (let i = 0; i < unitsCount; i++) {
    units.push({
      start: Math.floor(start + i * pagesPerDay),
      end: Math.floor(start + (i + 1) * pagesPerDay - 1)
    });
  }
  if (units.length > 0) units[units.length - 1].end = end;
  return units;
}

/**
 * Parses the raw input string into units (chapters or page ranges).
 */
function parseInputUnits(input: string, mode: 'chapters' | 'pages', totalReadingDays: number) {
  if (!input || !input.trim()) return [];

  if (mode === 'chapters') {
    return input.split('\n').map(c => c.trim()).filter(Boolean);
  }

  const rawRanges = input.split('\n').map(range => {
    const parts = range.split('-').map(s => s.trim());
    const s = Number(parts[0]);
    const e = Number(parts[1] ?? parts[0]);
    return { start: s, end: e };
  }).filter(p => !isNaN(p.start));

  // Smart Split logic if only one range provided
  if (rawRanges.length === 1 && totalReadingDays > 1) {
    return performSmartSplit(rawRanges[0].start, rawRanges[0].end, totalReadingDays);
  }

  return rawRanges;
}

function formatReadingLabel(
  slice: Array<string | { start: number; end: number }>,
  mode: 'chapters' | 'pages'
) {
  if (mode === 'chapters') {
    const chapters = slice as string[];
    return {
      label: `Read: ${chapters.join(', ')}`,
      description: `Read and capture the key ideas from ${chapters.join(', ')}.`,
    };
  }

  const ranges = slice as Array<{ start: number; end: number }>;
  const first = ranges[0];
  const last = ranges.at(-1)!;

  return {
    label: `Read pages ${first.start}-${last.end}`,
    description: `Read pages ${first.start}-${last.end} and document the core takeaways.`,
  };
}

export async function generateScheduleDraft(input: {
  startDate: string;
  endDate: string;
  input: string;
  bookId: string;
  mode: 'chapters' | 'pages';
  title: string;
  totalPages?: number;
  totalChapters?: number;
}): Promise<ScheduleDraftItem[]> {
  const start = new Date(`${input.startDate}T00:00:00Z`);
  const end = new Date(`${input.endDate}T00:00:00Z`);

  const totalDays = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const readingDates: string[] = [];
  const dates: Date[] = [];

  for (let offset = 0; offset < totalDays; offset++) {
    const current = new Date(start);
    current.setUTCDate(start.getUTCDate() + offset);
    dates.push(current);

    const weekday = current.getUTCDay();
    if (weekday >= 1 && weekday <= 5) {
      readingDates.push(current.toISOString().split('T')[0]);
    }
  }

  const totalReadingDays = readingDates.length;

  let units = parseInputUnits(input.input, input.mode, totalReadingDays);

  // Fallback to book metadata if input is empty
  if (units.length === 0) {
    if (input.mode === 'chapters' && input.totalChapters) {
      units = Array.from({ length: input.totalChapters }, (_, i) => `Chapter ${i + 1}`);
    } else if (input.mode === 'pages' && input.totalPages) {
      units = performSmartSplit(1, input.totalPages, totalReadingDays);
    }
  }

  const items: ScheduleDraftItem[] = [];
  for (let dayIndex = 0; dayIndex < dates.length; dayIndex++) {
    const current = dates[dayIndex];
    const date = current.toISOString().split('T')[0];
    const weekday = current.getUTCDay();

    if (weekday >= 1 && weekday <= 5) {
      const readingDaySeq = readingDates.indexOf(date) + 1;
      const prevPointer = Math.ceil(((readingDaySeq - 1) * units.length) / Math.max(totalReadingDays, 1));
      const currPointer = Math.ceil((readingDaySeq * units.length) / Math.max(totalReadingDays, 1));
      const slice = units.slice(prevPointer, currPointer);
      const fallbackStart = units.at(Math.max(prevPointer - 1, 0));

      if (slice.length > 0) {
        const { label, description } = formatReadingLabel(slice, input.mode);
        items.push({
          label,
          description,
          type: 'reading',
          weight: 1,
          date,
          dayIndex: dayIndex + 1,
          book_id: input.bookId,
        });
        continue;
      }

      if (fallbackStart) {
        const fallbackSlice = [fallbackStart];
        const { label, description } = formatReadingLabel(fallbackSlice, input.mode);
        items.push({
          label: `${label} review`,
          description: `Use this slot to review earlier reading, notes, and highlights. ${description}`,
          type: 'reading',
          weight: 1,
          date,
          dayIndex: dayIndex + 1,
          book_id: input.bookId,
        });
        continue;
      }

      items.push({
        label: 'Reading Review',
        description: 'Review prior notes, underline major ideas, and prepare for the weekend checkpoints.',
        type: 'reading',
        weight: 1,
        date,
        dayIndex: dayIndex + 1,
        book_id: input.bookId,
      });
      continue;
    }

    if (weekday === 6) {
      items.push({
        label: 'Catch-up Day',
        description: 'Close any missed reading, clean up annotations, and prepare your weekly summary.',
        type: 'catchup',
        weight: 0.5,
        date,
        dayIndex: dayIndex + 1,
        book_id: input.bookId,
      });
      continue;
    }

    items.push({
      label: 'Implementation & Documentation',
      description: 'Turn the week’s reading into action, document the result, and capture proof of execution.',
      type: 'implementation',
      weight: 1.5,
      date,
      dayIndex: dayIndex + 1,
      book_id: input.bookId,
    });
  }

  return items;
}
