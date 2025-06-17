<?php

include("../../../config.php");

// Obtém os dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);
$status = $_POST['status'];
$dataCad = $_POST['dataCad'];

// Prepara a consulta SQL
$sql = "INSERT INTO CAD_USUARIO (USU_NOME, USU_EMAIL, USU_SENHA, STATUS, DATA_CAD) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sssss', $nome, $email, $senha, $status, $dataCad);

// Executa a consulta e retorna o resultado
if ($stmt->execute()) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}

$stmt->close();
$conn->close();

?>