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
    const [product, setProduct] = useState(' ');
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
            console.log("product", product)
            console.log("product-inside-if", selected[currentIndex])
            let pid = selected[currentIndex]
            try {
                const response = await axios.get(`${apiUrl}/productdetails/${pid}`)
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
    const handleAddSection = () => {
        console.log("Saved Data:", formData);

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

        setFormData({
            quantity: '',
            series: '',
            designType: '',
            width: '',
            height: '',
            area: '',
            additionalField: '',
        });

        // setCurrentTypeIndex(selectItems.length - 1);
    };

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
                        {/* <p>{selected[currentIndex]}</p> */}

                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p style={{ color: 'red' }}>Error: {error}</p>
                        ) : categoryData ? (
                            <div>
                                {/* <h3>Category Data for {selected[currentIndex]}:</h3> */}
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
                <div className="bg-teal-300 shadow-lg rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-6">
                        <h1 className="font-bold text-xl ml-5 uppercase">
                            {productdetails}
                        </h1>
                    </div>

                    <div className="flex w-full p-6">
                        <div className="">
                            {/* Sub Categories Column  "  grid grid-cols-1 gap-4 p-4 */} 
                            {/* <div className="border-r border-gray-300 pr-4">
    <h3 className="font-bold mb-5 text-lg text-gray-700">SUB CATEGORIES :</h3>
    {unique && unique.length > 0 ? (
      <div className="grid gap-3">
        {unique.map((Category, index) => {
          const checkboxId = `${Category.category_id}-${index}`;
          return (
            <div
              key={Category.category_id}
              className="flex items-center gap-3 border border-gray-300 p-2 rounded-md"
            >
              <input
                type="checkbox"
                id={checkboxId}
                className="form-checkbox h-5 w-5 text-blue-500"
                onChange={(e) =>
                  handleSubCategorySelect(Category.category, e.target.checked)
                }
              />
              <label
                htmlFor={checkboxId}
                className="font-medium text-gray-800 cursor-pointer"
              >
                {Category.category}
              </label>
            </div>
          );
        })}
      </div>
    ) : (
      <p className="text-gray-600">No categories available</p>
    )}
  </div> */}

                            {/* Types Column */}
                            {/* <div className="pl-4">
    <h3 className="font-bold mb-5 text-lg text-gray-700">TYPES :</h3>
    {unique && unique.length > 0 ? (
      <div className="grid gap-6">
        {unique.map((Category) => (
          <div
            key={Category.category_id}
            className="border border-gray-300 p-4 rounded-md shadow-md"
          >
            <h4 className="font-semibold mb-4 text-gray-700">
              {Category.category}
            </h4>
            {typesByCategory[Category.category] &&
              typesByCategory[Category.category].length > 0 &&
              typesByCategory[Category.category].map((item, index) => {
                const checkboxId = `${Category.category}-${index}`;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 mb-3"
                  >
                    <input
                      type="checkbox"
                      id={checkboxId}
                      className="form-checkbox h-5 w-5 text-blue-500"
                      onChange={(e) =>
                        handleCheckboxClick(
                          Category.category,
                          item,
                          e.target.checked
                        )
                      }
                    />
                    <label
                      htmlFor={checkboxId}
                      className="cursor-pointer text-gray-700"
                    >
                      {item}
                    </label>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-600">No types available</p>
    )}

    <div className="text-right mt-6">
      <button
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        onClick={handlemeasurement}
      >
        Measurement
      </button>
    </div>
  </div> */}
                            <div className="flex flex-col">
                                {/* <h3 className="font-bold mb-5 text-xl text-center text-gray-800">
                                    PRODUCT NAME: DOOR
                                </h3> */}

                                {/* Grid Layout */}
                                <div className="grid grid-cols-3 w-auto border  border-black">
                                    {unique &&
                                        unique.length > 0 &&
                                        unique.map((Category, index) => (
                                            <React.Fragment key={Category.category_id}>
                                                {/* Subcategory Column */}
                                                <div className="flex flex-col  justify-center border text-xl font-bold border-black py-3 px-24">
                                                    {/* <h4 className="font-semibold text-gray-800 mb-2">
                                                        {Category.category}
                                                    </h4> */}
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            id={`subcategory-${index}`}
                                                            className="form-checkbox h-5 w-5 text-blue-500"
                                                            onChange={(e) =>
                                                                handleSubCategorySelect(Category.category, e.target.checked)
                                                            }
                                                        />
                                                        <label
                                                            htmlFor={`subcategory-${index}`}
                                                            className="text-gray-700 cursor-pointer"
                                                        >
                                                            {Category.category}
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Types Column */}
                                                <div className="border border-black p-3 col-span-2">
                                                    {typesByCategory[Category.category] &&
                                                        typesByCategory[Category.category].length > 0 ? (
                                                        typesByCategory[Category.category].map((item, idx) => (
                                                            <div key={idx} className="flex items-center text-xl font-bold py-6 px-20 gap-3 mb-2">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`type-${index}-${idx}`}
                                                                    className="form-checkbox h-5 w-5 text-blue-500"
                                                                    onChange={(e) =>
                                                                        handleCheckboxClick(
                                                                            Category.category,
                                                                            item,
                                                                            e.target.checked
                                                                        )
                                                                    }
                                                                />
                                                                <label
                                                                    htmlFor={`type-${index}-${idx}`}
                                                                    className="text-gray-700 cursor-pointer"
                                                                >
                                                                    {item}
                                                                </label>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-gray-500"> </p>
                                                    )}
                                                </div>
                                            </React.Fragment>
                                        ))}
                                </div>

                                {/* Measurement Button */}
                                <div className="mt-6 text-right font-bold ">
                                    <button
                                        className="bg-blue-600 text-white p-3 px-4 rounded-md hover:bg-blue-700 transition"
                                        onClick={handlemeasurement}
                                    >
                                        Measurement
                                    </button>
                                </div>
                            </div>

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
                <div className="p-6 bg-blue-300 rounded-lg shadow-md" >
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
                            <div className=' flex justify-between mt-10'>
                                <button
                                    className=" bg-green-500 hover:bg-green-600 text-white w-24 h-12 font-bold rounded-md"
                                    onClick={handleAddSection}
                                >
                                    Add
                                </button>
                                <button className="bg-blue-600 hover:bg-blue-800 text-white  w-24 h-12 font-bold  rounded-md" onClick={handleSubmit}>Submit</button>
                            </div>

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




            <button onClick={handleNext} className='mt-4 bg-blue-600 hover:bg-blue-800 text-white w-24 h-12 font-bold rounded-md'>Next</button>
        </div>
    );
}

export default SubCategory;
