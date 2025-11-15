import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import SeriesPage from './pages/SeriesPage'
import Header from './components/Header/Header'
import ProfileChatPage from './pages/ProfileChatPage'

function App() {
  return (
    <BrowserRouter>
    
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/ai_assistant" element={<ProfileChatPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
