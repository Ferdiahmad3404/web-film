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
        return Film::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $film = new Film();
        $film->title = $request->title;
        $film->url_photo = $request->url_photo;
        $film->synopsis = $request->synopsis;
        $film->save();

        return response()->json(['message' => 'Film added successfully']);
    }
    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    /**
     * Display the specified resource.
     */
    public function show(Film $film)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Film $film)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Film $film)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Film $film)
    {
        //
    }
}
