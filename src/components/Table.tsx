type Column = {
    header: string;
    render: (item: object) => React.ReactNode;
};

type TableProps = {
    columns: Column[];
    data: object[] | undefined;
};

const Table = ({ columns, data }: TableProps): React.JSX.Element => {
    return (
        <div className="w-full shadow-xs rounded-2xl border border-neutral-200 bg-white overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-sm text-body border-b border-neutral-200">
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="px-3 md:px-6 py-3 font-semibold">
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item, index) => (
                        <tr key={index} className="border-b last:border-b-0 border-neutral-200">
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className="px-3 md:px-6 py-4">
                                    {col.render(item)}
                                </td>
                            ))}
                        </tr>
                    ))}
                    {data?.length === 0 && (
                        <tr>
                            <td colSpan={columns.length} className="py-10 text-center text-neutral-400">
                                No data found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;