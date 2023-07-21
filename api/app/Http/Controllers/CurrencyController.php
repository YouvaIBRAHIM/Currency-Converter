<?php

namespace App\Http\Controllers;

use App\Http\Requests\CurrencyRequest;
use App\Models\Currency;
use App\Http\Requests\StoreCurrencyRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currencies = Currency::all()->toArray();

        return response()->json($currencies, 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCurrencyRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Currency $currency)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Currency $currency)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Currency $currency)
    {

        try {

            $validator = Validator::make($request->all(),
            [
                'name' => 'required|string|min:3|max:191',
                'code' => 'required|string|min:3|max:3',
            ],
            [
                'name.reuired' => 'Le champ "Nom" est obligatoire.',
                'code.required' => 'Le champ "Code" est obligatoire.',
                'code.min' => 'Le champ "Code" doit contenir 3 caractères.',
                'code.max' => 'Le champ "Code" doit contenir 3 caractères.',
            ]);
    
            if ($validator->fails()) {
                $errors = array_values($validator->errors()->toArray())[0];
                return response()->json($errors, 405);
            }

            $name = $request->name;
            $code = $request->code;

            Currency::find($currency->id)->update([
                "name" => $name,
                "code" => $code
            ]);

            return response("Devise mise à jour", 200);
        } catch (\Throwable $th) {
            return response($th->getMessage(), $th->getCode());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Currency $currency)
    {
        //
    }
}
