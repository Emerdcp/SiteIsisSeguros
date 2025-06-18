document.getElementById("formLogin").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;
    const mensagem = document.getElementById("mensagem-login");

    fetch("areaRestrito/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `usuario=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`
    })
        .then(response => response.json())
        .then(data => {
            mensagem.innerText = data.message;
            mensagem.classList.remove('alerta-sucesso', 'alerta-erro');
            mensagem.classList.add(data.success ? 'alerta-sucesso' : 'alerta-erro');
            mensagem.style.display = 'block';

            setTimeout(() => {
                if (data.success) {
                    window.location.href = data.redirect; // <-- redireciona aqui!
                } else {
                    mensagem.style.display = 'none';
                }
            }, 3000);
        })
        .catch(error => {
            mensagem.innerText = 'Erro ao tentar fazer login.';
            mensagem.classList.remove('alerta-sucesso', 'alerta-erro');
            mensagem.classList.add('alerta-erro');
            mensagem.style.display = 'block';
            console.error('Erro:', error);
        });
});
