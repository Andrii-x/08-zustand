import type { Metadata } from 'next';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/notes';
import { NOTEHUB_OG_IMAGE } from '@/lib/utils/metadata';
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
      openGraph: {
        type: 'website',
        title,
        description,
        url: `https://notehub.com/notes/${encodeURIComponent(id)}`,
        images: [
          {
            url: NOTEHUB_OG_IMAGE,
            width: 1200,
            height: 630,
            alt: 'NoteHub notes application',
          },
        ],
      },
    };
  } catch (error) {
    if (!axios.isAxiosError(error) || error.response?.status !== 404) {
      throw error;
    }

    return {
      title: 'Note not found | NoteHub',
      description: 'The requested note could not be found in NoteHub.',
      openGraph: {
        type: 'website',
        title: 'Note not found | NoteHub',
        description: 'The requested note could not be found in NoteHub.',
        url: `https://notehub.com/notes/${encodeURIComponent(id)}`,
        images: [
          {
            url: NOTEHUB_OG_IMAGE,
            width: 1200,
            height: 630,
            alt: 'NoteHub notes application',
          },
        ],
      },
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
