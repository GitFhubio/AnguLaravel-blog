<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'auth_id', 'article_id', 'body'
    ];
    public function auth(){
        return $this->belongsTo('App\User');
    }
    public function article(){
        return $this->belongsTo('App\Article');
    }
    public function replies(){
        return $this->hasMany('App\Reply');
    }
}
