import React, { useState } from 'react';

const App = () => {
  const [squareMm, setSquareMm] = useState('');
  const [squareFeet, setSquareFeet] = useState('');

  const conversionFactorMmToFt = 10.764 / 1e6; // Square Millimeters to Square Feet
  const conversionFactorFtToMm = 1e6 / 10.764; // Square Feet to Square Millimeters

  // Handle square millimeters to square feet conversion
  const handleSquareMmChange = (e) => {
    const value = e.target.value;
    setSquareMm(value);
    if (value) {
      setSquareFeet((value * conversionFactorMmToFt).toFixed(6)); // Convert to ft²
    } else {
      setSquareFeet('');
    }
  };

  // Handle square feet to square millimeters conversion
  const handleSquareFeetChange = (e) => {
    const value = e.target.value;
    setSquareFeet(value);
    if (value) {
      setSquareMm((value * conversionFactorFtToMm).toFixed(0)); // Convert to mm²
    } else {
      setSquareMm('');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen rounded-lg bg-blue-300">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-80">
        <h1 className="text-2xl font-bold mb-4 text-center">Area Converter</h1>

        {/* Square Millimeter Input */}
        <div className="mb-4">
          <label
            htmlFor="squareMm"
            className="block  text-gray-700 text-xl font-medium mb-2"
          >
            Square Millimeters:
          </label>
          <input
            type="number"
            id="squareMm"
            value={squareMm}
            onChange={handleSquareMmChange}
            placeholder="Enter value"
            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Square Feet Input */}
        <div className="mb-4">
          <label
            htmlFor="squareFeet"
            className="block text-gray-700 text-xl font-medium mb-2"
          >
            Square Feet:
          </label>
          <input
            type="number"
            id="squareFeet"
            value={squareFeet}
            onChange={handleSquareFeetChange}
            placeholder="Enter value"
            className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default App;