<?php
use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';
// Define o tipo de resposta como JSON
header("Content-type: Application/json");

// Recupera os dados do formulário, seja via POST ou JSON
$dados = (count($_POST) == 0) ? json_decode(file_get_contents("php://input"),true) : ($_POST);

if (isset($dados['nome']) && isset($dados['telefone']) && isset($dados['email']) && isset($dados['mensagem'])) {
    $mail = new PHPMailer();
    
    // Define variáveis para os dados do formulário
    $nome = $dados['nome'];
    $telefone = $dados['telefone'];
    $email = $dados['email'];
    $mensagem = $dados['mensagem'];

    // Recupera o e-mail do remetente do arquivo .env
    $email_from = getenv("CONTROL_PROJ_EMAIL_MAIL");  // Exemplo: isissegurossite@gmail.com

    if (empty($email_from)) {
        http_response_code(400);
        die(json_encode([
            "Status" => "Alerta",
            "Message" => "E-mail de remetente para envio se encontra vazio.",
            "color-div" => "alert-danger"
        ]));
    }

    // Recupera a senha de aplicativo do arquivo .env
    $email_password = getenv("CONTROL_PROJ_EMAIL_APP_PASSWORD"); // A senha de aplicativo gerada pelo Google

    if (empty($email_password)) {
        http_response_code(400);
        die(json_encode([
            "Status" => "Alerta",
            "Message" => "Senha de aplicativo para o e-mail está vazia.",
            "color-div" => "alert-danger"
        ]));
    }

    // Configura o servidor SMTP do Gmail
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->CharSet = 'UTF-8';
    $mail->Username = $email_from;  // O e-mail de envio
    $mail->Password = $email_password;  // A senha de aplicativo
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // E-mail do destinatário (modifique conforme necessário)
    $destinatario_email = "emersoncarvalho@hotmail.com.br";

    if (empty($destinatario_email)) {
        http_response_code(400);
        die(json_encode([
            "Status" => "Alerta",
            "Message" => "E-mail do destinatário se encontra vazio.",
            "color-div" => "alert-danger"
        ]));
    }

    // Configura o remetente e destinatário
    $mail->setFrom($email_from, 'ISIS - Site'); // Nome do remetente
    $mail->addAddress($destinatario_email); // Destinatário

    // Configura o assunto
    $mail->Subject = 'Proposta Site';

    // Corpo do e-mail
    $mail->Body = "Solicitação de Proposta Via Site. <br>Nome: $nome. <br>Telefone: $telefone. <br>e-mail: $email.<br>Mensagem: $mensagem";

    // Corpo do e-mail em texto simples (caso o destinatário não aceite HTML)
    $mail->AltBody = "Solicitação de Proposta Via Site. Nome: $nome. Telefone: $telefone. E-mail: $email. Mensagem: $mensagem";

    // Envia o e-mail
    if (!$mail->send()) {
        http_response_code(400);
        die(json_encode([
            "Status" => "Alerta",
            "Message" => "Não foi possível enviar o e-mail: " . $mail->ErrorInfo,
            "color-div" => "alert-danger"
        ]));
    } else {
        http_response_code(200); // Sucesso
        die(json_encode([
            "Status" => "Sucesso",
            "Message" => 'E-mail enviado com sucesso!',
            "color-div" => "alert-success"
        ]));
    }
} else {
    // Se algum campo estiver vazio
    http_response_code(400);
    die(json_encode([
        "Status" => "Erro",
        "Message" => "Todos os campos precisam ser preenchidos.",
        "color-div" => "alert-danger"
    ]));
}
?>
