<?php 

include("../../../config.php");

header('Content-Type: application/json');

$response = ['success' => false, 'message' => ''];

$nome = $_POST['nome'] ?? '';
$status = $_POST['status'] ?? '';
$dataCad = $_POST['dataCad'] ?? '';
$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';
$senhaC = $_POST['senhaC'] ?? '';

if ($senha !== $senhaC) {
    $response['message'] = 'As senhas não coincidem.';
    echo json_encode($response);
    exit;
}

$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

$sql = "INSERT INTO CAD_USUARIO (USU_NOME, USU_STATUS, USU_DATACAD, USU_EMAIL, USU_SENHA) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    $response['message'] = "Erro no prepare: " . $conn->error;
    echo json_encode($response);
    exit;
}

$stmt->bind_param("sssss", $nome, $status, $dataCad, $email, $senhaHash);

if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = 'Usuário cadastrado com sucesso!';
} else {
    $response['message'] = 'Erro ao cadastrar: ' . $stmt->error;
}

$stmt->close();
$conn->close();

echo json_encode($response);

?>

