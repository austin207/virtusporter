import type { ReactNode } from 'react';
import { toast as sonner } from 'sonner';

// Single toast system: this keeps the old shadcn `toast({ title, description, variant })` API
// used across the app, but renders through Sonner (mounted once in App.tsx).

interface ToastInput {
  title?: ReactNode;
  description?: ReactNode;
  variant?: 'default' | 'destructive';
  duration?: number;
}

function toast({ title, description, variant, duration }: ToastInput) {
  const opts = { description, duration };
  const id = variant === 'destructive' ? sonner.error(title ?? 'Error', opts) : sonner(title ?? '', opts);
  return { id, dismiss: () => sonner.dismiss(id) };
}

function useToast() {
  return { toast, dismiss: (id?: string | number) => sonner.dismiss(id) };
}

export { useToast, toast };
