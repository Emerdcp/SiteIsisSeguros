<?php
include("../../../config.php");

header('Content-Type: application/json; charset=utf-8');

$id     = $_POST['filtrar_codigo'] ?? null;
$seguradora   = $_POST['filtrar_seguradora'] ?? null;
$status = $_POST['filtrar_status'] ?? null;

$sql = "SELECT ID_SEGURADORA, SEG_SEGURADORA, SEG_STATUS FROM CAD_SEGURADORA WHERE 1=1 AND REGISTRO_STATUS = 'A'";

if (!empty($id)) {
    $sql .= " AND ID_SEGURADORA = " . intval($id);
}

if (!empty($seguradora)) {
    $seguradoraEsc = $conn->real_escape_string($seguradora);
    $sql .= " AND SEG_SEGURADORA LIKE '%$seguradoraEsc%'";
}

if (!empty($status)) {
    $statusEsc = $conn->real_escape_string($status);
    $sql .= " AND SEG_STATUS = '$statusEsc'";
}

$sql .= " ORDER BY ID_SEGURADORA DESC";

$result = $conn->query($sql);

if (!$result) {
    echo json_encode(["erro" => $conn->error]);
    $conn->close();
    exit;
}

$seguradora = [];

while ($row = $result->fetch_assoc()) {
    $seguradora[] = $row;
}

echo json_encode($seguradora);
$conn->close();
