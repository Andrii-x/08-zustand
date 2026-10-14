import axios from 'axios';
import { notFound } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
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
    <Modal closeHref="/notes/filter/all" label={note.title}>
      <div className={css.meta}>
        <span className={css.tag}>{note.tag}</span>
        <time dateTime={note.createdAt}>
          {new Date(note.createdAt).toLocaleDateString()}
        </time>
      </div>
      <h1 className={css.title}>{note.title}</h1>
      <p className={css.content}>{note.content}</p>
    </Modal>
  );
}
