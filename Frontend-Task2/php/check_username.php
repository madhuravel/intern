<?php
header('Content-Type: application/json');

// Get username from query string
$username = isset($_GET['username']) ? $_GET['username'] : '';

// Dummy list of taken usernames
$takenUsernames = ['admin', 'user', 'test', 'johndoe', 'root'];

$response = array();

if (empty(trim($username))) {
    $response['status'] = 'error';
    $response['message'] = 'Username is required';
} else if (in_array(strtolower($username), $takenUsernames)) {
    $response['status'] = 'exists';
} else {
    $response['status'] = 'available';
}

echo json_encode($response);
?>
