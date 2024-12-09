import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Quotation() {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [products, setProducts] = useState([]);
    const [subCategories, setSubCategories] = useState({});
    const [selectedCategories, setSelectedCategories] = useState({});
    const [types, setTypes] = useState({});
    const [quantityInputs, setQuantityInputs] = useState({});

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

    const handleProductSelect = async (productName) => {
        if (!subCategories[productName]) {
            try {
                const response = await axios.post(`${apiUrl}/subcategory`, { product_name: productName });
                setSubCategories((prev) => ({
                    ...prev,
                    [productName]: response.data.sub_categories || [],
                }));
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        }
    };

    const handleSubCategorySelect = async (productName, subCategory, isChecked) => {
        setSelectedCategories((prev) => {
            const updatedCategories = { ...prev };
            if (isChecked) {
                if (!updatedCategories[productName]) updatedCategories[productName] = [];
                updatedCategories[productName] = [...updatedCategories[productName], subCategory];
            } else {
                updatedCategories[productName] = updatedCategories[productName].filter((item) => item !== subCategory);
            }
            return updatedCategories;
        });

        if (isChecked) {
            try {
                const response = await axios.post(`${apiUrl}/type`, { sub_category: subCategory });
                setTypes((prev) => ({
                    ...prev,
                    [productName]: {
                        ...prev[productName],
                        [subCategory]: response.data.type || [],
                    },
                }));
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        } else {
            setTypes((prev) => {
                const updatedTypes = { ...prev };
                if (updatedTypes[productName]) {
                    delete updatedTypes[productName][subCategory];
                }
                return updatedTypes;
            });
        }
    };

    const handleQuantityChange = (productName, typeId, quantity) => {
        setQuantityInputs((prev) => ({
            ...prev,
            [`${productName}-${typeId}`]: quantity,
        }));
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Quotation Details</h1>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="min-w-full bg-white table-auto border-collapse">
                    <thead className="bg-gray-200 text-gray-700 text-sm uppercase">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold">Product Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Subcategories</th>
                            <th className="px-6 py-3 text-left font-semibold">Types</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={index} className="border-t hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox h-5 w-5 text-blue-500"
                                                value={product.product_name}
                                                onChange={() => handleProductSelect(product.product_name)}
                                            />
                                            <span className="font-medium">{product.product_name}</span>
                                        </label>
                                    </td>
                                    <td className="px-6 py-4">
                                        {subCategories[product.product_name]?.length > 0 ? (
                                            subCategories[product.product_name].map((subItem, subIndex) => (
                                                <div key={subIndex} className="mb-2">
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox h-4 w-4 text-blue-500"
                                                            value={subItem}
                                                            onChange={(e) =>
                                                                handleSubCategorySelect(product.product_name, subItem, e.target.checked)
                                                            }
                                                        />
                                                        <span>{subItem}</span>
                                                    </label>
                                                </div>
                                            ))
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {selectedCategories[product.product_name]?.length > 0 ? (
                                            selectedCategories[product.product_name].map((subItem) => (
                                                <div key={subItem} className="mb-4">
                                                    <span className="font-semibold">{subItem} Types:</span>
                                                    {types[product.product_name]?.[subItem]?.map((typeItem) => (
                                                        <div key={typeItem._id} className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                className="form-checkbox h-4 w-4 text-blue-500"
                                                                value={typeItem.type}
                                                            />
                                                            <span>{typeItem.type}</span>
                                                            <input
                                                                type="number"
                                                                className="border p-2 ml-2 w-24 rounded-md text-gray-700"
                                                                placeholder="Qty"
                                                                onChange={(e) =>
                                                                    handleQuantityChange(
                                                                        product.product_name,
                                                                        typeItem._id,
                                                                        e.target.value
                                                                    )
                                                                }
                                                                value={quantityInputs[`${product.product_name}-${typeItem._id}`] || ''}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-6 py-3 text-center text-gray-500">
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
