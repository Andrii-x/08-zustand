'use client';

import { useEffect } from 'react';
import css from '@/app/error.module.css';

interface NotesErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NotesError({ error, reset }: NotesErrorProps) {
  useEffect(() => {
    console.error('Unable to load notes:', error);
  }, [error]);

  return (
    <main className={css.main}>
      <h2>Could not load notes</h2>
      <p>{error.message || 'An unexpected error occurred.'}</p>
      <button className={css.button} type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
