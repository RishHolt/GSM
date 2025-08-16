import React from 'react';

const SummaryCard = ({ title, value, icon, trend }) => {
  return (
    <div className="bg-white shadow-sm p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="mt-1 font-semibold text-2xl">{value}</h3>
          {trend && (
            <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% from last month
            </p>
          )}
        </div>
        <div className="text-blue-500 text-2xl">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
