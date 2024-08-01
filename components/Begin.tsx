import { useState, useRef } from "react";
import { Text, View, Button, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { UserData } from "../app/(tabs)/user";
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import IndexInput from "@/components/layout/IndexInput";
import env from "../env";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputError: {
        borderColor: 'red',
        marginBottom:0
    },
    textError: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15
    },
});

interface BeginProps{
    onRegister: (user : UserData) => void
}

export default function Begin({onRegister} : BeginProps) {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const [stateText, setText] = useState('');
    const [stateError, setError] = useState('');

    const registerAccount = async (): Promise<void> => {

        setError('');

        try {
            const response = await fetch(`${env.url_fetch}/user/register`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: stateText }),
            });

            const data = await response.json();
            
            if (data.status == true) {
                
                await AsyncStorage.setItem(env.pass_key, data.identifier);
                router.push('/form');
                onRegister(data);

            }else{

                setError('Please type your name.');

            }

        } catch (error) {
            console.error(error);
        }
        
    }

    return (
        <View style={styles.container}>
            <Text>What is your name?</Text>

            <View>
                <IndexInput 
                    inputStyle={stateError ? styles.inputError : {}} 
                    placeholder="Type your name" 
                    input_value={stateText} 
                    onText={setText} 
                />
                {stateError ? <Text style={styles.textError}>{stateError}</Text> : null}
            </View>

            <Button
                title="Answer Form"
                onPress={registerAccount}
                color={colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint}
            />
        </View>
    );

}
