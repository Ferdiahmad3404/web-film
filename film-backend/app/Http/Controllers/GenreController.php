<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Genre::all(),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $genre = Genre::create($request->only('name'));

        return response()->json(['message' => 'Genre added successfully', 'data' => $genre], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Genre $genre)
    {
        return response()->json([
            'success' => true,
            'data' => $genre,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Genre $genre)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $genre->update($request->only('name'));

        return response()->json(['message' => 'Genre updated successfully', 'data' => $genre], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Genre $genre)
    {
        $genre->delete();

        return response()->json(['message' => 'Genre deleted successfully'], 200);
    }
}
