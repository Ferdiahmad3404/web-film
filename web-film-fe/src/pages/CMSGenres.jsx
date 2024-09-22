import React, { useState } from 'react';
import CMSSidebar from '../components/CMSSidebar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';

const CMSGenres = () => {
    const [genres, setGenres] = useState([
        { id: 1, name: 'Romance' },
        { id: 2, name: 'Comedy' },
        { id: 3, name: 'Sci-fi' },
        { id: 4, name: 'Mystery' },
        { id: 5, name: 'Horror' },
    ]);
    const [newGenre, setNewGenre] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('a-z');

    const filteredGenres = genres.filter(genre => genre.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const sortedGenres = [...filteredGenres].sort((a, b) => {
        return sortOption === 'a-z'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });

    const addGenre = () => {
        if (newGenre.trim() && !genres.some(genre => genre.name === newGenre)) {
            const newId = genres.length > 0 ? Math.max(...genres.map(genre => genre.id)) + 1 : 1;
            setGenres([...genres, { id: newId, name: newGenre }]);
            setNewGenre('');
        }
    };

    const editGenre = (id) => {
        const genre = genres.find(g => g.id === id);
        const newName = prompt('Edit genre name:', genre.name);
        if (newName && newName.trim() !== '') {
            setGenres(genres.map(g => (g.id === id ? { ...g, name: newName.trim() } : g)));
        }
    };

    const deleteGenre = (id) => {
        if (confirm('Are you sure you want to delete this genre?')) {
            setGenres(genres.filter(genre => genre.id !== id));
        }
    };

    return (
        <>
            <div className="bg-gray-100">
                <div className="flex">
                    <CMSSidebar />
                    <main className="flex-1 bg-gray-100 p-6">
                    <div className="w-full p-9">
                        <div className="flex flex-col justify-between">
                            <h1 className="text-2xl mb-5 font-medium">Add New Genres</h1>
                            <div>
                                <div className="flex justify-between items-center">
                                    <div className="relative items-center justify-between w-4/6 mb-10 space-x-2 z-0 group">
                                        <input
                                            type="text"
                                            id="new-genres"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            value={newGenre}
                                            onChange={(e) => setNewGenre(e.target.value)}
                                            required
                                        />
                                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Genre Name</label>
                                    </div>
                                    <button onClick={addGenre} className="flex w-1/6 h-10 mb-10 items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Add</button>
                                </div>

                                {/* Search and Sort Options */}
                                <div className="flex justify-between mb-4">
                                    {/* Search Bar */}
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            id="search-bar"
                                            className="border border-gray-400 px-4 py-2 rounded-full"
                                            placeholder="Search genre"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>

                                    {/* Sort Options */}
                                    <div className="flex items-center space-x-2 w-1/6">
                                        <label htmlFor="sort-options" className="mr-2 w-full">Sort by:</label>
                                        <select
                                            id="sort-options"
                                            className="w-full border border-gray-400 px-4 py-2 rounded-full"
                                            value={sortOption}
                                            onChange={(e) => setSortOption(e.target.value)}
                                        >
                                            <option value="a-z">A-Z</option>
                                            <option value="z-a">Z-A</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Genre List */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-yellow-900 dark:text-white">
                                    <tr>
                                        <th scope="col" className="w-1/12 px-4 py-4 sr-only">No</th>
                                        <th scope="col" className="w-9/12 px-4 py-4">Genre</th>
                                        <th scope="col" className="w-2/12 px-4 py-3">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedGenres.map((genre, index) => (
                                        <tr key={genre.id} className="border-b dark:border-gray-700">
                                            <th scope="row" className="px-4 py-3 font-medium dark:text-black">{index + 1}</th>
                                            <th scope="row" className="px-4 py-3 font-medium dark:text-black">{genre.name}</th>
                                            <td className="text-center flex items-center justify-end">
                                                <button onClick={() => editGenre(genre.id)} className="flex py-2 px-4 hover:text-blue-600 dark:hover:text-blue-600 text-black">
                                                    Edit
                                                </button>
                                                <span className="text-black">|</span>
                                                <button onClick={() => deleteGenre(genre.id)} className="flex items-center py-2 px-4 hover:text-blue-600 dark:hover:text-red-600 text-black">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                    <Sidenav />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CMSGenres;