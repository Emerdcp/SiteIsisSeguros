<?php
// session_start();

// if (!isset($_SESSION['email'])) {
//     header("Location: ../index.html"); // Redireciona para a página inicial
//     exit();
// }

session_start();
if (!isset($_SESSION['email'])) {
  header("Location: ../../index.html");
  exit();
}

$emailUsuario = $_SESSION['email'];
?>


<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Usuário</title>
  <link rel="icon" href="../../imagens/isis.png" type="image/png">
  <link rel="stylesheet" href="../../style.css" />
  <link rel="stylesheet" href="../styleRestrito.css" />
  <!-- <link rel="stylesheet" href="styleRestrito.css"> -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7" crossorigin="anonymous">
  <meta name="description"
    content="Isis Seguros oferece proteção patrimonial, familiar e profissional com soluções personalizadas para pessoas físicas e empresas. Contamos com profissionais qualificados e parcerias com as melhores seguradoras do mercado para garantir agilidade e excelência nos serviços prestados." />
</head>

<body class="restrito">
  <header id="home">

    <div id="menu-container"></div>

  </header>

  <!--================== INICIO ==================-->

  <main class="restrito-content">
    <section>
      <div class="container">
        <div class="linha-topo">
          <h2><b>Início</b></h2>
        </div>
        <div class="container">
          <a href=""></a>
          <img src="../../imagens/logoIsisSeguro.png" alt="Logo Isís Seguros" background-attachment: fixed;
            background-repeat: no-repeat; background-size: 100% 100%;>

          <!-- <body  style="background-image: url(../imagens/logoIsisSeguro.png); background-attachment: fixed; background-repeat: no-repeat; background-size: 100% 100%;"></body> -->
        </div>
      </div>
    </section>
  </main>

  <!--================== CHAMADA DO JAVA ==================-->
  <script src="../js/scriptRestrito.js" defer></script>
  <script src="../js/cadastroUsuario.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"
    defer></script>
</body>

</html>