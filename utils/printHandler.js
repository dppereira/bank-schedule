import config from "../data/params.json" with { type: 'json' };

// Exibição da tabela
export function exibirTabela(atendidos) {
  if (config.print) {
    console.log("\nTabela de Atendimento no Banco:\n");
    console.log(
      "+-------------+------+------------+------------+-----------------+------------------+------------------+-----------------+------------------+--------------------+-------------------+"
    );
    console.log(
      "| ID Cliente  | Tipo | TEC        | TS         | Tempo Chegada   | Início Serviço   | Fim Serviço      | Tempo na Fila   | Tempo no Sistema | Tempo Ocioso Func. | ID do Funcionário |"
    );
    console.log(
      "+-------------+------+------------+------------+-----------------+------------------+------------------+-----------------+------------------+--------------------+-------------------+"
    );

    atendidos.forEach((cliente) => {
      const tec = cliente.tec.toFixed(2);
      const ts = cliente.ts.toFixed(2);
      const chegada = cliente.chegada.toFixed(2);
      const inicioServico = cliente.inicioServico.toFixed(2);
      const fimServico = cliente.fimServico.toFixed(2);
      const tempoFila = cliente.tempoFila.toFixed(2);
      const tempoSistema = cliente.tempoSistema.toFixed(2);
      const tempoOciosoFuncionario = cliente.tempoOciosoFuncionario.toFixed(2);

      console.log(
        `| ${String(cliente.id).padStart(11)} | ${String(cliente.tipo).padStart(
          4
        )} | ${tec.padStart(10)} | ${ts.padStart(10)} | ${chegada.padStart(
          15
        )} | ${inicioServico.padStart(16)} | ${fimServico.padStart(
          16
        )} | ${tempoFila.padStart(15)} | ${tempoSistema.padStart(
          16
        )} | ${tempoOciosoFuncionario.padStart(18)} | ${String(
          cliente.funcionarioId
        ).padStart(17)} |`
      );
    });

    console.log(
      "+-------------+------+------------+------------+-----------------+------------------+------------------+-----------------+------------------+--------------------+-------------------+"
    );
  }
}
