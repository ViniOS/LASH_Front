import React from 'react';
import PDFButton from './PDFButton'; // Importe o PDFButton

function CustomTable({ columns, data, onDelete, onEdit, entity }) {
  return (
    <div className="w-4/6 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="text-sm text-left w-full">
        {/* Cabeçalho da tabela */}
        <thead className="text-xs text-white uppercase bg-red-700">
          <tr>
            {columns.map((column) => (
              <th scope="col" className="px-2 py-3" key={column.key}>
                {column.label}
              </th>
              
            ))}
            <th scope="col" className="px-2 py-3">
              Ações
            </th>
    
          </tr>
        </thead>
        {/* Corpo da tabela */}
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
                      {item.paciente[0].nome} {item.paciente[0].sobrenome}
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
              <td className="px-2 py-4">
                {/* Utilize o PDFButton para cada linha da tabela */}
                <PDFButton
                  data={[item]} // Passa os dados específicos para o PDF
                  fileName={`responsavel_${item.id}`} // Nome do arquivo PDF
                  buttonText="PDF" // Texto do botão
                  title={`Dados do Responsável ${item.nome}`} // Título do documento PDF
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
