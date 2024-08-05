import { Ionicons } from '@expo/vector-icons';
import IconWrapper from '@/components/IconWrapper';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import { useRouter } from 'expo-router';

interface BackButtonInterface {
    onBack?: () => void | null | undefined;
}

const BackButton = ({ onBack = () => useRouter().back() }: BackButtonInterface) => {
    return (
        <Pressable
            onPress={() => onBack()}
            style={({ pressed }) => [
                styles.button,
                {
                    opacity: pressed ? 0.7 : 1,
                    backgroundColor: pressed ? '#e0e0e0' : 'transparent',
                },
            ]}
            android_ripple={{ color: '#ddd', borderless: true }}
        >
            <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        marginRight: 30,
        //marginLeft: 10

    } as ViewStyle,
});

export default BackButton;
