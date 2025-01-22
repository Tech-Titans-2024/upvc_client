import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Order() {
    const [quotations, setQuotations] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedQuotation, setSelectedQuotation] = useState(null);
    const [editedProducts, setEditedProducts] = useState([]); // For editing multiple products

    const apiUrl = import.meta.env.VITE_API_URL;

    // Fetch quotation details
    useEffect(() => {
        const fetchQuotationDetails = async () => {
            try {
                const response = await axios.get(`${apiUrl}/quotation`);
                setQuotations(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuotationDetails();
    }, [apiUrl]);

    // Confirm order
    const confirmOrder = async (order) => {
        try {
            await axios.post(`${apiUrl}/orderconfirm`, order);
            alert('Order Confirmed successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    // Edit quotation and open modal
    const editQuotation = (quotation) => {
        setSelectedQuotation(quotation);
        setEditedProducts(quotation.product); // Initialize edited products with the current products in the quotation
        setIsModalOpen(true);
    };

    // Handle input change for each product
    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedProducts = [...editedProducts];
        updatedProducts[index] = { ...updatedProducts[index], [name]: value };
        setEditedProducts(updatedProducts);
    };

    // Save edited products
    const saveEditedProduct = async () => {
        try {
            const updatedQuotation = { ...selectedQuotation, product: editedProducts };
            console.log(updatedQuotation);

            const response = await axios.put(`${apiUrl}/quotation/${selectedQuotation._id}`, updatedQuotation);
            setQuotations((prev) =>
                prev.map((item) =>
                    item._id === selectedQuotation._id ? updatedQuotation : item
                )
            );
            setIsModalOpen(false);
            alert('Product updated successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    //delete quotation

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
        <div className="w-full h-full bg-white">
            <h1 className="font-bold text-center text-2xl">Order Confirmation Details</h1>
            <div className=' flex justify-between items-center'>

                <h1 className='font-bold text-lg'>No of Quotations : {quotations.length}</h1>
                <input
                    type="text"
                    placeholder="Search by product name"
                    className="w-80 p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
            </div>

            <table className="w-full bg-white shadow-md rounded-lg border-collapse mt-2">
                <thead>
                    <tr className="h-20 bg-blue-500 text-white text-lg">
                        <th className="border border-gray-300 py-6">Quotation No</th>
                        <th className="border border-gray-300 py-6">Sales Person Id</th>
                        <th className="border border-gray-300 py-6">Customer Name</th>
                        <th className="border border-gray-300 py-6">Address</th>
                        <th className="border border-gray-300 py-6">Contact No</th>
                        <th className="border border-gray-300 py-6">Confirm</th>
                        <th className="border border-gray-300 py-6">Edit</th>
                        <th className="border border-gray-300 py-6">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {quotations.length > 0 ? (
                        quotations.map((quotation, index) => (
                            <tr key={index} className="uppercase text-center">
                                <td className="px-4 py-2 border border-gray-300">{quotation.quotation_no}</td>
                                <td className="px-4 py-2 border border-gray-300">{quotation.salesper}</td>
                                <td className="px-4 py-2 border border-gray-300">{quotation.cus_name}</td>
                                <td className="px-4 py-2 border border-gray-300">{quotation.cus_add}</td>
                                <td className="px-4 py-2 border border-gray-300">{quotation.cus_con}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button
                                        className="px-3 py-1 w-32 h-10 font-bold text-md bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                                        onClick={() => confirmOrder(quotation)}
                                    >
                                        Confirm
                                    </button>
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button
                                        className="px-3 py-1 w-32 h-10 font-bold text-md bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                                        onClick={() => editQuotation(quotation)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button
                                        className="px-3 py-1 w-32 h-10 font-bold text-md bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                        onClick={() => deleteQuotation(quotation)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan="6"
                                className="px-4 py-2 border border-gray-300 text-center"
                            >
                                No Quotations Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal-overlay fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <div className="modal-content bg-white p-6 rounded-lg shadow-2xl w-11/12 max-w-4xl">
                        <h2 className="text-lg font-bold mb-4 text-center">Edit Product Details</h2>

                        {/* Scrollable product list with fixed height */}
                        <div className="max-h-96 overflow-y-auto mb-6">
                            {editedProducts.map((product, index) => (
                                <div key={index} className="product-section mb-8 p-4 rounded-lg shadow-lg bg-gray-100">
                                    <h3 className="text-xl font-semibold mb-3 text-blue-600">Product {index + 1}</h3>

                                    <div className="grid grid-cols-3 gap-4">
                                        {/* Product Details */}
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

                        {/* Modal Buttons */}
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
    );
}

export default Order;
