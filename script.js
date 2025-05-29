//================== FORMULÁRIO DE CONTATO ==================//

document.getElementById('form-proposta').addEventListener('submit', async function(e) {
  e.preventDefault();

  // Obter os dados do formulário
  const data = {
    nome: document.getElementById("nome").value,
    telefone: document.getElementById("telefone").value,
    email: document.getElementById("email").value,
    mensagem: document.getElementById("mensagem").value,
    enviar: true
  };

  // Selecionar o formulário
  const form = document.getElementById('form-proposta');

  try {
      // Enviar os dados para o arquivo PHP
      const response = await fetch('enviar-email.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      // Verificar se a resposta foi bem-sucedida
      if (response.ok) {
        
          const responseData = await response.json();

          // Verificar o status da resposta
          if (responseData.Status === 'Sucesso') {
              alert('Mensagem enviada com sucesso! Em breve entraremos em contato.');
              form.reset(); // Limpar o formulário após envio bem-sucedido
          } else {
              alert(responseData.Message || 'Erro desconhecido. Tente novamente.');
          }
      } else {
          // Se o status HTTP não for OK
          alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
      }
  } catch (error) {
      // Captura de erros na requisição
      console.error('Erro ao enviar o formulário:', error);
      alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
  }
});

//================== MODAL PARA CARDS ANDANDO PARA OS LADOS ==================//

function scrollCards(direction) {
  const container = document.getElementById('cardsContainer');
  const scrollAmount = 300; // ajuste a distância do scroll aqui

  if (direction === 'left') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

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

//================== BARRA DE ROLAGEM ... DO CARDS ==================//

const cardsContainer = document.getElementById('cardsContainer');
const cardsWrapper = cardsContainer.querySelector('.cards');
function getCards() {
  return cardsWrapper.querySelectorAll('.card');
}
let currentIndex = 0;
let dotsContainer;
let totalPages = 0;

function createDots() {
  const cards = getCards();
  if (cards.length === 0) return;

  const cardWidth = getCardWidth();
  const containerWidth = cardsContainer.offsetWidth;

  if (cardWidth === 0 || containerWidth === 0) {
    setTimeout(createDots, 100);
    return;
  }

  const cardsPerView = Math.floor(containerWidth / cardWidth) || 1;
  totalPages = Math.ceil(cards.length / cardsPerView);

  // Corrige bug de não exibir último card quando só 1 "página" visível
  if (totalPages === 0) totalPages = 1;

  dotsContainer = document.querySelector('.dots-container');
  dotsContainer.innerHTML = '';

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === currentIndex) dot.classList.add('active');
    dot.dataset.index = i;
    dot.addEventListener('click', () => {
      currentIndex = i;
      scrollToCard();
    });
    dotsContainer.appendChild(dot);
  }
}

function scrollToCard() {
  const cards = getCards();
  if (cards.length === 0) return;

  const cardWidth = getCardWidth();
  const containerWidth = cardsContainer.offsetWidth;
  const totalWidth = cardsWrapper.scrollWidth;

  const cardsPerView = Math.floor(containerWidth / cardWidth) || 1;
  totalPages = Math.ceil(cards.length / cardsPerView);

  // Protege contra índices maiores que o total possível
  if (currentIndex > totalPages - 1) {
    currentIndex = totalPages - 1;
  }

  let targetScroll;

  // Se for a última página, garante que veja o último card totalmente
  if (currentIndex === totalPages - 1) {
    targetScroll = cardsWrapper.scrollWidth - cardsContainer.clientWidth;
  } else {
    targetScroll = cardWidth * cardsPerView * currentIndex;
  }

  cardsContainer.scrollTo({
    left: targetScroll,
    behavior: 'smooth'
  });

  updateDots();
}

function scrollCards(direction) {
  const cards = getCards();
  const cardWidth = getCardWidth();
  const containerWidth = cardsContainer.offsetWidth;
  const cardsPerView = Math.floor(containerWidth / cardWidth) || 1;
  totalPages = Math.ceil(cards.length / cardsPerView);
  const maxIndex = totalPages - 1;

    if (direction === 'left') {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = maxIndex; // loop para o final
    }
  } else if (direction === 'right') {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0; // loop para o início
    }
  }

  scrollToCard();
}

function getCardWidth() {
  const cards = getCards();
  const style = window.getComputedStyle(cardsWrapper);
  const gap = parseFloat(style.gap) || 0;
  return cards[0].offsetWidth + gap;
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[currentIndex]) {
    dots[currentIndex].classList.add('active');
  }
}

window.addEventListener('load', () => {
  createDots();
  scrollToCard();
});

window.addEventListener('resize', () => {
  createDots();
  scrollToCard();
});

/*✅ Ajuste extra: Aguarde renderização antes de calcular
Caso os cards estejam sendo inseridos dinamicamente (por exemplo, via JS), adicione este trecho após inserir os novos cards:*/
setTimeout(() => {
  createDots();
  scrollToCard();
}, 50);

//================== REDUÇÃO DO MENU QUANDO ROLA ==================//

window.addEventListener('scroll', function () {
  const logo = document.getElementById('logo');
  const navbar = document.querySelector('.navbar');
  const menuIcon = document.getElementById('menu-icon');
  const navbarNav = document.getElementById('navbarNav');

  if (window.scrollY > 50) {
    navbar.classList.add('navbar-shrink');
    logo.classList.add('logo-shrink');
    menuIcon.classList.add('icon-shrink');
    navbarNav.classList.add('navbar-collapse-shrink');
  } else {
    navbar.classList.remove('navbar-shrink');
    logo.classList.remove('logo-shrink');
    menuIcon.classList.remove('icon-shrink');
    navbarNav.classList.remove('navbar-collapse-shrink');
  }
});

//==================  SE MUDAR MENU TAMANHO MOLHAR O RESULTADO ==================//

window.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector('.navbar');
  const hero = document.querySelector('.hero');
  const navbarHeight = navbar.offsetHeight;

  hero.style.paddingTop = navbarHeight + 'px';
});

//==================  PARA FECHAR O MENU QUANDO CLICADO ==================//

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapse = document.querySelector('.navbar-collapse');

  navLinks.forEach(function(link) {
    link.addEventListener('click', function () {
      // Fecha o menu apenas se estiver aberto (útil para mobile)
      const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    });
  });
});