import { faDisplay } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';

function PriceList() {
    const [displayfield, setDisplayField] = useState(false);

    const onAddClick = () => {
        setDisplayField(true);
    };

    return (
        <div className="flex flex-col  mt-8 gap-2  px-2 ">
            <div className='flex flex-col justify-start items-start mt-8 ml-2'>
                <label htmlFor="item-code" className="text-lg font-semibold mb-2">Item Code</label>
                <div className='flex items-center'>
                <div className="w-40  h-10 border border-black bg-white  rounded-md">
                    <input id="item-code"
                        type='number'
                        className="bg-transparent w-full h-full outline-none px-2  rounded-md "
                        placeholder='Enter item code' />
                </div>
                <button id='add' className='ml-2 bg-blue-500 text-white px-5 py-2 rounded-md w-24' onClick={onAddClick}>Add</button>
                <button className='ml-2 bg-amber-500 text-white px-5 py-2 rounded-md w-24'>Modify</button>
                <button className='ml-2 bg-red-500 text-white px-5 py-2 rounded-md w-24'>Delete</button>
                
            </div>
            </div>


            {displayfield &&  (
            <>
            <div className='flex flex-col mt-8 ml-2'>
                <label htmlFor='item-price' className="text-lg font-semibold mb-2">Item Name</label>
                <div className='w-40 h-10 border border-black bg-white rounded-md'>
                    <input id='item-price'
                        type='number'
                        className="bg-transparent w-full h-full outline-none px-2 no-spinner"
                        placeholder='Enter Item Name' />
                </div>
            </div>


            <div className='flex flex-col mt-8 ml-2 '>
                <label htmlFor='price per unit' className='text-lg font-semibold mb-2'>Price per Unit</label>
                <div className='w-40 h-10 border border-black bg-white rounded-md'>
                    <input id='price per unit'
                        type='number'
                        className="bg-transparent w-full h-full outline-none px-2 "
                        placeholder='Price per Unit'
                    />
                </div>
            </div>
            </>
        )}
            <button id='save' 
            className='mr-8  bg-green-500 text-white px-4 py-2 rounded-md w-24'
            style=  {{position: 'absolute', bottom: '100px', right: '24px' }}>
                    Save 
                </button>
        </div>
    );
}

export default PriceList;


