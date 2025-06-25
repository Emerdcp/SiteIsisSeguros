<?php
include("../../../config.php");

$id = $_POST['id'];

$sql = "UPDATE CAD_SEGURADORA SET REGISTRO_STATUS = 'I' WHERE ID_SEGURADORA = ?";
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

