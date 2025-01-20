import axios, { spread } from 'axios';
import React, { useEffect, useState } from 'react';
// import Edit from '../Edit/Edit';
// import Edit from '../Edit/edit';

const PriceList = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [products, setProducts] = useState([]);
    const [edit, setEdit] = useState(false);
    const [editData, setEditData] = useState({});
    const [deletePrice, setDeletePrice] = useState(false);
    const [deleteData, setDeleteData] = useState({});

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

    // console.log(products)

    //---------------------------------------
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
        // console.log(editData.pro_price_id)
    };

    const handlePriceDelete = (value) => {
        setDeleteData(value);
        setDeletePrice(true);
        // Your delete logic here
    };
    const handleSaveData = async () => {
        try {
            const response = await axios.post(`${apiUrl}/editprice`, { editData });
            if (response.data) {
                alert(response.data.Message)
            }

        } catch (err) {
            alert("Something Went wrong in Update price")

        }
        setEdit(false)
    }
    const handledelete = async () => {
        try {
            const response = await axios.post(`${apiUrl}/deleteprice`, { deleteData });
            if (response.data) {
                alert("DATA DELETED")
            }
        } catch (ess) {
            alert("ERROR")
        }
        setDeletePrice(false);
    }

    return (
        <div className="w-full h-screen">
            <h1 className="text-black text-3xl font-bold text-center">Price List</h1>
            <div className="w-full h-fit  flex justify-between items-center gap-5 py-2 ">
                <h1 className="font-bold text-lg">No of Products: {products.length}</h1>
                <div className=' flex gap-5'>
                    <input
                        type="text"
                        placeholder="Search by product name"
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
                        {products.length > 0 ? (
                            products.map((product, index) => (
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
            {edit && (
                <div className="bg-green-400 w-2/5 h-4/5 absolute inset-0 top-10 m-auto flex flex-col justify-center gap-3 p-4 shadow-lg rounded-lg">
                    <button
                        onClick={() => setEdit(false)}
                        className="self-end px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                        X
                    </button>
                    <label>Category</label>
                    <input
                        type="text"
                        name="variant"
                        value={editData.variant || ""}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                    />
                    <label>Type</label>
                    <input
                        type="text"
                        name="type"
                        value={editData.type || ""}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                    />
                    <label>Price</label>
                    <input
                        type="text"
                        name="price"
                        value={editData.price || ""}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                    />
                    <label>Square Footage</label>
                    <input
                        type="text"
                        name="sqft"
                        value={`${editData.width || ""}x${editData.height || ""}`}
                        readOnly
                        className="border p-2 rounded bg-gray-100"
                    />
                    <button onClick={handleSaveData}>Save</button>
                </div>
            )}
            {deletePrice && (
                <div className='w-60 h-60 bg-red-400 inset-0 m-auto absolute flex flex-col gap-4 justify-center items-center '>
                    <span>{deleteData.variant}</span>
                    <span>{deleteData.category}</span>
                    <span>{deleteData.variety}</span>
                    <span>{deleteData.price}</span>
                    <span>{deleteData.width}X{deleteData.height}</span>
                    <button onClick={handledelete}>Delete</button>
                    <button onClick={() => setDeletePrice(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default PriceList;
