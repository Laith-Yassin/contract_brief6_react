<?php

session_start();

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_name = 'contract_breif';
$db_username = 'root';
$db_password = '';
$db_host = 'localhost';

$pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8", $db_username, $db_password);

$data = json_decode(file_get_contents('php://input'), true);

$email = $data['email'];
$password = $data['password'];

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = :email");
$stmt->bindParam(':email', $email);

$stmt->execute(['email' => $email]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user !== false && $password== $user['password']) {
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role_id'] = $user['role_id'];
    $_SESSION['name_user'] = $user['name']; // Set the role_id in the session

    $token = 'your_generated_token_here';

    $response = [
        'message' => 'Login successful',
        'token' => $token,
        'user_id' => $user['id'],
        'role_id' => $user['role_id'],
        'user_name' => $user['name']  // Assuming 'name' is the column name in your database

    ];
} else {
    $response = [
        'message' => 'Login failed',
        'user' => $user
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
?>
