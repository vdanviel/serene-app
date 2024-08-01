import IconWrapper from "@/components/IconWrapper";
import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Text, View } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from "@/constants/Colors";

export default function IconHeader() {
    const colorScheme = useColorScheme();
    const styles = StyleSheet.create({
        headerContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 18,
            backgroundColor: colorScheme === "dark" ? Colors.dark.background : '#ffffff',
            width: '100%',
            height: '100%',
            borderBottomWidth: 1,
            borderBottomColor: colorScheme === "dark" ? '#ffffff' : '#d8d8d8',
            gap: 5
        },
        serene: {
            color: colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint,
            fontSize: 24,
            fontWeight: 'bold',
        },
    });

    return (
        <View style={styles.headerContainer}>
            <IconWrapper 
                IconComponent={FontAwesome6} 
                name="brain" 
                color={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint} 
                size={20} 
            />
            <Text style={styles.serene}>Serene</Text>
        </View>
    );
}
