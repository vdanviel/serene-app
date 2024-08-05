import { useState, useRef, useEffect } from "react";
import { Text, View, Button, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from "../reusable";
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import IndexInput from "@/components/layout/IndexInput";
import IndexButton from "@/components/layout/IndexButton";
import Presentation from "@/components/Presentation";
import env from "../../env";

export default function TabOneScreen() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const [stateText, setText] = useState('');
    const [stateError, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);  // Adiciona estado de carregamento

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colorScheme == 'dark' ? Colors.dark.background : Colors.light.background
        },
        inputError: {
            borderColor: 'red',
            margin: 0
        },
        input: {
            margin: 0
        },
        textError: {
            color: 'red',
            textAlign: 'center',
            marginBottom: 15
        },
        buttonContainer: {
            marginTop: 20
        },
        loadingIndicator: {
            marginVertical: 10
        }
    });

    useEffect(() => {
  
      const verifyUser = async () => {
  
        const token = await AsyncStorage.getItem(env.pass_key);
  
        if (token !== null) {

            router.push("main");

        }
  
      }
  
      verifyUser();
      
    },[]);

    const registerAccount = async (): Promise<void> => {
        setError(null);
        setIsLoading(true);  // Ativa o carregamento

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

                router.push('/main');
                
            } else {
                setError('Please type your name.');
            }

        } catch (error) {
            console.error(error);
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);  // Desativa o carregamento
        }
    }

    return (
        <View style={styles.container}>

            <Presentation />
            <View>
                <IndexInput 
                    inputStyle={stateError ? styles.inputError : styles.input} 
                    placeholder="What's your name?" 
                    input_value={stateText}
                    onText={setText}
                />
                {stateError ? <Text style={styles.textError}>{stateError}</Text> : null}
            </View>

            <View style={styles.buttonContainer}>

                <IndexButton 
                    title={isLoading ? "" :"Get Started!" }
                    margin={0} 
                    onPress={registerAccount} 
                    activate={!isLoading}
                    buttonStyle={
                        {
                            width:150
                        }
                    }
                    align="center"
                >
                    {
                        isLoading 
                        ?
                        <ActivityIndicator size={15} color={"white"} />
                        :
                        null
                    }
                </IndexButton>

            </View>
            
        </View>
    );
}