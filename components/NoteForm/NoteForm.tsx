'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createNote } from '@/lib/api/notes';
import { useNoteStore } from '@/lib/store/noteStore';
import type { NoteDraft, NoteTag } from '@/types/note';
import css from './NoteForm.module.css';

const noteTags: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const draft = useNoteStore((state) => state.draft);
  const setDraft = useNoteStore((state) => state.setDraft);
  const clearDraft = useNoteStore((state) => state.clearDraft);
  const [isHydrated, setIsHydrated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    void useNoteStore.persist.rehydrate().then(() => setIsHydrated(true));
  }, []);

  async function formAction(formData: FormData) {
    setError('');
    const note: NoteDraft = {
      title: String(formData.get('title') ?? '').trim(),
      content: String(formData.get('content') ?? '').trim(),
      tag: String(formData.get('tag') ?? 'Todo') as NoteTag,
    };

    try {
      await createNote(note);
      clearDraft();
      await queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes/filter/all');
    } catch (cause) {
      setError(
        cause instanceof Error
          ? `Could not create note: ${cause.message}`
          : 'Could not create note. Please try again.',
      );
    }
  }

  function updateDraft(field: keyof NoteDraft, value: string) {
    if (field === 'tag') {
      setDraft({ tag: value as NoteTag });
      return;
    }

    setDraft({ [field]: value });
  }

  if (!isHydrated) {
    return <p className={css.loading}>Restoring your draft...</p>;
  }

  return (
    <form className={css.form} action={formAction}>
      <label className={css.label} htmlFor="title">
        Title
      </label>
      <input
        className={css.input}
        id="title"
        name="title"
        type="text"
        required
        maxLength={120}
        defaultValue={draft.title}
        onChange={(event) => updateDraft('title', event.target.value)}
      />

      <label className={css.label} htmlFor="content">
        Content
      </label>
      <textarea
        className={css.textarea}
        id="content"
        name="content"
        required
        rows={8}
        defaultValue={draft.content}
        onChange={(event) => updateDraft('content', event.target.value)}
      />

      <label className={css.label} htmlFor="tag">
        Tag
      </label>
      <select
        className={css.input}
        id="tag"
        name="tag"
        defaultValue={draft.tag}
        onChange={(event) => updateDraft('tag', event.target.value)}
      >
        {noteTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      {error && (
        <p className={css.error} role="alert">
          {error}
        </p>
      )}

      <div className={css.actions}>
        <button
          className={css.cancel}
          type="button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button className={css.submit} type="submit">
          Create note
        </button>
      </div>
    </form>
  );
}
