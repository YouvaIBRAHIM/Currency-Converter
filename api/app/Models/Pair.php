<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Pair extends Model
{
    use HasFactory;

    protected $fillable = ['from_id', 'to_id', 'currency_rate'];

    public function fromCurrency() : BelongsTo
    {
        return $this->belongsTo(Currency::class, 'from_id');
    }

    public function toCurrency() : BelongsTo
    {
        return $this->belongsTo(Currency::class, 'to_id');
    }

    public function count() : HasOne
    {
        return $this->hasOne(Converter::class, 'pair_id');
    }
    
}
