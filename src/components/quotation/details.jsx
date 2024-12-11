import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WindowCalculationForm = ({ type, onFormChange, onSubmit }) => {
    const [formData, setFormData] = useState({
        quantity: '',
        series: '',
        designType: '',
        width: '',
        height: '',
        area: 0,
        glass: '',
        color: '',
        sliderOF: '',
        sliderSash: '',
        alRail: '',
        espag: '',
        accessoriesType: '',
        handleType: '',
        handleColor: '',
        roller: '',
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            const updatedData = { ...prev, [name]: value };
            if (name === 'width' || name === 'height') {
                const calculatedArea = (parseFloat(updatedData.width) || 0) * (parseFloat(updatedData.height) || 0);
                updatedData.area = calculatedArea;
            }
            onFormChange(type, updatedData);
            return updatedData;
        });
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Type: {type}</h2>
            <form className="grid grid-cols-3 gap-5">
                <div>
                    <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md mt-6 border-black"
                        placeholder="Quantity"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Series</label>
                    <select
                        name="series"
                        value={formData.series}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                    >
                        {listBoxOptions.series.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Design Type</label>
                    <select
                        name="designType"
                        value={formData.designType}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded-md"
                    >
                        {listBoxOptions.designType.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">(Width x Height)</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            name="width"
                            placeholder="Width"
                            value={formData.width}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="number"
                            name="height"
                            placeholder="Height"
                            value={formData.height}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium">Area</label>
                    <div className="p-2 border rounded-md bg-gray-200">
                        {formData.area} sq units
                    </div>
                </div>
                {Object.keys(listBoxOptions)
                    .filter((key) => !['series', 'designType'].includes(key))
                    .map((field, idx) => (
                        <div key={idx}>
                            <label className="block text-gray-700 font-medium capitalize">
                                {field.replace(/([A-Z])/g, ' $1')}
                            </label>
                            <select
                                name={field}
                                value={formData[field]}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-md"
                            >
                                {listBoxOptions[field].map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
            </form>
            <button
                onClick={() => onSubmit(type, formData)}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
            >
                Submit
            </button>
        </div>
    );
};

function Measurement() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedTypes } = location.state || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [formData, setFormData] = useState({});

    const handleFormChange = (type, data) => {
        setFormData((prev) => ({ ...prev, [type]: data }));
    };

    const handleSubmit = (type, data) => {
        console.log(`Measurement Data for ${type}:`, data);
    };

    const handleNext = () => {
        if (currentIndex < selectedTypes.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            // Navigate to summary or next page after all measurements
            console.log("All measurements completed:", formData);
            navigate("/summary", { state: { formData } });
        }
    };

    if (!selectedTypes || selectedTypes.length === 0) {
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

    const { productName, subCategory, types } = selectedTypes[currentIndex];

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Measurement Details: {productName} - {subCategory}
            </h1>
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
                {types.map((typeItem, index) => (
                    <div key={index} className="mb-6">
                        <WindowCalculationForm
                            type={typeItem.type}
                            onFormChange={handleFormChange}
                            onSubmit={handleSubmit}
                        />
                    </div>
                ))}
            </div>
            <button
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
                onClick={handleNext}
            >
                {currentIndex < selectedTypes.length - 1 ? "Continue" : "Finish"}
            </button>
        </div>
    );
}

export default Measurement;
