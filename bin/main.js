import { simularBanco } from "./simulation.js";
import { calcularIntervaloConfianca } from "../utils/calcHandler.js";
import config from "../data/params.json" with { type: 'json' }; 

let medias = [];
// Executar simulação em batches
for (let i = config.sementeInicio; i < config.sementeFim; i++) {
  const resultado = simularBanco(
    i,
    config.numClientes,
    config.numFuncionarios,
    config.tempoMaximo
  );
  medias.push(resultado);
}

// Separação dos valores
const arrFilas = medias.map((result) => result.mediaFila).flat();
const arrTS = medias.map((result) => result.mediaTS).flat();
const arrSistema = medias.map((result) => result.mediaSistema).flat();
const arrOciosidade = medias.map((result) => result.mediaOciosidade).flat();

// Cálculo do intervalo de confiança
const intervaloFila = calcularIntervaloConfianca(arrFilas);
const intervaloTS = calcularIntervaloConfianca(arrTS);
const intervaloSistema = calcularIntervaloConfianca(arrSistema);
const intervaloOciosidade = calcularIntervaloConfianca(arrOciosidade);

console.log(
  `Intervalo de Confiança para o Tempo na Fila: [${intervaloFila.inferior.toFixed(
    2
  )}, ${intervaloFila.superior.toFixed(2)}]`
);
console.log(
  `Intervalo de Confiança para o Tempo de Serviço: [${intervaloTS.inferior.toFixed(
    2
  )}, ${intervaloTS.superior.toFixed(2)}]`
);
console.log(
  `Intervalo de Confiança para o Tempo no Sistema: [${intervaloSistema.inferior.toFixed(
    2
  )}, ${intervaloSistema.superior.toFixed(2)}]`
);
console.log(
  `Intervalo de Confiança para o Tempo em Ociosidade : [${intervaloOciosidade.inferior.toFixed(
    2
  )}, ${intervaloOciosidade.superior.toFixed(2)}]`
);
