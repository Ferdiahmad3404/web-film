<?php

namespace App\Http\Controllers;

use App\Models\Award;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AwardController extends Controller
{
    // Fungsi untuk menampilkan semua penghargaan
    public function index()
    {
        $awards = Award::with('film')->get(); // Mengambil semua penghargaan beserta relasi film
        return response()->json(['success' => true, 'data' => $awards]);
    }

    // Fungsi untuk menyimpan penghargaan baru
    public function store(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'award' => 'required|string|max:255',
            'drama_id' => 'nullable|exists:films,id', // Pastikan drama_id ada di tabel films
            'country_id' => 'nullable|exists:countries,id', // Pastikan country_id ada di tabel countries
            'year' => 'required|integer|min:1900|max:' . date('Y'),
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        // Buat penghargaan baru
        $award = Award::create($request->all());
        return response()->json(['success' => true, 'data' => $award], 201);
    }

    // Fungsi untuk memperbarui penghargaan yang ada
    public function update(Request $request, $id)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'award' => 'required|string|max:255',
            'drama_id' => 'nullable|exists:films,id',
            'country_id' => 'nullable|exists:countries,id',
            'year' => 'required|integer|min:1900|max:' . date('Y'),
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        // Temukan penghargaan berdasarkan ID
        $award = Award::find($id);
        if (!$award) {
            return response()->json(['success' => false, 'message' => 'Award not found'], 404);
        }

        // Perbarui data penghargaan
        $award->update($request->all());
        return response()->json(['success' => true, 'data' => $award]);
    }

    // Fungsi untuk menghapus penghargaan
    public function destroy($id)
    {
        // Temukan penghargaan berdasarkan ID
        $award = Award::find($id);
        if (!$award) {
            return response()->json(['success' => false, 'message' => 'Award not found'], 404);
        }

        // Hapus penghargaan
        $award->delete();
        return response()->json(['success' => true, 'message' => 'Award deleted successfully']);
    }
}
