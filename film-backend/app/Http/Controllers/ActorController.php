<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use Illuminate\Http\Request;

class ActorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Actor::all(),
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'url_photo' => 'nullable|url',
        ]);

        $actor = Actor::create($request->only('name', 'url_photo'));

        return response()->json(['message' => 'Actor added successfully', 'data' => $actor], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Actor $actor)
    {
        return response()->json([
            'success' => true,
            'data' => $actor,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Actor $actor)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'url_photo' => 'nullable|url',
        ]);

        $actor->update($request->only('name', 'url_photo'));

        return response()->json(['message' => 'Actor updated successfully', 'data' => $actor], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Actor $actor)
    {
        $actor->delete();

        return response()->json(['message' => 'Actor deleted successfully'], 200);
    }
}
