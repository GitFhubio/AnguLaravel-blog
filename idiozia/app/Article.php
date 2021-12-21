<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    protected $fillable = [
        'title', 'content', 'user_id','img','likes'
    ];
    public function tags(){
        return $this->belongsToMany('App\Tag');
    }
    public function categories(){
        return $this->belongsToMany('App\Category');
    }
    public function user(){
        return $this->belongsTo('App\User');
    }
    public function comments(){
        return $this->hasMany('App\Comment');
    }
}
