import React from 'react';

function Quotation(props) 
{
    const apiUrl = import.meta.env.VITE_API_URL;
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const netTotal = props.savedData.reduce((total, data) => total + parseFloat(data.totalPrice), 0);
    const gst = parseFloat(netTotal * 18) / 100;
    const gTotal = parseFloat(netTotal) + parseFloat(gst);

    return (
        <>
            {props.quotation && (
                <div id="printDesignContent" className='mt-5 p-6 bg-gray-50 border border-gray-300 rounded-md shadow-md'>
                    <div className='mb-6'>
                        <div className='bg-blue-600 text-white font-bold text-lg p-3 rounded-t-md'>To</div>
                        <div className='font-semibold uppercase p-4 bg-white border border-gray-300 rounded-b-md'>
                            <p>{props.customer.cus_name}</p>
                            <p>{props.customer.cus_add}</p>
                            <p>{props.customer.cus_con}</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
                        <div className='bg-blue-600 text-white font-bold text-lg p-3 rounded-t-md'>Quotation No</div>
                        <div className='bg-blue-600 text-white font-bold text-lg p-3 rounded-t-md'>Salesman Id</div>
                        <div className='bg-blue-600 text-white font-bold text-lg p-3 rounded-t-md'>Date</div>
                        <div className='font-semibold p-4 bg-white border border-gray-300 rounded-b-md'>{props.customer.quotation}</div>
                        <div className='font-semibold p-4 bg-white border border-gray-300 rounded-b-md'>{props.customer.salesper}</div>
                        <div className='font-semibold p-4 bg-white border border-gray-300 rounded-b-md'>{formattedDate}</div>
                    </div>
                    {props.savedData.length > 0 && (
                        <div>
                            <div className="overflow-x-auto">
                                <table className="table-auto w-full border border-black shadow-md rounded-md">
                                    <thead className="bg-blue-600 text-white font-bold text-lg">
                                        <tr>
                                            <th className="p-3 border border-black w-[23%]">Product</th>
                                            <th className="p-3 border border-black w-[27%]">Details</th>
                                            <th className="p-3 border border-black w-[15%]">Quantity</th>
                                            <th className="p-3 border border-black w-[15%]">Rate (Rs.)</th>
                                            <th className="p-3 border border-black w-[20%]">Amount (Rs.)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.savedData.map((data, index) => (
                                            <tr key={index} className={`bg-white ${index % 2 === 0 ? 'bg-gray-100' : ''}`}>
                                                <td className="border border-black">
                                                    <img
                                                        src={`${apiUrl}${data.img}`}
                                                        alt="Product"
                                                        className="w-44 h-32 object-cover mx-auto rounded"
                                                    />
                                                </td>
                                                <td className="p-4 text-left border border-black">
                                                    <div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Product</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.product}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Type</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.type}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Variant</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.varient}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Size</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">W = {data.width}, H = {data.height}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Area</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.area}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Glass</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.glass}</span>
                                                        </div>
                                                        <div className="flex">
                                                            <span className="w-[25%] font-bold">Color</span>
                                                            <span className="w-[5%] text-center">:</span>
                                                            <span className="w-[70%] ml-1">{data.color}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-3 border border-black text-center">{data.quantity}</td>
                                                <td className="p-3 border border-black text-center">{data.price}</td>
                                                <td className="p-3 border border-black text-center">{data.totalPrice}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td colSpan="4" className="p-2 border border-black text-right font-bold">Net Total (Rs.)</td>
                                            <td className="p-2 border border-black text-center font-bold">₹ {netTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className="p-2 border border-black text-right font-bold">GST (18%)</td>
                                            <td className="p-2 border border-black text-center font-bold">₹ {gst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="4" className="p-2 border border-black text-right font-bold">Grand Total (Rs.)</td>
                                            <td className="p-2 border border-black text-center font-bold">₹ {gTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Quotation;