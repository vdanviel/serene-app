import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Markdown from 'react-native-markdown-display';

// Define the interface for the data that will be rendered
interface DataResponse {
  id: number;
  content: string;
  ai_answer: string;
  created_at: string;
  diagnostic: string;
  result: boolean;
}

const Interact: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: number }; // Get the id from the URL parameters
  const [data, setData] = useState<DataResponse | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://192.168.15.12:8000/serene/diags/find?id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result: DataResponse[] = await response.json();
        setData(result[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const loadingStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  if (!data) {
    return (
      <View style={loadingStyles.container}>
        <ActivityIndicator size={'large'} color={colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Diagnostic Details</Text>
        <Text style={styles.label}>Diagnostic:</Text>
        <Text style={styles.text}>{data.diagnostic}</Text>

        <Text style={styles.label}>AI Answer:</Text>
        <Markdown style={styles.contentText}>{data.ai_answer}</Markdown>

        <Text style={styles.label}>Created At:</Text>
        <Text style={styles.text}>{new Date(data.created_at).toLocaleDateString()}</Text>

        <Text style={styles.label}>Content:</Text>
        <Text style={styles.text}>{data.content}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: 16,
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
  text: {
    fontSize: 16,
    marginVertical: 8,
  },
  contentText: {
    text: {
      fontSize: 20,
      textAlign: 'justify',
      fontWeight: 'bold',
    },
  },
});

export default Interact;
