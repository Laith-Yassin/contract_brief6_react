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
        $sql = "SELECT * FROM users";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        if (isset($path[3]) && is_numeric($path[3])) {
            $sql .= " WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[3]);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
        } else {
            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        if (isset($user)) {
            echo json_encode($user);
        } else {
            echo json_encode($users);
        }
        break;

    case "POST":
        $user = json_decode(file_get_contents('php://input'));

        $name = $user->name;
        $email = $user->email;
        $password = $user->password;
        $phone = $user->phone;
        $role_id = $user->role_id;

        $sql = "INSERT INTO users (name, email, password, phone, role_id) VALUES (:name, :email, :password, :phone, :role_id)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':role_id', $role_id);

        if ($stmt->execute()) {
            $user_id = $conn->lastInsertId();
            $user = array(
                'id' => $user_id,
                'name' => $name,
                'email' => $email,
                'password' => $password,
                'phone' => $phone,
                'role_id' => $role_id
            );
            echo json_encode($user);
        } else {
            $response = array('error' => 'Failed to create user.');
            http_response_code(500);
            echo json_encode($response);
        }
        break;

    case "PUT":
        $user = json_decode(file_get_contents('php://input'));

        $id = $user->id;
        $name = $user->name;
        $email = $user->email;
        $password = $user->password;
        $phone = $user->phone;

        $sql = "UPDATE users SET name = :name, email = :email, password = :password, phone = :phone WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':phone', $phone);

        if ($stmt->execute()) {
            $user = array(
                'id' => $id,
                'name' => $name,
                'email' => $email,
                'password' => $password,
                'phone' => $phone
            );
            echo json_encode($user);
        } else {
            $response = array('error' => 'Failed to update user.');
            http_response_code(500);
            echo json_encode($response);
        }
        break;

    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        $id = $path[3];

        $sql = "DELETE FROM users WHERE id = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id);

        if ($stmt->execute()) {
            $response = array('status' => 1, 'message' => 'Record deleted successfully.');
            echo json_encode($response);
        } else {
            $response = array('status' => 0, 'message' => 'Failed to delete record.');
            http_response_code(500);
            echo json_encode($response);
        }
        break;
}
?>
