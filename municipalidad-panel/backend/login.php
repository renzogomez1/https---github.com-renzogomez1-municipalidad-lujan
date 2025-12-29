<?php
session_start();
include "conexion.php";

$correo = $_POST['correo'];
$pass = $_POST['password'];

$sql = $conexion->prepare("SELECT * FROM administradores WHERE `correo electronico` = ? LIMIT 1");
$sql->bind_param("s", $correo);
$sql->execute();
$result = $sql->get_result();

if ($result->num_rows === 1) {

    $data = $result->fetch_assoc();

    if ($pass === $data["password"]) {

        $_SESSION["logueado"] = true;
        $_SESSION["id_admin"] = $data["idAdministradores"];
        $_SESSION["nombre"] = $data["nombre y apellido"];
        $_SESSION["puesto"] = $data["puesto"];

        if ($data["puesto"] === "Administrador") {
            echo "ADMIN";
        } else {
            echo "USER";
        }

    } else {
        echo "INVALID_PASS";
    }

} else {
    echo "NOT_FOUND";
}
?>
