'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { fetchNotes } from '@/lib/api/notes';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import css from './NotesClient.module.css';

interface NotesClientProps {
  initialTag?: string;
}

export default function NotesClient({ initialTag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const selectedTag = initialTag ?? 'All';
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['notes', { tag: selectedTag, search, page }],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
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
