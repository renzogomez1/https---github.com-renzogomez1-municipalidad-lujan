<?php
header("Content-Type: application/json");
session_start();
if (!isset($_SESSION["logueado"]) || $_SESSION["logueado"] !== true) {
    echo json_encode(["ok" => false, "error" => "Sesión no válida"]);
    exit();
}
require "conexion.php";

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(["ok" => false, "error" => "ID no recibido"]);
    exit;
}

$sql = "SELECT * FROM eventos WHERE idEventos = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows === 1) {
    echo json_encode(["ok" => true, "evento" => $res->fetch_assoc()]);
} else {
    echo json_encode(["ok" => false, "error" => "No encontrado"]);
}
