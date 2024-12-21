import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PriceList = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/price`);
                console.log(response.data); // Check the structure of the response
                setProducts(response.data); // Set the fetched products data to state
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [apiUrl]);

    return (
        <div className="w-full h-screen">
            <h1 className="text-black text-3xl font-bold text-center">Price List</h1>
            <div className='w-full h-fit  flex justify-between items-center
             gap-5 py-2'>
                <h1 className='font-bold text-md'>No Of Products:22</h1>
                <input
                    type="text"
                    placeholder="Search by product name"
                    class="w-80 p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
                <button
                    class="h-12 w-24 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition duration-300"
                >
                    Add
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="px-4 py-2 border border-gray-300">Category ID</th>
                            <th className="px-4 py-2 border border-gray-300">Category</th>
                            <th className="px-4 py-2 border border-gray-300">Type</th>
                            <th className="px-4 py-2 border border-gray-300">Price</th>
                            <th className="px-4 py-2 border border-gray-300">Edit</th>
                            <th className="px-4 py-2 border border-gray-300">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-4 py-2 border border-gray-300 text-center">{product.category_id}</td>
                                    <td className="px-4 py-2 border border-gray-300 text-center">{product.category}</td>
                                    <td className="px-4 py-2 border border-gray-300">{product.type}</td>
                                    <td className="px-4 py-2 border border-gray-300 text-center">{product.price}</td>
                                    <td className="px-4 py-2 border border-gray-300 text-center">
                                        <button className="px-3 py-1 w-32 h-10 font-bold text-md bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                                            Edit
                                        </button>

                                    </td>
                                    <td className="px-4 py-2 border border-gray-300 text-center">
                                        <button className="px-3 py-1  w-32 h-10  font-bold text-md ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-2 border border-gray-300 text-center">No products found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PriceList;