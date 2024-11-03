<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    // Mendapatkan komentar untuk sebuah film beserta reply-nya
    public function getComments($id)
    {
        \Log::info('Fetching comments for drama ID: ' . $id);
        
        $comments = Comment::with(['user', 'replies.user'])
                            ->where('drama_id', $id)
                            ->whereNull('parent_id')
                            ->get();

        if ($comments->isEmpty()) {
            return response()->json(['message' => 'No comments found.'], 404);
        }

        return response()->json($comments);
    }

    // Menambahkan komentar baru
    public function addComment(Request $request, $id)
{
    $request->validate([
        'comment' => 'required|string',
        'rating' => 'nullable|integer|min:1|max:5'
    ]);

    // Menggunakan ID dari token JWT
    $userId = $request->user()->id;

    $comment = Comment::create([
        'user_id' => $userId, // Ambil ID dari token JWT
        'drama_id' => $id,
        'comment' => $request->comment,
        'rating' => $request->rating, // Pastikan rating juga dikirim jika diperlukan
        'parent_id' => $request->parent_id // null jika komentar utama
    ]);

    return response()->json($comment, 201);
    }


    // Menambahkan reply ke komentar tertentu
    public function addReply(Request $request, $commentId)
    {
        $request->validate([
            'comment' => 'required|string'
        ]);

        $comment = Comment::findOrFail($commentId);
        $reply = Comment::create([
            'user_id' => $userId,
            'drama_id' => $comment->film_id,
            'comment' => $request->comment,
            'parent_id' => $commentId
        ]);

        return response()->json($reply, 201);
    }
}
