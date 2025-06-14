import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { i18n } from '@/i18n/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  const absAmount = Math.abs(amount);
  let formatted = '';
  let suffix = '';
  if (absAmount >= 1_000_000) {
    formatted = Math.round(amount / 1_000_000).toString();
    suffix = 'M';
  } else if (absAmount >= 1_000) {
    formatted = Math.round(amount / 1_000).toString();
    suffix = 'K';
  } else {
    formatted = Math.round(amount).toString();
  }
  return formatted + (suffix ? ' ' + suffix : '');
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(d);
}
