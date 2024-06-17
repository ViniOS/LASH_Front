import React from 'react';

function CustomTable({ columns, data, onDelete, onEdit, entity }) {
    return (
        <div className="w-4/6 overflow-x-auto shadow-md sm:rounded-lg">
            <table className="text-sm text-left w-full">
                <thead className="text-xs text-white uppercase bg-red-700">
                    <tr>
                        {columns.map((column) => (
                            <th scope="col" className="px-2 py-3" key={column.key}>
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr className="bg-white border-b dark:bg-white" key={item.id}>
                            {columns.map((column) => {
                                if (column.key === 'editar') {
                                    return (
                                        <td className="px-2 py-4" key={column.key}>
                                            <button onClick={() => onEdit(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                                                Editar
                                            </button>
                                        </td>
                                    );
                                } else if (column.key === 'excluir') {
                                    return (
                                        <td className="px-2 py-4" key={column.key}>
                                            <button onClick={() => onDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                Excluir
                                            </button>
                                        </td>
                                    );
                                } else if (column.key === 'pacienteNome' && entity === 'responsaveis') {
                                    return (
                                        <td className="px-6 py-4" key={column.key}>
                                            {item.paciente[0].nome} {item.paciente[0].sobrenome} {/* Exibe o nome completo do paciente */}
                                        </td>
                                    );
                                } else {
                                    return (
                                        <td className="px-6 py-4" key={column.key}>
                                            {item[column.key]}
                                        </td>
                                    );
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomTable;
