import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SeriesPage from './pages/SeriesPage'
import Header from './components/Header/Header'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <BrowserRouter>
    
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/series" element={<SeriesPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
