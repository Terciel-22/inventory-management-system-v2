<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Database\Factories\ItemFactory;

class Item extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'item_number',
        'item_name',
        'discount',
        'stock',
        'unit_price',
        'image_url',
        'status',
        'description'
    ];

    protected static function newFactory()
    {
        return ItemFactory::new();
    }
}
