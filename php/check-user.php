<?php
// Dummy AJAX endpoint for Task 2 (frontend-focused stage).
// Task 3 replaces this with a real MySQL lookup via prepared statements.

header('Content-Type: application/json');

$email = isset($_GET['email']) ? trim($_GET['email']) : '';

// Hardcoded "already taken" list just to demonstrate the AJAX round trip.
$takenEmails = [
    'test@example.com',
    'admin@apexplanet.in',
];

$taken = in_array(strtolower($email), $takenEmails, true);

echo json_encode([
    'email' => $email,
    'taken' => $taken,
]);
