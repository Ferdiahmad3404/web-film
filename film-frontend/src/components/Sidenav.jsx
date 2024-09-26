import { useEffect } from "react";

const Sidenav = () => {
    useEffect(() => {
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
    return(
        <>
            {/* Sidenav */}
            <div className="flex">
                <div className="bg-yellow-900 p-4 h-screen sticky top-0">
                    <div className="text-2xl font-bold text-white flex flex-col justify-center">
                        <a href="#home">
                            <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M15.907 11.998 10.332 9.23a.9.9 0 0 1-.16-.037l-.018-.007v6.554c0 .017.008.034.01.051l2.388-2.974 3.355-.82Z"/>
                                <path d="m11.463 4.054 5.579 3.323A4.02 4.02 0 0 1 18.525 9c.332.668.47 1.414.398 2.155a3.07 3.07 0 0 1-.745 1.65 3.108 3.108 0 0 1-1.55.951c-.022.007-.045.005-.07.01-.062.03-.126.057-.191.08l-2.72.667-1.992 2.48c-.18.227-.41.409-.67.534.047.034.085.077.137.107a2.05 2.05 0 0 0 1.995.035c.592-.33 2.15-1.201 4.636-2.892l.28-.19c1.328-.895 3.616-2.442 3.967-4.215a9.94 9.94 0 0 0-1.713-4.154 10.027 10.027 0 0 0-3.375-2.989 10.107 10.107 0 0 0-8.802-.418c1.162.287 2.287.704 3.354 1.243Z"/>
                                <path d="M5.382 17.082v-6.457a3.7 3.7 0 0 1 .45-1.761 3.733 3.733 0 0 1 1.238-1.34 3.915 3.915 0 0 1 3.433-.245c.176.03.347.084.508.161l5.753 2.856c.082.05.161.105.236.165a2.128 2.128 0 0 0-.953-1.455l-5.51-3.284c-1.74-.857-3.906-1.523-5.244-1.097a9.96 9.96 0 0 0-2.5 3.496 9.895 9.895 0 0 0 .283 8.368 9.973 9.973 0 0 0 2.73 3.322 17.161 17.161 0 0 1-.424-2.729Z"/>
                                <path d="m19.102 16.163-.272.183c-2.557 1.74-4.169 2.64-4.698 2.935a4.083 4.083 0 0 1-2 .53 3.946 3.946 0 0 1-1.983-.535 3.788 3.788 0 0 1-1.36-1.361 3.752 3.752 0 0 1-.51-1.85 1.812 1.812 0 0 1-.043-.26V9.143c0-.024.009-.046.01-.07-.056.02-.11.043-.162.07a1.796 1.796 0 0 0-.787 1.516v6.377a10.67 10.67 0 0 0 1.113 4.27 10.11 10.11 0 0 0 8.505-.53 10.022 10.022 0 0 0 3.282-2.858 9.936 9.936 0 0 0 1.75-3.97 19.615 19.615 0 0 1-2.845 2.216Z"/>
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
                        <h2 className="text-2xl font-bold text-white">Countries</h2>
                        <button id="close-btn" className="text-2xl text-white">&times;</button>
                    </div>
                    <nav>
                        <ul>
                            <li className="mb-4"><a href="/cmscountries" className="sidebar-link text-lg text-white">CMS</a></li>
                        </ul>
                    </nav>
                </div>
            </div>         
        </>
    )
}
export default Sidenav