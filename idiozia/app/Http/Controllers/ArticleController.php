<?php

namespace App\Http\Controllers;

use App\Tag;
use App\Article;
use App\Comment;
use App\Category;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles=Article::with(['categories','tags','comments'])->get();
        foreach ($articles as $article) {
                $article->author =$article->user()->get()->first();
        }
        return response()->json($articles);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $data=$request->all();
        $article= new Article();
        $article->title=json_decode($data['myform'],true)['title'];
        $article->content=json_decode($data['myform'],true)['content'];
        $categories=json_decode($data['myform'],true)['selectedCategories'];
        $article->user_id=$data['id'];
        if($request->file('image')){
            $article->img = $request->file('image')->store('images');
        }
        if(count(json_decode($data['newCategories']))>0){
            $res=json_decode($data['newCategories']);
            $newCatIds=[];
            foreach($res as $newcat){
                $newcategory=new Category();
                $newcategory->name=$newcat;
                $newcategory->slug=$newcat;
                $newcategory->save();
                $newCatIds[]=$newcategory->id;
            }
        }
        if(count(json_decode($data['newTags']))>0){
            $res2=json_decode($data['newTags']);
            $newTagIds=[];
            foreach($res2 as $newtag){
                $tag=new Tag();
                $tag->name=$newtag;
                $tag->slug=$newtag;
                $tag->save();
                $newTagIds[]=$tag->id;
            }
        }
        $article->save();
        $article->categories()->attach($categories);
        $article->categories()->attach($newCatIds);
        $article->tags()->attach($newTagIds);
        return response()->json($res);
        // return redirect()->route('offers.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $article=Article::with(['categories','tags'])->find($id);
        $comments=$article->comments()->get();
        foreach ($comments as $comment) {
            // $lead=$comment->lead()->get()->toArray();
            // $comment->author = call_user_func_array("array_merge", $lead);
            $comment->author =  $comment->auth()->get()->first();
            $comment->replies =  $comment->replies()->get();
            foreach($comment->replies as $reply)
            $reply->author=$reply->auth()->get()->first();
        }
        $author=$article->user()->get()->first();
        // $res=array_merge($article);
        // $article[]=$comments;
        $article->setAttribute('comments',$comments);
        $article->setAttribute('author',$author);
        return response($article);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
