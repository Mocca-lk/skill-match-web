# 🎯 SkillMatch - Análise de Compatibilidade de Vagas

O **SkillMatch** foi desenvolvido para conectar desenvolvedores e entusiastas da área tech às melhores vagas de trabalho disponíveis, calculando a taxa de compatibilidade do perfil com os requisitos das vagas em tempo real.

Projeto desenvolvido como atividade prática e avaliativa para o programa **SCTec**.

---

## 🚀 Funcionalidades

- **Mapeamento de Perfil:** Formulário interativo para cadastro de nome, área de atuação, experiência e habilidades técnicas.
- **Cálculo de Compatibilidade:** Algoritmo que analisa o conjunto de habilidades do usuário em relação aos requisitos das vagas disponíveis no catálogo.
- **Classificação Visual:** As vagas são categorizadas automaticamente com base na compatibilidade:
  - 🟢 **Alta Compatibilidade** (80% ou mais)
  - 🟡 **Média Compatibilidade** (entre 50% e 79%)
  - 🔴 **Baixa Compatibilidade** (abaixo de 50%)
- **Recomendação Destaque:** Exibe a melhor vaga encontrada e sugere quais tecnologias estudar para alcançar os 100% de match.
- **Persistência de Dados:** Salva os dados do perfil no `localStorage` do navegador para manter as informações em futuras visitas.
- **Contador de Sessão:** Acompanhamento de quantas análises foram realizadas durante a sessão atual (via JavaScript Closure).
- **Consumo de Dados Assíncrono:** Carregamento dinâmico do catálogo de vagas a partir de um arquivo `vagas.json` via `fetch` API.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica e acessível.
- **CSS3:** Estilização moderna, responsiva (Mobile-First) e variáveis CSS.
- **JavaScript (ES6+):** Arquitetura modular (`import`/`export`), Orientação a Objetos (Herança e Métodos), Closures e manipulação do DOM.
- **JSON:** Armazenamento do banco de dados simulado de vagas.

## Galeria de imagens - Projeto em Funcionamento:
<img src="/skill-match-web/assets/img/스크린샷 2026-07-29 172904.png"> <br>
<img src="/skill-match-web/assets/img/스크린샷 2026-07-29 173031.png"><br>
<img src="/skill-match-web/assets/img/스크린샷 2026-07-29 173141.png"><br>