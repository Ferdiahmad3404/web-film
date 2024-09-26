const FiltersAndSorting = () => {
  return (
    <div id="content" className="mb-3 p-4 w-full flex space-x-4">
      <form>
        <select id="years" className="cursor-pointer border text-sm rounded-lg block w-full p-2.5 bg-yellow-900 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
          <option selected>Choose a year</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </form>
      <form>
        <select id="genre" className="cursor-pointer border text-sm rounded-lg block w-full p-2.5 bg-yellow-900 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
          <option selected>Choose a genre</option>
          <option value="action">Action</option>
          <option value="drama">Drama</option>
          <option value="horror">Horror</option>
          <option value="fantasy">Fantasy</option>
        </select>
      </form>
      <form>
        <select id="status" className="cursor-pointer border text-sm rounded-lg block w-full p-2.5 bg-yellow-900 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
          <option selected>Choose a status</option>
          <option value="on_going">On Going</option>
          <option value="finished">Finished</option>
        </select>
      </form>
      <form>
        <select id="platform" className="cursor-pointer border text-sm rounded-lg block w-full p-2.5 bg-yellow-900 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
          <option selected>Choose a platform</option>
          <option value="imdb">IMDB</option>
          <option value="netflix">Netflix</option>
          <option value="viu">Viu</option>
          <option value="wetv">WeTV</option>
        </select>
      </form>
      <form>
        <select id="awards" className="cursor-pointer border text-sm rounded-lg block w-full p-2.5 bg-yellow-900 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
          <option selected>Awards</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </form>
      <form>
        <select id="alphabetics" className="cursor-pointer border text-sm rounded-lg block w-full p-2.5 bg-yellow-900 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
          <option selected>Alphabetics</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </form>
      <form className="flex-auto">
        <div className="relative">
          <input 
            type="search" 
            id="default-search" 
            className="block w-full p-3 ps-10 text-sm text-white border rounded-lg bg-yellow-900 border-yellow-900 placeholder-white focus:ring-blue-500 focus:border-gray-900" 
            placeholder="Search ..." 
            required 
          />
          <button 
            type="submit" 
            className="text-white absolute right-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default FiltersAndSorting;