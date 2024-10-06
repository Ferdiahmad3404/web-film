import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DetailFilm from './pages/DetailPage';
import Login from './pages/Login';
import Registrasi from './pages/Registrasi';
import CMSCountries from './pages/CMSCountries';
import CMSAwards from './pages/CMSAwards';
import CMSGenres from './pages/CMSGenres';
import CMSActors from './pages/CMSActors';
import './App.css';
import SearchResult from './pages/SearchResult';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detailfilm/:id" element={<DetailFilm />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registrasi' element={<Registrasi />} />
          <Route path='/cmscountries' element={<CMSCountries />} />
          <Route path='/cmsawards' element={<CMSAwards />} />
          <Route path='/cmsgenres' element={<CMSGenres />} />
          <Route path='/cmsactors' element={<CMSActors />} />
          <Route path='/search/*' element={<SearchResult />} />
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
