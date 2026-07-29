// Carregamento de mensagens de exibição na tela
export function exibirMensagemStatus(status, txtMessage, container) {
    if (status === "carregando") {
        container.innerHTML = `<p class="status-msg">⏳ Carregando oportunidades...</p>`;
    } else if (status === "vazio") {
        container.innerHTML = `<p class="status-msg">⚠️ Nenhuma vaga encontrada no catálogo.</p>`;
    } else if (status === "erro") {
        container.innerHTML = `<p class="status-msg erro">❌ ${txtMessage}</p>`;
    }
}

export function renderizarCardDeVagas(resultadosAnalise, container) {
    container.innerHTML = ""; // Limpa os cards anteriores

    resultadosAnalise.forEach(({ vaga, analise }) => {
        const card = document.createElement("article");

        card.classList.add("card-vaga", analise.nivel.toLowerCase()); 
       
        card.innerHTML = `
        <h3>${vaga.obterRotulo()}</h3>
        <p><strong>Salário:</strong> R$ ${vaga.salario.toLocaleString("pt-BR")} | <strong>Modalidade:</strong> ${vaga.modalidade}</p>
        <p><strong>Classificação:</strong> ${analise.statusCompatibilidade}</p>
        <p><strong>Compatibilidade:</strong> ${analise.porcentagem}%</p>
        <p><strong>Habilidades Encontradas:</strong> ${analise.encontradas.join(", ") || "Nenhuma"}</p>
        <p><strong>Habilidades Faltantes:</strong> ${analise.faltantes.join(", ") || "Nenhuma"}</p>`;

        container.appendChild(card);
    });
}

export function renderizarDestaque(dadosDestaque, totalAnalises, container) {
    if (!dadosDestaque) {
        container.innerHTML = "";
        return;
    }

    const { melhorVaga, recomendacao } = dadosDestaque;

    container.innerHTML = `
    <div class="card-destaque">
      <h2>🎯 Melhor Opção para Você</h2>
      <p><strong>${melhorVaga.vaga.cargo}</strong> na empresa <strong>${melhorVaga.vaga.empresa}</strong> (${melhorVaga.analise.porcentagem}% de match)</p>
      <p>💡 <strong>Recomendação de Estudo:</strong> ${recomendacao}</p>
      <hr style="margin: 0.5rem 0; border: 0; border-top: 1px solid #e2e8f0;">
      <small>Análises realizadas nesta sessão: <strong>${totalAnalises}</strong></small>
    </div>`;
}