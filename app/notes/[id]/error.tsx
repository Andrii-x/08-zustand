'use client';

import { useEffect } from 'react';
import css from '@/app/error.module.css';

interface NoteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NoteError({ error, reset }: NoteErrorProps) {
  useEffect(() => {
    console.error('Unable to load note details:', error);
  }, [error]);

  return (
    <main className={css.main}>
      <h2>Could not load this note</h2>
      <p>{error.message || 'An unexpected error occurred.'}</p>
      <button className={css.button} type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
