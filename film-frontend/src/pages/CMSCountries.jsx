import React, { useState, useEffect } from 'react';
import CMSSidebar from '../components/CMSSidebar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';
import CountryList from '../components/CountryList';

const CMSCountries = () => {
    const [countries, setCountries] = useState([]);
    const [newCountry, setNewCountry] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('a-z');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [newlyAddedCountry, setNewlyAddedCountry] = useState(null); // State untuk negara yang baru ditambahkan

    useEffect(() => {
        fetchCountries();
    }, []);

    const fetchCountries = async () => {
        try {
            const response = await fetch('http://localhost:8000/countries');
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const addCountry = async () => {
        if (newCountry.trim()) {
            try {
                const requestData = {
                    country: newCountry.trim(),
                };

                const response = await fetch('http://localhost:8000/countries', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestData),
                });

                const data = await response.json();
                // Simpan negara baru di state terpisah
                setNewlyAddedCountry(data.data);
                setNewCountry('');
                showMessage('Country added successfully!', 'success');
            } catch (error) {
                console.error('Error adding country:', error);
                showMessage('Error adding country!', 'error');
            }
        }
    };

    const updateCountry = async (id, newName) => {
        try {
            await fetch(`http://localhost:8000/countries/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: newName }),
            });
            setCountries(
                countries.map((c) => (c.id === id ? { ...c, country: newName } : c))
            );
            showMessage('Country updated successfully!', 'success');
        } catch (error) {
            console.error('Error updating country:', error);
            showMessage('Error updating country!', 'error');
        }
    };

    const deleteCountry = async (id) => {
        if (window.confirm('Are you sure you want to delete this country?')) {
            try {
                const response = await fetch(`http://localhost:8000/countries/${id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                setCountries(countries.filter(country => country.id !== id));
                showMessage('Countries deleted successfully!', 'success');
            } catch (error) {
                console.error('Error deleting country:', error);
                showMessage('Error deleting country!', 'error');
            }
        }
    };

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 3000);
    };

    const getFilteredAndSortedCountries = () => {
        // Filter negara yang bukan baru ditambahkan
        const filteredCountries = countries.filter(country =>
            country.country && country.country.toLowerCase().includes(searchTerm.toLowerCase())
        );

        const sortedCountries = [...filteredCountries];
        if (sortOption === 'a-z') {
            sortedCountries.sort((a, b) => a.country.localeCompare(b.country));
        } else if (sortOption === 'z-a') {
            sortedCountries.sort((a, b) => b.country.localeCompare(a.country));
        }

        // Kembalikan array dengan negara baru di depan dan negara lainnya yang terfilter dan terurut
        return newlyAddedCountry ? [newlyAddedCountry, ...sortedCountries] : sortedCountries;
    };

    return (
        <>
            <div className="bg-gray-100">
                <div className="flex">
                    <CMSSidebar />
                    <main className="flex-1 bg-gray-100 p-6">
                        <div className="w-full p-9">
                            <h1 className="text-2xl mb-5 font-medium">Add New Countries</h1>

                            {message && (
                                <div className={`mb-4 p-2 text-white rounded ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {message}
                                </div>
                            )}

                            <form className="flex justify-between items-center mb-10" onSubmit={(e) => { e.preventDefault(); addCountry(); }}>
                                <div className="relative z-0 w-4/6 group">
                                    <input
                                        type="text"
                                        className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        value={newCountry}
                                        onChange={(e) => setNewCountry(e.target.value)}
                                        required
                                    />
                                    <label className="peer-focus:font-medium absolute text-sm text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                        Country Name
                                    </label>
                                </div>
                                <button type="submit" className="w-1/6 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600">Add</button>
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
                                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="border border-gray-400 px-4 py-2 rounded-full">
                                    <option value="a-z">A-Z</option>
                                    <option value="z-a">Z-A</option>
                                </select>
                            </div>

                            <CountryList
                                countries={getFilteredAndSortedCountries()}
                                updateCountry={updateCountry}
                                deleteCountry={deleteCountry}
                            />
                        </div>
                    </main>
                    <Sidenav />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default CMSCountries;

