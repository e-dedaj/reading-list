import { NavLink, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  const { pathname } = useLocation()
  const onMyList = pathname === '/my-list'
  return (
    <div className="app">
      <header className="navbar">
        <span className="brand"> ꧁ 𝓜𝔂 𝓢𝓱𝓮𝓵𝓯 ꧂ </span>
        <nav className="nav-links">
          {onMyList ? (
            <NavLink to="/reading-list">Home</NavLink>
          ) : (
            <NavLink to="/my-list">My list</NavLink>
          )}
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}