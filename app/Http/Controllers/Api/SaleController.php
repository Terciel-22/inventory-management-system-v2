<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sale;
use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Http\Resources\SaleResource;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Http\Resources\ItemResource;

class SaleController extends Controller
{
    /** 
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $keyword = $request->keyword ?? "";
        $pageSize = $request->page_size ?? 10;
        
        return SaleResource::collection(
            Sale::query()->where('item_name','LIKE','%'.$keyword.'%')->orWhere('customer_name','LIKE','%'.$keyword.'%')->orderBy('id','asc')->paginate($pageSize)
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

    public function getTotalQuantity()
    {
        return [
            'total_quantity' => Sale::sum('quantity'),
        ];
    }

    public function getTotalUnitPrice()
    {
        return [
            'total_unit_price' => Sale::sum('unit_price'),
        ];
    }

    public function getTotalTotalCost()
    {
        return [
            'total_total_cost' => Sale::sum('total_cost'),
        ];
    }
}
