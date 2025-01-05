import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Order() {

    const [quotations, setQuotations] = useState([])

    const apiUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchQuotatindetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}/quotation`);
                console.log(response.data);
                setQuotations(response.data)
            }
            catch (error) {
                console.error(error)
            }
        }
        fetchQuotatindetails();
    }, [apiUrl]);
    

    const confirmOrder = async (order) => {
        console.log(order)
        try{
            const response = await axios.post(`${apiUrl}/orderconfirm`, order);
            alert('Order Confirmed successfully!');
            console.log(response.data);
        }
        catch(error){
            console.error(error)
        }
    }

    return (
        <div className='w-full h-full bg-white'>
            <h1 className='font-bold text-center text-2xl'>Order Confirmation Details</h1>
            <table className='w-full bg-white shadow-md rounded-lg border-collapse mt-5'>
                <thead>
                    <tr className='h-20 bg-blue-500 text-white text-lg'>
                        <th className='border border-gray-300 py-6'>Quotation No</th>
                        <th className='border border-gray-300 py-6'>Sales Person Id</th>
                        <th className='border border-gray-300 py-6'>Customer Name</th>
                        <th className='border border-gray-300 py-6'>Address</th>
                        <th className='border border-gray-300 py-6'>Contact No</th>
                        <th className='border border-gray-300 py-6' colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                {quotations.length > 0 ? (
                    quotations.map((quotation, index) => (
                        <tr key={index} className='font-bold uppercase text-center'>
                            <td className='px-4 py-2 border border-gray-300 '>{quotation.quotation_no}</td>
                            <td className='px-4 py-2 border border-gray-300 '>{quotation.salesper}</td>
                            <td className='px-4 py-2 border border-gray-300 '>{quotation.cus_name}</td>
                            <td className='px-4 py-2 border border-gray-300 '>{quotation.cus_add}</td>
                            <td className='px-4 py-2 border border-gray-300 '>{quotation.cus_con}</td>
                            <td className='px-4 py-2 border border-gray-300 '>
                                <button className='px-3 py-1 w-32 h-10 font-bold text-md bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none'onClick={()=> confirmOrder(quotation)}>
                                    Confirm
                                </button>
                            </td>
                            <td className='px-4 py-2 border border-gray-300 text-center'>
                                <button className='px-3 py-1  w-32 h-10  font-bold text-md ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none'>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className="px-4 py-2 border border-gray-300 text-center">No Quotaions Found</td>
                    </tr>
                )}
                </tbody>
            </table>


        </div>
    )
}

export default Order;


