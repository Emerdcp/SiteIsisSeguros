<?php
session_start();

session_unset(); // Limpa todas as variáveis da sessão
session_destroy(); // Destroi a sessão

header("Location: ../index.html"); // Redireciona para a página inicial
exit();
?>


