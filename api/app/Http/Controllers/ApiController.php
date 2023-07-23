<?php

namespace App\Http\Controllers;

use App\Models\Configuration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    public function ping()
    {
        try {
            return response()->json([
                "code" => 200,
                "text" => "OK",
                'message' => "Pong ! Le serveur est disponible"
            ]);
        } catch (\Throwable $th) {
            return response($th->getMessage(), $th->getCode());
        }
    }

    public function setApiConfig(Request $request) {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'enabled' => 'required',
                    'message' => 'required|string',
                ],
                [
                    'enabled.required' => 'Le champ "enabled" est obligatoire.',
                    'message.required' => 'Le champ "message" est obligatoire.',
                    'message.string' => 'Le champ "string" doit être une chaine de caractères.'
                ]
            );
            
            if ($validator->fails()) {
                $errors = array_values($validator->errors()->toArray())[0];
                return response()->json([
                    "message" => $errors
                ], 405);
            }

            $enable = $request->enabled;
            $message = $request->message;

            $newValue = json_encode([
                "enabled" => $enable,
                "maintenance_message" => $message,
            ]);

            Configuration::where("key", "api")
                            ->update([
                                "value" => $newValue
                            ]);

        
            return response("L'API a été mise à jour.");
        } catch (\Throwable $th) {
            return response($th->getMessage(), $th->getCode());
        }
    }

    public function getApiConfig(Request $request) {
        try {

            $apiConfig = Configuration::where("key", "api")
                            ->first();

            return response()->json(json_decode($apiConfig->value), 200);
        } catch (\Throwable $th) {
            return response($th->getMessage(), $th->getCode());
        }
    }

}
