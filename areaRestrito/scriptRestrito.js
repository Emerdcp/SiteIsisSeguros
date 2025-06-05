//================== MODAL PARA CADASTRO DE VEÍCULOS ==================//

// function abrirModal() {
//   document.getElementById("modalCadastro").style.display = "block";
// }

// function fecharModal() {
//   document.getElementById("modalCadastro").style.display = "none";
// }


function abrirModal(id) {
  document.getElementById(id).style.display = "block";
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
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

// function abrirModal() {
//   document.getElementById("modalCadastroCliente").style.display = "block";
// }

// function fecharModal() {
//   document.getElementById("modalCadastroCliente").style.display = "none";
// }

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



//================== ALTERAÇÃO DE PESSOA JURÍDICA E FÍSICA ==================//



function alternarTipoPessoa() {
  const tipo = document.getElementById("pfjr").value;
  const cpfDiv = document.getElementById("cpfDiv");
  const cnpjDiv = document.getElementById("cnpjDiv");

  if (tipo === "F") {
    cpfDiv.style.display = "block";
    cnpjDiv.style.display = "none";
  } else {
    cpfDiv.style.display = "none";
    cnpjDiv.style.display = "block";
  }
}

// Chamada inicial para garantir o estado certo se estiver vindo preenchido
document.addEventListener("DOMContentLoaded", alternarTipoPessoa);






















//================== CHAMADA DE ENDEREÇO POR CEP ==================//

function limpa_formulário_cep() {
  //Limpa valores do formulário de cep.
  document.getElementById('logradouro').value = ("");
  document.getElementById('bairro').value = ("");
  document.getElementById('cidade').value = ("");
  document.getElementById('estado').value = ("");
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
      //Atualiza os campos com os valores.
      document.getElementById('logradouro').value = (conteudo.logradouro);
      document.getElementById('bairro').value = (conteudo.bairro);
      document.getElementById('cidade').value = (conteudo.localidade);
      document.getElementById('estado').value = (conteudo.uf);
  } //end if.
  else {
      //CEP não Encontrado.
      limpa_formulário_cep();
      alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {

  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, '');

  //Verifica se campo cep possui valor informado.
  if (cep != "") {

      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

          //Preenche os campos com "..." enquanto consulta webservice.
          document.getElementById('logradouro').value = "...";
          document.getElementById('bairro').value = "...";
          document.getElementById('cidade').value = "...";
          document.getElementById('estado').value = "...";

          //Cria um elemento javascript.
          var script = document.createElement('script');

          //Sincroniza com o callback.
          script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

          //Insere script no documento e carrega o conteúdo.
          document.body.appendChild(script);

      } //end if.
      else {
          //cep é inválido.
          limpa_formulário_cep();
          alert("Formato de CEP inválido.");
      }
  } //end if.
  else {
      //cep sem valor, limpa formulário.
      limpa_formulário_cep();
  }
};
