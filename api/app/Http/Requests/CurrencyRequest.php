<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CurrencyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|min:3|max:191',
            'code' => 'required|string|min:3|max:3',
        ];
    }

    public function messages()
    {
        return [
            'name.reuired' => 'Le champ "Nom" est obligatoire.',
            'code.required' => 'Le champ "Code" est obligatoire.',
            'code.min' => 'Le champ "Code" doit contenir 3 caractères.',
            'code.max' => 'Le champ "Code" doit contenir 3 caractères.',
        ];
    }
}
