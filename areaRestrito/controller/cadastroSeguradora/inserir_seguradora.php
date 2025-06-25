<?php 

include("../../../config.php");

header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

$seguradora = $_POST['seguradora'] ?? '';
$status = $_POST['status'] ?? '';
$dataCad = $_POST['dataCad'] ?? '';
$registroStatus = 'A';

$sql = "INSERT INTO CAD_SEGURADORA (SEG_SEGURADORA, SEG_STATUS, SEG_DATACAD, REGISTRO_STATUS) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    $response['message'] = "Erro no prepare: " . $conn->error;
    echo json_encode($response);
    exit;
}

$stmt->bind_param("ssss", $seguradora, $status, $dataCad, $registroStatus);

if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = 'Seguradora cadastrada com sucesso!';
} else {
    $response['message'] = 'Erro ao cadastrar seguradora: ' . $stmt->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);

?>

