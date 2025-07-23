import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/sections/Header'
import Footer from './components/sections/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-dark text-light">
        <Header />
        <main className="flex-grow bg-dark">
          <div className="mx-auto">
            <Home />
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
