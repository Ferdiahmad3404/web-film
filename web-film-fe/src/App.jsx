import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Film from './pages/Film'
import Login from './pages/Login'
import Registrasi from './pages/Registrasi'
import CMSCountries from './pages/CMSCountries'
import CMSAwards from './pages/CMSAwards'
import CMSGenres from './pages/CMSGenres'
import CMSActors from './pages/CMSActors'


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/film' element={<Film />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registrasi' element={<Registrasi />} />
        <Route path='/cmscountries' element={<CMSCountries />} />
        <Route path='/cmsawards' element={<CMSAwards />} />
        <Route path='/cmsgenres' element={<CMSGenres />} />
        <Route path='/cmsactors' element={<CMSActors />} />
      </Routes>
    </Router>
  )
}

export default App
