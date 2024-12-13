import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

function SubCategory() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
    const [categoryData, setCategoryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const selected = location.state ? location.state.selected : [];
    const [unique, setUnique] = useState([]);
    const [product, setProduct] = useState("");
    const [productname, setProductname] = useState("");
    const [productdetails, setProductdetails] = useState("");
    const [typesByCategory, setTypesByCategory] = useState({});
    const [measurement, setMeasurement] = useState(false);
    const [selectedvalues, setSelectedvalues] = useState([]);
    const [itemIndex, setItemIndex] = useState(0);
    const [mappedItems, setMappedItems] = useState([]);
    const [selectItems, setSelectItems] = useState([])
    const [formDataArray, setFormDataArray] = useState([]);
    const [formData, setFormData] = useState([]);
    // const [itemIndex, setItemIndex] = useState(0);

    useEffect(() => {
        if (selected.length > 0) {
            fetchCategoryData(selected[currentIndex]);

            const currentProduct = selected[currentIndex];
            setProduct(currentProduct);
        }
        const fetchDetails = async () => {
            setProductname(product)
            try {
                const response = await axios.get(`${apiUrl}/productdetails`, { productname })
                if (response.data) {
                    console.log("P NAme", response.data)
                    setProductdetails(response.data.product_name);
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchDetails();
    }, [currentIndex, selected]);




    const fetchCategoryData = async (product) => {
        try {
            const response = await axios.post(`${apiUrl}/product`, { product_id: product });
            setCategoryData(response.data.categories);
        } catch (error) {
            setError(error.message);
            console.error("Error fetching category data:", error);
        }
    };



    const handleSubCategorySelect = (categoryName, isChecked) => {
        console.log("Selected category name:", categoryName, "and product:", product);

        if (isChecked) {
            const filteredTypes = categoryData
                .filter((item) => item.category === categoryName)
                .map((item) => item.type);

            console.log("Filtered types:", filteredTypes);
            setTypesByCategory((prev) => ({
                ...prev,
                [categoryName]: filteredTypes,
            }));
        } else {
            setTypesByCategory((prev) => {
                const updatedTypes = { ...prev };
                delete updatedTypes[categoryName];
                return updatedTypes;
            });
        }
    };



    const handleNext = () => {
        if (currentIndex < selected.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    //-------------------------------------- 
    // measurement

    const handlemeasurement = () => {
        setMeasurement(true);

    }


    useEffect(() => {
        const duplicate = () => {
            const uniqueCategory = [
                ...new Map(categoryData.map((item) => [item.category, item])).values(),
            ];
            setUnique(uniqueCategory);
        };
        duplicate();
    }, [categoryData]);


    const handleCheckboxClick = (category, type, isChecked) => {
        console.log(`Category: ${category}, Type: ${type}, Checked: ${isChecked}`);

        let updatedSelected = [...selectedvalues];  // Accessing the current state directly
        if (isChecked) {
            updatedSelected.push({ category, type });
            console.log("updatedSelected", updatedSelected)
            setSelectItems(updatedSelected)
        } else {
            updatedSelected = updatedSelected.filter(
                (item) => !(item.category === category && item.type === type)
            );
        }

        // Log updatedSelected here directly
        console.log("Updated Selected Values:", selectItems);

        // Set the new state
        setSelectedvalues(updatedSelected);
    };
    //  setSelectedvalues(selectedvalues[0])

    //Add button func
    // const handleAddSection = () => {
    //     setSelectedItems((prevSections) => [
    //         ...prevSections,
    //         { id: prevSections.length, quantity: '', width: '', height: '' },
    //     ]);
    // };

    //measurement value get func
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // If width or height changes, recalculate area
        if (name === "width" || name === "height") {
            const width = parseFloat(formData.width) || 0;
            const height = parseFloat(formData.height) || 0;
            const area = width * height;
            setFormData((prevState) => ({
                ...prevState,
                area,
            }));
        }
    };

    const handleSubmit = () => {
        if (currentTypeIndex < selectItems.length - 1) {
            setCurrentTypeIndex(currentTypeIndex + 1); // Move to the next item
        } else {
            console.log("All items submitted");
            // You can add logic to handle the end of the process, such as resetting the form
        }
        if (itemIndex < selectedvalues.length) {
            const currentItem = selectedvalues[itemIndex];
            console.log("Next Selected Value:", currentItem);

            // Store the item in mappedItems array
            setMappedItems((prevMappedItems) => [...prevMappedItems, currentItem]);
            console.log("mappedItems", mappedItems)
            setItemIndex(prevIndex => prevIndex + 1); // Move to the next item
            console.log("Current Item Index:", currentItem); // Log the current index
        } else {
            console.log("No more values to display.");
        }


        const category = selectItems[currentTypeIndex]?.category;
        const type = selectItems[currentTypeIndex]?.type;
        const { quantity, width, height, area } = formData;

        const newFormData = {
            category,
            type,
            quantity,
            width,
            height,
            area,
        };

        setFormDataArray((prevFormDataArray) => {
            const updatedArray = [...prevFormDataArray, newFormData];
            console.log("Updated Form Data Array:", updatedArray);
            return updatedArray;
        });
    };




    return (
        <div>
            {selected.length > 0 ? (
                <div>
                    <div>
                        <p>{selected[currentIndex]}</p>

                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p style={{ color: 'red' }}>Error: {error}</p>
                        ) : categoryData ? (
                            <div>
                                <h3>Category Data for {selected[currentIndex]}:</h3>
                            </div>
                        ) : (
                            <p>No category data available</p>
                        )}
                    </div>
                </div>
            ) : (
                <p>No products selected</p>
            )}

            <div className="space-y-9">
                <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border border-gray-300">
                    <div className="flex items-center mb-6">
                        <span className="font-medium text-md ml-2 uppercase">
                            Product Name: {productdetails}
                        </span>
                    </div>

                    <div className="flex w-[100%] justify-between border-t border-gray-300 pt-6">
                        <div className="w-[20%] border-r border-gray-300 p-1 flex flex-col">
                            <h3 className="font-semibold text-gray-700 mb-5">
                                SUB CATEGORIES :
                            </h3>
                            {unique && unique.length > 0 ? (
                                unique.map((Category) => (
                                    <div key={Category.category_id} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-5 w-5 text-blue-500"
                                            onChange={(e) => handleSubCategorySelect(Category.category, e.target.checked)} // Pass category_name and checked status
                                        />
                                        <h3>{Category.product_name}</h3>
                                        <span className="ml-2 font-medium text-gray-800">{Category.category}</span>
                                    </div>
                                ))
                            ) : (
                                <p>No categories available</p>
                            )}
                        </div>

                        <div className="w-[75%] mr-3">
                            <h3 className="font-semibold text-gray-700 mb-5">
                                TYPES :
                            </h3>
                            {unique && unique.length > 0 && unique.map((Category) => (
                                <div key={Category.category_id} className="mb-6">
                                    <h4 className="font-semibold mb-2">{Category.category}</h4>
                                    {typesByCategory[Category.category] && typesByCategory[Category.category].length > 0 && (
                                        typesByCategory[Category.category].map((item, index) => (
                                            <div key={index} className="flex items-center gap-3 mt-3">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-center h-4 w-4 text-blue-500"
                                                    onChange={(e) =>
                                                        handleCheckboxClick(Category.category, item, e.target.checked)
                                                    }
                                                />
                                                <span>{item}</span> {/* Display the type */}
                                            </div>
                                        ))
                                    )}
                                </div>
                            ))}

                            <button
                                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
                                onClick={handlemeasurement}
                            >
                                Measurement
                            </button>
                        </div>
                    </div>
                </div>
                {currentIndex >= selected.length - 1 && (
                    <div>
                        <p>You've reached the end of the list!</p>
                    </div>
                )}
            </div>



            {measurement && (
                <div className="p-6 w-1/2 h-1/2 top-{10px} bg-gray-400 rounded-lg shadow-md" >
                    {selectItems.length > 0 && currentTypeIndex < selectItems.length && (
                        <div>
                            <h2 className="text-xl font-semibold mb-4"> Type: {selectItems[currentTypeIndex]?.category}, {selectItems[currentTypeIndex]?.type}</h2>
                            <form className="grid grid-cols-3 gap-5">
                                <div>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md mt-6 border-black"
                                        placeholder="Quantity"
                                        name='quantity'
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Series</label>
                                    <select className="w-full p-2 border rounded-md"
                                        name='series'
                                        value={formData.series}
                                        onChange={handleInputChange}>
                                        <option value="Option 1">Option 1</option>
                                        <option value="Option 2">Option 2</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Design Type</label>
                                    <select className="w-full p-2 border rounded-md"
                                        name='design type'
                                        value={formData.designType}
                                        onChange={handleInputChange}
                                    >
                                        <option value="Option 1">Option 1</option>
                                        <option value="Option 2">Option 2</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">(Width x Height)</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="number"
                                            placeholder="Width"
                                            className="w-full p-2 border rounded-md"
                                            name='width'
                                            value={formData.width}
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Height"
                                            className="w-full p-2 border rounded-md"
                                            name='height'
                                            value={formData.height}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Area</label>
                                    <div className="p-2 border rounded-md bg-gray-200">
                                        {/* Calculated area value displayed here */}
                                        {formData.area} sq units
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Additional Field</label>
                                    <select className="w-full p-2 border rounded-md"
                                        name="additionalField"
                                        onChange={handleInputChange}
                                        value={formData.additionalField}
                                    >
                                        <option value="Option 1">Option 1</option>
                                        <option value="Option 2">Option 2</option>
                                    </select>
                                </div>
                            </form>
                            {/* <button
                                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md"
                                onClick={handleAddSection}
                            >
                                Add
                            </button> */}
                            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>Submit</button>

                            {/* {console.log("items.type", items.type)} */}
                        </div>
                    )}
                    {/* {selectItems.map((items, index) =>
                        <div key={index} className="mb-6">
                            <h2 className="text-xl font-semibold mb-4">Type: {items.category},{items.type}</h2>
                            <form className="grid grid-cols-3 gap-5">
                                <div>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded-md mt-6 border-black"
                                        placeholder="Quantity"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Series</label>
                                    <select className="w-full p-2 border rounded-md">
                                        <option value="Option 1">Option 1</option>
                                        <option value="Option 2">Option 2</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Design Type</label>
                                    <select className="w-full p-2 border rounded-md">
                                        <option value="Option 1">Option 1</option>
                                        <option value="Option 2">Option 2</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">(Width x Height)</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="number"
                                            placeholder="Width"
                                            className="w-full p-2 border rounded-md"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Height"
                                            className="w-full p-2 border rounded-md"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Area</label>
                                    <div className="p-2 border rounded-md bg-gray-200">
                                        0 sq units
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Additional Field</label>
                                    <select className="w-full p-2 border rounded-md">
                                        <option value="Option 1">Option 1</option>
                                        <option value="Option 2">Option 2</option>
                                    </select>
                                </div>
                            </form>
                            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>Submit</button>

                            {console.log("items.type", items.type)}
                        </div>

                    )} */}
                    {/* <form className="grid grid-cols-3 gap-5">
                        <div>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md mt-6 border-black"
                                placeholder="Quantity"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Series</label>
                            <select className="w-full p-2 border rounded-md">
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Design Type</label>
                            <select className="w-full p-2 border rounded-md">
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">(Width x Height)</label>
                            <div className="flex gap-4">
                                <input
                                    type="number"
                                    placeholder="Width"
                                    className="w-full p-2 border rounded-md"
                                />
                                <input
                                    type="number"
                                    placeholder="Height"
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Area</label>
                            <div className="p-2 border rounded-md bg-gray-200">
                                {/* Calculated area value displayed here */}
                    {/* 0 sq units
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Additional Field</label>
                            <select className="w-full p-2 border rounded-md">
                                <option value="Option 1">Option 1</option>
                                <option value="Option 2">Option 2</option>
                            </select>
                        </div>
                    </form>
                    <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>Submit</button> */}
                </div>

            )}




            <button onClick={handleNext} className='mt-4 bg-blue-600 text-white py-2 px-4 rounded-md'>Next</button>
        </div>
    );
}

export default SubCategory;
