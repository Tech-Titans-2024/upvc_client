import React, { useEffect } from 'react'

function Customer(props) {
   
    return (
        <div className='p-5 grid grid-cols-5 gap-7 border-2 border-black rounded-lg py-12 '>
            <div className='flex flex-col gap-4'>
                <label className='font-semibold ml-1 uppercase'>Sales Person Id :</label>
                <select name='salesper' onChange={props.handleCustomer}>
                    <option>Select..</option>
                    {props.salesmanId.map((value, index) => {
                       return <option key={index} value={value.username} >{value.username}</option>
                    })
                    }
                </select>
                {/* <input
                    type="text"
                    placeholder=''
                    className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name='salesper'
                    value={props.customer.salesper}
                    onChange={props.handleCustomer}
                /> */}
            </div>
            <div className='flex flex-col gap-4'>
                <label className='font-semibold ml-1 uppercase'>Quotation Id :</label>
                <input
                    type="text"
                    placeholder=''
                    className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name='quotation'
                    value={props.customer.quotation}
                    onChange={props.handleCustomer}
                    disabled
                    
                />
            </div>
            <div className='flex flex-col gap-4'>
                <label className='font-semibold ml-1 uppercase'>Customer Name :</label>
                <input
                    type="text"
                    placeholder=''
                    className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name='cus_name'
                    value={props.customer.cus_name}
                    onChange={props.handleCustomer}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <label className='font-semibold ml-1 uppercase'>Customer Address :</label>
                <input
                    type="text"
                    placeholder=''
                    className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name='cus_add'
                    value={props.customer.cus_add}
                    onChange={props.handleCustomer}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <label className='font-semibold ml-1 uppercase'>Customer Phone No :</label>
                <input
                    type="text"
                    placeholder=''
                    className="w-full p-3 border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    name='cus_con'
                    value={props.customer.cus_con}
                    onChange={props.handleCustomer}
                />
            </div>
        </div>
    )
}

export default Customer;