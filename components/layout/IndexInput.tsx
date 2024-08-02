import React from "react";
import { TextInput, StyleProp, StyleSheet } from "react-native";
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

interface IndexInputProps {
    placeholder: string;
    input_value: string;
    onText: (text: string) => void;
    inputStyle?: {};
  }

const IndexInput: React.FC<IndexInputProps> = ({ placeholder, input_value, onText, inputStyle }) => {

    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        pattern: {
            margin: 20,
            padding: 10,
            borderRadius: 16,
            borderColor: Colors.default.background,
            borderWidth: 1,
            minWidth: 200,
            color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
        },
        props: inputStyle ? inputStyle : {}
    })

    return (
        <TextInput
            style={[styles.pattern, styles.props]}
            onChangeText={text => onText(text)}
            value={input_value}
            placeholder={placeholder}
            keyboardType="default"
            cursorColor={colorScheme == "dark" ? Colors.dark.tint : Colors.light.tint}
            selectionColor={colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint}
        />
    );

};

export default IndexInput;
