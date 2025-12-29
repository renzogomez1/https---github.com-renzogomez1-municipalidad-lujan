<?php
header("Content-Type: application/json; charset=utf-8");
session_start();
require "conexion.php";

if (!isset($_SESSION["logueado"]) || $_SESSION["logueado"] !== true) {
    echo json_encode(["ok" => false, "error" => "Sesión no válida"]);
    exit();
}

$nombre = $_POST['nombreEvento'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$fecha = $_POST['fechaRealizacion'] ?? '';
$estadoTexto = $_POST['estado'] ?? '';
$idAdmin = $_SESSION['id_admin'] ?? null;

if (!$idAdmin) {
    echo json_encode(["ok" => false, "error" => "Sesión no válida"]);
    exit;
}

if ($nombre === '' || $fecha === '' || $descripcion === '') {
    echo json_encode(["ok" => false, "error" => "Faltan datos obligatorios"]);
    exit;
}

$estado = ($estadoTexto === "Activo") ? 1 : 0;

$sql = "INSERT INTO eventos 
        (nombreEvento, descripcion, fechaRealizacion, idAdministrador, estado)
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("sssii", $nombre, $descripcion, $fecha, $estado, $idAdmin);

if ($stmt->execute()) {
    echo json_encode(["ok" => true]);
} else {
    echo json_encode(["ok" => false, "error" => $stmt->error]);
}
