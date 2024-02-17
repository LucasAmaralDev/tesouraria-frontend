import React, { useContext } from 'react';
import { userContext } from '../../context/userContext';

export function UltimasEntradas() {

  const { receitas } = useContext(userContext);

  return (
    <div className="col-span-full bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Ultimas Entradas</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Descrição</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Pagamento</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Valor</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Data</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
              {/* Row */}
              {
                receitas.map((receita) => {

                  const [ano, mes, dia] = String(receita.data).split("-");

                  const dataMiddleware = new Date(ano, mes - 1, dia);

                  const dataFormatada = dataMiddleware.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });


                  return (
                    <tr>
                      <td className="p-2">
                        <div className="flex items-center">
                          <div className="text-slate-800 dark:text-slate-100">{receita.descricao}</div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{receita.pagamento}</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center text-emerald-500">R$ {
                        Number(receita.valor).toFixed(2).replace(".", ",")
                        }</div>
                      </td>
                      <td className="p-2">
                        <div className="text-center">{dataFormatada}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

