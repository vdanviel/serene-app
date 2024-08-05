import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import Markdown from 'react-native-markdown-display';
import IconWrapper from "@/components/IconWrapper";
import { Ionicons, Entypo, FontAwesome6 } from "@expo/vector-icons";
import env from "../env";

// Define the interface for the data that will be rendered
interface DataResponse {
  id: number;
  content: string;
  ai_answer: string;
  created_at: string;
  diagnostic: string;
  result: boolean;
}

interface QA {
  question: string;
  answer: string;
}

const Interact: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: number }; // Get the id from the URL parameters
  const [data, setData] = useState<DataResponse | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${env.url_fetch}/serene/diags/find?id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result: DataResponse = await response.json();
        setData(result);

        console.log(result)

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
      backgroundColor: colorScheme == 'dark' ? Colors.dark.background : Colors.light.background,
    },
  });

  if (!data) {
    return (
      <View style={loadingStyles.container}>
        <ActivityIndicator size={'large'} color={colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint} />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: Colors.light.background,
    },
    scroll:{
      marginHorizontal: 10
    },
    markdownConteiner: {
      backgroundColor: Colors.default.background,
      padding: 10,
      borderRadius: 16
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
    mkText: {
      text: {
        fontSize: 20,
        textAlign: 'justify',
        fontWeight: 'bold',
      },
    },
    resultConteienr:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row',
      gap: 10,
      margin: 20,
      marginHorizontal: 50
    },
    inShortConteienr:{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection:'row',
      gap: 10,
      marginBottom:20
    },
    resultText:{
      fontSize: 18,
      fontWeight: 'bold',
      color: colorScheme == 'dark' ? Colors.dark.tint : Colors.light.tint,
    },
    inShortText: {
      fontWeight: 'bold',
      fontSize: 18,
      fontStyle: 'italic',
      color: colorScheme == 'dark' ? Colors.dark.tint : Colors.light.tint,
      textAlign: 'center'
    },
    question: {
      backgroundColor: Colors.light.tint,
      color: 'white',
      fontWeight: 'bold',
      padding: 10,
      borderRadius: 8,
      marginBottom: 8,
    },
    answer: {
      borderColor: Colors.default.background,
      borderWidth: 4,
      color: 'black',
      padding: 10,
      borderRadius: 8,
      marginBottom: 16,
    },
    form:{
      marginTop: 20
    },
    registerTime: {
      flexDirection: 'row',
      marginVertical: 10,
      alignItems: 'center',
      gap: 5,
      display: 'flex'
    },

  });

  const mkRules = {
    text: (node, children, parent, styles, inheritedStyles = {}) => (
      <Text key={node.key} style={[inheritedStyles, styles.text]}>
        {node.content}
      </Text>
    ),
  }
  
  const MARKDOWN_TEXT = data.ai_answer;

  const parsedContent: QA[] = JSON.parse(data.content);

  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.scroll}>
        
        <View style={styles.resultConteienr}>
          <IconWrapper
            name={data.result == true ? 'sad-outline' : 'happy-outline'}
            size={32}
            IconComponent={Ionicons}
            color={colorScheme == 'dark' ? Colors.dark.tint : Colors.light.tint}
          />
          <Text style={styles.resultText}>
            {data.result == true ? "You have anxiety." : "You don't have anxiety."}
          </Text>
        </View>

        <View style={styles.inShortConteienr}>

          <Text style={styles.inShortText}>"{data.diagnostic}..."</Text>
        </View>
        
        <View style={styles.markdownConteiner}>
          <Markdown rules={mkRules} style={styles.mkText}>
            {MARKDOWN_TEXT}
          </Markdown>
        </View>


        <Text style={styles.label}>Your Form:</Text>

        <View style={styles.form}>
          {parsedContent.map((item, index) => (
            <View key={index}>
              <Text style={styles.question}>{item.question}</Text>
              <Text style={styles.answer}>"{item.answer}"</Text>
            </View>
          ))}
        </View>

        <View style={[styles.registerTime]}>
            <IconWrapper name="stopwatch" IconComponent={FontAwesome6} size={10} />
            <Text style={{textAlign:'center'}}>{(new Date(data.created_at)).toLocaleString()}</Text>
        </View>
      </ScrollView>

    </SafeAreaView>


  );
};



export default Interact;
