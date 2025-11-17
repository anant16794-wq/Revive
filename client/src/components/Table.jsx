import React from "react";

const WardTable = () => {
  const data = [
    { ward: "Ward 1", waste: 350, segregation: "65%", complaints: 5, score: 90 },
    { ward: "Ward 2", waste: 400, segregation: "40%", complaints: 2, score: 85 },
    { ward: "Ward 3", waste: 280, segregation: "80%", complaints: 1, score: 92 },
    { ward: "Ward 4", waste: 300, segregation: "70%", complaints: 3, score: 88 },
  ];

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm p-4">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 font-semibold">Ward</th>
            <th className="p-3 font-semibold">Waste Generated (kg)</th>
            <th className="p-3 font-semibold">Segregation (%)</th>
            <th className="p-3 font-semibold">Complaints</th>
            <th className="p-3 font-semibold">Citizen Score</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-3">{row.ward}</td>
              <td className="p-3">{row.waste}</td>
              <td className="p-3">{row.segregation}</td>
              <td className="p-3">{row.complaints}</td>
              <td className="p-3">{row.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WardTable;
