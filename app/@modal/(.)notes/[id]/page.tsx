import axios from 'axios';
import { notFound } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/notes';
import NotePreview from './NotePreview.client';

interface ModalNotePageProps {
  params: Promise<{ id: string }>;
}

export default async function ModalNotePage({ params }: ModalNotePageProps) {
  const { id } = await params;
  let note;

  try {
    note = await fetchNoteById(id);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    throw error;
  }

  return <NotePreview note={note} />;
}
