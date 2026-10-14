import type { ReactNode } from 'react';
import Link from 'next/link';
import css from './Modal.module.css';

interface ModalProps {
  children: ReactNode;
  closeHref: string;
  label: string;
}

export default function Modal({ children, closeHref, label }: ModalProps) {
  return (
    <div className={css.backdrop}>
      <section className={css.dialog} role="dialog" aria-modal="true" aria-label={label}>
        <Link className={css.close} href={closeHref} aria-label="Close dialog">
          ×
        </Link>
        {children}
      </section>
    </div>
  );
}
