import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Markdown from 'react-native-markdown-display';

interface DiagnosticProps {
  description: string,
  result: boolean
}

const Diagnostic: React.FC<DiagnosticProps> = ({ description, result }) => {
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['transparent', 'green']}
        start={[1, 1]}
        end={[0, 0]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{result == true ? "You have anxiety." : "You don't have anxiety."}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.contentText}>{description}</Text>
      </ScrollView>
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
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    padding: 20,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Diagnostic;
