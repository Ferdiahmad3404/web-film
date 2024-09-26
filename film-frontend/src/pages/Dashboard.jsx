import DramaList from "../components/DramaList";
import FiltersAndSorting from "../components/FiltersAndSorting";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Sidenav from "../components/Sidenav";

const Dashboard = () => {
    const dramaData = [
        { id: 1, title: 'Drama Title 1', year: '2021', genre: 'action', status: 'finished', platform: 'netflix', awards: 'yes', imgSrc: 'https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg?w=360' },
        { id: 2, title: 'Drama Title 2', year: '2020', genre: 'drama', status: 'on_going', platform: 'viu', awards: 'no', imgSrc: 'https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg' },
        { id: 3, title: 'Drama Title 3', year: '2022', genre: 'fantasy', status: 'finished', platform: 'imdb', awards: 'yes', imgSrc: 'https://hypeabis.id/assets/content/20220113175955_Twenty_Five_Twenty_One_1.jpg' },
        { id: 4, title: 'Drama Title 4', year: '2019', genre: 'horror', status: 'on_going', platform: 'wetv', awards: 'no', imgSrc: 'https://i.redd.it/pzsqel5wenm81.jpg' },
        { id: 5, title: 'Drama Title 3', year: '2022', genre: 'fantasy', status: 'finished', platform: 'imdb', awards: 'yes', imgSrc: 'https://hypeabis.id/assets/content/20220113175955_Twenty_Five_Twenty_One_1.jpg' },
        { id: 6, title: 'Drama Title 4', year: '2019', genre: 'horror', status: 'on_going', platform: 'wetv', awards: 'no', imgSrc: 'https://i.redd.it/pzsqel5wenm81.jpg' },
        { id: 7, title: 'Drama Title 3', year: '2022', genre: 'fantasy', status: 'finished', platform: 'imdb', awards: 'yes', imgSrc: 'https://hypeabis.id/assets/content/20220113175955_Twenty_Five_Twenty_One_1.jpg' },
        { id: 8, title: 'Drama Title 4', year: '2019', genre: 'horror', status: 'on_going', platform: 'wetv', awards: 'no', imgSrc: 'https://i.redd.it/pzsqel5wenm81.jpg' },
        { id: 9, title: 'Drama Title 3', year: '2022', genre: 'fantasy', status: 'finished', platform: 'imdb', awards: 'yes', imgSrc: 'https://hypeabis.id/assets/content/20220113175955_Twenty_Five_Twenty_One_1.jpg' },
        { id: 10, title: 'Drama Title 4', year: '2019', genre: 'horror', status: 'on_going', platform: 'wetv', awards: 'no', imgSrc: 'https://i.redd.it/pzsqel5wenm81.jpg' },
      ];

      // State untuk filter
    const [filters, setFilters] = useState({
        year: '',
        genre: '',
        status: '',
        platform: '',
        awards: '',
        sortAlphabetical: '',
        search: '',
    });

    // Handler untuk menangkap perubahan pada form
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredDrama = dramaData.filter((drama) => {
        return (
          (!filters.year || drama.year === filters.year) &&
          (!filters.genre || drama.genre === filters.genre) &&
          (!filters.status || drama.status === filters.status) &&
          (!filters.platform || drama.platform === filters.platform) &&
          (!filters.awards || drama.awards === filters.awards) &&
          (!filters.search || drama.title.toLowerCase().includes(filters.search.toLowerCase()))
        );
    });

    // Sorting drama list
    const sortedDrama = filteredDrama.sort((a, b) => {
        if (filters.sortAlphabetical === 'asc') return a.title.localeCompare(b.title);
        if (filters.sortAlphabetical === 'desc') return b.title.localeCompare(a.title);
        return 0;
    });

    useEffect(() => {
        // Carousel functionality
        const items = document.querySelectorAll('[data-carousel-item]');
        const prevButton = document.querySelector('[data-carousel-prev]');
        const nextButton = document.querySelector('[data-carousel-next]');
        const indicators = document.querySelectorAll('[data-carousel-slide-to]');
        let currentIndex = 0;

        function showSlide(index) {
            items.forEach((item, i) => {
                item.classList.add('hidden');
                indicators[i].setAttribute('aria-current', 'false');
            });
            items[index].classList.remove('hidden');
            indicators[index].setAttribute('aria-current', 'true');
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % items.length;
            showSlide(currentIndex);
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showSlide(currentIndex);
        }

        if (prevButton && nextButton) {
            prevButton.addEventListener('click', prevSlide);
            nextButton.addEventListener('click', nextSlide);
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
            });
        });

        // Initialize carousel
        if (items.length > 0) {
            showSlide(currentIndex);
        }

        // Auto-slide
        const intervalId = setInterval(nextSlide, 3000); // Change slide every 3 seconds

        return () => {
            clearInterval(intervalId); // Cleanup interval on unmount
        };
    }, []);

    return (
        <>
            <div className="bg-neutral-200">
                <div className="flex space-x-0">
                    {/* -- Main Content -- */}
                    <div id="home" className=' w-full'>
                        {/* -- Main Description -- */}
                        <div className="grid grid-cols-2 mb-5">
                            <div className="w-full content-center px-32 flex flex-col items-center justify-center">                    
                                <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-yellow-900 md:text-5xl lg:text-6xl ">DramaKu</h1>
                                <p className="mb-6 text-center font-light text-yellow-900 lg:text-xl sm:px-16 ">Yu nonton yuk dimari...</p>
                                <a href="#content" className="px-3 py-3 text-base font-medium text-center bg-transparent rounded-full flex items-center justify-center">
                                    <svg className="animate-bounce w-10 h-10 justify-center stroke-current stroke-5 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="m19 9-7 7-7-7"/>
                                    </svg>  
                                </a>
                            </div>
                            <div>
                                {/* -- Carousel Section -- */}
                                <div id="default-carousel" className="relative w-full h-screen" data-carousel="slide">
                                    {/* {<!-- Carousel wrapper -->} */}
                                    <div className="relative overflow-hidden h-screen">
                                        {/* -- Item 1 -- */}
                                        <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
                                            <img src="https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg?w=360" className="object-fill block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 1"/>
                                        </div>
                                        {/* -- Item 2 -- */}
                                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                            <img src="https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg" className="object-fill block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 2"/>
                                        </div>
                                        {/* -- Item 3 -- */}
                                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                            <img src="https://hypeabis.id/assets/content/20220113175955_Twenty_Five_Twenty_One_1.jpg" className="object-fill block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 3"/>
                                        </div>
                                        {/* -- Item 4 -- */}
                                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                            <img src="https://i.redd.it/pzsqel5wenm81.jpg" className="object-fill block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 4"/>
                                        </div>
                                        {/* -- Item 5 -- */}
                                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                            <img src="https://image.tmdb.org/t/p/original/jAM03fxVxFOSJn1oBEw4UYFSDxp.jpg" className="object-fill block w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 5"/>
                                        </div>
                                    </div>

                                    {/* -- Slider indicators -- */}
                                    <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
                                        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                                    </div>

                                    {/* -- Slider controls -- */}
                                    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-70 group-hover:bg-yellow-700 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                                            <svg className="w-4 h-4 text-gray-800 group-hover:text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                                            </svg>
                                            <span className="sr-only">Previous</span>
                                        </span>
                                    </button>
                                    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white bg-opacity-70 group-hover:bg-yellow-700 group-focus:ring-4 group-focus:ring-white group-focus:outline-none">
                                            <svg className="w-4 h-4 text-gray-800 group-hover:text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                            </svg>
                                            <span className="sr-only">Next</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    <Home />
                    <div class="p-14 space-y-10">
                        <FiltersAndSorting />

                        <DramaList />
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
        </>
    );
};
export default Dashboard