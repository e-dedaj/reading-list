import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ReadingListPage from './pages/ReadingListPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/reading-list" element={<ReadingListPage />} />
        <Route path="*" element={<Navigate to="/reading-list" replace />} />
      </Route>
    </Routes>
  )
}