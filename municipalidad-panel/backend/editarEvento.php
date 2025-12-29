<?php
header("Content-Type: application/json; charset=utf-8");
session_start();
require "conexion.php";

if (!isset($_SESSION["logueado"]) || $_SESSION["logueado"] !== true) {
    echo json_encode(["ok" => false, "error" => "Sesión no válida"]);
    exit();
}

$id = $_POST['idEventos'];
$nombre = $_POST['nombreEvento'];
$descripcion = $_POST['descripcion'];
$fecha = $_POST['fechaRealizacion'];
$estado = $_POST['estado'];

$sql = "UPDATE eventos 
        SET nombreEvento = ?, descripcion = ?, fechaRealizacion = ?, estado = ?
        WHERE idEventos = ?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("sssii", $nombre, $descripcion, $fecha, $estado, $id);

if ($stmt->execute()) {
    echo json_encode(["ok" => true]);
} else {
    echo json_encode(["ok" => false, "error" => $stmt->error]);
}
