<?php 


//incluir Funcionário
include 'config.php';

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
$sql = "INSERT INTO CAD_USUARIO (USU_NOME, USU_STATUS, USU_DATACAD, USU_EMAIL, USU_SENHA, USU_SENHAC) 
        VALUES (?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssss", $nome, $status, $dataCad, $email, $senhaHash, $senhaHash);

if ($stmt->execute()) {
    echo "Registro inserido com sucesso!";
} else {
    echo "Erro: " . $stmt->error;
}

$stmt->close();
$conn->close();





//Trazer funcionário na página

$sql = "SELECT ID_USUARIO, USU_NOME, USU_EMAIL FROM CAD_USUARIO ORDER BY ID_USUARIO DESC";
$result = $conn->query($sql);

$usuarios = [];

while ($row = $result->fetch_assoc()) {
    $usuarios[] = $row;
}

header('Content-Type: application/json');
echo json_encode($usuarios);
?>



?>




