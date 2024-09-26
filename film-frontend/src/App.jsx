import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import DetailFilm from './pages/DetailFilm';

import './App.css'

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/detailFilm" element={<DetailFilm />} />
        </Routes> 
      </div>
    </Router>
  );
}

export default App;
