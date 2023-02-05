<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;

class ItemController extends Controller
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
        return ItemResource::collection(
            Item::query()->where('item_name','LIKE','%'.$keyword.'%')->orderBy('id','asc')->paginate($pageSize)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreItemRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreItemRequest $request)
    {
        $data = $request->validated();
        
        if($request->hasFile("image_url"))
        {
            $image = $request->image_url;
            $imageName = time().".".$image->getClientOriginalExtension();
            $path = public_path("images");
            $image->move($path,$imageName);
            $data["image_url"] = "http://localhost:8000/images/".$imageName;
        }
        $item = Item::create($data);
        return response(new ItemResource($item), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        return new ItemResource($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateItemRequest  $request
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        $data = $request->validated();
        
        if($request->hasFile("image_url"))
        {
            $image = $request->image_url;
            $imageName = time().".".$image->getClientOriginalExtension();
            $path = public_path("images");
            $image->move($path,$imageName);
            $data["image_url"] = "http://localhost:8000/images/".$imageName;
        }

        $item->update($data);
        return new ItemResource($item);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        $item->delete();
        return response("", 204);
    }

    public function getItemByItemNumber(Request $request)
    {
        $input = $request->validate([
            'item_number' => 'required|numeric' // validate
        ]);
        $item = Item::where("item_number", $input)
            ->firstOrFail();

        return new ItemResource($item);
    }

    public function getTotalUnitPrice()
    {
        return [
            'total_unit_price' => Item::sum('unit_price'),
        ];
    }
} 