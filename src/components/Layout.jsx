import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="app">
      <header className="navbar">
        <span className="brand"> Reading List</span>
        <nav>
          <NavLink to="/reading-list">My list</NavLink>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}