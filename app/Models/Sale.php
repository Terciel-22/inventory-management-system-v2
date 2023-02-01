<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_number',
        'customer_id',
        'customer_name',
        'item_name',
        'sale_date',
        'discount',
        'quantity',
        'unit_price',
        'total_cost'
    ];
} 
