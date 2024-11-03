<?php

namespace App\Http\Controllers;

use App\Models\Countries;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    // Mendapatkan semua negara
    public function index()
    {
        $countries = Countries::All();
        return response()->json($countries, 200);
    }

    // Menambah negara baru
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'country' => 'required|string|max:255|unique:countries,country',
        ]);

        // ID akan dihasilkan secara otomatis oleh Laravel
        $country = Countries::create($validatedData);
        return response()->json(['message' => 'Country added successfully', 'data' => $country], 201);
    }

    // Mendapatkan data negara berdasarkan ID
    public function show($id)
    {
        $country = Countries::find($id);

        if (!$country) {
            return response()->json(['message' => 'Country not found'], 404);
        }

        return response()->json($country, 200);
    }

    // Mengupdate data negara
    public function update(Request $request, $id)
    {
        $country = Countries::find($id);

        if (!$country) {
            return response()->json(['message' => 'Country not found'], 404);
        }

        $validatedData = $request->validate([
            'country' => 'required|string|max:255|unique:countries,country,' . $id,
        ]);

        $country->update($validatedData);
        return response()->json(['message' => 'Country updated successfully', 'data' => $country], 200);
    }

    // Menghapus negara berdasarkan ID
    public function destroy($id)
    {
        $country = Countries::find($id);

        if (!$country) {
            return response()->json(['message' => 'Country not found'], 404);
        }

        $country->delete();
        return response()->json(['message' => 'Country deleted successfully'], 200);
    }


}
