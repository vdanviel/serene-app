import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Markdown from 'react-native-markdown-display';
import { useRoute, RoutePro } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from "@/constants/Colors";
import IndexButton from "@/components/layout/IndexButton";
import IconWrapper from "@/components/IconWrapper";

type RootStackParamList = {
  Diagnostic: {
    description: string;
    result: boolean;
  };
};

type DiagnosticRouteProp = RouteProp<RootStackParamList, 'Diagnostic'>;

const Diagnostic: React.FC = () => {
  const route = useRoute<DiagnosticRouteProp>();
  const router = useRouter();
  const { description, result } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <IconWrapper
          name={result == "true" ? 'sad-outline' : 'happy-outline'}
          size={32}
          IconComponent={Ionicons}
          color={Colors.default.tint}
        />
        <Text style={styles.headerText}>
          {result == "true" ? "You have anxiety." : "You don't have anxiety."}
        </Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.markdownContainer}>
          <Markdown style={styles.contentText}>
            {description}
          </Markdown>
        </View>
      </ScrollView>

      <IndexButton title='I understood.' onPress={() => router.push('/main')}>
        <IconWrapper name='brain' IconComponent={FontAwesome5} color={'white'}/>
      </IndexButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    padding: 20,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '600',
    marginLeft: 10,
  },
  contentContainer: {
    padding: 20,
  },
  markdownContainer: {
    backgroundColor: Colors.default.background,
    borderRadius: 16,
    padding: 16,
  },
  contentText: {
    text:{
      fontSize: 20,
      textAlign: 'justify',
      fontWeight: 'bold'
    }
  },
});


export default Diagnostic;
