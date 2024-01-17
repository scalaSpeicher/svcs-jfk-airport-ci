<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class EndcapWayfinder extends FormRequest
{
    public $row;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'row' => 'required',
        ];
    }

    public function failedValidation(Validator $validator): void
    {
        throw new HttpResponseException(response()([
            'success' => false,
            'message' => 'Validation errors',
            'data' => $validator->errors(),
        ]));
    }

    /**
     * Configure the validator instance.
     */
    public function withValidator(Validator $validator): void
    {
        $row = $validator->getData()['row'];
        $validator->after(
            function ($validator) use ($row): void {

                $throwError = false;
                // Row -- At most 2 rows numbers can be passed separated by pipe '|' or just one
                if (!is_numeric($row)) {
                    $rows = explode('|', $row);
                    // Removing empty array elements if there are any
                    $rows = array_values(array_filter($rows));
                    if (count($rows) !== 2) {
                        $throwError = true;
                    }
                    // Making sure all elements of array are numeric
                    elseif (!is_numeric(implode('', $rows))) {
                        $throwError = true;
                    }
                }

                $this->row = $row;

                if ($throwError) {
                    $validator->errors()->add(
                        'row',
                        'The row field must be an integer, if two rows are to be queried then provide in format x|y'
                    );
                }
            }
        );
    }

    /**
     * Handle a passed validation attempt.
     */
    protected function passedValidation(): void
    {
        // If two rows were queried, put them in an integer array
        $this->row = trim($this->row, '|');
        if (str_contains($this->row, '|')) {
            $this->replace([
                'row' => array_map('intval', explode('|', $this->row)),
            ]);
        }
        // If only one row was passed, return an integer array with one element
        else {
            $this->replace([
                'row' => [(int) $this->row],
            ]);
        }
    }
}
