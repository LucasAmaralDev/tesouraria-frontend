import React, { useContext, useState } from 'react';

import { userContext } from '../context/userContext';
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';
import { CardFinanceiro } from '../partials/dashboard/CardFinanceiro';
import { UltimasEntradas } from '../partials/dashboard/UltimasEntradas';
import { UltimasSaidas } from '../partials/dashboard/UltimasSaidas';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import { HistoricoMovimentacoes } from '../partials/dashboard/HistoricoMovimentacoes';
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { dashboard } = useContext(userContext)

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Welcome banner */}
            <WelcomeBanner />

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Line chart (Acme Plus) */}
              {
                Object.keys(dashboard).map((key, index) => {
                  return <CardFinanceiro descricao={key} valor={dashboard[key]} />
                })
              }
              <UltimasEntradas />
              <UltimasSaidas />
              <HistoricoMovimentacoes />

              

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;