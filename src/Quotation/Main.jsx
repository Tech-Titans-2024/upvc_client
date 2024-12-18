import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Products from './Components/Products';
import Door from './Components/Door';
import Window from './Components/Window';
import Louver from './Components/Louver';
import Logo from '../assets/logo.jpeg';

function Main() 
{
    const apiUrl = import.meta.env.VITE_API_URL;
    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState({ door: null, window: null, louver: null });
    const [doorId, setDoorId] = useState(false);
    const [windowId, setWindowId] = useState(false);
    const [louverId, setLouverId] = useState(false);

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/productDetails`);
                setProducts(response.data);
            }
            catch (error) { }
        }
        fetchProducts()

    }, [apiUrl])

    const handleProductCheck = (id, check) => {

        if (id === 1) { setSelectedProducts((prev) => ({ ...prev, door: check ? id : null })) }
        if (id === 2) { setSelectedProducts((prev) => ({ ...prev, window: check ? id : null })) }
        if (id === 3) { setSelectedProducts((prev) => ({ ...prev, louver: check ? id : null })) }
    }

    const handleProductSelection = () => {

        setDoorId(selectedProducts.door !== null);
        setWindowId(selectedProducts.window !== null);
        setLouverId(selectedProducts.louver !== null);

    }

    return (
        <div className="relative w-full h-[100%] flex flex-col gap-6">
            <div className="absolute inset-0 flex items-center justify-center my-auto mx-auto" style={{ backgroundImage: `url(${Logo})`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center", width: '80%', height: '80%', opacity: 0.1, zIndex: -1 }} />
            <span className='text-2xl tracking-wide font-bold text-center font-sans text-gray-800 uppercase'>QUOTATION DETAiLS</span>
            <Products handleProductCheck={handleProductCheck} products={products} />
            <div className='flex justify-end'>
                <button className='bg-blue-700 text-white py-2.5 px-6 rounded-lg shadow hover:bg-blue-800 transition duration-200' onClick={handleProductSelection}>SUBMIT</button>
            </div>
            <Door doorId={doorId} />
            <Window windowId={windowId} />
            <Louver louverId={louverId} />
        </div>
    )
}

export default Main