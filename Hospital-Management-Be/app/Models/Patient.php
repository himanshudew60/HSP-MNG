<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Patient extends Model
{
    protected $fillable = [
        'user_id',
        'age',
        'gender',
        'contact',
        'address',
        'medical_history',
        'profile_pic',
        'is_deleted',
    ];
}
