// Modern minimalistic table components for finance blogs
export const TableComponents = {
  table: ({ children, ...props }) => (
    <div className="my-8 w-full overflow-x-auto">
      <div className="inline-block min-w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table
          className="min-w-full table-auto border-collapse text-left text-sm"
          {...props}
        >
          {children}
        </table>
      </div>
    </div>
  ),
  thead: (props) => <thead className="bg-gray-50" {...props} />,
  th: (props) => (
    <th
      className="border-b border-gray-200 px-4 py-3 font-semibold text-gray-900"
      {...props}
    />
  ),
  tbody: (props) => <tbody className="divide-y divide-gray-200 bg-white" {...props} />,
  tr: (props) => (
    <tr
      className="transition-colors hover:bg-gray-50"
      {...props}
    />
  ),
  td: (props) => (
    <td className="px-4 py-3 text-gray-700" {...props} />
  ),
};
