import React from 'react';

function Products({ products, handleProductCheck }) 
{
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
            {products.map((product, index) => (
                <button key={index} className='border border-slate-200 p-4 rounded-md shadow-md flex items-center'>
                    <input
                        type='checkbox'
                        className='form-checkbox h-5 w-5 text-blue-500'
                        onChange={(e) => handleProductCheck(product.product_id, e.target.checked)}
                    />
                    <span className='text-lg font-medium text-black ml-3 uppercase'>{product.product_name}</span>
                </button>
            ))}
        </div>
    )
}

export default Products;