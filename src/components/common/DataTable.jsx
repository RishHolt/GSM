import React from 'react';

const DataTable = ({ columns, data, onRowClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="bg-white min-w-full">
        <thead>
          <tr className="bg-gray-50 border-b">
            {columns.map((column, index) => (
              <th 
                key={index}
                className="px-6 py-3 font-medium text-gray-500 text-xs text-left uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex}
              onClick={() => onRowClick && onRowClick(row)}
              className={`${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''} ${
                rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
              }`}
            >
              {columns.map((column, colIndex) => (
                <td 
                  key={colIndex}
                  className="px-6 py-4 text-gray-900 text-sm whitespace-nowrap"
                >
                  {column.render ? column.render(row) : row[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
