import React, { useContext, useState } from 'react';
import { userContext } from '../../context/userContext';

// Import utilities

function DashboardCard06() {
  const [valor, setValor] = useState(0.00);
  const [tipo, setTipo] = useState('receita');
  const [pagamento, setPagamento] = useState('dinheiro');
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState('');

  const { atualizarDados } = useContext(userContext);

  console.log(data)

  const enviar = async() => {
    const transacao = {
      valor,
      tipo,
      pagamento,
      descricao,
      categoria,
      data
    }

    Object.keys(transacao).forEach(key => {
      if (transacao[key] === ''){
        alert('Preencha todos os campos')
        return
      }
    })

    const response = await fetch("http://localhost:3000/transacoes", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transacao)
    })

    if (response.ok){
      alert('Transação Adicionada')
      setValor(0.00)
      setTipo('receita')
      setPagamento('dinheiro')
      setDescricao('')
      setCategoria('')
      setData('')
      atualizarDados()
    }
  }

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Adicionar nova transação</h2>
      </header>
      <div className='flex flex-col items-center'>


        <div className='w-full flex flex-col p-2 items-center'>
          <span className='w-full text-center'>Tipo</span>
          <select name="" id="" value={tipo} onChange={(e) => setTipo(e.target.value)} className="border border-slate-100 dark:border-slate-700 rounded-md p-2 m-2 w-3/4">
            <option value="receita">Receita</option>
            <option value="despesa">Despesa</option>
          </select>
        </div>

        <div className='w-full flex flex-col p-2 items-center'>
          <span className='w-full text-center'>Pagamento</span>
          <select value={pagamento} onChange={(e) => setPagamento(e.target.value)} name="" id="" className="border border-slate-100 dark:border-slate-700 rounded-md p-2 m-2 w-3/4">
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">Pix</option>
          </select>
        </div>

        <div className='w-full flex flex-col p-2 items-center'>
          <span className='w-full text-center'>Descrição</span>
          <input type="text" placeholder='Insira a Descrição' value={descricao} onChange={(e) => setDescricao(e.target.value)} className="border border-slate-100 dark:border-slate-700 rounded-md p-2 m-2 w-3/4" />
        </div>

        <div className='w-full flex flex-col p-2 items-center'>
          <span className='w-full text-center'>Valor</span>
          <div className='w-3/4 flex items-center p-2'
          >
            <span
              className='p-2 bg-slate-100 dark:bg-slate-700 rounded-l-md border border-slate-100 dark:border-slate-700 border-r-0'
            >R$</span>
            <input
              type='number'
              value={valor}
              step={0.01}
              onChange={(e) => setValor(e.target.value)}
              className="border border-slate-100 dark:border-slate-700 rounded-md w-full border-l-0"
            />
          </div>

          <div className='w-full flex flex-col p-2 items-center'>
            <span className='w-full text-center'>Categoria</span>
            <select name="" id="" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="border border-slate-100 dark:border-slate-700 rounded-md p-2 m-2 w-3/4">
              <option>Selecione a Categoria</option>
              {
                tipo === 'receita' ?
                  <>
                    <option value={1}>Dizimo</option>
                    <option value={6}>Oferta</option>
                    <option value={2}>Doação</option>
                    <option value={4}>Venda</option>
                    <option value={8}>Outras Receitas</option>
                  </>
                  :
                  <>
                    <option value={3}>Gastos Fixos</option>
                    <option value={5}>Gastos Variaveis</option>
                    <option value={7}>Outras Dispesas</option>
                  </>
              }


            </select>
          </div>

          <div className='w-full flex flex-col p-2 items-center'>
            <span className='w-full text-center'>Data</span>
            <input type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="border border-slate-100 dark:border-slate-700 rounded-md p-2 m-2 w-3/4" />
          </div>

          <div className='w-full flex flex-col p-2 items-center'>
            <button onClick={enviar} className='bg-green-500 p-2 rounded-md text-white w-3/4 hover:bg-green-600'>Enviar</button>
            </div>

        </div>


      </div>
    </div>
  );
}

export default DashboardCard06;
