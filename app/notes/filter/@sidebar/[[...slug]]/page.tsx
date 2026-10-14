import Link from 'next/link';
import type { NoteTag } from '@/types/note';
import css from './page.module.css';

const tags: Array<NoteTag | 'All'> = [
  'All',
  'Todo',
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
];

interface SidebarPageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function SidebarPage({ params }: SidebarPageProps) {
  const { slug } = await params;
  const selectedTag = slug?.join('/') ?? 'all';

  return (
    <nav className={css.sidebar} aria-label="Filter notes by tag">
      <p className={css.heading}>FILTER NOTES</p>
      <ul className={css.filters}>
        {tags.map((tag) => {
          const value = tag === 'All' ? 'all' : tag;
          const href = `/notes/filter/${encodeURIComponent(value)}`;
          const isSelected = selectedTag.toLowerCase() === value.toLowerCase();

          return (
            <li key={tag}>
              <Link
                className={`${css.filter} ${isSelected ? css.activeFilter : ''}`}
                href={href}
                aria-current={isSelected ? 'page' : undefined}
              >
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
