<?php

use App\Http\Controllers\{
    AuthController,
    DashboardController,
    KasirController,
    MemberController,
    ProdukController,
    StokController,
    TransaksiController
};
use Illuminate\Support\Facades\Route;

Route::get('login', [AuthController::class, 'create'])->name('login');
Route::post('login', [AuthController::class, 'store'])->name('login.store');
Route::post('logout', [AuthController::class, 'destroy'])->name('logout');
Route::resource('dashboard', DashboardController::class)->only(['index']);
Route::resource('kasir', KasirController::class);
Route::resource('member', MemberController::class);
Route::resource('produk', ProdukController::class);
Route::resource('stok', StokController::class);
Route::resource('transaksi', TransaksiController::class);