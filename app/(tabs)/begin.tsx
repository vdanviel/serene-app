import { useEffect, useState } from "react";

import { Text, View } from '@/components/Themed';
import { StyleSheet, Button, TextInput } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

import env from "../../env";

import { useRouter } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

import IndexInput from "@/components/layout/IndexInput";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        margin: 20,
        padding: 10,
        borderRadius: 16,
        borderColor: Colors.default.background,
        borderWidth: 1,
        minWidth: 200
    }
});

const isAuth = async () : Promise<boolean> => {

    try {
     
        const value = await AsyncStorage.getItem(env.pass_key);

        if (value !== null) {
            return true
        }

        return false;

    } catch (error) {
        
        console.error(error);
        
        return false;

    }

}

export default function Begin(){

    const router = useRouter();
    const colorScheme = useColorScheme();

    const [stateText, setText] = useState('');
    const [stateVerify, setVerify] = useState(false);


    const registerAccount = async () : Promise<void> => { 

        try {
            
            const response = await fetch(env.url_fetch + "/user/register", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: stateText,
                }),
            });

            const data = await response.json();

            if (data.status == true) {
                
                //persisting data..
                await AsyncStorage.setItem('auth', data.token);

                router.navigate('/form');

            }            

        } catch (error) {
            
            console.error(error);

        }

    }

    useEffect(() => {

        const checkVerify = async () => {
            
            const result = await isAuth();

            setVerify(result);
        }

        checkVerify();

    }, [])

    if (stateVerify == false) {

        return (
            <View style={styles.container}>
    
                <Text>What is your name ?</Text>
    
                <IndexInput placeholder="Type your name" input_value={stateText} onText={(text) => setText(text)}/>
    
                <Button
                    title="Answer Form"
                    onPress={registerAccount}
                    color={colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint}
                />
    
            </View>
        )       
        
    }else{

        useEffect(() => {



        }, [])

        return (

            <View style={styles.container}>
    
                <Text>Hello </Text>

            </View>

        )

    }

}