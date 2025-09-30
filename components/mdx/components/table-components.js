export const TableComponents = {
  table: (props) => (
    <div className="my-8 w-full overflow-x-auto">
      <table
        className="w-full table-auto border-collapse border border-gray-200"
        {...props}
      />
    </div>
  ),
  thead: (props) => <thead className="bg-gray-50" {...props} />,
  th: (props) => (
    <th
      className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-900"
      {...props}
    />
  ),
  tr: (props) => (
    <tr
      className="border-b border-gray-200 transition-colors hover:bg-gray-50"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-gray-200 px-4 py-2 text-gray-700" {...props} />
  ),
};
