import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import type { ReactNode } from 'react';
import QueryProvider from '@/components/QueryProvider/QueryProvider';
import { createOpenGraph } from '@/lib/utils/metadata';
import './globals.css';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
  subsets: ['latin', 'cyrillic'],
});

const title = 'NoteHub | Your personal notes';
const description =
  'Capture ideas, organize your notes, and keep everything important in one place.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: createOpenGraph(title, description),
};

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <QueryProvider>
          {children}
          {modal}
        </QueryProvider>
      </body>
    </html>
  );
}
