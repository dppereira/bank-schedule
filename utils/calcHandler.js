import { Logger } from "./Logger.js";

// Função para calcular o tempo médio de espera na fila
export function calcularTempoMedioEsperaFila(clientes) {
  const somaFila = clientes.reduce(
    (soma, cliente) => soma + cliente.tempoFila,
    0
  );
  const mediaFila = somaFila / clientes.length;

  Logger.log(`\nTempo Médio de Espera na Fila: ${mediaFila.toFixed(2)}`);

  return mediaFila;
}

// Função para calcular a média do tempo de serviço (TS)
export function calcularMediaTS(clientes) {
  const somaTS = clientes.reduce((soma, cliente) => soma + cliente.ts, 0);
  const mediaTS = somaTS / clientes.length;

  Logger.log(`\nTempo Médio de Serviço (TS): ${mediaTS.toFixed(2)}`);

  return mediaTS;
}

// Função para calcular a média do tempo no sistema
export function calcularMediaTempoSistema(atendidos) {
  const somaSistema = atendidos.reduce(
    (soma, cliente) => soma + cliente.tempoSistema,
    0
  );
  const mediaSistema = somaSistema / atendidos.length;

  Logger.log(`\nTempo Médio no Sistema: ${mediaSistema.toFixed(2)}`);

  return mediaSistema;
}

// Função para calcular a média de ociosidade por funcionário e total
export function calcularMediaOciosidade(funcionarios) {
  let totalOciosidade = 0;
  let totalAtendimentos = 0;

  Logger.log("\nTempo Médio Ocioso por Funcionário:");

  funcionarios.forEach((funcionario) => {
    // Verifica se o funcionário atendeu algum cliente
    if (funcionario.numAtendimentos > 0) {
      const mediaOciosidadeFuncionario =
        funcionario.ocio / funcionario.numAtendimentos;
      Logger.log(
        `Funcionário ID ${
          funcionario.id
        }: Média de Ociosidade = ${mediaOciosidadeFuncionario.toFixed(2)}`
      );
    } else {
      Logger.log(
        `Funcionário ID ${funcionario.id}: Não atendeu nenhum cliente.`
      );
    }

    totalOciosidade += funcionario.ocio;
    totalAtendimentos += funcionario.numAtendimentos;
  });

  // Calcula a média de ociosidade total se houver atendimentos
  const mediaOciosidadeTotal =
    totalAtendimentos > 0 ? totalOciosidade / totalAtendimentos : 0;

  Logger.log(`\nTempo Médio Ocioso Total: ${mediaOciosidadeTotal.toFixed(2)}`);

  return mediaOciosidadeTotal;
}

// Função para calcular o desvio padrão
export function calcularDesvioPadrao(numeros, media) {
  let sumQ = 0;
  for (let i = 0; i < numeros.length; i++) {
    sumQ += Math.pow(numeros[i] - media, 2);
  }
  return Math.sqrt(sumQ / (numeros.length - 1));
}

// Função para calcular o intervalo de confiança para a média
export function calcularIntervaloConfianca(medias, z = 1.96) {
  const n = medias.length;
  const media = medias.reduce((acc, val) => acc + val, 0) / n;
  const desvioPadrao = calcularDesvioPadrao(medias, media);
  const margemErro = z * (desvioPadrao / Math.sqrt(n));

  return {
    inferior: media - margemErro,
    superior: media + margemErro,
  };
}

// Funções para cálculo do TEC
export function calcularTEC(aleatorio) {
  return -15 * Math.log(aleatorio);
}

// Funções para cálculo do TS
export function calcularTS(tipo, aleatorio) {
  if (tipo === 1) return -15 * Math.log(aleatorio) + 15;
  else if (tipo === 2) return -40 * Math.log(aleatorio) + 30;
  else return -140 * Math.log(aleatorio) + 60;
}
