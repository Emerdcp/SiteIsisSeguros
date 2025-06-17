<?php
include("../../../config.php");

$sql = "SELECT ID_USUARIO, USU_NOME, USU_EMAIL FROM CAD_USUARIO ORDER BY ID_USUARIO DESC";
$result = $conn->query($sql);

$usuarios = [];

while ($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
}

echo json_encode($usuarios);

$conn->close();
?>
