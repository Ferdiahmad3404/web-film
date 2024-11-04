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

    // Validasi yang akan memeriksa apakah nama negara sudah ada (case insensitive)
    $validatedData = $request->validate([
        'country' => 'required|string|max:255',
    ]);

    // Cek jika nama negara sudah ada (case insensitive)
    $existingCountry = Countries::where('country', 'ILIKE', $validatedData['country'])->where('id', '!=', $id)->first();

    if ($existingCountry) {
        return response()->json(['message' => 'Country name must be unique (case insensitive)'], 400);
    }

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

        try {
            $country->delete();
            return response()->json(['message' => 'Country deleted successfully'], 200);
        } catch (\Illuminate\Database\QueryException $e) {
            return response()->json(['message' => 'Cannot delete country, it is still referenced by actors.'], 409);
        }
    }


}
