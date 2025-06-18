//================== MODAL ABRIR E FECHAR ==================//

function abrirModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "block";

  // Limpa o formulário ao abrir o modal
  const formulario = document.getElementById("formCadastroUsuario");
  if (formulario) {
    formulario.reset();
  }
  //================== Preenche a data do dia após resetar o formulário ==================//  
  const campoData = document.getElementById('dataCad');
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  campoData.value = `${ano}-${mes}-${dia}`;
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}




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

  //================== Buscar usuários e preencher a tabela ==================//  

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

//================== Excluir usuários ==================//  

function excluirUsuario(botao) {
  const linha = botao.closest("tr");
  const id = linha.cells[0].innerText;

  const confirmar = confirm("Tem certeza que deseja excluir este usuário?");
  if (confirmar) {
    fetch('../controller/cadastroUsuario/excluir_usuario.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `id=${id}`
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        linha.remove(); // remove visualmente
      } else {
        alert("Erro ao excluir usuário.");
      }
    })
    .catch(error => console.error('Erro:', error));
  }
}


//================== Editar usuários ==================//  

function editarUsuario(botao) {
  const linha = botao.closest("tr");
  const id = linha.cells[0].innerText;

  fetch(`../controller/cadastroUsuario/buscar_usuario.php?id=${id}`)
    .then(response => response.json())
    .then(usuario => {
      // Altere para os campos do formulário de edição
      document.getElementById("codigo").value = usuario.ID_USUARIO;
      document.getElementById("editar_nome").value = usuario.USU_NOME;
      document.getElementById("editar_status").value = usuario.USU_STATUS;
      document.getElementById("editar_email").value = usuario.USU_EMAIL;

      abrirModal("modalCadastroUsuarioEditar");
    })
    .catch(error => {
      console.error("Erro ao buscar dados do usuário:", error);
      alert("Erro ao buscar dados do usuário.");
    });
}




document.getElementById('formCadastroUsuarioEditar').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch('../controller/cadastroUsuario/editar_usuarios.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      fecharModal('modalCadastroUsuarioEditar');
      location.reload(); // ou refazer o fetch da tabela
    } else {
      alert('Erro ao editar o usuário.');
    }
  })
  .catch(error => console.error('Erro:', error));
});
