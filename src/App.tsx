import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SeriesPage from './pages/SeriesPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series" element={<SeriesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
