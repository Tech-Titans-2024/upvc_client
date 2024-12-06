import React from "react";
import { useLocation } from "react-router-dom";

const SubmittedPage = () => {
  const location = useLocation();
  const { selectedData } = location.state || { selectedData: [] };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Submitted Data</h2>
      <div className="overflow-x-auto border-l border-r border-black">
        <table className="table-fixed w-full border-collapse shadow-md">
          <thead>
            <tr className="bg-gray-300">
              <th className="px-4 py-2 text-left border-b border-r border-black">Category</th>
              <th className="px-4 py-2 text-left border-b border-r border-black">Sub-Item</th>
              <th className="px-4 py-2 text-left border-b border-r border-black">Field</th>
              <th className="px-4 py-2 text-left border-b  border-black">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {selectedData.map((categoryData, index) => (
              <React.Fragment key={index}>
                <tr>
                  <td className="px-4 py-2 border-r border-gray-300" rowSpan={categoryData.subItems.length}>
                    {categoryData.category}
                  </td>
                  {categoryData.subItems.map((subItem, subIndex) => (
                    <React.Fragment key={subIndex}>
                      <tr>
                        <td className="px-4 py-2 border-r border-gray-300">{subItem.name}</td>
                        <td className="px-4 py-2">{subItem.quantity}</td>
                      </tr>
                      {subItem.fields.map((field, fieldIndex) => (
                        <tr key={fieldIndex}>
                          <td className="px-4 py-2 border-r border-gray-300">{field.field}</td>
                          <td className="px-4 py-2">{field.quantity}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmittedPage;
