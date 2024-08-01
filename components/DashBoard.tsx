import { useContext } from "react";
import { Text, View, Button, StyleSheet } from "react-native";

import { useRouter } from 'expo-router';
import UserInteractions from "@/components/UserInteractions";
import { useColorScheme } from '@/components/useColorScheme';

import { useUserContext } from "../app/AuthContext";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        
    }
});




export default function Dashboard() {

    const router = useRouter();
    const colorScheme = useColorScheme();

    /*
        const user = useContext(AuthContext); - 
        podemos chamar assim, porem dessa maneira n tem a tratação do hardcoded caso ele seja null/undefined. em useUserContext() tratamos isso. veja app/AuthContext.ts
    */
    const user = useUserContext();//chama os dados do contexto..

    return (
        <View style={styles.container}>
            <View style={styles.container}>

                <Text>Hello {user.user.name}</Text>

                <UserInteractions />
            </View>
        </View>
    );

}
