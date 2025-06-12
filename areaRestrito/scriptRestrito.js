//================== MODAL ABRIR E FECHAR ==================//

function abrirModal(id) {
  document.getElementById(id).style.display = "block";
}

function fecharModal(id) {
  document.getElementById(id).style.display = "none";
}


//================== MODAL PARA CADASTRO DE VEÍCULOS ==================//

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

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("formCadastroCliente").addEventListener("submit", function (e) {
    e.preventDefault();
    
    // Corrigido: as variáveis devem corresponder aos IDs no HTML
    const codigo = document.getElementById("codigo").value.trim();
    const nome = document.getElementById("nome").value.trim();
    const tipoPessoa = document.getElementById("pfjr").value.trim();
    let documento = " ";

    if(tipoPessoa === "F"){
      documento = document.getElementById("cpf").value.trim();
    }else{
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
    fecharModal();
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



//================== Mascará para CFP e CNPJ ==================//4

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

// Máscara de CPF
function formatarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length > 11) cpf = cpf.slice(0, 11);
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, function(_, p1, p2, p3, p4) {
    return `${p1}.${p2}.${p3}-${p4}`;
  });
}

// Máscara de CNPJ
function formatarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "");
  if (cnpj.length > 14) cnpj = cnpj.slice(0, 14);
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, function(_, p1, p2, p3, p4, p5) {
    return `${p1}.${p2}.${p3}/${p4}-${p5}`;
  });
}

// Aplica as máscaras enquanto digita
document.addEventListener("DOMContentLoaded", function () {
  const cpfInput = document.getElementById("cpf");
  const cnpjInput = document.getElementById("cnpj");

  cpfInput.addEventListener("input", function () {
    this.value = formatarCPF(this.value);
  });

  cnpjInput.addEventListener("input", function () {
    this.value = formatarCNPJ(this.value);
  });
});


//================== Mascará para CEP ==================//4

function formatarCEP(cep) {
  cep = cep.replace(/\D/g, "");
  if (cep.length > 8) cep = cep.slice(0, 8);
  return cep.replace(/(\d{2})(\d{3})(\d{0,3})/, function(_, p1, p2, p3) {
    return `${p1}.${p2}-${p3}`;
  });
}

// Aplica a máscara de CEP enquanto digita
document.addEventListener("DOMContentLoaded", function () {
  const cepInput = document.getElementById("cep");

  cepInput.addEventListener("input", function () {
    this.value = formatarCEP(this.value);
  });
});












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
