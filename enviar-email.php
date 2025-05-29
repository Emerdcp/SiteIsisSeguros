<?php
//================== DADOS FO FORMULÁRIO ==================//

use PHPMailer\PHPMailer\PHPMailer;
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createUnsafeImmutable(__DIR__);
$dotenv->load();

header("Content-type: Application/json");

$dados = json_decode(file_get_contents("php://input"), true);

if (isset($dados['enviar'])) {
    $mail = new PHPMailer();

    $nome = $dados['nome'];
    $telefone = $dados['telefone'];
    $email = $dados['email'];
    $mensagem = $dados['mensagem'];

    $email_from = getenv("CONTROL_EMAIL_MAIL");
    $email_password = getenv("CONTROL_EMAIL_APP_PASSWORD");

    if (empty($email_from) || empty($email_password)) {
        http_response_code(400);
        die(json_encode(["Status" => "Alerta", "Message" => "E-mail ou senha não configurados."]));
    }

    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->CharSet = 'UTF-8';
    $mail->Username = $email_from;
    $mail->Password = $email_password;
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->isHTML(true); // ✅ IMPORTANTE

    $mail->setFrom($email_from, 'ISIS - Site');
    $mail->addAddress("emersoncarvalho@hotmail.com.br");

    $mail->Subject = 'Proposta Site';
    $mail->Body = "Solicitação de Proposta Via Site.<br>Nome: $nome.<br>Telefone: $telefone.<br>E-mail: $email.<br>Mensagem: $mensagem";
    $mail->AltBody = "Solicitação de Proposta Via Site. Nome: $nome. Telefone: $telefone. E-mail: $email. Mensagem: $mensagem";

    if (!$mail->send()) {
        http_response_code(400);
        die(json_encode(["Status" => "Alerta", "Message" => "Erro: " . $mail->ErrorInfo]));
    } else {
        http_response_code(200);
        die(json_encode(["Status" => "Sucesso", "Message" => "Mensagem enviada com sucesso!"]));
    }
}



?>





