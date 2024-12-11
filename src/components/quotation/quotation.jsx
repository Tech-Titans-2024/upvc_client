import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Quotation() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [subCategories, setSubCategories] = useState({});
    const [selectedCategories, setSelectedCategories] = useState({});
    const [types, setTypes] = useState({});
    const [selectedTypes, setSelectedTypes] = useState({});
    const [selectedProducts, setSelectedProducts] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${apiUrl}/product`);
                setProducts(response.data);
            } catch (err) {
                console.error("Error fetching products:", err.message);
            }
        };

        fetchProducts();
    }, [apiUrl]);

    const handleProductSelect = async (productName, isChecked) => {
        setSelectedProducts((prev) => ({
            ...prev,
            [productName]: isChecked,
        }));

        if (isChecked && !subCategories[productName]) {
            try {
                const response = await axios.post(`${apiUrl}/subcategory`, {
                    product_name: productName,
                });
                setSubCategories((prev) => ({
                    ...prev,
                    [productName]: response.data.sub_categories || [],
                }));
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        }
    };

    const handleSubCategorySelect = async (productName, subCategory, isChecked) => {
        setSelectedCategories((prev) => {
            const updatedCategories = { ...prev };
            if (isChecked) {
                if (!updatedCategories[productName]) updatedCategories[productName] = [];
                updatedCategories[productName] = [...updatedCategories[productName], subCategory];
            } else {
                updatedCategories[productName] = updatedCategories[productName].filter(
                    (item) => item !== subCategory
                );
            }
            return updatedCategories;
        });

        if (isChecked) {
            try {
                const response = await axios.post(`${apiUrl}/type`, {
                    sub_category: subCategory,
                });
                setTypes((prev) => {
                    const updatedTypes = { ...prev };
                    if (!updatedTypes[productName]) updatedTypes[productName] = {};
                    updatedTypes[productName][subCategory] = response.data.type || [];
                    return updatedTypes;
                });
            } catch (error) {
                console.error("Error fetching types:", error);
            }
        } else {
            setTypes((prev) => {
                const updatedTypes = { ...prev };
                if (updatedTypes[productName] && updatedTypes[productName][subCategory]) {
                    delete updatedTypes[productName][subCategory];
                }
                return updatedTypes;
            });
        }
    };

    const handleTypeSelect = (productName, subCategory, type, isChecked) => {
        setSelectedTypes((prev) => {
            const updatedTypes = { ...prev };
            if (!updatedTypes[productName]) updatedTypes[productName] = {};
            if (!updatedTypes[productName][subCategory])
                updatedTypes[productName][subCategory] = [];
    
            if (isChecked) {
                if (!updatedTypes[productName][subCategory].some(t => t._id === type._id)) {
                    updatedTypes[productName][subCategory].push(type);
                }
            } else {
                updatedTypes[productName][subCategory] = updatedTypes[productName][subCategory].filter(
                    (item) => item._id !== type._id
                );
            }
            return updatedTypes;
        });
    };

    const handleMeasurement = (productName) => {
        const typesForProduct = Object.entries(selectedTypes[productName] || {}).map(
            ([subCategory, typeIds]) => ({
                subCategory,
                types: typeIds,
            })
        );
        navigate("/upvc/measurement", {
            state: {
                productName,
                selectedTypes: typesForProduct,
            },
        });
    };

    return (
        <div className="p-4 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Quotation Details
            </h1>
            <div className="flex space-x-6 mb-6">
                {["Door", "Window", "Louvers"].map((product) => (
                    <div key={product} className="flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-500"
                            onChange={(e) => handleProductSelect(product, e.target.checked)}
                        />
                        <span className="ml-2 font-medium text-gray-800">{product}</span>
                    </div>
                ))}
            </div>

            <div className="space-y-9">
                {Object.entries(selectedProducts)
                    .filter(([_, isSelected]) => isSelected)
                    .map(([productName]) => (
                        <div
                            key={productName}
                            className="bg-white shadow-lg rounded-lg p-4 mb-6 border border-gray-300"
                        >
                            <div className="flex items-center mb-6">
                                <span className="font-medium text-md ml-2 uppercase">
                                    {productName}
                                </span>
                            </div>

                            <div className="flex w-[100%] justify-between border-t border-gray-300 pt-6">
                                <div className="w-[20%] border-r border-gray-300 p-1 flex flex-col">
                                    <h3 className="font-semibold text-gray-700 mb-5">
                                        SUB CATEGORIES :
                                    </h3>
                                    {subCategories[productName]?.length > 0 ? (
                                        subCategories[productName].map((subItem, subIndex) => (
                                            <div
                                                key={subIndex}
                                                className="flex items-center w-full space-x-2 mb-4"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-center h-4 w-4 text-blue-500"
                                                    value={subItem}
                                                    onChange={(e) =>
                                                        handleSubCategorySelect(
                                                            productName,
                                                            subItem,
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                                <span>{subItem}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <span className="text-gray-500">N / A</span>
                                    )}
                                </div>

                                <div className="w-[75%] mr-3">
                                    <h3 className="font-semibold text-gray-700 mb-5">
                                        TYPES :
                                    </h3>
                                    {selectedCategories[productName]?.length > 0 &&
                                        selectedCategories[productName].map((subItem) => (
                                            <div key={subItem} className="mb-6">
                                                <h4 className="font-semibold mb-2">{subItem}</h4>
                                                {types[productName]?.[subItem]?.map((typeItem) => (
                                                    <div
                                                        key={typeItem._id}
                                                        className="flex items-center gap-3 mt-3"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox text-center h-4 w-4 text-blue-500"
                                                            onChange={(e) =>
                                                                handleTypeSelect(
                                                                    productName,
                                                                    subItem,
                                                                    typeItem,
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                        <span>{typeItem.type}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    {Object.keys(selectedCategories[productName] || {}).length > 0 &&
                                        Object.entries(selectedTypes[productName] || {}).some(
                                            ([subCategory, typesForSubCategory]) =>
                                                typesForSubCategory.length > 0
                                        ) && (
                                            <button
                                                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
                                                onClick={() => handleMeasurement(productName)}
                                            >
                                                Measurement
                                            </button>
                                        )}
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Quotation;









// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Quotation() {
//   const apiUrl = import.meta.env.VITE_API_URL;
//   const navigate = useNavigate();

//   const [products, setProducts] = useState([]);
//   const [subCategories, setSubCategories] = useState({});
//   const [selectedCategories, setSelectedCategories] = useState({});
//   const [types, setTypes] = useState({});
//   const [quantityInputs, setQuantityInputs] = useState({});

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/product`);
//         setProducts(response.data);
//       } catch (err) {
//         console.error("Error fetching products:", err.message);
//       }
//     };

