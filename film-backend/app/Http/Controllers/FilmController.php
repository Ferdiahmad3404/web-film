<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Ambil film beserta genre dan actor melalui relasi many-to-many
        $films = Film::with(['genres', 'actors', 'country', 'awards'])->get();

        return response()->json([
            'success' => true,
            'data' => $films,
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'url_cover' => 'required|url',
            'title' => 'required|string|max:255',
            'alt_title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'trailer' => 'nullable|url',
            'stream_site' => 'nullable|url',
            'year' => 'required|integer',
            'status' => 'required|string|max:50',
            'created_date' => 'required|date',
            'country_id' => 'required|integer',
        ]);

        $film = Film::create($request->all());

        return response()->json(['message' => 'Film added successfully', 'data' => $film], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        // Ambil satu film beserta genre, actor, dan hanya komentar yang berstatus 'approved'
        $film = Film::with([
            'genres',
            'actors',
            'country',
            'awards',
            // 'comments' => function ($query) {
            //     $query->approved(); // Memanggil scope approved di model Comment
            // }
        ])->find($id);

        return response()->json([
            'success' => true,
            'data' => $film,
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Film $film)
    {
        $request->validate([
            'url_cover' => 'nullable|url',
            'title' => 'nullable|string|max:255',
            'alt_title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'trailer' => 'nullable|url',
            'stream_site' => 'nullable|url',
            'year' => 'nullable|integer',
            'status' => 'nullable|string|max:50',
            'created_date' => 'nullable|date',
            'country_id' => 'nullable|integer',
        ]);

        $film->update($request->all());

        return response()->json(['message' => 'Film updated successfully', 'data' => $film], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Film $film)
    {
        $film->delete();

        return response()->json(['message' => 'Film deleted successfully'], 200);
    }
}
