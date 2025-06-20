<?php
include("../../../config.php");

$sql = "SELECT ID_USUARIO, USU_NOME, USU_EMAIL, USU_STATUS FROM CAD_USUARIO WHERE USU_STATUS = 'A' ORDER BY ID_USUARIO DESC";
$result = $conn->query($sql);

$usuarios = [];

while ($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
}

echo json_encode($usuarios);

$conn->close();
?>
