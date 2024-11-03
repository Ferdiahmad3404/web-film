import React, { useState, useEffect } from 'react';
import CMSSidebar from '../components/CMSSidebar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';
import { Navigate } from 'react-router-dom';

const CMSDramaInput = () => {
    // State untuk menyimpan data file dan preview poster
    const [posterPreview, setPosterPreview] = useState(null);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        alt_title: '',
        description: '',
        trailer: '',
        stream_site: '',
        year: '',
        status: 'unapproved',
        created_date: '',
        country_id: '',
        created_by: sessionStorage.getItem('username'),
        genres: [],
        actors: [],
        award: '',
    });
    
    // State untuk menyimpan data dari endpoint
    const [countries, setCountries] = useState([]);
    const [genres, setGenres] = useState([]);
    const [actors, setActors] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredActors, setFilteredActors] = useState([]);
    const [selectedActor, setSelectedActor] = useState([]);
    const [awards, setAwards] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const fetchCountries = async () => {
        try {
            const response = await fetch('http://localhost:8000/countries');
            const countriesData = await response.json(); // Get the data directly
    
            if (Array.isArray(countriesData)) { // Check if countriesData is an array
                setCountries(countriesData); // Set countries from the received data
            } else {
                console.error('Expected an array, but got:', countriesData);
                setCountries([]); // Set to empty array if data is not as expected
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
            setCountries([]); // Set to empty array on error
        }
    };    

    const fetchGenres = async () => {
        try {
            const response = await fetch('http://localhost:8000/genres');
            const result = await response.json();
    
            if (result.success && Array.isArray(result.data)) { // Check if success is true and data is an array
                setGenres(result.data); // Set actors from result.data
            } else {
                console.error('Data is not an array:', result);
                setGenres([]); // Set to empty array if data is not as expected
            }
        } catch (error) {
            console.error('Error fetching actors:', error);
            setGenres([]); // Set to empty array on error
        }
    };

    const fetchActors = async () => {
        try {
            const response = await fetch('http://localhost:8000/actors');
            const result = await response.json();
    
            if (result.success && Array.isArray(result.data)) { // Check if success is true and data is an array
                setActors(result.data); // Set actors from result.data
            } else {
                console.error('Data is not an array:', result);
                setActors([]); // Set to empty array if data is not as expected
            }
        } catch (error) {
            console.error('Error fetching actors:', error);
            setActors([]); // Set to empty array on error
        }
    };

    const fetchAwards = async () => {
        try {
            const response = await fetch('http://localhost:8000/awards');
            const result = await response.json();

            if (result.success && Array.isArray(result.data)) {
                // Filter awards yang drama_id-nya null
                const filteredAwards = result.data.filter(award => award.drama_id === null);
                setAwards(filteredAwards); // Set awards ke state
            } else {
                console.error('Data is not an array:', result);
                setAwards([]); // Set to empty array if data is not as expected
            }
        } catch (error) {
            console.error('Error fetching awards:', error);
            setAwards([]); // Set to empty array on error
        }
    };

    // Fetch data saat komponen dimuat
    useEffect(() => {
        fetchCountries();
        fetchGenres();
        fetchActors();
        fetchAwards();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = actors.filter(actor =>
                actor.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredActors(filtered);
        } else {
            setFilteredActors([]);
        }
    }, [searchTerm, actors]);

    // Handler untuk upload poster
    const handlePosterChange = (event) => {
        const selectedFile = event.target.files[0];
        
        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = function (e) {
                setPosterPreview(e.target.result); // Set poster preview
                setFile(selectedFile); // Set file ke state
            };

            reader.readAsDataURL(selectedFile);
        }
    };

    // Handler untuk ganti poster
    const handleChangePoster = () => {
        setPosterPreview(null);
        setFile(null);
    };

    // Handler untuk perubahan input form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        // If the input is for the actors, update the search term
        if (name === 'actors') {
            setSearchTerm(value);
        }
    };

    const handleActorSelect = (actor) => {
        // Check if the actor is already selected
        if (!selectedActor.some(selected => selected.id === actor.id)) {
            setSelectedActor(prev => [...prev, actor]); // Add the actor to the selected actors
            setFormData(prevData => ({
                ...prevData,
                actors: [...prevData.actors, actor.id], // Also update formData
            }));
        }
        setSearchTerm(''); // Clear the search term after selection
        setFilteredActors([]); // Clear the filtered actors
    };

    const handleActorRemove = (actorId) => {
        // Remove actor from selected actors
        setSelectedActor(prev => prev.filter(actor => actor.id !== actorId));
        setFormData(prevData => ({
            ...prevData,
            actors: prevData.actors.filter(actor => actor.id !== actorId), // Also update formData
        }));
    };

    // Mengubah genre yang dipilih
    const handleGenreChange = (id) => {
        if (selectedGenres.includes(id)) {
            setSelectedGenres(selectedGenres.filter((genreId) => genreId !== id)); // Hapus jika sudah ada
        } else {
            setSelectedGenres([...selectedGenres, id]); // Tambah jika belum ada
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Mencegah reload halaman
    
        const data = new FormData();
        data.append('poster', file); // Menambahkan file poster
        for (const key in formData) {
            data.append(key, formData[key]); // Menambahkan semua data form
        }
    
        // Menambahkan genres dan actors sebagai string JSON
        data.append('genres', JSON.stringify(selectedGenres));
        data.append('actors', JSON.stringify(selectedActor.map(actor => actor.id))); // Mengambil ID dari selectedActor
    
        // Tambahkan `created_date` dan `created_by` jika diperlukan
        data.append('created_date', new Date().toISOString());
        data.append('created_by', 'User Name'); // Ganti dengan nama pengguna yang sesuai
    
        console.log('Form Data:', formData);
        
        try {
            const response = await fetch('http://localhost:8000/films', {
                method: 'POST',
                body: data,
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                // Reset form setelah berhasil
                setPosterPreview(null);
                setFile(null);
                setFormData({
                    title: '',
                    alt_title: '',
                    description: '',
                    trailer: '',
                    stream_site: '',
                    year: '',
                    status: 'unapproved',
                    created_date: '',
                    country_id: '',
                    created_by: '',
                    genres: [],
                    actors: [],
                    award: '',
                });
                showMessage('Film added successfully!', 'success');
                // Navigasi ke halaman lain
                setTimeout(() => {
                    Navigate("/cmsdramas");
                }, 5000);
            } else {
                console.error('Failed to add film:', response.status);
                showMessage('Failed to add film. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            showMessage('Error submitting form. Please check the console for details.', 'error');
        }
    };
    
    

    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <>
            <div className="bg-gray-100">
                <div className="flex">
                    <CMSSidebar />

                    {/* Main Content */}
                    <main className="flex-1 bg-gray-100 p-6">
                        <h1 className="text-2xl mb-5 font-medium">Add New Drama</h1>

                        {message && (
                            <div className={`mb-4 p-2 text-white rounded ${messageType === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="flex w-full justify-between px-6 py-8 space-y-6 md:flex-row md:space-y-0">
                            <div className="w-2/6 max-w-sm p-5 flex flex-col">
                                {posterPreview && (
                                    <button
                                        onClick={handleChangePoster}
                                        className="items-center justify-center px-2 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400"
                                    >
                                        Change Poster
                                    </button>
                                )}
                                <div className="relative flex flex-col items-center justify-center space-y-4 border-2 border-dashed rounded-lg h-80">
                                    {posterPreview ? (
                                        <img
                                            src={posterPreview}
                                            alt="Poster Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <label
                                            htmlFor="poster-upload"
                                            className="cursor-pointer text-gray-500"
                                        >
                                            Upload Poster
                                        </label>
                                    )}
                                    <input
                                        type="file"
                                        id="poster-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handlePosterChange}
                                    />
                                </div>
                                <button type="submit" className="w-full px-6 py-3 mt-4 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                                    Submit
                                </button>
                            </div>

                            <div className="w-full max-w-4xl space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="alt_title" className="block mb-2 text-sm font-medium text-gray-900">
                                            Alternative Title
                                        </label>
                                        <input
                                            type="text"
                                            id="alt_title"
                                            name="alt_title"
                                            value={formData.alt_title}
                                            onChange={handleInputChange}
                                            className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900">
                                            Year
                                        </label>
                                        <input
                                            type="text"
                                            id="year"
                                            name="year"
                                            value={formData.year}
                                            onChange={handleInputChange}
                                            className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="country_id" className="block mb-2 text-sm font-medium text-gray-900">
                                            Country
                                        </label>
                                        <select
                                            id="country_id"
                                            name="country_id"
                                            value={formData.country_id}
                                            onChange={handleInputChange}
                                            className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map((country) => (
                                                <option key={country.id} value={country.id} className="text-black">
                                                    {country.country}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
                                        Synopsis
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                    ></textarea>
                                </div>

                                <div>
                                    <label htmlFor="stream_site" className="block mb-2 text-sm font-medium text-gray-900">
                                        Availability
                                    </label>
                                    <input
                                        type="text"
                                        id="stream_site"
                                        name="stream_site"
                                        value={formData.stream_site}
                                        onChange={handleInputChange}
                                        className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <span className="block mb-2 text-sm font-medium text-gray-900">Add Genres</span>
                                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                        {genres.map((genre) => (
                                            <div key={genre.id} className="flex items-center mb-2">
                                                <input
                                                    type="checkbox"
                                                    id={`genre-${genre.id}`}
                                                    value={genre.id}
                                                    checked={selectedGenres.includes(genre.id)}
                                                    onChange={() => handleGenreChange(genre.id)}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`genre-${genre.id}`} className="text-gray-700">
                                                    {genre.genre}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="actors" className="block mb-2 text-sm font-medium text-gray-900">
                                        Add Actors (Up to 9)
                                    </label>
                                    <input
                                        type="text"
                                        id="actors"
                                        name="actors"
                                        value={searchTerm}
                                        onChange={handleInputChange}
                                        className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                        placeholder="Search Actor Name(s)"
                                    />
                                    {filteredActors.length > 0 && (
                                        <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                                            {filteredActors.map(actor => (
                                                <div
                                                    key={actor.id}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => handleActorSelect(actor)} // Select actor on click
                                                >
                                                    {actor.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <h3 className="text-sm font-medium">Selected Actors:</h3>
                                        <div className="grid grid-cols-3 gap-2 mt-2">
                                            {selectedActor.map(actor => (
                                                <div key={actor.id} className="h-24 bg-gray-200 rounded-md flex items-center justify-between p-4 gap-4">
                                                    <img
                                                        src={actor.url_photos}
                                                        alt={actor.name}
                                                        className="h-16 w-20 object-cover rounded-full"
                                                    />
                                                    <span>{actor.name}</span>
                                                    <button
                                                        onClick={() => handleActorRemove(actor.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="trailer" className="block mb-2 text-sm font-medium text-gray-900">
                                            Link Trailer
                                        </label>
                                        <input
                                            type="text"
                                            id="trailer"
                                            name="trailer"
                                            value={formData.trailer}
                                            onChange={handleInputChange}
                                            className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="award" className="block mb-2 text-sm font-medium text-gray-900">
                                            Award
                                        </label>
                                        <select
                                            id="country"
                                            name="country"
                                            value={formData.award}
                                            onChange={handleInputChange}
                                            className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                        >
                                            <option value="-">Select Award</option>
                                            <option value="-">-</option>
                                            {awards.map((award) => (
                                                <option key={award.id} value={award.id} className="text-black">
                                                    {award.award}
                                                </option>
                                            ))}
                                        </select>
                                        {awards.length === 0 && (
                                            <p className="ml-2 mt-1 text-sm text-red-500">
                                                Tidak ada award yang tersedia.. hubungi admin..
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </main>
                    
                    <Sidenav />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CMSDramaInput;
