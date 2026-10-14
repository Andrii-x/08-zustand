import Link from 'next/link';
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <Link className={css.brand} href="/notes/filter/all">
        NoteHub
      </Link>
      <Link className={css.notesLink} href="/notes/filter/all">
        My notes
      </Link>
    </header>
  );
}
