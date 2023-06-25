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
        $sql = "SELECT `id`, `service_id`, `user_id`, `start_date`, `expire_date`, `total_cost`, `status`,  `employee_id` FROM `contracts` WHERE 1"; 
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $contracts = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare(("SELECT 
            services.service_name, 
            employees.emplyee_name, 
            contracts.total_cost, 
            contracts.start_date, 
            contracts.expire_date,
            contracts.status
            FROM 
            contracts
            INNER JOIN 
            employees ON contracts.employee_id = employees.id
            INNER JOIN 
            services ON contracts.service_id = services.id;"));
            $stmt->execute();
            $contracts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode($contracts);
        break;

    case "POST":
        $user_id = $_SESSION['user_id'];

        $contract = json_decode(file_get_contents('php://input'));
        $sql = "INSERT INTO contracts (service_id, user_id, start_date, expire_date, total_cost, status,  employee_id) VALUES (:service_id, :user_id, :start_date, :expire_date, :total_cost, :status,  :employee_id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':service_id', $contract->service_id);
        $stmt->bindParam(':user_id', $user_id); // Use the retrieved user_id
        $stmt->bindParam(':start_date', $contract->start_date);
        $stmt->bindParam(':expire_date', $contract->expire_date);
        $stmt->bindParam(':total_cost', $contract->total_cost);
        $stmt->bindParam(':status', $contract->status);
        $stmt->bindParam(':employee_id', $contract->employee_id);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Contract created successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to create contract.'];
        }
        echo json_encode($response);
        break;

    case "PUT":
        $contract = json_decode(file_get_contents('php://input'));
        $sql = "UPDATE contracts SET service_id = :service_id, user_id = :user_id, start_date = :start_date, expire_date = :expire_date, total_cost = :total_cost, status = :status, attachment = :attachment, employee_id = :employee_id WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':service_id', $contract->service_id);
        $stmt->bindParam(':user_id', $contract->user_id);
        $stmt->bindParam(':start_date', $contract->start_date);
        $stmt->bindParam(':expire_date', $contract->expire_date);
        $stmt->bindParam(':total_cost', $contract->total_cost);
        $stmt->bindParam(':status', $contract->status);
        $stmt->bindParam(':attachment', $contract->attachment);
        $stmt->bindParam(':employee_id', $contract->employee_id);
        $stmt->bindParam(':id', $contract->id);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Contract updated successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to update contract.'];
        }
        echo json_encode($response);
        break;

    case "DELETE":
        $sql = "DELETE FROM contracts WHERE id = :id";
        $path = explode('/', $_SERVER['REQUEST_URI']);

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $path[3]);

        if ($stmt->execute()) {
            $response = ['status' => 1, 'message' => 'Contract deleted successfully.'];
        } else {
            $response = ['status' => 0, 'message' => 'Failed to delete contract.'];
        }
        echo json_encode($response);
        break;
}
?>
