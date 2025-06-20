<?php
include("../../../config.php");

$id = $_POST['codigo'] ?? null;
$nome = $_POST['nome'] ?? null;
$status = $_POST['status'] ?? null;
$email = $_POST['email'] ?? null;

$sql = "SELECT ID_USUARIO, USU_NOME, USU_STATUS, USU_EMAIL FROM CAD_USUARIO WHERE 1=1";

if ($id) {
    $sql .= " AND ID_USUARIO = " . intval($id);
}
if ($nome) {
    $sql .= " AND USU_NOME LIKE '%" . $conn->real_escape_string($nome) . "%'";
}
if ($status) {
    $sql .= " AND USU_STATUS = '" . $conn->real_escape_string($status) . "'";
}
if ($email) {
    $sql .= " AND USU_EMAIL LIKE '%" . $conn->real_escape_string($email) . "%'";
}

$sql .= " ORDER BY ID_USUARIO DESC";

$result = $conn->query($sql);
$usuarios = [];

while ($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
}

echo json_encode($usuarios);
$conn->close();
?>
