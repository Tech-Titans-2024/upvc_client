import React from 'react'

import Logo from '../assets/upvc_logo.jpeg'

const login = () => {
    return (
        <div className='bg-blue-500 h-screen w-screen flex flex-row justify-center items-center '>
            <div className='bg-white w-2/3 h-2/3 rounded-2xl flex flex-row gap-32 justify-center items-center'>
                <div className='bg-blue-200 w-2/5 h-4/5 '>
                    <img src={Logo} className='w-full h-full' />
                </div>
                <div className='h-96 w-96 bg-red-200'>
                    <div className='flex flex-col'>
                    <span>Username</span>
                    <input type="text" className='' placeholder='Username' />
                    <span>Password</span>
                    <input type="text" className='' placeholder='Password' />
                    </div>
                </div>


            </div>


        </div>


    )
}

export default login