//     fetchProducts();
//   }, [apiUrl]);

//   const handleProductSelect = async (productName) => {
//     if (!subCategories[productName]) {
//       try {
//         const response = await axios.post(`${apiUrl}/subcategory`, {
//           product_name: productName,
//         });
//         setSubCategories((prev) => ({
//           ...prev,
//           [productName]: response.data.sub_categories || [],
//         }));
//       } catch (error) {
//         console.error("Error fetching subcategories:", error);
//       }
//     }
//   };

//   const handleSubCategorySelect = async (productName, subCategory, isChecked) => {
//     setSelectedCategories((prev) => {
//       const updatedCategories = { ...prev };
//       if (isChecked) {
//         if (!updatedCategories[productName]) updatedCategories[productName] = [];
//         updatedCategories[productName] = [...updatedCategories[productName], subCategory];
//       } else {
//         updatedCategories[productName] = updatedCategories[productName].filter(
//           (item) => item !== subCategory
//         );
//       }
//       return updatedCategories;
//     });

//     if (isChecked) {
//       try {
//         const response = await axios.post(`${apiUrl}/type`, {
//           sub_category: subCategory,
//         });
//         setTypes((prev) => ({
//           ...prev,
//           [productName]: {
//             ...prev[productName],
//             [subCategory]: response.data.type || [],
//           },
//         }));
//       } catch (error) {
//         console.error("Error fetching types:", error);
//       }
//     } else {
//       setTypes((prev) => {
//         const updatedTypes = { ...prev };
//         if (updatedTypes[productName]) {
//           delete updatedTypes[productName][subCategory];
//         }
//         return updatedTypes;
//       });
//     }
//   };

//   const handleCheckboxChange = (key, isChecked) => {
//     setQuantityInputs((prev) => ({
//       ...prev,
//       [key]: {
//         ...prev[key],
//         isChecked,
//       },
//     }));
//   };

//   const handleInputChange = (key, field, value) => {
//     setQuantityInputs((prev) => ({
//       ...prev,
//       [key]: { ...prev[key], [field]: value },
//     }));
//   };

//   const handleMeasurement = () => {
//     const dataToDisplay = Object.keys(quantityInputs).map((key) => {
//       const [productName, typeId] = key.split("-");
//       const quantities = quantityInputs[key];
//       return {
//         productName,
//         typeId,
//         ...quantities,
//       };
//     });
//     navigate("/measurement-display", { state: { data: dataToDisplay } });
//   };

