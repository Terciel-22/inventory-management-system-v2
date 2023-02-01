<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSaleRequest extends FormRequest
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
            'item_number' => 'required|numeric',
            'customer_id' => 'required|numeric',
            'customer_name' => 'required|string',
            'item_name' => 'required|string',
            'sale_date' => 'required|date',
            'discount' => 'required|numeric|min:0|max:100',
            'quantity' => 'required|numeric|min:1|max:'.$this->current_stock,
            'unit_price' => 'required|numeric|min:1',
            'total_cost' => 'required|numeric|min:1',
            'new_stock' => 'required|numeric',
        ];
    }
}
