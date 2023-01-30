<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Database\Factories\CustomerFactory;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'mobile',
        'telephone',
        'email',
        'address',
        'region',
        'province',
        'city_municipality',
        'barangay',
        'status'
    ];

    protected static function newFactory()
    {
        return CustomerFactory::new();
    }
}
