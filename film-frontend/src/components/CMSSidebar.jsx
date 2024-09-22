import { React } from 'react';

const CMSSidebar = () => {
    return (
        <aside className="w-64 h-screen bg-black bg-opacity-5 rounded-r-xl rounded-b-xl flex flex-col">
            <div className="p-6">
                <a className="text-3xl font-bold mb-6" href="/">DramaKu</a>
            </div>
            <nav className="flex-1">
                <ul>
                    <li className="relative group">
                        <a href="#" className="flex items-center px-4 py-3 text-lg hover:bg-yellow-900 hover:text-white rounded transition duration-200">
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h1M4 6h16M4 14h16M4 18h16"></path>
                            </svg>
                            Drama
                            <svg className="w-4 h-4 ml-auto transition-transform transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </a>
                        <ul className="absolute left-0 hidden w-full text-gray-900 bg-neutral-300 rounded-lg shadow-lg group-hover:block">
                            <li><a href="#" className="block px-4 py-2 hover:bg-yellow-900 hover:text-white rounded transition duration-150">Validate</a></li>
                            <li><a href="#" className="block px-4 py-2 hover:bg-yellow-900 hover:text-white rounded transition duration-150">Input Drama</a></li>
                        </ul>
                    </li>
                    <li className="group">
                        <a href="/cmscountries" className="flex items-center px-4 py-3 text-lg hover:bg-yellow-900 hover:text-white rounded transition duration-200">
                            <svg className="w-6 h-6 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            Countries
                        </a>
                    </li>
                    <li className="group">
                        <a href="/cmsawards" className="flex items-center px-4 py-3 text-lg hover:bg-yellow-900 hover:text-white rounded transition duration-200">
                            <svg className="w-6 h-6 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183m5.73-2.678 2.154 6.411-2.673-.89-1.568 2.34-1.825-5.183M9.165 4.3c.58.068 1.153-.17 1.515-.628a1.681 1.681 0 0 1 2.64 0 1.68 1.68 0 0 0 1.515.628 1.681 1.681 0 0 1 1.866 1.866c-.068.58.17 1.154.628 1.516a1.681 1.681 0 0 1 0 2.639 1.682 1.682 0 0 0-.628 1.515 1.681 1.681 0 0 1-1.866 1.866 1.681 1.681 0 0 0-1.516.628 1.681 1.681 0 0 1-2.639 0 1.681 1.681 0 0 0-1.515-.628 1.681 1.681 0 0 1-1.867-1.866 1.681 1.681 0 0 0-.627-1.515 1.681 1.681 0 0 1 0-2.64c.458-.361.696-.935.627-1.515A1.681 1.681 0 0 1 9.165 4.3ZM14 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
                            </svg>
                            Awards
                        </a>
                    </li>
                    <li className="group">
                        <a href="/cmsgenres" className="flex items-center px-4 py-3 text-lg hover:bg-yellow-900 hover:text-white rounded transition duration-200">
                            <svg className="w-6 h-6 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"/>
                            </svg>
                            Genres
                        </a>
                    </li>
                    <li className="group">
                        <a href="/cmsactors" className="flex items-center px-4 py-3 text-lg hover:bg-yellow-900 hover:text-white rounded transition duration-200">
                            <svg className="w-6 h-6 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                            </svg>
                            Actors
                        </a>
                    </li>
                    <li className="group">
                        <a href="/cmscomments" className="flex items-center px-4 py-3 text-lg hover:bg-yellow-900 hover:text-white rounded transition duration-200">
                            <svg className="w-6 h-6 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"/>
                            </svg>
                            Comments
                        </a>
                    </li>
                    <li className="group">
                        <a href="/cmsusers" className="flex items-center px-4 py-3 text-lg hover:bg-yellow-900 hover:text-white rounded transition duration-200">
                            <svg className="w-6 h-6 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                            </svg>
                            Users
                        </a>
                    </li>
                    <li className="group">
                        <a href="#" className="flex items-center px-4 py-3 text-lg hover:bg-yellow-900 hover:text-white rounded transition duration-200">
                            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7"></path>
                            </svg>
                            Logout
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}
export default CMSSidebar