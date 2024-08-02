import { DimensionValue, ColorValue, StyleSheet, Pressable, StyleProp, ViewStyle, View, FlexAlignType  } from "react-native";
import React from "react";
import { Text } from '@/components/Themed';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from "@/constants/Colors";

interface IndexButtonProps<T> {
    buttonStyle?: StyleProp<ViewStyle>,
    children?: React.JSX.Element | null,
    title: string,
    bg?: ColorValue | undefined,
    activate?: boolean,
    textColor?: ColorValue | undefined,
    width?: DimensionValue | undefined,
    margin?: DimensionValue | undefined,
    align?: FlexAlignType,
    onPress: () => T | Promise<T>
}

export default function IndexButton({children = null, align='flex-start', activate = true, title, buttonStyle = {}, margin=18, bg = undefined, textColor = undefined, width = 'auto', onPress}: IndexButtonProps<void>) {

    const colorScheme = useColorScheme();

    function identity(arg: any): any {
        return arg;
    }

    //let alignOriented :  Pick<IndexButtonProps<void>, "align"> = {align: null};//Pick - https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
    let output = identity(null);

    switch (align) {
        case 'flex-start':
            output = 'flex-start'
            break;
        case 'center':
            output = 'center'
            break;
        case 'flex-end':
            output = 'fle-end'
            break;
        case 'baseline':
            output = 'baseline'
            break;
        case 'stretch':
            output = 'stretch'
            break;
    
        default:
            output = 'flex-start'
            break;
    }

    const styles = StyleSheet.create({
        patternPresssable: {
            width: width,
            backgroundColor: bg == undefined ? ( activate == true ? (colorScheme == 'dark' ? Colors.dark.tint : Colors.light.tint) : "#b5446ed4") : bg,
            padding: 12,
            borderRadius: 16,
            margin: margin,
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
            disabled={!activate}

        >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center', justifyContent: output, gap:5}}>
                {children}
                <Text style={styles.patternText}>{title}</Text>
            </View>
            
        </Pressable>
    )

}