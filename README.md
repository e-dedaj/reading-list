# Reading List

A small app to save articles and things to read later.
# Deploy
[https://booklover-bookshelf.vercel.app/reading-list](https://booklover-bookshelf.vercel.app/reading-list)
## Getting started

    npm install
    npm run dev

## Features

- Search books by title or author (Open Library API)
- Add books to your list and remove them (async data layer over localStorage)
- Distinct loading, error (with retry) and empty states
## Testing the states
Use the **Demo states** buttons at the top of the page, or open these URLs directly:<br>
Open these URLs, no code changes needed:

| State   | URL                           |
| ------- | ----------------------------- |
| Loading | `/reading-list?state=loading` |
| Error   | `/reading-list?state=error`   |
| Empty   | `/reading-list?state=empty`   |
| Normal  | `/reading-list`               |

## Architecture

- `src/api`: async data layer (easy to swap for a REST API)
- `src/components/StateViews.jsx`: loading / error / empty views
- `src/pages/ReadingListPage.jsx`: page logic and the `?state=` demo override
- `src/api/openLibrary.js`: book search against the Open Library REST API

## Stack

React · JavaScript · Vite · React Router
