Integrar um banco de dados em um site com HTML envolve vários passos, e a **infraestrutura** necessária depende de qual tipo de banco você está usando e como deseja fazer a comunicação entre o frontend (HTML, JavaScript) e o backend (servidor, banco de dados).

Aqui, vou te mostrar um **fluxo básico** para integração com um banco de dados usando **Node.js** e **MySQL**. Isso pode ser adaptado para outros bancos de dados como PostgreSQL, MongoDB, etc.

### **1. Escolher o Banco de Dados**

Primeiro, escolha um banco de dados para armazenar suas informações. **MySQL** e **PostgreSQL** são muito comuns para sistemas relacionais, mas vou demonstrar com **MySQL**. Também é possível usar **MongoDB** se for um banco NoSQL.

### **2. Criar Backend com Node.js**

O backend vai ser responsável por conectar ao banco de dados, fazer consultas e retornar resultados para o frontend via API (HTTP).

#### a) **Instalar o Node.js e MySQL (ou qualquer banco de dados que preferir)**

1. **Instalar o Node.js**: Vá até [https://nodejs.org](https://nodejs.org) e instale a versão mais recente.
2. **Instalar MySQL**:

   * Se você já tem o **MySQL** no seu servidor (ou ambiente local), você já está pronto para seguir em frente. Caso contrário, instale e crie um banco de dados.

#### b) **Configuração do Backend com Node.js e MySQL**

Aqui está um exemplo básico de um servidor Node.js que se conecta ao MySQL e faz consultas.

1. Crie uma pasta no seu projeto (por exemplo, `backend`) e dentro dela crie um arquivo `server.js`.
2. No terminal, inicialize um projeto Node.js:

   ```bash
   npm init -y
   ```
3. Instale o **MySQL** para o Node.js:

   ```bash
   npm install mysql
   ```
4. Agora, crie o arquivo `server.js` dentro da pasta `backend`:

```js
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// Configuração do banco de dados MySQL
const db = mysql.createConnection({
  host: 'localhost', // ou o IP do seu servidor de banco de dados
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'seu_banco_de_dados'
});

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados');
});

// Configuração para aceitar requisições JSON
app.use(express.json());

// Endpoint de exemplo para buscar dados do banco
app.get('/api/produtos', (req, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro na consulta ao banco' });
    }
    res.json(results);
  });
});

// Servir os arquivos estáticos (HTML, CSS, JS) da pasta "public"
app.use(express.static('public'));

// Inicializar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
```

Esse é um exemplo simples de um **servidor Node.js** que se conecta ao **MySQL** e cria um endpoint `/api/produtos` para retornar os produtos armazenados no banco.

#### c) **Criar a Estrutura de Banco de Dados**

Em seguida, crie uma tabela de exemplo no banco de dados. No seu MySQL, execute o seguinte comando SQL para criar uma tabela chamada `produtos`:

```sql
CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  descricao TEXT,
  preco DECIMAL(10, 2)
);
```

#### d) **Testando o Backend**

Execute o servidor com o comando:

```bash
node backend/server.js
```

Agora, se você acessar `http://localhost:3000/api/produtos`, deverá ver os dados retornados da tabela `produtos`.

---

### **3. Frontend em HTML e JavaScript**

Agora, vamos criar a parte **frontend** (HTML/JavaScript) para consumir a API que criamos.

Crie um arquivo `index.html` dentro da pasta `public`:

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Produtos</title>
</head>
<body>
    <h1>Lista de Produtos</h1>
    <div id="produtos-list"></div>

    <script>
        // Função para buscar os produtos da API
        fetch('/api/produtos')
            .then(response => response.json())
            .then(data => {
                const produtosList = document.getElementById('produtos-list');
                data.forEach(produto => {
                    const div = document.createElement('div');
                    div.innerHTML = `<h3>${produto.nome}</h3><p>${produto.descricao}</p><p>Preço: R$ ${produto.preco}</p>`;
                    produtosList.appendChild(div);
                });
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    </script>
</body>
</html>
```

Esse código HTML vai buscar a lista de produtos da API `/api/produtos` e exibi-los na página.

---

### **4. Subindo o Projeto para um Servidor (como Locaweb)**

#### a) **Preparar o Projeto**

* **Backend (Node.js)**: Quando estiver pronto para subir, você vai precisar de um ambiente com **Node.js** no servidor (como o **Locaweb** oferece).
* **Frontend (HTML)**: Certifique-se de que todos os arquivos da pasta `public` (HTML, CSS, JS) estejam prontos.

#### b) **Deploy do Backend no Servidor**

1. **Acessar o servidor via SSH**:
   Conecte-se ao seu servidor via SSH para poder copiar os arquivos para lá.

   ```bash
   ssh usuario@servidor
   ```
2. **Instalar o Node.js** no servidor (se não estiver instalado):

   * Para **Ubuntu**:

     ```bash
     sudo apt update
     sudo apt install nodejs npm
     ```
3. **Fazer upload dos arquivos do backend** para o servidor.

   * Você pode usar **FTP** ou **SFTP** para enviar os arquivos (usando algo como FileZilla ou WinSCP).
4. **Instalar dependências** no servidor:

   ```bash
   npm install
   ```
5. **Iniciar o servidor**:
   No servidor, execute:

   ```bash
   node server.js
   ```

#### c) **Subir o Frontend (HTML, CSS, JS)**

Os arquivos de frontend devem estar na pasta `public` ou onde você configurou. Suba esses arquivos diretamente para o servidor e configure o servidor web para servi-los (ex: **Apache** ou **Nginx**).

---

### **5. Conectando o Frontend ao Backend no Servidor**

* Quando o backend e o frontend estiverem no servidor, você precisa garantir que a URL da API do backend seja acessível ao frontend.

**Exemplo**: Suponha que você esteja rodando o backend na URL `http://localhost:3000`. No frontend (HTML), você faria um **request** para essa URL. Porém, quando for subir o projeto, você deve garantir que as URLs sejam corretas (por exemplo, usando o endereço IP público ou o nome do domínio).

---

### **6. Conclusão**

Agora você tem uma aplicação básica com:

* **Frontend** em HTML/JavaScript que consome dados via API.
* **Backend** em Node.js com conexão a um banco de dados (MySQL).
* **Deploy** em um servidor (como a Locaweb).

Esse é um fluxo básico. Se o seu servidor de hospedagem for **compartilhado**, talvez você precise de ajustes na configuração do **Node.js** ou utilizar um serviço adicional para rodar o backend (como **PM2**, **Nginx** como proxy reverso, ou o **cPanel**).

Se precisar de mais detalhes sobre **deploy específico** ou **ajustes no banco de dados**, me avise!
