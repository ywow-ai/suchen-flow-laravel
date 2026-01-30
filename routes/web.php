<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\KasirController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\StokController;
use App\Http\Controllers\TransaksiController;
use Illuminate\Support\Facades\Route;

Route::middleware(['guest'])->group(function () {
    Route::get('login', [AuthController::class, 'create'])->name('login');
    Route::post('login', [AuthController::class, 'store'])->name('login.store');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('kasir', KasirController::class);
    Route::resource('member', MemberController::class);
    Route::resource('produk', ProdukController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('stok', StokController::class);
    Route::resource('transaksi', TransaksiController::class);

    Route::post('logout', [AuthController::class, 'destroy'])->name('logout');
});
