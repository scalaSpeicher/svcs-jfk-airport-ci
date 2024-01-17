<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class DomainRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(
        private $caption = 'URL'
    ) {
        $this->caption = $caption;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return preg_match("/^https?:\/\/(.*)/", $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return @implode('<br />', [
            "{$this->caption} - Invalid",
            "- Can start with 'http://' or 'https://'",
            'e.g. https://jfk-templates.services.scala.com/',
        ]);
    }
}
