<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VendorResource extends JsonResource
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
            'full_name' => $this->full_name,
            'mobile' => $this->mobile,
            'telephone' => $this->telephone,
            'email' => $this->email,
            'address' => $this->address,
            'region' => $this->region,
            'province' => $this->province,
            'city_municipality' => $this->city_municipality,
            'barangay' => $this->barangay,
            'status' => $this->status,
        ];
    }
}
