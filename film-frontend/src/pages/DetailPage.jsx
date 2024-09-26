import React from 'react';

const DetailPage = () => {
    return (
        <div className="bg-gray-100">
            <div className="flex flex-row">
                {/* First Sidebar (Top Movies) */}
                <aside className="bg-gray-800 text-white p-4 sticky-title scrollbar rounded-lg shadow-lg mx-2 flex-none">
                    <h1 className="text-xl font-bold mb-4 text-center sticky-title text-black">Top Movies</h1>
                    <ul>
                        {['Movie Title 1', 'Movie Title 2', 'Movie Title 3' , 'Movie Title 2', 'Movie Title 3' , 'Movie Title 2', 'Movie Title 3' , 'Movie Title 2', 'Movie Title 3 '].map((title, index) => (
                            <li className="mb-4" key={index}>
                                <a href="#" className="block bg-gray-700 shadow rounded-lg p-2">
                                    <img src="https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg"
                                        alt={title} className="w-full h-48 object-fit rounded mb-2" />
                                    <p className="text-center font-semibold text-sm">{title}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="w-full p-4">
                    <div className="mb-6 flex justify-between items-center">
                        <div className="flex space-x-4 w-full">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Back</button>
                            <input type="text" className="p-2 border border-gray-300 rounded w-full" placeholder="Search..." />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Cari</button>
                        </div>
                    </div>

                    {/* Movie Details */}
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <div className="flex flex-col md:flex-row">
                            <img src="https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg"
                                alt="Film Cover" className="w-full md:w-64 h-auto rounded-md mb-4 md:mr-6" />
                            <div>
                                <h1 className="text-3xl font-bold mb-4">Film Title</h1>
                                <p className="text-gray-700 mb-4">
                                    This is the synopsis of the movie. It provides a brief overview of the plot and key elements of the story.
                                </p>
                                <ul className="list-disc pl-5">
                                    <li><strong>Release Date:</strong> January 1, 2022</li>
                                    <li><strong>Director:</strong> John Doe</li>
                                    <li><strong>Cast:</strong> Jane Doe, John Smith, Mary Johnson</li>
                                    <li><strong>Genre:</strong> Action, Adventure</li>
                                    <li><strong>Rating:</strong> PG-13</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Actors List */}
                    <div className="bg-white text-white p-4 rounded-lg shadow-lg w-full mb-6">
                        <h1 className="font-bold mb-4 text-black text-2xl">Actors</h1>
                        <div className="overflow-x-auto">
                            <ul className="flex flex-nowrap">
                                {['Actor 1', 'Actor 2', 'Actor 3'].map((actor, index) => (
                                    <li className="mr-4 flex-none" key={index}>
                                        <a href="#" className="block bg-gray-700 shadow rounded-lg p-2">
                                            <img src="https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg"
                                                alt={actor} className="w-48 h-72 object-cover rounded mb-2" />
                                            <p className="text-center font-semibold text-sm">{actor}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Reactions and Comments */}
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="flex space-x-4 mb-4">
                            {['😀 10', '😢 5', '😡 3', '👍 15', '👎 2'].map((reaction, index) => (
                                <button key={index} className={`px-4 py-2 rounded bg-${index === 0 ? 'yellow' : index === 1 ? 'green' : index === 2 ? 'red' : index === 3 ? 'blue' : 'purple'}-500 text-white`}>
                                    {reaction}
                                </button>
                            ))}
                        </div>

                        {/* Comment Filter */}
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <label className="mr-2">Filter by:</label>
                                <select className="p-2 border border-gray-300 rounded">
                                    <option value="recent">Recent Comments</option>
                                    <option value="top">Top Replies</option>
                                </select>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <div className="scroll-comments space-y-4">
                            {['Jane Doe: Amazing movie! Really enjoyed it.', 'John Smith: The plot was a bit slow, but the acting was great.', 'Mary Johnson: Loved the cinematography!'].map((comment, index) => (
                                <div className="bg-gray-100 p-2 rounded" key={index}>
                                    <p><strong>{comment.split(':')[0]}:</strong> {comment.split(':')[1]}</p>
                                    <button className="text-blue-500 text-sm">Reply</button>
                                </div>
                            ))}
                        </div>

                        {/* Add Comment */}
                        <textarea className="w-full p-2 border border-gray-300 rounded mt-4" rows="4" placeholder="Add your comment..."></textarea>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Submit</button>
                    </div>

                    {/* More Movies */}
                    <div className="bg-white text-white p-4 rounded-lg shadow-lg w-full">
                        <h1 className="text-xl font-bold mb-4 text-black">More Movies</h1>
                        <div className="overflow-x-auto">
                            <ul className="flex flex-nowrap">
                                {['Movie Title 1', 'Movie Title 2', 'Movie Title 3'].map((movie, index) => (
                                    <li className="mr-4 flex-none" key={index}>
                                        <a href="#" className="block bg-gray-700 shadow rounded-lg p-2">
                                            <img src="https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg"
                                                alt={movie} className="w-48 h-72 object-cover rounded mb-2" />
                                            <p className="text-center font-semibold text-sm">{movie}</p>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DetailPage;
