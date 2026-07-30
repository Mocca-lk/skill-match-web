export class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos; 
    this.salario = salario;
    this.modalidade = modalidade;
  }

  calcularCompatibilidade(habilidadesCandidato) {
    // Prevenção caso usuário não informe habilidades
    if (!habilidadesCandidato || habilidadesCandidato.length === 0) {
      return {
        porcentagem: 0,
        statusCompatibilidade: "Baixa Compatibilidade 😪",
        nivel: "baixa",
        encontradas: [],
        faltantes: [...this.requisitos]
      };
    }
    
    const habilidadesCompativeis = this.requisitos.filter(requisito =>
      habilidadesCandidato.includes(requisito)
    );

    // Habilidades Faltantes
    const habilidadesFaltantes = this.requisitos.filter(requisito =>
      !habilidadesCandidato.includes(requisito)
    );

    // Porcentagem
    const totalRequisitosVaga = this.requisitos.length;
    const porcentagem = (habilidadesCompativeis.length / totalRequisitosVaga) * 100;

    // Status / Classificação
    let statusCompatibilidade = "";
    let nivel = "";
        if (porcentagem >= 80) {
      statusCompatibilidade = "Alta Compatibilidade 😎";
      nivel = "Alta";
    } else if (porcentagem >= 50) {
      statusCompatibilidade = "Média Compatibilidade 🫤";
      nivel = "Média";
    } else {
      statusCompatibilidade = "Baixa Compatibilidade 😪";
      nivel = "Baixa";
    }

    return {
      porcentagem: Math.round(porcentagem),
      statusCompatibilidade,
      nivel,
      encontradas: habilidadesCompativeis,
      faltantes: habilidadesFaltantes
    };
  }
}

//Herança
export class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade, senioridade = "Júnior") {
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.senioridade = senioridade;
  }

  // Método sobrescrito 
  obterRotulo() {
    return `${this.cargo} (${this.senioridade}) - ${this.empresa}`;
  }
}

//  (Closure - Contador de Análises)
export function criarContadorAnalises() {
  let contador = 0;
  return function() {
    contador++;
    return contador;
  };
}

export function obterMelhorVagaERecomendacao(resultadosAnalise) {
  if (!resultadosAnalise || resultadosAnalise.length === 0) return null;

  const melhorVaga = resultadosAnalise.reduce((acc, atual) => {
    return atual.analise.porcentagem > acc.analise.porcentagem ? atual : acc;
  });

  const recomendacao = melhorVaga.analise.faltantes.length > 0
    ? `Para aumentar suas chances na vaga (${melhorVaga.vaga.cargo}), estude: ${melhorVaga.analise.faltantes.join(", ")}.`
    : `Parabéns! Você cumpre 100% dos requisitos para a vaga ${melhorVaga.vaga.empresa}.`;

  return { melhorVaga, recomendacao };
}