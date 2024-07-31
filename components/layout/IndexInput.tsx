import React from "react";
import { TextInput } from "react-native";
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

interface IndexInputProps {
    placeholder: string;
    input_value: string;
    onText: (text: string) => void;
}

const IndexInput: React.FC<IndexInputProps> = ({ placeholder, input_value, onText }) => {

    const colorScheme = useColorScheme();

    return (
        <TextInput
            style={{
                margin: 20,
                padding: 10,
                borderRadius: 16,
                borderColor: Colors.default.background,
                borderWidth: 1,
                minWidth: 200,
                color: colorScheme === 'dark' ? Colors.dark.text : Colors.light.text
            }}
            onChangeText={text => onText(text)}
            value={input_value}
            placeholder={placeholder}
            keyboardType="default"
            selectionColor={colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint}
        />
    );
};

export default IndexInput;
