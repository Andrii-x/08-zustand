import type { Metadata } from 'next';
import NotesClient from '@/components/NotesClient/NotesClient';
import { createOpenGraph } from '@/lib/utils/metadata';
import css from './page.module.css';

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

function formatFilter(slug: string[]) {
  const filter = slug.join(' ').replaceAll('-', ' ').trim();
  return filter.toLowerCase() === 'all'
    ? 'All notes'
    : `${filter.charAt(0).toUpperCase()}${filter.slice(1)} notes`;
}

export async function generateMetadata({
  params,
}: FilterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const filter = formatFilter(slug);
  const title = `${filter} | NoteHub`;
  const description = `Browse and manage your ${filter.toLowerCase()} in NoteHub.`;
  const url = `https://notehub.com/notes/filter/${slug.map(encodeURIComponent).join('/')}`;

  return {
    title,
    description,
    openGraph: createOpenGraph(title, description, url),
  };
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const filter = slug.join('/');

  return (
    <main className={css.main}>
      <div className={css.container}>
        <NotesClient initialTag={filter === 'all' ? undefined : filter} />
      </div>
    </main>
  );
}
