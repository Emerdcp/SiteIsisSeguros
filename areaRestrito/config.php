<?php
if ($_SERVER['SERVER_NAME'] == 'localhost') {
    // Ambiente local
    $servidor = "localhost:3080";
    $usuario = "root";
    $senha = ""; // SEM senha por padrão no XAMPP
    $banco = "isisseguro";
} else {
    // Produção
    $servidor = "sql.seuprovedor.com";
    $usuario = "usuario_producao";
    $senha = "senha_producao";
    $banco = "isisseguros";
}

// Ordem correta dos parâmetros
$conn = new mysqli($servidor, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>

