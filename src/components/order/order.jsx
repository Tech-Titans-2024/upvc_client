import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Order() 
{
    const [quotations, setQuotations] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Unconfirmed');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuotation, setSelectedQuotation] = useState(null);
    const [editedProducts, setEditedProducts] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;

    // Fetch quotation details

    useEffect(() => {
        const fetchQuotationDetails = async () => {
            try {
                const response = await axios.post(`${apiUrl}/quotation`, { selectedStatus });
                setQuotations(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchQuotationDetails()
    }, [apiUrl, selectedStatus])

    const handleChange = (event) => { setSelectedStatus(event.target.value) }

    // Confirm order and Disable button

    const confirmOrder = async (order) => {
        try {
            await axios.post(`${apiUrl}/orderconfirm`, order);
            alert('Order Confirmed successfully!');
            window.location.reload()
        }
        catch (error) {
            console.error(error);
        }
    }

    // Edit Quotation and open Modal

    const editQuotation = (quotation) => {
        setSelectedQuotation(quotation);
        setEditedProducts(quotation.product);
        setIsModalOpen(true);
    }

    // Handle input change for each Product

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProducts = [...editedProducts];
        updatedProducts[index] = { ...updatedProducts[index], [name]: value };
        setEditedProducts(updatedProducts);
    }

    // Save Edited Products

    const saveEditedProduct = async () => {
        try {
            const updatedQuotation = { ...selectedQuotation, product: editedProducts };
            const response = await axios.put(`${apiUrl}/quotation/${selectedQuotation._id}`, updatedQuotation);
            setQuotations((prev) =>
                prev.map((item) =>
                    item._id === selectedQuotation._id ? updatedQuotation : item
                )
            )
            setIsModalOpen(false);
            alert('Product updated successfully!');
        }
        catch (error) {
            console.error(error);
        }
    }

    // Close Modal

    const closeModal = () => { setIsModalOpen(false) }

    // Delete Quotation

    const deleteQuotation = async (quotation) => {
        try {
            const resoponse = await axios.delete(`${apiUrl}/quotation/${quotation._id}`);
            setQuotations(quotations.filter((item) => item._id !== quotation._id));
            alert('Quotation deleted successfully!');
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full h-full bg-white p-2">
            <h1 className="font-bold text-center text-2xl mb-4">Order Confirmation Details</h1>
            <div className="flex justify-between items-center mb-4">
                <h1 className="font-bold text-lg">No of Quotations : {quotations.length}</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-80 p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
            </div>
            <div className="mb-4 flex items-center gap-3">
                <h3 className="font-semibold text-lg">Select Order Status : </h3>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="orderStatus"
                        value="Confirmed"
                        checked={selectedStatus === "Confirmed"}
                        onChange={handleChange}
                        className="w-6 h-6"
                    />
                    <span className="text-lg">Confirmed Order</span>
                </label>
                <label className="flex items-center gap-2">
                    <input
                        type="radio"
                        name="orderStatus"
                        value="Unconfirmed"
                        checked={selectedStatus === "Unconfirmed"}
                        onChange={handleChange}
                        className="w-6 h-6"
                    />
                    <span className="text-lg">Unconfirmed Quotations</span>
                </label>
            </div>
            {selectedStatus && (
                <table className="w-full bg-white shadow-md rounded-lg border-collapse mt-2 text-center">
                    <thead>
                        <tr className="py-6 bg-blue-500 text-white text-lg">
                            <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Qtn No</th>
                            <th className="border border-gray-300 py-6 w-32 whitespace-nowrap overflow-hidden text-ellipsis">Date</th>
                            <th className="border border-gray-300 py-6 px-4 whitespace-nowrap overflow-hidden text-ellipsis">Staff ID</th>
                            <th className="border border-gray-300 py-6 whitespace-nowrap overflow-hidden text-ellipsis">Cus Name</th>
                            <th className="border border-gray-300 py-6 w-32 whitespace-nowrap overflow-hidden text-ellipsis">Address</th>
                            <th className="border border-gray-300 py-6 whitespace-nowrap overflow-hidden text-ellipsis">Contact No</th>
                            {selectedStatus === "Unconfirmed" && <th className="border border-gray-300 py-6">Confirm</th>}
                            <th className="border border-gray-300 py-6">Edit</th>
                            <th className="border border-gray-300 py-6">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotations.length > 0 ? (
                            quotations.map((quotation, index) => (
                                <tr key={index} className="uppercase text-center hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.quotation_no}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.date}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.salesper}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.cus_name}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.cus_add}</td>
                                    <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{quotation.cus_con}</td>
                                    {selectedStatus === "Unconfirmed" && (
                                        <td className="px-4 py-2 border border-gray-300">
                                            <button
                                                className="px-3 py-1 w-32 h-10 font-bold text-md bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                                                onClick={() => confirmOrder(quotation)}
                                            >
                                                <FontAwesomeIcon icon={faCheck} className="mr-2" />
                                                Confirm
                                            </button>
                                        </td>
                                    )}
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button
                                            className="px-3 py-1 w-32 h-10 font-bold text-md bg-teal-600 text-white rounded-md hover:bg-teal-700 focus:outline-none"
                                            onClick={() => editQuotation(quotation)}
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">
                                        <button
                                            className="px-3 py-1 w-32 h-10 font-bold text-md bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                            onClick={() => deleteQuotation(quotation)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={selectedStatus === "Unconfirmed" ? 9 : 8}
                                    className="px-4 py-6 border border-gray-300 text-center"
                                >
                                    No Quotations Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
            {isModalOpen && (
                <div className="modal-overlay fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-2xl w-11/12 max-w-4xl">
                        <h2 className="text-lg font-bold mb-4 text-center">Edit Product Details</h2>
                        <div className="max-h-96 overflow-y-auto mb-6">
                            {editedProducts.map((product, index) => (
                                <div key={index} className="product-section mb-8 p-4 rounded-lg shadow-lg bg-gray-100">
                                    <h3 className="text-xl font-semibold mb-3 text-blue-600">Product {index + 1}</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        {Object.keys(product).map((key) => (
                                            <div className="flex flex-col mb-4" key={key}>
                                                <label htmlFor={key} className="mb-1 font-semibold text-sm text-gray-700">
                                                    {key.replace(/([A-Z])/g, ' $1').toUpperCase()} {/* Format key to readable text */}
                                                </label>
                                                <input
                                                    type={typeof product[key] === 'number' ? 'number' : 'text'}
                                                    id={key}
                                                    name={key}
                                                    value={product[key]}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                    className="w-full px-3 py-2 border rounded-md bg-gray-50 focus:ring-2 focus:ring-blue-500"
                                                    placeholder={key}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="px-4 py-2 font-bold text-md bg-gray-300 text-black rounded-md hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 font-bold text-md bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                onClick={saveEditedProduct}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Order;