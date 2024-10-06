<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;


class CreateDramasTables extends Migration
{
    public function up()
    {
        // Create 'roles' enum
        DB::statement("CREATE TYPE roles AS ENUM ('admin', 'user')");

        // Create 'statuss' enum
        DB::statement("CREATE TYPE statuss AS ENUM ('approved', 'unapproved')");

        // Create 'dramas' table
        Schema::create('dramas', function (Blueprint $table) {
            $table->id();
            $table->string('url_cover')->nullable();
            $table->string('title');
            $table->string('alt_title')->nullable();
            $table->text('description')->nullable();
            $table->string('trailer')->nullable();
            $table->string('stream_site')->nullable();
            $table->date('year');
            $table->enum('status', ['approved', 'unapproved']);
            $table->timestamp('created_date')->default(DB::raw('CURRENT_TIMESTAMP'));
        });

        // Create 'genres' table
        Schema::create('genres', function (Blueprint $table) {
            $table->id();
            $table->string('genre');
        });

         // Create 'actors' table
         Schema::create('actors', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('url_photos')->nullable();
        });

        // Create 'countries' table
        Schema::create('countries', function (Blueprint $table) {
            $table->id();
            $table->string('country');
        });

        // Create 'users' table
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username')->unique();
            $table->string('password');
            $table->string('email');
            $table->string('number')->nullable();
            $table->enum('role_id', ['admin', 'user']);
            $table->timestamp('created_date')->default(DB::raw('CURRENT_TIMESTAMP'));
        });

        // Create 'comments' table
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->longText('comment');
            $table->float('rating');
            $table->enum('status', ['approved', 'unapproved']);
            $table->timestamp('created_date')->default(DB::raw('CURRENT_TIMESTAMP'));
        });

        // Create 'awards' table
        Schema::create('awards', function (Blueprint $table) {
            $table->id();
            $table->string('award');
            $table->foreignId('drama_id')->constrained('dramas');
        });

        // Foreign keys
        Schema::table('dramas', function (Blueprint $table) {
            $table->foreignId('country_id')->constrained('countries');
        });

        Schema::table('comments', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('drama_id')->constrained('dramas');
        });

        // Create 'dramas_genres' table
        Schema::create('dramas_genres', function (Blueprint $table) {
            $table->integer('drama_id');
            $table->integer('genre_id');
            $table->foreign('drama_id')->references('id')->on('dramas');
            $table->foreign('genre_id')->references('id')->on('genres');
            $table->primary(['drama_id', 'genre_id']);
        });

        // Create 'dramas_actors' table
        Schema::create('dramas_actors', function (Blueprint $table) {
            $table->integer('drama_id');
            $table->integer('actors_id');
            $table->foreign('drama_id')->references('id')->on('dramas');
            $table->foreign('actors_id')->references('id')->on('actors');
            $table->primary(['drama_id', 'actors_id']);
        });
    }

    public function down()
    {
        // Drop the tables and types in reverse order
        Schema::dropIfExists('awards');
        Schema::dropIfExists('comments');
        Schema::dropIfExists('users');
        Schema::dropIfExists('countries');
        Schema::dropIfExists('genres');
        Schema::dropIfExists('actors');
        Schema::dropIfExists('dramas_actors');
        Schema::dropIfExists('dramas_genres');
        Schema::dropIfExists('dramas');

        // Drop the custom types
        DB::statement("DROP TYPE IF EXISTS roles");
        DB::statement("DROP TYPE IF EXISTS statuss");
    }
}
