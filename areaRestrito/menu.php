<!-- Menu lateral -->
<nav class="sidebar" id="sidebar">
  <div class="logo-area">
    <a href="#">
      <img id="logo_restrico" src="../../imagens/logoIsisSeguro.png" alt="Logo Isis Seguros" title="Isis Seguro"
        class="logo-img-restrito" loading="lazy">
    </a>
    <div class="toggle-btn" onclick="toggleSidebar()">☰</div>
  </div>

  <ul class="menu-list">
    <li><a href="../inicio/home.php"><img src="../imagens/casa.png" class="img-menu"><span
          class="menu-text">Início</span></a></li>
    <li class="submenu-wrapper">
      <a href="#"><img src="../imagens/cadastro.png" class="img-menu"><span class="menu-text">Cadastro</span><span
          class="arrow">▼</span></a>
      <ul class="submenu">
        <li><a class="submenu-item" href="../cadastroCliente/cadastroCliente.php"><img src="../imagens/cliente.png"
              class="img-menu"><span class="menu-text">Cliente</span></a></li>
        <li><a class="submenu-item" href="../cadastroVeiculo/veiculo.php"><img src="../imagens/carro.png"
              class="img-menu"><span class="menu-text">Veículos</span></a></li>
        <li><a class="submenu-item" href="../cadastroSeguradoras/seguradoras.php"><img src="../imagens/seguro.png"
              class="img-menu"><span class="menu-text">Seguradoras</span></a></li>
        <li><a class="submenu-item" href="../cadastroUsuario/usuario.php"><img src="../imagens/usuario.png"
              class="img-menu"><span class="menu-text">Usuário</span></a></li>
      </ul>
    </li>
    <li><a href="#"><img src="../imagens/relatorios.png" class="img-menu"><span class="menu-text">Relatório</span></a>
    </li>
    <li><a href="#" onclick="abrirModalLogout()"><img src="../imagens/sair.png" class="img-menu"><span
          class="menu-text">Sair</span></a></li>
  </ul>
</nav>



<!-- Modal de Confirmação de Logout -->
<div id="modalLogout" class="modal">
  <div class="modal-conteudo">
    <span class="fechar" onclick="fecharModalLogout()">&times;</span>
    <h3>Sair do Sistema</h3>
    <form id="formCadastroUsuarioSair" method="">
      <p>Tem certeza que deseja sair?</p>
      <button type="button" onclick="confirmarLogout()">Sair</button>
      <button type="button" onclick="fecharModalLogout()">Cancelar</button>
    </form>
  </div>
</div>