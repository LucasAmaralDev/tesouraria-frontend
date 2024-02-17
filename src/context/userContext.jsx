
import { createContext, useEffect, useState } from 'react';

export const userContext = createContext({});

export const UserProvider = ({ children }) => {
    const [receitas, setReceitas] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [dashboard, setDashboard] = useState([]);
    const [ultimasMovimentacoes, setUltimasMovimentacoes] = useState([]);

    const getReceitas = async() => {
        const response = await fetch('http://localhost:3000/transacoes/receitas');
        const data = await response.json();
        setReceitas(data);
    };

    const getDespesas = async() => {
        const response = await fetch('http://localhost:3000/transacoes/despesas');
        const data = await response.json();
        setDespesas(data);
    }

    const getUltimasMovimentacoes = async() => {
        const response = await fetch('http://localhost:3000/transacoes');
        const data = await response.json();
        setUltimasMovimentacoes(data);
    }

    const getDashboard = async() => {
        const response = await fetch('http://localhost:3000/transacoes/dashboard');
        const data = await response.json();
        setDashboard(data);
    }

    const atualizarDados = async() => {
        getUltimasMovimentacoes()
        getReceitas();
        getDespesas();
        getDashboard();
    }

    useEffect(() => {
        atualizarDados();
    }, [])

    return(
        <userContext.Provider value={{receitas, despesas, dashboard, ultimasMovimentacoes, atualizarDados}}>
            {children}
        </userContext.Provider>
    )
};
