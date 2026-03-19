import { createRoot } from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </HashRouter>,
)
