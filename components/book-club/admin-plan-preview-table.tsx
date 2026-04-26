'use client';

import { GripVertical, LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils';
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

function MobileScheduleCard({ 
  item, 
  index, 
  onItemUpdate, 
  onMoveItem 
}: { 
  item: ScheduleDraftItem; 
  index: number; 
  onItemUpdate: (index: number, patch: Partial<ScheduleDraftItem>) => void;
  onMoveItem: (index: number, direction: -1 | 1) => void;
}) {
  const commonInputStyles = 'h-10 rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20';

  return (
    <div className='flex flex-col gap-4 border-b border-black/5 p-4 lg:hidden'>
      <div className='flex items-center justify-between'>
        <span className='text-[10px] font-bold uppercase tracking-widest text-black/40'>Day {item.dayIndex}</span>
        <div className='flex items-center gap-2'>
          <button type='button' onClick={() => onMoveItem(index, -1)} className='p-1'><GripVertical className='size-4 text-black/35' /></button>
          <button type='button' onClick={() => onMoveItem(index, 1)} className='p-1'><GripVertical className='size-4 rotate-180 text-black/35' /></button>
        </div>
      </div>
      
      <div className='grid gap-3'>
        <Input 
          value={item.date} 
          onChange={(e) => onItemUpdate(index, { date: e.target.value })} 
          placeholder='Date' 
          className={commonInputStyles} 
        />
        <Input 
          value={item.label} 
          onChange={(e) => onItemUpdate(index, { label: e.target.value })} 
          placeholder='Label' 
          className={commonInputStyles} 
        />
        <select
          value={item.type}
          onChange={(e) => onItemUpdate(index, { type: e.target.value as ScheduleItemType })}
          className={cn(commonInputStyles, 'w-full px-3 text-sm')}
        >
          {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <Input 
          value={item.description} 
          onChange={(e) => onItemUpdate(index, { description: e.target.value })} 
          placeholder='Description' 
          className={commonInputStyles} 
        />
        <Input 
          type='number'
          value={item.weight} 
          onChange={(e) => onItemUpdate(index, { weight: Number(e.target.value) })} 
          placeholder='Weight' 
          className={commonInputStyles} 
        />
      </div>
    </div>
  );
}

function DesktopScheduleRow({ 
  item, 
  index, 
  onItemUpdate, 
  onMoveItem 
}: { 
  item: ScheduleDraftItem; 
  index: number; 
  onItemUpdate: (index: number, patch: Partial<ScheduleDraftItem>) => void;
  onMoveItem: (index: number, direction: -1 | 1) => void;
}) {
  const commonInputStyles = 'h-10 rounded-none border-black/10 bg-[#faf7f1] focus-visible:ring-primary/20';

  return (
    <TableRow className='hidden lg:table-row'>
      <TableCell>
        <div className='flex items-center gap-2'>
          <button type='button' onClick={() => onMoveItem(index, -1)}><GripVertical className='size-4 text-black/35' /></button>
          <button type='button' onClick={() => onMoveItem(index, 1)}><GripVertical className='size-4 rotate-180 text-black/35' /></button>
          {item.dayIndex}
        </div>
      </TableCell>
      <TableCell><Input value={item.date} onChange={(e) => onItemUpdate(index, { date: e.target.value })} className={cn(commonInputStyles, 'min-w-32')} /></TableCell>
      <TableCell><Input value={item.label} onChange={(e) => onItemUpdate(index, { label: e.target.value })} className={cn(commonInputStyles, 'min-w-52')} /></TableCell>
      <TableCell>
        <select
          value={item.type}
          onChange={(e) => onItemUpdate(index, { type: e.target.value as ScheduleItemType })}
          className={cn(commonInputStyles, 'h-10 px-3 text-sm')}
        >
          {TYPE_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </TableCell>
      <TableCell><Input value={item.description} onChange={(e) => onItemUpdate(index, { description: e.target.value })} className={cn(commonInputStyles, 'min-w-64')} /></TableCell>
      <TableCell><Input type='number' value={item.weight} onChange={(e) => onItemUpdate(index, { weight: Number(e.target.value) })} className={cn(commonInputStyles, 'w-24')} /></TableCell>
    </TableRow>
  );
}

export function AdminPlanPreviewTable({
  items,
  title,
  isSaving,
  onTitleChange,
  onSave,
  onItemUpdate,
  onMoveItem,
}: {
  items: ScheduleDraftItem[];
  title: string;
  isSaving: boolean;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  onItemUpdate: (index: number, patch: Partial<ScheduleDraftItem>) => void;
  onMoveItem: (index: number, direction: -1 | 1) => void;
}) {
  if (items.length === 0) {
    return (
      <section className='border border-dashed border-border bg-secondary/10 p-8 text-center text-muted-foreground rounded-xl'>
        Generate a draft first. Nothing is saved automatically.
      </section>
    );
  }

  return (
    <section className='border border-black/10 bg-white p-4 shadow-[0_25px_70px_rgba(0,0,0,0.06)] rounded-xl sm:p-8'>
      <div className='mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center'>
        <div>
          <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-[#d9a517]'>Review Required</p>
          <h3 className='mt-2 font-serif text-3xl text-black'>Schedule Preview</h3>
        </div>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-end'>
          <div className='space-y-1.5'>
            <p className='text-[10px] font-bold uppercase tracking-widest text-black/40'>Internal Title</p>
            <Input 
              value={title} 
              onChange={(e) => onTitleChange(e.target.value)} 
              className='h-11 w-full rounded-none border-black/10 bg-[#faf7f1] lg:min-w-[240px]' 
            />
          </div>
          <Button 
            disabled={isSaving} 
            className='h-11 w-full rounded-none bg-[#d9a517] px-8 font-bold uppercase tracking-widest text-white hover:bg-[#b88c12] sm:w-auto' 
            onClick={() => void onSave()}
          >
            {isSaving ? <LoaderCircle className='size-4 animate-spin mr-2' /> : null}
            Commit Plan
          </Button>
        </div>
      </div>

      {/* Mobile View */}
      <div className='lg:hidden border border-black/5 rounded-lg overflow-hidden'>
        {items.map((item, index) => (
          <MobileScheduleCard 
            key={`mobile-${item.date}-${index}`} 
            item={item} 
            index={index} 
            onItemUpdate={onItemUpdate}
            onMoveItem={onMoveItem}
          />
        ))}
      </div>

      {/* Desktop View */}
      <div className='hidden lg:block overflow-hidden rounded-lg border border-black/5'>
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
              <DesktopScheduleRow 
                key={`desktop-${item.date}-${index}`} 
                item={item} 
                index={index} 
                onItemUpdate={onItemUpdate}
                onMoveItem={onMoveItem}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
