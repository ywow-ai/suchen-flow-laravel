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
use Inertia\Inertia;

Route::get('login', [AuthController::class, 'create'])->name('login');
Route::post('login', [AuthController::class, 'store'])->name('login.store');

Route::middleware(['auth'])->group(function () {
    Route::get('/', fn() => Inertia::render('dashboard/index'))->name('dashboard');
    Route::resource('kasir', KasirController::class);
    Route::resource('member', MemberController::class);
    Route::resource('produk', ProdukController::class);
    Route::resource('stok', StokController::class);
    Route::resource('transaksi', TransaksiController::class);

    Route::post('logout', [AuthController::class, 'destroy'])->name('logout');
});