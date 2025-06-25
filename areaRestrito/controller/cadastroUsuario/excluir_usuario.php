<?php
include("../../../config.php");

$id = $_POST['id'];

$sql = "UPDATE CAD_USUARIO SET REGISTRO_STATUS = 'I' WHERE ID_USUARIO = ?";
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


