<?php

namespace App\Http\Controllers;

use App\Models\Converter;
use App\Models\Pair;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PairController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $pairs = Pair::with(["fromCurrency", "toCurrency", "count"])->orderBy('created_at', 'desc')->paginate(5);

            return response()->json($pairs, 200);
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
                    'from_id' => 'required',
                    'to_id' => 'required',
                    'currency_rate' => 'required',
                ],
                [
                    'from_id.required' => 'Le champ "Source" est obligatoire.',
                    'to_id.required' => 'Le champ "Destinataire" est obligatoire.',
                    'currency_rate.required' => 'Le champ "Taux de change" est obligatoire.',
                ]
            );
            
            if ($validator->fails()) {
                $errors = array_values($validator->errors()->toArray())[0];
                return response()->json($errors, 405);
            }

            $fromId = $request->from_id;
            $toId = $request->to_id;
            $currencyRate = $request->currency_rate;

            if ($fromId === $toId) {
                return response()->json(["Une paire doit avoir une source et un destinataire différent."], 405);
            }

            // Recherchez d'abord la paire en fonction du form_id et du to_id
            $existingPair = Pair::where('from_id', $fromId)
                                        ->where('to_id', strtoupper($toId))
                                        ->first();

            if ($existingPair) {
                // Une paire avec le même form_id et le même to_id existe déjà
                return response()->json(["La paire existe déjà."], 405);
            }

            $newPair = Pair::create([
                "from_id" => $fromId,
                "to_id" => $toId,
                "currency_rate" => $currencyRate,
            ]);

            Converter::create([
                "pair_id" => $newPair->id,
                "count" => 0
            ]);

            $newPair = Pair::with(["fromCurrency", "toCurrency", "count"])->where('id', $newPair->id)->first();

            return response()->json($newPair, 200);
        } catch (\Throwable $th) {
            return response($th->getMessage(), $th->getCode());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pair $pair)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pair $pair)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pair $pair)
    {
        try {

            $validator = Validator::make(
                $request->all(),
                [
                    'from_id' => 'required',
                    'to_id' => 'required',
                    'currency_rate' => 'required',
                ],
                [
                    'from_id.required' => 'Le champ "Source" est obligatoire.',
                    'to_id.required' => 'Le champ "Destinataire" est obligatoire.',
                    'currency_rate.required' => 'Le champ "Taux de change" est obligatoire.',
                ]
            );
            
            if ($validator->fails()) {
                $errors = array_values($validator->errors()->toArray())[0];
                return response()->json($errors, 405);
            }

            $fromId = $request->from_id;
            $toId = $request->to_id;
            $currencyRate = $request->currency_rate;

            if ($fromId === $toId) {
                return response()->json(["Une paire doit avoir une source et un destinataire différent."], 405);
            }

            // Recherchez d'abord la paire en fonction du form_id et du to_id
            $existingPair = Pair::where('from_id', $fromId)
                                        ->where('to_id', strtoupper($toId))
                                        ->first();

            if ($existingPair && $existingPair->id !== $pair->id) {
                // Une paire avec le même form_id et le même to_id existe déjà pour une autre paire
                return response()->json(["La paire existe déjà."], 405);
            }

            // Si la source ou/et le destinataire d'une paire sont modifiés, Le décompte des appels API sera remis à 0
            $areIdsChange = $pair->from_id !== $fromId || $pair->to_id !== $toId;
            if ($areIdsChange) {
                $pair->count()->update([
                    "count" => 0
                ]);
            }
            
            Pair::find($pair->id)->update([
                "from_id" => $fromId,
                "to_id" => $toId,
                "currency_rate" => $currencyRate,
            ]);

            return response($areIdsChange ? "La paire et le décompte de l'appel API ont été mis à jour" : "La paire a été mise à jour", 200);
        } catch (\Throwable $th) {
            return response($th->getMessage(), $th->getCode());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pair $pair)
    {
        try {
            $pair->delete();
            return response("Paire supprimée", 200);
        } catch (\Throwable $th) {
            return response($th->getMessage(), $th->getCode());
        }
    }
}
