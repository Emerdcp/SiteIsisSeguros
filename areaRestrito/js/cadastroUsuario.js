
//================== MODAL PARA CADASTRO DE USUÁRIO ==================//

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("formCadastroUsuario").addEventListener("submit", function (e) {
    e.preventDefault();

    // Corrigido: as variáveis devem corresponder aos IDs no HTML
    const codigo = document.getElementById("codigo").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();

    console.log("Capturado:", codigo, nome, email);

    // Criando uma nova linha na tabela
    const novaLinha = document.createElement("tr");
    novaLinha.innerHTML = `
      <td>${codigo}</td>
      <td>${nome}</td>
      <td>${email}</td>
      <td>
        <button type="button" onclick="editarUsuario(this)">Editar</button>
        <button type="button" onclick="excluirUsuario(this)">Excluir</button>
      </td>
    `;

    // Inserindo a nova linha no corpo da tabela
    document.getElementById("tabelaUsuario").appendChild(novaLinha);

    // Resetando o formulário e fechando o modal
    this.reset();
    fecharModal('modalCadastroUsuario');
  });
});

//Função editar e excluir

function excluirUsuario(botao) {
  const linha = botao.closest("tr");
  const confirmar = confirm("Tem certeza que deseja excluir este Funcionário?");
  if (confirmar) {
    linha.remove();
  }
}

function editarUsuario(botao) {
  const linha = botao.closest("tr");
  const codigo = linha.children[0].innerText;
  const nome = linha.children[1].innerText;
  const status = linha.children[2].innerText;
  const dataCad = linha.children[3].innerText;
  const email = linha.children[4].innerText;
  const senha = linha.children[5].innerText;
  const senhaC = linha.children[6].innerText;

  // Preenche os campos do formulário com os dados da linha
  document.getElementById("codigo").value = codigo;
  document.getElementById("nome").value = nome;
  document.getElementById("status").value = status;
  document.getElementById("dataCad").value = dataCad;
  document.getElementById("email").value = email;
  document.getElementById("senha").value = senha;
  document.getElementById("senhaC").value = senhaC;

  // Remove a linha antiga (ela será recriada ao salvar novamente)
  linha.remove();

  // Reabre o modal para edição
  abrirModal('modalCadastroUsuario');
}


//validação de senha de usuário.
document.querySelector('form').addEventListener('submit', function (event) {
  var senha = document.getElementById('senha').value;
  var senhaC = document.getElementById('senhaC').value;
  var errorMessage = document.getElementById('error-message');

  // Verifica se as senhas coincidem
  if (senha !== senhaC) {
    errorMessage.style.display = 'block'; // Exibe a mensagem de erro
    event.preventDefault(); // Impede o envio do formulário
  } else {
    errorMessage.style.display = 'none'; // Esconde a mensagem de erro
  }
});

//trazer usuário na página inicial

document.addEventListener('DOMContentLoaded', function () {
  fetch('buscar_usuarios.php')
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('tabelaUsuario');
      tbody.innerHTML = '';

      data.forEach(usuario => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
          <td>${usuario.ID_USUARIO}</td>
          <td>${usuario.USU_NOME}</td>
          <td>${usuario.USU_EMAIL}</td>
          <td>
            <button onclick="editarUsuario(${usuario.ID_USUARIO})">✏️</button>
            <button onclick="excluirUsuario(${usuario.ID_USUARIO})">🗑️</button>
          </td>
        `;

        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar usuários:', error);
    });
});
