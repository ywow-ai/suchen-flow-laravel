<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class StokController extends Controller
{
    public function index()
    {
        return Inertia::render('stok/index');
    }
}
