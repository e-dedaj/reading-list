import { useCallback, useEffect, useState } from 'react'
import { useSearchParams, useNavigate  } from 'react-router-dom'
import { fetchItems, removeItem } from '../api/readingListApi.js'
import BookRow from '../components/BookRow.jsx'
import DemoControls from '../components/DemoControls.jsx'
import { EmptyState, ErrorState, LoadingState } from '../components/StateViews.jsx'
import SearchPage from './SearchPage.jsx'

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export default function ReadingListPage({ withSearch = false }) {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const forcedState = searchParams.get('state') 
  // list
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading') // loading | error | ready

  // search
  const [actionError, setActionError] = useState('')
  async function handleRemove(id) {
    try {
      setActionError('')
      await removeItem(id)
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch {
      setActionError("Couldn't remove this book. Try again.")
    }
  }
  const load = useCallback(async () => {
    setStatus('loading')

    // Demo mode
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

  
  return (
    <section>
      <h1>{withSearch ? '𝖍𝖔𝖒𝖊' : '𝖒𝖞 𝖑𝖎𝖘𝖙'}</h1>

      {withSearch && (<>
        <DemoControls />
        <SearchPage
          savedIds={items.map((i) => i.id)}
          onAdded={(item) =>
            setItems((prev) => (prev.some((i) => i.id === item.id) ? prev : [item, ...prev]))
          }
        />
        <h2 className="section-title">My list</h2>
      </>)}

      {actionError && <p className="search-status" role="alert">{actionError}</p>}
      {status === 'loading' && <LoadingState />}
      {status === 'error' && (
        <ErrorState
          onRetry={forcedState === 'error' ? () => setSearchParams({}) : load}
        />
      )}
      {status === 'ready' && items.length === 0 && (
        <EmptyState onAdd={() => withSearch
          ? document.querySelector('input[aria-label="Search books"]')?.focus()
          : navigate('/reading-list')
        } />
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