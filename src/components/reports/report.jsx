import React from 'react'

function Report() 
{
    return (
        <div>
            <h1 className="text-black text-3xl font-bold text-center">Detailed View</h1>
            <div className='flex flex-row gap-10 mt-10'>
                <button className='p-10 w-60 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-xl text-white'>Product Wise</button>
                <button className='p-10 w-60 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-xl text-white'>Sales Wise</button>
                <button className='p-10 w-60 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold text-xl text-white'>Period Wise</button>
            </div>
        </div>
    )
}

export default Report