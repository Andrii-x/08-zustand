import type { Metadata } from 'next';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/notes';
import { createOpenGraph } from '@/lib/utils/metadata';
import NoteDetails from './NoteDetails.client';
import css from './page.module.css';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);
    const title = `${note.title} | NoteHub`;
    const description =
      note.content.slice(0, 160) || `Read the note "${note.title}" on NoteHub.`;

    return {
      title,
      description,
      openGraph: createOpenGraph(
        title,
        description,
        `https://notehub.com/notes/${encodeURIComponent(id)}`,
      ),
    };
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 404) {
      throw error;
    }

    return {
      title: 'Note not found | NoteHub',
      description: 'The requested note could not be found in NoteHub.',
      openGraph: createOpenGraph(
        'Note not found | NoteHub',
        'The requested note could not be found in NoteHub.',
        `https://notehub.com/notes/${encodeURIComponent(id)}`,
      ),
    };
  }
}

export default async function NotePage({ params }: NotePageProps) {
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

  return (
    <main className={css.main}>
      <NoteDetails note={note} />
    </main>
  );
}
