<?php

namespace App\Http\Controllers\Api;

use App\Tag;
use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ApiController extends Controller
{
    public function categories(){
        $categories = Category::all();
        return response()->json($categories);
    }
    public function tags(){
            $tags = Tag::all();
        return response()->json($tags);
    }
}
