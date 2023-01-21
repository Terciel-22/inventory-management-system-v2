<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
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
            'item_number' => 'required|integer|unique:items,item_number',
            'item_name' => 'required|string',
            'description' => 'required|string',
            'stock' => 'numeric|min:0',
            'discount' => 'numeric|min:0',
            'unit_price' => 'numeric|min:1',
            'image_url' => 'image|max:2048',
            'status' => 'required|string',
        ];
    }
}
