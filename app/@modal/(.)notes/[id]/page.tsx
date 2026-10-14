import axios from 'axios';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchNoteById } from '@/lib/api/notes';
import css from './page.module.css';

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

  return (
    <div className={css.backdrop}>
      <article className={css.dialog} role="dialog" aria-modal="true">
        <Link className={css.close} href="/notes/filter/all" aria-label="Close note">
          ×
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
    </div>
  );
}
