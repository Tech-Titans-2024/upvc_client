import React from 'react'

import Logo from '../assets/upvc_logo.jpeg'
import { useNavigate } from 'react-router-dom'

const login = () => {
    const navigate = useNavigate()

    const handleLogin = () =>{
        navigate('/layout')
    }
    

    return (
        <div className="bg-gray-200 h-screen w-screen flex flex-row justify-center items-center">
            <div className="bg-teal-700 w-3/4 h-3/4 rounded-2xl flex flex-row justify-center items-center gap-20">
                <div className="w-2/5 h-4/4">
                    <img src={Logo} className="w-full h-96 rounded-xl" />
                </div>
                <div className="h-96 w-auto flex flex-row justify-center items-center">
                    <div className="flex flex-col gap-10">
                        <div className="flex flex-row gap-3">
                            <span className="font-bold flex flex-row items-center text-gray-200">USERNAME:</span>
                            <input
                                type="text"
                                className="w-80 p-3 rounded-xl border border-black-400"
                                placeholder="Username"
                            />
                        </div>
                        <div className="flex flex-row gap-3">
                            <span className="font-bold flex flex-row items-center text-gray-200">PASSWORD:</span>
                            <input
                                type="password"
                                className="w-80 p-3 rounded-xl border border-black-400"
                                placeholder="Password"
                            />
                        </div>
                        <div className="flex flex-row justify-center mt-5">
                            <button className="w-80 ml-24 p-3 bg-orange-500 rounded-xl text-white font-bold hover:bg-orange-600"
                            onClick={handleLogin}>
                                LOGIN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default login