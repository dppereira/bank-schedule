// Função para gerar números pseudo-aleatórios sem filtro
export function gerarPseudoAleatorio(semente, n) {
  let resultados = [];
  const modulo = Math.pow(2, 31) - 1;
  const multiplicador = 16807;
  const c = 1;
  let x = semente;

  for (let i = 0; i < n; i++) {
    x = (multiplicador * x + c) % modulo;
    resultados.push(x / modulo);
  }

  return resultados;
}

// Função para determinar o tipo do cliente com base no número pseudo-aleatório
export function determinarTipo(clienteAleatorio) {
  if (clienteAleatorio >= 0 && clienteAleatorio < 0.6) {
    return 1;
  } else if (clienteAleatorio >= 0.6 && clienteAleatorio < 0.9) {
    return 2;
  } else {
    return 3;
  }
}
