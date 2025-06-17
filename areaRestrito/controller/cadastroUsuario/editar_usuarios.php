<?php
include("../../../config.php");

$id = (int)($_GET['id'] ?? 0);

$sql = "SELECT ID_USUARIO, USU_NOME, USU_EMAIL, USU_STATUS,
        FROM CAD_USUARIO WHERE ID_USUARIO = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$usuario = $stmt->get_result()->fetch_assoc();

header('Content-Type: application/json; charset=utf-8');
echo json_encode($usuario);

$stmt->close();
$conn->close();
?>