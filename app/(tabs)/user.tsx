import { useCallback, useEffect, useState } from "react";
import { Text, View, Button, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../AuthContext";
import Begin from "@/components/Begin";
import Dashboard from "@/components/DashBoard";
import env from "../../env";

export interface UserData {
    user: {
        name: string,
        token: string,
        created_at: string
    },
    interactions: [
        {
            id: number,
            content: [{[key : string] : string}],
            ai_answer: {[key : string] : string},
            created_at: string,
            diagnostic: {[key : string] : string}
        },
    ]
}

const fetchAccount = async (token: string | undefined): Promise< UserData | null > => {
    try {
        const response = await fetch(`${env.url_fetch}/user/info?token=${token}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });

        const data : UserData = await response.json();
        
        return data;

    } catch (error) {

        console.error(error);
        return null;

    }
}

export default function User() {
    
    const [stateUser, setUser] = useState<UserData | null>(null);
    const [stateVerify, setVerify] = useState<boolean>(false);

    useEffect(() => {


        const handleAuth = async () => {
            
            const token : string | null = await AsyncStorage.getItem(env.pass_key);
            //await AsyncStorage.clear()
    
            if(token == null || token == undefined){
    
                setVerify(false);
    
            }else{
                
                const user_data = await fetchAccount(token);

                setUser(user_data);

                setVerify(true);

            }
    
        }

        handleAuth();
    
    }, [stateUser])

    const refreshUser  = useCallback((user : UserData) => {

        setUser(user);

    }, [stateUser])

    if (stateVerify == false) {

        /*

            CONTEXT EM REACT:
            é uma maneira de acessar dados sem precisar ficar passando de props em props.
            vc define um componente, e TODOS os filhos desse componente tem acesso a esse dado.

            acesse app/AuthController.ts

        */

        return (
            <AuthContext.Provider value={stateUser}>{/*<AuthContext.Provider value={stateUser}> - está definindo o provedor de onde vamos consumir os dados, que no caso é o valor de "value", que no caso é o fetch dos dados do user..*/}
                <Begin onRegister={refreshUser} />
            </AuthContext.Provider>
        );

    }

    if (stateVerify == true) {
        
        return (
            <AuthContext.Provider value={stateUser}>
                <Dashboard/>
            </AuthContext.Provider>
        );

    }

}