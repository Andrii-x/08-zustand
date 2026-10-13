import type { Metadata } from 'next';
import axios from 'axios';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/notes';
import { createOpenGraph } from '@/lib/utils/metadata';
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
    notFound();
  }

  return (
    <main className={css.main}>
      <article className={css.article}>
        <Link className={css.back} href="/notes/filter/all">
          ← All notes
        </Link>
        <div className={css.meta}>
          <span className={css.tag}>{note.tag}</span>
          <time dateTime={note.createdAt}>
            {new Date(note.createdAt).toLocaleDateString()}
          </time>
        </div>
        <h1 className={css.title}>{note.title}</h1>
        <p className={css.content}>{note.content}</p>
      </article>
    </main>
  );
}
