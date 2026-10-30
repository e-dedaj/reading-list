import { useEffect, useRef, useState } from 'react'
import { addItem } from '../api/readingListApi.js'
import { searchBooks } from '../api/openLibrary.js'
import BookRow from '../components/BookRow.jsx'

export default function SearchPage({ savedIds, onAdded }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searchStatus, setSearchStatus] = useState('idle') // idle | loading | error | done
  const [actionError, setActionError] = useState('')
  const searchRef = useRef(null)

  async function handleSearch(e) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setSearchStatus('loading')
    try {
      setResults(await searchBooks(q))
      setSearchStatus('done')
    } catch {
      setSearchStatus('error')
    }
  }

  function handleClear() {
    setQuery('')
    setResults([])
    setSearchStatus('idle')
    searchRef.current?.focus()
  }

  async function handleAdd(book) {
    try {
      setActionError('')
      const item = await addItem(book)
      onAdded(item)
    } catch {
      setActionError("Couldn't save this book. Your browser storage may be full or blocked. Try again.")
    }
  }

  return (
    <section>
      <h2 className="section-title">Search</h2>
      <form className="add-form" onSubmit={handleSearch}>
              <div className="search-field">
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search a book by title or author"
                  aria-label="Search books"
                />
                {(query || searchStatus !== 'idle') && (
                  <button
                    type="button"
                    className="clear"
                    onClick={handleClear}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>
              <button type="submit" disabled={searchStatus === 'loading'}>
                {searchStatus === 'loading' ? 'Searching...' : 'Search'}
              </button>
            </form>
      
      {actionError && <p className="search-status" role="alert">{actionError}</p>}
      {searchStatus === 'error' && (
        <p className="search-status" role="alert">
          Search failed. Please check your connection and try again.
        </p>
      )}
      {searchStatus === 'done' && results.length === 0 && (
        <p className="search-status">No books found.</p>
      )}
      {searchStatus === 'done' && results.length > 0 && (
        <ul className="items">
          {results.map((book) => (
            <BookRow key={book.id} book={book}>
              <button onClick={() => handleAdd(book)} disabled={savedIds.includes(book.id)}>
                {savedIds.includes(book.id) ? 'Added' : 'Add'}
              </button>
            </BookRow>
          ))}
        </ul>
      )}
    </section>
  )
}