<?php
header("Content-Type: application/json; charset=utf-8");
session_start();
if (!isset($_SESSION["logueado"]) || $_SESSION["logueado"] !== true) {
    echo json_encode(["ok" => false, "error" => "Sesión no válida"]);
    exit();
}
require "conexion.php";

// OPCIONAL: validar sesión
if (!isset($_SESSION["id_admin"])) {
    echo json_encode(["ok" => false, "error" => "Sesión no válida"]);
    exit;
}

$sql = "SELECT idEventos, nombreEvento, descripcion, fechaRealizacion, estado 
        FROM eventos 
        ORDER BY fechaRealizacion DESC";

$result = $conexion->query($sql);

$eventos = [];

while ($row = $result->fetch_assoc()) {
    $eventos[] = $row;
}

echo json_encode([
    "ok" => true,
    "eventos" => $eventos
]);
