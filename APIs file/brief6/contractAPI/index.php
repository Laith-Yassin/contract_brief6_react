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
    case "POST":
        $contract = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO contracts(id, service_id, user_id, start_date, expire_date, total_cost, description)
         VALUES (null, :serviceid, :userid, :startdate, :expiredate, :price, :description)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(":serviceid", $contract->service_id);
        $stmt->bindParam(":userid", $contract->user_id);
        $stmt->bindParam(":startdate", $contract->start_date);
        $stmt->bindParam(":expiredate", $contract->expire_date);
        $stmt->bindParam(":price", $contract->total_cost);
        $stmt->bindParam(":description", $contract->description);
        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Record created successfully'];
        } else {
            $response = ['status' => 0, 'message' => 'Faild to create record'];
        }
        echo json_encode($response);
        break;
}
?>
