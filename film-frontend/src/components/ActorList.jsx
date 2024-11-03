import React, { useState } from 'react';

const ActorList = ({ actors, editActors, deleteActors }) => {
    const [editingActorId, setEditingActorId] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedBirthDate, setUpdatedBirthDate] = useState('');

    const handleEditClick = (actor) => {
        setEditingActorId(actor.id);
        setUpdatedName(actor.name);
        setUpdatedBirthDate(actor.birth_date);
    };

    const handleDoubleClick = (actor) => {
        setEditingActorId(actor.id);
        setUpdatedName(actor.name);
        setUpdatedBirthDate(actor.birth_date);
    };

    const handleSaveClick = (actor) => {
        editActors(actor.id, { name: updatedName, birth_date: updatedBirthDate });
        setEditingActorId(null); // Keluar dari mode edit
    };

    return (
        <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-white uppercase bg-yellow-900">
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
                {actors.map((item, index) => (
                    <tr key={item.id} className="border-b">
                        <th scope="row" className="w-1/12 px-4 py-3 font-medium text-black">{index + 1}</th>
                        <td className="w-3/12 px-4 py-3 font-medium text-black">{item.country.country}</td>
                        <td 
                            className="w-3/12 px-4 py-3 font-medium text-black cursor-pointer"
                            onDoubleClick={() => handleDoubleClick(item)} // Menambahkan event handler untuk double click
                        >
                            {editingActorId === item.id ? (
                                <input
                                    type="text"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                    className="border rounded px-2 py-1"
                                />
                            ) : (
                                item.name
                            )}
                        </td>
                        <td 
                            className="w-2/12 px-4 py-3 font-medium text-black cursor-pointer"
                            onDoubleClick={() => handleDoubleClick(item)} // Menambahkan event handler untuk double click
                        >
                            {editingActorId === item.id ? (
                                <input
                                    type="date"
                                    value={updatedBirthDate}
                                    onChange={(e) => setUpdatedBirthDate(e.target.value)}
                                    className="border rounded px-2 py-1"
                                />
                            ) : (
                                item.birth_date
                            )}
                        </td>
                        <td className="w-1/12 px-4 py-3">
                            <img className="w-20 h-24" src={item.url_photos} alt={item.name} />
                        </td>
                        <td className="w-2/12 text-center text-black">
                            <div className="flex justify-center items-center">
                                {editingActorId === item.id ? (
                                    <>
                                        <button onClick={() => handleSaveClick(item)} className="flex py-2 px-4 text-black hover:text-green-600">
                                            Save
                                        </button>
                                        <span className="text-black">|</span>
                                        <button onClick={() => setEditingActorId(null)} className="flex py-2 px-4 text-black hover:text-red-600">
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button onClick={() => handleEditClick(item)} className="flex py-2 px-4 text-black hover:text-blue-600">
                                        Edit
                                    </button>
                                )}
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
    );
};

export default ActorList;
