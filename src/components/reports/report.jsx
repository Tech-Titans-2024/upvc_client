import React from 'react'

function Report() 
{
    return (
        <div className='p-10'>
            <h1 className="text-black text-3xl font-bold text-center mb-10">Detailed View</h1>
            <div className='flex gap-10 w-[100%] h-24'>
                <button className='w-[33%] bg-blue-500 hover:bg-blue-600 rounded-xl font-bold text-xl text-white'>Product Wise</button>
                <button className='w-[33%] bg-blue-500 hover:bg-blue-600 rounded-xl font-bold text-xl text-white'>Sales Wise</button>
                <button className='w-[33%] bg-blue-500 hover:bg-blue-600 rounded-xl font-bold text-xl text-white'>Period Wise</button>
            </div>
        </div>
    )
}

export default Report