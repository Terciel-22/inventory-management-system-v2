<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCustomerRequest extends FormRequest
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
            'full_name' => 'required|string|',
            'mobile' => 'required|numeric|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
            'telephone' => 'nullable|string|regex:/^([0-9\s\-\+\(\)]*)$/|max:11',
            'email' => 'required|email|unique:customers,email,'.$this->customer->id,
            'address' => 'required|string|',
            'region' => 'required|string|',
            'province' => 'nullable',
            'city_municipality' => 'required|string|',
            'barangay' => 'required|string|',
            'status' => 'required|string|',
        ];
    }
}
