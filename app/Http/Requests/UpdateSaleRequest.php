<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSaleRequest extends FormRequest
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
            'customer_id' => 'required|numeric',
            'customer_name' => 'required|string',
            'sale_date' => 'required|date',
            'discount' => 'required|numeric|min:0|max:100',
            'unit_price' => 'required|numeric|min:1',
            'total_cost' => 'required|numeric|min:1'
        ];
    }
}
