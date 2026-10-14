import type { Metadata } from 'next';
import NoteForm from '@/components/NoteForm/NoteForm';
import { NOTEHUB_OG_IMAGE } from '@/lib/utils/metadata';
import css from './page.module.css';

const title = 'Create a note | NoteHub';
const description =
  'Create a new note in NoteHub. Your draft is saved automatically as you write.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    title,
    description,
    url: 'https://notehub.com/notes/action/create',
    images: [
      {
        url: NOTEHUB_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'NoteHub notes application',
      },
    ],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
