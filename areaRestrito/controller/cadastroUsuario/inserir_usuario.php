<?php 

include("../../../config.php");

$nome = $_POST['nome'];
$status = $_POST['status'];
$dataCad = $_POST['dataCad'];
$email = $_POST['email'];
$senha = $_POST['senha'];
$senhaC = $_POST['senhaC'];

// Verificação mínima de senha
if ($senha !== $senhaC) {
    die("Erro: As senhas não coincidem.");
}

// Criptografa a senha
$senhaHash = password_hash($senha, PASSWORD_DEFAULT);

// Query usando senha criptografada
$sql = "INSERT INTO CAD_USUARIO (USU_NOME, USU_STATUS, USU_DATACAD, USU_EMAIL, USU_SENHA) 
        VALUES (?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Erro no prepare: " . $conn->error);
}

$stmt->bind_param("sssss", $nome, $status, $dataCad, $email, $senhaHash);


if ($stmt->execute()) {
    echo "<script>
        alert('Usuário cadastrado com sucesso!');
        window.location.href = '../../cadastroUsuario/Usuario.html';
    </script>";
} else {
    echo "<script>
        alert('Erro ao cadastrar: " . addslashes($stmt->error) . "');
        window.location.href = '../../cadastroUsuario/Usuario.html';
    </script>";
}

$conn->set_charset("utf8");
$stmt->close();
$conn->close();

?>

