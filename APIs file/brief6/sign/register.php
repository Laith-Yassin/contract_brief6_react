<?php
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200); 
    exit();
}
$data = json_decode(file_get_contents('php://input'), true);

$name = $data['name'];
$email = $data['email'];
$password = $data['password'];
$phone = $data['phone'];

$servername = 'localhost';
$username = 'root';
$dbPassword = '';
$dbname = 'contract_breif';

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $dbPassword);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare a SELECT statement to check if the email or phone already exists
    $checkStmt = $conn->prepare("SELECT * FROM users WHERE email = :email OR phone = :phone");

    // Bind parameters
    $checkStmt->bindParam(':email', $email);
    $checkStmt->bindParam(':phone', $phone);

    // Execute the statement
    $checkStmt->execute();

    // Fetch the results
    $existingUser = $checkStmt->fetch(PDO::FETCH_ASSOC);

    if ($existingUser) {
        // Email or phone already exists
        $response = ['error' => 'Email or phone number already in use.'];
        header('Content-Type: application/json');
        http_response_code(400);
        echo json_encode($response);
    } else {
        // Prepare the SQL statement
        $stmt = $conn->prepare("INSERT INTO users (name, email, password, phone) VALUES (:name, :email, :password, :phone)");
        // Bind parameters
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':phone', $phone);

        // Execute the statement
        $stmt->execute();

        // Send a response back to the client
        $response = [
            'message' => 'Registration successful',
            'data' => [
                'name' => $name,
                'email' => $email,
                'phone' => $phone
            ]
        ];

        // Set the response header
        header('Content-Type: application/json');

        // Send the JSON-encoded response
        echo json_encode($response);
    }
} catch (PDOException $e) {
    $response = ['error' => 'Database error: ' . $e->getMessage()];
    header('Content-Type: application/json');
    http_response_code(500);
    echo json_encode($response);
}
