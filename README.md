# Estrutura inicial do projeto:

📁 Estrutura de pastas
bash
SiteIsisSeguros
├── index.html
├── style.css
├── AreaRestrito
    ├── CadastroUsuario
        ├── Usuario.html
    ├── menu.html
    ├── styleRestrito.js
└── script.js
└── style.js


# 🛡️ ÍSIS Seguros - Página Institucional

Este é um projeto de site institucional para a corretora **ÍSIS Seguros**, desenvolvido utilizando **HTML5**, **CSS3**, **JavaScript** puro e o framework **Bootstrap 5** para responsividade. A página oferece informações sobre a empresa, seus produtos, formulário de contato, localização, assistência 24h e integração com o WhatsApp.

## 📌 Objetivo

Criar uma presença digital profissional para a corretora ÍSIS Seguros, facilitando o acesso a informações sobre seus serviços, produtos, contato direto com a equipe e suporte emergencial.

## 🧱 Estrutura do Projeto (HTML)

### 🔸 `<!DOCTYPE html>`  
Define o documento como HTML5.

### 🔸 `<head>`  
Inclui:
- Metadados (charset, viewport, favicon)
- Link para o CSS local (`style.css`)
- Link para o Bootstrap via CDN
- Comentários para possível integração com Google reCAPTCHA

### 🔸 `<body>`  
Organizado em seções funcionais:

#### ✅ **Header / Navbar**
- Logotipo da empresa
- Menu de navegação com links âncora para seções da mesma página
- Comportamento responsivo com `navbar-toggler` (Bootstrap)

#### ✅ **Sessão Hero / Destaque**
- Chamada principal com botão para "Solicitar Proposta"
- Imagem de fundo com sobreposição e CTA

#### ✅ **Seção "Quem Somos"**
- Texto institucional apresentando a empresa

#### ✅ **Seção "Produtos"**
- Cards com imagens, título e descrição de produtos (seguros Auto, Residencial, Empresarial, etc.)
- Navegação horizontal por botões de scroll
- Abertura de detalhes via modal (JavaScript)

#### ✅ **Seção de Contato**
- Formulário com campos: nome, telefone, email e mensagem
- Validação básica via HTML5
- Botões de envio e cancelamento
- Comentário para reativação do Google reCAPTCHA, se necessário

#### ✅ **Seção de Localização**
- Endereço da empresa com informações de contato
- Integração com Google Maps via `iframe`

#### ✅ **Rodapé**
- Direitos autorais
- Links para redes sociais (Facebook, Instagram)

#### ✅ **Modal de Assistência 24h**
- Modal com logos e links diretos para seguradoras parceiras

#### ✅ **Botão flutuante de WhatsApp**
- Link direto para contato via WhatsApp

## 🚀 Tecnologias Utilizadas

- **HTML5**: Estrutura e semântica da página
- **CSS3**: Estilização personalizada via `style.css`
- **Bootstrap 5**: Layout responsivo e componentes como navbar, grid e botões
- **JavaScript**: Funcionalidades como modais, scroll de cards e manipulação do DOM
- **Google Maps API**: Embutido com `iframe`
- **WhatsApp API**: Integração direta para atendimento

## 🖼️ Pré-visualização

Você pode abrir o arquivo `index.html` em qualquer navegador para visualizar o site localmente.

## 🔒 Observações

- O projeto está preparado para receber integração com CAPTCHA e backend em `PHP` (por exemplo, `enviar-email.php`).
- Todas as imagens e links são locais ou diretos (não há dependência de back-end neste código HTML).

## 📂 Estrutura de Arquivos Sugerida

├── index.html
├── style.css
├── script.js
├── imagens/
│ ├── logoIsisSeguro.png
│ ├── seguroAuto.jpg
│ ├── topo.png
│ └── ...demais imagens
├── seguradoras/
│ ├── hdi.html
│ ├── portoSeguro.html
│ └── ...


# Formulário de Contato e Funcionalidades Interativas

Este repositório contém um **formulário de contato** e outras funcionalidades interativas implementadas com **HTML**, **CSS** e **JavaScript**. O projeto oferece um formulário de envio com validações de e-mail, máscaras de telefone, modais interativos para exibir informações sobre produtos (seguros, previdência, etc.), e suporte para reCAPTCHA.

## Funcionalidades

### 1. **Formulário de Contato**
- O formulário coleta informações do usuário, incluindo **nome**, **telefone**, **e-mail** e **mensagem**.
- Através de uma requisição `POST`, os dados são enviados para o backend (`enviar-email.php`), que deverá ser configurado para processar o envio de e-mails.
- Após o envio bem-sucedido, uma mensagem de sucesso será exibida ao usuário, e o formulário será limpo automaticamente.

### 2. **Validação de E-mail**
- O formulário realiza a validação do e-mail usando uma expressão regular para garantir que o formato seja correto antes de enviar os dados.

### 3. **Máscara de Telefone**
- O campo de **telefone** tem uma máscara que segue o formato: `(XX) XXXXX-XXXX`.
- A máscara é aplicada automaticamente enquanto o usuário digita o número, garantindo que o formato esteja correto.

### 4. **Modais Interativos para Produtos**
- Modais são exibidos ao clicar nos **cards de produtos** (seguros, previdência, etc.).
- Cada produto (exemplo: "Seguro Auto", "Previdência", "Seguro Residencial") tem um modal com título e conteúdo informativo detalhado.
- O modal é fechado ao clicar no botão de fechar ou fora da área do modal.

### 5. **Assistência 24h**
- Um modal adicional oferece informações sobre a **assistência 24 horas**. Este modal pode ser aberto clicando no botão "Assistência" e fechado clicando no botão de fechamento ou fora do modal.

### 6. **Suporte para reCAPTCHA (Opcional)**
- A chave do **Google reCAPTCHA** está configurada no código, mas está comentada. Para usá-la, basta descomentar o código e configurar as chaves de API do Google.

### 7. **Limpeza do Formulário**
- Após o envio bem-sucedido do formulário, o código automaticamente limpa todos os campos do formulário.


