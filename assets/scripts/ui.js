export function renderizarCards(resultados, container) {
  container.innerHTML = ""; // Limpa a tela

  resultados.forEach(({ vaga, analise }) => {
    const card = document.createElement("article");
    card.classList.add("card-vaga");

    card.innerHTML = `
      <h3>${vaga.cargo}</h3>
      <p><strong>Empresa:</strong> ${vaga.empresa} (${vaga.modalidade})</p>
      <p><strong>Classificação:</strong> ${analise.statusCompatibilidade}</p>
      <p><strong>Compatibilidade:</strong> ${analise.porcentagem}%</p>
      <p><strong>Habilidades Encontradas:</strong> ${analise.encontradas.join(", ") || "Nenhuma"}</p>
      <p><strong>Habilidades Faltantes:</strong> ${analise.faltantes.join(", ") || "Nenhuma"}</p>
    `;

    container.appendChild(card);
  });
}