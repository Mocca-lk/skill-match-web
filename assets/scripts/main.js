// assets/scripts/main.js
import { buscarVagas, salvarPerfilLocalStorage, carregarPerfilLocalStorage } from "./dados.js";
import { criarContadorAnalises, obterMelhorVagaERecomendacao } from "./motor.js";
import { exibirMensagemStatus, renderizarCardDeVagas, renderizarDestaque } from "./ui.js";

// Instancia a closure do contador de análises
const registrarAnalise = criarContadorAnalises();

// Variável global de escopo do módulo para guardar as instâncias das vagas
let listaDeVagas = [];

document.addEventListener("DOMContentLoaded", async () => {
  // Elementos do DOM
  const formPerfil = document.getElementById("form-perfil");
  const containerVagas = document.getElementById("container-vagas");
  const containerDestaque = document.getElementById("container-destaque");

  // 1. Busca as vagas na inicialização
  listaDeVagas = await buscarVagas((status, msg) => {
    exibirMensagemStatus(status, msg, containerVagas);
  });

  // 2. Tenta carregar perfil prévio salvo no localStorage 
  const perfilSalvo = carregarPerfilLocalStorage();
  if (perfilSalvo) {
    document.getElementById("name").value = perfilSalvo.name || "";
    document.getElementById("area").value = perfilSalvo.area || "";
    document.getElementById("skills").value = perfilSalvo.skills ? perfilSalvo.skills.join(", ") : "";
    document.getElementById("experience").value = perfilSalvo.experience || 0;

    // Se já tinha dados salvos e as vagas foram carregadas, executa a análise
    if (listaDeVagas.length > 0) {
      executarProcessamento(perfilSalvo);
    }
  }

  // 3. Captura do Evento do Formulário
  formPerfil.addEventListener("submit", (event) => {
    event.preventDefault(); // Impede o reload da página

    const name = document.getElementById("name").value.trim();
    const area = document.getElementById("area").value.trim();
    const skillsInput = document.getElementById("skills").value.trim();
    const experience = parseInt(document.getElementById("experience").value, 10) || 0;

    if (!name || !skillsInput) {
      alert("Por favor, preencha os campos obrigatórios.");
      return;
    }

    // Transforma a string separada por vírgula em um Array
    const skillsArray = skillsInput.split(",").map(s => s.trim()).filter(s => s.length > 0);

    const perfil = {
      name,
      area,
      skills: skillsArray,
      experience
    };

    // Salva no localStorage
    salvarPerfilLocalStorage(perfil);

    // Processa a comparação com as vagas
    executarProcessamento(perfil);
  });

  // Função interna para orquestrar o motor e a UI
  function executarProcessamento(perfil) {
    if (listaDeVagas.length === 0) return;

    // Incrementa a closure
    const totalSessao = registrarAnalise();

    // Compara cada vaga com o perfil
    const resultados = listaDeVagas.map(vaga => {
      const analise = vaga.calcularCompatibilidade(perfil.skills);
      return { vaga, analise };
    });

    // Renderiza a lista de cards na tela (Corrigido para bater com o ui.js)
    renderizarCardDeVagas(resultados, containerVagas);

    // Calcula e renderiza o destaque da melhor vaga
    const dadosDestaque = obterMelhorVagaERecomendacao(resultados);
    renderizarDestaque(dadosDestaque, totalSessao, containerDestaque);
  }
});