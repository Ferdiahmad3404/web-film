import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Film from './pages/Film'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/film' element={<Film />} />
      </Routes>
    </Router>
  )
}

export default App
