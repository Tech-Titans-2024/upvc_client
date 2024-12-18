import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Door({ doorId }) 
{
    const apiUrl = import.meta.env.VITE_API_URL;
    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [varient, setVarient] = useState([]);

    useEffect(() => {

        const fetchType = async () => {
            try {
                const response = await axios.get(`${apiUrl}/doorTypes`);
                setType(response.data);
            }
            catch (error) { }
        }
        fetchType()

    }, [apiUrl])

    const handleSelectedType = async (value) => {

        const selectedValue = value;
        setSelectedType(selectedValue);
        try {
            const response = await axios.post(`${apiUrl}/varientTypes`, {
                selected_type: selectedValue
            });
            setVarient(response.data);
        }
        catch (error) { }
    }

    return (
        <div>
            {doorId && (
                <div className='flex flex-col bg-slate-100 p-7 gap-10 mb-3'>
                    <span className='text-2xl font-semibold text-blue-800'>DOOR CONFIGURATION</span>
                    <div className='grid grid-cols-4 gap-7'>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Type : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                onChange={(e) => handleSelectedType(e.target.value)}
                                value={selectedType}
                            >
                                <option>Select</option>
                                {type.map((typeItem, index) => (
                                    <option key={index}>
                                        {typeItem}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Varient : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option>Select</option>
                                {varient.map((varientItem, index) => (
                                    <option key={index}>
                                        {varientItem.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Series : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option>Select</option>
                                {varient.map((varientItem, index) => (
                                    <option key={index}>
                                        {varientItem.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Design Type : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option>Select</option>
                                {varient.map((varientItem, index) => (
                                    <option key={index}>
                                        {varientItem.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Quantity : </label>
                            <input className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Width : </label>
                            <input className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Height : </label>
                            <input className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Area : </label>
                            <input className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Price : </label>
                            <input className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Total : </label>
                            <input className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'></input>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Glass : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option>Select</option>
                                {varient.map((varientItem, index) => (
                                    <option key={index}>
                                        {varientItem.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Roller : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option>Select</option>
                                {varient.map((varientItem, index) => (
                                    <option key={index}>
                                        {varientItem.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Handle Type : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option>Select</option>
                                {varient.map((varientItem, index) => (
                                    <option key={index}>
                                        {varientItem.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Color : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                            >
                                <option>Select</option>
                                {varient.map((varientItem, index) => (
                                    <option key={index}>
                                        {varientItem.type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Door