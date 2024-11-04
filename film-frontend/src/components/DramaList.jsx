import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FiltersAndSorting from './FiltersAndSorting';

const DramaList = () => {
  const [dramaData, setDramaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    year: '',
    genre: '',
    streamsite: '',
    awards: '',
    searchTerm: ''
  });
  const [distinctValues, setDistinctValues] = useState({
    years: [],
    genres: [],
    streamsites: [],
    awards: []
  });

  // Fetch semua data dan ambil nilai unik
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/films');
      const data = await response.json();

      setDramaData(data.data);
      setFilteredData(data.data);

      console.log("Data drama:", data.data);

      // Ambil nilai unik dari data untuk filter
      const years = [...new Set(data.data.map(drama => drama.year))];
      const genres = [...new Set(data.data.flatMap(drama => drama.genres))];
      const streamsites = [...new Set(data.data.map(drama => drama.stream_site))];
      
      setDistinctValues({ years, genres, streamsites, awards: ['true', 'false'] });
      
      // Muat filter dari localStorage jika ada
      const savedFilters = JSON.parse(localStorage.getItem('dramaFilters'));
      if (savedFilters) {
        setFilters(savedFilters);
        applyFilters(savedFilters, data.data);
      }
    } catch (error) {
      console.error('Error fetching drama data:', error);
    }
  };

  // Fungsi untuk mengaplikasikan filter di sisi client
  const applyFilters = (currentFilters = filters, data = dramaData) => {
    let filtered = [...data];
    
    if (currentFilters.genre) filtered = filtered.filter(drama => drama.genres.some(genre => genre.genre === currentFilters.genre));
    if (currentFilters.year) filtered = filtered.filter(drama => drama.year === Number(currentFilters.year));
    if (currentFilters.streamsite) filtered = filtered.filter(drama => drama.stream_site === currentFilters.streamsite); 
    if (currentFilters.awards === 'true') {
      filtered = filtered.filter(drama => drama.awards.length > 0);
    } else if (currentFilters.awards === 'false') {
      filtered = filtered.filter(drama => drama.awards.length === 0);
    }
    if (currentFilters.searchTerm) {
      filtered = filtered.filter(drama => drama.title.toLowerCase().includes(currentFilters.searchTerm.toLowerCase()));
    }
    
    setFilteredData(filtered);
    localStorage.setItem('dramaFilters', JSON.stringify(currentFilters));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleApplyFilters = () => {
    applyFilters();
  };

  const clearFilters = () => {
    setFilters({
      year: '',
      genre: '',
      streamsite: '',
      awards: '',
      searchTerm: ''
    });
    setFilteredData(dramaData);
    localStorage.removeItem('dramaFilters');
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <FiltersAndSorting 
        onFilterChange={handleFilterChange}
        applyFilters={handleApplyFilters}
        clearFilters={clearFilters}
        distinctValues={distinctValues}
        initialSearchTerm={filters.searchTerm}
      />
      <div className="grid grid-cols-5 gap-4 p-4 mb-52 w-full h-full">
        {filteredData.map((drama) => (
          <div key={drama.id}>
            <div className="relative group bg-opacity-0 rounded-lg overflow-hidden w-full h-5/6 z-10">
              <Link to={`/detailfilm/${drama.id}`}>
                <img
                  src={drama.url_cover}
                  alt=""
                  className="cursor-pointer transition-transform duration-300 ease-in-out w-full h-full rounded-xl shadow-xl group-hover:blur-sm group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center text-yellow-500 text-lg font-bold opacity-0 transition-opacity duration-300 ease-in-out bg-black bg-opacity-50 rounded-xl group-hover:opacity-100">
                  Lihat Detail
                </div>
              </Link>
            </div>
            <div className="h-1/6 p-4">
              <Link to={`/detailfilm/${drama.id}`}>
                <h2 className="text-lg font-bold">{drama.title}</h2>
                <p className="text-gray-600">{drama.year}</p>
                <p className="text-gray-600">
                  {drama.genres.map(genre => genre.genre).join(', ')}
                </p>
                <p className="text-gray-600">
                  {drama.awards.map(award => award.award_name).join(', ')}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DramaList;