import React, { useState, useEffect } from 'react';
import CMSSidebar from '../components/CMSSidebar';
import Sidenav from '../components/Sidenav';
import Footer from '../components/Footer';

const CMDComments = () => {
    const [comments, setComments] = useState([
        {
          id: 1,
          check: false,
          username: 'Nara',
          rate: 4.5,
          drama: 'Eye Love You',
          comment: 'I love this drama. It taught me a lot about money and finance. Love is not everything. We need to face the reality too. Being stoic is the best.',
          status: 'unapproved',
        },
        {
          id: 2,
          check: true,
          username: 'Luffy',
          rate: 2.5,
          drama: 'Eye Love You',
          comment: 'Meh',
          status: 'approved',
        },
      ]);
    
      const [searchInput, setSearchInput] = useState('');
      const [sortOption, setSortOption] = useState('a-z');
    
      useEffect(() => {
        renderComments();
      }, [searchInput, sortOption]);
    
      const renderComments = () => {
        const filteredComments = comments.filter((item) =>
          item.username.toLowerCase().includes(searchInput.toLowerCase()) ||
          item.comment.toLowerCase().includes(searchInput.toLowerCase())
        );
    
        const sortedComments = [...filteredComments];
        if (sortOption === 'a-z') {
          sortedComments.sort((a, b) => a.username.localeCompare(b.username));
        } else if (sortOption === 'z-a') {
          sortedComments.sort((a, b) => b.username.localeCompare(a.username));
        }
    
        return sortedComments;
      };
    
      const approveComments = () => {
        const updatedComments = comments.map((comment) => ({
          ...comment,
          status: comment.check ? 'approved' : comment.status,
        }));
        setComments(updatedComments);
      };
    
      const deleteComments = () => {
        const filteredComments = comments.filter((comment) => !comment.check);
        setComments(filteredComments);
      };
    
      const selectAllComments = () => {
        const updatedComments = comments.map((comment) => ({
          ...comment,
          check: true,
        }));
        setComments(updatedComments);
      };
    
      const handleCheckboxChange = (id) => {
        const updatedComments = comments.map((comment) =>
          comment.id === id ? { ...comment, check: !comment.check } : comment
        );
        setComments(updatedComments);
      };

    return (
        <>
            <div className="bg-gray-100">
                <div className="flex">
                    <CMSSidebar />

                    {/* Main Content */}
                    <main className="flex-1 bg-gray-100 p-6">
      <div className="w-full p-9">
        <div className="mb-5 flex flex-col justify-between">
          <h1 className="text-2xl mb-5 font-medium">Comments</h1>
        </div>

        {/* Search and Sort Options */}
        <div className="flex justify-between mb-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              id="search-bar"
              className="border border-gray-400 px-4 py-2 rounded-full"
              placeholder="Search country"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2 w-1/6">
            <label htmlFor="sort-options" className="mr-2 w-full">Sort by:</label>
            <select
              id="sort-options"
              className="w-full border border-gray-400 px-4 py-2 rounded-full"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>

        {/* Country List */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left mb-10 text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-yellow-900 dark:text-white">
              <tr>
                <th scope="col" className="w-1/12 px-4 py-4 sr-only">No</th>
                <th scope="col" className="w-1/12 px-4 py-4">Username</th>
                <th scope="col" className="w-1/12 px-4 py-4">Rate</th>
                <th scope="col" className="w-3/12 px-4 py-4">Drama</th>
                <th scope="col" className="w-5/12 px-4 py-4">Comments</th>
                <th scope="col" className="w-1/12 px-4 py-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {renderComments().map((item) => (
                <tr key={item.id} className="border-b dark:border-gray-700">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={item.check}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="status-checkbox w-4 h-4 text-black bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-4 py-3 text-black">{item.username}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                      </svg>
                      <p className="ms-2 text-sm text-black">{item.rate}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-black">{item.drama}</td>
                  <td className="px-4 py-3 text-black">{item.comment}</td>
                  <td className="px-4 py-3 text-black">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-col gap-5 w-2/6">
          <div>
            <button onClick={selectAllComments} className="w-2/6 h-10 text-black rounded-full hover:text-blue-600">Select All</button>
          </div>
          <div className="flex gap-5">
            <button type="submit" onClick={approveComments} className="w-3/6 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600">Approve</button>
            <button type="submit" onClick={deleteComments} className="w-3/6 h-10 bg-red-500 text-white rounded-full hover:bg-red-600">Delete</button>
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

export default CMDComments;