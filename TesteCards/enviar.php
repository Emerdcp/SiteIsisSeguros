<?php
//================== DADOS FO FORMULÁRIO ==================//
# composer init
# composer require phpmailer/phpmailer

use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';

header("Content-type: Application/json");
// if ($_SERVER["REQUEST_METHOD"] === "POST") {
$dados = (count($_POST) == 0) ? json_decode(file_get_contents("php://input"),true) : ($_POST);
if (isset($dados['enviar'])) {
    $mail = new PHPMailer();
    // Cria uma nova instância do PHPMailer
    $nome = $dados['nome'];
    $telefone = $dados['telefone'];
    $email = $dados['email'];
    $mensagem = $dados['mensagem'];

    $email_from = getenv("CONTROL_PROJ_EMAIL_MAIL");

    if (empty($email_from)) {
        http_response_code(400);
        die(json_encode([
            "Status" => "Alerta",
            "Message" => "E-mail de remetente para envio se encontra vazio.",
            "color-div" => "alert-danger"
        ]));
    }

    // Configura o servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->CharSet = 'UTF-8';
    $mail->Username = $email_from; // Insira aqui o e-mail que será utilizado para enviar a mensagem
    $mail->Password = getenv("CONTROL_PROJ_EMAIL_PWD"); // Insira aqui a senha do e-mail
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $destinatario_email = "emersoncarvalho@hotmail.com.br"; //$dados['email_enviar']
    if (empty($destinatario_email)) {
        http_response_code(400);
        die(json_encode([
            "Status" => "Alerta",
            "Message" => "E-mail do destinatário se encontra vazio.",
            "color-div" => "alert-danger"
        ]));
    }

    // Configura o remetente
    $mail->setFrom($email_from, 'ISIS - Site');//Nome do emial que está enviando 
    
    // Configura o destinatário
    $mail->addAddress($destinatario_email);
    //$mail->addCC("suporte@vlcorrea.com.br", "Suporte");

    // Configura o assunto
    $mail->Subject = 'Proposta Site';

    // Configura o corpo da mensagem Colocar a mesangem e colocar o campo para envio
    $mail->Body = "Solicitação de Proposta Via Site. <br>Nome: $nome. <br>Telefone: $telefone. <br>e-mail: $email.<br>Assunto: $mensagem";

    // Configura o corpo da mensagem em texto simples, caso o destinatário não aceite HTML
    $mail->AltBody = "Solicitação de Proposta Via Site. <br>Nome: $nome. <br>Telefone: $telefone. <br>e-mail: $email.<br>Assunto: $mensagem";

    // Envia o e-mail
    if(!$mail->send()) {
        http_response_code(400);
        die(json_encode([
            "Status" => "Alerta",
            "Message" => "Não foi possível enviar o e-mail: " . $mail->ErrorInfo,
            "color-div" => "alert-danger"
        ]));
    } else {
        http_response_code(201);
        die(json_encode([
            "Status" => "Sucesso",
            "Message" => 'E-mail enviado com sucesso!',
            "color-div" => "alert-success"
        ]));
    }
}

?>
