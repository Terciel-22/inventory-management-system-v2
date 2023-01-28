<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Database\Factories\VendorFactory;

class Vendor extends Model
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
        return VendorFactory::new();
    }
}
