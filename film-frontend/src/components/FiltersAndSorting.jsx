const FiltersAndSorting = () => {
  return (
    <div id="content" className="mb-3 p-4 w-full flex space-x-4">
      <form>
        <select id="years" className="cursor-pointer bg-yellow-900 border border-gray-900 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5">
          <option selected>Choose a year</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </form>
      <form>
        <select id="genre" className="cursor-pointer bg-yellow-900 border border-gray-900 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5">
          <option selected>Choose a genre</option>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="fantasy">Fantasy</option>
        </select>
      </form>
      <form>
        <select id="status" className="cursor-pointer bg-yellow-900 border border-gray-900 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5">
          <option selected>Choose a status</option>
          <option value="on_going">On Going</option>
          <option value="finished">Finished</option>
        </select>
      </form>
      <form>
        <select id="platform" className="cursor-pointer bg-yellow-900 border border-gray-900 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5">
          <option selected>Choose a platform</option>
          <option value="imdb">IMDB</option>
          <option value="netflix">Netflix</option>
          <option value="viu">Viu</option>
          <option value="wetv">WeTV</option>
        </select>
      </form>
      <form>
        <select id="awards" className="cursor-pointer bg-yellow-900 border border-gray-900 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5">
          <option selected>Awards</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </form>
      <form>
        <select id="alphabetics" className="cursor-pointer bg-yellow-900 border border-gray-900 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option selected>Alphabetics</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </form>
      <form className="flex-auto">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-yellow-900 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            id="default-search" 
            className="block w-full p-3 ps-10 text-sm text-white border border-gray-300 rounded-lg bg-yellow-900 placeholder-white text-black focus:ring-blue-500 focus:border-blue-500" 
            placeholder="Search ..." 
            required 
          />
          <button 
            type="submit" 
            className="text-white absolute end-2.5 bottom-1.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default FiltersAndSorting;