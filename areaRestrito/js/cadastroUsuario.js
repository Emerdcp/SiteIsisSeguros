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

//inserir dados
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formCadastroUsuario");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const senha = document.getElementById('senha').value;
    const senhaC = document.getElementById('senhaC').value;
    const errorMessage = document.getElementById('error-message');
    const mensagem = document.getElementById('mensagem-inserir');
    const erroSenha = document.getElementById('erro-senha');

    if (senha !== senhaC) {
      // erroSenha.style.display = 'block';

      erroSenha.style.display = 'none';  // garante que será escondido primeiro
      void erroSenha.offsetWidth;        // força reflow
      erroSenha.style.display = 'block'; // reaparece com garantia
      return;
    }

    erroSenha.style.display = 'none';


    const formData = new FormData(form);

    fetch('../controller/cadastroUsuario/inserir_usuario.php', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => {
        mensagem.innerText = data.message;
        mensagem.classList.remove('alerta-sucesso', 'alerta-erro'); // remove classes antigas
        mensagem.classList.add(data.success ? 'alerta-sucesso' : 'alerta-erro'); // adiciona a correta
        mensagem.style.display = 'block';

        setTimeout(() => {
          mensagem.style.display = 'none';
          if (data.success) {
            fecharModal('modalCadastroUsuario');
            location.reload(); // ou atualizar tabela
          }
        }, 3000);
      })
      .catch(error => {
        mensagem.innerText = 'Erro ao inserir usuário.';
        mensagem.classList.remove('alerta-sucesso', 'alerta-erro');
        mensagem.classList.add('alerta-erro');
        mensagem.style.display = 'block';

        setTimeout(() => mensagem.style.display = 'none', 3000);
        console.error('Erro:', error);
      });
  });

  //================== Buscar usuários e preencher a tabela ==================//  

  let usuarios = [];        // todos os dados vindos do fetch
  let indiceAtual = 0;      // controla o índice inicial
  const porPagina = 10;     // quantidade por "lote"

  fetch('../controller/cadastroUsuario/buscar_usuarios.php')
    .then(response => response.json())
    .then(data => {
      usuarios = data;
      indiceAtual = 0;
      document.getElementById('tabelaUsuario').innerHTML = '';
      carregarMaisUsuarios(); // Carrega os primeiros 10
    })
    .catch(error => {
      console.error('Erro ao buscar usuários:', error);
    });

  //================== Buscar usuários e Carrega Mais ==================//
  function carregarMaisUsuarios() {
    const tbody = document.getElementById('tabelaUsuario');
    const proximoLote = usuarios.slice(indiceAtual, indiceAtual + porPagina);

    proximoLote.forEach(usuario => {
      const tr = document.createElement('tr');
      const statusFormatado = usuario.USU_STATUS === 'A' ? 'Ativo' : 'Inativo';

      tr.innerHTML = `
      <td>${usuario.ID_USUARIO}</td>
      <td>${usuario.USU_NOME}</td>
      <td>${usuario.USU_EMAIL}</td>
      <td>${statusFormatado}</td>
      <td>
        <button type="button" onclick="editarUsuario(this)" class="botaoFormulario">
          <img src="../imagens/lapis.png" alt="Editar" class="iconeFormulario">
        </button>
        <button type="button" onclick="excluirUsuario(this)" class="botaoFormulario">
          <img src="../imagens/x.png" alt="Excluir" class="iconeFormulario">
        </button>
      </td>
    `;

      tbody.appendChild(tr);
    });

    indiceAtual += porPagina;

// Exibe ou esconde o botão "Carregar mais"
    const btnCarregarMais = document.getElementById('btnCarregarMais');
    if (indiceAtual >= usuarios.length) {
      btnCarregarMais.style.display = 'none';
    } else {
      btnCarregarMais.style.display = 'inline-block';
    }
  }
  // Evento de clique do botão "Carregar mais"
  document.getElementById('btnCarregarMais').addEventListener('click', carregarMaisUsuarios);
});

//================== Excluir usuários ==================//  

let idUsuarioParaExcluir = null; // variável global temporária

function excluirUsuario(botao) {
  const linha = botao.closest("tr");
  const id = linha.cells[0].innerText;
  idUsuarioParaExcluir = id;

  // Coloca o ID no input hidden
  document.getElementById("idUsuarioExcluir").value = id;

  // Esconde a mensagem anterior (se tiver)
  document.getElementById("mensagem-excluir").style.display = "none";

  // Abre o modal
  abrirModal('modalCadastroUsuarioExcluir');
}

// função auxiliar fechar modar excluir

function fecharModalExcluir(id) {
  document.getElementById(id).style.display = "none";
}

//Responsavel pela mensagem de exclusão
document.getElementById("formCadastroUsuarioExcluir").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("idUsuarioExcluir").value;
  const mensagemExcluir = document.getElementById("mensagem-excluir");

  fetch('../controller/cadastroUsuario/excluir_usuario.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `id=${id}`
  })
    .then(response => response.json())
    .then(data => {
      mensagemExcluir.innerText = data.success ? 'Usuário excluído com sucesso!' : 'Erro ao excluir usuário.';
      mensagemExcluir.classList.remove('alerta-sucesso', 'alerta-erro');
      mensagemExcluir.classList.add(data.success ? 'alerta-sucesso' : 'alerta-erro');
      mensagemExcluir.style.display = 'block';

      setTimeout(() => {
        mensagemExcluir.style.display = 'none';
        if (data.success) {
          fecharModalExcluir('modalCadastroUsuarioExcluir');
          location.reload();
        }
      }, 3000);
    })
    .catch(error => {
      mensagemExcluir.innerText = 'Erro ao excluir usuário.';
      mensagemExcluir.classList.remove('alerta-sucesso', 'alerta-erro');
      mensagemExcluir.classList.add('alerta-erro');
      mensagemExcluir.style.display = 'block';
      console.error('Erro:', error);
    });
});

