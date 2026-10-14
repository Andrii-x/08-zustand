'use client';

import NotesClient from '@/components/NotesClient/NotesClient';

interface NotesProps {
  initialTag?: string;
}

export default function Notes({ initialTag }: NotesProps) {
  return <NotesClient initialTag={initialTag} />;
}
