// Função de atendimento do cliente
export function atenderCliente(funcionario, cliente) {
  cliente.inicioServico = Math.max(cliente.chegada, funcionario.fimAtendimento);
  cliente.fimServico = cliente.inicioServico + cliente.ts;
  cliente.tempoFila = cliente.inicioServico - cliente.chegada;
  cliente.tempoSistema = cliente.ts + cliente.tempoFila;
  cliente.funcionarioId = funcionario.id;
  cliente.tempoOciosoFuncionario =
    cliente.inicioServico - funcionario.fimAtendimento;

  funcionario.ocio += cliente.tempoOciosoFuncionario;
  funcionario.numAtendimentos++;
  funcionario.disponivel = false;
  funcionario.fimAtendimento = cliente.fimServico;
  funcionario.atendendo = cliente;
}
