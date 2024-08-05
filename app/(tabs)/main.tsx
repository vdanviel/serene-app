import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, AuthProvider } from "../AuthContext";
import Dashboard from "@/components/DashBoard";
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import env from "../../env";
import {fetchAccount} from "../reusable";
import { UserData } from "../reusable";

export default function User() {
    const [stateUser, setUser] = useState<null | UserData | void>(null);
    const colorScheme = useColorScheme();

    useEffect(() => {

        const handleAuth = async () => {

            const token : string | null = await AsyncStorage.getItem(env.pass_key);
            //await AsyncStorage.clear()

            const user_data = await fetchAccount(token,"0","5");
            setUser(user_data);
      
        }

        handleAuth();
    }, []);

    return (
        <AuthProvider>
            <Dashboard/>
        </AuthProvider>
    );

}
