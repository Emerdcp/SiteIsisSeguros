<div class="topbar-usuario">
    <div class="usuario-info">
        <span class="nome-usuario"><img src="../../areaRestrito/imagens/logado.png"
        class="img-menu"><span class="menu-text"><?php echo $_SESSION['email']; ?></span>

        <a href="../configuracoes/usuario_config.php" class="btn-config" title="Configurações">
            <i class="fas fa-cog"></i>
        </a>

        <a href="#" onclick="abrirModalLogout()"><img src="../imagens/sairMenu.png" class="img-menuSuperior" width="40px" height="40px"><span
          class="menu-text"></span></a>
    </div>
</div>

