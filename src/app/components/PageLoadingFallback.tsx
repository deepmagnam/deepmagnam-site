// Placeholder for a first load straight onto a lazy route. It mirrors the
// fixed nav bar (same height, background and border) so nothing moves when
// the real page replaces it.
export function PageLoadingFallback() {
  return (
    <div className="min-h-screen bg-white" aria-busy="true" aria-label="Loading page">
      <div className="fixed top-0 inset-x-0 h-[var(--nav-height)] bg-white shadow-sm border-b border-slate-200" />
    </div>
  );
}
