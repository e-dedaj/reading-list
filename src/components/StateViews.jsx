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
      <p>Please check your connection and try again.</p>
      <button onClick={onRetry}>Try again</button>
    </div>
  )
}

export function EmptyState({ onAdd }) {
  return (
    <div className="state state-empty">
      <h2>Your reading list is empty.</h2>
      <p>Save articles and other things you want to come back to later.</p>
      <button onClick={onAdd}>Add your first item</button>
    </div>
  )
}