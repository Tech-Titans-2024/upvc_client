import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from '../../assets/logo.jpeg';

function Quotation() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
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

    const handleProductSelect = (productId, isChecked) => {
        setSelectedProducts((prev) => ({
            ...prev,
            [productId]: isChecked,
        }));
    };

    const handleSubmit = () => {
        const selected = Object.keys(selectedProducts).filter(
            (productId) => selectedProducts[productId]
        );
        navigate("/upvc/subcategory", { state: { selected } });
    };

    return (
        <div className="relative w-full h-[100%]">
        {/* Background Image with Opacity */}
        <div
            className="absolute inset-0 flex items-center justify-center my-auto mx-auto mb-10"
            style={{
                backgroundImage: `url(${Logo})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: '80%',
                height: '80%',
                opacity: 0.2, // Background opacity
                zIndex: -1, // Send background image behind content
            }}
        ></div>
    
        <div className="relative p-6">
            <h1 className="text-3xl tracking-wide font-bold text-center font-sans text-gray-800 mb-8 uppercase">
                Quotation Details
        </h1>
        <div className="h-auto flex flex-col gap-6 border-2 p-4 border-black rounded-lg">
  <div className="flex flex-wrap gap-4 items-center justify-between">
    <div className="flex flex-col gap-1">
      <label className="font-bold">Quotation Id:</label>
      <input
        type="text"
        placeholder="Quotation Id"
        className="bg-gray-100 w-60 p-2 border border-black rounded-md"
        disabled
      />
    </div>
    <div className="flex flex-col gap-1">
      <label className="font-bold">Customer Name:</label>
      <input
        type="text"
        placeholder="Name"
        className="w-60 p-2 border border-black rounded-md"
      />
    </div>
    <div className="flex flex-col gap-1">
      <label className="font-bold">Customer Address:</label>
      <input
        type="text"
        placeholder="Address"
        className="w-60 p-2 border border-black rounded-md"
      />
    </div>
  </div>

  <div className="flex flex-wrap gap-4 items-center justify-between">
    <div className="flex flex-col gap-1">
      <label className="font-bold">Customer Phone No:</label>
      <input
        type="text"
        placeholder="Phone No"
        className="w-60 p-2 border border-black rounded-md"
      />
    </div>
    <div className="flex flex-col gap-1">
      <label className="font-bold">Salesman Id:</label>
      <input
        type="text"
        placeholder="Salesman Id"
        className="bg-gray-100 w-60 p-2 border border-black rounded-md"
        disabled
      />
    </div>
  </div>
</div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        key={product.product_id}
                        className="bg-slate-300 p-4 rounded-lg shadow-md flex items-center"
                    >
                        <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-blue-500"
                            onChange={(e) =>
                                handleProductSelect(product.product_id, e.target.checked)
                            }
                        />
                        <span className="text-lg font-medium text-black ml-3 uppercase">
                            {product.product_name}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex justify-end mt-8">
                <button
                    className="bg-blue-700 text-white py-2.5 px-6 rounded-lg shadow hover:bg-blue-800 transition duration-200"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
    
    );
}

export default Quotation;











































































// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Quotation() {
//     const apiUrl = import.meta.env.VITE_API_URL;
//     const navigate = useNavigate();

//     const [products, setProducts] = useState([]);
//     const [selectedProducts, setSelectedProducts] = useState({});



//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get(`${apiUrl}/product`);
//                 console.log(response.data);
//                 setProducts(response.data);
//             } catch (err) {
//                 console.error("Error fetching products:", err.message);
//             }
//         };
        
//         fetchProducts();
//     }, [apiUrl]);


//     // const handleSubCategorySelect = async (productName, subCategory, isChecked) => {
//     //     setSelectedCategories((prev) => {
//     //         const updatedCategories = { ...prev };
//     //         if (isChecked) {
//     //             if (!updatedCategories[productName]) updatedCategories[productName] = [];
//     //             updatedCategories[productName] = [...updatedCategories[productName], subCategory];
//     //         } else {
//     //             updatedCategories[productName] = updatedCategories[productName].filter(
//     //                 (item) => item !== subCategory
//     //             );
//     //         }
//     //         return updatedCategories;
//     //     });

//     //     if (isChecked) {
//     //         try {
//     //             const response = await axios.post(`${apiUrl}/type`, {
//     //                 sub_category: subCategory,
//     //             });
//     //             setTypes((prev) => {
//     //                 const updatedTypes = { ...prev };
//     //                 if (!updatedTypes[productName]) updatedTypes[productName] = {};
//     //                 updatedTypes[productName][subCategory] = response.data.type || [];
//     //                 return updatedTypes;
//     //             });
//     //         } catch (error) {
//     //             console.error("Error fetching types:", error);
//     //         }
//     //     } else {
//     //         setTypes((prev) => {
//     //             const updatedTypes = { ...prev };
//     //             if (updatedTypes[productName] && updatedTypes[productName][subCategory]) {
//     //                 delete updatedTypes[productName][subCategory];
//     //             }
//     //             return updatedTypes;
//     //         });
//     //     }
//     // };

//     // const handleTypeSelect = (productName, subCategory, type, isChecked) => {
//     //     setSelectedTypes((prev) => {
//     //         const updatedTypes = { ...prev };
//     //         if (!updatedTypes[productName]) updatedTypes[productName] = {};
//     //         if (!updatedTypes[productName][subCategory])
//     //             updatedTypes[productName][subCategory] = [];

//     //         if (isChecked) {
//     //             if (!updatedTypes[productName][subCategory].some(t => t._id === type._id)) {
//     //                 updatedTypes[productName][subCategory].push(type);
//     //             }
//     //         } else {
//     //             updatedTypes[productName][subCategory] = updatedTypes[productName][subCategory].filter(
//     //                 (item) => item._id !== type._id
//     //             );
//     //         }
//     //         return updatedTypes;
//     //     });
//     // };

//     // const handleMeasurement = (productName) => {
//     //     const typesForProduct = Object.entries(selectedTypes[productName] || {}).map(
//     //         ([subCategory, typeIds]) => ({
//     //             subCategory,
//     //             types: typeIds,
//     //         })
//     //     );
//     //     navigate("/upvc/measurement", {
//     //         state: {
//     //             productName,
//     //             selectedTypes: typesForProduct,
//     //         },
//     //     });
//     // };

//     // const handleGroupMeasurement = () => {
//     //     const allSelectedTypes = Object.entries(selectedTypes).map(([productName, subCategories]) => {
//     //         return Object.entries(subCategories).map(([subCategory, types]) => ({
//     //             productName,
//     //             subCategory,
//     //             types,
//     //         }));
//     //     }).flat();

//     //     // Navigate to the measurement page with the selected products and types
//     //     navigate("/upvc/measurement", {
//     //         state: { selectedTypes: allSelectedTypes },
//     //     });
//     // };
//     const handleProductSelect = (productId, isChecked) => {
//         setSelectedProducts((prev) => ({
//             ...prev,
//             [productId]: isChecked,
//         }));
//     };

//     const handleSubmit = () => {
//         const selected = Object.keys(selectedProducts).filter(
//             (productId) => selectedProducts[productId],
//         );
//         console.log("Checked Products:", selected);
//         navigate('/upvc/subcategory', { state: { selected } });
//     };

//     return (
//         <div className="p-4 bg-gray-50 min-h-screen ">
//             <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6 uppercase">
//                 Quotation Details
//             </h1>
//             <div className="flex space-x-6 mb-6">
//                 {products.map((product,index) => (
//                     <div key={index} className="flex items-center">
//                         <input
//                             type="checkbox"
//                             className="form-checkbox h-6 w-6 text-blue-500"
//                             onChange={(e) => handleProductSelect(product.product_id,product.product_name, e.target.checked)} // Use product_name here
//                         />
//                         <span className="ml-2 font-medium text-gray-800">{product.product_name}</span> {/* Use product_name here */}
//                     </div>
//                 ))}

//             </div>

//             {/* <div className="space-y-9">
//                 {Object.entries(selectedProducts)
//                     .filter(([_, isSelected]) => isSelected)
//                     .map(([productName]) => (
//                         <div
//                             key={productName}
//                             className="bg-white shadow-lg rounded-lg p-4 mb-6 border border-gray-300"
//                         >
//                             <div className="flex items-center mb-6">
//                                 <span className="font-medium text-md ml-2 uppercase">
//                                     {productName}
//                                 </span>
//                             </div>

                           
//                         </div>
//                     ))}
//             </div> */}
//             <button
//                 className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md"
//                 onClick={handleSubmit}
//             >
//                 Submit
//             </button>
//         </div>
//     );
// }

// export default Quotation;









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