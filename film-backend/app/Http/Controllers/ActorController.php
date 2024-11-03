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
        // Mengambil semua aktor dengan data negara
        $actors = Actor::with('country')->get();

        return response()->json([
            'success' => true,
            'data' => $actors,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'url_photos' => 'nullable|string|max:255',
            'country_id' => 'required|integer|exists:countries.id', 
            'birth_date' => 'nullable|date', 
        ]);

        $actor = Actor::create($request->only('name', 'url_photos', 'country_id', 'birth_date'));

        return response()->json(['message' => 'Actor added successfully', 'data' => $actor], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Actor $actor)
    {
        // Mengambil aktor dengan data negara
        $actor->load('country');

        return response()->json([
            'success' => true,
            'data' => $actor,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $actor = Actor::find($id);

        if (!$actor) {
            return response()->json(['message' => 'Actor not found'], 404);
        }

        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'url_photos' => 'nullable|string|max:255',
            'country_id' => 'nullable|integer|exists:countries,id',
            'birth_date' => 'nullable|date',
        ]);

        try {
            $actor->update($validatedData);
            return response()->json([
                'message' => 'Actor updated successfully',
                'data' => $actor
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error updating actor',
                'error' => $e->getMessage()
            ], 500);
        }
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
