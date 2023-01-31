<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PurchaseResource extends JsonResource
{
    public static $wrap = false;
    /** 
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'item_number' => $this->item_number,
            'item_name' => $this->item_name,
            'unit_price' => $this->unit_price,
            'total_cost' => $this->total_cost,
            'quantity' => $this->quantity,
            'vendor_name' => $this->vendor_name,
            'vendor_id' => $this->vendor_id,
            'purchase_date' => $this->purchase_date,
        ];
    }
}
