Para conectar seu site a um banco de dados usando **XAMPP** localmente e depois preparar para subir para um provedor de hospedagem, o ideal é usar **PHP** como ponte entre o front-end (HTML/CSS/JavaScript) e o banco de dados (MySQL). JavaScript puro **não pode** acessar diretamente o banco de dados por questões de segurança e arquitetura.

Aqui está um **passo a passo completo** para isso:

---

## ✅ 1. Criar o Banco de Dados no XAMPP (phpMyAdmin)

1. Abra o **XAMPP Control Panel**.
2. Inicie os serviços **Apache** e **MySQL**.
3. Acesse [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
4. Clique em "**Novo**" e crie um banco de dados, por exemplo: `meusite_db`.
5. Crie uma tabela, por exemplo: `usuarios` com campos como:

   * `id` (INT, AUTO\_INCREMENT, PRIMARY KEY)
   * `nome` (VARCHAR)
   * `email` (VARCHAR)

---

## ✅ 2. Criar o Arquivo de Conexão com o Banco de Dados (PHP)

Crie um arquivo chamado `config.php` ou `conexao.php`:

```php
<?php
$servidor = "localhost";
$usuario = "root";
$senha = "";
$banco = "meusite_db";

$conn = new mysqli($servidor, $usuario, $senha, $banco);

// Verifica conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}
?>
```

---

## ✅ 3. Exemplo de Uso do Banco (Inserir um registro)

Crie um arquivo `inserir.php`:

```php
<?php
include 'config.php';

$nome = $_POST['nome'];
$email = $_POST['email'];

$sql = "INSERT INTO usuarios (nome, email) VALUES ('$nome', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "Registro inserido com sucesso!";
} else {
    echo "Erro: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
```

---

## ✅ 4. Formulário HTML para Testar

Crie um arquivo `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Cadastro</title>
</head>
<body>
    <form action="inserir.php" method="POST">
        <label>Nome: <input type="text" name="nome" required></label><br>
        <label>Email: <input type="email" name="email" required></label><br>
        <button type="submit">Enviar</button>
    </form>
</body>
</html>
```

---

## ✅ 5. Subir para o Provedor de Hospedagem

Quando você for publicar o site:

### 📌 Banco de Dados

* Crie o banco de dados no painel do seu provedor (como cPanel).
* Anote os dados: **host**, **nome do banco**, **usuário**, **senha**.

### 📌 Atualizar o `config.php`:

```php
$servidor = "servidor_do_provedor"; // exemplo: "mysql.hostinger.com"
$usuario = "usuario_provedor";
$senha = "senha_provedor";
$banco = "nome_do_banco_provedor";
```

### 📌 FTP

* Envie seus arquivos `.html`, `.php` etc. via FTP ou pelo Gerenciador de Arquivos do provedor.

---

## 🔒 Segurança (Importante)

* Nunca exponha o banco diretamente em JavaScript.
* Use prepared statements (com `mysqli_prepare` ou `PDO`) para evitar SQL Injection.
* Coloque `config.php` fora da pasta pública se possível.

---

Se quiser, posso te ajudar a criar um arquivo `config.php` adaptável (local + produção). Deseja isso?
