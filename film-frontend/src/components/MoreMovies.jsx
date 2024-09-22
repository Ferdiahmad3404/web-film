const MoreMovies = ({ movies }) => {
    return (
        <div className="bg-white text-white p-4 rounded-lg shadow-lg w-full mb-6">
            <h1 className="text-xl font-bold mb-4 text-black">More Movies</h1>
            <div className="overflow-x-auto">
                <ul className="flex flex-nowrap">
                    {movies.map((movie, index) => (
                        <li key={index} className="mr-4 flex-none">
                            <a href="#" className="block bg-gray-700 shadow rounded-lg p-2">
                                <img src={movie.image} alt={movie.title} className="w-48 h-72 object-cover rounded mb-2" />
                                <p className="text-center font-semibold text-sm">{movie.title}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MoreMovies;
