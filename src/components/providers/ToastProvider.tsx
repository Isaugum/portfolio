'use client';
import { Toaster, toast } from 'sonner';

export function ToastProvider() {
  return <Toaster position='bottom-right' richColors />;
}

export function showToast(message: string) {
  toast(message, { closeButton: true });
}
