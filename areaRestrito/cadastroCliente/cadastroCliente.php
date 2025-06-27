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
    <title>Cliente</title>
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

    <!--================== CADASTROU CLIENTE ==================-->

    <main class="restrito-content">
        <section>
            <div class="container">
                <div class="linha-topo">
                    <h2><b>Cadastro Cliente</b></h2>
                </div>
                <div class="botaoIncluir">
                    <!-- Mover o botão para fora do thead -->
                    <button type="button" onclick="abrirModal('modalCliente')">Incluir</button>
                    <button type="button" onclick="abrirModal('modalClienteFiltrar')" style="float: right;">
                        <img src="../imagens/lupa.png" alt="Pesquisa" class="iconeFormulario"></button>
                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Cliente</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody id="tabelaCliente"></tbody>
                    </table>
                    <div style="text-align: center; margin-top: 20px;">
                        <button id="btnCarregarMais">Carregar mais</button>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- ============================= INSERIR USUÁRIO ==================================== -->

    <div id="modalCliente" class="modal">
        <div class="modal-conteudo">
            <span class="fechar" onclick="fecharModal('modalCliente')">&times;</span>
            <h3>Incluir Cliente</h3>
            <form id="formCadastroCliente" action="../controller/cadastroCliente/inserir_cliente.php" method="post">
                <div class="row g-3">
                    <div class="col-md-2">
                        <label for="codigo">Código:</label>
                        <input type="text" id="codigo" name="codigo" class="form-control" required>
                    </div>
                    <div class="col-md-6">
                        <label for="nome">Nome:</label>
                        <input type="text" id="nome" name="nome" class="form-control" required>
                    </div>
                    <div class="col-md-2">
                        <label for="pfjr">Status</label>
                        <select id="status" name="status" class="form-control">
                            <option value="A">Ativo</option>
                            <option value="I">Inativo</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="nome">Data Cadastro</label>
                        <input type="date" id="dataCad" name="dataCad" class="form-control" required>
                    </div>
                    <div class="col-md-2">
                        <label for="pfjr">Física/Jurídica</label>
                        <select name="pfjr" id="pfjr" class="form-control" onchange="alternarTipoPessoa()">
                            <option value="F">Física</option>
                            <option value="J">Jurídica</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <!-- Campo CPF -->
                        <div id="cpfDiv">
                            <label for="CPF">CPF</label>
                            <input type="text" id="cpf" name="cpf" class="form-control" maxlength="14"
                                placeholder="000.000.000-00">
                        </div>
                        <!-- Campo CNPJ -->
                        <div id="cnpjDiv" style="display: none;">
                            <label for="CNPJ">CNPJ</label>
                            <input type="text" id="cnpj" name="cnpj" class="form-control" maxlength="18"
                                placeholder="00.000.000/0000-00">
                        </div>
                    </div>

                    <div class="col-md-2">
                        <label for="ierg">IE/RG</label>
                        <select name="ierg" id="ierg" class="form-control" onchange="alternarTipoIerg()">
                            <option value="I">I.E.</option>
                            <option value="R">RG</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <!-- Campo IE -->
                        <div id="ieDiv">
                            <label for="ie">I.E.</label>
                            <input type="text" id="ie" name="ie" class="form-control" maxlength="14"
                                placeholder="000.000.000.000">
                        </div>
                        <!-- Campo RG -->
                        <div id="rgDiv" style="display: none;">
                            <label for="rg">RG</label>
                            <input type="text" id="rg" name="rg" class="form-control" maxlength="11"
                                placeholder="00.000.000-0">
                        </div>
                    </div>


                    <div class="col-md-2">
                        <label for="cep">Cep:</label>
                        <input type="text" id="cep" name="cep" class="form-control" value="" size="10" maxlength="10"
                            placeholder="00.000-000" required onblur="pesquisacep(this.value);">
                    </div>
                    <div class="col-md-4">
                        <label for="logradouro">Endereço:</label>
                        <input type="text" id="logradouro" name="logradouro" class="form-control" maxlength="150"
                            required>
                    </div>
                    <div class="col-md-2">
                        <label for="numero">Número:</label>
                        <input type="text" id="numero" name="numero" class="form-control" maxlength="20" required>
                    </div>
                    <div class="col-md-2">
                        <label for="complemento">Complemento:</label>
                        <input type="text" id="complemento" name="complemento" class="form-control" maxlength="50">
                    </div>
                    <div class="col-md-3">
                        <label for="bairro">Bairro:</label>
                        <input type="text" id="bairro" name="bairro" class="form-control" maxlength="50" required>
                    </div>
                    <div class="col-md-3">
                        <label for="cidade">Cidade:</label>
                        <input type="text" id="cidade" name="cidade" class="form-control" maxlength="50" required>
                    </div>
                    <div class="col-md-2">
                        <label for="estado">Estado</label>
                        <select name="estado" id="estado" class="form-control" class="form-control" required>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                    <div class="col-md-2">
                        <label for="pfjr">Cliente/Prospect</label>
                        <select name="clienteProspect" id="clienteProspect" class="form-control">
                            <option value="C">Cliente</option>
                            <option value="P">Prospect</option>
                        </select>
                    </div>




                    <div class="col-md-6">
                        <label for="cliente">Cliente</label>
                        <input type="text" id="cliente" name="cliente" class="form-control" maxlength="200" required>
                    </div>
                    <div class="col-md-3">
                        <label for="pfjr">Status</label>
                        <select id="status" name="status" class="form-control" required>
                            <option value="A">Ativo</option>
                            <option value="I">Inativo</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="nome">Data Cadastro</label>
                        <input type="date" id="dataCad" name="dataCad" class="form-control">
                    </div>
                </div>
                <div id="mensagem-inserir" class="alerta-mensagem" style="display:none;"></div>
                <button type="submit">Salvar</button>
                <button type="button" onclick="fecharModal('modalSeguradora')">Cancelar</button>
            </form>
        </div>
    </div>







    <!-- ============================= EDITAR USUÁRIO ==================================== -->

    <div id="modalSeguradoraEditar" class="modal">
        <div class="modal-conteudo">
            <span class="fechar" onclick="fecharModalEditar('modalSeguradoraEditar')">&times;</span>
            <h3>Editar Usuário</h3>
            <form id="formSeguradoraEditar" method="post">
                <div class="row g-3">
                    <div class="col-md-2">
                        <label for="codigo">Código</label>
                        <input type="number" id="codigo" name="codigo" class="form-control" readonly>
                        <!--  readonly Permite o campo ser retonado mas não editado-->
                    </div>
                    <div class="col-md-7">
                        <label for="seguradora">Seguradora</label>
                        <input type="text" id="editar_seguradora" name="editar_seguradora" class="form-control"
                            maxlength="200" required>
                    </div>
                    <div class="col-md-3">
                        <label for="status">Status</label>
                        <select id="editar_status" name="editar_status" class="form-control" required>
                            <option value="A">Ativo</option>
                            <option value="I">Inativo</option>
                        </select>
                    </div>
                </div>
                <div id="mensagem-editar" class="alerta-mensagem" style="display:none;"></div>
                <button type="submit">Salvar</button>
                <button type="button" onclick="fecharModalEditar('modalSeguradoraEditar')">Cancelar</button>
            </form>
        </div>
    </div>

    <!-- ============================= EXCLUIR USUÁRIO ==================================== -->

    <div id="modalSeguradoraExcluir" class="modal">
        <div class="modal-conteudo">
            <span class="fechar" onclick="fecharModalExcluir('modalSeguradoraExcluir')">&times;</span>
            <h3>Excluir Seguradora</h3>
            <form id="formSeguradoraExcluir" method="post">
                <input type="hidden" id="idSeguradoraExcluir" name="id">
                <div class="row g-12">
                    <p>Tem certeza que deseja excluir esta seguradora?</p>
                </div>
                <div id="mensagem-excluir" class="alerta-mensagem" style="display:none;"></div>
                <button type="submit">Excluir</button>
                <button type="button" onclick="fecharModalExcluir('modalSeguradoraExcluir')">Cancelar</button>
            </form>
        </div>
    </div>

    <!-- ============================= FILTRAR USUÁRIO ==================================== -->

    <div id="modalSeguradoraFiltrar" class="modal">
        <div class="modal-conteudo">
            <span class="fechar" onclick="fecharModalFiltrar('modalSeguradoraFiltrar')">&times;</span>
            <h3>Filtrar Usuário</h3>
            <form id="formSeguradoraFiltrar" method="post">
                <div class="row g-3">
                    <div class="col-md-2">
                        <label for="codigo">Código</label>
                        <input type="number" id="filtrar_codigo" name="filtrar_codigo" class="form-control">
                        <!--  readonly Permite o campo ser retonado mas não editado-->
                    </div>
                    <div class="col-md-7">
                        <label for="seguradora">Seguradora</label>
                        <input type="text" id="filtrar_seguradora" name="filtrar_seguradora" class="form-control"
                            maxlength="200">
                    </div>
                    <div class="col-md-3">
                        <label for="status">Status</label>
                        <select id="filtrar_status" name="filtrar_status" class="form-control">
                            <option value=""></option>
                            <option value="A">Ativo</option>
                            <option value="I">Inativo</option>
                        </select>
                    </div>
                </div>
                <div id="mensagem-filtrar" class="alerta-mensagem" style="display:none;"></div>
                <button type="submit">Filtrar</button>
                <button type="button" onclick="fecharModalFiltrar('modalSeguradoraFiltrar')">Cancelar</button>
            </form>
        </div>
    </div>
    <!--================== CHAMADA DO JAVA ==================-->
    <script src="../js/scriptRestrito.js"></script>
    <script src="../js/cadastroSeguradora.js"></script>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-k6d4wzSIapyDyv1kpU366/PK5hCdSbCRGRCMv+eplOQJWyd1fbcAu9OCUj5zNLiq" crossorigin="anonymous"
        defer></script>
</body>

</html>