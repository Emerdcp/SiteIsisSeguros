<?php
include("../../../config.php");

$id = $_GET['id'];
$sql = "SELECT ID_USUARIO, USU_NOME, USU_STATUS, USU_EMAIL FROM CAD_USUARIO WHERE ID_USUARIO = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Erro no prepare: " . $conn->error);
}

$stmt->bind_param("i", $id); // https://www.php.net/manual/pt_BR/mysqli-stmt.bind-param.php

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $usuarios  = $result->fetch_array(MYSQLI_ASSOC);
} else {
    echo json_encode([
        "Message"=>"erro"
    ]);
    return;
}

// $usuarios = [];

// while ($row = $result->fetch_assoc()) {
//     $usuarios[] = $row;
// }

echo json_encode($usuarios);

$conn->close();
?>
