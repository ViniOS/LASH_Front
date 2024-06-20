import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  subSection: {
    marginLeft: 10,
    marginBottom: 5,
  }
});

const MyDocument = ({ data, entityType }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>{`Dados do ${entityType === 'paciente' ? 'Paciente' : 'Responsável'}`}</Text>
        {Object.keys(data).map((key) => {
          if (Array.isArray(data[key])) {
            return (
              <View key={key} style={styles.section}>
                <Text style={styles.text}>{`${key}:`}</Text>
                {data[key].map((subItem, index) => (
                  <View key={index} style={styles.subSection}>
                    {Object.keys(subItem).map((subKey) => (
                      <Text style={styles.text} key={subKey}>{`${subKey}: ${subItem[subKey]}`}</Text>
                    ))}
                  </View>
                ))}
              </View>
            );
          } else if (typeof data[key] === 'object' && data[key] !== null) {
            return (
              <View key={key} style={styles.section}>
                <Text style={styles.text}>{`${key}:`}</Text>
                <View style={styles.subSection}>
                  {Object.keys(data[key]).map((subKey) => (
                    <Text style={styles.text} key={subKey}>{`${subKey}: ${data[key][subKey]}`}</Text>
                  ))}
                </View>
              </View>
            );
          }
          return <Text style={styles.text} key={key}>{`${key}: ${data[key]}`}</Text>;
        })}
      </View>
    </Page>
  </Document>
);

export default MyDocument;
