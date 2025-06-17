document.addEventListener("DOMContentLoaded", function () {
  // Validação de senha
  const form = document.getElementById("formCadastroUsuario");
  form.addEventListener("submit", function (e) {
    const senha = document.getElementById('senha').value;
    const senhaC = document.getElementById('senhaC').value;
    const errorMessage = document.getElementById('error-message');

    if (senha !== senhaC) {
      errorMessage.style.display = 'block';
      e.preventDefault();
      return;
    } else {
      errorMessage.style.display = 'none';
    }

    // Aqui você pode enviar normalmente ou com AJAX (se preferir não recarregar)
    // Se quiser usar AJAX, remova o atributo action do formulário no HTML
  });

  // Buscar usuários e preencher a tabela
  // fetch('../../controller/cadastroUsuario/buscar_usuarios.php')
  fetch('../controller/cadastroUsuario/buscar_usuarios.php')
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
          <button type="button" onclick='editarUsuario(this)'>✏️</button>
          <button type="button" onclick='excluirUsuario(this)'>🗑️</button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  })
  .catch(error => {
    console.error('Erro ao buscar usuários:', error);
  });
});

// Excluir linha visualmente
function excluirUsuario(botao) {
  const linha = botao.closest("tr");
  const confirmar = confirm("Tem certeza que deseja excluir este usuário?");
  if (confirmar) {
    linha.remove();
    // Aqui você pode chamar um PHP para excluir do banco também
  }
}

// Editar: preenche o modal com os dados da linha
function editarUsuario(botao) {
  const linha = botao.closest("tr");
  const colunas = linha.getElementsByTagName("td");

  document.getElementById("codigo").value = colunas[0].innerText;
  document.getElementById("nome").value = colunas[1].innerText;
  document.getElementById("email").value = colunas[2].innerText;

  // Os dados de status, data, senha não estão na tabela — devem ser buscados ou mantidos em `data-*` se quiser reutilizar aqui.

  abrirModal("modalCadastroUsuario");
}
