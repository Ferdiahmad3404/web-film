import React, { useState } from 'react';
import CMSSidebar from '../components/CMSSidebar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';

const CMSDramaInput = () => {
    // State untuk menyimpan data file dan preview poster
    const [posterPreview, setPosterPreview] = useState(null);
    const [file, setFile] = useState(null);

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
        setFile(null); // Reset file
    };

    return (
        <>
            <div className="bg-gray-100">
                <div className="flex">
                    <CMSSidebar />

                    {/* Main Content */}
                    <main className="w-full">
                        <div className="flex w-full justify-between px-6 py-8 space-y-6 md:flex-row md:space-y-0">
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
                            <button className="w-full px-6 py-3 mt-4 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600">
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
                                    className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                />
                                </div>
                                <div>
                                <label htmlFor="alternative_title" className="block mb-2 text-sm font-medium text-gray-900">
                                    Alternative Title
                                </label>
                                <input
                                    type="text"
                                    id="alternative_title"
                                    name="alternative_title"
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
                                    className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                />
                                </div>
                                <div>
                                <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">
                                    Country
                                </label>
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="synopsis" className="block mb-2 text-sm font-medium text-gray-900">
                                Synopsis
                                </label>
                                <textarea
                                id="synopsis"
                                name="synopsis"
                                rows="3"
                                className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                ></textarea>
                            </div>

                            <div>
                                <label htmlFor="availability" className="block mb-2 text-sm font-medium text-gray-900">
                                Availability
                                </label>
                                <input
                                type="text"
                                id="availability"
                                name="availability"
                                className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <span className="block mb-2 text-sm font-medium text-gray-900">Add Genres</span>
                                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                                <div>
                                    <label className="inline-flex items-center">
                                    <input type="checkbox" className="form-checkbox rounded-full" />
                                    <span className="ml-2">Action</span>
                                    </label>
                                </div>
                                <div>
                                    <label className="inline-flex items-center">
                                    <input type="checkbox" className="form-checkbox rounded-full" />
                                    <span className="ml-2">Adventure</span>
                                    </label>
                                </div>
                                {/* Tambahkan checkbox lainnya sesuai kebutuhan */}
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
                                className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                placeholder="Search Actor Name(s)"
                                />
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center">Actor 1</div>
                                <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center">Actor 2</div>
                                <div className="h-24 bg-gray-200 rounded-md flex items-center justify-center">Actor 3</div>
                                {/* Tambahkan hingga 9 aktor */}
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
                                    className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                />
                                </div>
                                <div>
                                <label htmlFor="award" className="block mb-2 text-sm font-medium text-gray-900">
                                    Award
                                </label>
                                <input
                                    type="text"
                                    id="award"
                                    name="award"
                                    className="block w-full p-2.5 border border-gray-300 rounded-lg"
                                />
                                </div>
                            </div>
                            </div>
                        </div>
                    </main>
                    
                    <Sidenav />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CMSDramaInput 