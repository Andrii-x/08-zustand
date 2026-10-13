'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { fetchNotes } from '@/lib/api/notes';
import type { NoteTag } from '@/types/note';
import NoteCard from '@/components/NoteCard/NoteCard';
import css from './NotesClient.module.css';

const tags: Array<NoteTag | 'All'> = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

interface NotesClientProps {
  initialTag?: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const selectedTag = initialTag ?? 'All';
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['notes', { tag: selectedTag, search }],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 100,
        ...(selectedTag === 'All' ? {} : { tag: selectedTag }),
        ...(search ? { search } : {}),
      }),
  });

  return (
    <section className={css.section}>
      <header className={css.header}>
        <div>
          <p className={css.eyebrow}>YOUR SPACE</p>
          <h1 className={css.title}>My notes</h1>
          <p className={css.subtitle}>
            Keep your ideas organized and close at hand.
          </p>
        </div>
        <Link className={css.createButton} href="/notes/action/create">
          Create note <span aria-hidden="true">+</span>
        </Link>
      </header>

      <div className={css.controls}>
        <nav className={css.filters} aria-label="Filter notes by tag">
          {tags.map((tag) => {
            const href =
              tag === 'All'
                ? '/notes/filter/all'
                : `/notes/filter/${encodeURIComponent(tag)}`;

            return (
              <Link
                key={tag}
                className={`${css.filter} ${selectedTag === tag ? css.activeFilter : ''}`}
                href={href}
                aria-current={selectedTag === tag ? 'page' : undefined}
              >
                {tag}
              </Link>
            );
          })}
        </nav>
        <label className={css.searchLabel}>
          <span className={css.srOnly}>Search notes</span>
          <input
            className={css.search}
            type="search"
            placeholder="Search notes..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
      </div>

      {isPending && <p className={css.message}>Loading notes...</p>}
      {isError && (
        <p className={css.error} role="alert">
          Could not load notes: {error.message}
        </p>
      )}
      {!isPending && !isError && data?.notes.length === 0 && (
        <p className={css.message}>No notes found. Create your first note.</p>
      )}
      {data && data.notes.length > 0 && (
        <ul className={css.grid}>
          {data.notes.map((note) => (
            <li key={note.id}>
              <NoteCard note={note} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
