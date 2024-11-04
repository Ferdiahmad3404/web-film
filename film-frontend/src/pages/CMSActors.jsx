import React, { useState, useEffect } from 'react'; 
import CMSSidebar from '../components/CMSSidebar';
import ActorList from '../components/ActorList'; 

const CMSActors = () => {
    const [actors, setActors] = useState([]);
    const [countries, setCountries] = useState([]);
    const [newCountry, setNewCountry] = useState('');
    const [newActorName, setNewActorName] = useState('');
    const [newBirthDate, setNewBirthDate] = useState('');
    const [newPhoto, setNewPhoto] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('a-z');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [actorsPerPage] = useState(10); 
    const [posterPreview, setPosterPreview] = useState(null);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchActors();
        fetchCountries();
    }, []);

    const fetchActors = async () => {
        try {
            const response = await fetch('http://localhost:8000/actors'); 
            const data = await response.json();
            if (data.success) {
                setActors(data.data);
            }
        } catch (error) {
            console.error('Error fetching actors:', error);
        }
    };

    const fetchCountries = async () => {
        try {
            const response = await fetch('http://localhost:8000/countries'); 
            const data = await response.json();
            if (Array.isArray(data)) {
                setCountries(data);
            } else {
                console.error('Unexpected data format:', data);
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const addActors = async () => {
        if (newCountry && newActorName && newBirthDate && newPhoto) {
            const newActor = { 
                country_id: newCountry, 
                name: newActorName, 
                birth_date: newBirthDate, 
                url_photos: newPhoto 
            };
            try {
                const response = await fetch('http://localhost:8000/actors', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newActor),
                });
                const savedActor = await response.json();
                setActors(prevActors => [...prevActors, savedActor]); // Update actors state
                resetForm();
                showMessage('Actor added successfully!', 'success');
            } catch (error) {
                console.error('Error adding actor:', error);
                showMessage('Error adding actor!', 'error');
            }
        }
    };

    const resetForm = () => {
        setNewCountry('');
        setNewActorName('');
        setNewBirthDate('');
        setNewPhoto('');
        setPosterPreview(null);
        setFile(null);
    };

    const editActors = async (id, updatedActor) => {
        const index = actors.findIndex(actor => actor.id === id);
        if (index === -1) return;

        const item = actors[index];
        try {
            await fetch(`http://localhost:8000/actors/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: updatedActor.name,
                    birth_date: updatedActor.birth_date,
                }),
            });
            const updatedActors = [...actors];
            updatedActors[index] = { ...item, ...updatedActor };
            setActors(updatedActors);
            showMessage('Actor updated successfully!', 'success');
        } catch (error) {
            console.error('Error editing actor:', error);
            showMessage('Error updating actor!', 'error');
        }
    };

    const deleteActors = async (id) => {
        try {
            await fetch(`http://localhost:8000/actors/${id}`, { method: 'DELETE' });
            const updatedActors = actors.filter(actor => actor.id !== id);
            setActors(updatedActors);
            showMessage('Actor deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting actor:', error);
            showMessage('Error deleting actor!', 'error');
        }
    };

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 3000);
    };

    const sortedActors = [...actors].sort((a, b) => {
        if (sortOrder === 'a-z') return a.name.localeCompare(b.name);
        if (sortOrder === 'z-a') return b.name.localeCompare(a.name);
        return 0;
    });

    const filteredActors = sortedActors.filter(item =>
        item.country.country.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.birth_date.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredActors.length / actorsPerPage);
    const currentActors = filteredActors.slice((currentPage - 1) * actorsPerPage, currentPage * actorsPerPage);

    const getPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 5);

        if (endPage - startPage < 5) {
            startPage = Math.max(1, endPage - 5);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePosterChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setPosterPreview(e.target.result); 
                setFile(selectedFile);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleChangePoster = () => {
        setPosterPreview(null);
        setFile(null);
    };

    return (
        <div className="bg-gray-100">
            <div className="flex">
                <CMSSidebar />
                <main className="flex-1 bg-gray-100 p-6">
                    <div className="w-full p-9">
                        <div className="mb-5 flex flex-col justify-between">
                            <h1 className="text-2xl mb-5 font-medium">Add Actors</h1>
                            <form onSubmit={e => { e.preventDefault(); addActors(); }} className="flex">
                                <div className="flex-col w-full justify-between">
                                    <div className="relative z-0 w-5/6 mb-5 group">
                                        <select
                                            value={newCountry}
                                            onChange={e => setNewCountry(e.target.value)}
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            required
                                        >
                                            <option value="" disabled hidden>Select country</option>
                                            {countries.map(country => (
                                                <option key={country.id} value={country.id}>{country.country}</option>
                                            ))}
                                        </select>
                                        <label 
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Country
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-5/6 mb-5 group">
                                        <input 
                                            type="text" 
                                            value={newActorName} 
                                            onChange={e => setNewActorName(e.target.value)} 
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required
                                        />
                                        <label 
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Actor Name
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-5/6 mb-5 group">
                                        <input 
                                            type="date" 
                                            value={newBirthDate} 
                                            onChange={e => setNewBirthDate(e.target.value)} 
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required
                                        />
                                        <label 
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Birth Date
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-5/6 mb-5 group">
                                        <input 
                                            type="text" 
                                            value={newPhoto} 
                                            onChange={e => setNewPhoto(e.target.value)}
                                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            placeholder=" "
                                            required
                                        />
                                        <label 
                                            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Photo URL
                                        </label>
                                    </div>
                                    <div className="w-full flex items-center mb-5">
                                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Actor</button>
                                    </div>
                                </div>
                            </form>
                            {message && (
                                <div className={`mt-4 text-${messageType === 'error' ? 'red' : 'green'}-500`}>
                                    {message}
                                </div>
                            )}
                        </div>
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            value={searchQuery} 
                            onChange={e => setSearchQuery(e.target.value)} 
                            className="w-full mb-4 p-2 border border-gray-300 rounded"
                        />
                        <ActorList actors={currentActors} editActors={editActors} deleteActors={deleteActors} />
                        
                        {/* Pagination Section */}
                        <div className="flex justify-center mt-4">
                            <div className="flex items-center">
                                {currentPage > 1 && (
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className="mx-1 px-3 py-1 rounded bg-white text-blue-500 border"
                                    >
                                        Prev
                                    </button>
                                )}
                                {getPageNumbers().map(page => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`mx-1 px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 border'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                {currentPage < totalPages && (
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className="mx-1 px-3 py-1 rounded bg-white text-blue-500 border"
                                    >
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CMSActors;
