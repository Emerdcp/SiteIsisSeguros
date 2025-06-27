<?php
session_start();
include("../config.php");

$email = filter_input(INPUT_POST, 'usuario', FILTER_SANITIZE_EMAIL);
// $email = $_POST['usuario'];
$senha = $_POST['senha'];

$sql = "SELECT ID_USUARIO, USU_NOME, USU_EMAIL, USU_SENHA FROM CAD_USUARIO WHERE USU_EMAIL = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$resultado = $stmt->get_result();

$response = [];

if ($resultado->num_rows === 1) {
    $usuario = $resultado->fetch_assoc();

    if (password_verify($senha, $usuario['USU_SENHA'])) {
        $_SESSION['id_usuario'] = $usuario['ID_USUARIO'];
        $_SESSION['nome_usuario'] = $usuario['USU_NOME'];
        $_SESSION['email'] = $usuario['USU_EMAIL']; // ✅ adiciona o e-mail

        $response = [
            'success' => true,
            'message' => 'Login realizado com sucesso!',
            'redirect' => 'areaRestrito/inicio/home.php' // ✅ Verifique se esse caminho é correto
        ];
    } else {
        $response = ['success' => false, 'message' => 'Senha incorreta.'];
    }
} else {
    $response = ['success' => false, 'message' => 'Usuário não encontrado.'];
}

$stmt->close();
$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
