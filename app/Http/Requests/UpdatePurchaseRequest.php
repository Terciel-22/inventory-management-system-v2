<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePurchaseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'item_number' => 'required|integer',
            'item_name' => 'required|string',
            'unit_price' => 'required|numeric|min:1',
            'quantity' => 'required|numeric|min:0|max:'.$this->current_stock,
            'total_cost' => 'required|numeric',
            'vendor_name' => 'required|string',
            'vendor_id' => 'required|integer',
            'purchase_date' => 'required|date',
        ];
    }
}
