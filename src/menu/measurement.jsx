import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TableComponent = () => {
  const data = [
    {
      category: "DOOR",
      subItems: [
        {
          name: "BED ROOM DOOR",
          fields: ["Bed Room Fully covered", "Bed Room Semi covered"],
        },
        {
          name: "MAIN DOOR",
          fields: ["Main Door Fully covered", "Main Door Semi covered"],
        },
        {
          name: "REST ROOM DOOR",
          fields: ["Fixed door"],
        },
      ],
    },
    {
      category: "WINDOW",
      subItems: [
        {
          name: "Fixed Windows",
          fields: ["Fixed Only"],
        },
        {
          name: "Sliding Windows",
          fields: [
            "2 Track Sliding windows only",
            "2.5 Track Sliding with mesh",
            "2.5 Track Sliding without mesh",
            "Fixed without mesh for sliding",
            "Fixed with mesh for sliding",
            "3 Track Sliding with mesh",
            "Sliding without mesh",
          ],
        },
        {
          name: "Open Windows",
          fields: [
            "Single Open with fixed",
            "Double Open",
            "Triple Open",
            "Fourth Open",
          ],
        },
      ],
    },
    {
      category: "LOUVER",
      subItems: [
        {
          name: "WITH FAN",
          fields: [],
        },
        {
          name: "WITHOUT FAN",
          fields: [],
        },
      ],
    },
  ];

  const navigate = useNavigate();
  const [checkedCategories, setCheckedCategories] = useState({});
  const [checkedSubItems, setCheckedSubItems] = useState({});
  const [checkedFields, setCheckedFields] = useState({});
  const [subItemQuantities, setSubItemQuantities] = useState({});
  const [fieldQuantities, setFieldQuantities] = useState({});

  const handleCategoryChange = (category) => {
    setCheckedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSubItemChange = (category, subItem) => {
    setCheckedSubItems((prev) => ({
      ...prev,
      [`${category}-${subItem}`]: !prev[`${category}-${subItem}`],
    }));
  };

  const handleFieldChange = (field) => {
    setCheckedFields((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleQuantityChange = (key, value) => {
    if (!isNaN(value)) {
      setSubItemQuantities((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleFieldQuantityChange = (field, value) => {
    if (!isNaN(value)) {
      setFieldQuantities((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const selectedData = [];
  
    data.forEach((item) => {
      if (checkedCategories[item.category]) {
        const categoryData = {
          category: item.category,
          subItems: [],
        };
  
        item.subItems.forEach((subItem) => {
          if (checkedSubItems[`${item.category}-${subItem.name}`]) {
            const subItemData = {
              name: subItem.name,
              quantity: subItemQuantities[`${item.category}-${subItem.name}`] || 0,
              fields: [],
            };
  
            subItem.fields.forEach((field) => {
              if (checkedFields[field]) {
                subItemData.fields.push({
                  field,
                  quantity: fieldQuantities[field] || 0,
                });
              }
            });
  
            categoryData.subItems.push(subItemData);
          }
        });
  
        if (categoryData.subItems.length > 0) {
          selectedData.push(categoryData);
        }
      }
    });
  
    // Pass the selected data to the SubmittedPage
    navigate("/submitted", { state: { selectedData } });  // Make sure the path is '/submitted'
  };


  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto border-l border-r border-black">
        <table className="table-fixed w-full border-collapse shadow-md">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-4 py-2 text-left border-b border-r border-black">Category</th>
              <th className="px-4 py-2 text-left border-b border-r border-black">Sub-Items</th>
              <th className="px-4 py-2 text-left border-b border-r border-black">Fields</th>
              <th className="px-4 py-2 text-left border-b  border-black">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <React.Fragment key={index}>
                {/* Category Row */}
                <tr>
                  <td className="px-4 py-2 border-r border-gray-300">
                    <label>
                      <input
                        type="checkbox"
                        checked={checkedCategories[item.category] || false}
                        onChange={() => handleCategoryChange(item.category)}
                        className="mr-2"
                      />
                      {item.category}
                    </label>
                  </td>
                </tr>
                {/* Sub-Items */}
                {checkedCategories[item.category] &&
                  item.subItems.map((subItem, subIndex) => (
                    <React.Fragment key={subIndex}>
                      <tr>
                        <td></td>
                        <td className="px-4 py-2 border-r border-gray-300">
                          <label>
                            <input
                              type="checkbox"
                              checked={checkedSubItems[`${item.category}-${subItem.name}`] || false}
                              onChange={() =>
                                handleSubItemChange(item.category, subItem.name)
                              }
                              className="mr-2"
                            />
                            {subItem.name}
                          </label>
                        </td>
                        <td></td>
                        <td className="px-4 py-2">
                          {subItem.fields.length === 0 &&
                            checkedSubItems[`${item.category}-${subItem.name}`] && (
                              <input
                                type="number"
                                min="1"
                                value={subItemQuantities[`${item.category}-${subItem.name}`] || ""}
                                onChange={(e) =>
                                  handleQuantityChange(
                                    `${item.category}-${subItem.name}`,
                                    e.target.value
                                  )
                                }
                                className="w-24 border border-gray-500 rounded px-2 py-1"
                                placeholder="Qty"
                              />
                            )}
                        </td>
                      </tr>
                      {/* Fields */}
                      {checkedSubItems[`${item.category}-${subItem.name}`] &&
                        subItem.fields.map((field, fieldIndex) => (
                          <tr key={fieldIndex}>
                            <td></td>
                            <td></td>
                            <td className="px-4 py-2 border-r border-gray-300">
                              <label>
                                <input
                                  type="checkbox"
                                  checked={checkedFields[field] || false}
                                  onChange={() => handleFieldChange(field)}
                                  className="mr-2"
                                />
                                {field}
                              </label>
                            </td>
                            <td className="px-4 py-2">
                              {checkedFields[field] && (
                                <input
                                  type="number"
                                  min="1"
                                  value={fieldQuantities[field] || ""}
                                  onChange={(e) =>
                                    handleFieldQuantityChange(field, e.target.value)
                                  }
                                  className="w-24 border border-gray-500 rounded px-2 py-1"
                                  placeholder="Qty"
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                    </React.Fragment>
                  ))}
                {/* Divider */}
                <tr>
                  <td colSpan="4" className="py-2 border-t border-black"></td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="font-bold text-white bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-500"
          // onClick={handleSubmit}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