//================== Editar usuários ==================//  
//Traz os dados do usuário
function editarUsuario(botao) {
  const linha = botao.closest("tr");
  const id = linha.cells[0].innerText;

  fetch(`../controller/cadastroUsuario/buscarModal_usuario.php?id=${id}`)
    .then(response => response.json())
    .then(usuario => {
      // Altere para os campos do formulário de edição
      // console.log(usuario)
      document.getElementById("codigo").value = usuario.ID_USUARIO;
      document.getElementById("editar_nome").value = usuario.USU_NOME;
      document.getElementById("editar_status").value = usuario.USU_STATUS;
      document.getElementById("editar_email").value = usuario.USU_EMAIL;

      abrirModal("modalCadastroUsuarioEditar");
    })
    // .catch(error => {
    //   console.error("Erro ao buscar dados do usuário:", error);
    //   alert("Erro ao buscar dados do usuário.");
    // });
    .catch(error => {
      const msgDiv = document.getElementById('mensagem-editar');
      msgDiv.className = 'alerta-mensagem alerta-erro';
      msgDiv.textContent = 'Erro na comunicação com o servidor.';
      msgDiv.style.display = 'block';

      console.error('Erro ao editar usuário:', error);

      setTimeout(() => {
        msgDiv.style.display = 'none';
      }, 3000);
    });
}

//Edita e Atualizar o dados do usuário
document.getElementById('formCadastroUsuarioEditar').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch('../controller/cadastroUsuario/editar_usuarios.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      const msgDiv = document.getElementById('mensagem-editar');
      msgDiv.className = 'alerta-mensagem'; // limpa classes anteriores
      msgDiv.style.display = 'block';
      msgDiv.textContent = data.message || (data.success ? 'Usuário editado com sucesso.' : 'Erro ao editar o usuário.');


      if (data.success) {
        msgDiv.classList.add('alerta-sucesso');
        setTimeout(() => {
          fecharModal('modalCadastroUsuarioEditar');
          location.reload();
        }, 3000);
      } else {
        msgDiv.classList.add('alerta-erro');
        setTimeout(() => {
          msgDiv.style.display = 'none';
        }, 3000);
      }
    })
});

//fehca modal
function fecharModalEditar(id) {
  document.getElementById(id).style.display = "none";
}

//================== FILTRO USUARIO ==================//

document.getElementById("formCadastroUsuarioFiltrar").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("../controller/cadastroUsuario/filtrar_usuarios.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((usuarios) => {
      const tabela = document.getElementById("tabelaUsuario");
      const msgDiv = document.getElementById("mensagem-filtrar");
      tabela.innerHTML = "";
      msgDiv.className = 'alerta-mensagem'; // limpa classes antigas
      msgDiv.style.display = 'block';

      if (usuarios.length === 0) {
        msgDiv.classList.add('alerta-erro');
        msgDiv.textContent = "Nenhum usuário encontrado.";
        setTimeout(() => msgDiv.style.display = 'none', 3000);
        return;
      }

      msgDiv.classList.add('alerta-sucesso');
      msgDiv.textContent = "Filtro aplicado com sucesso.";
      setTimeout(() => msgDiv.style.display = 'none', 3000);

      usuarios.forEach((user) => {
        const statusFormatado = user.USU_STATUS === 'A' ? 'Ativo' : 'Inativo';

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${user.ID_USUARIO}</td>
          <td>${user.USU_NOME}</td>
          <td>${user.USU_EMAIL}</td>
          <td>${statusFormatado}</td>
          <td>
            <button type="button" onclick="editarUsuario(this)" class="botaoFormulario">
              <img src="../imagens/lapis.png" alt="Editar" class="iconeFormulario">
            </button>
            <button type="button" onclick="excluirUsuario(this)" class="botaoFormulario">
              <img src="../imagens/x.png" alt="Excluir" class="iconeFormulario">
            </button>
          </td>
        `;
        tabela.appendChild(tr);
      });

      fecharModalFiltrar("modalCadastroUsuarioFiltrar");
    })
    .catch((error) => {
      const msgDiv = document.getElementById("mensagem-filtrar");
      msgDiv.className = 'alerta-mensagem alerta-erro';
      msgDiv.textContent = "Erro ao filtrar usuários.";
      msgDiv.style.display = 'block';
      setTimeout(() => msgDiv.style.display = 'none', 3000);
      console.error("Erro ao filtrar usuários:", error);
    });
});

// Função para limpar o formulário de filtro
function limparFormularioFiltrar() {
  document.getElementById("formCadastroUsuarioFiltrar").reset();
}

// Função para fechar o modal
function fecharModalFiltrar(id) {
  document.getElementById(id).style.display = "none";
}

