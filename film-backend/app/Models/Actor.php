<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actor extends Model
{
    use HasFactory;

    public $timestamps = false;

    // Tentukan nama tabel jika tidak menggunakan nama model yang di-plural
    protected $table = 'actors';

    // Kolom-kolom yang dapat diisi secara massal
    protected $fillable = [
        'name',
        'url_photo',
        'birth_date',
        'country_id',
    ];

    // Relasi dengan Film
    public function films()
    {
        return $this->belongsToMany(Film::class, 'dramas_actors', 'actors_id', 'drama_id');
    }

    // Relasi dengan Country
    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }
}
