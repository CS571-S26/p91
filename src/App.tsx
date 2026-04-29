import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { GlobalModal } from './components/GlobalModal'
import { Header } from './components/Header'
import { Details } from './pages/Details'
import { Favorites } from './pages/Favorites'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { Restaurants } from './pages/Restaurants'
import { Spinner } from './pages/Spinner'

export default function App() {
  return (
    <BrowserRouter basename="/p91">
      <div className="min-h-screen flex flex-col ...">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route index element={<Home />} />
            <Route path="spinner" element={<Spinner />} />
            <Route path="restaurants" element={<Restaurants />} />
            <Route path="history" element={<History />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="restaurant/:id" element={<Details />} />
          </Routes>
        </main>
        <Footer />
        <GlobalModal />
      </div>
    </BrowserRouter>
  )
}
