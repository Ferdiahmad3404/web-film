import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import './App.css';

// Routing Import
import Dashboard from './pages/Dashboard';
import DetailFilm from './pages/DetailFilm';
import SearchResult from './pages/SearchResult';

import Login from './pages/Login';
import Registrasi from './pages/Registrasi';

import CMSCountries from './pages/CMSCountries';
import CMSAwards from './pages/CMSAwards';
import CMSGenres from './pages/CMSGenres';
import CMSActors from './pages/CMSActors';
import CMSComments from './pages/CMSComments';
import CMSDramas from './pages/CMSDramas';
import CMSDramainput from './pages/CMSDramainput';


const PrivateRoute = ({ element, requiredRoles }) => {
  const token = sessionStorage.getItem('token');
  const roles = sessionStorage.getItem('role_id');

  // Jika token tidak ada, arahkan ke login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Jika roles tidak sesuai, arahkan ke halaman 403 atau halaman lain
  if (requiredRoles && !requiredRoles.includes(roles)) {
      return <Navigate to="/login" />;
  }

return element;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home */}
          <Route path="/" element={<Dashboard />} />

          {/* Detail Film */}
          <Route path="/detailfilm/:id" element={<DetailFilm />} />

          <Route path='/search/*' element={<SearchResult />} />

          {/* Authentication */}
          <Route path='/login' element={<Login />} />
          <Route path='/registrasi' element={<Registrasi />} />

          {/* CMS */}
          <Route path='/admin-dashboard' element={<PrivateRoute element={<CMSCountries />} requiredRoles={['admin']} />} />
          <Route path='/cmsawards' element={<PrivateRoute element={<CMSAwards />} requiredRoles={['admin']} />} />
          <Route path='/cmsgenres' element={<PrivateRoute element={<CMSGenres />} requiredRoles={['admin']} />} />
          <Route path='/cmsactors' element={<PrivateRoute element={<CMSActors />} requiredRoles={['admin']} />} />
          <Route path='/cmscomments' element={<PrivateRoute element={<CMSComments />} requiredRoles={['admin']} />} />
          <Route path='/cmsdramas' element={<PrivateRoute element={<CMSDramas />} requiredRoles={['admin']} />} />
          <Route path='/cmsdramainput' element={<PrivateRoute element={<CMSDramainput />} requiredRoles={['admin']} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;