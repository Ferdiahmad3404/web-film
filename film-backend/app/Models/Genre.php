<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak menggunakan nama model yang di-plural
    protected $table = 'genres';

    protected $fillable = ['name'];

    // Relasi dengan Film
    public function films()
    {
        return $this->belongsToMany(Film::class, 'dramas_genres', 'genre_id', 'drama_id');
    }
}
