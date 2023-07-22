<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Currency extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "code"
    ];
    
    public function pairsFrom(): HasMany
    {
        return $this->hasMany(Pair::class, 'from_id');
    }

    public function pairsTo(): HasMany
    {
        return $this->hasMany(Pair::class, 'to_id');
    }
}
