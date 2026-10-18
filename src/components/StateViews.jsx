export function LoadingState() {
  return (
    <div className="state state-loading" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>Loading your reading list...</p>
    </div>
  )
}

export function ErrorState({ onRetry }) {
  return (
    <div className="state state-error" role="alert">
      <h2>We couldn't load your reading list.</h2>
      <p>Your saved data could not be loaded. Try again. If it keeps failing, clear this site's data in your browser settings.</p>
      <button onClick={onRetry}>Try again</button>
    </div>
  )
}

export function EmptyState({ onAdd }) {
  return (
    <div className="state state-empty">
      <h2>Your reading list is empty.</h2>
      <p>Keep track of books you want to read. Search for a title above and add it here.</p>
      <button onClick={onAdd}>Search for your first book</button>
    </div>
  )
}