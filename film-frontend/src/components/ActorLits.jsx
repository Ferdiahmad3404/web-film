const ActorsList = ({ actors }) => {
    return (
        <div className="bg-white text-white p-4 rounded-lg shadow-lg w-full mb-6">
            <h1 className="font-bold mb-4 text-black text-2xl">Actors</h1>
            <div className="overflow-x-auto">
                <ul className="flex flex-nowrap">
                    {actors.map((actor, index) => (
                        <li key={index} className="mr-4 flex-none">
                            <a href="#" className="block bg-gray-700 shadow rounded-lg p-2">
                                <img src={actor.image} alt={actor.name} className="w-48 h-72 object-cover rounded mb-2" />
                                <p className="text-center font-semibold text-sm">{actor.name}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ActorsList;
