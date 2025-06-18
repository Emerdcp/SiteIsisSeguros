<?php
include("../../../config.php");

// Obtenção dos dados do formulário (POST)
$id = (int)($_POST['codigo'] ?? 0);
$nome = trim($_POST['editar_nome'] ?? '');
$email = trim($_POST['editar_email'] ?? '');
$status = trim($_POST['editar_status'] ?? '');

// $response = ['success' => false];
$response = ['success' => false, 'message' => 'Dados inválidos.'];

// Validação simples
if ($id <= 0) {
    $response['message'] = 'ID do usuário inválido.';
} elseif (!$nome || !$email || !$status) {
    $response['message'] = 'Todos os campos obrigatórios devem ser preenchidos.';
} else {
    $sql = "UPDATE CAD_USUARIO SET USU_NOME = ?, USU_EMAIL = ?, USU_STATUS = ? WHERE ID_USUARIO = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("sssi", $nome, $email, $status, $id);
        if ($stmt->execute()) {
            $response['success'] = true;
            $response['message'] = 'Usuário atualizado com sucesso.';
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

