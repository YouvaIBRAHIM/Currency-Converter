<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Converter extends Model
{
    use HasFactory;

    protected $fillable = [
        "pair_id",
        "count"
    ];

    public function pair() : BelongsTo
    {
        return $this->belongsTo(Pair::class, 'id');
    }
}
