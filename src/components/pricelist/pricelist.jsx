import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PriceList = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [products, setProducts] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const [deletePrice, setDeletePrice] = useState(false);
    const [deleteData, setDeleteData] = useState({});
    const [searchQuery, setSearchQuery] = useState(""); // Search Query State

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/pricelistdata`);
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [apiUrl]);

    const handlePriceEdit = (value) => {
        setEdit(true);
        setEditData(value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePriceDelete = (value) => {
        setDeleteData(value);
        setDeletePrice(true);
    };

    const handleSaveData = async () => {
        try {
            const response = await axios.post(`${apiUrl}/editprice`, { editData });
            if (response.data) {
                alert(response.data.Message);
            }
        } catch (err) {
            alert("Something Went wrong in Update price");
        }
        setEdit(false);
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post(`${apiUrl}/deleteprice`, { deleteData });
            if (response.data) {
                alert("DATA DELETED");
            }
        } catch (err) {
            alert("ERROR");
        }
        setDeletePrice(false);
    };

    // Filter products based on the search query
    const filteredProducts = products.filter((product) =>
        product.variant.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-full h-screen">
            <h1 className="text-black text-3xl font-bold text-center">Price List</h1>
            <div className="w-full h-fit flex justify-between items-center gap-5 py-2">
                <h1 className="font-bold text-lg">No of Products: {filteredProducts.length}</h1>
                <div className="flex gap-5">
                    <input
                        type="text"
                        placeholder="Search by product name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-80 p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    />
                    <button className="h-12 w-24 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition duration-300">
                        Add
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2 border border-gray-300">S:NO</th>
                            <th className="px-4 py-2 border border-gray-300">Category</th>
                            <th className="px-4 py-2 border border-gray-300">Type</th>
                            <th className="px-4 py-2 border border-gray-300">Price</th>
                            <th className="px-4 py-2 border border-gray-300">SQFT</th>
                            <th className="px-4 py-2 border border-gray-300">Edit</th>
                            <th className="px-4 py-2 border border-gray-300">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-300 text-center">{index + 1}</td>
                                    <td className="px-4 py-2 border border-gray-300 text-center">{product.type}</td>
                                    <td className="px-4 py-2 border border-gray-300">{product.variant}</td>
                                    <td className="px-4 py-2 border border-gray-300 text-center">{product.price}</td>
                                    <td className="px-4 py-2 border border-gray-300 text-center">{product.width}*{product.height}</td>
                                    <td className="px-4 py-2 border border-gray-300 text-center">
                                        <button
                                            onClick={() => handlePriceEdit(product)}
                                            className="px-3 py-1 w-32 h-10 font-bold text-md bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300 text-center">
                                        <button
                                            onClick={() => handlePriceDelete(product)}
                                            className="px-3 py-1 w-32 h-10 font-bold text-md ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="px-4 py-2 border border-gray-300 text-center">No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/* Edit Modal */}
            {edit && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <button
                            onClick={() => setEdit(false)}
                            className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md"
                        >
                            ✕
                        </button>
                        <h2 className="text-xl font-bold mb-4">Edit Details</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Category</label>
                                <input
                                    type="text"
                                    name="variant"
                                    value={editData.variant || ""}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={editData.type || ""}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Price</label>
                                <input
                                    type="text"
                                    name="price"
                                    value={editData.price || ""}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Square Footage</label>
                                <input
                                    type="text"
                                    name="sqft"
                                    value={`${editData.width || ""}x${editData.height || ""}`}
                                    readOnly
                                    className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500"
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={handleSaveData}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEdit(false)}
                                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 shadow-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Delete Confirmation Modal */}
            {deletePrice && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-80 p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-xl font-bold text-red-500 mb-4">Delete Confirmation</h2>
                        <div className="flex flex-col gap-2 text-gray-700">
                            <p><strong>Variant:</strong> {deleteData.variant}</p>
                            <p><strong>Category:</strong> {deleteData.category}</p>
                            <p><strong>Variety:</strong> {deleteData.variety}</p>
                            <p><strong>Price:</strong> {deleteData.price}</p>
                            <p><strong>Dimensions:</strong> {deleteData.width} x {deleteData.height}</p>
                        </div>
                        <div className="flex justify-between gap-4 mt-6">
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setDeletePrice(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 shadow-md"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PriceList;
