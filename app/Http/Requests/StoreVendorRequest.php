<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVendorRequest extends FormRequest
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
            'full_name' => 'string|required',
            'mobile' => 'string|required',
            'telephone' => 'string|required',
            'email' => 'string|required',
            'address' => 'string|required',
            'region' => 'string|required',
            'province' => 'nullable',
            'city_municipality' => 'string|required',
            'barangay' => 'string|required',
            'status' => 'string|required',
        ];
    }
}
