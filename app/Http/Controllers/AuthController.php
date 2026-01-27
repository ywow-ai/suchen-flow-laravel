<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller
{
    protected $guard;

    public function __construct(StatefulGuard $guard)
    {
        $this->guard = $guard;
    }

    public function create(Request $request)
    {
        return Inertia::render('login', [
            'status' => $request->session()->get('status'),
        ]);
    }

    public function store(Request $request)
    {
        try {
            $request->validate(['username' => 'required|string', 'password' => 'required|string']);
            $user = User::where('username', $request->input('username'))->first();

            if (! $user) {
                return back()
                    ->withInput($request->only('username'))
                    ->withErrors([
                        'username' => 'Username tidak ditemukan.',
                    ])
                    ->with('error', 'Login gagal.');
            }

            if (! Hash::check($request->input('password'), $user->password)) {
                return back()
                    ->withInput($request->only('username'))
                    ->withErrors([
                        'password' => 'Password salah.',
                    ])
                    ->with('error', 'Login gagal.');
            }

            Auth::login($user);

            return redirect('/');
        } catch (\Throwable $th) {
            return redirect()->back();
        }
    }

    public function destroy(Request $request)
    {
        $this->guard->logout();

        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return redirect('/login');
    }
}
