import React, { useState, useEffect } from 'react'; 
import CMSSidebar from '../components/CMSSidebar';
import ActorList from '../components/ActorList'; 
import Sidenav from '../components/Sidenav'; 

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
    const [actorsPerPage] = useState(10); // Number of actors per page
    const [posterPreview, setPosterPreview] = useState(null);
    const [file, setFile] = useState(null);

    // Fetch actors and countries from the database
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
                setActors([...actors, savedActor]);
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
                body: JSON.stringify(updatedActor),
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

    // Calculate pagination
    const indexOfLastActor = currentPage * actorsPerPage;
    const indexOfFirstActor = indexOfLastActor - actorsPerPage;
    const currentActors = filteredActors.slice(indexOfFirstActor, indexOfLastActor);
    const totalPages = Math.ceil(filteredActors.length / actorsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleJumpToPage = (event) => {
        const pageNumber = Number(event.target.value);
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
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
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="w-52 h-52 p-5 flex flex-col gap-5">
                                    {posterPreview && (
                                        <button
                                            onClick={handleChangePoster}
                                            className="items-center justify-center px-4 py-2 bg-red-500 rounded-md hover:bg-red-400 text-white"
                                        >
                                            Remove Poster
                                        </button>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePosterChange}
                                        className="mt-3"
                                    />
                                    {posterPreview && (
                                        <img src={posterPreview} alt="Poster Preview" className="object-cover h-full w-full" />
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="ml-3 items-center justify-center px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-500 text-white"
                                >
                                    Add Actor
                                </button>
                            </form>
                        </div>

                        {message && (
                            <div className={`text-center ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </div>
                        )}

                        <div className="relative flex flex-col mt-4">
                            <div className="flex justify-between mb-2">
                                <h2 className="text-lg font-bold">Actors List</h2>
                                <div className="flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={e => setSearchQuery(e.target.value)}
                                        className="border p-1"
                                    />
                                </div>
                            </div>

                            <ActorList actors={currentActors} onEdit={editActors} onDelete={deleteActors} />

                            <div className="flex justify-between mt-4">
                                <div>
                                    <span>Page {currentPage} of {totalPages}</span>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className="border px-2 py-1 mx-1 bg-gray-300 hover:bg-gray-200 rounded"
                                    >
                                        Prev
                                    </button>
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className="border px-2 py-1 mx-1 bg-gray-300 hover:bg-gray-200 rounded"
                                    >
                                        Next
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        max={totalPages}
                                        onChange={handleJumpToPage}
                                        placeholder="Jump to Page"
                                        className="border p-1 w-24 mx-1"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CMSActors;
