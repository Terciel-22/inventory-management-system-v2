<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SaleResource extends JsonResource
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
            'customer_id' => $this->customer_id,
            'customer_name' => $this->customer_name,
            'item_name' => $this->item_name,
            'sale_date' => $this->sale_date,
            'discount' => $this->discount,
            'quantity' => $this->quantity,
            'unit_price' => $this->unit_price,
            'total_cost' => $this->total_cost,
        ];
    }
}
