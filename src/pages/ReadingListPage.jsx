import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { addItem, fetchItems, removeItem } from '../api/readingListApi.js'
import { searchBooks } from '../api/openLibrary.js'
import BookRow from '../components/BookRow.jsx'
import DemoControls from '../components/DemoControls.jsx'
import { EmptyState, ErrorState, LoadingState } from '../components/StateViews.jsx'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export default function ReadingListPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const forcedState = searchParams.get('state') // loading | error | empty | null

  // lista ime
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading') // loading | error | ready

  // kërkimi
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searchStatus, setSearchStatus] = useState('idle') // idle | loading | error | done
  const searchRef = useRef(null)

  const load = useCallback(async () => {
    setStatus('loading')

    // Demo mode: reviewer-i i shikon gjendjet pa prekur kodin
    if (forcedState === 'loading') return
    if (forcedState === 'error') {
      await wait(600)
      setStatus('error')
      return
    }
    if (forcedState === 'empty') {
      await wait(600)
      setItems([])
      setStatus('ready')
      return
    }

    try {
      setItems(await fetchItems())
      setStatus('ready')
    } catch {
      setStatus('error')
    }
  }, [forcedState])

  useEffect(() => {
    load()
  }, [load])

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
    const item = await addItem(book)
    setItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [item, ...prev]))
  }

  async function handleRemove(id) {
    await removeItem(id)
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const isSaved = (id) => items.some((i) => i.id === id)

  return (
    <section>
      <h1>Reading list</h1>

      <DemoControls />

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

      {searchStatus === 'error' && (
        <p className="search-status" role="alert">
          Search failed. Please check your connection and try again.
        </p>
      )}
      {searchStatus === 'done' && results.length === 0 && (
        <p className="search-status">No books found.</p>
      )}
      {searchStatus === 'done' && results.length > 0 && (
        <>
          <h2 className="section-title">Results</h2>
          <ul className="items">
            {results.map((book) => (
              <BookRow key={book.id} book={book}>
                <button onClick={() => handleAdd(book)} disabled={isSaved(book.id)}>
                  {isSaved(book.id) ? 'Added' : 'Add'}
                </button>
              </BookRow>
            ))}
          </ul>
        </>
      )}

      <h2 className="section-title">My list</h2>
      {status === 'loading' && <LoadingState />}
      {status === 'error' && (
        <ErrorState
          onRetry={forcedState === 'error' ? () => setSearchParams({}) : load}
        />
      )}
      {status === 'ready' && items.length === 0 && (
        <EmptyState onAdd={() => searchRef.current?.focus()} />
      )}
      {status === 'ready' && items.length > 0 && (
        <ul className="items">
          {items.map((book) => (
            <BookRow key={book.id} book={book}>
              <button className="remove" onClick={() => handleRemove(book.id)}>
                Remove
              </button>
            </BookRow>
          ))}
        </ul>
      )}
    </section>
  )
}