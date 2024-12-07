import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Logo from '../../assets/logo.jpeg'
import { useNavigate } from 'react-router-dom'

function Login() 
{
    const navigate = useNavigate();
    const passwordInputRef = useRef(null);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => 
    {
        if(id === 'ADMIN' && password === 'ADMIN')
        {
            navigate('/layout')
        }
        else {
            alert("Wrong Username or Password");
        }
    }

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
        <div className="w-screen h-screen bg-gradient-to-br from-teal-800 to-teal-600 flex justify-center items-center">
            <div className="w-[450px] h-[450px] p-2.5 rounded-tl-xl rounded-bl-xl border-r-2 border-black bg-white">
                <div className="w-full h-[100%] flex justify-center items-center">
                    <img src={Logo} alt="LOGO" className="bg-blue-800 w-full h-auto" />
                </div>
            </div>
            <div className="w-[450px] h-[450px] flex flex-col justify-center items-center gap-10 rounded-tr-xl rounded-br-xl bg-white">
                <span className="text-[28px] text-teal-700 font-bold font-arial">LOGIN TO YOUR ACCOUNT</span>
                <input
                    className="w-[75%] h-[50px] rounded-md border border-black text-[19px] pl-2"
                    type="text"
                    placeholder="Enter Username"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    onKeyPress={(e) => handleKeyPress(e, 'id')} 
                />
                <input
                    className="w-[75%] h-[50px] rounded-md border border-black text-[19px] pl-2"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    onKeyPress={(e) => handleKeyPress(e, 'password')}
                    ref={passwordInputRef} 
                  

                />
                <span className="text-[15px] text-blue-800 underline cursor-pointer">Forgot Password</span>
                <button
                    className="w-[77%] h-[50px] bg-teal-700 text-[20px] font-bold text-white rounded-md flex justify-center items-center border-none cursor-pointer font-serif tracking-wide"
                    onClick={handleLogin}
                >
                    <FontAwesomeIcon icon={faLock} className="text-white text-[16px] w-[30px]" />
                    <span className="text-arial">LOGIN</span>
                </button>
            </div>     
        </div>
    )
}

export default Login;






















// import React from 'react'

// import Logo from '../../assets/logo.jpeg'
// import { useNavigate } from 'react-router-dom'

// const login = () => {
//     const navigate = useNavigate()

//     const handleLogin = () =>{
//         navigate('/layout')
//     }
    

//     return (
//         <div className="bg-gray-200 h-screen w-screen flex flex-row justify-center items-center">
//             <div className="bg-teal-700 w-3/4 h-3/4 rounded-2xl flex flex-row justify-center items-center gap-20">
//                 <div className="w-2/5 h-4/4">
//                     <img src={Logo} className="w-full h-96 rounded-xl" />
//                 </div>
//                 <div className="h-96 w-auto flex flex-row justify-center items-center">
//                     <div className="flex flex-col gap-10">
//                         <div className="flex flex-row gap-3">
//                             <span className="font-bold flex flex-row items-center text-gray-200">USERNAME :</span>
//                             <input
//                                 type="text"
//                                 className="w-80 p-3 rounded-xl border border-black-400"
//                                 placeholder="Username"
//                             />
//                         </div>
//                         <div className="flex flex-row gap-3">
//                             <span className="font-bold flex flex-row items-center text-gray-200">PASSWORD :</span>
//                             <input
//                                 type="password"
//                                 className="w-80 p-3 rounded-xl border border-black-400"
//                                 placeholder="Password"
//                             />
//                         </div>
//                         <div className="flex flex-row justify-center mt-5">
//                             <button className="w-80 ml-24 p-3 bg-orange-500 rounded-xl text-white font-bold hover:bg-orange-600"
//                             onClick={handleLogin}>
//                                 LOGIN
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }

// export default login


