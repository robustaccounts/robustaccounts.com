'use client';

/**
 * Parse a Markdown table string into a structured format
 * @param {string} tableText - The raw Markdown table text
 * @returns {object} Parsed table with headers and rows
 */
export function parseMarkdownTable(tableText) {
  try {
    // Split the text into lines and filter out empty lines
    const lines = tableText
      .trim()
      .split('\n')
      .filter((line) => line.trim() !== '');

    if (lines.length < 3) {
      // Not enough content for a valid table
      return { headers: [], rows: [], error: 'Invalid table format' };
    }

    // Parse headers (first line)
    const headerLine = lines[0].trim();
    if (!headerLine.startsWith('|') || !headerLine.endsWith('|')) {
      return { headers: [], rows: [], error: 'Invalid header format' };
    }

    const headers = headerLine
      .split('|')
      .slice(1, -1) // Remove first and last empty items
      .map((header) => header.trim());

    // Skip delimiter row (second line)

    // Process content rows
    const rows = [];
    for (let i = 2; i < lines.length; i++) {
      const rowLine = lines[i].trim();
      if (!rowLine.startsWith('|') || !rowLine.endsWith('|')) {
        continue; // Skip invalid rows
      }

      const cells = rowLine
        .split('|')
        .slice(1, -1) // Remove first and last empty items
        .map((cell) => cell.trim());

      rows.push(cells);
    }

    return { headers, rows };
  } catch (error) {
    console.error('Error parsing Markdown table:', error);
    return { headers: [], rows: [], error: error.message };
  }
}

/**
 * Render a Markdown table from raw text
 * @param {string} tableText - The raw Markdown table text
 * @returns {JSX.Element} A rendered HTML table
 */
export function MarkdownTable({ tableText }) {
  const { headers, rows, error } = parseMarkdownTable(tableText);

  if (error) {
    return <div className="text-red-500">Error rendering table: {error}</div>;
  }

  return (
    <div className="my-8 w-full overflow-x-auto">
      <table className="w-full table-auto border-collapse border border-gray-200">
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
              className="border-b border-gray-200 transition-colors hover:bg-gray-50"
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
