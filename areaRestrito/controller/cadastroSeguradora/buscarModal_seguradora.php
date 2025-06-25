<?php
include("../../../config.php");

$id = $_GET['id'];
$sql = "SELECT ID_SEGURADORA, SEG_SEGURADORA, SEG_STATUS FROM CAD_SEGURADORA WHERE ID_SEGURADORA = ? AND REGISTRO_STATUS = 'A'";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Erro no prepare: " . $conn->error);
}

$stmt->bind_param("i", $id); // https://www.php.net/manual/pt_BR/mysqli-stmt.bind-param.php

if ($stmt->execute()) {
    $result = $stmt->get_result();
    $seguradora  = $result->fetch_array(MYSQLI_ASSOC);
} else {
    echo json_encode([
        "Message"=>"erro"
    ]);
    return;
}

echo json_encode($seguradora);

$conn->close();
?>
