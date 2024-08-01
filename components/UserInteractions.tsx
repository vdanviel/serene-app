import { useState } from "react";
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Text, View } from '@/components/Themed';
import { StyleSheet, Pressable, ScrollView, SafeAreaView} from "react-native";
import { useRouter } from 'expo-router';
import { useUserContext } from "../app/AuthContext";
import IconWrappper from "@/components/IconWrapper";
import { FontAwesome6 } from "@expo/vector-icons";

export default function UserInteractions() {
    
    const router = useRouter();
    const colorScheme = useColorScheme();

    const interactStyle = StyleSheet.create({
        card: {
            backgroundColor: colorScheme == 'dark' ? Colors.dark.tint : Colors.light.tint,
            borderRadius: 10,
            padding: 15,
            marginVertical: 5,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 3,
        },
        cardContent: {
            padding: 10,
        },
        questionText: {
            fontWeight: 'bold',
            fontSize: 16,
        },
        questionSmallText: {
            fontSize: 10,
            color: colorScheme == 'dark' ? Colors.dark.tint : Colors.light.tint
        },
        advice: {
            borderColor: Colors.default.background,
            borderRadius: 16,
            margin: 15,
            marginTop:30,
            padding: 20,
            borderWidth: 1,
            display: 'flex',
            alignItems: 'center',
            gap:10
          }
    });

    const user = useUserContext();

    if (user.interactions.length > 0) {
        return (

            <ScrollView>
                {
                    user.interactions.map((obj, i) => (
                        <View key={i} style={interactStyle.card}>
                            <Pressable key={i} style={interactStyle.cardContent}>
                                <Text style={interactStyle.questionText}>{obj.diagnostic.answer}</Text>
                                <Text ></Text>
                            </Pressable>
                        </View>
                    ))
                }
            </ScrollView>

        )
    }else{
        return (
            <View style={interactStyle.advice}>
                <IconWrappper IconComponent={FontAwesome6} name='circle-minus' color={Colors.default.background} size={20} />
                <Text>You have no interactions yet! Try one on the answer section.</Text>
            </View>
        )
    }

}