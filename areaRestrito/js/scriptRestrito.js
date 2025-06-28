//================== ALTERAÇÃO DE PESSOA JURÍDICA E FÍSICA ==================//

function alternarTipoPessoa() {
  const selectTipo = document.getElementById("pfjr");
  const cpfDiv = document.getElementById("cpfDiv");
  const cnpjDiv = document.getElementById("cnpjDiv");

  if (!selectTipo || !cpfDiv || !cnpjDiv) return; // evita erro se ainda não estiver no DOM

  const tipo = selectTipo.value;

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

//================== ALTERAÇÃO DE PESSOA IE e RG ==================//

function alternarIerg() {
  const selectTipo = document.getElementById("ierg");
  const ieDiv = document.getElementById("ieDiv");
  const rgDiv = document.getElementById("rgDiv");

  if (!selectTipo || !ieDiv || !rgDiv) return; // evita erro se ainda não estiver no DOM

  const tipo = selectTipo.value;

  if (tipo === "F") {
    ieDiv.style.display = "block";
    rgDiv.style.display = "none";
  } else {
    ieDiv.style.display = "none";
    rgDiv.style.display = "block";
  }
}

// Chamada inicial para garantir o estado certo se estiver vindo preenchido
// document.addEventListener("DOMContentLoaded", alternarTipoIerg);

//================== Mascará para CFP e CNPJ ==================//4

// Máscara de CPF
function formatarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length > 11) cpf = cpf.slice(0, 11);
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, function (_, p1, p2, p3, p4) {
    return `${p1}.${p2}.${p3}-${p4}`;
  });
}

// Máscara de CNPJ
function formatarCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, "");
  if (cnpj.length > 14) cnpj = cnpj.slice(0, 14);
  return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, function (_, p1, p2, p3, p4, p5) {
    return `${p1}.${p2}.${p3}/${p4}-${p5}`;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const cpfInput = document.getElementById("cpf");
  const cnpjInput = document.getElementById("cnpj");

  if (cpfInput) {
    cpfInput.addEventListener("input", function () {
      this.value = formatarCPF(this.value);
    });
  }

  if (cnpjInput) {
    cnpjInput.addEventListener("input", function () {
      this.value = formatarCNPJ(this.value);
    });
  }
});
//================== Mascará para CEP ==================//

function formatarCEP(cep) {
  cep = cep.replace(/\D/g, "");
  if (cep.length > 8) cep = cep.slice(0, 8);
  return cep.replace(/(\d{2})(\d{3})(\d{0,3})/, function (_, p1, p2, p3) {
    return `${p1}.${p2}-${p3}`;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const cepInput = document.getElementById("cep");

  if (cepInput) {
    cepInput.addEventListener("input", function () {
      this.value = formatarCEP(this.value);
    });
  }
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

//================== PARA SAIR DA PÁGINA ==================//  

function abrirModalLogout() {
  document.getElementById('modalLogout').style.display = 'block';
}

function fecharModalLogout() {
  document.getElementById('modalLogout').style.display = 'none';
}

function confirmarLogout() {
  // Redireciona para logout.php
  window.location.href = '../logout.php';
  // window.location.href = location.pathname.includes('/areaRestrito/') ? 'logout.php' : 'areaRestrito/logout.php';
}

//================== CHAMA MENU ==================//  

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('menu-container');
  if (container) {
    fetch('../menu.php')
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data;
      })
      .catch(error => console.error('Erro ao carregar o menu:', error));
  }
});




// document.addEventListener("DOMContentLoaded", function () {
//   fetch('../menu.php')
//     .then(response => response.text())
//     .then(data => {
//       document.getElementById('menu-container').innerHTML = data;
//     })
//     .catch(error => console.error('Erro ao carregar o menu:', error));
// });




// fetch('../menu.php')
//   // fetch('/SiteIsisSeguros/AreaRestrito/menu.html')
//   .then(response => response.text())
//   .then(data => {
//     console.log(data)
//     document.getElementById('menu-container').innerHTML = data;
//   })
//   .catch(error => console.error('Erro ao carregar o menu:', error));





//     document.addEventListener('DOMContentLoaded', function () {
//   // fetch('../menu.html')
//   fetch('/SiteIsisSeguros/AreaRestrito/menu.html')
//     .then(response => response.text())
//     .then(data => {
//       const menuContainer = document.getElementById('menu-container');
//       if (menuContainer) {
//         menuContainer.innerHTML = data;
//       }
//     })
//     .catch(error => console.error('Erro ao carregar o menu:', error));
// });


//================== NOVO MENU ==================//  
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("collapsed");
  document.body.classList.toggle("menu-fechado");

}

if (window.location.pathname.includes("AreaRestrito")) {
  document.body.classList.add("restrito");
}

//================== ALTERANDO SETINHA DIREÇÃO QUANDO PASSANDO O MOUSE ==================//  

function toggleSubmenu(event) {
  event.preventDefault();

  const wrapper = event.target.closest(".submenu-wrapper");
  const submenu = wrapper.querySelector(".submenu");
  const arrow = wrapper.querySelector(".arrow");

  const isOpen = submenu.classList.contains("show");

  // Fecha todos
  document.querySelectorAll(".submenu").forEach(el => el.classList.remove("show"));
  document.querySelectorAll(".arrow").forEach(el => el.style.transform = "rotate(0deg)");

  // Se não estava aberto, abre
  if (!isOpen) {
    submenu.classList.add("show");
    arrow.style.transform = "rotate(180deg)";
  }
}






