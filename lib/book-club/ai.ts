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
  const totalReadingDays = Math.ceil(totalDays / 2);

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
  let current = new Date(start);

  for (let dayIndex = 1; dayIndex <= totalDays; dayIndex++) {
    const isReadingDay = dayIndex % 2 === 1;
    const readingDaySeq = (dayIndex + 1) / 2;

    if (isReadingDay) {
      const prevPointer = Math.ceil(((readingDaySeq - 1) * units.length) / totalReadingDays);
      const currPointer = Math.ceil((readingDaySeq * units.length) / totalReadingDays);
      const slice = units.slice(prevPointer, currPointer);

      if (slice.length > 0) {
        let label: string;
        let description: string;

        if (input.mode === 'chapters') {
          label = `Read: ${slice.join(', ')}`;
          description = `Focus on extracting the core philosophy from: ${slice.join(', ')}`;
        } else {
          const first = slice[0] as { start: number; end: number };
          const last = slice[slice.length - 1] as { start: number; end: number };
          label = `Read pages ${first.start}-${last.end}`;
          description = `Deep work session covering pages ${first.start}-${last.end}`;
        }

        items.push({
          label,
          description,
          type: 'reading',
          weight: 1,
          date: current.toISOString().split('T')[0],
          dayIndex,
          book_id: input.bookId,
        });
      } else {
        items.push({
          label: 'Consolidation Day',
          description: 'Review previous notes and prepare for integration.',
          type: 'catchup',
          weight: 0.5,
          date: current.toISOString().split('T')[0],
          dayIndex,
          book_id: input.bookId,
        });
      }
    } else {
      items.push({
        label: 'Reflection & Integration',
        description: 'Translate the reading into one visible action and record proof.',
        type: 'implementation',
        weight: 1.5,
        date: current.toISOString().split('T')[0],
        dayIndex,
        book_id: input.bookId,
      });
    }

    current.setUTCDate(current.getUTCDate() + 1);
  }

  return items;
}
