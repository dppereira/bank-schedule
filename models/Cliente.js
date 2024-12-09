import { determinarTipo } from "../controllers/generateControllers.js";
import { calcularTEC, calcularTS } from "../utils/calcHandler.js";

export class Cliente {
  constructor(id, aleatorioTipo, aleatorioTEC, aleatorioTS) {
    this.id = id;
    this.tipo = determinarTipo(aleatorioTipo); // Tipo do cliente
    this.chegada = 0; // Hora de chegada
    this.inicioServico = 0; // Hora em que o atendimento começa
    this.fimServico = 0; // Hora em que o atendimento termina
    this.tempoFila = 0; // Tempo na fila
    this.tempoSistema = 0; // Tempo total no sistema (na fila + atendimento)
    this.aleatorioTipo = aleatorioTipo; // Número aleatório para o tipo
    this.aleatorioTEC = aleatorioTEC; // Número aleatório para TEC
    this.aleatorioTS = aleatorioTS; // Número aleatório para TS
    this.tec = calcularTEC(aleatorioTEC); // Calcular TEC usando a fórmula
    this.ts = calcularTS(this.tipo, aleatorioTS); // Calcular TS baseado no tipo
    this.funcionarioId = null; // ID do funcionário que atendeu
    this.tempoOciosoFuncionario = 0; // Tempo ocioso do funcionário antes do atendimento
  }
}
