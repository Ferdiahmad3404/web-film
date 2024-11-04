<?php

namespace App\Http\Controllers;

use App\Models\Comment; // Make sure to import your Comment model
use Illuminate\Http\Request;

class CMSCommentController extends Controller
{
    // Fetch all comments
    public function index()
    {
        $comments = Comment::all(); // You might want to paginate this
        return response()->json($comments);
    }

    // Approve a comment
    public function approve($id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            $comment->status = 'approved'; // Update this based on your requirements
            $comment->save();
            return response()->json(['message' => 'Comment approved successfully.']);
        }
        return response()->json(['message' => 'Comment not found.'], 404);
    }

    // Delete a comment
    public function destroy($id)
    {
        $comment = Comment::find($id);
        if ($comment) {
            $comment->delete();
            return response()->json(['message' => 'Comment deleted successfully.']);
        }
        return response()->json(['message' => 'Comment not found.'], 404);
    }

    // Bulk delete comments
    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids'); // Expecting an array of comment IDs
        Comment::destroy($ids);
        return response()->json(['message' => 'Selected comments deleted successfully.']);
    }
}
