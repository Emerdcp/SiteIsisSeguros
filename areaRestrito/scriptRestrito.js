//================== MODAL PARA CADASTRO DE VEÍCULOS ==================//

function abrirModal() {
  document.getElementById("modalCadastro").style.display = "block";
}

function fecharModal() {
  document.getElementById("modalCadastro").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("formCadastro").addEventListener("submit", function (e) {
    e.preventDefault();
    const codigo = document.getElementById("codigo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const modelo = document.getElementById("modelo").value.trim();

    console.log("Capturado:", codigo, descricao, modelo);

    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
      <td>${codigo}</td>
      <td>${descricao}</td>
      <td>${modelo}</td>
    `;

    document.getElementById("tabelaVeiculos").appendChild(novaLinha);
    this.reset();
    fecharModal();
  });
});


//================== MODAL PARA CADASTRO DE CLIENTES ==================//

function abrirModal() {
  document.getElementById("modalCadastroCliente").style.display = "block";
}

function fecharModal() {
  document.getElementById("modalCadastroCliente").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("formCadastroCliente").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Corrigido: as variáveis devem corresponder aos IDs no HTML
    const codigo = document.getElementById("codigo").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const cep = document.getElementById("cep").value.trim();

    console.log("Capturado:", codigo, nome, cep);

    // Criando uma nova linha na tabela
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
      <td>${codigo}</td>
      <td>${nome}</td>
      <td>${cep}</td>
    `;

    // Inserindo a nova linha no corpo da tabela
    document.getElementById("tabelaClientes").appendChild(novaLinha);
    
    // Resetando o formulário e fechando o modal
    this.reset();
    fecharModal();
  });
});
