const ReactionsAndComments = () => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex space-x-4 mb-4">
                {/* Buttons for reactions */}
                <button className="bg-yellow-500 text-white px-4 py-2 rounded">😀 10</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded">😢 5</button>
                <button className="bg-red-500 text-white px-4 py-2 rounded">😡 3</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">👍 15</button>
                <button className="bg-purple-500 text-white px-4 py-2 rounded">👎 2</button>
            </div>

            <div className="scroll-comments space-y-4">
                {/* Example Comments */}
                <div className="bg-gray-100 p-2 rounded">
                    <p><strong>Jane Doe:</strong> Amazing movie! Really enjoyed it.</p>
                    <button className="text-blue-500 text-sm">Reply</button>
                </div>
                {/* Add more comments as needed */}
            </div>

            <textarea className="w-full p-2 border border-gray-300 rounded mt-4" rows="4" placeholder="Add your comment..."></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Submit</button>
        </div>
    );
};

export default ReactionsAndComments;
