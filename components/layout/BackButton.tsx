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
            <IconWrapper IconComponent={Ionicons} name="arrow-back" color="#1c1c1c" size={28} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 30, // Torna o botão redondo
    } as ViewStyle,
});

export default BackButton;
