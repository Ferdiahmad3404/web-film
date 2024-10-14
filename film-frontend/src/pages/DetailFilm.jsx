import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailFilm = () => {
    const { id } = useParams();
    const [filmData, setFilmData] = useState(null);
    const [actorData, setActorData] = useState([]);

    // Fungsi untuk mengambil data film berdasarkan ID
    const fetchFilmData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/films/${id}`);
            const data = await response.json();
            setFilmData(data.data);
            setActorData(data.data.actors); // Mengasumsikan aktor ada di data.data.actors
        } catch (error) {
            console.error('Error fetching film data:', error);
        }
    };

    const convertYoutubeLink = (url) => {
        // Regular expression untuk menangkap video ID dari URL YouTube
        const videoId = url.split('youtu.be/')[1]?.split('?')[0] || url.split('v=')[1]?.split('&')[0];
        
        // Return format embed jika videoId ditemukan
        return `https://www.youtube.com/embed/${videoId}`;
    };    

    useEffect(() => {
        fetchFilmData();
    }, [id]);

    

    if (!filmData) {
        return  <div className="flex items-center justify-center w-full h-screen bg-yellow-900">
                    <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
    }
    return (
        <div className="bg-yellow-900">
            <div className="flex flex-row">
                {/* Main Content */}
                <main className="w-full p-20">
                    <div className="flex space-x-60 mb-6 items-center justify-between">
                        <a href="/"><h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-neutral-200 md:text-5xl lg:text-6xl">DramaKu</h1></a>
                        <div className="flex w-full items-center">
                            <div className="flex space-x-4 items-center justify-center w-full">
                                <input type="text" className="p-2 bg-neutral-200 border border-gray-300 rounded-full w-full" placeholder="Search..." />
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Cari</button>
                            </div>
                        </div>
                    </div>

                    {/* Movie Details */}
                    <div className="bg-neutral-200 shadow-lg rounded-lg p-6 mb-6">
                        <div className="flex flex-col md:flex-row">
                            <img
                                src={filmData.url_cover}
                                alt=""
                                className="w-full md:w-64 h-auto rounded-md mb-4 md:mr-6"
                            />
                            <div className="ml-5 w-4/6">
                                <h1 className="text-3xl font-bold">
                                    {filmData.title} <span className="text-black">({filmData.year})</span>
                                    <span className="text-xl text-gray-500 ml-2"><br /> {filmData.alt_title}</span>
                                </h1>
                                <p className="text-lg text-gray-500 mb-3">{filmData.country.country}</p>
                                <ul className="list-disc pl-5 mb-6">
                                    <li><strong>Genres:</strong> {filmData.genres.map(genre => genre.genre).join(', ')}</li> 
                                    <li><strong>Available:</strong> {filmData.stream_site}</li>
                                    <li><strong>Awards:</strong> {filmData.awards.map(award => award.award).join(', ')}</li> 
                                    {/* <li><strong>Rating:</strong> {filmData.rating}</li> */}
                                </ul>
                                <h2 className="text-xl font-semibold mb-2">Synopsis</h2>
                                <p className="text-gray-700 mb-4">{filmData.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Trailer */}
                    <div className="bg-neutral-200 text-white p-4 rounded-lg shadow-lg w-full mb-6">
                        <h1 className="font-bold mb-4 text-black text-2xl">Trailer</h1>
                        <div className="overflow-x-auto">
                            <iframe
                                width="100%"
                                height="400"
                                src={convertYoutubeLink(filmData.trailer)}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                >
                            </iframe>
                        </div>
                    </div>

                    {/* Actors List */}
                    <div className="bg-neutral-200 text-white p-4 rounded-lg shadow-lg w-full mb-6">
                        <h1 className="font-bold mb-4 text-black text-2xl">Actors</h1>
                        <div className="overflow-x-auto">
                            <ul className="flex flex-nowrap">
                                {filmData.actors.map((actor, index) => (
                                    <li className="mr-4 flex-none" key={index}>
                                        <a href="#" className="block bg-gray-700 shadow rounded-lg p-2">
                                            <img
                                                src={actor.url_photos}
                                                alt={actor.name}
                                                className="w-48 h-72 object-cover rounded mb-2"
                                            />
                                            <p className="text-center font-semibold text-sm">{actor.name}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Reactions and Comments
                    <div className="bg-neutral-200 shadow-lg rounded-lg p-6 mb-6">
                        <div className="flex space-x-4 mb-4">
                            {['😀 10', '😢 5', '😡 3', '👍 15', '👎 2'].map((reaction, index) => (
                                <button key={index} className={`px-4 py-2 rounded bg-${index === 0 ? 'yellow' : index === 1 ? 'green' : index === 2 ? 'red' : index === 3 ? 'blue' : 'purple'}-500 text-white`}>
                                    {reaction}
                                </button>
                            ))}
                        </div> */}

                        {/* Comment Filter
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <label className="mr-2">Filter by:</label>
                                <select className="p-2 border border-gray-300 rounded">
                                    <option value="recent">Recent Comments</option>
                                    <option value="top">Top Replies</option>
                                </select>
                            </div>
                        </div> */}

                        {/* Comments Section
                        <div className="scroll-comments space-y-4">
                            {['Jane Doe: Amazing movie! Really enjoyed it.', 'John Smith: The plot was a bit slow, but the acting was great.', 'Mary Johnson: Loved the cinematography!'].map((comment, index) => (
                                <div className="bg-gray-100 p-2 rounded" key={index}>
                                    <p><strong>{comment.split(':')[0]}:</strong> {comment.split(':')[1]}</p>
                                    <button className="text-blue-500 text-sm">Reply</button>
                                </div>
                            ))}
                        </div> */}

                        {/* Add Comment
                        <textarea className="w-full p-2 border border-gray-300 rounded mt-4" rows="4" placeholder="Add your comment..."></textarea>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Submit</button>
                    </div> */}

                    {/* More Movies
                    <div className="bg-neutral-200 text-white p-4 rounded-lg shadow-lg w-full">
                        <h1 className="text-xl font-bold mb-4 text-black">More Movies</h1>
                        <div className="overflow-x-auto">
                            <ul className="flex flex-nowrap">
                                {['Movie Title 1', 'Movie Title 2', 'Movie Title 3'].map((movie, index) => (
                                    <li className="mr-4 flex-none" key={index}>
                                        <a href="#" className="block bg-gray-700 shadow rounded-lg p-2">
                                            <img
                                                src="https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg"
                                                alt={movie} className="w-48 h-72 object-cover rounded mb-2"
                                            />
                                            <p className="text-center font-semibold text-sm">{movie}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div> */}
                </main>
            </div>
        </div>
    );
};

export default DetailFilm;