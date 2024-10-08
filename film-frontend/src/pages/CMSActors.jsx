import React, { useState } from 'react';
import CMSSidebar from '../components/CMSSidebar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';

const CMSActors = () => {
    const [actors, setActors] = useState([
        { id: 1, country: 'Korea', actorName: 'Park Bo-gum', birthDate: '16/06/1993', photo: 'https://koreanindo.net/wp-content/uploads/2023/02/park-bo-gum-2.png' },
        { id: 2, country: 'Korea', actorName: 'Kim Ji-won', birthDate: '19/10/1992', photo: 'https://i.mydramalist.com/kAOV2O_5c.jpg' }
    ]);

    const [newCountry, setNewCountry] = useState('');
    const [newActorName, setNewActorName] = useState('');
    const [newBirthDate, setNewBirthDate] = useState('');
    const [newPhoto, setNewPhoto] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('a-z');

    const addActors = () => {
        if (newCountry && newActorName && newBirthDate && newPhoto) {
            const newId = actors.length ? Math.max(...actors.map(actor => actor.id)) + 1 : 1;
            const newActor = { id: newId, country: newCountry, actorName: newActorName, birthDate: newBirthDate, photo: newPhoto };
            setActors([...actors, newActor]);
            setNewCountry('');
            setNewActorName('');
            setNewBirthDate('');
            setNewPhoto('');
        }
    };

    const editActors = (id) => {
        const index = actors.findIndex(actor => actor.id === id);
        if (index === -1) return;

        const item = actors[index];
        const newCountry = prompt('Edit country name:', item.country);
        const newActorName = prompt('Edit actor name:', item.actorName);
        const newBirthDate = prompt('Edit birth date:', item.birthDate);
        const newPhoto = prompt('Edit photo URL:', item.photo);

        if (newCountry && newActorName && newBirthDate && newPhoto) {
            const updatedActors = [...actors];
            updatedActors[index] = { ...item, country: newCountry.trim(), actorName: newActorName.trim(), birthDate: newBirthDate.trim(), photo: newPhoto.trim() };
            setActors(updatedActors);
        }
    };

    const deleteActors = (id) => {
        const updatedActors = actors.filter(actor => actor.id !== id);
        setActors(updatedActors);
    };

    const sortedActors = [...actors].sort((a, b) => {
        if (sortOrder === 'a-z') return a.actorName.localeCompare(b.actorName);
        if (sortOrder === 'z-a') return b.actorName.localeCompare(a.actorName);
        return 0;
    });

    const filteredActors = sortedActors.filter(item =>
        item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.actorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.birthDate.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="bg-gray-100">
                <div className="flex">
                    <CMSSidebar />
                    <main className="flex-1 bg-gray-100 p-6">
                        <div className="w-full p-9">
                            <div className="mb-5 flex flex-col justify-between">
                                <h1 className="text-2xl mb-5 font-medium">Add Actors</h1>
                                <form onSubmit={e => { e.preventDefault(); addActors(); }} className="flex">
                                    <div className="flex-col w-full justify-between">
                                        <div className="relative z-0 w-5/6 mb-5 group">
                                            <select
                                                value={newCountry}
                                                onChange={e => setNewCountry(e.target.value)}
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                required
                                            >
                                                <option value="" disabled hidden>Select country</option>
                                                <option value="Japan">Japan</option>
                                                <option value="Korea">Korea</option>
                                            </select>
                                        </div>
                                        <div className="relative z-0 w-5/6 mb-5 group">
                                            <input
                                                type="text"
                                                value={newActorName}
                                                onChange={e => setNewActorName(e.target.value)}
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Actor Name</label>
                                        </div>
                                        <div className="relative z-0 w-5/6 mb-5 group">
                                            <input
                                                type="date"
                                                value={newBirthDate}
                                                onChange={e => setNewBirthDate(e.target.value)}
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                required
                                            />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Birth Date</label>
                                        </div>
                                    </div>
                                    <div className="flex-col w-full flex items-center">
                                        <div className="relative z-0 w-5/6 mb-5 group">
                                            <input
                                                type="text"
                                                value={newPhoto}
                                                onChange={e => setNewPhoto(e.target.value)}
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                                placeholder=" "
                                                required
                                            />
                                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                                Image URL
                                            </label>
                                        </div>
                                        <button type="submit" className="w-3/6 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600">Add</button>
                                    </div>
                                </form>
                            </div>

                            {/* Search and Sort Options */}
                            <div className="flex justify-between mb-4">
                                {/* Search Bar */}
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        className="border border-gray-400 px-4 py-2 rounded-full"
                                        placeholder="Search country"
                                        onChange={e => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Sort Options */}
                                <div className="flex items-center space-x-2 w-1/6">
                                    <label htmlFor="sort-options" className="mr-2 w-full">Sort by:</label>
                                    <select
                                        value={sortOrder}
                                        onChange={e => setSortOrder(e.target.value)}
                                        className="w-full border border-gray-400 px-4 py-2 rounded-full"
                                    >
                                        <option value="a-z">A-Z</option>
                                        <option value="z-a">Z-A</option>
                                    </select>
                                </div>
                            </div>

                            {/* Actor List */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th scope="col" className="w-1/12 px-4 py-4">No</th>
                                            <th scope="col" className="w-1/12 px-4 py-4">Countries</th>
                                            <th scope="col" className="w-3/12 px-4 py-4">Actor Name</th>
                                            <th scope="col" className="w-2/12 px-4 py-4">Birth Date</th>
                                            <th scope="col" className="w-3/12 px-4 py-4">Photos</th>
                                            <th scope="col" className="w-2/12 px-4 py-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredActors.map((item, index) => (
                                            <tr key={item.id} className="border-b">
                                                <th scope="row" className="px-4 py-3 font-medium">{index + 1}</th>
                                                <td className="px-4 py-3 font-medium">{item.country}</td>
                                                <td className="px-4 py-3 font-medium">{item.actorName}</td>
                                                <td className="px-4 py-3 font-medium">{item.birthDate}</td>
                                                <td className="px-4 py-3">
                                                    <img className="w-full h-auto" src={item.photo} alt={item.actorName} />
                                                </td>
                                                <td className="text-center">
                                                    <div className="flex justify-center items-center">
                                                        <button onClick={() => editActors(item.id)} className="flex py-2 px-4 text-black hover:text-blue-600">
                                                            Edit
                                                        </button>
                                                        <span className="text-black">|</span>
                                                        <button onClick={() => deleteActors(item.id)} className="flex py-2 px-4 text-black hover:text-red-600">
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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

export default CMSActors;