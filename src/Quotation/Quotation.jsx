import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Quotation() {
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/fetchProduct`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [apiUrl]);

    const handleProduct = (productName, isChecked) => {
        setSelectedProducts((prev) =>
            isChecked
                ? [...prev, productName]
                : prev.filter((product) => product !== productName)
        );
    };

    const handleProductSubmit = () => {
        // Navigate to another page and send selectedProducts as state
        navigate('/upvc/types', { state: { selectedProducts } });
    };

    return (
        <div>
            {products.map((product, index) => (
                <label key={index}>
                    <input
                        type="checkbox"
                        onChange={(e) =>
                            handleProduct(product.product_name, e.target.checked)
                        }
                    />
                    <span>{product.product_name}</span>
                </label>
            ))}
            <button onClick={handleProductSubmit}>Submit</button>
        </div>
    );
}

export default Quotation;
