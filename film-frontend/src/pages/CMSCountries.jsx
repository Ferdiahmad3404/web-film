import React, { useState } from 'react';
import CMSSidebar from '../components/CMSSidebar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';

const CMSCountries = () => {
    const [countries, setCountries] = useState([
        { id: 1, name: 'Japan' },
        { id: 2, name: 'Korea' }
    ]);
    const [newCountry, setNewCountry] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('a-z');

    // Function to render the country list
    const renderCountries = (countriesToRender) => {
        return countriesToRender.map((country, index) => (
            <tr key={country.id} className="border-b dark:border-gray-700">
                <th scope="row" className="px-4 py-3 font-medium text-black">{index + 1}</th>
                <td className="px-4 py-3 font-medium text-black">{country.name}</td>
                <td className="text-center flex items-center justify-end">
                    <button onClick={() => editCountry(country.id)} className="flex py-2 px-4 hover:text-blue-600 text-black">
                        Edit
                    </button>
                    <span className="text-black">|</span>
                    <button onClick={() => deleteCountry(country.id)} className="flex items-center py-2 px-4 hover:text-red-600 text-black">
                        Delete
                    </button>
                </td>
            </tr>
        ));
    };

    // Add a new country
    const addCountries = () => {
        if (newCountry.trim() && !countries.some(country => country.name === newCountry)) {
            const newId = countries.length > 0 ? Math.max(...countries.map(country => country.id)) + 1 : 1;
            setCountries([...countries, { id: newId, name: newCountry }]);
            setNewCountry('');
        }
    };

    // Edit country
    const editCountry = (id) => {
        const country = countries.find(c => c.id === id);
        const newName = prompt('Edit country name:', country.name);
        if (newName && newName.trim() !== '') {
            setCountries(countries.map(c => c.id === id ? { ...c, name: newName.trim() } : c));
        }
    };

    // Delete country
    const deleteCountry = (id) => {
        if (window.confirm('Are you sure you want to delete this country?')) {
            setCountries(countries.filter(country => country.id !== id));
        }
    };

    // Filter and sort countries
    const getFilteredAndSortedCountries = () => {
        const filteredCountries = countries.filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sortedCountries = [...filteredCountries];
        if (sortOption === 'a-z') {
            sortedCountries.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'z-a') {
            sortedCountries.sort((a, b) => b.name.localeCompare(a.name));
        }

        return sortedCountries;
    };

    return (
        <>
            <div className="bg-gray-100">
                <div className="flex">
                    <CMSSidebar />
                    <main className="flex-1 bg-gray-100 p-6">
                        <div className="w-full p-9">
                            <div className="flex flex-col justify-between">
                                <h1 className="text-2xl mb-5 font-medium">Add New Countries</h1>
                                <form className="flex justify-between items-center mb-10">
                                    <div className="relative w-4/6">
                                        <input 
                                            type="text" 
                                            name="floating_name" 
                                            id="new-countries"
                                            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                            placeholder=" " 
                                            value={newCountry}
                                            onChange={(e) => setNewCountry(e.target.value)}
                                            required 
                                        />
                                        <label htmlFor="new-countries" className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Country Name
                                        </label>
                                    </div>
                                    <button type="button" onClick={addCountries} className="w-1/6 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600">Add</button>
                                </form>


                                <div className="flex justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <input 
                                            type="text" 
                                            className="border border-gray-400 px-4 py-2 rounded-full" 
                                            placeholder="Search country" 
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)} 
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2 w-1/6">
                                        <label className="mr-2 w-full">Sort by:</label>
                                        <select 
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

                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-400">
                                    <thead className="text-xs text-white uppercase bg-yellow-900">
                                        <tr>
                                            <th scope="col" className="w-1/12 px-4 py-4 sr-only">No</th>
                                            <th scope="col" className="w-9/12 px-4 py-4">Countries</th>
                                            <th scope="col" className="w-2/12 px-4 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderCountries(getFilteredAndSortedCountries())}
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

export default CMSCountries;