//================== MODAL PARA CADASTRO DE VEÍCULOS ==================//

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("formCadastroVeiculos").addEventListener("submit", function (e) {
      e.preventDefault();
      const codigo = document.getElementById("codigo").value.trim();
      const descricao = document.getElementById("descricao").value.trim();
      const modelo = document.getElementById("modelo").value.trim();
  
      console.log("Capturado:", codigo, descricao, modelo);
  
      const novaLinha = document.createElement("tr");
      novaLinha.innerHTML = `
        <td>${codigo}</td>
        <td>${descricao}</td>
        <td>${modelo}</td>
      `;
  
      document.getElementById("tabelaVeiculos").appendChild(novaLinha);
      this.reset();
      fecharModal('');
    });
  });