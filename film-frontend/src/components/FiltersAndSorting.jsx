import { useState } from 'react';

const FiltersAndSorting = ({ onFilterChange, applyFilters, clearFilters, distinctValues }) => {
  const [filters, setFilters] = useState({
    year: '',
    genre: '',
    streamsite: '',
    awards: '',
    searchTerm: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleApplyFilter = () => {
    applyFilters();
  };

  const handleClearFilter = () => {
    setFilters({
      year: '',
      genre: '',
      streamsite: '',
      awards: '',
      searchTerm: ''
    });
    onFilterChange({
      year: '',
      genre: '',
      streamsite: '',
      awards: '',
      searchTerm: ''
    });
    clearFilters();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleApplyFilter();
    }
  };

  return (
    <div className="p-3 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex flex-wrap items-center space-x-2">
        {/* Search Bar */}
        <input
          type="text"
          name="searchTerm"
          value={filters.searchTerm}
          placeholder="Search Title..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="w-full sm:w-2/3 p-2 rounded-md border border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Dropdown Tahun */}
        <select
          name="year"
          value={filters.year}
          onChange={handleInputChange}
          className="w-28 p-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={handleKeyDown}
        >
          <option value="">Year</option>
          {distinctValues.years.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>

        {/* Dropdown Genre */}
        <select
          name="genre"
          value={filters.genre}
          onChange={handleInputChange}
          className="w-28 p-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={handleKeyDown}
        >
          <option value="">Genre</option>
          {distinctValues.genres.map((genre, index) => (
            <option key={index} value={genre.genre}>{genre.genre}</option>
          ))}
        </select>

        {/* Dropdown Platform */}
        <select
          name="streamsite"
          value={filters.streamsite}
          onChange={handleInputChange}
          className="w-28 p-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={handleKeyDown}
        >
          <option value="">Platform</option>
          {distinctValues.streamsites.map((streamsite, index) => (
            <option key={index} value={streamsite}>{streamsite}</option>
          ))}
        </select>

        {/* Dropdown Awards */}
        <select
          name="awards"
          value={filters.awards}
          onChange={handleInputChange}
          className="w-28 p-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onKeyDown={handleKeyDown}
        >
          <option value="">Awards</option>
          <option value="true">With Awards</option>
          <option value="false">No Awards</option>
        </select>

        {/* Apply Filter Button */}
        <button
          onClick={handleApplyFilter}
          className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-400 transition ease-in-out"
        >
          Apply
        </button>

        {/* Clear Filter Button */}
        <button
          onClick={handleClearFilter}
          className="p-2 bg-gray-300 text-gray-700 rounded-md shadow-md hover:bg-gray-200 transition ease-in-out"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default FiltersAndSorting;
