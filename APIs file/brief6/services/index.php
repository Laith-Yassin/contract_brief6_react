<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM services";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $service = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($service) {
                echo json_encode($service);
            } else {
                // Return an error response if the service with the given ID is not found
                http_response_code(404);
                echo json_encode(array('message' => 'Service not found.'));
            }
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $services = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($services);
        }
        break;
}
?>
