<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class ProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): InertiaResponse
    {
        $query = DB::table('tbx_products');

        if (! ($request->has('include_deleted') && (bool) $request->input('include_deleted'))) {
            $query->whereNull('deleted_at');
        }

        if ($request->has('category') && $request->input('category') !== '*') {
            $query->where('category', $request->input('category'));
        }

        if ($request->has('search') && $request->input('search') !== '') {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $perPage = $request->get('per_page', 10);
        $paginated = $query->paginate($perPage);

        return Inertia::render('produk/index', [
            'data' => $paginated->items(),
            'current_page' => $paginated->currentPage(),
            'per_page' => $paginated->perPage(),
            'total' => $paginated->total(),
            'last_page' => $paginated->lastPage(),
            'category' => $request->get('category', '*'),
            'search' => $request->get('search', ''),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => ['required', 'string', 'max:100'],
                'category' => ['required', 'string', 'in:Makanan,Minuman'],
                'description' => ['nullable', 'string'],
                'image' => ['required', 'image', 'max:2048'],
            ]);

            toastSuccess('Berhasil');

            return back();
        } catch (\Throwable $th) {
            toastError($th->getMessage());

            return back()->setStatusCode(400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
