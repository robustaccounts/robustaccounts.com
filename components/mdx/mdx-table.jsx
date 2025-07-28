'use client';

import React from 'react';

/**
 * MDX Table component for rendering table data
 * Usage in MDX:
 * <MDXTable
 *   headers={["Header1", "Header2"]}
 *   rows={[
 *     ["Row1 Col1", "Row1 Col2"],
 *     ["Row2 Col1", "Row2 Col2"]
 *   ]}
 * />
 */
export default function MDXTable({ headers, rows, caption }) {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-200">
        {caption && (
          <caption className="mb-2 caption-top text-sm text-gray-600">
            {caption}
          </caption>
        )}
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-900"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={`border-b border-gray-200 transition-colors hover:bg-gray-50 ${
                rowIdx % 2 === 1 ? 'bg-gray-50' : ''
              }`}
            >
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="border border-gray-200 px-4 py-2 text-gray-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
