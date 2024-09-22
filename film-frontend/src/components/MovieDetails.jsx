const MovieDetails = ({ movie }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row">
                <img src={movie.cover} alt="Film Cover" className="w-full md:w-64 h-auto rounded-md mb-4 md:mr-6" />
                <div>
                    <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                    <p className="text-gray-700 mb-4">{movie.synopsis}</p>
                    <ul className="list-disc pl-5">
                        <li><strong>Release Date:</strong> {movie.releaseDate}</li>
                        <li><strong>Director:</strong> {movie.director}</li>
                        <li><strong>Cast:</strong> {movie.cast.join(', ')}</li>
                        <li><strong>Genre:</strong> {movie.genre.join(', ')}</li>
                        <li><strong>Rating:</strong> {movie.rating}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
