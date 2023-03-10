<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Purchase;
use App\Http\Requests\StorePurchaseRequest;
use App\Http\Requests\UpdatePurchaseRequest;
use App\Http\Resources\PurchaseResource;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Http\Resources\ItemResource;

class PurchaseController extends Controller
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
        
        return PurchaseResource::collection(
            Purchase::query()->where('item_name','LIKE','%'.$keyword.'%')->orWhere('vendor_name','LIKE','%'.$keyword.'%')->orderBy('id','asc')->paginate($pageSize)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePurchaseRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePurchaseRequest $request)
    {
        $data = $request->validated();

        $item = Item::where("item_number", $data["item_number"])
            ->firstOrFail();
        $item->update([
            "stock" => $data["new_stock"],
        ]);

        $purchase = Purchase::create($data);
        return response(new PurchaseResource($purchase), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function show(Purchase $purchase)
    {
        $item = Item::where("item_number", $purchase["item_number"])
            ->firstOrFail();
        return [
            'item' => new ItemResource($item),
            'purchase' => new PurchaseResource($purchase),
        ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePurchaseRequest  $request
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePurchaseRequest $request, Purchase $purchase)
    {
        $data = $request->validated();
        
        $purchase->update($data);
        return new PurchaseResource($purchase);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Purchase  $purchase
     * @return \Illuminate\Http\Response
     */
    public function destroy(Purchase $purchase)
    {
        $purchase->delete();
        return response("", 204);
    }

    public function getTotalQuantity()
    {
        return [
            'total_quantity' => Purchase::sum('quantity'),
        ];
    }

    public function getTotalUnitPrice()
    {
        return [
            'total_unit_price' => Purchase::sum('unit_price'),
        ];
    }

    public function getTotalTotalCost()
    {
        return [
            'total_total_cost' => Purchase::sum('total_cost'),
        ];
    }
}
