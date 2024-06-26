import React, { useState } from 'react';

import Header from '../../partials/Header';
import Sidebar from '../../partials/Sidebar';
import RelatoriosCard from '../../partials/dashboard/RelatoriosCard';
function Relatorios() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

                        <RelatoriosCard />


                    </div>

                </main>
            </div>
        </div >
    );
}

export default Relatorios;