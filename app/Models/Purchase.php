<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Purchase extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_number',
        'item_name',
        'unit_price',
        'quantity',
        'total_cost',
        'vendor_name',
        'vendor_id',
        'purchase_date',
    ];
}
