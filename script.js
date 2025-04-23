//================== FORMULÁRIO DE CONTATO ==================//


//--================== CHAVE CAPTCHA ==================
// src="https://www.google.com/recaptcha/api.js"


// function onSubmit(token) {
//   document.getElementById("demo-form").submit();
// }

//--================== CHAVE CAPTCHA - FIM ==================


document.getElementById('form-proposta').addEventListener('submit', function(e) {
    e.preventDefault();

    const data = {
      nome: document.getElementById("nome").value,
      telefone: document.getElementById("telefone").value,
      email: document.getElementById("email").value,
      mensagem: document.getElementById("mensagem").value,
      enviar: true
    }

    const form = document.getElementById('form-proposta');


    // Envia os dados para o arquivo PHP
    fetch('enviar-email.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.text())
    .then(data => {
      // console.log(data)
      // return
      // Aqui você pode verificar a resposta do servidor
      alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
      form.reset();
    })
    .catch(error => {
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
    });
});


//================== MODAL PARA CARDS ==================//

  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalTexto = document.getElementById("modal-texto");
    const closeModal = document.querySelector(".close");
  
    const conteudoModal = {
      auto: {
        titulo: "Seguro Auto",
        texto: `
        <br>
        <p>Nada melhor do que dirigir com tranquilidade, sabendo que seu veículo está protegido. Isso acontece quando você conta com um seguro de automóvel que considera seu perfil e oferece coberturas opcionais para você escolher de acordo com suas necessidades.</p>
        <p><b>E como isso acontece?</b></p>
        <p>Pense no seu perfil de motorista na hora de solicitar uma cotação - qual é sua idade? Qual o seu gênero - masculino ou feminino? Depois, procure um produto que tenha mais a ver com você, que considere essas características e avalie as coberturas que ele oferece.</p>
        <p><b>As coberturas básicas geralmente incluem:</b></p>
        <ul>
          <li>Colisão, incêndio e roubo/furto;</li>
          <li>Danos a terceiros;</li>
          <li>Proteção a passageiros.</li>
        </ul>
        <p><b>Entre as opcionais estão:</b></p>
        <ul>
          <li>Carro extra;</li>
          <li>Reembolso de despesas extraordinárias;</li>
          <li>Lucros cessantes;</li>
          <li>Seguro da franquia; </li>
          <li>Proteção aos vidros e aos acessórios e muito mais. </li>
          <li>Considere também que vantagens acompanham o produto que você escolher. Alguns oferecem serviços e benefícios não só para seu veículo, mas também para você, para sua residência e até para seu animal de estimação.</li>
        </ul>
        <p><b>Você poderá contar, por exemplo, com:</b></p>
        <ul>
          <li>Descontos em estacionamentos e em aluguel de veículos;</li>
          <li>Centros automotivos e oficinas referenciadas que oferecem descontos especiais;</li>
          <li>Assistência 24 horas em viagens nacionais e internacionais;</li>
          <li>Desconto extra na franquia;</li>
          <li>Consertos gratuitos em eletrodomésticos de linha branca e outros serviços à residência;</li>
          <li>Reparos em aparelhos de ar condicionado;</li>
          <li>Assistência para computador e para notebook;</li>
          <li>Descontos em clínicas veterinárias para seu animal de estimação;</li>
          <li>Descontos em restaurantes e em eventos culturais;</li>
          <li>Descontos em cursos de inglês e muito mais.</li>
          <li>Oferecemos consultoria para ajudar a encontrar o produto ideal. Juntos, faremos simulações e você poderá comparar as vantagens e os benefícios que cada um oferece.</li>
        </ul>
        <p>O seguro que você procura está aqui! Faça uma cotação agora mesmo e descubra como pode ser acessível estar em segurança.</p>
        
        `
      },
      previdencia: {
        titulo: "Previdência",
        texto: `
        <br>
        <p>Pense no seu futuro sem abrir mão do presente.</p>
        <p>A construção do futuro dependerá das decisões que você e a sua família tomam a</p>
        <p>Cada dia mais pessoas tem a consciência de que a aposentadoria é a transição para uma nova fase da vida, onde você ainda terá diversas conquistas, sonhos e realizações. A maior diferença residirá na origem da sua renda, que poderá ser bem diferente da que você possui hoje. Para viajar, se dedicar a novas atividades sociais e culturais, continuar contribuindo para as conquistas da sua família, ou mesmo descansar, você precisa se preparar.</p>
        <p>Quanto mais cedo, mais tranquila será esta transição e menos onerosas serão suas contribuições.</p>
        <p>Os produtos de previdência possuem flexibilidade e versatilidade para atender a diferentes necessidades e momentos financeiros.</p>
        <p>Você pode adotar uma contribuição que se encaixe no seu bolso e, depois, ir aumentando a medida que seus rendimentos evoluam. E você pode realizar contribuições adicionais (aportes), sempre que desejar.</p>
        <p>Você também pode investir em quem você mais ama, reservando recursos que poderão ser usados para pagar os estudos e conquistas dos seus filhos, netos ou qualquer pessoa com a qual você deseje contribuir para um futuro promissor e tranquilo com planos de previdência infantil.</p>
        <p><b>Planos que se adequam ao seu perfil</b></p>
        <p>Existem diferentes planos e fundos que respeitam os seus objetivos e perfil de risco.</p>
        <p>Você pode escolher fundos com papéis pós fixados (mais conservadores), de renda fixa e multimercados, com menor ou maior proporção de ações (mais agressivos).</p>
        <p>O mais importante aqui é ter em mente seus objetivos, horizonte de investimento e tolerância a flutuações de rentabilidade. O mais importante, é investir com consciência e disciplina no futuro que você e a sua família buscam.</p>
        <p>Simples de adquirir, completamente seguro. Descubra agora mesmo mais benefícios deste produto Porto.</p>
        <p><b>Planeje seu futuro com um dos planos de Previdência para você!</b></p>        
        `
      },
      residencial: {
        titulo: "Seguro Residencial",
        texto: `
        <br>
        <p>O <b>Seguro Residência Habitual</b> foi feito para garantir o seu patrimônio e superar suas expectativas.</p>
        <p>Além de todas as coberturas de um completo seguro residencial, com garantias que vão desde danos elétricos, incêndio e roubo até responsabilidade civil, ele oferece vários benefícios para você e sua casa.</p>
        <p>Sua residência habitual ou de veraneio estará sempre protegida.</p>
        <p><b>Coberturas Básicas:</b></p>
        <ul>
          <li>Incêncio, Explosão e Fumaça.</li>
        </ul>
        <p><b>Coberturas Adicionais:</b></p>
        <ul>
          <li>Danos elétricos.</li>
          <li>Impacto de veículos.</li>
          <li>Vendaval, furacão, ciclone, tornado e queda de granizo.</li>
          <li>Quebra de vidros.</li>
          <li>Responsabilidade civil familiar.</li>
          <li>Subtração de bens.</li>
          <li>Escritório em residência.</li>
          <li>Perda ou pagamento de aluguel.</li>
          <li>Desmoronamento.</li>
          <li>Vazamento de tubulações.</li>
        </ul>
        <p>Somente para residências habituais e ocupadas.</p>
        <p>Cobertura válida também para residências de veraneio. Para informações detalhadas, exclusão de cobertura e restrição de contratação, consulte as condições gerais do produto.</p>
        <p>Este é mais um seguro feito para pessoas prevenidas, como você! Obtenha já uma cotação com nossa equipe.</p>
        `
      },
      condominio: {
        titulo: "Seguro para Condomínio",
        texto: `
        <br>
        <p>Um seguro sob medida para condomínios verticais residenciais, comerciais, mistos, de escritórios e/ou consultórios, flats e apart-hotéis, bem como condomínios residenciais horizontais. Com preço acessível e pagamento facilitado, ele oferece inúmeras vantagens.</p>
        <p>Ele é um seguro completo, oferece coberturas que protegem o condomínio, o síndico e os colaboradores, além de facilidades e benefícios na contratação, serviços emergenciais gratuitos, preços e condições de pagamentos vantajosos.</p>
        <p><b>Principais Vantagens:</b></p>
        <ul>
          <li>Descontos para renovação, sem sinistro.</li>
          <li>Ótimo custo benefício e pagamento facilitado.</li>
          <li>Desconto por agrupamentos de coberturas.</li>
          <li>Serviços emergenciais gratuitos.</li>
        </ul>
        <p>Pensou em seguro, realize agora mesmo uma cotação.</p>
        
        `
      },
      empresariais: {
        titulo: "Seguro Empresariais",
        texto: `
        <br>
        <p>O <b>Seguro Empresarial</b> cuida do seu patrimônio com eficiência, segurança e economia.</p>
        <p>Um seguro que oferece cobertura contra incêndio, fumaça e explosão, entre outras coberturas opcionais. Tudo para oferecer mais proteção para seu estabelecimento comercial, industrial ou de prestação de serviços.</p>
        <p>Com o Seguro Empresa, você terá muito mais tempo e segurança para pensar no que realmente importa: o crescimento dos seus negócios.</p>
        <p><b>Principais Vantagens:</b></p>
        <ul>
          <li>Reparos Emergenciais para sua Empresa;</li>
          <li>Linha completa de Coberturas Opcionais;</li>
          <li>Descontos especiais;</li>
          <li>Permite a contratação de mais de um local por apólice.</li>
        </ul>
        `
      }
    };
  
    cards.forEach(card => {
      card.addEventListener("click", () => {
        const produto = card.getAttribute("data-produto");
        const conteudo = conteudoModal[produto];
  
        if (conteudo) {
          modalTitle.textContent = conteudo.titulo;
          modalTexto.innerHTML = conteudo.texto;
          modal.style.display = "block";
        }
      });
    });
  
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  
//================== MODAL PARA ASSISTEÊNCIA 24HS ==================//

  const btnAssistencia = document.getElementById("btn-assistencia");
  const modalAssistencia = document.getElementById("modal-assistencia");
  const fecharAssistencia = document.getElementById("fechar-assistencia");

  btnAssistencia.addEventListener("click", (e) => {
    e.preventDefault();
    modalAssistencia.style.display = "block";
  });

  fecharAssistencia.addEventListener("click", () => {
    modalAssistencia.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modalAssistencia) {
      modalAssistencia.style.display = "none";
    }
  });

//================== LIMPA CAMPO NO FORMULÁRIO ==================//

  function limparFormulario() {
    document.getElementById("form-proposta").reset();
  }

//================== PADRONIZAÇÃO PARA TELEFONE ==================//

const telefoneInput = document.getElementById("telefone");

  telefoneInput.addEventListener("input", function (e) {
    let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número

    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

    // Aplica máscara (XX) XXXXX-XXXX
    if (valor.length > 6) {
      valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    } else if (valor.length > 2) {
      valor = valor.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      valor = valor.replace(/(\d*)/, "($1");
    }

    e.target.value = valor;
  });

//================== CONFIGURAÇÃO E-MAIL ==================//

  function validarEmail() {
    const email = document.getElementById("email").value;
    
    // Expressão regular para validar email
    const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      alert("❌ E-mail inválido! Use o formato: exemplo@dominio.com");
      return false; // Impede o envio do formulário
    }

    // Se estiver tudo certo
    return true;
  }

//================== CARREGA MAIS ==================//

