import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

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
    const [img, setImg] = useState();
    const [currentData, setCurrentData] = useState({
        brand: '', product: '', type: '', varient: '', mesh: 'YES',
        width: '', height: '', area: '', price: '', glass: '', roller: '',
        handleType: '', color: '', additionalcost: '', quantity: '', total: ''
    })
    const [customer, setCustomer] = useState({
        salesper: '', quotation: '', cus_name: '', cus_add: '', cus_con: ''
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
                    // console.log("response", response)
                    setPrice(response.data.data);
                    setImg(response.data.img);
                    setCurrentData((prev) => ({
                        ...prev,
                        price: response.data.data,
                        img: img,
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
            img: "",
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

    const handlecus = (e) => {
        const { name, value } = e.target;
        setCustomer((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleFinish = async () => {
        console.log('Final FormData:', savedData);
        const printContent = document.getElementById('printDesignContent');
        const images = printContent.querySelectorAll('img');
        
        // Wait for all images to load
        const imagePromises = Array.from(images).map((img) => {
            return new Promise((resolve, reject) => {
                if (img.complete) {
                    // Image is already loaded, resolve immediately
                    resolve();
                } else {
                    img.onload = resolve;
                    img.onerror = reject;
                }
            });
        });
    
        try {
            // Wait for all images to load before generating the PDF
            await Promise.all(imagePromises);
    
            // PDF options
            const options = {
                margin: 1,
                filename: 'quotation.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            };
            html2pdf().from(printContent).set(options).save();
            const data = {
                customer,
                savedData,
            };
    
            const response = await axios.post(`${apiUrl}/quotation-save`, { data });
    
            if (response.status === 200) {
                console.log('Data sent successfully!');
            } else {
                console.error('Failed to send data to backend:', response.status);
            }
    
        } catch (error) {
            console.error('Error:', error);
        }
    };
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

                {savedData.length > 0 && (
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
                                        name='salesper'
                                        value={customer.salesper}
                                        onChange={handlecus}
                                    />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <label className='font-semibold ml-1 uppercase'>Quotation Id :</label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="w-full p-3 border-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name='quotation'
                                        value={customer.quotation}
                                        onChange={handlecus}
                                    />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <label className='font-semibold ml-1 uppercase'>Customer Name :</label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name='cus_name'
                                        value={customer.cus_name}
                                        onChange={handlecus}
                                    />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <label className='font-semibold ml-1 uppercase'>Customer Address :</label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name='cus_add'
                                        value={customer.cus_add}
                                        onChange={handlecus}
                                    />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <label className='font-semibold ml-1 uppercase'>Customer Phone No :</label>
                                    <input
                                        type="text"
                                        placeholder=''
                                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name='cus_con'
                                        value={customer.cus_con}
                                        onChange={handlecus}
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
                        {/* print design */}
                        <div id="printDesignContent" className=''>
                            <div className='grid grid-cols-2'>
                                <div className='bg-slate-400 text-white font-bold text-xl p-2'>To</div>
                                <div className='bg-slate-400 text-white font-bold text-xl p-2'>Deliver To</div>
                                <div className='font-semibold uppercase p-2'>
                                    {customer.cus_name} <br />
                                    {customer.cus_add} <br />
                                    {customer.cus_con} <br />
                                </div>
                            </div>
                            <div className='grid grid-cols-3'>
                                <div className='bg-slate-400 text-white font-bold text-xl p-2'>Quotation No</div>
                                <div className='bg-slate-400 text-white font-bold text-xl p-2'>Sales Person</div>
                                <div className='bg-slate-400 text-white font-bold text-xl p-2'>Date</div>
                                <div className='font-semibold p-2'>{customer.quotation}</div>
                                <div className='font-semibold p-2'>{customer.salesper}</div>
                            </div>
                            {savedData.length > 0 && (
                                <div>
                                    <div className='grid grid-cols-5 w-auto'>
                                        <div className='bg-slate-400 text-white font-bold text-xl p-2'>Sales Line</div>
                                        <div className='bg-slate-400 text-white font-bold text-xl p-2'>Details</div>
                                        <div className='bg-slate-400 text-white font-bold text-xl p-2'>Qty</div>
                                        <div className='bg-slate-400 text-white font-bold text-xl p-2'>Rate (Rs.)</div>
                                        <div className='bg-slate-400 text-white font-bold text-xl p-2'>Amount (Rs.)</div>
                                    </div>
                                    {savedData.map((data, index) => (
                                        <div key={index} className='grid grid-cols-5'>
                    
                                            <div className='border border-black p-2'> <img src={`${apiUrl}${img}`} alt="Product" className="max-w-full h-auto" /></div>
                                            <div className='border border-black p-2'>
                                                Size : W = {data.width}; H = {data.height} <br />
                                                Area : {data.area}<br />
                                                Glass : {data.glass} <br />
                                                Color : {data.color} <br />
                                                Handle Type : {data.handleType} <br />
                                                Roller : {data.roller} <br />
                                            </div>
                                            <div className='border border-black p-2 text-center'>
                                                {data.quantity}
                                            </div>
                                            <div className='border border-black p-2 text-center'>
                                                {data.price}
                                            </div>
                                            <div className='border border-black p-2 text-center'>
                                                {data.totalPrice}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                )}



            </div>
        </div >
    )
}

export default Quotation;