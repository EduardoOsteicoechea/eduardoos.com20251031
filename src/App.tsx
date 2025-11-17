import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SeriesPage from './pages/SeriesPage'
import Header from './components/Header/Header'
import ProfileChatPage from './pages/ProfileChatPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <BrowserRouter>
    
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ai_assistant" element={<ProfileChatPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/series" element={<SeriesPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
