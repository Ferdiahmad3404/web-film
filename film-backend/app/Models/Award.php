<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Award extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak menggunakan nama model yang di-plural
    protected $table = 'awards';
    protected $primaryKey = 'id';

    // Kolom-kolom yang dapat diisi secara massal
    protected $fillable = [
        'award',
        'drama_id',
    ];

    // Relasi dengan Film
    public function film()
    {
        return $this->belongsTo(Film::class, 'drama_id');
    }
}
