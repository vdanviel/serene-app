import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Defina a interface para os dados que serão renderizados
interface DataResponse {
  id: number;
  content: string;
  ai_answer: string;
  created_at: string;
  diagnostic: string;
  result: boolean;
}

const DetailsScreen: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: number }; // Obtém o id dos parâmetros da URL
  const [data, setData] = useState<DataResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.15.12:8000/serene/diags/find?id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result: DataResponse = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Parse o conteúdo JSON para um array de objetos
  const contentArray = JSON.parse(data.content);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Diagnostic Details</Text>
      <Text style={styles.label}>Diagnostic:</Text>
      <Text>{data.diagnostic}</Text>

      <Text style={styles.label}>AI Answer:</Text>
      <Text>{data.ai_answer}</Text>

      <Text style={styles.label}>Created At:</Text>
      <Text>{new Date(data.created_at).toLocaleDateString()}</Text>

      <Text style={styles.label}>Content:</Text>

      {contentArray.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.question}>Q: {item.question}</Text>
          <Text style={styles.answer}>A: {item.answer}</Text>
        </View>
      ))}
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  item: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  question: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    color: '#555',
  },
});

export default DetailsScreen;
