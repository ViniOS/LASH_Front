import React from 'react';
import PDFButton from './PDFButton';

const CustomTable = ({ columns, data, onDelete, onEdit, entity }) => (
  <div className="w-4/6 overflow-x-auto shadow-md sm:rounded-lg">
    <table className="text-sm text-left w-full">
      <thead className="text-xs text-white uppercase bg-red-700">
        <tr>
          {columns.map((column) => (
            <th scope="col" className="px-2 py-3" key={column.key}>
              {column.label}
            </th>
          ))}
          <th scope="col" className="px-2 py-3">Ações</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr className="bg-white border-b dark:bg-white" key={item.id}>
            {columns.map((column) => (
              <td className="px-6 py-4" key={column.key}>
                {column.key === 'pacienteNome' && entity === 'responsaveis' ? `${item.paciente[0].nome} ${item.paciente[0].sobrenome}` : item[column.key]}
              </td>
            ))}
            <td className="px-2 py-4">
              <button onClick={() => onEdit(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                Editar
              </button>
              <button onClick={() => onDelete(item.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">
                Excluir
              </button>
              {entity !== 'frequencias' && entity !== 'doencas' && (
                <PDFButton
                  data={item}
                  entityType={entity}
                  fileName={`${entity}_${item.id}`}
                  buttonText="Exportar PDF"
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default CustomTable;
