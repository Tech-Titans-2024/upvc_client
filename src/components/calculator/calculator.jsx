import React, { useState } from 'react';

const SqMeterToSqFeet = () => {
  const [sqMeters, setSqMeters] = useState('');
  const [sqFeet, setSqFeet] = useState('');

  const handleInputChange = (value) => {
    setSqMeters(value);
    if (value) {
      const feet = parseFloat(value) * 10.7639; // Conversion factor
      setSqFeet(feet.toFixed(2));
    } else {
      setSqFeet('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label htmlFor="sqMeters" className="block text-sm font-medium text-gray-700">
            Square Meters
          </label>
          <input
            id="sqMeters"
            type="number"
            step="0.01"
            value={sqMeters}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter value in square meters"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {sqFeet && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              Area in Square Feet: <span className="font-bold">{sqFeet} ft²</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SqMeterToSqFeet;
