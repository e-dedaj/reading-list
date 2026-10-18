const KEY = 'reading-list'
const delay = (ms) => new Promise((r) => setTimeout(r, ms))

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]')
  } catch {
    return []
  }
}

function write(items) {
  localStorage.setItem(KEY, JSON.stringify(items))
}

export async function fetchItems() {
  await delay(600)
  return JSON.parse(localStorage.getItem(KEY) ?? '[]') // hedh error nëse janë të korruptuara
}

export async function addItem(book) {
  await delay(200)
  const items = read()
  const existing = items.find((i) => i.id === book.id)
  if (existing) return existing
  const item = { ...book, addedAt: new Date().toISOString() }
  write([item, ...items])
  return item
}

export async function removeItem(id) {
  await delay(200)
  write(read().filter((i) => i.id !== id))
}