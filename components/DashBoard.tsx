import { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";

import { useRouter } from 'expo-router';
import UserInteractions from "@/components/UserInteractions";
import { useColorScheme } from '@/components/useColorScheme';

import { useUserContext } from "../app/AuthContext";

import Colors from "@/constants/Colors";

export default function Dashboard() {

    const router = useRouter();
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        welcome: {
            fontWeight: 'bold',
            fontSize: 30
        },
        serene:{
            color: colorScheme == "dark" ? Colors.dark.tint : Colors.light.tint,
            fontSize:40,
            fontWeight:'bold'
        },
        icon:{
            margin:20,
            display:'flex',
            flexDirection:'row',
            alignItems: 'center',
            gap:8
        }
    });

    /*
        const user = useContext(AuthContext); - 
        podemos chamar assim, porem dessa maneira n tem a tratação do hardcoded caso ele seja null/undefined. em useUserContext() tratamos isso. veja app/AuthContext.ts
    */
    const user = useUserContext();//chama os dados do contexto..

    return (
        <View style={styles.container}>


            
            <Text style={styles.welcome}>Hello {user.user.name}!</Text>

            <UserInteractions />
        </View>
    );

}
