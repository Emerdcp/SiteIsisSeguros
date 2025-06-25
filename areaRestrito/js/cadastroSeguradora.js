//================== MODAL ABRIR E FECHAR ==================//

function abrirModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = "block";

  // Limpa o formulário ao abrir o modal
  const formulario = document.getElementById("formCadastroSeguradora");
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

//================== INSERIR DADOS ==================//

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formCadastroSeguradora");

  if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const mensagem = document.getElementById('mensagem-inserir');

    fetch('../controller/cadastroSeguradora/inserir_seguradora.php', {
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
            fecharModal('modalSeguradora');
            // location.reload(); // ou atualizar tabela
            buscarSeguradoras(); // função que carrega novamente a tabela sem recarregar a página
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
  }
    // Chama no carregamento da página
    buscarSeguradoras();
  });


  //================== BUSCAR SEGURADORAS ==================//

function buscarSeguradoras() {
  fetch('../controller/cadastroSeguradora/buscar_seguradora.php')
    .then(response => response.json())
    .then(data => {
      const tbody = document.getElementById('tabelaSeguradora');
      tbody.innerHTML = '';

      data.forEach(seguradora => {
        const tr = document.createElement('tr');
        const statusFormatado = seguradora.SEG_STATUS === 'A' ? 'Ativo' : 'Inativo';

        tr.innerHTML = `
          <td>${seguradora.ID_SEGURADORA}</td>
          <td>${seguradora.SEG_SEGURADORA}</td>
          <td>${statusFormatado}</td>
          <td>
            <button type="button" onclick="editarSeguradora(this)" class="botaoFormulario">
              <img src="../imagens/lapis.png" alt="Editar" class="iconeFormulario">
            </button>
            <button type="button" onclick="excluirSeguradora(this)" class="botaoFormulario">
              <img src="../imagens/x.png" alt="Excluir" class="iconeFormulario">
            </button>
          </td>
        `;

        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Erro ao buscar seguradora:', error);
    });

}
//================== Excluir Seguradora ==================//  


let idSeguradoraParaExcluir = null; // variável global temporária

function excluirSeguradora(botao) {
  const linha = botao.closest("tr");
  const id = linha.cells[0].innerText;
  idSeguradoraParaExcluir = id;

  // Coloca o ID no input hidden
  document.getElementById("idSeguradoraExcluir").value = id;

  // Esconde a mensagem anterior (se tiver)
  document.getElementById("mensagem-excluir").style.display = "none";

  // Abre o modal
  abrirModal('modalSeguradoraExcluir');
}

// função auxiliar fechar modar excluir

function fecharModalExcluir(id) {
  document.getElementById(id).style.display = "none";
}

//================== SUBMISSÃO DO FORMULÁRIO DE EXCLUSÃO ==================//

document.addEventListener("DOMContentLoaded", function () {
  const formExcluir = document.getElementById("formSeguradoraExcluir");

  if (formExcluir) {
    formExcluir.addEventListener("submit", function (e) {
      e.preventDefault();

      const id = document.getElementById("idSeguradoraExcluir").value;
      const mensagemExcluir = document.getElementById("mensagem-excluir");

      fetch('../controller/cadastroSeguradora/excluir_seguradora.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `id=${encodeURIComponent(id)}`
      })
        .then(response => response.json())
        .then(data => {
          mensagemExcluir.innerText = data.success
            ? 'Seguradora excluída com sucesso!'
            : (data.message || 'Erro ao excluir seguradora.');

          mensagemExcluir.classList.remove('alerta-sucesso', 'alerta-erro');
          mensagemExcluir.classList.add(data.success ? 'alerta-sucesso' : 'alerta-erro');
          mensagemExcluir.style.display = 'block';

          setTimeout(() => {
            mensagemExcluir.style.display = 'none';
            if (data.success) {
              fecharModalExcluir('modalSeguradoraExcluir');
              buscarSeguradoras(); // Atualiza a tabela sem reload
            }
          }, 3000);
        })
        .catch(error => {
          mensagemExcluir.innerText = 'Erro ao excluir seguradora.';
          mensagemExcluir.classList.remove('alerta-sucesso', 'alerta-erro');
          mensagemExcluir.classList.add('alerta-erro');
          mensagemExcluir.style.display = 'block';
          console.error('Erro:', error);
        });
    });
  }
});

//================== Editar Seguradora ==================//  
function editarSeguradora(botao) {
  const linha = botao.closest("tr");
  const id = linha.cells[0].innerText;

  fetch(`../controller/cadastroSeguradora/buscarModal_seguradora.php?id=${id}`)
    .then(response => response.json())
    .then(seguradora => {
      document.getElementById("codigo").value = seguradora.ID_SEGURADORA;
      document.getElementById("editar_seguradora").value = seguradora.SEG_SEGURADORA;
      document.getElementById("editar_status").value = seguradora.SEG_STATUS;

      abrirModal("modalSeguradoraEditar");
    })
    .catch(error => {
      const msgDiv = document.getElementById('mensagem-editar');
      msgDiv.className = 'alerta-mensagem alerta-erro';
      msgDiv.textContent = 'Erro na comunicação com o servidor.';
      msgDiv.style.display = 'block';

      console.error('Erro ao editar seguradora:', error);

      setTimeout(() => {
        msgDiv.style.display = 'none';
      }, 3000);
    });
}

// Edita e atualiza os dados da seguradora
document.getElementById('formSeguradoraEditar').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  fetch('../controller/cadastroSeguradora/editar_seguradora.php', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {
      const msgDiv = document.getElementById('mensagem-editar');
      msgDiv.className = 'alerta-mensagem';
      msgDiv.style.display = 'block';
      msgDiv.textContent = data.message || (data.success ? 'Seguradora editada com sucesso.' : 'Erro ao editar a seguradora.');

      if (data.success) {
        msgDiv.classList.add('alerta-sucesso');
        setTimeout(() => {
          fecharModal('modalSeguradoraEditar');
          location.reload();
        }, 3000);
      } else {
        msgDiv.classList.add('alerta-erro');
        setTimeout(() => {
          msgDiv.style.display = 'none';
        }, 3000);
      }
    });
});

