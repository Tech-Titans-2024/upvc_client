import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [typeId, setTypeId] = useState('');
    const [isValidTypeId, setIsValidTypeId] = useState(true);

    const apiUrl = import.meta.env.VITE_API_URL;

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleTypeIdChange = (e) => {
        setTypeId(e.target.value);
    };

    const checkTypeIdExists = async () => {
        try {
            const response = await axios.get(`${apiUrl}/check-typeid/${typeId}`);
            if (response.data.exists) {
                setIsValidTypeId(true);
            } else {
                setIsValidTypeId(false);
                alert('Type ID does not exist in the database !!')
            }
        } catch (error) {
            console.error('Error checking typeId:', error);
            setIsValidTypeId(false);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }
        if (!typeId) {
            alert('Please enter a Type ID.');
            return;
        }
        if (!isValidTypeId) {
            alert('Invalid Type ID. Please enter a valid Type ID.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('type_id', typeId);

        try {
            const response = await axios.post(`${apiUrl}/upload`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert(response.data.message);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload file.');
        }
    };

    return (
        <div className='bg-blue-300 h-full rounded-lg'>
            <h1 className='text-black text-3xl font-bold text-center'>Upload Product Image</h1>
            <div className='p-5'>
                <div className='flex justify-center items-center gap-5 mt-10 border-2 border-black h-60 rounded-lg'>
                    <label className='font-bold text-lg'>Type Id: </label>
                    <input
                        type="number"
                        className='w-40 h-12 p-3 border-2 border-black rounded-lg  placeholder-gray-400'
                        value={typeId}
                        onChange={handleTypeIdChange}
                        onBlur={checkTypeIdExists}
                        placeholder="Enter Type ID"
                    />
                <div className='flex gap-5'>
                    <div className='border-2 border-black rounded-lg  bg-white h-12 p-2 w-80 '>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                    <button
                        className="bg-blue-700 w-32 h-12 font-bold text-lg text-white py-2.5 px-6 rounded-lg shadow hover:bg-blue-800 transition duration-200"

                        onClick={handleUpload}>Upload</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default App;
