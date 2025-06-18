<?php
// include("../../../config.php");

// $id = (int)($_GET['id'] ?? 0);

// $sql = "SELECT ID_USUARIO, USU_NOME, USU_EMAIL, USU_STATUS
//         FROM CAD_USUARIO WHERE ID_USUARIO = ?";
// $stmt = $conn->prepare($sql);
// $stmt->bind_param("i", $id);
// $stmt->execute();
// $usuario = $stmt->get_result()->fetch_assoc();

// header('Content-Type: application/json; charset=utf-8');
// echo json_encode($usuario);

// $stmt->close();
// $conn->close();


include("../../../config.php");

// Obtenção dos dados do formulário (POST)
$id = (int)($_POST['codigo'] ?? 0);
$nome = trim($_POST['editar_nome'] ?? '');
$email = trim($_POST['editar_email'] ?? '');
$status = trim($_POST['editar_status'] ?? '');

$response = ['success' => false];

// Validação simples
if ($id > 0 && $nome && $email && $status) {
    $sql = "UPDATE CAD_USUARIO SET USU_NOME = ?, USU_EMAIL = ?, USU_STATUS = ? WHERE ID_USUARIO = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssi", $nome, $email, $status, $id);

    if ($stmt->execute()) {
        $response['success'] = true;
    }

    $stmt->close();
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>