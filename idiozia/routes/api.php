<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'CORS'], function () {
    Route::resource('users', 'UserController', ['except' => ['index','create','show']]);
    Route::resource('replies', 'ReplyController', ['except' => ['index','create','show']]);
    Route::resource('articles', 'ArticleController', ['e xcept' => ['index','create','show']]);
   Route::resource('comments', 'CommentController', ['except' => ['index','create','show']]);
    Route::post('/login', 'AuthController@login');
    Route::post('/register', 'AuthController@postRegister');
});
Route::resource('comments', 'CommentController', ['only' => ['index','create','show']]);
Route::resource('replies', 'ReplyController', ['only' => ['index','create','show']]);
Route::resource('users', 'UserController', ['only' => ['index','create','show']]);
Route::resource('articles', 'ArticleController', ['only' => ['index','create','show']]);
Route::get('categories', 'Api\ApiController@categories');
Route::get('articles-by-cat/{param}', 'Api\ApiController@filteredByCat');
Route::get('articles-by-tag/{param}', 'Api\ApiController@filteredByTag');
Route::get('tags', 'Api\ApiController@tags');
Route::post('articles/{id}/favoritesUp', 'ArticleController@favoritesUp');
Route::post('articles/{id}/favoritesDown', 'ArticleController@favoritesDown');
