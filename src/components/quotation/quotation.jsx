import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Quotation() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [type, setType] = useState([]);
    const [selectedType, setSelectedType] = useState(null) || "";
    const [varient, setVarient] = useState([]);
    const [selectedVarient, setSelectedVarient] = useState(null);
    const [formData, setFormData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [savedData, setSavedData] = useState([]);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [price, setPrice] = useState([]);
    const [quantity, setQuantity] = useState();
    const [brand, setBrand] = useState();
    const [currentData, setCurrentData] = useState({
        brand: '', product: '', type: '', varient: '', mesh: 'YES',
        width: '', height: '', area: '', price: '', glass: '', roller: '',
        handleType: '', color: '', additionalcost: '', quantity: '', total: ''
    })

    useEffect(() => {

        const fetchType = async () => {
            try {
                let response;
                if (selectedProduct === 'Door') {
                    response = await axios.get(`${apiUrl}/doorTypes`);
                    setType(response.data);
                }
                else if (selectedProduct === 'Window') {
                    response = await axios.get(`${apiUrl}/windowTypes`);
                    setType(response.data);
                }
                else if (selectedProduct === 'Louver') {
                    response = await axios.get(`${apiUrl}/louverVarients`);
                    setVarient(response.data)
                }

            }
            catch (error) {
                console.error('Error fetching types:', error);
            }
        }
        fetchType();
    }, [apiUrl, selectedProduct]);

    const handleSelectedType = async (value) => {

        const selectedValue = value;
        setSelectedType(selectedValue);
        try {
            const response = await axios.post(`${apiUrl}/varientTypes`, {
                selected_type: selectedValue,
                selected_category: selectedProduct
            })
            setVarient(response.data);
        }
        catch (error) {
            console.error('Error fetching Varient Types :', error);
        }
    }

    const handleInputChange = async (e) => {

        const { name, value } = e.target;

        if (name === 'width') {
            setWidth(value);
        }
        else if (name === 'height') {
            setHeight(value);
        }
        else if (name === 'price') {
            setPrice(value);
        }
        else if (name === 'quantity') {
            setQuantity(value);
        }
        else if (name === 'brand') {
            setBrand(value);
        }

        const updatedWidth = name === 'width' ? value : width;
        const updatedHeight = name === 'height' ? value : height;
        const updatedQuantity = name === 'quantity' ? value : quantity;
        const updatedBrand = name === 'brand' ? value : brand;

        setCurrentData((prev) => {

            const validatedWidth = parseFloat(updatedWidth) || 0;
            const validatedHeight = parseFloat(updatedHeight) || 0;
            const validatedQuantity = parseInt(updatedQuantity, 10) || 0;

            const updatedData = {
                ...prev,
                width: validatedWidth,
                height: validatedHeight,
                quantity: validatedQuantity,
                brand: updatedBrand,
            }

            updatedData.area = (validatedWidth * validatedHeight).toFixed(2);
            updatedData.totalPrice = (price * validatedQuantity).toFixed(2);

            return updatedData;
        })

        if (name === 'width' || name === 'height') {
            try {
                const response = await axios.post(`${apiUrl}/pricelist`, {
                    height: updatedHeight,
                    width: updatedWidth,
                    selectedProduct,
                    selectedType,
                    selectedVarient,
                    brand: updatedBrand,
                })
                if (response.data && response.data.data !== undefined) {
                    setPrice(response.data.data);
                    setCurrentData((prev) => ({
                        ...prev,
                        price: response.data.data,
                        totalPrice: (response.data.data * (quantity || 1)).toFixed(2),
                    }))
                }
                else {
                    console.error('Unexpected response format:', response);
                }
            }
            catch (err) {
                console.error('Error fetching price list:', err);
            }
        }

        if (name === 'quantity') {
            setCurrentData((prev) => ({
                ...prev,
                totalPrice: (price * (parseInt(value, 10) || 1)).toFixed(2),
            }));
        }
    }

    const handleSave = () => {
        setSavedData((prev) => [...prev, currentData]);
        alert("Data Saved Successfully");
        setCurrentData({
            brand: "VEKA",
            product: "",
            type: "",
            varient: "",
            mesh: "YES",
            width: "",
            height: "",
            area: "",
            price: "",
            glass: "",
            roller: "",
            handleType: "",
            color: "",
            additionalcost: "",
            quantity: "",
            total: "",
        });
    };

    const handleEditChange = (e, index) => {
        const { name, value } = e.target;
        setSavedData((prev) =>
            prev.map((row, i) =>
                i === index
                    ? {
                        ...row,
                        [name]: value,
                    }
                    : row
            )
        );
    };

    const handleDeleteRow = (index) => {
        setSavedData((prev) => prev.filter((_, i) => i !== index));
    };

    const handleFinish = () => {
        console.log('Final FormData:', formData);
        console.log("Type and product", formData[0].type, selectedProduct, formData[0].varient, formData[0].mesh);
    }

    return (
        <div>
            <div className='flex flex-col bg-blue-300 gap-6 min-h-screen rounded-lg p-5'>
            <span className="text-2xl font-semibold text-blue-800 px-2 pt-8">MEASUREMENTS</span>
                <div className='flex flex-col border-2 border-black rounded-lg'>
                    <div className="grid grid-cols-5 gap-7 p-7 border-b-2 border-black py-12">
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Brand : </label>
                            <select
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="brand"
                                value={currentData.brand || ''}
                                onChange={handleInputChange}
                            >
                                <option className='p-2 text-md'>Select</option>
                                <option className='p-2 text-md'>VEKA</option>
                                <option className='p-2 text-md'>EITI</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Product : </label>
                            <select
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="product"
                                value={selectedProduct || ''}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                            >
                                <option className='p-2 text-md'>Door</option>
                                <option className='p-2 text-md'>Window</option>
                                <option className='p-2 text-md'>Louver</option>
                            </select>
                        </div>
                        {(selectedProduct === 'Door' || selectedProduct === 'Window') && (
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Type : </label>
                                <select
                                    className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => handleSelectedType(e.target.value)}
                                    value={selectedType || ''}
                                >
                                    <option className='p-2 text-md'>Select</option>
                                    {type.map((typeItem, index) => (
                                        <option key={index}>{typeItem}</option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Varient : </label>
                            <select
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => setSelectedVarient(e.target.value)}
                                value={selectedVarient || ''}
                            >
                                <option className='p-2 text-md'>Select</option>
                                {varient.map((varientItem, index) => (
                                    <option key={index}>{varientItem.varient}</option>
                                ))}
                            </select>
                        </div>
                        {(selectedProduct === 'Window' || selectedProduct === 'Louver') && (
                            <>
                                <div className="flex flex-col gap-4">
                                    <label className="font-semibold ml-1 uppercase">Mesh : </label>
                                    <select
                                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="mesh"
                                        value={currentData.mesh || ''}
                                        onChange={handleInputChange}
                                    >
                                        <option className='p-2 text-md'>Yes</option>
                                        <option className='p-2 text-md'>No</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="grid grid-cols-6 gap-7 px-7 py-10 rounded-lg">
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Width : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="width"
                                value={currentData.width || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Height : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="height"
                                value={currentData.height || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Sq Feet : </label>
                            <input
                                className="w-full bg-slate-200 p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="area"
                                value={currentData.area || ''}
                                disabled
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Price : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="price"
                                value={price || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Quantity : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="quantity"
                                value={currentData.quantity || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Total Qty Price : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md bg-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="total"
                                value={currentData?.totalPrice || ''}
                                onChange={handleInputChange}
                                disabled
                                readOnly
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Glass : </label>
                            <select
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="glass"
                                value={currentData.glass || ''}
                                onChange={handleInputChange}
                            >
                                <option className='p-2 text-md'>Select</option>
                                <option className='p-2 text-md'>Normal Glass</option>
                                <option className='p-2 text-md'>Toughened Glass</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Roller : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="roller"
                                // value={currentData.roller || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Handle Type : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="handleType"
                                // value={currentData.handleType || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Color : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="color"
                                // value={currentData.color || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Additional Cost : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="additionalcost"
                                // value={currentData.additionalcost || ''}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end">

                    <button
                        className="bg-green-700 w-32 font-bold text-lg text-white py-2.5 px-6 rounded-lg shadow hover:bg-green-600 transition duration-200"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
                <div>
                    {savedData.length> 0 && (
                        <div className="mt-5">
                            <h2 className="text-2xl font-semibold text-blue-800 px-2 pt-8">SUMMARY DATA</h2>
                            <table className="min-w-full table-auto mt-5 border-collapse border-2 border-black">
                                <thead>
                                    <tr className="bg-orange-300">
                                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Brand</th>
                                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Type</th>
                                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Varient</th>
                                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Mesh</th>
                                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Width</th>
                                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Height</th>
                                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Area (Sq Units)</th>
                                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Price</th>
                                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Total</th>
                                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Additional Cost</th>
                                        <th className="border-2 border-black px-4 py-2 uppercase font-bold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {savedData.map((data, index) => (
                                        <tr key={index}>
                                            {["brand", "type", "varient", "mesh", "width", "height", "area", "price", "total", "additionalcost"].map(
                                                (field) => (
                                                    <td key={field} className="border-2 border-black px-4 py-2 font-bold">
                                                        <input
                                                            type="text"
                                                            name={field}
                                                            value={data[field] || ""}
                                                            onChange={(e) => handleEditChange(e, index)}
                                                            className="w-full p-2 border rounded"
                                                        />
                                                    </td>
                                                )
                                            )}
                                            <td className="border-2 border-black px-4 py-2 font-bold">
                                                <button
                                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                                    onClick={() => handleDeleteRow(index)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="">
                                <h2 className='text-2xl font-semibold text-blue-800 px-2 pt-12' >CUSTOMER DETAILS</h2>
                                <div className='p-5 mt-7 grid grid-cols-5 gap-7 border-2 border-black rounded-lg py-12 '>
                                    <div className='flex flex-col gap-4'>
                                        <label className='font-semibold ml-1 uppercase'>Sales Person Id :</label>
                                        <input
                                            type="text"
                                            placeholder=''
                                            className="w-full p-3 border-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            disabled
                                        />
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <label className='font-semibold ml-1 uppercase'>Quotation Id :</label>
                                        <input
                                            type="text"
                                            placeholder=''
                                            className="w-full p-3 border-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            disabled
                                        />
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <label className='font-semibold ml-1 uppercase'>Customer Name :</label>
                                        <input
                                            type="text"
                                            placeholder=''
                                            className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <label className='font-semibold ml-1 uppercase'>Customer Address :</label>
                                        <input
                                            type="text"
                                            placeholder=''
                                            className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div className='flex flex-col gap-4'>
                                        <label className='font-semibold ml-1 uppercase'>Customer Phone No :</label>
                                        <input
                                            type="text"
                                            placeholder=''
                                            className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                    </div>
                                </div>
                            </div>
                            <div className='mt-7 flex justify-start'>
                                <button
                                    className="bg-red-600 w-32 font-bold text-lg text-white py-2.5 px-6 rounded-lg shadow hover:bg-red-700 transition duration-200"
                                    onClick={handleFinish}
                                >
                                    Finish
                                </button>
                            </div>
                        </div>
                    )}
                </div>


            </div>
        </div >
    )
}

export default Quotation;