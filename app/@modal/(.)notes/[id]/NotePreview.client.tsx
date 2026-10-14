'use client';

import type { Note } from '@/types/note';
import Modal from '@/components/Modal/Modal';
import NoteDetails from '@/app/notes/[id]/NoteDetails.client';

interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  return (
    <Modal closeHref="/notes/filter/all" label={note.title}>
      <NoteDetails note={note} showBackLink={false} />
    </Modal>
  );
}
