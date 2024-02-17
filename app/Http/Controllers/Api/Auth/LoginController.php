<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    function __construct()
    {
        $this->middleware('guest');
    }

    public function __invoke(LoginRequest $request)
    {

        $user = User::where('email', $request->email)->first();
        if (!$user || Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => "The provided credentials are incorrect"
            ], 401);
        }
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'type' => 'Bearer'
        ], 200);
    }

    function register(RegisterRequest $request)
    {
        $user= User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()->json([
            'access_token' => $token,
            'type' => 'Bearer'
        ], 201);
    }

}
