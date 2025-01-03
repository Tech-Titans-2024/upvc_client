import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

function Quotation() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [type, setType] = useState([]);
    // const [selectedType, setSelectedType] = useState(null) || "";
    const [varient, setVarient] = useState([]);
    // const [selectedVarient, setSelectedVarient] = useState(null);
    // const [selectedProduct, setSelectedProduct] = useState('');
    const [savedData, setSavedData] = useState([]);
    // const [mesh, setMesh] = useState('Yes');
    // const [width, setWidth] = useState("");
    // const [height, setHeight] = useState("");
    // const [roller, setRoller] = useState("");
    // const [color, setColor] = useState("");
    // const [handleType, setHandleType] = useState("");
    // const [additionalCost, setAdditionalCost] = useState("");
    // const [price, setPrice] = useState([]);
    // const [quantity, setQuantity] = useState();
    // const [brand, setBrand] = useState();
    // const [img, setImg] = useState();
    const [currentData, setCurrentData] = useState({
        brand: 'Veka', product: 'Door', type: '', varient: '', mesh: 'Yes',
        width: '', height: '', area: '', price: '', glass: '', roller: '', totalPrice: '',
        handleType: '', color: '', additionalcost: '', quantity: '', total: '', img: ''
    })
    const [customer, setCustomer] = useState({
        salesper: '', quotation: '', cus_name: '', cus_add: '', cus_con: '', date: '', netTotal: '', gst: '', gTotal: ''
    })

    useEffect(() => {

        const fetchType = async () => {
            try {
                let response;
                if (currentData.product === 'Door') {
                    response = await axios.get(`${apiUrl}/doorTypes`);
                    setType(response.data);
                }
                else if (currentData.product === 'Window') {
                    response = await axios.get(`${apiUrl}/windowTypes`);
                    setType(response.data);
                }
                else if (currentData.product === 'Louver') {
                    response = await axios.get(`${apiUrl}/louverVarients`);
                    setVarient(response.data)
                }
            }
            catch (error) {
                console.error('Error fetching types:', error);
            }
        }
        fetchType();
    }, [apiUrl, currentData.product]);

    // const handleSelectedType = async (value) => {
    //     const selectedValue = value;
    //     setSelectedType(selectedValue);
    //     try {
    //         const response = await axios.post(`${apiUrl}/varientTypes`, {
    //             selected_type: selectedValue,
    //             selected_category: currentData.product
    //         })
    //         setVarient(response.data);
    //     }
    //     catch (error) {
    //         console.error('Error fetching Varient Types :', error);
    //     }
    // }

    // useEffect(() => {
    //     console.log("Updated currentData:", currentData);
    // }, [currentData]);

    const handleInputChange = async (name, value) => {
        const numericValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    
        let updatedWidth = parseFloat(currentData.width) || 0;
        let updatedHeight = parseFloat(currentData.height) || 0;
        let updatedQuantity = parseInt(currentData.quantity, 10) || 1;
        let additionalCost = parseFloat(currentData.additionalcost) || 0;
    
        if (name === 'width') updatedWidth = numericValue;
        if (name === 'height') updatedHeight = numericValue;
        if (name === 'quantity') updatedQuantity = numericValue;
        if (name === 'additionalcost') additionalCost = numericValue;
    
        const updatedArea = updatedWidth * updatedHeight;
    
        if (name === 'type') {
            try {
                const response = await axios.post(`${apiUrl}/varientTypes`, {
                    selected_type: value,
                    selected_category: currentData.product,
                });
                setVarient(response.data);
            } catch (error) {
                console.error('Error fetching Variant Types:', error);
            }
        }
    
        if (name === 'width' || name === 'height') {
            setCurrentData((prev) => ({
                ...prev,
                [name]: value,
                area: updatedArea,
            }));
    
            try {
                const response = await axios.post(`${apiUrl}/pricelist`, {
                    height: updatedHeight,
                    width: updatedWidth,
                    selectedProduct: currentData.product,
                    selectedType: currentData.type,
                    selectedVarient: currentData.varient,
                    brand: currentData.brand,
                });
    
                if (response.data?.data !== undefined) {
                    const fetchedPrice = response.data.data;
                    setCurrentData((prev) => ({
                        ...prev,
                        price: fetchedPrice,
                        totalPrice: fetchedPrice * updatedQuantity,
                        total: fetchedPrice * updatedQuantity + additionalCost,
                        img: response.data.img,
                    }));
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                console.error('Error fetching price list:', error);
            }
        } else if (name === 'quantity' || name === 'additionalcost') {
            setCurrentData((prev) => ({
                ...prev,
                [name]: value,
                totalPrice: (prev.price || 0) * updatedQuantity, // Ensure totalPrice updates
                total: ((prev.price || 0) * updatedQuantity) + additionalCost, // Ensure total updates
            }));
        } else {
            setCurrentData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };
    
    


    const handleSave = () => {
        setSavedData((prev) => [...prev, currentData]);
        alert("Data Saved Successfully");
        setCurrentData({
            brand: "Veka", product: "Door", type: "", varient: "", mesh: "Yes", width: "",
            height: "", area: "", price: "", glass: "", roller: "", handleType: "",
            color: "", additionalcost: "", quantity: "", total: "", img: "",
        })
    }

    const handleEditChange = (e, index) => {
        const { name, value } = e.target;
        setSavedData((prev) =>
            prev.map((row, i) =>
                i === index ? { ...row, [name]: value, } : row
            )
        )
    }

    const handleDeleteRow = (index) => {
        setSavedData((prev) => prev.filter((_, i) => i !== index));
    }

    const handlecus = (e) => {
        const { name, value } = e.target;
        setCustomer((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setCustomer((prev) => ({
            ...prev,
            date: formattedDate,
            netTotal: netTotal,
            gst: gst,
            gTotal: gTotal
        }))
    }

    const handleFinish = async () => {

        const printContent = document.getElementById('printDesignContent');
        const images = printContent.querySelectorAll('img');

        const imagePromises = Array.from(images).map((img) => {
            return new Promise((resolve, reject) => {
                if (img.complete) {
                    resolve();
                }
                else {
                    img.onload = resolve;
                    img.onerror = reject;
                }
            })
        })

        try {

            await Promise.all(imagePromises);
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
            }

            const response = await axios.post(`${apiUrl}/quotation-save`, { data });

            if (response.status === 200) {
                console.log('Data sent successfully!');
                alert("The Quotation Save and Download Successfully...")
            }
            else {
                console.error('Failed to send data to backend:', response.status);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const netTotal = savedData.reduce((total, data) => total + parseFloat(data.totalPrice), 0);
    const gst = parseFloat(netTotal * 18) / 100;
    const gTotal = parseFloat(netTotal) + parseFloat(gst);
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
                                onChange={(e) => handleInputChange('brand', e.target.value)}
                                value={currentData.brand || ''}
                            >
                                <option value='Veka' className='p-2 text-md'>VEKA</option>
                                <option value='Eiti' className='p-2 text-md'>EITI</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Product : </label>
                            <select
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                // name="product"
                                value={currentData.product || ''}
                                onChange={(e) => handleInputChange('product', e.target.value)}
                            >
                                <option className='p-2 text-md'>Door</option>
                                <option className='p-2 text-md'>Window</option>
                                <option className='p-2 text-md'>Louver</option>
                            </select>
                        </div>
                        {(currentData.product === 'Door' || currentData.product === 'Window') && (
                            <div className="flex flex-col gap-4">
                                <label className="font-semibold ml-1 uppercase">Type : </label>
                                <select
                                    className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    // onChange={(e) => handleSelectedType(e.target.value)}
                                    // value={selectedType || ''}
                                    value={currentData.type || ''}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                >
                                    <option className='p-2 text-md'>Select</option>
                                    {type.map((typeItem, index) => (
                                        <option key={index}>{typeItem}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Variant : </label>
                            <select
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={currentData.varient || ''}
                                onChange={(e) => handleInputChange('varient', e.target.value)}
                            >
                                <option className='p-2 text-md'>Select</option>
                                {varient.map((varientItem, index) => (
                                    <option key={index}>{varientItem.varient}</option>
                                ))}
                            </select>
                        </div>
                        {(currentData.product === 'Window' || currentData.product === 'Louver') && (
                            <>
                                <div className="flex flex-col gap-4">
                                    <label className="font-semibold ml-1 uppercase">Mesh : </label>
                                    <select
                                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        name="mesh"
                                        value={currentData.mesh || ''}
                                        onChange={(e) => handleInputChange('mesh', e.target.value)}
                                    >
                                        <option value='Yes' className='p-2 text-md'>Yes</option>
                                        <option value='No' className='p-2 text-md'>No</option>
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
                                onChange={(e) => handleInputChange('width', e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Height : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="height"
                                value={currentData.height || ''}
                                onChange={(e) => handleInputChange('height', e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Sq Ft : </label>
                            <input
                                className="w-full bg-white p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                value={currentData.price || ''}
                                onChange={(e) => handleInputChange('price', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Quantity : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="quantity"
                                value={currentData.quantity || ''}
                                onChange={(e) => handleInputChange('quantity', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Total Qty Price : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="total"
                                value={currentData.totalPrice || ''}
                                onChange={(e) => handleInputChange('totalPrice', e.target.value)}

                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Glass : </label>
                            <select
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="glass"
                                value={currentData.glass || ''}
                                onChange={(e) => handleInputChange('glass', e.target.value)}
                            >
                                <option className='p-2 text-md'>Select</option>
                                <option className='p-2 text-md'>Normal Glass</option>
                                <option className='p-2 text-md'>Toughened Glass</option>
                            </select>
                        </div>
                        {/* <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Roller : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="roller"
                                value={currentData.roller || ''}
                                onChange={(e) => handleInputChange('roller', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Handle Type : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="handleType"
                                value={currentData.handleType || ''}
                                onChange={(e) => handleInputChange('handleType', e.target.value)}
                            />
                        </div> */}
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">COLOUR : </label>
                            <select
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="glass"
                                value={currentData.color || ''}
                                onChange={(e) => handleInputChange('color', e.target.value)}
                            >
                                <option className='p-2 text-md'>Select</option>
                                <option className='p-2 text-md'>Mahogany</option>
                                <option className='p-2 text-md'>Rustic Oak</option>
                                <option className='p-2 text-md'>Golden Oak</option>
                                <option className='p-2 text-md'>Black</option>
                                <option className='p-2 text-md'>Anthracite Grey</option>
                                <option className='p-2 text-md'>Walnut</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase">Additional Cost : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={currentData.additionalcost || ''}
                                onChange={(e) => handleInputChange('additionalcost', e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <label className="font-semibold ml-1 uppercase ">Total Cost : </label>
                            <input
                                className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={currentData.total || ''}
                                onChange={(e) => handleInputChange('total', e.target.value)}
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
                        <h2 className="text-2xl font-semibold text-blue-800 px-2 pt-8">ORDER DETAILS</h2>
                        <table className="min-w-full table-auto mt-5 border-collapse border-2 border-black">
                            <thead>
                                <tr className="bg-orange-300">
                                    <th className="border-2 border-black px-4 py-2 uppercase font-bold">Brand</th>
                                    <th className="border-2 border-black px-4 py-2 uppercase font-bold">Type</th>
                                    <th className="border-2 border-black px-4 py-2 uppercase font-bold">Variant</th>
                                    <th className="border-2 border-black px-4 py-2 uppercase font-bold">Mesh</th>
                                    <th className="border-2 border-black px-4 py-2 uppercase font-bold">Width</th>
                                    <th className="border-2 border-black px-4 py-2 uppercase font-bold">Height</th>
                                    <th className="border-2 border-black px-4 py-2 uppercase font-bold">Area</th>
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
                                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        className="w-full p-3 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        <div id="printDesignContent" className='mt-5'>
                            <div className=''>
                                <div className='bg-blue-600 text-white font-bold text-xl p-2'>To</div>
                                {/* <div className='bg-slate-400 text-white font-bold text-xl p-2'>Deliver To</div> */}
                                <div className='font-semibold uppercase p-2'>
                                    {customer.cus_name} <br />
                                    {customer.cus_add} <br />
                                    {customer.cus_con} <br />
                                </div>
                            </div>
                            <div className='grid grid-cols-3'>
                                <div className='bg-blue-600 text-white font-bold text-xl p-2'>Quotation No</div>
                                <div className='bg-blue-600 text-white font-bold text-xl p-2'>Products</div>
                                <div className='bg-blue-600 text-white font-bold text-xl p-2'>Date</div>
                                <div className='font-semibold p-2'>{customer.quotation}</div>
                                <div className='font-semibold p-2'>{customer.salesper}</div>
                                <div className='font-semibold p-2'>{formattedDate}</div>
                            </div>
                            {savedData.length > 0 && (
                                <div>
                                    <div className='grid grid-cols-5 w-auto'>
                                        <div className='bg-blue-600 text-white font-bold text-xl p-2'>Sales Line</div>
                                        <div className='bg-blue-600 text-white font-bold text-xl p-2'>Details</div>
                                        <div className='bg-blue-600 text-white font-bold text-xl p-2'>Qty</div>
                                        <div className='bg-blue-600 text-white font-bold text-xl p-2'>Rate (Rs.)</div>
                                        <div className='bg-blue-600 text-white font-bold text-xl p-2'>Amount (Rs.)</div>
                                    </div>
                                    {savedData.map((data, index) => (
                                        <div key={index} className='grid grid-cols-5 mt-5 '>

                                            <div className='border border-black p-2'> <img src={`${apiUrl}${data.img}`} alt="Product" className="max-w-full h-auto" /></div>
                                            <div className='border border-black p-2'>
                                                Size : W = {data.width}; H = {data.height} <br />
                                                Area : {data.area}<br />
                                                Glass : {data.glass} <br />
                                                Color : {data.color} <br />
                                                {/* Handle Type : {data.handleType} <br />
                                                Roller : {data.roller} <br />
                                                Roller : {data.type} <br /> */}
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
                                    <div className='grid grid-cols-5'>
                                        <div className='col-span-4 border border-black p-2 font-bold text-right'>Net Total</div>
                                        <div className='border border-black p-2 text-center font-bold'> {netTotal.toFixed(2)} </div>
                                        <div className='col-span-4 border border-black p-2 font-bold text-right'>GST</div>
                                        <div className='border border-black p-2 text-center font-bold'> {gst.toFixed(2)} </div>
                                        <div className='col-span-4 border border-black p-2 font-bold text-right'>Grand Total</div>
                                        <div className='border border-black p-2 text-center font-bold'> {gTotal.toFixed(2)} </div>
                                    </div>
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