// Fechar modal
function fecharModalEditar(id) {
  document.getElementById(id).style.display = "none";
}


//================== FILTRO SEGURADORA ==================//

document.getElementById("formSeguradoraFiltrar").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  fetch("../controller/cadastroSeguradora/filtrar_seguradora.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((seguradora) => {
      const tabela = document.getElementById("tabelaSeguradora");
      const msgDiv = document.getElementById("mensagem-filtrar");
      tabela.innerHTML = "";
      msgDiv.className = 'alerta-mensagem';
      msgDiv.style.display = 'block';
    
      if (seguradora.length === 0) {
        msgDiv.classList.add('alerta-erro');
        msgDiv.textContent = "Nenhuma seguradora encontrada.";
        setTimeout(() => msgDiv.style.display = 'none', 3000);
        return;
      }
    
      msgDiv.classList.add('alerta-sucesso');
      msgDiv.textContent = "Filtro aplicado com sucesso.";
      setTimeout(() => msgDiv.style.display = 'none', 3000);
    
      seguradora.forEach((seguradora) => {
        const statusFormatado = seguradora.SEG_STATUS === 'A' ? 'Ativo' : 'Inativo';
    
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${seguradora.ID_SEGURADORA}</td>
          <td>${seguradora.SEG_SEGURADORA}</td>
          <td>${statusFormatado}</td>
          <td>
            <button type="button" onclick="editarSeguradora(this)" class="botaoFormulario">
              <img src="../imagens/lapis.png" alt="Editar" class="iconeFormulario">
            </button>
            <button type="button" onclick="excluirSeguradora(this)" class="botaoFormulario">
              <img src="../imagens/x.png" alt="Excluir" class="iconeFormulario">
            </button>
          </td>
        `;
        tabela.appendChild(tr);
      });
    
      fecharModalFiltrar("modalSeguradoraFiltrar");
    })
    
    .catch((error) => {
      const msgDiv = document.getElementById("mensagem-filtrar");
      msgDiv.className = 'alerta-mensagem alerta-erro';
      msgDiv.textContent = "Erro ao filtrar seguradora.";
      msgDiv.style.display = 'block';
      setTimeout(() => msgDiv.style.display = 'none', 3000);
      console.error("Erro ao filtrar seguradora:", error);
    });
});

// Função para limpar o formulário de filtro
function limparFormularioFiltrar() {
  document.getElementById("formSeguradoraFiltrar").reset();
}

// Função para fechar o modal
function fecharModalFiltrar(id) {
  document.getElementById(id).style.display = "none";
}

