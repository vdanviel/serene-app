import { PressableProps, DimensionValue, ColorValue, StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from "@/constants/Colors";

interface IndexButtonProps {
    buttonStyle?: StyleProp<ViewStyle>,
    children?: React.JSX.Element | null,
    title: string,
    bg?: ColorValue | undefined,
    textColor?: ColorValue | undefined,
    width?: DimensionValue | undefined,
    margin?: DimensionValue | undefined,
    onPress: ([type] : any) => void
}

export default function IndexButton({children = null ,title, buttonStyle = {}, margin=18, bg = undefined, textColor = undefined, width = 'auto', onPress}: IndexButtonProps) {

    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        patternPresssable: {
            width: width,
            backgroundColor: bg == undefined ? (colorScheme == 'dark' ? Colors.dark.tint : Colors.light.tint) : bg,
            padding: 12,
            borderRadius: 16,
            margin: margin,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5
        },
        patternText: {
            color: textColor == undefined ? "#ffffff" : textColor,
            fontWeight: 'bold',
            fontSize: 15
        }
    })

    return (
        <Pressable
            android_ripple={{color: 'rgba(255, 255, 255, 0.3)', borderless: false}}
            style={[styles.patternPresssable, buttonStyle]}
            onPress={onPress}
        >
            {children}
            <Text style={styles.patternText}>{title}</Text>
        </Pressable>
    )

}