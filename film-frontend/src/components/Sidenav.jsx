import { useEffect, useState } from "react";

const Sidenav = () => {
    const [role, setRole] = useState(null);

    const handleLogout = () => {
        sessionStorage.removeItem('token'); // Hapus token dari sessionStorage
        sessionStorage.removeItem('role_id'); // Hapus username dari sessionStorage
    };

    useEffect(() => {
        // Mengambil role dari sessionStorage
        const userRole = sessionStorage.getItem('role_id');
        setRole(userRole);

        // Sidebar functionality
        const openBtn = document.getElementById('open-btn');
        const closeBtn = document.getElementById('close-btn');
        const sidebar = document.getElementById('sidebar');


        if (openBtn && closeBtn && sidebar) {
            openBtn.addEventListener('click', () => {
                sidebar.classList.add('active');
                sidebar.style.display = 'block';
            });

            closeBtn.addEventListener('click', () => {
                sidebar.classList.remove('active');
                sidebar.style.display = 'none';
            });
        }
    }, []);

    return (
        <>
            {/* Sidenav */}
            <div className="flex">
                <div className="bg-yellow-900 p-4 h-screen sticky top-0">
                    <div className="text-2xl font-bold text-white flex flex-col justify-center">
                        <a href="#home">
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                {/* SVG path */}
                            </svg>
                        </a>
                    </div>
                    
                    {/* Toggle Sidebar Button */}
                    <div className="absolute right-1/3 top-1/2">
                        <button id="open-btn" className="text-3xl text-white">&equiv;</button>
                    </div>
                </div>
                {/* Sidebar Popup */}
                <div id="sidebar" className="fixed top-0 left-0 h-full w-64 bg-yellow-900 shadow-lg z-50 p-8">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-2xl font-bold text-white">DramaKu</h2>
                        <button id="close-btn" className="text-2xl text-white">&times;</button>
                    </div>
                    <nav>
                        <ul>
                            {/* Menu Umum */}
                            <li className="mb-4">
                                <a href="/home" className="sidebar-link text-lg text-white">Home</a>
                            </li>

                            {/* Menu berdasarkan role */}
                            {role === 'admin' && (
                                <>
                                    <li className="mb-4">
                                        <a href="/admin-dashboard" className="sidebar-link text-lg text-white">Admin Dashboard</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="/manage-users" className="sidebar-link text-lg text-white">Manage Users</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="/" className="sidebar-link text-lg text-white"  onClick={handleLogout}>Log Out</a>
                                    </li>
                                </>
                            )}
                            {role === 'user' && (
                                <>
                                    <li className="mb-4">
                                        <a href="/my-drama-list" className="sidebar-link text-lg text-white">My Drama List</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="/user-profile" className="sidebar-link text-lg text-white">Profile</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="/" className="sidebar-link text-lg text-white"  onClick={handleLogout}>Log Out</a>
                                    </li>   
                                </>
                            )}
                            {!role && (
                                <>
                                    <li className="mb-4">
                                        <a href="/login" className="sidebar-link text-lg text-white">Login</a>
                                    </li>
                                    <li className="mb-4">
                                        <a href="/signup" className="sidebar-link text-lg text-white">Sign Up</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidenav;
