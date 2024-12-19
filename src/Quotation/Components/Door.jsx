import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Door({ doorId }) {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState(null);
    const [varient, setVarient] = useState([]);
    const [selectedVarient, setSelectedVarient] = useState(null);
    const [formData, setFormData] = useState([]);
    const [currentData, setCurrentData] = useState({
        product: '',
        type: '',
        varient: '',
        series: '',
        designType: '',
        quantity: '',
        width: '',
        height: '',
        area: '',
        price: '',
        total: '',
        glass: '',
        roller: '',
        handleType: '',
        color: '',
    });

    useEffect(() => {
        const fetchType = async () => {
            try {
                const response = await axios.get(`${apiUrl}/doorTypes`);
                setType(response.data);
            } catch (error) {}
        };
        fetchType();
    }, [apiUrl]);

    const handleSelectedType = async (value) => {
        const selectedValue = value;
        setSelectedType(selectedValue);
        try {
            const response = await axios.post(`${apiUrl}/varientTypes`, {
                selected_type: selectedValue,
            });
            setVarient(response.data);
        } catch (error) {}
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setCurrentData((prev) => {
            const updatedFormData = { ...prev, type: selectedType, varient: selectedVarient, [name]: value };
            return updatedFormData;
        });
    };

    const handleSave = () => {
        setFormData((prev) => [...prev, currentData]);
        alert('Data Saved Successfully');
        setCurrentData({
            product: '',
            type: '',
            varient: '',
            series: '',
            designType: '',
            quantity: '',
            width: '',
            height: '',
            area: '',
            price: '',
            total: '',
            glass: '',
            roller: '',
            handleType: '',
            color: '',
        });
    };

    const handleFinish = () => {
        console.log('Final FormData:', formData);
    };

    return (
        <div>
            {doorId && (
                <div className="flex flex-col bg-slate-100 p-7 gap-10 mb-3">
                    <span className="text-2xl font-semibold text-blue-800">DOOR CONFIGURATION</span>
                    <div className="grid grid-cols-4 gap-7">
                        {/* Product Selection */}
                        <div className="flex flex-col gap-5">
                            <label className="font-semibold ml-1 uppercase">Product: </label>
                            <select
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="product"
                                value={currentData.product}
                                onChange={handleInputChange}
                            >
                                <option>Select</option>
                                <option>Door</option>
                                <option>Window</option>
                                <option>Louver</option>
                            </select>
                        </div>
                        {/* Type Selection */}
                        <div className="flex flex-col gap-5">
                            <label className="font-semibold ml-1 uppercase">Type: </label>
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
                            <label className="font-semibold ml-1 uppercase">Varient: </label>
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
                        {/* Series */}
                        <div className="flex flex-col gap-5">
                            <label className="font-semibold ml-1 uppercase">Series: </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="series"
                                value={currentData.series}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* Rest of the Fields */}
                        {/* Similar structure for other fields like designType, quantity, etc. */}
                    </div>
                    <div className="flex justify-between">
                        <button
                            className="bg-red-600 text-white py-2.5 px-6 rounded-lg shadow hover:bg-red-700 transition duration-200"
                            onClick={handleFinish}
                        >
                            Finish
                        </button>
                        <button
                            className="bg-green-700 text-white py-2.5 px-6 rounded-lg shadow hover:bg-green-600 transition duration-200"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Door;
