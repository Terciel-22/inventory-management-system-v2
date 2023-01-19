<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'=> $this->id,
            'item_number'=> $this->item_number,
            'item_name'=> $this->item_name,
            'discount'=> $this->discount,
            'stock'=> $this->stock,
            'unit_price'=> $this->unit_price,
            'image_url'=> $this->image_url,
            'status'=> $this->status,
            'description'=> $this->description,
            'created_at'=> $this->created_at->format('M-d-y')
        ];
    }
}
