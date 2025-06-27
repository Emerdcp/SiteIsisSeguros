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

  <!--================== CADASTROU VEÍCULO==================-->

  <main class="restrito-content">
    <section>
      <div class="container">
        <div class="linha-topo">
          <h2><b>Cadastro Veículos</b></h2>
        </div>
        <div class="botaoIncluir">
          <table>
            <thead>
              <button type="button" onclick="abrirModal('modalCadastro')">Incluir</button>
              <tr>
                <th>Código</th>
                <th>Descrição</th>
                <th>Modelo</th>
              </tr>
            </thead>
            <tbody id="tabelaVeiculos"></tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- ================================================================= -->

    <div id="modalCadastro" class="modal">
      <div class="modal-conteudo">
        <span class="fechar" onclick="fecharModal('modalCadastro')">&times;</span>
        <h3>Incluir Veículo</h3>
        <form id="formCadastro">
          <div class="row g-3">
            <div class="col-md-2">
              <label for="codigo">Código:</label>
              <input type="text" id="codigo" name="codigo" required><br><br>
            </div>
            <div class="col-md-6">
              <label for="descricao">Descrição:</label>
              <input type="text" id="descricao" name="descricao" required><br><br>
            </div>
            <div class="col-md-4">
              <label for="modelo">Modelo:</label>
              <input type="text" id="modelo" name="modelo" required><br><br>
            </div>
          </div>
          <button type="submit">Salvar</button>
          <button type="button" onclick="fecharModal('modalCadastro')">Cancelar</button>
        </form>
      </div>
    </div>

    <!--================== CHAMADA DO JAVA ==================-->
    <script src="../js/scriptRestrito.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"
      defer></script>
</body>

</html>