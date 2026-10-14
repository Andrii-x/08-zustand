import Link from 'next/link';
import type { Note } from '@/types/note';
import css from './NoteCard.module.css';

interface NoteCardProps {
  note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
    <article className={css.card}>
      <div className={css.topline}>
        <span className={css.tag}>{note.tag}</span>
        <time className={css.date} dateTime={note.createdAt}>
          {new Date(note.createdAt).toLocaleDateString()}
        </time>
      </div>
      <h2 className={css.title}>
        <Link href={`/notes/${encodeURIComponent(note.id)}`}>{note.title}</Link>
      </h2>
      <p className={css.content}>{note.content}</p>
      <Link
        className={css.readMore}
        href={`/notes/${encodeURIComponent(note.id)}`}
      >
        Open note
      </Link>
    </article>
  );
}
