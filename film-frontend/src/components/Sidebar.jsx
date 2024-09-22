const Sidebar = ({ open, onClose }) => {
    return (
        <div className={`fixed top-0 left-0 h-full w-64 bg-yellow-900 shadow-lg z-50 p-8 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-bold text-white">Countries</h2>
                <button className="text-2xl text-white" onClick={onClose}>&times;</button>
            </div>
            <nav>
                <ul>
                    <li className="mb-4"><a href="#" className="sidebar-link text-lg text-white">Japan</a></li>
                    <li className="mb-4"><a href="#" className="sidebar-link text-lg text-white">Korea</a></li>
                    <li className="mb-4"><a href="#" className="sidebar-link text-lg text-white">China</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
