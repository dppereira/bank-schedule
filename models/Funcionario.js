export class Funcionario {
  constructor(id) {
    this.id = id;
    this.ocio = 0; // Tempo ocioso
    this.disponivel = true; // Indica se o funcionário está disponível
    this.fimAtendimento = 0; // Hora em que o funcionário terminará o atendimento
    this.numAtendimentos = 0; // Número de atendimentos realizados
    this.atendendo = null; // Cliente que está sendo atendido
  }
}
