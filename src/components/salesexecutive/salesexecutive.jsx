import React, { useEffect, useState } from 'react'
import axios, { spread } from 'axios';
const StaffManage = () => {

    const apiUrl = import.meta.env.VITE_API_URL;
    const [salesPersons, setSalesPersons] = useState([]);

    useEffect(() => {
        const fetchSalesPersons = async () => {
            try {
                const response = await axios.get(`${apiUrl}/salespersons`);
                if (response.data.Message) {
                    return null;
                } else {
                    setSalesPersons(response.data);
                }
            } catch (err) {
                alert("ERROR");
            }
        };

        fetchSalesPersons();
    }, []);
    console.log(salesPersons)
    return (
        <div className='w-full h-screen'>
            <h1 className='text-black text-3xl font-bold text-center'>Sales Executive</h1>
            <div className='w-full h-fit  flex justify-between items-center gap-5 py-2 '>
                <div className='flex flex-row justify-start'>
                    <h1 className='font-bold text-lg'>No of Staff : {salesPersons.length}</h1>

                </div>
                <div className=' flex gap-5'>
                    <input
                        type="text"
                        placeholder="Search by product name"
                        class="w-80 p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    />
                    <button
                        class="h-12 w-24 px-6 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition duration-300"
                    >
                        Add
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto ">
                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse">
                        <thead>
                            <tr class="bg-blue-500 text-white">
                                <th class="px-4 py-2 border border-gray-300">S.No</th>
                                <th class="px-4 py-2 border border-gray-300">Staff ID</th>
                                <th class="px-4 py-2 border border-gray-300">Staff Name</th>
                                <th class="px-4 py-2 border border-gray-300">Phone No</th>
                                <th class="px-4 py-2 border border-gray-300">Address</th>
                                <th class="px-4 py-2 border border-gray-300">Edit</th>
                                <th class="px-4 py-2 border border-gray-300">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {salesPersons && (
                                salesPersons.map((value, index) => {
                                   return <tr class="hover:bg-gray-100">
                                        <td class="px-4 py-2 border border-gray-300 text-center">{index+1}</td>
                                        <td class="px-4 py-2 border border-gray-300 text-center">{value.username}</td>
                                        <td class="px-4 py-2 border border-gray-300">{value.name}</td>
                                        <td class="px-4 py-2 border border-gray-300">{value.number}</td>
                                        <td class="px-4 py-2 border border-gray-300">{value.address}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-center">
                                            <button className="px-3 py-1 w-32 h-10 font-bold text-md bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                                                Edit
                                            </button>

                                        </td>
                                        <td className="px-4 py-2 border border-gray-300 text-center">
                                            <button className="px-3 py-1  w-32 h-10  font-bold text-md ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                })
                            )}

                        </tbody>
                    </table>
                </div>

            </div>



        </div>
    )
}

export default StaffManage;