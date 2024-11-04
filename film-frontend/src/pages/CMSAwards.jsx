import React, { useEffect, useState } from 'react';
import CMSSidebar from '../components/CMSSidebar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';
import axios from 'axios';

const CMSAwards = () => {
    const [awards, setAwards] = useState([]);
    const [countries, setCountries] = useState([]);
    const [newCountry, setNewCountry] = useState('');
    const [newYear, setNewYear] = useState('');
    const [newAwards, setNewAwards] = useState('');
    const [sortOption, setSortOption] = useState('a-z');
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [statusMessage, setStatusMessage] = useState('');
    const [statusType, setStatusType] = useState('');

    useEffect(() => {
        fetchAwards();
        fetchCountries();
    }, []);

    useEffect(() => {
        if (statusMessage) {
            const timer = setTimeout(() => {
                setStatusMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [statusMessage]);

    const fetchAwards = async () => {
        try {
            const response = await fetch('http://localhost:8000/awards');
            const data = await response.json();
            console.log('Full Awards response:', data);
            if (data && Array.isArray(data.data)) {
                setAwards(data.data);
            } else {
                console.error('Awards data is not an array:', data);
                setAwards([]);
                setStatusMessage('Unexpected awards data format.');
                setStatusType('error');
            }
        } catch (error) {
            console.error('Failed to fetch awards:', error);
            setStatusMessage('Failed to fetch awards.');
            setStatusType('error');
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await fetch('http://localhost:8000/countries');
            const data = await response.json();
            console.log('Countries response:', data);
            if (Array.isArray(data)) {
                setCountries(data);
            } else {
                console.error('Countries data is not an array:', data);
                setCountries([]);
            }
        } catch (error) {
            console.error('Failed to fetch countries:', error);
            setCountries([]);
            setStatusMessage('Failed to fetch countries.');
            setStatusType('error');
        }
    };

    const filteredAwards = () => {
        return awards.filter(item =>
            item.country.country.toLowerCase().includes(searchInput.toLowerCase()) ||
            item.year.toString().includes(searchInput) ||
            item.award.toLowerCase().includes(searchInput.toLowerCase())
        ).sort((a, b) => {
            return sortOption === 'a-z' ?
                a.country.country.localeCompare(b.country.country) :
                b.country.country.localeCompare(a.country.country);
        });
    };

    const paginatedAwards = () => {
        const filtered = filteredAwards();
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filtered.slice(startIndex, startIndex + itemsPerPage);
    };

    const renderAwards = () => {
        return paginatedAwards().map((item, index) => (
            <tr key={item.id} className="border-b dark:border-gray-700">
                <th scope="row" className="px-4 py-3 font-medium dark:text-black">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                <td className="px-4 py-3">{item.country.country}</td>
                <td className="px-4 py-3">{item.year}</td>
                <td className="px-4 py-3">{item.award}</td>
                <td className="text-center flex items-center justify-end">
                    <button onClick={() => deleteAwards(item.id)} className="flex items-center py-2 px-4 hover:text-red-600 text-black">Delete</button>
                </td>
            </tr>
        ));
    };

    const addAwards = async (e) => {
        e.preventDefault();
        if (newCountry && newYear && newAwards) {
            try {
                // const response = await axios.post('http://localhost:8000/awards', {
                //     country_id: newCountry,
                //     year: newYear,
                //     award: newAwards
                // });
                const response = await fetch('http://localhost:8000/awards', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ country_id: newCountry, year: newYear, award: newAwards }),
                });

                setAwards(prev => [...prev, response.data.data]);
                resetForm();
                setStatusMessage('Award added successfully.');
                setStatusType('success');
            } catch (error) {
                console.error('Failed to add award:', error);
                setStatusMessage('Failed to add award.');
                setStatusType('error');
            }
        }
    };

    const deleteAwards = async (id) => {
        if (window.confirm('Are you sure you want to delete this award?')) {
            try {
                await axios.delete(`http://localhost:8000/awards/${id}`);
                setAwards(awards.filter(a => a.id !== id));
                setStatusMessage('Award deleted successfully.');
                setStatusType('success');
            } catch (error) {
                console.error('Failed to delete award:', error);
                setStatusMessage('Failed to delete award.');
                setStatusType('error');
            }
        }
    };

    const resetForm = () => {
        setNewCountry('');
        setNewYear('');
        setNewAwards('');
    };

    const totalPages = () => {
        return Math.ceil(filteredAwards().length / itemsPerPage);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <div className="bg-grey-100">
                <div className="flex">
                    <CMSSidebar />
                    <main className="flex-1">
                        <div className="p-5">
                            <h2 className="text-2xl font-bold mb-4">Manage Awards</h2>
                            {statusMessage && (
                                <div className={`alert ${statusType === 'success' ? 'alert-success' : 'alert-error'}`}>
                                    {statusMessage}
                                </div>
                            )}
                            <form onSubmit={addAwards} className="mb-5 space-y-4">
                                <div>
                                    <label htmlFor="country" className="block mb-2">Country</label>
                                    <select
                                        id="country"
                                        value={newCountry}
                                        onChange={(e) => setNewCountry(e.target.value)}
                                        required
                                        className="border-2 border-gray-300 rounded p-1 w-full"
                                    >
                                        <option value="">Select a country</option>
                                        {Array.isArray(countries) && countries.map(country => (
                                            <option key={country.id} value={country.id}>{country.country}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="year" className="block mb-2">Year</label>
                                    <input
                                        type="text"
                                        id="year"
                                        value={newYear}
                                        onChange={(e) => setNewYear(e.target.value)}
                                        required
                                        className="border-2 border-gray-300 rounded p-1 w-full"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="awards" className="block mb-2">Award</label>
                                    <input
                                        type="text"
                                        id="awards"
                                        value={newAwards}
                                        onChange={(e) => setNewAwards(e.target.value)}
                                        required
                                        className="border-2 border-gray-300 rounded p-1 w-full"
                                    />
                                </div>
                                <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Add Award</button>
                            </form>
                            <table className="min-w-full">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">#</th>
                                        <th className="px-4 py-2">Country</th>
                                        <th className="px-4 py-2">Year</th>
                                        <th className="px-4 py-2">Award</th>
                                        <th className="px-4 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {renderAwards()}
                                </tbody>
                            </table>
                            <div className="mt-4">
                                <button
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="mr-2"
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={currentPage === totalPages()}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                        
                    </main>
                    <Sidenav />
                </div>
                <Footer />
            </div>
        </>
    );
};

export default CMSAwards;
