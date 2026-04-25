<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePropertyRequest extends FormRequest
{
    public function authorize(): bool
    {
        $property = $this->route('property');
        return $this->user()->id === $property->user_id;
    }

    public function rules(): array
    {
        return [
            'title'               => ['required', 'string', 'max:255'],
            'description'         => ['required', 'string', 'max:5000'],
            'location'            => ['required', 'string', 'max:255'],
            'address'             => ['required', 'string', 'max:500'],
            'city'                => ['required', 'string', 'max:100'],
            'region'              => ['required', 'string', 'max:100'],
            'rental_price'        => ['required', 'integer', 'min:1'],
            'capacity'            => ['required', 'integer', 'min:1', 'max:50'],
            'rooms'               => ['required', 'integer', 'min:1'],
            'bathrooms'           => ['required', 'integer', 'min:1'],
            'status'              => ['required', 'in:available,occupied,maintenance,unavailable'],
            'amenities'           => ['nullable', 'array'],
            'amenities.*'         => ['string', 'max:100'],
            'features'            => ['nullable', 'array'],
            'features.*'          => ['string', 'max:100'],
            'rules'               => ['nullable', 'array'],
            'rules.*'             => ['string', 'max:255'],
            'payment_methods'     => ['required', 'array', 'min:1'],
            'payment_methods.*'   => ['in:ussd,bank_transfer,mobile_money,cash'],
            'contact_phone'       => ['required', 'string', 'max:20'],
            'contact_email'       => ['nullable', 'email', 'max:255'],
            'availability_date'   => ['nullable', 'date'],
            'cancellation_policy' => ['nullable', 'string', 'max:2000'],
            'images'              => ['nullable', 'array', 'max:10'],
            'images.*'            => ['image', 'mimes:jpeg,png,webp', 'max:4096'],
            'delete_image_ids'    => ['nullable', 'array'],
            'delete_image_ids.*'  => ['integer'],
        ];
    }
}
