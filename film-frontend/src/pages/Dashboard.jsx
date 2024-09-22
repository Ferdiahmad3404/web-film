import Carousel from "../components/Carousel";
import DramaList from "../components/DramaList";
import FiltersAndSorting from "../components/FiltersAndSorting";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div>
        <div className="bg-neutral-200">
            <div className="flex space-x-0">
                <div id="home">
                    {/* Main */}
                    <div className="grid grid-cols-2 mb-5">
                        {/* DramaKu */}
                        <div className="w-full content-center px-32 flex flex-col items-center justify-center">
                            <h1 className="mb-4 text-center text-4xl font-extrabold leading-none tracking-tight text-yellow-900 md:text-5xl lg:text-6xl">DramaKu</h1>
                            <p className="mb-6 text-center font-light text-yellow-900 lg:text-xl sm:px-16">Yu nonton yuk dimari...</p>
                            <a href="#content" className="px-3 py-3 text-base font-medium text-center bg-transparent rounded-full focus:ring-4 focus:ring-yellow-900 flex items-center justify-center">
                            <svg className="animate-bounce w-6 h-6 justify-center stroke-current stroke-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="m19 9-7 7-7-7" />
                            </svg>
                            </a>
                        </div>

                        {/* Carousel */}
                        <div>
                            <Carousel />
                        </div>
                    </div>

                    <FiltersAndSorting />

                    <DramaList />

                    <div className="w-full h-20 flex flex-auto justify-center">
                        <a href="#home" className="px-3 py-3 text-base font-medium text-center bg-transparent rounded-full focus:ring-4 focus:ring-yellow-900 focus:ring-yellow-900 flex items-center justify-center">
                            <svg className="animate-bounce w-6 h-6 justify-center stroke-current stroke-5 text-yellow-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m16 17-4-4-4 4m8-6-4-4-4 4"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>

    
  );
};

export default Dashboard;

