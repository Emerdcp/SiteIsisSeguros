<?php
include("../../../config.php");

$id = $_GET['id'];

$sql = "SELECT ID_USUARIO, USU_NOME, USU_EMAIL, USU_STATUS, DATE_FORMAT(USU_DATACAD, '%Y-%m-%d') AS USU_DATACAD FROM CAD_USUARIO WHERE ID_USUARIO = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();
$usuario = $result->fetch_assoc();

header('Content-Type: application/json');
echo json_encode($usuario);

$stmt->close();
$conn->close();
