import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './MyDocument';

const PDFButton = ({ data, entityType, fileName, buttonText }) => (
  <PDFDownloadLink
    document={<MyDocument data={data} entityType={entityType} />}
    fileName={`${fileName}.pdf`}
  >
    {({ loading }) => (
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        {loading ? 'Gerando PDF...' : buttonText}
      </button>
    )}
  </PDFDownloadLink>
);

export default PDFButton;
