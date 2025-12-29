<?php
$host = "localhost";
$usuario = "root";
$clave = "";
$bd = "turismo";

$conexion = new mysqli($host, $usuario, $clave, $bd);

if ($conexion->connect_errno) {
    die("Error de conexión: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");
?>
