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
                    <div className='grid grid-cols-3 gap-4 mb-6'>
                        <div className='bg-blue-600 text-white font-bold text-lg p-3 rounded-t-md'>Quotation No</div>
                        <div className='bg-blue-600 text-white font-bold text-lg p-3 rounded-t-md'>Salesman Id</div>
                        <div className='bg-blue-600 text-white font-bold text-lg p-3 rounded-t-md'>Date</div>
                        <div className='font-semibold p-4 bg-white border border-gray-300 rounded-b-md'>{props.customer.quotation}</div>
                        <div className='font-semibold p-4 bg-white border border-gray-300 rounded-b-md'>{props.customer.salesper}</div>
                        <div className='font-semibold p-4 bg-white border border-gray-300 rounded-b-md'>{formattedDate}</div>
                    </div>
                    {props.savedData.length > 0 && (
                        <div>
                            <div className='grid grid-cols-5 text-center bg-blue-600 text-white font-bold text-lg p-3 rounded-t-md'>
                                <div>Sales Line</div>
                                <div>Details</div>
                                <div>Quantity</div>
                                <div>Rate (Rs.)</div>
                                <div>Amount (Rs.)</div>
                            </div>
                            {props.savedData.map((data, index) => (
                                <div key={index} className='grid grid-cols-5 mt-2 text-center bg-white border-t border-l border-r border-black'>
                                    <div className='p-3 border-t border-l border-r border-black'>
                                        <img src={`${apiUrl}${data.img}`} alt="Product" className="max-w-full h-auto rounded" />
                                    </div>
                                    <div className='p-3 text-left border-t border-l border-r border-black'>
                                        <span className=''><b>Size  : </b></span> <span>W = {data.width} ; H = {data.height}</span><br></br>
                                        <span className=''><b>Area  : </b></span> <span>{data.area}</span><br></br>
                                        <span className=''><b>Glass : </b></span> <span>{data.glass}</span><br></br>
                                        <span className=''><b>Color : </b></span> <span>{data.color}</span>
                                    </div>
                                    <div className='p-3 border-t border-l border-r border-black'>{data.quantity}</div>
                                    <div className='p-3 border-t border-l border-r border-black'>{data.price}</div>
                                    <div className='p-3 border-t border-l border-r border-black'>{data.totalPrice}</div>
                                </div>
                            ))}
                            <div className='grid grid-cols-5 border border-black'>
                                <div className='col-span-4 border border-black p-2 font-bold text-right'>Net Total (Rs.)</div>
                                <div className='border border-black p-2 text-center font-bold'>₹ {netTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </div>
                                <div className='col-span-4 border border-black p-2 font-bold text-right'>GST (18%)</div>
                                <div className='border border-black p-2 text-center font-bold'>₹ {gst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </div>
                                <div className='col-span-4 border border-black p-2 font-bold text-right'>Grand Total (Rs.)</div>
                                <div className='border border-black p-2 text-center font-bold'>₹ {gTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default Quotation;