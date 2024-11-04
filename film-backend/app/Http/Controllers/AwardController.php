<?php

namespace App\Http\Controllers;

use App\Models\Award;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AwardController extends Controller
{
    // Function to display all awards
    public function index()
    {
        $awards = Award::with('film', 'country')->get(); // Fetch all awards along with the film relationship
        return response()->json(['success' => true, 'data' => $awards]);
    }

    // Function to store a new award
    public function store(Request $request)
    {
        // Input validation
        $validator = Validator::make($request->all(), [
            'award' => 'required|string|max:255',
            'drama_id' => 'nullable|exists:films,id', // Ensure drama_id exists in films table
            'country_id' => 'nullable|exists:countries,id', // Ensure country_id exists in countries table
            'year' => 'required|integer|min:1900|max:' . date('Y'),
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        // Create a new award
        $award = Award::create($request->all());
        return response()->json(['success' => true, 'data' => $award], 201);
    }

    // Function to update an existing award
    public function update(Request $request, $id)
    {
        // Input validation
        $validator = Validator::make($request->all(), [
            'award' => 'required|string|max:255',
            'drama_id' => 'nullable|exists:films,id',
            'country_id' => 'nullable|exists:countries,id',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        // Find award by ID
        $award = Award::find($id);
        if (!$award) {
            return response()->json(['success' => false, 'message' => 'Award not found'], 404);
        }

        // Update award data
        $award->update($request->all());
        return response()->json(['success' => true, 'data' => $award]);
    }

    // Function to delete an award
    public function destroy($id)
    {
        // Find award by ID
        $award = Award::find($id);
        if (!$award) {
            return response()->json(['success' => false, 'message' => 'Award not found'], 404);
        }

        // Delete award
        $award->delete();
        return response()->json(['success' => true, 'message' => 'Award deleted successfully']);
    }
}
