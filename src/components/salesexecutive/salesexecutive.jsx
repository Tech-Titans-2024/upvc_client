import React from 'react'

const StaffManage = () => {
    return (
        <div className='w-full h-screen  '>
            <h1 className='text-black text-3xl font-bold text-center'>Sales Executive</h1>
            <div className='w-full h-fit  flex justify-between items-center
             gap-5 py-2 '>
                <div className='flex flex-row justify-start'>
                    <h1 className='font-bold text-md'>No Of Staff:4</h1>

                </div>
                <div className=' flex flex-row justify-end'>
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
            <div class="overflow-x-auto mt-3">
                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse">
                        <thead>
                            <tr class="bg-blue-500 text-white">
                                <th class="px-4 py-2 border border-gray-300">S.No</th>
                                <th class="px-4 py-2 border border-gray-300">Staff ID</th>
                                <th class="px-4 py-2 border border-gray-300">Staff Name</th>
                                <th class="px-4 py-2 border border-gray-300">Phone No</th>
                                <th class="px-4 py-2 border border-gray-300">Edit</th>
                                <th class="px-4 py-2 border border-gray-300">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="hover:bg-gray-100">
                                <td class="px-4 py-2 border border-gray-300 text-center">1</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">S001</td>
                                <td class="px-4 py-2 border border-gray-300">Mohamed Hanifa M</td>
                                <td class="px-4 py-2 border border-gray-300">9342592854</td>
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
                            <tr class="hover:bg-gray-100">
                                <td class="px-4 py-2 border border-gray-300 text-center">2</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">S002</td>
                                <td class="px-4 py-2 border border-gray-300">Mohamed Jainul Haneef M</td>
                                <td class="px-4 py-2 border border-gray-300">9876345267</td>
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
                            <tr class="hover:bg-gray-100">
                                <td class="px-4 py-2 border border-gray-300 text-center">3</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">S003</td>
                                <td class="px-4 py-2 border border-gray-300">Mohamed Hamdhan J</td>
                                <td class="px-4 py-2 border border-gray-300">9629601141</td>
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
                            <tr class="hover:bg-gray-100">
                                <td class="px-4 py-2 border border-gray-300 text-center">4</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">S004</td>
                                <td class="px-4 py-2 border border-gray-300">Abdul Rasak </td>
                                <td class="px-4 py-2 border border-gray-300">9834526780</td>
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
                        </tbody>
                    </table>
                </div>

            </div>



        </div>
    )
}

export default StaffManage;