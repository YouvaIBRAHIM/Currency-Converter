<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApiController extends Controller
{
    public function ping()
    {
        return response()->json(['message' => 'Pong! The server is online.']);
    }
}
