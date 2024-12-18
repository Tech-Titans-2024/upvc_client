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
    const [quotation, setQuotation] = useState(false);
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
        setMeasurement(false);
        if (currentIndex < selected.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handleBack = () => {
        setQuotation(false);
        // setMeasurement(false);
    }
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
        const { quantity, width, height, area, series, designType, glass, color,
            sliderof, slidersash, alrail, espag, accessories, handletype, handlecolor, roller } = formData;

        const newFormData = {
            category,
            type,
            series,
            designType,
            glass,
            color,
            sliderof,
            slidersash,
            alrail,
            espag,
            accessories,
            handletype,
            handlecolor,
            roller,
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

        // Parse the input values for width and height
        const width = name === "width" ? parseFloat(value) || 0 : parseFloat(formData.width) || 0;
        const height = name === "height" ? parseFloat(value) || 0 : parseFloat(formData.height) || 0;
        const area = width * height;

        // Update the state, including recalculating area
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
            area, // Recalculate and update the area
        }));
    };

    const handleSubmit = () => {
        if (currentTypeIndex < selectItems.length - 1) {
            setCurrentTypeIndex(currentTypeIndex + 1); // Move to the next item
        } else {
            setQuotation(true);
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
        const { quantity, width, height, area, series, designType, glass, color,
             handletype, roller,price,totalprice } = formData;

        const newFormData = {
            category,
            type,
            series,
            designType,
            glass,
            color,
            handletype,
            roller,
            quantity,
            width,
            height,
            area,
            price,
            totalprice
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

            <div className="bg-white h-1/2 w-full shadow-lg rounded-lg p-7">
                {/* Header Section */}
                <div className="flex items-center mb-6">
                    <h1 className="font-bold text-xl uppercase bg-slate-400 text-white rounded-sm w-full h-10 flex items-center px-4 shadow-md">
                        {productdetails}
                    </h1>
                </div>

                {/* Table Section */}
                <div className="flex w-full p-10 justify-center items-center">
                    <div className="w-full max-w-screen-lg  rounded-lg overflow-hidden">
                        {/* Table Header */}
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





                        {/* <h3 className="font-bold mb-5 text-xl text-center text-gray-800">
                                    PRODUCT NAME: DOOR
                                </h3> */}

                        {/* Table Body */}
                        {/* Table Section */}
                        <div className="flex w-full p-10 justify-center items-center">
                            <div className="w-full max-w-screen-lg bg-white shadow-lg rounded-lg overflow-hidden">
                                {/* Table Header */}
                                <div className="grid grid-cols-2 bg-blue-600 text-white font-semibold text-lg">
                                    <div className="flex justify-center items-center border-r border-blue-500 py-2">
                                        Types
                                    </div>
                                    <div className="flex justify-center items-center py-2">
                                        Variant
                                    </div>
                                </div>

                                {/* Table Body */}
                                <div className="grid grid-cols-4 border border-black">
                                    {unique &&
                                        unique.length > 0 &&
                                        unique.map((Category, index) => (
                                            <React.Fragment key={Category.category_id}>
                                                {/* Subcategory Column */}
                                                <div className="col-span-2 flex items-center p-4 border border-black border-r-2 hover:bg-blue-50 transition">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            id={`subcategory-${index}`}
                                                            className="form-checkbox h-5 w-5 text-blue-600"
                                                            onChange={(e) =>
                                                                handleSubCategorySelect(Category.category, e.target.checked)
                                                            }
                                                        />
                                                        <label
                                                            htmlFor={`subcategory-${index}`}
                                                            className="text-gray-700 font-semibold cursor-pointer"
                                                        >
                                                            {Category.category}
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* Types Column */}
                                                <div className="col-span-2 p-4 border border-black">
                                                    {typesByCategory[Category.category] &&
                                                        typesByCategory[Category.category].length > 0 ? (
                                                        typesByCategory[Category.category].map((item, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="flex items-center gap-3 py-1 hover:text-blue-600 transition"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    id={`type-${index}-${idx}`}
                                                                    className="form-checkbox h-5 w-5 text-blue-600"
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
                                                        <p className="text-gray-500 italic"></p>
                                                    )}
                                                </div>
                                            </React.Fragment>
                                        ))}
                                </div>

                                {/* Measurement Button */}
                                <div className=" py-4 px-6 text-right">
                                    <button
                                        className="bg-blue-600 text-white font-bold px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
                                        onClick={handlemeasurement}
                                    >
                                        Measurement
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {measurement && (
                // fixed inset-0  flex items-center justify-center
                // 
                <div className="">
                    <div className="p-6 bg-blue-300 w-full h-1/2  overflow-auto " >
                        {selectItems.length > 0 && currentTypeIndex < selectItems.length && (
                            <div>
                                <h2 className="text-xl font-semibold mb-4"> Type: {selectItems[currentTypeIndex]?.category}, {selectItems[currentTypeIndex]?.type}</h2>
                                <div className='border-4 border-black rounded-xl p-6'>
                                    <form className="grid grid-cols-3 gap-5">
                                        <div>
                                            <label className="block text-gray-700 font-medium">Quantity</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded-md border-black"
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
                                                <option value="Series 1">Series 1</option>
                                                <option value="Series 2">Series 2</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">Design Type</label>
                                            <select className="w-full p-2 border rounded-md"
                                                name='design type'
                                                value={formData.designType}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Type A">Type A</option>
                                                <option value="Type B">Type B</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">Width</label>
                                            <input
                                                type="number"
                                                placeholder="Width"
                                                className="w-full p-2 border rounded-md"
                                                name='width'
                                                value={formData.width}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">Height</label>
                                            <input
                                                type="number"
                                                placeholder="Height"
                                                className="w-full p-2 border rounded-md"
                                                name='height'
                                                value={formData.height}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">Area</label>
                                            <div className="p-2 border rounded-md bg-gray-200">
                                                {/* Calculated area value displayed here */}
                                                {formData.area} sq units
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">Price</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded-md border-black"
                                                placeholder="Quantity"
                                                name='quantity'
                                                value={formData.price}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">Total Price</label>
                                            <input
                                                type="text"
                                                className="w-full p-2 border rounded-md border-black"
                                                placeholder="Quantity"
                                                name='quantity'
                                                value={formData.totalprice}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">Glass</label>
                                            <select className="w-full p-2 border rounded-md"
                                                name="glass"
                                                onChange={handleInputChange}
                                                value={formData.glass}
                                            >
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">Color</label>
                                            <select className="w-full p-2 border rounded-md"
                                                name="color"
                                                onChange={handleInputChange}
                                                value={formData.color}
                                            >
                                                <option value="Silver">Silver</option>
                                                <option value="Gold">Gold</option>
                                            </select>
                                        </div>
                                        {/* <div>
                                            <label className="block text-gray-700 font-medium">Slider OF</label>
                                            <select className="w-full p-2 border rounded-md"
                                                name="sliderof"
                                                onChange={handleInputChange}
                                                value={formData.sliderof}
                                            >
                                                <option value="Option 1">Option 1</option>
                                                <option value="Option 2">Option 2</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">Slider Sash</label>
                                            <select className="w-full p-2 border rounded-md"
                                                name="slidersash"
                                                onChange={handleInputChange}
                                                value={formData.slidersash}
                                            >
                                                <option value="Sash A">Sash A</option>
                                                <option value="Sash B">Sash B</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">AlRail</label>
                                            <select className="w-full p-2 border rounded-md"
                                                name="alrail"
                                                onChange={handleInputChange}
                                                value={formData.alrail}
                                            >
                                                <option value="Rail X">Rail X</option>
                                                <option value="Rail Y">Rail Y</option>
                                                <option value="Rail Z">Rail Z</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">Espag</label>
                                            <select className="w-full p-2 border rounded-md"
                                                name="espag"
                                                onChange={handleInputChange}
                                                value={formData.espag}
                                            >
                                                <option value="Silver">Espag 1</option>
                                                <option value="Gold">Espag 2</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 font-medium">Accessories Type</label>
                                            <select className="w-full p-2 border rounded-md"
                                                name="accessories"
                                                onChange={handleInputChange}
                                                value={formData.accessories}
                                            >
                                                <option value="Type 1">Type 1</option>
                                                <option value="Type 2">Type 2</option>
                                            </select>
                                        </div> */}
                                        <div>
                                            <label className="block text-gray-700 font-medium">Handle Type</label>
                                            <select className="w-full p-2 border rounded-md"
                                                name="handletype"
                                                onChange={handleInputChange}
                                                value={formData.handletype}
                                            >
                                                <option value="Handle A">Handle A</option>
                                                <option value="Handle B">Handle B</option>
                                            </select>
                                        </div>
                                        {/* <div>
                                            <label className="block text-gray-700 font-medium">Handle Color</label>
                                            <select className="w-full p-2 border rounded-md"
                                                name="handlecolor"
                                                onChange={handleInputChange}
                                                value={formData.handlecolor}
                                            >
                                                <option value="Silver">Silver</option>
                                                <option value="Gold">Gold</option>
                                            </select>
                                        </div> */}
                                        <div>
                                            <label className="block text-gray-700 font-medium">Roller</label>
                                            <select className="w-full p-2 border rounded-md"
                                                name="roller"
                                                onChange={handleInputChange}
                                                value={formData.roller}
                                            >
                                                <option value="Roller 1">Roller 1</option>
                                                <option value="Roller 2">Roller 2</option>
                                            </select>
                                        </div>
                                    </form>
                                    <div className=' flex justify-between mt-10'>
                                        <div className=''>
                                            <button onClick={handleNext} className='bg-blue-600 hover:bg-blue-800 text-white w-24 h-12 font-bold rounded-md'>Submit</button>
                                        </div>
                                        <div className=''>
                                            <button
                                                className=" bg-green-500 hover:bg-green-600 text-white w-24 h-12 font-bold rounded-md mx-2"
                                                onClick={handleAddSection}
                                            >
                                                Add
                                            </button>
                                            <button className="bg-blue-600 hover:bg-blue-800 text-white  w-24 h-12 font-bold  rounded-md" onClick={handleSubmit}>Next</button>
                                        </div>
                                    </div>
                                </div>
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
                </div >
            )
            }

            {/* <button onClick={handleNext} className='mt-4 bg-blue-600 hover:bg-blue-800 text-white w-24 h-12 font-bold rounded-md'>Next</button> */}

            {quotation && (
                <div className="fixed inset-0  flex items-center justify-center">
                    <div className="p-6 bg-white ml-80 w-5/6 h-full  overflow-auto " >
                        <div className="text-right font-bold text-xl ml-28 ">No of Items:  {formDataArray.length}</div>
                        <div className='mt-6 grid grid-cols-6 w-auto text-white text-xl bg-blue-500 sticky top-0'>
                            <div className="font-bold border border-black text-center py-3">Category</div>
                            <div className="font-bold border border-black text-center py-3">Varient</div>
                            <div className="font-bold border border-black text-center py-3">Height</div>
                            <div className="font-bold border border-black text-center py-3">Width</div>
                            <div className='font-bold border border-black text-center py-3'>Area</div>
                            <div className='font-bold border border-black text-center py-3'>Quantity</div>
                        </div>
                        <div className="overflow-y-auto max-h-[500px] scrollbar-hide">
                            {formDataArray.map((user, index) => (
                                <div key={index} className={`grid grid-cols-6 ${index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"}`}>
                                    <div className="font-bold border border-black text-center  py-3">{user.category}</div>
                                    <div className="font-bold border border-black text-center  py-3">{user.type}</div>
                                    <div className="font-bold border border-black text-center uppercase py-3">{user.height}</div>
                                    <div className="font-bold border border-black text-center uppercase py-3">{user.width}</div>
                                    <div className="font-bold border border-black text-center uppercase py-3">{user.area}</div>
                                    <div className="font-bold border border-black text-center uppercase py-3">{user.quantity}</div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleBack} className='mt-4 bg-blue-600 hover:bg-blue-800 text-white w-24 h-12 font-bold rounded-md'>Next</button>
                    </div>
                </div>
            )}

        </div >
    );
}

export default SubCategory;
