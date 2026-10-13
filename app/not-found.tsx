import type { Metadata } from 'next';
import Link from 'next/link';
import { createOpenGraph } from '@/lib/utils/metadata';
import css from './not-found.module.css';

const title = '404 - Page not found | NoteHub';
const description =
  'Sorry, the page you are looking for could not be found. Return to NoteHub to browse your notes.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: createOpenGraph(title, description),
};

export default function NotFound() {
  return (
    <main className={css.main}>
      <p className={css.code}>404</p>
      <h1 className={css.title}>Page not found</h1>
      <p className={css.description}>{description}</p>
      <Link className={css.link} href="/notes/filter/all">
        Back to notes
      </Link>
    </main>
  );
}
