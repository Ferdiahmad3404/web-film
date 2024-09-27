import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import Sidenav from "../components/Sidenav";

const Dashboard = () => {
    const dramaData = [
        {
          id: 1,
          title: "Drama Title 1",
          year: "2021",
          imgSrc: "https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg?w=360",
        },
        {
          id: 2,
          title: "Drama Title 2",
          year: "2022",
          imgSrc: "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg",
        },
        {
          id: 3,
          title: "Drama Title 3",
          year: "2023",
          imgSrc: "https://hypeabis.id/assets/content/20220113175955_Twenty_Five_Twenty_One_1.jpg",
        },
        {
          id: 4,
          title: "Drama Title 4",
          year: "2024",
          imgSrc: "https://i.redd.it/pzsqel5wenm81.jpg",
        },
        {
            id: 5,
            title: "Drama Title 4",
            year: "2024",
            imgSrc: "https://i.redd.it/pzsqel5wenm81.jpg",
          },
          {
            id: 6,
            title: "Drama Title 4",
            year: "2024",
            imgSrc: "https://i.redd.it/pzsqel5wenm81.jpg",
          }
    ];

    const films = [
        {
          src: 'https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg?w=360',
          alt: 'Slide 1',
        },
        {
          src: 'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
          alt: 'Slide 2',
        },
        {
          src: 'https://hypeabis.id/assets/content/20220113175955_Twenty_Five_Twenty_One_1.jpg',
          alt: 'Slide 3',
        },
        {
          src: 'https://i.redd.it/pzsqel5wenm81.jpg',
          alt: 'Slide 4',
        },
        {
          src: 'https://image.tmdb.org/t/p/original/jAM03fxVxFOSJn1oBEw4UYFSDxp.jpg',
          alt: 'Slide 5',
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % films.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + films.length) % films.length);
    };

    useEffect(() => {
        const intervalId = setInterval(nextSlide, 3000); // Change slide every 3 seconds

        return () => {
        clearInterval(intervalId); // Cleanup interval on unmount
        };
    }, []);

    return (
        <div>
            <div className="bg-neutral-200">
                <div className="flex space-x-0">
                    <div id="home">
                        <div className="grid grid-cols-2 mb-5">
                            {/* Left section */}
                            <div className="w-full content-center px-32 flex flex-col items-center justify-center">
                                <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-yellow-900 md:text-5xl lg:text-6xl">DramaKu</h1>
                                <p className="mb-6 text-center font-light text-yellow-900 lg:text-xl sm:px-16">Yu nonton yuk dimari...</p>
                                <a href="#content" className="px-3 py-3 text-base font-medium text-center bg-transparent rounded-full flex items-center justify-center">
                                    <svg className="animate-bounce w-10 h-10 justify-center stroke-current stroke-5 text-yellow-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="m19 9-7 7-7-7" />
                                    </svg>
                                </a>
                            </div>

                            {/* Right section with Carousel */}
                            <div>
                                {/* Carousel */}
                                <div id="default-carousel" className="relative w-full h-screen" data-carousel="slide">
                                    {/* Carousel wrapper */}
                                    <div className="relative overflow-hidden h-screen">
                                        {films.map((film, index) => (
                                            <div className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${(index === currentIndex) ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} data-carousel-item={(index === currentIndex) ? 'active' : ''}>
                                            <img
                                                src={film.src}
                                                className="block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                                alt={film.alt}
                                            />
                                        </div>
                                        ))}
                                        
                                    </div>

                                    {/* Slider indicators */}
                                    <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
                                        {films.map((_, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-yellow-900' : 'bg-gray-300'}`}
                                            aria-current={index === currentIndex}
                                            aria-label={`Slide ${index + 1}`}
                                            onClick={() => setCurrentIndex(index)}
                                        ></button>
                                        ))}
                                    </div>

                                    {/* Slider controls */}
                                    <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={prevSlide}>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-70 group-hover:bg-yellow-700 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                                        <svg className="w-4 h-4 text-gray-800 group-hover:text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                        </svg>
                                        <span className="sr-only">Previous</span>
                                        </span>
                                    </button>
                                    <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" onClick={nextSlide}>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-70 group-hover:bg-yellow-700 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                                        <svg className="w-4 h-4 text-gray-800 group-hover:text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <span className="sr-only">Next</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div class="p-14 space-y-10">
                            {/* Filter Bar */}
                            <div id="content" className="mb-3 p-8 w-full flex space-x-4">
                                <form>
                                    <select id="years" className="cursor-pointer border text-sm rounded-lg block w-full p-2.5 bg-yellow-900 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
                                    <option selected>Choose a year</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    </select>
                                </form>
                                <form>
                                    <select id="genre" className="cursor-pointer border text-sm rounded-lg block w-full p-2.5 bg-yellow-900 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
                                    <option selected>Choose a genre</option>
                                    <option value="action">Action</option>
                                    <option value="drama">Drama</option>
                                    <option value="horror">Horror</option>
                                    <option value="fantasy">Fantasy</option>
                                    </select>
                                </form>
                                <form>
                                    <select id="status" className="cursor-pointer border text-sm rounded-lg block w-full p-2.5 bg-yellow-900 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
                                    <option selected>Choose a status</option>
                                    <option value="on_going">On Going</option>
                                    <option value="finished">Finished</option>
                                    </select>
                                </form>
                                <form>
                                    <select id="platform" className="cursor-pointer border text-sm rounded-lg block w-full p-2.5 bg-yellow-900 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
                                    <option selected>Choose a platform</option>
                                    <option value="imdb">IMDB</option>
                                    <option value="netflix">Netflix</option>
                                    <option value="viu">Viu</option>
                                    <option value="wetv">WeTV</option>
                                    </select>
                                </form>
                                <form>
                                    <select id="awards" className="cursor-pointer border text-sm rounded-lg block w-full p-2.5 bg-yellow-900 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
                                    <option selected>Awards</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                    </select>
                                </form>
                                <form>
                                    <select id="alphabetics" className="cursor-pointer border text-sm rounded-lg block w-full p-2.5 bg-yellow-900 placeholder-yellow-900 text-white focus:ring-white focus:border-white">
                                    <option selected>Alphabetics</option>
                                    <option value="asc">A-Z</option>
                                    <option value="desc">Z-A</option>
                                    </select>
                                </form>
                                <form className="flex-auto">
                                    <div className="relative">
                                        <input 
                                            type="search" 
                                            id="default-search" 
                                            className="block w-full p-3 ps-10 text-sm text-white border rounded-lg bg-yellow-900 border-yellow-900 placeholder-white focus:ring-blue-500 focus:border-gray-900" 
                                            placeholder="Search ..." 
                                            required 
                                        />
                                        <button 
                                            type="submit" 
                                            className="text-white absolute right-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2"
                                        >
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Drama List */}
                            <div className="grid grid-cols-5 gap-4 p-4 mb-52">
                                {dramaData.map((drama) => (
                                    <div key={drama.id} className="bg-opacity-0 rounded-lg overflow-hidden">
                                    <img
                                        src={drama.imgSrc}
                                        alt={drama.title}
                                        className="cursor-pointer hover:blur- hover:scale-90 transition duration-300 ease-in-out w-full h-5/6 rounded-xl shadow-xl"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-bold">{drama.title}</h2>
                                        <p className="text-gray-600">{drama.year}</p>
                                    </div>
                                    </div>
                                ))}
                            </div>

                            {/* Shortcut button */}
                            <div className="w-full h-20 flex flex-auto justify-center">
                                <a href="#home" className="px-3 py-3 text-base font-medium text-center bg-transparent rounded-full flex items-center justify-center">
                                    <svg className="animate-bounce w-20 h-20 justify-center stroke-current stroke-5 text-yellow-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 17-4-4-4 4m8-6-4-4-4 4"/>
                                    </svg>
                                </a>
                            </div>
                        </div>                
                    </div>
                    <Sidenav />
                </div>
            </div>
            <Footer />
        </div>

    
    );
};

export default Dashboard;
