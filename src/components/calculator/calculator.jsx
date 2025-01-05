import React, { useState } from 'react';

const App = () => {
  const [unit, setUnit] = useState('m2');
  const [inputValue, setInputValue] = useState('');
  const [squareFeet, setSquareFeet] = useState('');

  const conversionFactorM2ToFt = 10.764;
  const conversionFactorCm2ToFt = 1e-4 * 10.764;

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
    setInputValue('');
    setSquareFeet('');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (unit === 'm2') {
      if (value) {
        setSquareFeet((value * conversionFactorM2ToFt).toFixed(6));
      } else {
        setSquareFeet('');  // Clears squareFeet when inputValue is cleared
      }
    } else if (unit === 'cm2') {
      if (value) {
        setSquareFeet((value * conversionFactorCm2ToFt).toFixed(6));
      } else {
        setSquareFeet('');  // Clears squareFeet when inputValue is cleared
      }
    }
  };

  const handleSquareFeetChange = (e) => {
    const value = e.target.value;
    setSquareFeet(value);

    if (value === '') {
      // Clear both inputs when squareFeet is cleared
      setInputValue('');
    } else {
      if (unit === 'm2') {
        setInputValue((value / conversionFactorM2ToFt).toFixed(6));
      } else if (unit === 'cm2') {
        setInputValue((value / conversionFactorCm2ToFt).toFixed(6));
      }
    }
  };

  const handleClear = () => {
    setInputValue('');
    setSquareFeet('');
    setUnit('m2');
  };

  return (
    <div className="w-full h-full flex items-center justify-center rounded-md bg-blue-300">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h3 className="text-2xl font-extrabold text-center  text-gray-800 mb-6">
          Area Converter
        </h3>

        {/* Unit Selection Dropdown */}
        <div>
          <label htmlFor="unit" className="block text-lg font-medium text-gray-700 mb-2">
            Select Unit:
          </label>
          <select
            id="unit"
            value={unit}
            onChange={handleUnitChange}
            className="w-full px-4 py-3 text-lg border border-black rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="m2">Square Meter (m²)</option>
            <option value="cm2">Square Centimeter (cm²)</option>
          </select>
        </div>

        {/* Input Box (Value in Selected Unit) */}
        <div>
          <label htmlFor="inputValue" className="block text-lg font-medium text-gray-700 mb-2">
            {unit === 'm2' ? 'Square Meters' : 'Square Centimeters'}:
          </label>
          <input
            type="number"
            id="inputValue"
            value={inputValue}
            onChange={handleInputChange}
            placeholder={`Enter value in ${unit === 'm2' ? 'm²' : 'cm²'}`}
            className="w-full px-4 py-3 text-lg border border-black rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Output Box (Square Feet Result) */}
        <div>
          <label htmlFor="squareFeet" className="block text-lg font-medium text-gray-700 mb-2">
            Square Feet (ft²):
          </label>
          <input
            type="number"
            id="squareFeet"
            value={squareFeet}
            onChange={handleSquareFeetChange}
            placeholder="Enter value in ft²"
            className="w-full px-4 py-3 text-lg border border-black rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <button
            onClick={handleClear}
            className="mt-4 px-6 py-3 w-40 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-md transition duration-300 transform hover:scale-105"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
