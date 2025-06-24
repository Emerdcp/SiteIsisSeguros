<?php
include("../../../config.php");

$sql = "SELECT ID_SEGURADORA, SEG_SEGURADORA, SEG_STATUS FROM CAD_SEGURADORA WHERE SEG_STATUS = 'A' ORDER BY ID_SEGURADORA DESC;";
$result = $conn->query($sql);

$seguradora = [];

while ($row = $result->fetch_assoc()) {
    $seguradora[] = $row;
}

echo json_encode($seguradora);

$conn->close();
?>