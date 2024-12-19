import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Door() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [varient, setVarient] = useState([]);
    const [selectedVarient, setSelectedVarient] = useState(null);
    const [formData, setFormData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('Door');

    const [currentData, setCurrentData] = useState({
        brand: 'VEKA',
        product: '',
        type: '',
        varient: '',
        mesh: 'YES',
        width: '',
        height: '',
        area: '',
        price: '',
        glass: '',
        roller: '',
        handleType: '',
        color: '',
        quantity: '',
        total: ''
    });

    const [savedData, setSavedData] = useState([]);

    useEffect(() => {
        const fetchType = async () => {
            try {
                let response;
                if (selectedProduct === 'Door') {
                    response = await axios.get(`${apiUrl}/doorTypes`);
                } else if (selectedProduct === 'Window') {
                    response = await axios.get(`${apiUrl}/windowTypes`);
                } else if (selectedProduct === 'Louver') {
                    response = await axios.get(`${apiUrl}/louverTypes`);
                }
                setType(response.data);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };
        fetchType();
    }, [apiUrl, selectedProduct]);


    const handleSelectedType = async (value) => {
        const selectedValue = value;
        setSelectedType(selectedValue);
        console.log('Selected Type:', selectedValue);
        try {
            const response = await axios.post(`${apiUrl}/varientTypes`, {
                selected_type: selectedValue,
                selected_category: selectedProduct
            });
            setVarient(response.data);
        } catch (error) {
            console.error('Error fetching variant types:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'width' || name === 'height') {
            const newValue = value;
            setCurrentData((prev) => {
                const updatedData = { ...prev, [name]: newValue };

                if (updatedData.width && updatedData.height) {
                    updatedData.area = (parseFloat(updatedData.width) * parseFloat(updatedData.height)).toFixed(2);
                }

                return updatedData;
            });
        } else {
            setCurrentData((prev) => ({
                ...prev,
                type: selectedType,
                varient: selectedVarient,
                [name]: value,
            }));
        }
    };


    const handleSave = () => {

        console.log('Current Data Before Save:', currentData);
        setFormData((prev) => [...prev, currentData]);
        setSavedData((prev) => [...prev, currentData]);

        alert('Data Saved Successfully');

        setCurrentData({
            brand: 'VEKA',
            product: '',
            type: '',
            varient: '',
            mesh: 'YES',
            width: '',
            height: '',
            area: '',
            price: '',
            glass: '',
            roller: '',
            handleType: '',
            color: '',
            quantity: '',
            total: '',
        });
    };


    const handleFinish = () => {
        console.log('Final FormData:', formData);
    };


    return (
        <div className="flex flex-col bg-blue-300 p-7 gap-10 mb-3 rounded-lg">
            <span className="text-2xl font-semibold text-blue-800">MEASUREMENTS</span>
            <div className='border-2 border-black h-44 rounded-lg'>
                <div className="grid grid-cols-5 gap-7 p-5">
                    <div className="flex flex-col gap-5">
                        <label className="font-semibold ml-1 uppercase">Brand : </label>
                        <select
                            className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="brand"
                            value={currentData.brand}
                            onChange={handleInputChange}

                        >
                            <option>VEKA</option>
                            <option>ELITE</option>
                        </select>
                    </div>
                    {/* Product Selection */}
                    <div className="flex flex-col gap-5">
                        <label className="font-semibold ml-1 uppercase">Product : </label>
                        <select
                            className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="product"
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                        >
                            <option>Door</option>
                            <option>Window</option>
                            <option>Louver</option>
                        </select>
                    </div>
                    {/* Type Selection */}
                    <div className="flex flex-col gap-5">
                        <label className="font-semibold ml-1 uppercase">Type : </label>
                        <select
                            className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => handleSelectedType(e.target.value)}
                            value={selectedType}
                        >
                            <option>Select</option>
                            {type.map((typeItem, index) => (
                                <option key={index}>{typeItem}</option>
                            ))}
                        </select>
                    </div>
                    {/* Varient Selection */}
                    <div className="flex flex-col gap-5">
                        <label className="font-semibold ml-1 uppercase">Varient : </label>
                        <select
                            className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(e) => setSelectedVarient(e.target.value)}
                            value={selectedVarient}
                        >
                            <option>Select</option>
                            {varient.map((varientItem, index) => (
                                <option key={index}>{varientItem.type}</option>
                            ))}
                        </select>
                    </div>

                    {(selectedProduct === 'Window' || selectedProduct === 'Louver') && (
                        <>
                            <div className="flex flex-col gap-5">
                                <label className="font-semibold ml-1 uppercase">Mesh : </label>
                                <select
                                    className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name="mesh"
                                    value={currentData.mesh}
                                    onChange={handleInputChange}

                                >
                                    <option>YES</option>
                                    <option>NO</option>
                                </select>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-4 gap-7">

                {/* Width */}
                <div className="flex flex-col gap-5">
                    <label className="font-semibold ml-1 uppercase">Width : </label>
                    <input
                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="width"
                        value={currentData.width}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Height */}
                <div className="flex flex-col gap-5">
                    <label className="font-semibold ml-1 uppercase">Height : </label>
                    <input
                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="height"
                        value={currentData.height}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Area (Sq Units) */}
                <div className="flex flex-col gap-5">
                    <label className="font-semibold ml-1 uppercase">Sq Units : </label>
                    <input
                        className="w-full bg-white p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="area"
                        value={currentData.area}
                        disabled
                    />
                </div>
                {/* Price */}
                <div className="flex flex-col gap-5">
                    <label className="font-semibold ml-1 uppercase">Price : </label>
                    <input
                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="price"
                        value={currentData.price}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Glass */}
                <div className="flex flex-col gap-5">
                    <label className="font-semibold ml-1 uppercase">Glass : </label>
                    <select
                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="glass"
                        value={currentData.glass}
                        onChange={handleInputChange}
                    >
                        <option>SELECT</option>
                        <option>NORMAL GLASS</option>
                        <option>TOUGHENED GLASS</option>
                    </select>
                </div>
                {/* Roller */}
                <div className="flex flex-col gap-5">
                    <label className="font-semibold ml-1 uppercase">Roller : </label>
                    <input
                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="roller"
                        value={currentData.roller}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Handle Type */}
                <div className="flex flex-col gap-5">
                    <label className="font-semibold ml-1 uppercase">Handle Type : </label>
                    <input
                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="handleType"
                        value={currentData.handleType}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Color */}
                <div className="flex flex-col gap-5">
                    <label className="font-semibold ml-1 uppercase">Color : </label>
                    <input
                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="color"
                        value={currentData.color}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Quantity */}
                <div className="flex flex-col gap-5">
                    <label className="font-semibold ml-1 uppercase">Quantity : </label>
                    <input
                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="quantity"
                        value={currentData.quantity}
                        onChange={handleInputChange}
                    />
                </div>
                {/* Total */}
                <div className="flex flex-col gap-5">
                    <label className="font-semibold ml-1 uppercase">Total Qty Price : </label>
                    <input
                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="total"
                        value={currentData.total}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="flex justify-between">
                <button
                    className="bg-red-600 w-32 font-bold text-white py-2.5 px-6 rounded-lg shadow hover:bg-red-700 transition duration-200"
                    onClick={handleFinish}
                >
                    Finish
                </button>
                <button
                    className="bg-green-700 w-32 font-bold text-white py-2.5 px-6 rounded-lg shadow hover:bg-green-600 transition duration-200"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
            {savedData.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-xl font-semibold text-blue-800">Summary Data</h2>
                    <table className="min-w-full table-auto mt-5 border-collapse border-2 border-black">
                        <thead>
                            <tr className=' bg-orange-300'>
                                <th className="border-2 border-black px-4 py-2 uppercase font-bold ">Brand</th>
                                {/* <th className="border px-4 py-2 uppercase font-bold">Product</th> */}
                                <th className="border-2 border-black px-4 py-2 uppercase font-bold">Type</th>
                                <th className="border-2 border-black px-4 py-2 uppercase font-bold">Variant</th>
                                <th className="border-2 border-black px-4 py-2 uppercase font-bold">Mesh</th>
                                <th className="border-2 border-black px-4 py-2 uppercase font-bold">Width</th>
                                <th className="border-2 border-black px-4 py-2 uppercase font-bold">Height</th>
                                <th className="border-2 border-black px-4 py-2 uppercase font-bold">Area (Sq Units)</th>
                                <th className="border-2 border-black px-4 py-2 uppercase font-bold">Price</th>
                                <th className="border-2 border-black px-4 py-2 uppercase font-bold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {savedData.map((data, index) => (
                                <tr key={index}>
                                    <td className="border-2 border-black px-4 py-2 font-bold">{data.brand}</td>
                                    {/* <td className="border px-4 py-2">{data.product}</td> */}
                                    <td className="border-2 border-black px-4 py-2 font-bold">{data.type}</td>
                                    <td className="border-2 border-black px-4 py-2 font-bold">{data.varient}</td>
                                    <td className="border-2 border-black px-4 py-2 font-bold">{data.mesh}</td>
                                    <td className="border-2 border-black px-4 py-2 font-bold">{data.width}</td>
                                    <td className="border-2 border-black px-4 py-2 font-bold">{data.height}</td>
                                    <td className="border-2 border-black px-4 py-2 font-bold">{data.area}</td>
                                    <td className="border-2 border-black px-4 py-2 font-bold">{data.price}</td>
                                    <td className="border-2 border-black px-4 py-2 font-bold">{data.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}



        </div>
    );
}

function Main() {
    return (
        <div className="relative w-full h-[100%] flex flex-col gap-6">
            <Door />
        </div>
    );
}

export default Main;
