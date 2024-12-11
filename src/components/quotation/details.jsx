import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WindowCalculationForm = ({ type }) => {
    const [size, setSize] = useState({ width: '', height: '' });
    const [area, setArea] = useState(0);

    const listBoxOptions = {
        series: ['Series 1', 'Series 2', 'Series 3'],
        designType: ['Type A', 'Type B', 'Type C'],
        glass: ['Clear', 'Frosted', 'Tinted'],
        color: ['White', 'Black', 'Silver'],
        sliderOF: ['Option 1', 'Option 2', 'Option 3'],
        sliderSash: ['Sash A', 'Sash B', 'Sash C'],
        alRail: ['Rail X', 'Rail Y', 'Rail Z'],
        espag: ['Espag 1', 'Espag 2', 'Espag 3'],
        accessoriesType: ['Type 1', 'Type 2', 'Type 3'],
        handleType: ['Handle A', 'Handle B', 'Handle C'],
        handleColor: ['Gold', 'Silver', 'Black'],
        roller: ['Roller 1', 'Roller 2', 'Roller 3'],
    };

    const handleSizeChange = (e) => {
        const { name, value } = e.target;
        setSize({ ...size, [name]: value });
    };

    const calculateArea = () => {
        const { width, height } = size;
        const calculatedArea = (parseFloat(width) || 0) * (parseFloat(height) || 0);
        setArea(calculatedArea);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Type: {type}</h2>
            <form className="grid grid-cols-3 gap-5">
                <div>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md mt-6 border-black"
                        placeholder="Quantity"
                    />
                </div>
                {/* Series */}
                <div>
                    <label className="block text-gray-700 font-medium">Series</label>
                    <select className="w-full p-2 border rounded-md" name="series">
                        {listBoxOptions.series.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Design Type */}
                <div>
                    <label className="block text-gray-700 font-medium">Design Type</label>
                    <select className="w-full p-2 border rounded-md" name="designType">
                        {listBoxOptions.designType.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Size */}
                
                <div>
                    <label className="block text-gray-700 font-medium">(Width x Height)</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            name="width"
                            placeholder="Width"
                            value={size.width}
                            onChange={handleSizeChange}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="number"
                            name="height"
                            placeholder="Height"
                            value={size.height}
                            onChange={handleSizeChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                </div>

                {/* Area */}
                <div>
                    <label className="block text-gray-700 font-medium">Area</label>
                    <div className="p-2 border rounded-md bg-gray-200">
                        {area} sq units
                    </div>
                    <button
                        type="button"
                        onClick={calculateArea}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Calculate Area
                    </button>
                </div>

                {/* Dynamic Fields */}
                {Object.keys(listBoxOptions)
                    .filter((key) => !['series', 'designType'].includes(key))
                    .map((field, idx) => (
                        <div key={idx}>
                            <label className="block text-gray-700 font-medium capitalize">
                                {field.replace(/([A-Z])/g, ' $1')}
                            </label>
                            <select className="w-full p-2 border rounded-md" name={field}>
                                {listBoxOptions[field].map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
            </form>
        </div>
    );
};

function Measurement() {
    const location = useLocation();
    const navigate = useNavigate();
    const { productName, selectedTypes } = location.state || {};

    if (!productName || !selectedTypes || selectedTypes.length === 0) {
        return (
            <div className="p-4 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-semibold text-gray-800">Invalid Data</h1>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Measurement Details for {productName}
            </h1>
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
                {selectedTypes.map(({ subCategory, types }) => (
                    <div key={subCategory} className="mb-6">
                        <h1 className="text-md font-medium mb-2">{subCategory}</h1>
                        {types.map((typeItem, index) => (
                            <div key={index} className="mb-6">
                                <WindowCalculationForm type={typeItem.type} />
                            </div>
                        ))}
                    </div>
                ))}
                <button
                    onClick={() => navigate("/upvc/quotation")}
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
                >
                    Quotation
                </button>
            </div>
        </div>
    );
}

export default Measurement;
