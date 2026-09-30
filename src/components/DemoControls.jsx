import { useSearchParams } from 'react-router-dom'

const OPTIONS = [
  { value: null, label: 'Normal' },
  { value: 'loading', label: 'Loading' },
  { value: 'error', label: 'Error' },
  { value: 'empty', label: 'Empty' },
]

export default function DemoControls() {
  const [searchParams, setSearchParams] = useSearchParams()
  const current = searchParams.get('state')

  function select(value) {
    setSearchParams(value ? { state: value } : {})
  }

  return (
    <div className="demo-controls" role="group" aria-label="Demo states">
      <span>Demo states:</span>
      {OPTIONS.map((o) => (
        <button
          key={o.label}
          type="button"
          className={current === o.value ? 'active' : ''}
          aria-pressed={current === o.value}
          onClick={() => select(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
