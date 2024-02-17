
import { createContext, useEffect, useState } from 'react';
import { HOST } from '../environments/host';

export const userContext = createContext({});

export const UserProvider = ({ children }) => {
    const [receitas, setReceitas] = useState([]);
    const [despesas, setDespesas] = useState([]);
    const [dashboard, setDashboard] = useState([]);
    const [ultimasMovimentacoes, setUltimasMovimentacoes] = useState([]);

    const getReceitas = async() => {
        const response = await fetch(HOST + 'transacoes/receitas');
        const data = await response.json();
        setReceitas(data);
    };

    const getDespesas = async() => {
        const response = await fetch(HOST + 'transacoes/despesas');
        const data = await response.json();
        setDespesas(data);
    }

    const getUltimasMovimentacoes = async() => {
        const response = await fetch(HOST + 'transacoes');
        const data = await response.json();
        setUltimasMovimentacoes(data);
    }

    const getDashboard = async() => {
        const response = await fetch(HOST + 'transacoes/dashboard');
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
