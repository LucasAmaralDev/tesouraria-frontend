import React, { useState } from 'react'
import { HOST } from '../environments/host'

export default function Login() {

    const [credenciais, setCredenciais] = useState({
        email: '',
        senha: ''
    })

    const handleLogin = async () => {
        const response = await fetch(`${HOST}account/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
            },
            body: JSON.stringify(credenciais)
        })

        

        const data = await response.json()

        if (response.ok) {
            localStorage.setItem('token', data.token)
            window.location.href = '/'
        }

        console.log(data)
    }


    return (
        <div className="h-screen bg-gray-200 py-20 p-4 md:p-20 lg:p-32 flex flex-col justify-center">
            <div className="max-w-sm bg-white rounded-lg overflow-hidden shadow-lg mx-auto">
                <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Tesouraria</h2>
                    <p className="text-gray-700 mb-6">Faça login com sua conta</p>
                    <div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2" for="username">Email</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Insira seu Email" value={credenciais.email} onChange={(e) => setCredenciais({ ...credenciais, email: e.target.value })} />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-bold mb-2" for="password">Senha</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Insira sua Senha" value={credenciais.senha} onChange={(e) => setCredenciais({ ...credenciais, senha: e.target.value })} />
                        </div>

                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleLogin}>Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
