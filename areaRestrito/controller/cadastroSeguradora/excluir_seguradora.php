<?php
include("../../../config.php");

$id = $_POST['id'];

$sql = "DELETE FROM CAD_SEGURADORA WHERE ID_SEGURADORA = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
$conn->close();
?>
