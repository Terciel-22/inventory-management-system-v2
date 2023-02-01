<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Http\Resources\SaleResource;

use App\Models\Item;
use App\Http\Resources\ItemResource;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SaleResource::collection(
            Sale::query()->orderBy('id','asc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSaleRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSaleRequest $request)
    {
        $data = $request->validated();

        $item = Item::where("item_number", $data["item_number"])
            ->firstOrFail();
        $item->update([
            "stock" => $data["new_stock"],
        ]);

        $sale = Sale::create($data);
        return response(new SaleResource($sale), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function show(Sale $sale)
    {
        $item = Item::where("item_number", $sale["item_number"])
            ->firstOrFail();
        return [
            'item' => new ItemResource($item),
            'sale' => new SaleResource($sale),
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSaleRequest  $request
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSaleRequest $request, Sale $sale)
    {
        $data = $request->validated();
        
        $sale->update($data);
        return new SaleResource($sale);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sale $sale)
    {
        $sale->delete();
        return response("", 204);
    }
}
