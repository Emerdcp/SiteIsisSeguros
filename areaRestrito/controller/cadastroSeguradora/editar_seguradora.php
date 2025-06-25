<?php
include("../../../config.php");

// Obtenção dos dados do formulário (POST)
$id = (int)($_POST['codigo'] ?? 0);
$seguradora = trim($_POST['editar_seguradora'] ?? '');
$status = trim($_POST['editar_status'] ?? '');

// $response = ['success' => false];
$response = ['success' => false, 'message' => 'Dados inválidos.'];

// Validação simples
if ($id <= 0) {
    $response['message'] = 'ID do usuário inválido.';
} elseif (empty($seguradora) || empty($status)) {
    $response['message'] = 'Todos os campos obrigatórios devem ser preenchidos.';
} else {
    $sql = "UPDATE CAD_SEGURADORA SET SEG_SEGURADORA = ?, SEG_STATUS = ? WHERE ID_SEGURADORA = ? AND REGISTRO_STATUS = 'A'";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("ssi", $seguradora, $status, $id);
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'Seguradora atualizada com sucesso.';
        } else {
            $response['message'] = 'Erro ao executar a atualização.';
        }
        $stmt->close();
    } else {
        $response['message'] = 'Erro na preparação da query.';
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?> 