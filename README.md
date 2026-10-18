# Reading List

A small app to save books you want to read later.

## Getting started

    npm install
    npm run dev

## Features

- Search books by title or author (Open Library API)
- Add books to your list and remove them (async data layer over localStorage)
- Distinct loading, error (with retry) and empty states

## Testing the states

Use the **Demo states** buttons at the top of the page, or open these URLs directly(no code changes needed):

| State   | URL                           |
| ------- | ----------------------------- |
| Loading | `/reading-list?state=loading` |
| Error   | `/reading-list?state=error`   |
| Empty   | `/reading-list?state=empty`   |
| Normal  | `/reading-list`               |

## Architecture

- `src/api/readingListApi.js`: async data layer (easy to swap for a REST API)
- `src/components/StateViews.jsx`: loading / error / empty views
- `src/pages/ReadingListPage.jsx`: page logic and the `?state=` demo override
- `src/api/openLibrary.js`: book search against the Open Library API

## Where data is stored

Your list is saved in the browser's `localStorage`, so it persists after a refresh but does not sync across devices or browsers. Book search uses the public Open Library API.

## Stack

React · JavaScript · Vite · React Router
