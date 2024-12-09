import { Funcionario } from "../models/Funcionario.js";
import { Cliente } from "../models/Cliente.js";
import { gerarPseudoAleatorio } from "../controllers/generateControllers.js";
import { atenderCliente } from "../controllers/serviceControllers.js";
import {
  calcularTempoMedioEsperaFila,
  calcularMediaTempoSistema,
  calcularMediaOciosidade,
  calcularMediaTS,
} from "../utils/calcHandler.js";
import { exibirTabela } from "../utils/printHandler.js";

// Função para simular o banco
export function simularBanco(
  semente,
  numClientes,
  numFuncionarios,
  tempoMaximo
) {
  let funcionarios = [];
  let clientes = [];
  let fila = [];
  let tempoSimulacao = 0;

  // Criando os funcionários
  for (let i = 0; i < numFuncionarios; i++) {
    funcionarios.push(new Funcionario(i + 1));
  }

  // Definindo o tamanho total necessário para os números aleatórios
  const tamanhoTotal = numClientes * 3; // Três subconjuntos para Tipo, TEC, TS
  const numerosAleatorios = gerarPseudoAleatorio(semente, tamanhoTotal);

  // Dividindo o array em três partes para Tipo, TEC e TS
  const numerosAleatoriosTipo = numerosAleatorios.slice(0, numClientes);
  const numerosAleatoriosTEC = numerosAleatorios.slice(
    numClientes,
    numClientes * 2
  );
  const numerosAleatoriosTS = numerosAleatorios.slice(
    numClientes * 2,
    tamanhoTotal
  );

  // Criando os clientes com tipo determinado por números pseudo-aleatórios
  for (let i = 0; i < numClientes; i++) {
    let aleatorioTipo = numerosAleatoriosTipo[i];
    let aleatorioTEC = numerosAleatoriosTEC[i];
    let aleatorioTS = numerosAleatoriosTS[i];
    clientes.push(new Cliente(i + 1, aleatorioTipo, aleatorioTEC, aleatorioTS));
  }

  // Processando a simulação
  let atendidos = [];
  let i = 0;

  while (
    i < numClientes ||
    fila.length > 0 ||
    funcionarios.some((f) => !f.disponivel)
  ) {
    let cliente = clientes[i];

    // Atualiza o tempo de simulação para o próximo evento de chegada ou fim de atendimento
    tempoSimulacao = Math.min(
      cliente ? cliente.chegada : Infinity,
      ...funcionarios.map((f) => (f.disponivel ? Infinity : f.fimAtendimento))
    );

    // Processa a chegada do cliente se ele ainda existir e não tiver ultrapassado o tempo máximo
    if (i < numClientes && cliente.chegada <= tempoMaximo) {
      // Define a chegada do cliente
      if (i === 0) {
        cliente.chegada = cliente.tec;
      } else {
        cliente.chegada = clientes[i - 1].chegada + cliente.tec;
      }

      // Verificar se há um funcionário disponível
      let funcionarioDisponivel = funcionarios.find(
        (f) => f.disponivel && f.fimAtendimento <= cliente.chegada
      );

      if (funcionarioDisponivel) {
        atenderCliente(funcionarioDisponivel, cliente);
        atendidos.push(cliente);

        i++;
      } else {
        // Cliente vai para a fila apenas se o tempo de chegada for menor ou igual ao tempo máximo
        if (cliente.chegada <= tempoMaximo) {
          fila.push(cliente);
        }
        i++;
      }
    } else if (cliente && cliente.chegada > tempoMaximo) {
      // Quando o tempo máximo for atingido, interrompe a entrada de novos clientes
      i = numClientes;
    }

    // Verifica se algum funcionário terminou de atender e coloca um cliente da fila
    funcionarios.forEach((funcionario) => {
      if (
        !funcionario.disponivel &&
        funcionario.fimAtendimento <= tempoSimulacao
      ) {
        funcionario.disponivel = true;

        // Atende o próximo cliente da fila, se houver
        if (fila.length > 0) {
          let clienteFila = fila.shift(); // Retira o próximo cliente da fila
          atenderCliente(funcionario, clienteFila);
          atendidos.push(clienteFila);
        }
      }
    });
  }

  exibirTabela(atendidos);

  // Cálculo das médias
  let mediaFila = calcularTempoMedioEsperaFila(clientes);
  let mediaTS = calcularMediaTS(atendidos);
  let mediaSistema = calcularMediaTempoSistema(atendidos);
  let mediaOciosidade = calcularMediaOciosidade(funcionarios);

  return {
    mediaFila,
    mediaTS,
    mediaSistema,
    mediaOciosidade,
  };
}
