import React from 'react'

const StaffManage = () => {
    return (
        <div className='w-full h-screen  '>
            <h1 className='text-black text-3xl font-bold text-center'>Staff Manage</h1>
            <div className='w-full h-fit  flex justify-between py-2'>
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
            <div class="overflow-x-auto">
                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse">
                        <thead>
                            <tr class="bg-blue-500 text-white">
                                <th class="px-4 py-2 border border-gray-300">S.No</th>
                                <th class="px-4 py-2 border border-gray-300">Staff ID</th>
                                <th class="px-4 py-2 border border-gray-300">Staff Name</th>
                                <th class="px-4 py-2 border border-gray-300">Phone No</th>
                                <th class="px-4 py-2 border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="hover:bg-gray-100">
                                <td class="px-4 py-2 border border-gray-300 text-center">1</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">S001</td>
                                <td class="px-4 py-2 border border-gray-300">Mohamed Hanifa M</td>
                                <td class="px-4 py-2 border border-gray-300">1234567890</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">
                                    <button class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                                        Edit
                                    </button>
                                    <button class="px-3 py-1 ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr class="hover:bg-gray-100">
                                <td class="px-4 py-2 border border-gray-300 text-center">2</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">S002</td>
                                <td class="px-4 py-2 border border-gray-300">Mohamed Jainul Haneef M</td>
                                <td class="px-4 py-2 border border-gray-300">1234567890</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">
                                    <button class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                                        Edit
                                    </button>
                                    <button class="px-3 py-1 ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr class="hover:bg-gray-100">
                                <td class="px-4 py-2 border border-gray-300 text-center">3</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">S003</td>
                                <td class="px-4 py-2 border border-gray-300">Mohamed Hamdhan J</td>
                                <td class="px-4 py-2 border border-gray-300">1234567890</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">
                                    <button class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                                        Edit
                                    </button>
                                    <button class="px-3 py-1 ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            <tr class="hover:bg-gray-100">
                                <td class="px-4 py-2 border border-gray-300 text-center">4</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">S004</td>
                                <td class="px-4 py-2 border border-gray-300">Abdul Rasak </td>
                                <td class="px-4 py-2 border border-gray-300">1234567890</td>
                                <td class="px-4 py-2 border border-gray-300 text-center">
                                    <button class="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none">
                                        Edit
                                    </button>
                                    <button class="px-3 py-1 ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
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