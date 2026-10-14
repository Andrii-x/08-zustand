'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api/notes';
import type { NoteTag } from '@/types/note';
import css from '@/components/NotesClient/NotesClient.module.css';

const tags: Array<NoteTag | 'All'> = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

interface NotesProps {
  tag: NoteTag | 'All';
}

export default function Notes({ tag }: NotesProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['notes', { tag, search: debouncedSearch, page }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        ...(tag === 'All' ? {} : { tag }),
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
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
            const value = tag === 'All' ? 'all' : tag;
            const href = `/notes/filter/${encodeURIComponent(value)}`;
            const isSelected = tag === value;

            return (
              <Link
                key={tag}
                className={`${css.filter} ${isSelected ? css.activeFilter : ''}`}
                href={href}
                aria-current={isSelected ? 'page' : undefined}
              >
                {tag}
              </Link>
            );
          })}
        </nav>
        <SearchBox
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
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
      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data && (
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
