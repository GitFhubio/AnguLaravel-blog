<?php

namespace App\Http\Controllers\Api;

use App\Tag;
use App\Article;
use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiController extends Controller
{
    public function categories(){
        $categories = Category::all();
        return response()->json($categories);
    }
    public function filteredByCat($param){
        $articles = Article::with(['categories','tags','comments'])->whereHas('categories', function($query) use($param) {
            $query->where('name', $param);
        })->get();
        foreach ($articles as $article) {
            $article->author =$article->user()->get()->first();
    }
        return response()->json($articles);
    }
    public function filteredByTag($param){
        $articles = Article::with(['categories','tags','comments'])->whereHas('tags', function($query) use($param) {
            $query->where('name', $param);
        })->get();
        foreach ($articles as $article) {
            $article->author =$article->user()->get()->first();
    }
        return response()->json($articles);
    }
    public function tags(){
            $tags = Tag::all();
        return response()->json($tags);
    }
}
