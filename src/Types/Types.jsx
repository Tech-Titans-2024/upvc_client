import React from 'react';
import { useLocation } from 'react-router-dom';

function Types() {
    const location = useLocation();
    const { selectedProducts } = location.state || { selectedProducts: [] };

    return (
        <div>
            <h1>Selected Products</h1>
            {selectedProducts.length > 0 ? (
                <ul>
                    {selectedProducts.map((product, index) => (
                        <li key={index}>{product}</li>
                    ))}
                </ul>
            ) : (
                <p>No products selected.</p>
            )}
        </div>
    );
}

export default Types;
