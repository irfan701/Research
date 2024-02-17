<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\ResetLinkEmailRequest;
use App\Mail\ResetPasswordLink;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Validation\Rule;

class PasswordResetController extends Controller
{

    function __construct()
    {
        $this->middleware('guest');
    }

    //php artisan make:mail ResetPasswordLink --markdown=emails.reset_password_link
    //php artisan make:request ResetLinkEmailRequest
    function sendResetLinkEmail(ResetLinkEmailRequest $request)
    {
        $url = URL::temporarySignedRoute('password.reset', now()->addMinute(30), ['email' => $request->email]);

        //$url=str_replace(env('APP_URL'),env('FRONTEND_URL'),$url);
        //dd($url);
        Mail::to($request->email)->send(new ResetPasswordLink($url));
        return response()->json([
            'message' => "reset password link sent on your email"
        ]);
    }

    function resetPassword(Request $request)
    {
        $request->validate(['email' => ['required', 'email', Rule::exists(User::class, 'email')], 'password' => 'required|string|min:8|confirmed' ]);
        //password_confirmation
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(["message" => "Password reset successfully"], 200);
        }
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(['message' => "Password reset successfully"], 200);
    }
}
