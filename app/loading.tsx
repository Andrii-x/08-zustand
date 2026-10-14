import css from './loading.module.css';

export default function Loading() {
  return (
    <main className={css.main} aria-busy="true" aria-live="polite">
      <span className={css.spinner} aria-hidden="true" />
      <p>Loading notes...</p>
    </main>
  );
}
