<?php
include("../../../config.php");

header('Content-Type: application/json; charset=utf-8');

$id     = $_POST['codigo'] ?? null;
$nome   = $_POST['nome'] ?? null;
$status = $_POST['status'] ?? null;
$email  = $_POST['email'] ?? null;

$sql = "SELECT ID_USUARIO, USU_NOME, USU_STATUS, USU_EMAIL FROM CAD_USUARIO WHERE 1=1";

if (!empty($id)) {
    $sql .= " AND ID_USUARIO = " . intval($id);
}

if (!empty($nome)) {
    $nomeEsc = $conn->real_escape_string($nome);
    $sql .= " AND USU_NOME LIKE '%$nomeEsc%'";
}

if (!empty($status)) {
    $statusEsc = $conn->real_escape_string($status);
    $sql .= " AND USU_STATUS = '$statusEsc'";
}

if (!empty($email)) {
    $emailEsc = $conn->real_escape_string($email);
    $sql .= " AND USU_EMAIL LIKE '%$emailEsc%'";
}

$sql .= " ORDER BY ID_USUARIO DESC";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["erro" => $conn->error]);
    $conn->close();
    exit;
}

$usuarios = [];

while ($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
}

echo json_encode($usuarios);
$conn->close();
