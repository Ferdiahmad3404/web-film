import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import DetailFilm from './pages/DetailFilm';
import Login from './pages/Login';
import Registrasi from './pages/Registrasi';
import CMSCountries from './pages/CMSCountries';
import CMSAwards from './pages/CMSAwards';
import CMSGenres from './pages/CMSGenres';
import CMSActors from './pages/CMSActors';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detailFilm" element={<DetailFilm />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registrasi' element={<Registrasi />} />
          <Route path='/cmscountries' element={<CMSCountries />} />
          <Route path='/cmsawards' element={<CMSAwards />} />
          <Route path='/cmsgenres' element={<CMSGenres />} />
          <Route path='/cmsactors' element={<CMSActors />} />
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
