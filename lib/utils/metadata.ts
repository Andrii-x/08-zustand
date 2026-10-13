import type { Metadata } from 'next';

export const NOTEHUB_URL = 'https://notehub.com/';
export const NOTEHUB_OG_IMAGE =
  'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg';

export function createOpenGraph(
  title: string,
  description: string,
  url = NOTEHUB_URL,
): NonNullable<Metadata['openGraph']> {
  return {
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
  };
}
