<?php
header("Content-Type: application/json; charset=utf-8");
session_start();
require "conexion.php";

if (!isset($_SESSION["logueado"]) || $_SESSION["logueado"] !== true) {
    echo json_encode(["ok" => false, "error" => "Sesión no válida"]);
    exit();
}

if (!isset($_SESSION["id_admin"])) {
    echo json_encode(["ok" => false, "error" => "Sesión no válida"]);
    exit;
}

$id = $_POST['idEventos'] ?? null;

if (!$id) {
    echo json_encode(["ok" => false, "error" => "ID no recibido"]);
    exit;
}

$sql = "DELETE FROM eventos WHERE idEventos = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["ok" => true]);
} else {
    echo json_encode(["ok" => false, "error" => $stmt->error]);
}
