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

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/kasir', [KasirController::class, 'index'])->name('kasir');
Route::get('/member', [MemberController::class, 'index'])->name('member');
Route::get('/produk', [ProdukController::class, 'index'])->name('produk');
Route::get('/stok', [StokController::class, 'index'])->name('stok');
Route::get('/transaksi', [TransaksiController::class, 'index'])->name('transaksi');
