import React, { useState } from 'react';

const App = () => 
{
	const [unit, setUnit] = useState('m2');
	const [inputValue, setInputValue] = useState('');
	const [squareFeet, setSquareFeet] = useState('');

	const conversionFactorM2ToFt = 10.764;
	const conversionFactorCm2ToFt = 1e-4 * 10.764;

	const handleUnitChange = (e) => {
		setUnit(e.target.value);
		setInputValue('');
		setSquareFeet('');
	}

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInputValue(value);
		if (unit === 'm2') {
			if (value) {
				setSquareFeet((value * conversionFactorM2ToFt).toFixed(6));
			}
			else {
				setSquareFeet('');
			}
		}
		else if (unit === 'cm2') {
			if (value) {
				setSquareFeet((value * conversionFactorCm2ToFt).toFixed(6));
			}
			else {
				setSquareFeet('');
			}
		}
	}

	const handleSquareFeetChange = (e) => {
		const value = e.target.value;
		setSquareFeet(value);
		if (value === '') {
			setInputValue('');
		}
		else {
			if (unit === 'm2') {
				setInputValue((value / conversionFactorM2ToFt).toFixed(6));
			}
			else if (unit === 'cm2') {
				setInputValue((value / conversionFactorCm2ToFt).toFixed(6));
			}
		}
	}

	const handleClear = () => {
		setInputValue('');
		setSquareFeet('');
		setUnit('m2');
	}

	return (
		<div className="w-full h-full flex items-center justify-center rounded-md bg-gradient-to-r from-green-500 to-blue-500">
			<div className="bg-white p-12 rounded-lg shadow-lg w-full max-w-4xl">
				<h1 className="text-3xl font-bold text-center text-gray-800 mb-8 font-cambria">AREA CONVERTER</h1>
				<div className="mb-10">
					<label htmlFor="unit" className="block text-xl font-medium text-gray-700 mb-3">
						Select Unit :
					</label>
					<select
						id="unit"
						value={unit}
						onChange={handleUnitChange}
						className="w-full px-6 py-3 border border-black rounded-md text-gray-700 focus:outline-none focus:ring-black focus:border-black text-lg"
					>
						<option value="m2">Square Meter (m²)</option>
						<option value="cm2">Square Centimeter (cm²)</option>
					</select>
				</div>
				<div className="flex flex-col sm:flex-row sm:space-x-8">
					<div className="flex-1 mb-10 sm:mb-0">
						<label htmlFor="inputValue" className="block text-xl font-medium text-gray-700 mb-3">
							{unit === 'm2' ? 'Square Meters ' : 'Square Centimeters'}:
						</label>
						<input
							type="number"
							id="inputValue"
							value={inputValue}
							onChange={handleInputChange}
							placeholder={`Enter value in ${unit === 'm2' ? 'm²' : 'cm²'}`}
							className="w-full px-6 py-3 border border-black rounded-md text-gray-700 focus:outline-none focus:ring-black focus:border-black text-lg"
						/>
					</div>
					<div className="flex-1">
						<label htmlFor="squareFeet" className="block text-xl font-medium text-gray-700 mb-3">
							Square Feet (ft²) :
						</label>
						<input
							type="number"
							id="squareFeet"
							value={squareFeet}
							onChange={handleSquareFeetChange}
							placeholder="Enter value in ft²"
							className="w-full px-6 py-3 border border-black rounded-md text-gray-700 focus:outline-none focus:ring-black focus:border-black text-lg"
						/>
					</div>
				</div>
				<div className="flex justify-end mt-8">
					<button
						onClick={handleClear}
						className="px-7 py-2.5 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 text-xl"
					>
						Reset
					</button>
				</div>
			</div>
		</div>
	)
}

export default App;