const BASE = 'https://openlibrary.org/search.json'

export async function searchBooks(query) {
  const params = new URLSearchParams({
    q: query,
    limit: '8',
    fields: 'key,title,author_name,first_publish_year,cover_i',
  })
  const res = await fetch(`${BASE}?${params}`)
  if (!res.ok) throw new Error('Search failed')
  const data = await res.json()

  return data.docs.map((d) => ({
    id: d.key,
    title: d.title,
    author: d.author_name?.[0] ?? 'Unknown author',
    year: d.first_publish_year ?? null,
    coverUrl: d.cover_i
      ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg`
      : null,
  }))
}