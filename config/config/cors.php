<?php

return [
    'paths' => ['*'], // <-- Include the payment route
    'allowed_methods' => ['*'], // Allow all HTTP methods (POST, GET, etc.)
    'allowed_origins' => ['*'], // Allow all origins (change this for security)
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Allow all headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
