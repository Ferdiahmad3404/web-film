import React, { useState, useEffect } from 'react';
import CMSSidebar from '../components/CMSSidebar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';

const CMSGenres = () => {
    const [genres, setGenres] = useState([]);
    const [newGenre, setNewGenre] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('a-z');
    const [errorMessage, setErrorMessage] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const genresPerPage = 10; // Set maximum genres per page

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await fetch('http://localhost:8000/genres');
            const data = await response.json();
            setGenres(data.data);
        } catch (error) {
            console.error('Error fetching genres:', error);
            setErrorMessage('Error fetching genres');
        }
    };

    // Calculate the filtered and sorted genres
    const filteredGenres = genres.filter(genre => genre.genre.toLowerCase().includes(searchTerm.toLowerCase()));
    const sortedGenres = [...filteredGenres].sort((a, b) => {
        return sortOption === 'a-z'
            ? a.genre.localeCompare(b.genre)
            : b.genre.localeCompare(a.genre);
    });

    // Pagination logic
    const indexOfLastGenre = currentPage * genresPerPage;
    const indexOfFirstGenre = indexOfLastGenre - genresPerPage;
    const currentGenres = sortedGenres.slice(indexOfFirstGenre, indexOfLastGenre);
    const totalPages = Math.ceil(sortedGenres.length / genresPerPage);

    const addGenre = async () => {
        if (newGenre.trim()) {
            if (genres.some(genre => genre.genre === newGenre)) {
                alert('Genre already exists!');
                return;
            }

            try {
                const response = await fetch('http://localhost:8000/genres', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ genre: newGenre }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message || 'Error adding genre!');
                    return;
                }

                const data = await response.json();
                setGenres(prevGenres => [...prevGenres, data.data]);
                setNewGenre('');
                setErrorMessage('');
            } catch (error) {
                console.error('Error adding genre:', error);
                setErrorMessage('Error adding genre!');
            }
        }
    };

    const editGenre = async (id) => {
        const genre = genres.find(g => g.id === id);
        const newName = prompt('Edit genre name:', genre.genre);
        if (newName && newName.trim() !== '') {
            if (genres.some(g => g.id !== id && g.genre === newName)) {
                alert('Genre already exists!');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8000/genres/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ genre: newName.trim() }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message || 'Error updating genre!');
                    return;
                }

                const updatedGenre = await response.json();
                setGenres(prevGenres => prevGenres.map(g => (g.id === id ? updatedGenre.data : g)));
                setErrorMessage('');
            } catch (error) {
                console.error('Error updating genre:', error);
                setErrorMessage('Error updating genre!');
            }
        }
    };

    const deleteGenre = async (id) => {
        if (confirm('Are you sure you want to delete this genre?')) {
            try {
                const response = await fetch(`http://localhost:8000/genres/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    setErrorMessage(errorData.message || 'Error deleting genre!');
                    return;
                }

                setGenres(prevGenres => prevGenres.filter(genre => genre.id !== id));
                setErrorMessage('');
            } catch (error) {
                console.error('Error deleting genre:', error);
                setErrorMessage('Error deleting genre!');
            }
        }
    };

    // Change page handler
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handlers for previous and next buttons
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
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
                                                name="floating_name"
                                                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                value={newGenre}
                                                onChange={(e) => setNewGenre(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Genre Name
                                            </label>
                                        </div>
                                        <button onClick={addGenre} className="flex w-1/6 h-10 mb-10 items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">Add</button>
                                    </div>

                                    {/* Error Message */}
                                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}

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
                                    <thead className="text-xs uppercase bg-yellow-900 text-white">
                                        <tr>
                                            <th scope="col" className="w-1/12 px-4 py-4 sr-only">No</th>
                                            <th scope="col" className="w-9/12 px-4 py-4">Genre</th>
                                            <th scope="col" className="w-2/12 px-4 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentGenres.map((genre, index) => (
                                            <tr key={genre.id} className="border-b border-gray-700">
                                                <th scope="row" className="px-4 py-3 font-medium text-black">{index + 1 + (currentPage - 1) * genresPerPage}</th>
                                                <td className="px-4 py-3 text-black">{genre.genre}</td>
                                                <td className="px-4 py-3">
                                                    <button onClick={() => editGenre(genre.id)} className="text-blue-500 hover:underline">Edit</button>
                                                    <button onClick={() => deleteGenre(genre.id)} className="text-red-500 hover:underline ml-2">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center mt-5">
                                <button onClick={handlePrevPage} className={`mx-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded`}>
                                    Previous
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => handlePageChange(i + 1)}
                                        className={`mx-1 ${currentPage === i + 1 ? 'bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button onClick={handleNextPage} className={`mx-2 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} text-white py-2 px-4 rounded`}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default CMSGenres;
