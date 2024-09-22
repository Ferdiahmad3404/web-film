import React, { useState } from 'react';
import CMSSidebar from '../components/CMSSidebar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';

const CMSAwards = () => {
    const [awards_, setAwards_] = useState([
        { id: 1, name: 'Japan', year: 2024, awards: 'Japanese Drama Award Spring 2024' },
        { id: 2, name: 'Korea', year: 2022, awards: 'Korean Drama Award Summer 2022' }
    ]);
    const [newCountry, setNewCountry] = useState('');
    const [newYear, setNewYear] = useState('');
    const [newAwards, setNewAwards] = useState('');
    const [sortOption, setSortOption] = useState('a-z');
    const [searchInput, setSearchInput] = useState('');

    // Function to render the award list
    const renderAwards = () => {
        const filteredAwards = awards_.filter(item => 
            item.name.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.year.toString().includes(searchInput) ||
            item.awards.toLowerCase().includes(searchInput.toLowerCase())
        );

        return filteredAwards.sort((a, b) => {
            if (sortOption === 'a-z') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        }).map((item, index) => (
            <tr key={item.id} className="border-b dark:border-gray-700">
                <th scope="row" className="px-4 py-3 font-medium dark:text-black">{index + 1}</th>
                <td className="px-4 py-3 font-medium dark:text-black">{item.name}</td>
                <td className="px-4 py-3 font-medium dark:text-black">{item.year}</td>
                <td className="px-4 py-3 font-medium dark:text-black">{item.awards}</td>
                <td className="text-center flex items-center justify-end">
                    <button onClick={() => editAwards(item.id)} className="flex py-2 px-4 hover:text-blue-600 dark:hover:text-blue-600 text-black">
                        Edit
                    </button>
                    <span className="text-black">|</span>
                    <button onClick={() => deleteAwards(item.id)} className="flex items-center py-2 px-4 hover:text-blue-600 dark:hover:text-red-600 text-black">
                        Delete
                    </button>
                </td>
            </tr>
        ));
    };

    // Add a new award
    const addAwards = (e) => {
        e.preventDefault();
        if (newCountry && newYear && newAwards && !awards_.some(c => c.awards === newAwards)) {
            setAwards_(prevAwards => [
                ...prevAwards,
                { id: prevAwards.length + 1, name: newCountry, year: newYear, awards: newAwards }
            ]);
            setNewCountry('');
            setNewYear('');
            setNewAwards('');
        }
    };

    // Edit award by ID
    const editAwards = (id) => {
        const item = awards_.find(a => a.id === id);
        if (!item) return;

        const newCountry = prompt('Edit country name:', item.name);
        const newYear = prompt('Edit year:', item.year);
        const newAwards = prompt('Edit awards:', item.awards);

        if (newCountry && newYear && newAwards) {
            setAwards_(prev => prev.map(a => a.id === id ? { ...a, name: newCountry, year: newYear, awards: newAwards } : a));
        }
    };

    // Delete award by ID
    const deleteAwards = (id) => {
        if (window.confirm('Are you sure you want to delete this award?')) {
            setAwards_(awards_.filter(a => a.id !== id));
        }
    };

    return (
        <>
            <div className="bg-gray-100">
                <div className="flex">
                    <CMSSidebar />
                    <main className="flex-1 bg-gray-100 p-6">
                        <div className="w-full p-9">
                            <div className="mb-5 flex flex-col justify-between">
                                <h1 className="text-2xl mb-5 font-medium">Add New Awards</h1>
                                <form onSubmit={addAwards} className="flex w-full">
                                    <div className="flex-col justify-between w-full">
                                        <div className="relative z-0 w-5/6 mb-5 group">
                                            <select
                                                value={newCountry}
                                                onChange={(e) => setNewCountry(e.target.value)}
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                required
                                            >
                                                <option value="" disabled hidden>Select country</option>
                                                <option value="Japan">Japan</option>
                                                <option value="Korea">Korea</option>
                                            </select>
                                        </div>
                                        <div className="relative z-0 w-5/6 mb-5 group">
                                            <select
                                                value={newYear}
                                                onChange={(e) => setNewYear(e.target.value)}
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                required
                                            >
                                                <option value="" disabled hidden>Select year</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex-col flex items-center w-full">
                                        <div className="relative z-0 w-5/6 mb-5 group">
                                            <input
                                                type="text"
                                                value={newAwards}
                                                onChange={(e) => setNewAwards(e.target.value)}
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Awards
                                            </label>
                                        </div>
                                        <button type="submit" className="w-3/6 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600">Add</button>
                                    </div>
                                </form>
                            </div>

                            {/* Search and Sort Options */}
                            <div className="flex justify-between mb-4">
                                {/* Search Bar */}
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        className="border border-gray-400 px-4 py-2 rounded-full"
                                        placeholder="Search country"
                                    />
                                </div>

                                {/* Sort Options */}
                                <div className="flex items-center space-x-2 w-1/6">
                                    <label className="mr-2 w-full">Sort by:</label>
                                    <select
                                        value={sortOption}
                                        onChange={(e) => setSortOption(e.target.value)}
                                        className="w-full border border-gray-400 px-4 py-2 rounded-full"
                                    >
                                        <option value="a-z">A-Z</option>
                                        <option value="z-a">Z-A</option>
                                    </select>
                                </div>
                            </div>

                            {/* Country List */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-yellow-900 dark:text-white">
                                        <tr>
                                            <th scope="col" className="w-1/12 px-4 py-4 sr-only">No</th>
                                            <th scope="col" className="w-2/12 px-4 py-4">Countries</th>
                                            <th scope="col" className="w-1/12 px-4 py-4">Years</th>
                                            <th scope="col" className="w-6/12 px-4 py-4">Awards</th>
                                            <th scope="col" className="w-2/12 px-4 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderAwards()}
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

export default CMSAwards;