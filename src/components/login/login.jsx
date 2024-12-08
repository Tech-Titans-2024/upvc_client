import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.jpeg';
import { useNavigate } from 'react-router-dom';

function Login() 
{
    const navigate = useNavigate();
    const passwordInputRef = useRef(null);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => 
    {
        if (id === 'ADMIN' && password === 'ADMIN') {
            navigate('/upvc');
        } 
        else {
            alert('Wrong Username or Password');
        }
    };

    const handleKeyPress = (e, field) => 
    {
        if (e.key === 'Enter') 
        {
            if (field === 'id') {
                passwordInputRef.current.focus();
            } 
            else if (field === 'password') {
                handleLogin();
            }
        }
    }

    return (
        <div className="w-screen h-screen flex">
            <div className="hidden md:flex w-1/2 bg-blue-600 justify-center items-center">
                <img
                    src={Logo}
                    alt="LOGO"
                    className="w-[400px] h-[330px] shadow-2xl shadow-black"
                />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white">
                <div className="w-[500px] p-8">
                    <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center font-cambria">
                        LOGIN TO YOUR ACCOUNT
                    </h1>
                    <p className="text-sm text-gray-500 mb-8 text-center">
                        Enter your Credentials to Access the Platform.
                    </p>
                    <input
                        className="w-full h-[50px] px-4 mb-10 text-lg border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        type="text"
                        placeholder="Enter Username"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'id')}
                    />
                    <input
                        className="w-full h-[50px] px-4 mb-10 text-lg border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => handleKeyPress(e, 'password')}
                        ref={passwordInputRef}
                    />
                    <div className="flex justify-end mb-10">
                        <span className="text-sm text-blue-600 cursor-pointer hover:underline">
                            Forgot Password?
                        </span>
                    </div>
                    <button
                        className="w-full h-[50px] bg-blue-600 text-white text-lg font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
                        onClick={handleLogin}
                    >
                        <FontAwesomeIcon icon={faLock} className="mr-2" />
                        <span className='font-cambria text-xl mt-0.5'>LOGIN</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;