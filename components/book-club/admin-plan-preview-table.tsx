'use client';

import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { ScheduleDraftItem, ScheduleItemType } from '@/lib/book-club/types';

const TYPE_OPTIONS: ScheduleItemType[] = ['reading', 'catchup', 'implementation', 'event'];

export function AdminPlanPreviewTable({
  items,
  title,
  onTitleChange,
  onSave,
  onItemUpdate,
  onMoveItem,
}: {
  items: ScheduleDraftItem[];
  title: string;
  onTitleChange: (title: string) => void;
  onSave: () => Promise<void>;
  onItemUpdate: (index: number, patch: Partial<ScheduleDraftItem>) => void;
  onMoveItem: (index: number, direction: -1 | 1) => void;
}) {
  if (items.length === 0) {
    return (
      <section className='border border-dashed border-border bg-secondary/10 p-8 text-muted-foreground'>
        Generate a draft first. Nothing is saved automatically.
      </section>
    );
  }

  return (
    <section className='border border-border bg-background p-8'>
      <div className='mb-6 flex flex-wrap items-center justify-between gap-4'>
        <div>
          <p className='text-xs font-bold uppercase tracking-[0.3em] text-primary'>Review Required</p>
          <h3 className='mt-2 font-serif text-3xl text-foreground'>Schedule Preview</h3>
        </div>
        <div className='flex items-center gap-3'>
          <Input value={title} onChange={(event) => onTitleChange(event.target.value)} className='h-11 rounded-none border-border bg-secondary/20' />
          <Button className='rounded-none bg-primary px-5 text-primary-foreground hover:bg-primary/90' onClick={() => void onSave()}>
            Save Plan
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Label</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Weight</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={`${item.date}-${index}`}>
              <TableCell>
                <div className='flex items-center gap-2'>
                  <button type='button' onClick={() => onMoveItem(index, -1)} aria-label='Move up'>
                    <GripVertical className='size-4 text-black/35' />
                  </button>
                  <button type='button' onClick={() => onMoveItem(index, 1)} aria-label='Move down'>
                    <GripVertical className='size-4 rotate-180 text-black/35' />
                  </button>
                  {item.dayIndex}
                </div>
              </TableCell>
              <TableCell>
                <Input value={item.date} onChange={(event) => onItemUpdate(index, { date: event.target.value })} className='min-w-32 rounded-none border-border bg-secondary/20' />
              </TableCell>
              <TableCell>
                <Input value={item.label} onChange={(event) => onItemUpdate(index, { label: event.target.value })} className='min-w-52 rounded-none border-border bg-secondary/20' />
              </TableCell>
              <TableCell>
                <select
                  value={item.type}
                  onChange={(event) => onItemUpdate(index, { type: event.target.value as ScheduleItemType })}
                  className='h-10 rounded-none border border-border bg-secondary/20 px-3 text-sm'
                >
                  {TYPE_OPTIONS.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </TableCell>
              <TableCell>
                <Input value={item.description} onChange={(event) => onItemUpdate(index, { description: event.target.value })} className='min-w-64 rounded-none border-border bg-secondary/20' />
              </TableCell>
              <TableCell>
                <Input
                  value={item.weight}
                  onChange={(event) => onItemUpdate(index, { weight: Number(event.target.value) })}
                  className='w-24 rounded-none border-border bg-secondary/20'
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
