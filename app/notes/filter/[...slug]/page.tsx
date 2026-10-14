import type { Metadata } from 'next';
import { NOTEHUB_OG_IMAGE } from '@/lib/utils/metadata';
import Notes from './Notes.client';
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
    openGraph: {
      type: 'website',
      title,
      description,
      url,
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
}

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const filter = slug.join('/');

  return (
    <main className={css.main}>
      <div className={css.container}>
        <Notes initialTag={filter === 'all' ? undefined : filter} />
      </div>
    </main>
  );
}
