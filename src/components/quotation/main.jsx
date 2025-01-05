import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import html2pdf from 'html2pdf.js';
import Product from './product';
import Summary from './summary';
import Customer from './customer';
import Quotation from './quotation';

function Main() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [type, setType] = useState([]);
    const [varient, setVarient] = useState([]);
    const [savedData, setSavedData] = useState([]);
    const [quotation, setQuotation] = useState(false)
    const [salesPersons, setSalesPersons] = useState([]);
    const [currentData, setCurrentData] = useState({
        brand: 'Veka', product: 'Door', type: '', varient: '',
        mesh: 'Yes', width: '', height: '', area: '', price: '', glass: '', roller: '', totalPrice: '',
        handleType: '', color: '', additionalcost: '', quantity: '', total: '', img: ''
    })
    const [customer, setCustomer] = useState({
        salesper: '', quotation: '',
        cus_name: '', cus_add: '', cus_con: '', date: '', netTotal: '', gst: '', gTotal: ''
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
                console.error('Error fetching Types :', error);
            }
        }


        //-----------------------------------------------------------------------------------------------------

        const fetchSalesman = async () => {
            try {
                const salesmanId = await axios.get(`${apiUrl}/salesmans`);
                if (salesmanId.data) {
                    setSalesPersons(salesmanId.data)
                }
                else {
                    console.log("sales man id Not availabe");
                }
            } catch (err) {
                console.log("ERROR", err)
            }
        }

        //-----------------------------------------------------------------------------------------------------

        const quatationNo = async () => {
            try {
                const QResponse= await axios.get(`${apiUrl}/quotationNo`);
                if(QResponse.data){
                    let Split_no = QResponse.data.match(/(\D+)(\d+)/)
                    let increament=Number(Split_no[2])+1;
                    let New_Q=Split_no[1]+increament.toString();
                    setCustomer((prevCustomer) => ({
                        ...prevCustomer,
                        quotation: New_Q
                    }));
                }

            } catch (err) {
                console.log("NO NA");
            }
        }
        
        quatationNo();
        fetchSalesman();
        fetchType();

    }, [apiUrl, currentData.product]);

    // ---------------------------------------------------------------------------------------------------------

    // Component 1

    const handleInputChange = async (name, value) => {

        const numericValue = isNaN(parseFloat(value)) ? 0 : parseFloat(value);

        if (name === 'type') {
            try {
                const response = await axios.post(`${apiUrl}/varientTypes`, {
                    selected_type: value,
                    selected_category: currentData.product,
                })
                setVarient(response.data);
            }
            catch (error) {
                console.error('Error fetching Variant Types:', error);
            }
        }

        let updatedWidth = parseFloat(currentData.width) || 0;
        let updatedHeight = parseFloat(currentData.height) || 0;
        let updatedQuantity = parseInt(currentData.quantity, 10) || 1;
        let additionalCost = parseFloat(currentData.additionalcost) || 0;

        if (name === 'width') updatedWidth = numericValue;
        if (name === 'height') updatedHeight = numericValue;
        if (name === 'quantity') updatedQuantity = numericValue;
        if (name === 'additionalcost') additionalCost = numericValue;

        const updatedArea = updatedWidth * updatedHeight;

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
                }
                else {
                    console.error('Unexpected Response Format:', response);
                }
            }
            catch (error) {
                console.error('Error fetching Price List:', error);
            }
        }
        else if (name === 'quantity' || name === 'additionalcost') {
            setCurrentData((prev) => ({
                ...prev,
                [name]: value,
                totalPrice: (prev.price || 0) * updatedQuantity,
                total: ((prev.price || 0) * updatedQuantity) + additionalCost,
            }))
        }
        else if (name === 'price') {
            setCurrentData((prev) => ({
                ...prev,
                price: numericValue,
                totalPrice: numericValue * updatedQuantity,
                total: numericValue * updatedQuantity + additionalCost,
            }));
        }
        else {
            setCurrentData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    // ---------------------------------------------------------------------------------------------------------

    const handleSave = () => {

        setSavedData((prev) => [...prev, currentData]);
        alert("Data Saved Successfully");
        setCurrentData((prev) => ({
            ...prev, width: "", height: "", area: "", price: "", glass: "",
            color: "", additionalcost: "", quantity: "", total: "", img: "",
        }));
        console.log(customer.quotation,"QNO")

    }

    // ---------------------------------------------------------------------------------------------------------

    // Component 2

    const handleDeleteRow = (index) => {
        setSavedData((prev) => prev.filter((_, i) => i !== index));
    }

    const handleGetQuotation = () => { setQuotation(true) }

    // ---------------------------------------------------------------------------------------------------------


    const handleCustomer = (e) => {
        const { name, value } = e.target;
        setCustomer((prevState) => ({
            ...prevState,
            [name]: value,
        }))

        setCustomer((prev) => ({
            ...prev,
            date: formattedDate,
            netTotal: netTotal,
            gst: gst,
            gTotal: gTotal
        }))
    }

    // ---------------------------------------------------------------------------------------------------------

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
                filename: 'Quotation.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4, useCORS: true },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            }

            html2pdf().from(printContent).set(options).save();
            const data = {
                customer,
                savedData,
            }

            const response = await axios.post(`${apiUrl}/quotation-save`, { data });

            if (response.status === 200) {
                alert("The Quotation Saved and Downloaded Successfully...")
            }
            else {
                console.error('Failed to send Data to Backend:', response.status);
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
    }

    // ---------------------------------------------------------------------------------------------------------

    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;
    const netTotal = savedData.reduce((total, data) => total + parseFloat(data.totalPrice), 0);
    const gst = parseFloat(netTotal * 18) / 100;
    const gTotal = parseFloat(netTotal) + parseFloat(gst);

    // ---------------------------------------------------------------------------------------------------------


    return (

        <div className='flex flex-col gap-7 p-3'>
            <span className="text-2xl font-semibold text-white bg-slate-500 py-3 px-5">MEASUREMENTS</span>
            <Product handleInputChange={handleInputChange} currentData={currentData} type={type} varient={varient} />
            <div className="flex justify-end">
                <button
                    className="bg-green-700 w-32 font-bold text-lg text-white py-2.5 px-6 rounded-lg shadow hover:bg-green-600 transition duration-200"
                    onClick={handleSave}
                >
                    <FontAwesomeIcon icon={faSave} className="text-md mr-2" />
                    SAVE
                </button>
            </div>
            {savedData.length > 0 && (
                <div className='flex flex-col gap-8'>
                    <h2 className="text-2xl font-semibold text-white bg-slate-500 py-3 px-5">ORDER SUMMARY</h2>
                    <Summary savedData={savedData} handleDeleteRow={handleDeleteRow} setSavedData={setSavedData} />
                    <h2 className="text-2xl font-semibold text-white bg-slate-500 py-3 px-5">CUSTOMER DETAILS</h2>
                    <Customer customer={customer} handleCustomer={handleCustomer} salesmanId={salesPersons} />
                    <div className=' flex justify-end'>
                        <button
                            className="bg-orange-500 font-bold text-lg text-white py-2.5 px-6 rounded-lg shadow hover:bg-orange-600 transition duration-200"
                            onClick={handleGetQuotation}
                        >
                            Get Quotation
                        </button>
                    </div>
                    <Quotation quotation={quotation} customer={customer} savedData={savedData} handleFinish={handleFinish} />
                    {quotation && (
                        <div className='flex justify-end'>
                            <button
                                className="bg-green-600 font-bold text-lg text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                                onClick={handleFinish}
                            >
                                Download Quotation
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Main;