import React, { useState } from 'react';
import CMSSidebar from '../components/CMSSidebar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';

const CMSDramas = () => {
    const [dramas, setDramas] = useState([
        { id: 1, drama: '[2024] Japan - Eye Love You', actor: 'Takuya Kimura, Takeuchi Yuko, Neinen Reina', genre: 'Romance, Adventures, Comedy', synopsis: 'I love this drama. It taught me a lot about money and finance. Love is not everything. We need to face the reality too. Being stoic is the best.', status: 'unapproved' },
        { id: 2, drama: '[2024] Japan - Eye Love You', actor: 'Takuya Kimura, Takeuchi Yuko, Neinen Reina', genre: 'Romance, Adventures, Comedy', synopsis: 'Meh', status: 'approved' }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('a-z');

    // Handle search filtering
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle sorting
    const handleSort = (e) => {
        setSortOption(e.target.value);
    };

    const filteredAndSortedDramas = () => {
        let filtered = dramas.filter(drama => 
        drama.drama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drama.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drama.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        drama.synopsis.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (sortOption === 'a-z') {
        filtered.sort((a, b) => a.drama.localeCompare(b.drama));
        } else if (sortOption === 'z-a') {
        filtered.sort((a, b) => b.drama.localeCompare(a.drama));
        }

        return filtered;
    };

    // Handle edit
    const editDrama = (id) => {
        const dramaToEdit = dramas.find(drama => drama.id === id);
        const newDramaTitle = prompt('Edit drama title:', dramaToEdit.drama);
        const newActor = prompt('Edit actor name:', dramaToEdit.actor);
        const newGenre = prompt('Edit genre:', dramaToEdit.genre);
        const newSynopsis = prompt('Edit synopsis:', dramaToEdit.synopsis);
        const newStatus = prompt('Edit status:', dramaToEdit.status);

        if (newDramaTitle && newActor && newGenre && newSynopsis && newStatus) {
        const updatedDramas = dramas.map(drama => drama.id === id 
            ? { ...drama, drama: newDramaTitle, actor: newActor, genre: newGenre, synopsis: newSynopsis, status: newStatus } 
            : drama
        );
        setDramas(updatedDramas);
        }
    };

    // Handle delete
    const deleteDrama = (id) => {
        const updatedDramas = dramas.filter(drama => drama.id !== id);
        setDramas(updatedDramas);
    };

    return (
        <>
            <div className="bg-gray-100">
                <div className="flex">
                    <CMSSidebar />

                    {/* Main Content */}
                    <main className="flex-1 bg-gray-100 p-6">
                        <div className="w-full p-9">
                        <div className="mb-5 flex flex-col justify-between">
                            <h1 className="text-2xl mb-5 font-medium">Drama</h1>
                        </div>

                        {/* Search and Sort Options */}
                        <div className="flex justify-between mb-4">
                            <div className="flex items-center space-x-2">
                            <input 
                                type="text" 
                                className="border border-gray-400 px-4 py-2 rounded-full" 
                                placeholder="Search country"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            </div>

                            <div className="flex items-center space-x-2 w-1/6">
                            <label className="mr-2 w-full">Sort by:</label>
                            <select 
                                className="w-full border border-gray-400 px-4 py-2 rounded-full"
                                value={sortOption}
                                onChange={handleSort}
                            >
                                <option value="a-z">A-Z</option>
                                <option value="z-a">Z-A</option>
                            </select>
                            </div>
                        </div>

                        {/* Country List */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left mb-10 text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-yellow-900 dark:text-white">
                                <tr>
                                <th className="w-1/12 px-4 py-4 sr-only">No</th>
                                <th className="w-2/12 px-4 py-4">Drama</th>
                                <th className="w-2/12 px-4 py-4">Actors</th>
                                <th className="w-2/12 px-4 py-4">Genres</th>
                                <th className="w-3/12 px-4 py-4">Synopsis</th>
                                <th className="w-1/12 px-4 py-4">Status</th>
                                <th className="w-1/12 px-4 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedDramas().map((drama, index) => (
                                <tr className="border-b dark:border-gray-700" key={drama.id}>
                                    <td className="px-4 py-3 text-black">{index + 1}</td>
                                    <td className="px-4 py-3 text-black">{drama.drama}</td>
                                    <td className="px-4 py-3 text-black">{drama.actor}</td>
                                    <td className="px-4 py-3 text-black">{drama.genre}</td>
                                    <td className="px-4 py-3 text-black">{drama.synopsis}</td>
                                    <td className="px-4 py-3 text-black">{drama.status}</td>
                                    <td className="text-center">
                                    <div className="flex justify-center items-center">
                                        <button 
                                        onClick={() => editDrama(drama.id)} 
                                        className="flex py-2 px-4 hover:text-blue-600 text-black"
                                        >
                                        Edit
                                        </button>
                                        <span className="text-black">|</span>
                                        <button 
                                        onClick={() => deleteDrama(drama.id)} 
                                        className="flex items-center py-2 px-4 hover:text-red-600 text-black"
                                        >
                                        Delete
                                        </button>
                                    </div>
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

export default CMSDramas;