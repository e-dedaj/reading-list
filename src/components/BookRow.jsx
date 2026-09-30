export default function BookRow({ book, children }) {
  return (
    <li className="book">
      {book.coverUrl ? (
        <img src={book.coverUrl} alt="" width="48" height="72" loading="lazy" />
      ) : (
        <div className="cover-placeholder" aria-hidden="true">📖</div>
      )}
      <div className="book-info">
        <strong>{book.title}</strong>
        <span>
          {book.author}
          {book.year ? ` · ${book.year}` : ''}
        </span>
      </div>
      {children}
    </li>
  )
}