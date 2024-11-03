<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\User;
use App\Models\Film;

class CommentsTableSeeder extends Seeder
{
    public function run()
    {
        // Pastikan sudah ada user dan film yang akan diberikan komentar
        $userIds = User::pluck('id')->toArray();
        $filmIds = Film::pluck('id')->toArray();

        for ($i = 0; $i < 50; $i++) {
            // Array contoh konten untuk komentar utama
            $mainComments = [
                'Film yang sangat menginspirasi!',
                'Ceritanya bagus dan aktornya keren!',
                'Alur cerita sedikit lambat, tapi masih bagus.',
                'Suka banget sama drama ini!',
                'Banyak adegan yang menyentuh hati!',
            ];
        
            // Array contoh konten untuk reply
            $replies = [
                'Saya setuju dengan komentar ini!',
                'Memang benar, ceritanya sangat menarik.',
                'Saya kurang setuju, menurut saya masih ada kekurangan.',
                'Sama, saya juga suka drama ini!',
                'Review yang bagus, terima kasih!',
            ];
        
            // Buat beberapa komentar utama untuk setiap film
            Comment::create([
                'user_id' => $userIds[array_rand($userIds)],
                'drama_id' => $filmIds[array_rand($filmIds)],
                'parent_id' => null, // Komentar utama
                'comment' => $mainComments[array_rand($mainComments)], // Konten acak dari array
                'rating' => rand(1, 5),
            ])->each(function ($comment) use ($userIds, $filmIds, $replies) {
                // Tambahkan beberapa reply untuk setiap komentar utama
                Comment::create([
                    'user_id' => $userIds[array_rand($userIds)],
                    'drama_id' => $filmIds[array_rand($filmIds)],
                    'parent_id' => $comment->id, // Reply pada komentar utama
                    'comment' => $replies[array_rand($replies)], // Konten acak dari array reply
                ]);
            });
        }
        
    }
}
