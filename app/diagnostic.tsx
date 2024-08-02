import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Markdown from 'react-native-markdown-display';

interface DiagnosticProps {
  markdownString: string;
}

const Diagnostic: React.FC<DiagnosticProps> = ({ markdownString }) => {
  return (
    <View style={styles.container}>
      <Markdown>
        {markdownString}
      </Markdown>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  } as ViewStyle,
});

export default Diagnostic;
