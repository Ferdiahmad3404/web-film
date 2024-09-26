import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registrasi from '../../web-film-fe/src/pages/Registrasi';
import CMSActors from '../src/pages/CMSActors';
import CMSAwards from '../src/pages/CMSAwards';
import CMSCountries from '../src/pages/CMSCountries';
import CMSGenres from '../src/pages/CMSGenres';
import DetailFilm from '../src/pages/DetailFilm';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detailFilm" element={<DetailFilm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrasi" element={<Registrasi />} />
          <Route path="/cmscountries" element={<CMSCountries />} />
          <Route path="/cmsawards" element={<CMSAwards />} />
          <Route path="/cmsgenres" element={<CMSGenres />} />
          <Route path="/cmsactors" element={<CMSActors />} />
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
