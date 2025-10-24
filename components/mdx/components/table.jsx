'use client';

import React from 'react';

/**
 * MDX Table component for rendering table data with modern minimalistic styling
 * Usage in MDX:
 * <MDXTable
 *   headers={["Header1", "Header2"]}
 *   rows={[
 *     ["Row1 Col1", "Row1 Col2"],
 *     ["Row2 Col1", "Row2 Col2"]
 *   ]}
 *   caption="Optional table caption"
 * />
 */
export default function MDXTable({ headers, rows, caption }) {
  return (
    <div className="my-8 w-full overflow-x-auto">
      <div className="inline-block min-w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full table-auto border-collapse text-left text-sm">
          {caption && (
            <caption className="bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
              {caption}
            </caption>
          )}
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="border-b border-gray-200 px-4 py-3 font-semibold text-gray-900"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="transition-colors hover:bg-gray-50"
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="px-4 py-3 text-gray-700"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
