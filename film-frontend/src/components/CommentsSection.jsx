import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const CommentsSection = ({ id }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [replyComment, setReplyComment] = useState('');
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const isLoggedIn = sessionStorage.getItem('role_id') === 'user';

    useEffect(() => {
        fetchComments();
    }, []);

    // Fetch comments from API
    const fetchComments = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/films/${id}/comments`);
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleReplyChange = (e) => {
        setReplyComment(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token'); // Ambil token JWT dari sessionStorage
        if (newComment.trim()) {
            try {
                const response = await fetch(`http://localhost:8000/api/films/${id}/comments`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Kirim token JWT dalam header
                    },
                    body: JSON.stringify({
                        comment: newComment,
                        rating: newRating,
                    }),
                });
                if (!response.ok) {
                    throw new Error('Failed to submit comment');
                }
                const newCommentData = await response.json();
                setComments([...comments, newCommentData]);
                setNewComment('');
                setNewRating(0);
            } catch (error) {
                console.error('Error submitting comment:', error);
            }
        }
    };
    

    const handleReplySubmit = async (e, commentId) => {
        e.preventDefault();
        if (replyComment.trim()) {
            try {
                const response = await fetch(`http://localhost:8000/api/films/comments/${commentId}/replies`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ comment: replyComment }),
                });
                const replyData = await response.json();
                const updatedComments = comments.map(comment => {
                    if (comment.id === commentId) {
                        return { ...comment, replies: [...(comment.replies || []), replyData] };
                    }
                    return comment;
                });
                setComments(updatedComments);
                setReplyComment('');
                setReplyToCommentId(null);
            } catch (error) {
                console.error('Error submitting reply:', error);
            }
        }
    };

    const handleStarClick = (rating) => {
        setNewRating(rating);
    };

    const renderStars = () => {
        return [...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
                <FaStar
                    key={ratingValue}
                    size={30}
                    color={ratingValue <= newRating ? '#ffc107' : '#e4e5e9'}
                    onClick={() => handleStarClick(ratingValue)}
                    style={{ cursor: 'pointer', marginRight: '5px' }}
                />
            );
        });
    };

    return (
        <div className="mt-8 bg-yellow-1000">
            <h2 className="text-2xl font-semibold mb-4">Komentar</h2>

            <div className="mb-4">
                <h3 className="font-semibold">Average Rating: {(comments.reduce((acc, comment) => acc + comment.rating, 0) / (comments.length || 1)).toFixed(1)} ★</h3>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-4 border p-4 rounded-lg shadow-md bg-white">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index} className="border-b p-4">
                            <h4 className="font-bold">{comment.user.username}</h4>
                            <p className="mt-2">{comment.comment}</p>
                            <button
                                onClick={() => setReplyToCommentId(comment.id === replyToCommentId ? null : comment.id)}
                                className="mt-2 text-blue-500 hover:underline"
                            >
                                Reply
                            </button>

                            {replyToCommentId === comment.id && (
                                <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="mt-2">
                                    <textarea
                                        value={replyComment}
                                        onChange={handleReplyChange}
                                        placeholder="Tulis balasan Anda..."
                                        className="border rounded p-2 w-full h-24"
                                    ></textarea>
                                    <button
                                        type="submit"
                                        className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                                    >
                                        Kirim Balasan
                                    </button>
                                </form>
                            )}

                            {comment.replies && comment.replies.map((reply, replyIndex) => (
                                <div key={replyIndex} className="ml-4 mt-2 p-2 bg-gray-400 rounded">
                                    <h5 className="font-semibold">{reply.user.username}</h5>
                                    <p>{reply.comment}</p>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Belum ada komentar.</p>
                )}
            </div>

            {isLoggedIn ? (
                <>
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">Beri Rating</h3>
                        <div className="flex">
                            {renderStars()}
                        </div>
                        <button
                            onClick={() => { if (newRating) alert(`Rating ${newRating} diberikan!`); }}
                            className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-200"
                        >
                            Submit Rating
                        </button>
                    </div>

                    <form onSubmit={handleCommentSubmit} className="mt-6 bg-gray-100 p-4 rounded-lg">
                        <h3 className="text-lg font-semibold">Tinggalkan Komentar</h3>
                        <div className="mt-2">
                            <textarea
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Tulis komentar Anda..."
                                className="border rounded p-2 w-full h-24"
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                        >
                            Kirim Komentar
                        </button>
                    </form>
                </>
            ) : (
                <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-600">Anda harus <a href="/login" className="text-blue-500 hover:underline">Login</a> atau <a href="/signup" className="text-blue-500 hover:underline">Signup</a> untuk menulis komentar.</p>
                </div>
            )}
        </div>
    );
};

export default CommentsSection;
