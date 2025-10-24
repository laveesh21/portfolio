import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Header from './components/sections/Header'
import Footer from './components/sections/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-dark text-light">
        <Header />
        <main className="flex-grow bg-dark">
          <div className="mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
