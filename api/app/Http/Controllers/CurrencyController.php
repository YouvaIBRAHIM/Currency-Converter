<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Http\Requests\StoreCurrencyRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CurrencyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $currencies = Currency::orderBy('created_at', 'desc')->paginate(5);

            return response()->json($currencies, 200);
        } catch (\Throwable $th) {
            return response()->json(["Oups ! Nous n'avons pas pu récupérer les données."], 500);
        }
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
    public function store(Request $request)
    {

        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required|string|max:191',
                    'code' => 'required|string|min:3|max:3',
                ],
                [
                    'name.required' => 'Le champ "Nom" est obligatoire.',
                    'code.required' => 'Le champ "Code" est obligatoire.',
                    'code.min' => 'Le champ "Code" doit contenir 3 caractères.',
                    'code.max' => 'Le champ "Code" doit contenir 3 caractères.',
                ]
            );

            if ($validator->fails()) {
                $errors = array_values($validator->errors()->toArray())[0];
                return response()->json($errors, 405);
            }


            // Recherchez d'abord la devise en fonction du nom et du code
            $existingCurrency = Currency::where('name', $request->name)
                                        ->orWhere('code', strtoupper($request->code))
                                        ->first();

            if ($existingCurrency) {
                // Une devise avec le même nom ou le même code existe déjà
                return response()->json(["La devise existe déjà."], 405);
            }

            // Aucune devise correspondante n'a été trouvée, créez la nouvelle devise
            $newCurrency = Currency::create([
                'name' => $request->name,
                'code' => strtoupper($request->code),
            ]);

            return response()->json($newCurrency, 200);
        } catch (\Throwable $th) {
            return response($th->getMessage(), $th->getCode());
        }
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

            $validator = Validator::make(
                $request->all(),
                [
                    'name' => 'required|string|max:191',
                    'code' => 'required|string|min:3|max:3',
                ],
                [
                    'name.reuired' => 'Le champ "Nom" est obligatoire.',
                    'code.required' => 'Le champ "Code" est obligatoire.',
                    'code.min' => 'Le champ "Code" doit contenir 3 caractères.',
                    'code.max' => 'Le champ "Code" doit contenir 3 caractères.',
                ]
            );

            if ($validator->fails()) {
                $errors = array_values($validator->errors()->toArray())[0];
                return response()->json($errors, 405);
            }

            $name = $request->name;
            $code = $request->code;

            // Recherchez d'abord la devise en fonction du nom et du code
            $existingCurrency = Currency::where('name', $request->name)
                                        ->orWhere('code', strtoupper($request->code))
                                        ->first();

            if ($existingCurrency && $existingCurrency->id !== $currency->id) {
                // Une devise avec le même nom ou le même code existe déjà pour une autre devise
                return response()->json(["La devise existe déjà."], 405);
            }

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
