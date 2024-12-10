import React from "react";
import { useLocation } from "react-router-dom";

function MeasurementDisplay() {
  const location = useLocation();
  const data = location.state?.data || [];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Measurement Details
      </h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Type ID</th>
            <th className="border px-4 py-2">Same Size</th>
            <th className="border px-4 py-2">Different Size</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.productName}</td>
              <td className="border px-4 py-2">{item.typeId}</td>
              <td className="border px-4 py-2">{item.sameSize || "N/A"}</td>
              <td className="border px-4 py-2">{item.diffSize || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MeasurementDisplay;
