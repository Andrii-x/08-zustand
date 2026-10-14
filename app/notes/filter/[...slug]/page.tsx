import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { NOTEHUB_OG_IMAGE } from '@/lib/utils/metadata';
import type { NoteTag } from '@/types/note';
import Notes from './Notes.client';
import css from './page.module.css';

const noteTags: NoteTag[] = [
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

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
  const requestedTag = slug.join('/');
  const tag =
    requestedTag.toLowerCase() === 'all'
      ? 'All'
      : noteTags.find(
          (noteTag) => noteTag.toLowerCase() === requestedTag.toLowerCase(),
        );

  if (!tag) {
    notFound();
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <Notes tag={tag} />
      </div>
    </main>
  );
}
