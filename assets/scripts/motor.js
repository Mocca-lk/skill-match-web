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