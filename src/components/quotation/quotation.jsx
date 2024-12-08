import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Quotation() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [products, setProducts] = useState([]); // Array to store products
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/product`);
                setProducts(response.data);
            } catch (err) {
                console.error('Error fetching products:', err.message);
            }
        };

        fetchProducts();
    }, [apiUrl]);

    // Handle product selection and fetch subcategories
    const handleProductSelect = async (productName) => {
        setSelectedProduct(productName);
        try {
            const response = await axios.post(`${apiUrl}/subcategory`, {
                product_name: productName,
            });
            console.log(response.data)

            const subCategories = response.data.sub_categories || [];

            // Update the products array to include subcategories for the selected product
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.product_name === productName
                        ? { ...product, subItems: subCategories } // Add subItems (subcategories) to the product
                        : product
                )
            );
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    return (
        <div className="p-6 min-h-full">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Quotation Details</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 text-sm">
                            <th className="px-6 py-3 text-left">Product Name</th>
                            <th className="px-6 py-3 text-left">Sub-items</th>
                            <th className="px-6 py-3 text-left">Fields</th>
                            <th className="px-6 py-3 text-left">Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={index} className="border-t text-sm text-gray-700">
                                    <td className="px-6 py-3">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-4 w-4 text-blue-500"
                                                value={product.product_name}
                                                onChange={() => handleProductSelect(product.product_name)}
                                            />
                                            <span>{product.product_name}</span>
                                        </label>
                                    </td>
                                    <td className="px-6 py-3">
                                        {product.subItems ? (
                                            product.subItems.map((subItem, subIndex) => (
                                                <label
                                                    key={subIndex}
                                                    className="flex items-center space-x-2 mb-1"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox h-4 w-4 text-blue-500"
                                                        value={subItem}
                                                    />
                                                    <span>{subItem}</span>
                                                </label>
                                            ))
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                    <td className="px-6 py-3">{product.fields || 'N/A'}</td>
                                    <td className="px-6 py-3">{product.quantity || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-3 text-center text-gray-500">
                                    No products available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Quotation;
