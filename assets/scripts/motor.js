// Classe base usando os seus atributos
export class Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos; 
    this.salario = salario;
    this.modalidade = modalidade;
  }

 //Método para calcular compaibilidade da vaga
  calcularCompatibilidade(habilidadesCandidato) {

    //Prevenção caso usuário não informe habilidades
    if (!habilidadesCandidato || habilidadesCandidato.length === 0) {
      return {
        porcentagem: 0,
        statusCompatibilidade:"Baixa Compatibilidade",
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
    if (porcentagem >= 80) {
      statusCompatibilidade = "Alta Compatibilidade 😎";
    } else if (porcentagem >= 50) {
      statusCompatibilidade = "Média Compatibilidade 🫤";
    } else {
      statusCompatibilidade = "Baixa Compatibilidade 😪";
    }

    return {
      porcentagem: Math.round(porcentagem),
      statusCompatibilidade,
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
 getRotulo() {
    return `${this.cargo} [${this.senioridade.toUpperCase()}] - ${this.empresa}`;
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

export function obterMelhorVagaERecomendacao(resultadosAnalise){
  if (!resultadosAnalise || resultadosAnalise.length === 0) return null;

  const melhorVaga = resultadosAnalise.reduce((acc, atual) => {
    return atual.analise.porcentagem > acc.analise.porcentagem ? atual : acc;
  });

const recomendacao = melhorVaga.analise.faltantes.length > 0
? `Para aumentar suas chances na vaga (${melhorVaga.Vaga.cargo}), estude: ${melhorVaga.analise.faltantes.join(", ")}.`
: `Parabéns! Você cumpre 100% dos requisitos para a vaga ${melhorVaga.Vaga.empresa}.`

return {melhorVaga, recomendacao};
}

