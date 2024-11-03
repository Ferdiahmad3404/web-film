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
            'poster' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', 
            'title' => 'required|string|max:255',
            'alt_title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'trailer' => 'nullable|url',
            'stream_site' => 'nullable|url',
            'year' => 'required|integer',
            'status' => 'required|string|max:50',
            'created_date' => 'required|date',
            'created_by' => 'required|string|max:255',
            'country_id' => 'required|integer',
            'genres' => 'nullable|array', // Validasi untuk genre
            'genres.*' => 'integer|exists:genres,id', // Pastikan setiap genre yang dikirim ada di tabel genres
            'actors' => 'nullable|array', // Validasi untuk aktor
            'actors.*' => 'integer|exists:actors,id', // Pastikan setiap aktor yang dikirim ada di tabel actors
        ]);

        // Meng-upload file poster
        $path = $request->file('poster')->store('posters', 'public'); // Simpan file di storage/app/public/posters

        // Membuat film baru dengan url_cover yang diisi dengan path poster
        $film = Film::create(array_merge($request->all(), [
            'url_cover' => $path,
            'created_date' => now(), // Mengisi created_date dengan timestamp saat ini
        ]));

        // Menghubungkan film dengan genre jika ada
        if ($request->genres) {
            $film->genres()->attach($request->genres);
        }

        // Menghubungkan film dengan aktor jika ada
        if ($request->actors) {
            $film->actors()->attach($request->actors);
        }

        return response()->json(['message' => 'Film added successfully', 'data' => $film], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        // Ambil satu film beserta genre dan actor-nya
        $film = Film::with(['genres', 'actors', 'country', 'awards'])->find($id);

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
