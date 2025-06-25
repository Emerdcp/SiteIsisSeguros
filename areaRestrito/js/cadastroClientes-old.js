//================== MODAL ABRIR E FECHAR ==================//

function abrirModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "block";

  // Limpa o formulário ao abrir o modal
  const formulario = document.getElementById("formCadastroCliente");
  if (formulario) {
    formulario.reset();
    alternarTipoPessoa(); // garante que apenas o CPF ou CNPJ apareça corretamente
  }
  // document.getElementById(id).style.display = "block";
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}


//================== MODAL PARA CADASTRO DE CLIENTES ==================//

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formCadastroCliente").addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Corrigido: as variáveis devem corresponder aos IDs no HTML
      const codigo = document.getElementById("codigo").value.trim();
      const nome = document.getElementById("nome").value.trim();
      const tipoPessoa = document.getElementById("pfjr").value.trim();
      let documento = " ";
  
      if (tipoPessoa === "F") {
        documento = document.getElementById("cpf").value.trim();
      } else {
        documento = document.getElementById("cnpj").value.trim();
      }
  
  
      console.log("Capturado:", codigo, nome, documento);
  
      // Criando uma nova linha na tabela
      const novaLinha = document.createElement("tr");
      novaLinha.innerHTML = `
        <td>${codigo}</td>
        <td>${nome}</td>
        <td>${documento}</td>
        <td>
          <button type="button" onclick="editarCliente(this)">Editar</button>
          <button type="button" onclick="excluirCliente(this)">Excluir</button>
        </td>
      `;
  
      // Inserindo a nova linha no corpo da tabela
      document.getElementById("tabelaClientes").appendChild(novaLinha);
  
      // Resetando o formulário e fechando o modal
      this.reset();
      fecharModal('modalCadastroCliente');
      alternarTipoPessoa(); // Garante que o CPF/CNPJ fique certo após reset
    });
  });
  
  //Função editar e excluir
  
  function excluirCliente(botao) {
    const linha = botao.closest("tr");
    const confirmar = confirm("Tem certeza que deseja excluir este cliente?");
    if (confirmar) {
      linha.remove();
    }
  }
  
  function editarCliente(botao) {
    const linha = botao.closest("tr");
    const codigo = linha.children[0].innerText;
    const nome = linha.children[1].innerText;
    const cep = linha.children[2].innerText;
  
    // Preenche os campos do formulário com os dados da linha
    document.getElementById("codigo").value = codigo;
    document.getElementById("nome").value = nome;
    document.getElementById("cep").value = cep;
  
    // Remove a linha antiga (ela será recriada ao salvar novamente)
    linha.remove();
  
    // Reabre o modal para edição
    abrirModal('modalCadastroCliente');
  }
  