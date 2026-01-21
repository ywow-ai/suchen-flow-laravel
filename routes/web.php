<?php

use App\Http\Controllers\{
    DashboardController,
    KasirController,
    MemberController,
    ProdukController,
    StokController,
    TransaksiController
};
use Illuminate\Support\Facades\Route;

Route::resource('dashboard', DashboardController::class);
Route::resource('kasir', KasirController::class);
Route::resource('member', MemberController::class);
Route::resource('produk', ProdukController::class);
Route::resource('stok', StokController::class);
Route::resource('transaksi', TransaksiController::class);