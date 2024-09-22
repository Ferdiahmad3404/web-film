// App.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import MovieDetails from '../components/MovieDetails';
import ActorsList from '../components/ActorsLists';
import ReactionsAndComments from '../components/ReactionsAndComments';
import MoreMovies from '../components/MoreMovies';

const DetailFilm = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const movie = {
        title: 'Film Title',
        synopsis: 'This is the synopsis of the movie.',
        cover: 'https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg',
        releaseDate: 'January 1, 2022',
        director: 'John Doe',
        cast: ['Jane Doe', 'John Smith', 'Mary Johnson'],
        genre: ['Action', 'Adventure'],
        rating: 'PG-13',
    };

    const actors = [
        { name: 'Actor 1', image: 'https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg' },
        { name: 'Actor 2', image: 'https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg' },
        { name: 'Actor 3', image: 'https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg' },
    ];

    const moreMovies = [
        { title: 'Movie Title 1', image: 'https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg' },
        { title: 'Movie Title 2', image: 'https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg' },
        { title: 'Movie Title 3', image: 'https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg' },
    ];

    return (
        <div className="flex flex-row bg-gray-100">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex z-30">
                <button className="bg-yellow-900 p-4" onClick={() => setSidebarOpen(true)}>Toggle Sidebar</button>
            </div>
            <main className="w-full p-4">
                <MovieDetails movie={movie} />
                <ActorsList actors={actors} />
                <ReactionsAndComments />
                <MoreMovies movies={moreMovies} />
            </main>
        </div>
    );
};

export default DetailFilm;
