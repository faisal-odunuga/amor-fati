import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getContactHref(item: any) {
  if (item.type === 'email') return `mailto:${item.value}`;
  if (item.type === 'phone') return `tel:${item.value.replace(/\s/g, '')}`;
  if (item.type === 'social') return item.link;
  return '#';
}