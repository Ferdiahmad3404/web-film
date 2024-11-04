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
        $validatedData = $request->validate([
            'genre' => 'required|string|max:255',
        ]);

        $genre = Genre::create($validatedData);

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
        $validatedData = $request->validate([
            'genre' => 'required|string|max:255',
        ]);

        // Cek jika genre yang baru sudah ada (case insensitive) dan bukan genre yang sama
        $existingGenre = Genre::whereRaw('LOWER(genre) = ? AND id != ?', [strtolower($validatedData['genre']), $genre->id])->first();

        if ($existingGenre) {
            return response()->json(['message' => 'Genre already exists'], 409); // Conflict
        }

        $genre->update($validatedData);

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
