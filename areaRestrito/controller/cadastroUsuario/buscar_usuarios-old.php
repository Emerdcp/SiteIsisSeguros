<?php

include '../../config.php'; // ajuste o caminho conforme seu projeto

header('Content-Type: application/json');

$sql = "SELECT ID_USUARIO, USU_NOME, USU_EMAIL FROM CAD_USUARIO WHERE STATUS = 'A' ORDER BY ID_USUARIO DESC";

$result = $conn->query($sql);

$usuarios = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
}

echo json_encode($usuarios);

$conn->close();
