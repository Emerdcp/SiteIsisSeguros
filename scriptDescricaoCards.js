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
    <p>Dirija com tranquilidade, sabendo que seu veículo está protegido. Com um seguro de automóvel que se adapta ao seu perfil, você escolhe as coberturas que atendem às suas necessidades.</p>

    <p><b>Como funciona?</b></p>
    <p>Ao solicitar uma cotação, leve em conta seu perfil de motorista (idade, gênero) e escolha um produto que considere essas características. Avalie também as coberturas oferecidas.</p>

    <p><b>Coberturas básicas incluem:</b></p>
    <ul>
        <li>Colisão, incêndio e roubo/furto;</li>
        <li>Danos a terceiros;</li>
        <li>Proteção a passageiros.</li>
    </ul>

    <p><b>Coberturas opcionais:</b></p>
    <ul>
        <li>Carro extra;</li>
        <li>Reembolso de despesas extraordinárias;</li>
        <li>Lucros cessantes;</li>
        <li>Seguro da franquia;</li>
        <li>Proteção de vidros e acessórios.</li>
    </ul>

    <p><b>Vantagens adicionais podem incluir:</b></p>
    <ul>
        <li>Descontos em estacionamentos e aluguel de veículos;</li>
        <li>Assistência 24h em viagens nacionais e internacionais;</li>
        <li>Descontos em franquias e reparos em residências;</li>
        <li>Consultoria personalizada para escolher o melhor seguro.</li>
    </ul>

    <p>Faça uma cotação agora e descubra como é acessível garantir sua segurança e a do seu veículo.</p>
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
    },
    seguroCaminhao: {
    titulo: "Seguro Caminhões",
    texto: `
    <br>
    <p>O <b>Seguro Caminhões</b> garante coberturas e serviços que atendem a sua necessidade, tanto na estrada quanto fora dela.</p>
    <p>Além da proteção para o veículo, você conta com serviços residenciais que garantem a tranquilidade da sua família.</p>
    <p><b>Conheça as Coberturas:</b></p>
    <ul>
        <li><b>Total:</b> Cobertura de indenização integral e parcial decorrente de colisão, incêndio, roubo, furto e alagamento;</li>
        <li><b>Danos a Terceiros:</b>Cobertura para danos materiais e danos corporais decorrentes de acidentes com terceiros;</li>
        <li><b>Lucros Cessantes por Paralisação do Veículo:</b>Cobertura que prevê o pagamento de diárias no caso de acidente em que seja necessária a paralisação do veículo utilizado para trabalho;</li>
        <li><b>Acidentes Pessoais de Passageiros:</b>Cobertura para danos corporais causados aos passageiros em razão de acidente com o veículo segurado;</li>
        <li><b>Incêndio, Roubo e Furto:</b>Cobertura que garante o reembolso de despesas que você possa vir a ter em caso de sinistro de indenização integral, até o limite máximo previsto na apólice;</li>
    </ul>
    <ul>
    <p><b>Coberturas Adicinais:</b></p>
        <li><b>Isenção de Franquia no Primeiro Sinistro (Seguro da Franquia):</b>Cobertura que garante o pagamento integral da franquia no primeiro sinistro, quando os prejuízos ultrapassarem o valor da franquia estipulada na apólice;</li>
        <li><b>Lucros Cessantes por Paralisação do Veículo:</b>Cobertura que prevê o pagamento de diárias no caso de acidente em que seja necessária a paralisação do veículo utilizado para trabalho;</li>
        <li><b>Proteção aos Vidros:</b>Cobertura que prevê a troca ou reparo em caso de danos aos vidros, às lanternas, aos faróis e aos retrovisores;</li>
    </ul>
    `
    },
    seguroVida: {
    titulo: "Seguro de Vida Individual",
    texto: `
    <br>
    <p>O <b>Seguro Vida Individual</b> garante a sua tranquilidade e a de sua família, agora e no futuro.</p>
    <p>Pensando em sua qualidade de vida, você contará com a Rede de Benefícios que proporciona descontos em uma ampla rede de parceiros, como academias, farmácias, spas, clínicas de estética. Além disso, você tem descontos em teatro e gastronomia, assistência 24 horas em viagens e participa de sorteios mensais no valor de 12 mil reais.</p>
    <p>O <b>Seguro Vida Individual</b> oferece diversas opções de coberturas, para que você escolha as mais adequadas às suas necessidades. As Diárias por Incapacidade Temporária, por exemplo, são uma ótima solução para quem é autônomo ou profissional liberal. Além disso, o seguro valoriza o seu perfil, proporcionando descontos para mulheres e não fumantes.</p>
    <p>O <b>Seguro Vida Individual</b> pode ser contratado por pessoas em boas condições de saúde com idade entre 16 e 64 anos e tem opções de capitais entre 20mil e 2 milhões de reais.</p>
    <p>Valor bruto sem desconto de impostos.</p>
    <p><b>Principais Vantagens:</b></p>
    <ul>
        <li>Descontos em eventos;</li>
        <li>Assistência em Viagem;</li>
        <li>Titulo de Capitalização</li>
        </ul>
    <li>Simples de adquirir, completamente seguro. Descubra agora mesmo mais benefícios deste produto Porto.</li>
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