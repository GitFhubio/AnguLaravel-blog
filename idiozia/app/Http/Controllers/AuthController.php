<?php

namespace App\Http\Controllers;

use App\Article;
use App\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class AuthController extends Controller
{
    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ],
        [ 'email.required' => 'Please Enter Your Email',
        'password.required' => 'Please Enter Your Password',

        ]);
        // switch($request->email){
        //    case 'admin@outlook.it':
        //     $superadmin=true;
        //     break;
        //    default:
        //    $superadmin=false;
        // }

        // $currentId=User::where('email',$request->email)->first()->id; // o Auth id che già ho a sto punto
        if ($validator->fails()) {
            $message = ['errors' => $validator->errors()];
                    return  Response::json($message, 202);
        } else {
            $credentials = $request->only('email', 'password');
            try {
                $token = JWTAuth::attempt($credentials);
                if ($token) {
                    $message = ['success' => $token];
                    return Response::json(["token" => $token, "id"=>Auth::id(),"roles"=>User::find(Auth::id())->getRoleNames()], 200);
                } else {
                    $message = ['errors' => "Invalid credentials"];
                    return  Response::json($message, 202);
                }
            } catch (JWTException $e) {
                return response()->json(['error' => 'could_not_create_token'], 500);
            }
        }
    }
    public function postRegister(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users,email',
            'name' => 'required|min:2',
            'password' =>'required|min:8'
        ]);
        if ($validator->fails()) {
            $message = ['errors' => $validator->errors()];
            $response= Response::json($message, 202);
        } else {
            $user = new User(array(
                'email' => trim($request->email),
                'name' => trim($request->name),
                'password' => bcrypt($request->password),
            ));
            $user->save();
            $response = true;
        }
        return $response;
    }



}
