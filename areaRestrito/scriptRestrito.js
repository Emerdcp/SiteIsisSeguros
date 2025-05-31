//================== MODAL PARA CADASTRO DE VEÍCULOS ==================//

function abrirModal() {
  document.getElementById("modalCadastro").style.display = "block";
}

function fecharModal() {
  document.getElementById("modalCadastro").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("formCadastro").addEventListener("submit", function (e) {
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
    fecharModal();
  });
});
