'use client';

import Link from 'next/link';
import type { Note } from '@/types/note';
import css from './page.module.css';

interface NoteDetailsProps {
  note: Note;
  showBackLink?: boolean;
}

export default function NoteDetails({
  note,
  showBackLink = true,
}: NoteDetailsProps) {
  return (
    <article
      className={showBackLink ? css.article : css.previewArticle}
    >
      {showBackLink && (
        <Link className={css.back} href="/notes/filter/all">
          ← All notes
        </Link>
      )}
      <div className={css.meta}>
        <span className={css.tag}>{note.tag}</span>
        <time dateTime={note.createdAt}>
          {new Date(note.createdAt).toLocaleDateString()}
        </time>
      </div>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
    </article>
  );
}
