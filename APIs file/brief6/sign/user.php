<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "contract_breif";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$response = array();

if (isset($data['name']) && isset($data['email']) && isset($data['phone']) && isset($data['id'])) {
    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $id = $data['id'];

    $stmt = $conn->prepare("UPDATE users SET name=?, email=?, phone=? WHERE id=?");
    $stmt->bind_param("sssi", $name, $email, $phone, $id);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Record updated successfully";
    } else {
        $response['success'] = false;
        $response['message'] = "Error updating record: " . $conn->error;
    }
} else {
    $response['success'] = false;
    $response['message'] = "Missing data in request";
}

$conn->close();

header("Content-Type: application/json");
echo json_encode($response);
exit();
?>
