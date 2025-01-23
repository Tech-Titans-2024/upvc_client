import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faTimes, faSave } from "@fortawesome/free-solid-svg-icons";

const CustomerManage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [customers, setCustomers] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${apiUrl}/customers`);
                if (response.data.Message) {
                    alert("No customers found.");
                } else {
                    setCustomers(response.data);
                }
            } catch (err) {
                alert("Error fetching customers!");
            }
        };

        fetchCustomers();
    }, []);

    const toggleEditModal = (customer) => {
        setSelectedCustomer(customer);
        setFormData({
            name: customer.cus_name,
            phone: customer.cus_con,
            address: customer.cus_add,
        });
        setIsEditModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleUpdateCustomer = async () => {
        try {
            console.log(selectedCustomer);  // Log the selected customer object

            const payload = {
                cus_name: formData.name,
                cus_con: formData.phone,
                cus_add: formData.address,
            };

            if (!selectedCustomer || !selectedCustomer._id) {
                console.error("Customer ID (_id) is missing");
                return;
            }

            // Make PUT request to backend using _id (not cus_id)
            const response = await axios.put(
                `${apiUrl}/customers/${selectedCustomer._id}`,  // Use _id here
                payload
            );

            if (response.status === 200) {
                alert("Customer updated successfully!");

                // Update the local state with the new data
                const updatedCustomers = customers.map((customer) =>
                    customer._id === selectedCustomer._id
                        ? { ...customer, ...payload }
                        : customer
                );
                setCustomers(updatedCustomers);

                // Close the modal
                setIsEditModalOpen(false);
            }
        } catch (error) {
            alert("Error updating customer!");
            console.error(error);
        }
    };


    const handleDeleteCustomer = async (id) => {
        try {
            const response = await axios.delete(`${apiUrl}/customers/${id}`);
            if (response.status === 200) {
                alert("Customer deleted successfully!");

                // Update state to reflect the deletion
                setCustomers(customers.filter(customer => customer._id !== id));
            }
        } catch (error) {
            alert("Error deleting customer!");
            console.error(error);
        }
    };


    return (
        <div className="w-full h-screen text-md">
            <h1 className="text-black text-3xl font-bold text-center">Customer Profile</h1>
            <div className="w-full h-fit flex justify-between items-center gap-5 py-2">
                <h1 className="font-bold text-lg">No of Customers : {customers.length}</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-80 p-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg border-collapse text-center">
                    <thead>
                        <tr className="bg-blue-500 text-white h-16">
                            <th className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">S No</th>
                            <th className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">Qtn Id</th>
                            <th className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">Cus Name</th>
                            <th className="px-4 py-2 border border-gray-300">Phone No</th>
                            <th className="px-4 py-2 border border-gray-300">Address</th>
                            <th className="px-4 py-2 border border-gray-300">Edit</th>
                            <th className="px-4 py-2 border border-gray-300">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr key={index} className="hover:bg-gray-100"> {/* Use _id */}
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{index + 1}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{customer.quotation_no}</td>
                                <td className="px-4 py-2 border border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">{customer.cus_name}</td>
                                <td className="px-4 py-2 border border-gray-300">{customer.cus_con}</td>
                                <td className="px-4 py-2 border border-gray-300">{customer.cus_add}</td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button
                                        className="px-3 py-1 w-32 h-10 font-bold text-md bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none"
                                        onClick={() => toggleEditModal(customer)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="mr-2" />
                                        Edit
                                    </button>
                                </td>
                                <td className="px-4 py-2 border border-gray-300">
                                    <button
                                        className="px-3 py-1 w-32 h-10 font-bold text-md ml-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
                                        onClick={() => handleDeleteCustomer(customer._id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isEditModalOpen && selectedCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Customer Profile</h2>

                        <form>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Customer Name:</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Phone No:</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block font-medium mb-2">Address:</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg focus:outline-none"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </form>

                        <div className="flex justify-between mt-4">
                            <button
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                onClick={() => setIsEditModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                onClick={handleUpdateCustomer}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );


};

export default CustomerManage;
