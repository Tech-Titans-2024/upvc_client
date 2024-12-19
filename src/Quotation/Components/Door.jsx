import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Door({ doorId }) 
{
    const apiUrl = import.meta.env.VITE_API_URL;
    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [varient, setVarient] = useState([]);
    const [selectedVarient, setSelectedVarient] = useState(null);
    const [formData, setFormData] = useState([]);
    const [currentData, setCurrentData] = useState({ series: '', designType: '', quantity: '', width: '', 
        height: '', area: '', price: '', total: '', glass: '', roller: '', handleType: '', color: ''});

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

    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setCurrentData((prev) => {
            const updatedFormData = { ...prev, type : selectedType, varient : selectedVarient, [name]: value };
            return updatedFormData;
        })
    }

    const handleSave = () => {

        setFormData((prev) => [...prev, currentData]);
        alert('Data Saved Successfully')
        setCurrentData(
        {
            series: '', designType: '', quantity: '', width: '', height: '',
            area: '', price: '', total: '', glass: '', roller: '', handleType: '',
            color: '',
        })
        
    }

    const handleFinish = () => {

        console.log("Final FormData:", formData);
        
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
                                onChange={(e) => setSelectedVarient(e.target.value)}
                                value={selectedVarient}
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
                                name='series'
                                value={currentData.series}
                                onChange={handleInputChange}
                            >
                                <option>Select</option>
                                <option>Select</option>
                                <option>Select</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Design Type : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name='designType'
                                value={currentData.designType}
                                onChange={handleInputChange}
                            >
                                <option>Select</option>
                                <option>Select</option>
                                <option>Select</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Quantity : </label>
                            <input
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name='quantity'
                                value={currentData.quantity}
                                onChange={handleInputChange}
                            />                        
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Width : </label>
                            <input
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name='width'
                                value={currentData.width}
                                onChange={handleInputChange}
                            />                        
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Height : </label>
                            <input
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name='height'
                                value={currentData.height}
                                onChange={handleInputChange}
                            />                        
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Area : </label>
                            <input
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name='area'
                                value={currentData.area}
                                onChange={handleInputChange}
                            />                        
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Price : </label>
                            <input
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name='price'
                                value={currentData.price}
                                onChange={handleInputChange}
                            />                        
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Total : </label>
                            <input
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name='total'
                                value={currentData.total}
                                onChange={handleInputChange}
                            />                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Glass : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name='glass'
                                value={currentData.glass}
                                onChange={handleInputChange}
                            >
                                <option>Select</option>
                                <option>Select</option>
                                <option>Select</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Roller : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name='roller'
                                value={currentData.roller}
                                onChange={handleInputChange}
                            >
                                <option>Select</option>
                                <option>Select</option>
                                <option>Select</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Handle Type : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name='handleType'
                                value={currentData.handleType}
                                onChange={handleInputChange}
                            >
                                <option>Select</option>
                                <option>Select</option>
                                <option>Select</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-5'>
                            <label className='font-semibold ml-1 uppercase'>Color : </label>
                            <select
                                className='w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                name='color'
                                value={currentData.color}
                                onChange={handleInputChange}
                            >
                                <option>Select</option>
                                <option>Select</option>
                                <option>Select</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-between'>
                        <button 
                            className='bg-red-600 text-white py-2.5 px-6 rounded-lg shadow hover:bg-red-700 transition duration-200'
                            onClick={handleFinish}
                        >
                            Finish
                        </button>
                        <button 
                            className='bg-green-700 text-white py-2.5 px-6 rounded-lg shadow hover:bg-green-600 transition duration-200'
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Door