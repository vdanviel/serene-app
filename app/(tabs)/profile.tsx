import UserInfo from "@/components/UserInfo";
import { View, StyleSheet } from "react-native";
import { UserData } from "../reusable";
import { useCallback, useEffect, useState } from "react";
import {fetchAccount} from "../reusable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from "../../env";
import { useRouter } from "expo-router";
import { AuthProvider } from "../AuthContext";

export default function Profile() {

    const styles = StyleSheet.create({
        conteiner:{

        }
    });

    const [stateUser, setUser] = useState<null | UserData | void>(null);

    useEffect(() => {

        const handleAuth = async () => {

            const token : string | null = await AsyncStorage.getItem(env.pass_key);
            //await AsyncStorage.clear()

            const user_data = await fetchAccount(token,"0","5");
            setUser(user_data);
      
        }

        handleAuth();
    }, []);

    const router = useRouter();

    if (stateUser && 'status' in stateUser) {
        
    }

    return (
    <AuthProvider>

            <UserInfo  />

    </AuthProvider>

    )

}