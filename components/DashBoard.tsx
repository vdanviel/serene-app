import { Text, View, Button, StyleSheet, Alert, ScrollView, FlatList } from "react-native";
import { useRouter } from 'expo-router';
import UserInteractions from "@/components/UserInteractions";
import { useColorScheme } from '@/components/useColorScheme';
import IconWrapper from "@/components/IconWrapper";
import { useUserContext } from "../app/AuthContext";
import IndexButton from "@/components/layout/IndexButton";
import Colors from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";

export default function Dashboard() {

    const router = useRouter();
    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colorScheme == 'dark' ? Colors.dark.background : Colors.light.background,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        welcome: {
            fontWeight: 'bold',
            fontSize: 30,
            textAlign:'center',
            //fontFamily: 'skate'
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
        },
        welcomeConteiner:{
            marginVertical: 40
        }
    });

    /*
        const user = useContext(AuthContext); - 
        podemos chamar assim, porem dessa maneira n tem a tratação do hardcoded caso ele seja null/undefined. em useUserContext() tratamos isso. veja app/AuthContext.ts
    */
    const client = useUserContext();//chama os dados do contexto..

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.welcomeConteiner}>
                <Text style={styles.welcome}>Hello {client.user.name}!</Text>

                <IndexButton buttonStyle={{marginBottom:0}} title="Create a new interaction" onPress={() => router.push('/form')}>
                    <IconWrapper IconComponent={FontAwesome6} name="heart-circle-plus" color="white" />
                </IndexButton>
            </View>

        </ScrollView>
    );



}