import React, { useRef, useState } from 'react';
import { HOST } from '../../environments/host';
import { useReactToPrint } from 'react-to-print';

// Import utilities

function RelatoriosCard() {

  const contentDocument = useRef(null);
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [data, setData] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => contentDocument.current,

  })

  const buscarTransacoes = async () => {

    if (mes === '' || ano === '') {
      alert('Selecione o mês e o ano');
      return;
    }

    console.log("Buscando")

    // Busca as transações
    const response = await fetch(`${HOST}transacoes/relatorio?mes=${mes}&ano=${ano}`)
    const data = await response.json();
    console.log(data);

    // downloadPDF(data);
    setData(data);

  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Baixar Relatórios</h2>
      </header>
      <div className='flex flex-col items-center'>


        <div className='w-full flex flex-col p-2 items-center'>
          <span className='w-full text-center'>Mes</span>
          <select name="" id="" value={mes} onChange={(e) => setMes(e.target.value)} className="border border-slate-100 dark:border-slate-700 rounded-md p-2 m-2 w-3/4">
            <option>Selecione o Mês</option>
            <option value="01">Janeiro</option>
            <option value="02">Fevereiro</option>
            <option value="03">Março</option>
            <option value="04">Abril</option>
            <option value="05">Maio</option>
            <option value="06">Junho</option>
            <option value="07">Julho</option>
            <option value="08">Agosto</option>
            <option value="09">Setembro</option>
            <option value="10">Outubro</option>
            <option value="11">Novembro</option>
            <option value="12">Dezembro</option>
          </select>
        </div>

        <div className='w-full flex flex-col p-2 items-center'>
          <span className='w-full text-center'>Ano</span>
          <select value={ano} onChange={(e) => setAno(e.target.value)} name="" id="" className="border border-slate-100 dark:border-slate-700 rounded-md p-2 m-2 w-3/4">
            <option>Selecione o Ano</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>



        <div className='w-full flex flex-col p-2 items-center'>
          <button className='bg-green-500 text-white p-2 rounded-md w-3/4 hover:bg-green-600'
            onClick={buscarTransacoes}
          >Gerar Relatório</button>

          <button className={data ? 'bg-blue-500 text-white p-2 rounded-md w-3/4 hover:bg-blue-600 mt-2' : 'hidden'}
            onClick={handlePrint}
          >
            Baixar Relatório
          </button>
        </div>

      </div>

      <div className={data ? 'w-full flex flex-col p-10  items-center gap-4 bg-white dark:bg-slate-800 rounded-b-sm h-full pb-10' : 'hidden'} ref={contentDocument}>

        <div className='w-full flex flex-col p-2 items-center'>
          <h1 className='text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-2' >Relatório de Controle de Caixa</h1>
          <span>{`Esse relatório foi gerado na data: ${new Date().getDate().toString().padStart(2, '0')}/${(new Date().getMonth() + 1).toString().padStart(2, '0')}/${new Date().getFullYear()}`}</span>
          <span>{`Relatório referente a data: ${mes}/${ano}`}</span>
        </div>

        <div className='flex gap-3'>
          <div className='text-black font-semibold text-lg'>Saldo Inicial do Caixa: {data?.saldoInicial ? `R$${data.saldoInicial}` : "Sem Dados"}</div>
          <div className='text-green-600 font-semibold text-lg'>Saldo Final do Caixa: {data?.saldoFinal ? `R$${data.saldoFinal}` : "Sem Dados"}</div>
        </div>

        <div
          className="flex gap-3"
        >
          <div>Receitas: <span className='font-semibold'>R$ {data?.transacoes.filter((transacao) => transacao.tipo === 'receita').reduce((acc, transacao) => acc + transacao.valor, 0).toFixed(2)}</span></div>
          <div>Despesas: <span className='font-semibold'>R$ {data?.transacoes.filter((transacao) => transacao.tipo !== 'receita').reduce((acc, transacao) => acc + transacao.valor, 0).toFixed(2)}</span></div>
        </div>

        <table
          className="table-auto w-full"
        >
          <thead
            className="bg-gray-200 dark:bg-slate-800"
          >
            <tr
              className="text-left text-gray-100 bg-sky-600 dark:text-gray-400 p-1 border border-gray-400 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-900"
            >
              <th className='p-1'>Tipo</th>
              <th className='p-1'>Valor</th>
              <th className='p-1'>Descrição</th>
              <th className='p-1'>Pagamento</th>
              <th className='p-1'>Data</th>
            </tr>
          </thead>
          <tbody>
            {
              data?.transacoes.map((transacao) => {
                return (
                  <tr
                    className="text-left text-gray-600 bg-gray-100 dark:text-gray-400 p-2 border border-gray-400 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-900"
                  >
                    <td
                      className={transacao.tipo === 'receita' ? 'text-green-700 p-1 font-bold' : 'text-red-700 p-1 font-bold'}
                    >{transacao.tipo}</td>
                    <td className='font-bold'>R$ {transacao.valor.toFixed(2)}</td>
                    <td>{transacao.descricao}</td>
                    <td>{transacao.pagamento}</td>
                    <td className='font-bold'>{
                      `${new Date(transacao.data).getDate().toString().padStart(2, '0')}/${(new Date(transacao.data).getMonth() + 1).toString().padStart(2, '0')}/${new Date(transacao.data).getFullYear()}`
                    }</td>
                  </tr>
                )
              }
              )
            }
          </tbody>
        </table>

        <span>Igreja A Voz de Cristo no Brasil: Jardim Florianópolis</span>

        <div
          className="flex flex-col gap-2 pt-10"
        >
          <span>_________________________________________________________</span>
          <span>Assinatura do Tesoureiro</span>
        </div>
      </div>
    </div>
  );
}

export default RelatoriosCard;
