import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FiltersAndSorting from './FiltersAndSorting'; // Pastikan import komponen ini

const DramaList = ({ searchTerm = ''}) => {
  const [dramaData, setDramaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [genres, setGenres] = useState([]); // State untuk genre
  const [years, setYears] = useState([]); // State untuk tahun
  const [platforms, setPlatforms] = useState([]); // State untuk platform

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/films');
      const data = await response.json();
      setDramaData(data.data); // Mengambil data dari respons JSON

      // Menyimpan genre dari data
      const uniqueGenres = new Set();
      const uniqueYears = new Set();
      const uniquePlatforms = new Set();

      data.data.forEach(drama => {
        drama.genres.forEach(genre => uniqueGenres.add(genre.genre));
        uniqueYears.add(drama.year); // Menyimpan tahun unik
        uniquePlatforms.add(drama.stream_site); // Menyimpan platform unik
      });

      // Update state untuk genre, tahun, dan platform
      setGenres([...uniqueGenres].map((genre, index) => ({ id: index + 1, genre })));
      setYears([...uniqueYears].map((year, index) => ({ id: index + 1, year })));
      setPlatforms([...uniquePlatforms].map((platform, index) => ({ id: index + 1, platform })));
      
    } catch (error) {
      console.error('Error fetching drama data:', error);
    }
  };

  const handleFilter = (filters) => {
    const { year, genre, platform, awards, sortOrder } = filters;

    let filtered = dramaData;

    // Filter berdasarkan tahun
    if (year) {
      filtered = filtered.filter(drama => drama.year === Number(year)); // Pastikan tahun dibandingkan sebagai angka
    }

    // Filter berdasarkan genre
    if (genre) {
      filtered = filtered.filter(drama => 
        drama.genres.some(g => g.genre === genre) // Cek apakah genre ada di dalam array genres
      );
    }

    // Filter berdasarkan platform
    if (platform) {
      filtered = filtered.filter(drama => drama.stream_site === platform);
    }

    // Filter berdasarkan penghargaan
    if (awards === "yes") {
      filtered = filtered.filter(drama => drama.awards.length > 0 && drama.awards[0] !== "-");
    } else if (awards === "no") {
      filtered = filtered.filter(drama => drama.awards.length > 0 && drama.awards[0] === "-");
    }

    if (searchTerm) {
      filtered = filtered.filter(drama => drama.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Sorting berdasarkan judul
    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredData(filtered);
  };

  const handleNameFilter = (filters) => {
    const { searchTerm } = filters;
    let filtered = dramaData;

    // Filter berdasarkan pencarian judul
    if (searchTerm) {
      filtered = filtered.filter(drama => 
        drama.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drama.actors.some(actor => actor.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    if (dramaData.length > 0 && searchTerm.length > 0) {
      handleNameFilter({ searchTerm });
    }
  }, [dramaData]);

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
      <FiltersAndSorting 
        onNameChange={handleNameFilter} 
        onFilterChange={handleFilter}
        genres={genres} 
        years={years}
        platforms={platforms} 
        initialSearchTerm={searchTerm}
      />
      {searchTerm.length > 0 ? (
        <div className="flex w-full items-center justify-center">
        <h2 className="ml-6 text-xl mt-6 mb-3">Hasil Pencarian untuk: {searchTerm}</h2>
      </div>
      ) : ('')}
      <div className="grid grid-cols-5 gap-4 p-4 mb-52 w-full h-full ">
        {searchTerm.length > 0 ? (
          filteredData.map((drama) => (
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
              <div className="h-1/6">
                <div className="p-4">
                  <Link to={`/detailfilm/${drama.id}`}>
                    <h2 className="text-lg font-bold">{drama.title}</h2>
                    <p className="text-gray-600">{drama.year}</p>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          dramaData.map((drama) => (
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
              <div className="h-1/6">
                <div className="p-4">
                  <Link to={`/detailfilm/${drama.id}`}>
                    <h2 className="text-lg font-bold">{drama.title}</h2>
                    <p className="text-gray-600">{drama.year}</p>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) }
      </div>
    </div>
  );
};

export default DramaList;
