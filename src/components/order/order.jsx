import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Order() {
    const [quotations, setQuotations] = useState([]);
    const [isModalOpen, setIsModelOpen] = useState(false);
    const [selectedQuotation, setSelectedQuotation] = useState(null); // New state for selected quotation
    const [editedProduct, setEditedProduct] = useState({}); // New state for editing product details

    const apiUrl = import.meta.env.VITE_API_URL;

    // -------------------------------------------------------------------
    // fetch quotation details
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

    // -------------------------------------------------------------------

    // confirm order
    const confirmOrder = async (order) => {
        try {
            await axios.post(`${apiUrl}/orderconfirm`, order);
            alert('Order Confirmed successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    // -------------------------------------------------------------------

    // edit quotation
    const editQuotation = (quotation) => {

        setSelectedQuotation(quotation);
        setEditedProduct(quotation.product[0]); // Assuming the product details are in the first item of the array
        setIsModelOpen(true);
    };

    // -------------------------------------------------------------------


    // handle modal input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // -------------------------------------------------------------------


    // save edited product
    const saveEditedProduct = async () => {
        try {
            console.log(editedProduct);
            
            // const updatedQuotation = {
            //     ...selectedQuotation,
            //     product: [editedProduct], // Replace the product array with the edited product
            // };
            // await axios.put(`${apiUrl}/quotation/${selectedQuotation._id}`, updatedQuotation);
            // setQuotations((prev) =>
            //     prev.map((item) =>
            //         item._id === selectedQuotation._id ? updatedQuotation : item
            //     )
            // );
            // setIsModelOpen(false);
            // alert('Product updated successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    // close the modal

    const closeModal = () => {
        setIsModelOpen(false)
    }

    return (
        <div className="w-full h-full bg-white">
            <h1 className="font-bold text-center text-2xl">Order Confirmation Details</h1>
            <table className="w-full bg-white shadow-md rounded-lg border-collapse mt-5">
                <thead>
                    <tr className="h-20 bg-blue-500 text-white text-lg">
                        <th className="border border-gray-300 py-6">Quotation No</th>
                        <th className="border border-gray-300 py-6">Sales Person Id</th>
                        <th className="border border-gray-300 py-6">Customer Name</th>
                        <th className="border border-gray-300 py-6">Address</th>
                        <th className="border border-gray-300 py-6">Contact No</th>
                        <th className="border border-gray-300 py-6">Confirm</th>
                        <th className="border border-gray-300 py-6">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {quotations.length > 0 ? (
                        quotations.map((quotation, index) => (
                            <tr key={index} className="font-bold uppercase text-center">
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
                    <div className="modal-content bg-white p-6 rounded-md shadow-lg w-11/12 max-w-4xl">
                        <h2 className="text-lg font-bold mb-4">Edit Product Details</h2>
                        <div className="grid grid-cols-3 gap-4"> {/* Grid layout */}
                            {/* Product */}
                            <div className="flex flex-col">
                                <label htmlFor="product" className="mb-1 font-semibold text-sm">Product</label>
                                <input
                                    type="text"
                                    id="product"
                                    name="product"
                                    value={editedProduct.product}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Product"
                                    disabled
                                />
                            </div>

                            {/* Brand */}
                            <div className="flex flex-col">
                                <label htmlFor="brand" className="mb-1 font-semibold text-sm">Brand</label>
                                <input
                                    type="text"
                                    id="brand"
                                    name="brand"
                                    value={editedProduct.brand}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Brand"
                                />
                            </div>

                            {/* Color */}
                            <div className="flex flex-col">
                                <label htmlFor="color" className="mb-1 font-semibold text-sm">Color</label>
                                <input
                                    type="text"
                                    id="color"
                                    name="color"
                                    value={editedProduct.color}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Color"
                                />
                            </div>

                            {/* Price */}
                            <div className="flex flex-col">
                                <label htmlFor="price" className="mb-1 font-semibold text-sm">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={editedProduct.price}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Price"
                                />
                            </div>

                            {/* Quantity */}
                            <div className="flex flex-col">
                                <label htmlFor="quantity" className="mb-1 font-semibold text-sm">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={editedProduct.quantity}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Quantity"
                                />
                            </div>

                            {/* Total */}
                            <div className="flex flex-col">
                                <label htmlFor="total" className="mb-1 font-semibold text-sm">Total</label>
                                <input
                                    type="number"
                                    id="total"
                                    name="total"
                                    value={editedProduct.total}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Total"
                                />
                            </div>

                            {/* Total Price */}
                            <div className="flex flex-col">
                                <label htmlFor="totalPrice" className="mb-1 font-semibold text-sm">Total Price</label>
                                <input
                                    type="number"
                                    id="totalPrice"
                                    name="totalPrice"
                                    value={editedProduct.totalPrice}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Total Price"
                                />
                            </div>

                            {/* Height */}
                            <div className="flex flex-col">
                                <label htmlFor="height" className="mb-1 font-semibold text-sm">Height</label>
                                <input
                                    type="number"
                                    id="height"
                                    name="height"
                                    value={editedProduct.height}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Height"
                                />
                            </div>

                            {/* Width */}
                            <div className="flex flex-col">
                                <label htmlFor="width" className="mb-1 font-semibold text-sm">Width</label>
                                <input
                                    type="number"
                                    id="width"
                                    name="width"
                                    value={editedProduct.width}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Width"
                                />
                            </div>

                            {/* Mesh */}
                            <div className="flex flex-col">
                                <label htmlFor="mesh" className="mb-1 font-semibold text-sm">Mesh</label>
                                <input
                                    type="text"
                                    id="mesh"
                                    name="mesh"
                                    value={editedProduct.mesh}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Mesh"
                                />
                            </div>

                            {/* Roller */}
                            <div className="flex flex-col">
                                <label htmlFor="roller" className="mb-1 font-semibold text-sm">Roller</label>
                                <input
                                    type="text"
                                    id="roller"
                                    name="roller"
                                    value={editedProduct.roller}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Roller"
                                />
                            </div>

                            {/* Glass */}
                            <div className="flex flex-col">
                                <label htmlFor="glass" className="mb-1 font-semibold text-sm">Glass</label>
                                <input
                                    type="text"
                                    id="glass"
                                    name="glass"
                                    value={editedProduct.glass}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Glass"
                                />
                            </div>

                            {/* Handle Type */}
                            <div className="flex flex-col">
                                <label htmlFor="handleType" className="mb-1 font-semibold text-sm">Handle Type</label>
                                <input
                                    type="text"
                                    id="handleType"
                                    name="handleType"
                                    value={editedProduct.handleType}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Handle Type"
                                />
                            </div>

                            {/* Additional Cost */}
                            <div className="flex flex-col">
                                <label htmlFor="additionalcost" className="mb-1 font-semibold text-sm">Additional Cost</label>
                                <input
                                    type="number"
                                    id="additionalcost"
                                    name="additionalcost"
                                    value={editedProduct.additionalcost}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Additional Cost"
                                />
                            </div>

                            {/* Variant */}
                            <div className="flex flex-col">
                                <label htmlFor="varient" className="mb-1 font-semibold text-sm">Variant</label>
                                <input
                                    type="text"
                                    id="varient"
                                    name="varient"
                                    value={editedProduct.varient}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Variant"
                                />
                            </div>

                            {/* Type */}
                            <div className="flex flex-col">
                                <label htmlFor="type" className="mb-1 font-semibold text-sm">Type</label>
                                <input
                                    type="text"
                                    id="type"
                                    name="type"
                                    value={editedProduct.type}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Type"
                                />
                            </div>

                            {/* Area */}
                            <div className="flex flex-col">
                                <label htmlFor="area" className="mb-1 font-semibold text-sm">Area</label>
                                <input
                                    type="number"
                                    id="area"
                                    name="area"
                                    value={editedProduct.area}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                    placeholder="Area"
                                />
                            </div>
                        </div>

                        {/* Modal Buttons */}
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="px-3 py-1 font-bold text-md bg-gray-300 text-black rounded-md hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-3 py-1 font-bold text-md bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
