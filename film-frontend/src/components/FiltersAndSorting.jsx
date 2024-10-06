// const FiltersAndSorting = () => {
//   return (
//     <div id="content" className="mb-3 p-4 w-full flex space-x-4">
//       <form>
//         <select id="years" className="cursor-pointer border text-sm rounded-full block w-full p-2.5 bg-yellow-900 hover:bg-yellow-700 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
//           <option selected>Choose a year</option>
//           <option value="2021">2021</option>
//           <option value="2022">2022</option>
//           <option value="2023">2023</option>
//           <option value="2024">2024</option>
//         </select>
//       </form>
//       <form>
//         <select id="genre" className="cursor-pointer border text-sm rounded-full block w-full p-2.5 bg-yellow-900 hover:bg-yellow-700 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
//           <option selected>Choose a genre</option>
//           <option value="action">Action</option>
//           <option value="drama">Drama</option>
//           <option value="horror">Horror</option>
//           <option value="fantasy">Fantasy</option>
//         </select>
//       </form>
//       {/* <form>
//         <select id="status" className="cursor-pointer border text-sm rounded-full block w-full p-2.5 bg-yellow-900 hover:bg-yellow-700 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
//           <option selected>Choose a status</option>
//           <option value="on_going">On Going</option>
//           <option value="finished">Finished</option>
//         </select>
//       </form> */}
//       <form>
//         <select id="platform" className="cursor-pointer border text-sm rounded-full block w-full p-2.5 bg-yellow-900 hover:bg-yellow-700 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
//           <option selected>Choose a platform</option>
//           <option value="imdb">IMDB</option>
//           <option value="netflix">Netflix</option>
//           <option value="viu">Viu</option>
//           <option value="wetv">WeTV</option>
//         </select>
//       </form>
//       <form>
//         <select id="awards" className="cursor-pointer border text-sm rounded-full block w-full p-2.5 bg-yellow-900 hover:bg-yellow-700 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
//           <option selected>Awards</option>
//           <option value="yes">Yes</option>
//           <option value="no">No</option>
//         </select>
//       </form>
//       <form>
//         <select id="alphabetics" className="cursor-pointer border text-sm rounded-full block w-full p-2.5 bg-yellow-900 hover:bg-yellow-700 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
//           <option selected>Alphabetics</option>
//           <option value="asc">A-Z</option>
//           <option value="desc">Z-A</option>
//         </select>
//       </form>
//       <form className="flex-auto">
//         <div className="flex w-full items-center">
//             <div className="flex space-x-4 items-center justify-center w-full">
//                 <input type="text" className="p-2 bg-white border border-yellow-900 rounded-full w-full" placeholder="Search..." />
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full">Cari</button>
//             </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default FiltersAndSorting;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FiltersAndSorting = ({ onFilterChange, onNameChange, genres, years, platforms, searchTerm : initialSearchTerm }) => {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [selectedAwards, setSelectedAwards] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
  const [isSearched, setIsSearched] = useState(false); // Menyimpan status pencarian
  const navigate = useNavigate();

  const title = searchTerm;
  const handleFilterChange = () => {
    onFilterChange({
      year: selectedYear,
      genre: selectedGenre,
      platform: selectedPlatform,
      awards: selectedAwards,
      sortOrder,
      searchTerm,
    });
  };

  const handleNameChange = () => {
    onNameChange({
      searchTerm,
    });
  };

  // Fungsi untuk menangani pencarian
  const handleSearch = () => {
    handleNameChange(); 
    setIsSearched(true); // Menandai bahwa pencarian telah dilakukan
    navigate(`/search/${encodeURIComponent(searchTerm)}`); // Redirect dengan search term
  };

  // Fungsi untuk mendeteksi tombol Enter di input search
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleFilterChange();
      handleSearch();
    }
  };

  // Mengatur ulang search term saat initialSearchTerm berubah
  useEffect(() => {
    setSearchTerm(initialSearchTerm);
    handleNameChange();
  }, [initialSearchTerm]);

  useEffect(() => {
    handleFilterChange(); // Panggil setiap kali salah satu filter berubah
  }, [selectedYear, selectedGenre, selectedPlatform, selectedAwards, sortOrder]);

  return (
    <>
      <div id="content" className="mb-3 p-4 w-full flex space-x-4">
        <form>
          <select
            id="years"
            value={selectedYear}
            onChange={(e) => { setSelectedYear(e.target.value); }}
            className="cursor-pointer border text-sm rounded-full block w-full p-2.5 bg-yellow-900 hover:bg-yellow-700 text-white focus:ring-white focus:border-white"
          >
            <option value="">Choose a year</option>
            {years.map(year => (
              <option key={year.id} value={year.year}>{year.year}</option>
            ))}
          </select>
        </form>
        <form>
          <select
            id="genre"
            value={selectedGenre}
            onChange={(e) => { setSelectedGenre(e.target.value); }}
            className="cursor-pointer border text-sm rounded-full block w-full p-2.5 bg-yellow-900 hover:bg-yellow-700 placeholder-yellow-900 text-white focus:ring-white focus:border-white"
          >
            <option value="">Choose a genre</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.genre}>{genre.genre}</option>
            ))}
          </select>
        </form>
        <form>
          <select
            id="platform"
            value={selectedPlatform}
            onChange={(e) => { setSelectedPlatform(e.target.value); }}
            className="cursor-pointer border text-sm rounded-full block w-full p-2.5 bg-yellow-900 hover:bg-yellow-700 placeholder-yellow-900 text-white focus:ring-white focus:border-white"
          >
            <option value="">Choose a platform</option>
            {platforms.map(platform => (
              <option key={platform.id} value={platform.platform}>{platform.platform}</option>
            ))}
          </select>
        </form>
        <form>
          <select
            id="awards"
            value={selectedAwards}
            onChange={(e) => { setSelectedAwards(e.target.value); }}
            className="cursor-pointer border text-sm rounded-full block w-full p-2.5 bg-yellow-900 hover:bg-yellow-700 placeholder-yellow-900 text-white focus:ring-white focus:border-white"
          >
            <option value="">Awards</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </form>
        <form>
          <select
            id="alphabetics"
            value={sortOrder}
            onChange={(e) => { setSortOrder(e.target.value); }}
            className="cursor-pointer border text-sm rounded-full block w-full p-2.5 bg-yellow-900 hover:bg-yellow-700 placeholder-yellow-900 text-white focus:ring-white focus:border-white"
          >
            <option value="">Alphabetics</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </form>
        <form className="flex-auto">
          <div className="flex w-full items-center">
            <div className="flex space-x-4 items-center justify-center w-full">
              <input
                type="text"
                className="p-2 bg-neutral-200 border border-yellow-900 rounded-full w-full"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => { setIsSearched(false); setSearchTerm(e.target.value); }}
                onKeyPress={handleKeyPress} // Menambahkan event handler untuk KeyPress
              />
              <button type="button"
                onClick={handleSearch} // Menggunakan handleSearch untuk pencarian manual
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-full">
                Cari
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FiltersAndSorting;
