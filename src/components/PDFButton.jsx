import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const MyDocument = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Dados do Responsável</Text>
          {data.map((responsavel) => (
            <View key={responsavel.id} style={styles.section}>
              <Text style={styles.subtitle}>{`${responsavel.nome} ${responsavel.sobrenome}`}</Text>
              <Text style={styles.text}>{`CPF: ${responsavel.cpf}`}</Text>
              <Text style={styles.text}>{`RG: ${responsavel.rg}`}</Text>
              <Text style={styles.text}>{`Endereço: ${responsavel.endereco}, ${responsavel.numero} - ${responsavel.bairro}, ${responsavel.cidade} - ${responsavel.uf}, ${responsavel.cep}`}</Text>
              {responsavel.paciente && (
                <View style={styles.section}>
                  <Text style={styles.subtitle}>Dados do Paciente</Text>
                  <Text style={styles.text}>{`Nome: ${responsavel.paciente.nome} ${responsavel.paciente.sobrenome}`}</Text>
                  <Text style={styles.text}>{`CPF: ${responsavel.paciente.cpf}`}</Text>
                  <Text style={styles.text}>{`Endereço: ${responsavel.paciente.endereco}, ${responsavel.paciente.numero} - ${responsavel.paciente.bairro}, ${responsavel.paciente.cidade} - ${responsavel.paciente.uf}, ${responsavel.paciente.cep}`}</Text>
                  <Text style={styles.text}>{`Doença: ${responsavel.paciente.doenca}`}</Text>
                  <Text style={styles.text}>{`Data de Nascimento: ${responsavel.paciente.dataNascimento}`}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

const PDFButton = ({ data, fileName, buttonText }) => (
    <PDFDownloadLink document={<MyDocument data={data} />} fileName={`${fileName}.pdf`}>
      {({ blob, url, loading, error }) => (
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Carregando documento...' : buttonText}
        </button>
      )}
    </PDFDownloadLink>
  )

export default PDFButton;