//   return (
//     <div className="p-4 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-semibold text-gray-800 mb-6">
//         Quotation Details
//       </h1>
//       <div className="space-y-9">
//         {products.length > 0 ? (
//           products.map((product, index) => (
//             <div key={index} className="bg-white shadow-lg rounded-lg p-4 mb-6 border border-gray-300">
//               {/* Product Header */}
//               <div className="flex items-center mb-6">
//                 <input
//                   type="checkbox"
//                   className="form-checkbox h-5 w-5 text-blue-500"
//                   value={product.product_name}
//                   onChange={() => handleProductSelect(product.product_name)}
//                 />
//                 <span className="font-medium text-md ml-2 uppercase">
//                   {product.product_name}
//                 </span>
//               </div>
//               {/* Product Grid Layout */}
//               <div className="flex w-[100%] justify-between border-t border-gray-300 pt-6">
//                 {/* Subcategories */}
//                 <div className="w-[20%] border-r border-gray-300 p-1 flex flex-col">
//                   <h3 className="font-semibold text-gray-700 mb-5">
//                     SUB CATEGORIES :
//                   </h3>
//                   {subCategories[product.product_name]?.length > 0 ? (
//                     subCategories[product.product_name].map(
//                       (subItem, subIndex) => (
//                         <div
//                           key={subIndex}
//                           className="flex items-center w-full space-x-2 mb-4"
//                         >
//                           <input
//                             type="checkbox"
//                             className="form-checkbox text-center h-4 w-4 text-blue-500"
//                             value={subItem}
//                             onChange={(e) =>
//                               handleSubCategorySelect(
//                                 product.product_name,
//                                 subItem,
//                                 e.target.checked
//                               )
//                             }
//                           />
//                           <span>{subItem}</span>
//                         </div>
//                       )
//                     )
//                   ) : (
//                     <span className="text-gray-500">
//                       N/A
//                     </span>
//                   )}
//                 </div>

//                 {/* Types */}
//                 <div className="w-[75%] mr-3">
//                   <div className="flex justify-between">
//                     <h3 className="font-semibold w-[40%] text-gray-700 mb-5 mt-1">
//                       TYPES :
//                     </h3>
//                     <span className="font-semibold w-[30%] text-gray-700 text-center">
//                       SAME SIZE :
//                     </span>
//                     <span className="font-semibold w-[30%] text-gray-700 text-center">
//                       DIFF SIZE :
//                     </span>
//                   </div>
//                   {selectedCategories[product.product_name]?.map((subItem) => (
//                     <div key={subItem} className="mb-6">
//                       <div className="flex justify-between">
//                         <span className="font-semibold w-[40%] mb-1">
//                           {subItem} Types :
//                         </span>
//                       </div>
//                       {types[product.product_name]?.[subItem]?.map(
//                         (typeItem) => (
//                           <div
//                             key={typeItem._id}
//                             className="flex items-center gap-3 mt-3 w-[100%]"
//                           >
//                             <input
//                               type="checkbox"
//                               id={`checkbox-${product.product_name}-${typeItem._id}`}
//                               className="w-[40%]"
//                               onChange={(e) =>
//                                 handleCheckboxChange(
//                                   `${product.product_name}-${typeItem._id}`,
//                                   e.target.checked
//                                 )
//                               }
//                             />
//                             <label
//                               htmlFor={`checkbox-${product.product_name}-${typeItem._id}`}
//                               className="w-[40%]"
//                             >
//                               {typeItem.type}
//                             </label>
//                             {quantityInputs[
//                               `${product.product_name}-${typeItem._id}`
//                             ]?.isChecked && (
//                                 <>
//                                   <input
//                                     type="text"
//                                     className="border text-center p-2 w-[12%] rounded-md border-gray-400 text-gray-700"
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         `${product.product_name}-${typeItem._id}`,
//                                         "sameSize",
//                                         e.target.value
//                                       )
//                                     }
//                                     value={
//                                       quantityInputs[
//                                         `${product.product_name}-${typeItem._id}`
//                                       ]?.sameSize || ""
//                                     }
//                                   />
//                                   <input
//                                     type="text"
//                                     className="border text-center p-2 w-[12%] rounded-md border-gray-400 text-gray-700"
//                                     onChange={(e) =>
//                                       handleInputChange(
//                                         `${product.product_name}-${typeItem._id}`,
//                                         "diffSize",
//                                         e.target.value
//                                       )
//                                     }
//                                     value={
//                                       quantityInputs[
//                                         `${product.product_name}-${typeItem._id}`
//                                       ]?.diffSize || ""
//                                     }
//                                   />

//                                 </>
//                               )}
//                           </div>
//                         )
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center text-gray-500">
//             No products available.
//           </div>
//         )}
//       </div>
//       <div className="flex justify-end">
//         <button
//           className="bg-blue-600 mt-10 p-2 text-white w-[15%] rounded-md"
//           onClick={handleMeasurement}
//         >
//           Measurement
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Quotation;
