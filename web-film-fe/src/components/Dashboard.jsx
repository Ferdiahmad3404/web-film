const Dashboard = () => {
    return(
        <>
            <body className="bg-neutral-200">
                <div className="flex space-x-0">
                    {/* nt --> */}
                    <div id="home">
                        {/* iption --> */}
                        <div className="grid grid-cols-2 mb-5">
                            <div className="w-full content-center px-32 flex flex-col items-center justify-center">                    
                                <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-yellow-900 md:text-5xl lg:text-6xl dark:text-yellow-900">DramaKu</h1>
                                <p className="mb-6 text-center font-light text-yellow-900 lg:text-xl sm:px-16 dark:text-yellow-900">Yu nonton yuk dimari...</p>
                                <a href="#content" className="px-3 py-3 text-base font-medium text-center bg-transparent rounded-full focus:ring-4 focus:ring-yellow-900 dark:focus:ring-yellow-900 flex items-center justify-center">
                                    <svg className="animate-bounce w-6 h-6 justify-center stroke-current stroke-5 dark:text-yellow-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" d="m19 9-7 7-7-7"/>
                                    </svg>  
                                </a>
                            </div>
                            <div>
                                {/* ection --> */}
                                <div id="default-carousel" className="relative w-full h-screen" data-carousel="slide">
                                    {/* rapper --> */}
                                    <div className="relative overflow-hidden h-screen">
                                        {/*  */}
                                        <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
                                            <img src="https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg?w=360" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 1"/>
                                        </div>
                    
                                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                            <img src="https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 2"/>
                                        </div>
                                        
                                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                            <img src="https://hypeabis.id/assets/content/20220113175955_Twenty_Five_Twenty_One_1.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 3"/>
                                        </div>
                                        
                                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                            <img src="https://i.redd.it/pzsqel5wenm81.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 4"/>
                                        </div>
                                        
                                        <div className="hidden duration-700 ease-in-out" data-carousel-item>
                                            <img src="https://image.tmdb.org/t/p/original/jAM03fxVxFOSJn1oBEw4UYFSDxp.jpg" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Slide 5"/>
                                        </div>
                                    </div>

                                    <div className="absolute z-30 flex -translate-x-1/2 space-x-3 bottom-5 left-1/2">
                                        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                                        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
                                    </div>

                       
                                    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                                            </svg>
                                            <span className="sr-only">Previous</span>
                                        </span>
                                    </button>
                                    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                                            </svg>
                                            <span className="sr-only">Next</span>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>

          
                        <div id="content" className="mb-3 p-4 w-full flex space-x-4">
                            <form>
                                <select id="years" className="cursor-pointer bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-yellow-900 dark:border-gray-900 dark:placeholder-yellow-900 dark:text-white dark:focus:ring-white dark:focus:border-white">
                                    <option selected>Choose a year</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                </select>
                            </form>
                            <form>
                                <select id="years" className="cursor-pointer bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-yellow-900 dark:border-gray-900 dark:placeholder-yellow-900 dark:text-white dark:focus:ring-white dark:focus:border-white">
                                    <option selected>Choose a genre</option>
                                    <option value="action">Action</option>
                                    <option value="drama">Drama</option>
                                    <option value="horor">Horror</option>
                                    <option value="fantasy">Fantasy</option>
                                </select>
                            </form>
                            <form>
                                <select id="years" className="cursor-pointer bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-yellow-900 dark:border-gray-900 dark:placeholder-yellow-900 dark:text-white dark:focus:ring-white dark:focus:border-white">
                                    <option selected>Choose a status</option>
                                    <option value="on_going">On Going</option>
                                    <option value="finished">Finished</option>
                                </select>
                            </form>
                            <form>
                                <select id="years" className="cursor-pointer bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-yellow-900 dark:border-gray-900 dark:placeholder-yellow-900 dark:text-white dark:focus:ring-white dark:focus:border-white">
                                    <option selected>Choose a platform</option>
                                    <option value="imdb">IMDB</option>
                                    <option value="netflix">Netflix</option>
                                    <option value="viu">Viu</option>
                                    <option value="wetv">WeTV</option>
                                </select>
                            </form>
                            <form>
                                <select id="years" className="cursor-pointer bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-white focus:border-white block w-full p-2.5 dark:bg-yellow-900 dark:border-gray-900 dark:placeholder-yellow-900 dark:text-white dark:focus:ring-white dark:focus:border-white">
                                    <option selected>Awards</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </form>
                            <form>
                                <select id="years" className="cursor-pointer bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-yellow-900 dark:border-gray-900 dark:placeholder-yellow-900 dark:text-white dark:focus:ring-white dark:focus:border-white">
                                    <option selected>Alphabetics</option>
                                    <option value="asc">A-Z</option>
                                    <option value="desc">Z-A</option>
                                </select>
                            </form>                        
                            <form className="flex-auto">   
                                <div className="relative">
                                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-yellow-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-full p-3 ps-10 text-sm text-white border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-yellow-900 dark:border-yellow-900 dark:placeholder-white dark:text-black dark:focus:ring-blue-500 dark:focus:border-gray-900" placeholder="Search ..." required />
                                    <button type="submit" className="text-white absolute end-2.5 bottom-1.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                                </div>
                            </form>
                        </div>

               
                        <div className="grid grid-cols-5 gap-4 p-4 mb-52">
                           
                            <div className="bg-opacity-0 rounded-lg overflow-hidden">
                                <img src="https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg?w=360" alt="Drama 1" className="cursor-pointer hover:blur- hover:scale-90 transition duration-300 ease-in-out w-full h-5/6 rounded-xl shadow-xl"/>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Drama Title 1</h2>
                                    <p className="text-gray-600">Year</p>
                                </div>
                            </div>
                           
                            <div className="bg-opacity-0 rounded-lg overflow-hidden">
                                <img src="https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg" alt="Drama 2" className="cursor-pointer hover:blur- hover:scale-90 transition duration-300 ease-in-out w-full h-5/6 rounded-xl shadow-xl"/>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Drama Title 2</h2>
                                    <p className="text-gray-600">Year</p>
                                </div>
                            </div>
                        
                            <div className="bg-opacity-0 rounded-lg overflow-hidden">
                                <img src="https://hypeabis.id/assets/content/20220113175955_Twenty_Five_Twenty_One_1.jpg" alt="Drama 3" className="cursor-pointer hover:blur- hover:scale-90 transition duration-300 ease-in-out w-full h-5/6 rounded-xl shadow-xl"/>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Drama Title 3</h2>
                                    <p className="text-gray-600">Year</p>
                                </div>
                            </div>
                            
                            <div className="bg-opacity-0 rounded-lg overflow-hidden">
                                <img src="https://i.redd.it/pzsqel5wenm81.jpg" alt="Drama 4" className="cursor-pointer hover:blur- hover:scale-90 transition duration-300 ease-in-out w-full h-5/6 rounded-xl shadow-xl"/>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Drama Title 4</h2>
                                    <p className="text-gray-600">Year</p>
                                </div>
                            </div>
                            
                            <div className="bg-opacity-0 rounded-lg overflow-hidden">
                                <img src="https://image.tmdb.org/t/p/original/jAM03fxVxFOSJn1oBEw4UYFSDxp.jpg" alt="Drama 5" className="cursor-pointer hover:blur- hover:scale-90 transition duration-300 ease-in-out w-full h-5/6 rounded-xl shadow-xl"/>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Drama Title 5</h2>
                                    <p className="text-gray-600">Year</p>
                                </div>
                            </div>
                    
                            <div className="bg-opacity-0 rounded-lg overflow-hidden">
                                <img src="https://img.freepik.com/premium-psd/movie-poster-design-template_841014-16988.jpg?w=360" alt="Drama 1" className="cursor-pointer hover:blur- hover:scale-90 transition duration-300 ease-in-out w-full h-5/6 rounded-xl shadow-xl"/>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Drama Title 1</h2>
                                    <p className="text-gray-600">Year</p>
                                </div>
                            </div>
                            
                            <div className="bg-opacity-0 rounded-lg overflow-hidden">
                                <img src="https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg" alt="Drama 2" className="cursor-pointer hover:blur- hover:scale-90 transition duration-300 ease-in-out w-full h-5/6 rounded-xl shadow-xl"/>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Drama Title 2</h2>
                                    <p className="text-gray-600">Year</p>
                                </div>
                            </div>
                            
                            <div className="bg-opacity-0 rounded-lg overflow-hidden">
                                <img src="https://hypeabis.id/assets/content/20220113175955_Twenty_Five_Twenty_One_1.jpg" alt="Drama 3" className="cursor-pointer hover:blur- hover:scale-90 transition duration-300 ease-in-out w-full h-5/6 rounded-xl shadow-xl"/>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Drama Title 3</h2>
                                    <p className="text-gray-600">Year</p>
                                </div>
                            </div>
                          
                            <div className="bg-opacity-0 rounded-lg overflow-hidden">
                                <img src="https://i.redd.it/pzsqel5wenm81.jpg" alt="Drama 4" className="cursor-pointer hover:blur- hover:scale-90 transition duration-300 ease-in-out w-full h-5/6 rounded-xl shadow-xl"/>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Drama Title 4</h2>
                                    <p className="text-gray-600">Year</p>
                                </div>
                            </div>
                            
                            <div className="bg-opacity-0 rounded-lg overflow-hidden">
                                <img src="https://image.tmdb.org/t/p/original/jAM03fxVxFOSJn1oBEw4UYFSDxp.jpg" alt="Drama 5" className="cursor-pointer hover:blur- hover:scale-90 transition duration-300 ease-in-out w-full h-5/6 rounded-xl shadow-xl"/>
                                <div className="p-4">
                                    <h2 className="text-lg font-bold">Drama Title 5</h2>
                                    <p className="text-gray-600">Year</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-20 flex flex-auto justify-center">
                            <a href="#home" className="px-3 py-3 text-base font-medium text-center bg-transparent rounded-full focus:ring-4 focus:ring-yellow-900 dark:focus:ring-yellow-900 flex items-center justify-center">
                                <svg className="animate-bounce w-6 h-6 justify-center stroke-current stroke-5 dark:text-yellow-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 17-4-4-4 4m8-6-4-4-4 4"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    
                    <div className="flex">
                        <div className="bg-yellow-900 bg-opacity-90 p-4 h-screen sticky top-0 ">
                            <div className="text-2xl font-bold text-white flex flex-col justify-center">
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M15.907 11.998 10.332 9.23a.9.9 0 0 1-.16-.037l-.018-.007v6.554c0 .017.008.034.01.051l2.388-2.974 3.355-.82Z"/>
                                    <path d="m11.463 4.054 5.579 3.323A4.02 4.02 0 0 1 18.525 9c.332.668.47 1.414.398 2.155a3.07 3.07 0 0 1-.745 1.65 3.108 3.108 0 0 1-1.55.951c-.022.007-.045.005-.07.01-.062.03-.126.057-.191.08l-2.72.667-1.992 2.48c-.18.227-.41.409-.67.534.047.034.085.077.137.107a2.05 2.05 0 0 0 1.995.035c.592-.33 2.15-1.201 4.636-2.892l.28-.19c1.328-.895 3.616-2.442 3.967-4.215a9.94 9.94 0 0 0-1.713-4.154 10.027 10.027 0 0 0-3.375-2.989 10.107 10.107 0 0 0-8.802-.418c1.162.287 2.287.704 3.354 1.243Z"/>
                                    <path d="M5.382 17.082v-6.457a3.7 3.7 0 0 1 .45-1.761 3.733 3.733 0 0 1 1.238-1.34 3.915 3.915 0 0 1 3.433-.245c.176.03.347.084.508.161l5.753 2.856c.082.05.161.105.236.165a2.128 2.128 0 0 0-.953-1.455l-5.51-3.284c-1.74-.857-3.906-1.523-5.244-1.097a9.96 9.96 0 0 0-2.5 3.496 9.895 9.895 0 0 0 .283 8.368 9.973 9.973 0 0 0 2.73 3.322 17.161 17.161 0 0 1-.424-2.729Z"/>
                                    <path d="m19.102 16.163-.272.183c-2.557 1.74-4.169 2.64-4.698 2.935a4.083 4.083 0 0 1-2 .53 3.946 3.946 0 0 1-1.983-.535 3.788 3.788 0 0 1-1.36-1.361 3.752 3.752 0 0 1-.51-1.85 1.812 1.812 0 0 1-.043-.26V9.143c0-.024.009-.046.01-.07-.056.02-.11.043-.162.07a1.796 1.796 0 0 0-.787 1.516v6.377a10.67 10.67 0 0 0 1.113 4.27 10.11 10.11 0 0 0 8.505-.53 10.022 10.022 0 0 0 3.282-2.858 9.936 9.936 0 0 0 1.75-3.97 19.615 19.615 0 0 1-2.845 2.216Z"/>
                                </svg>
                            </div>
                            
                            
                            <div className="absolute right-1/3 top-1/2">
                                <button id="open-btn" className="text-3xl text-white">&equiv;</button>
                            </div>
                        </div>

                    
                        <div id="sidebar" className="fixed top-0 left-0 h-full w-64 bg-yellow-900 shadow-lg z-50 p-8">
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-2xl font-bold text-white">Countries</h2>
                                <button id="close-btn" className="text-2xl text-white">&times;</button>
                            </div>
                            <nav>
                                <ul>
                                    <li className="mb-4"><a href="#" className="sidebar-link text-lg text-white">Japan</a></li>
                                    <li className="mb-4"><a href="#" className="sidebar-link text-lg text-white">Korea</a></li>
                                    <li className="mb-4"><a href="#" className="sidebar-link text-lg text-white">China</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </body>
        </>
    )

    const openBtn = document.getElementById('open-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.getElementById('sidebar');

                    openBtn.addEventListener('click', () => {
                        sidebar.classNameList.add('active');
                    });

                    closeBtn.addEventListener('click', () => {
                        sidebar.classNameList.remove('active');
                    });

                    document.addEventListener('DOMContentLoaded', function () {
                        const items = document.querySelectorAll('[data-carousel-item]');
                        const prevButton = document.querySelector('[data-carousel-prev]');
                        const nextButton = document.querySelector('[data-carousel-next]');
                        const indicators = document.querySelectorAll('[data-carousel-slide-to]');
                        let currentIndex = 0;

                        function showSlide(index) {
                            items.forEach((item, i) => {
                                item.classNameList.add('hidden');
                                indicators[i].setAttribute('aria-current', 'false');
                            });
                            items[index].classNameList.remove('hidden');
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

                        prevButton.addEventListener('click', prevSlide);
                        nextButton.addEventListener('click', nextSlide);
                        indicators.forEach((indicator, index) => {
                            indicator.addEventListener('click', () => {
                                currentIndex = index;
                                showSlide(currentIndex);
                            });
                        });

                        // Initialize carousel
                        showSlide(currentIndex);

                        // Auto-slide (optional)
                        setInterval(nextSlide, 3000); // Change slide every 3 seconds
                    });                  
}

    

export default Dashboard