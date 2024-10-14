// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';

// const DramaList = () => {
//   const [dramaData, setDramaData] = useState([]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/films');
//       const data = await response.json();
//       setDramaData(data.data); // Mengambil data dari respons JSON
//     } catch (error) {
//       console.error('Error fetching drama data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);
//   console.log(dramaData)

//   // if (!dramaData) {
//   //   return  <div className="flex items-center justify-center w-full h-screen bg-yellow-900">
//   //               <div role="status">
//   //                   <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
//   //                   <span className="sr-only">Loading...</span>
//   //               </div>
//   //           </div>
//   // }
//   return (
//     <div className="grid grid-cols-5 gap-4 p-4 mb-52 w-full h-full">
//       {dramaData.map((drama) => (
//         <>
//         <div>
//           <div key={drama.id} className="relative group bg-opacity-0 rounded-lg overflow-hidden w-full h-5/6 z-10">
//             <Link to={`/detailfilm/${drama.id}`}>
//               <img
//                 src={drama.url_cover}
//                 alt={drama.title}
//                 className="cursor-pointer transition-transform duration-300 ease-in-out w-full h-full rounded-xl shadow-xl group-hover:blur-sm group-hover:scale-110" 
//               />
//               <div className="absolute inset-0 flex items-center justify-center text-yellow-500 text-lg font-bold opacity-0 transition-opacity duration-300 ease-in-out bg-black bg-opacity-50 rounded-xl group-hover:opacity-100">
//                 Lihat Detail
//               </div>
//             </Link>
//           </div>
//           <div className="h-1/6">
//             <div className="p-4">
//               <Link to={`/detailfilm/${drama.id}`}>
//                 <h2 className="text-lg font-bold">{drama.title}</h2>
//                 <p className="text-gray-600">{drama.year}</p>
//               </Link>
//             </div>
//           </div>
//         </div>
//         </>
//       ))}
//     </div>
//   );
// };

// export default DramaList;
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
      filtered = filtered.filter(drama => drama.title.toLowerCase().includes(searchTerm.toLowerCase()));
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

    {searchTerm.length > 0 && (
      <div className="flex w-full items-center justify-center">
        <h2 className="ml-6 text-xl mt-6 mb-3">
          Hasil Pencarian untuk: {searchTerm}
        </h2>
      </div>
    )}

    <div className="grid grid-cols-5 gap-4 p-4 mb-52 w-full h-full">
      {searchTerm.length > 0 ? (
        filteredData.length > 0 ? (
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
          <div className="flex w-full items-center justify-center">
            <h2 className="ml-6 text-xl mt-6 mb-3">
              Tidak ada hasil untuk "{searchTerm}"
            </h2>
          </div>
        )
      ) : (
        dramaData.length > 0 ? (
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
        ) : (
          <div className="flex w-full items-center justify-center">
            <h2 className="ml-6 text-xl mt-6 mb-3">
              Tidak ada data drama yang tersedia.
            </h2>
          </div>
        )
      )}
    </div>
  </div>
);
        };

export default DramaList;
