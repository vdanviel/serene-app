import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../AuthContext";
import Begin from "@/components/Begin";
import Dashboard from "@/components/DashBoard";
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import env from "../../env";
import {fetchAccount} from "../reusable";
import { UserData } from "../reusable";

export default function User() {
    const [stateUser, setUser] = useState<null | UserData | void>(null);
    const [stateVerify, setVerify] = useState<boolean | null>(null);
    const [stateSwitch, setSwitch] = useState<boolean>(false);

    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    useEffect(() => {

        const handleAuth = async () => {
            const token : string | null = await AsyncStorage.getItem(env.pass_key);
            //await AsyncStorage.clear()
            

            if(token == null || token == undefined){                
                setVerify(false);
            } else {
                const user_data = await fetchAccount(token,"0","5");

                setUser(user_data);

                setVerify(true);
            }
        }

        handleAuth();
    }, [stateSwitch]);

    const refreshUser = useCallback((user : UserData) => {
        setUser(user);
        setSwitch(prev => !prev); // Alterna o estado para forçar o recarregamento
    }, []);

    if (stateVerify === null) {
        return(
            <View style={styles.container}>
                <ActivityIndicator size={50} color={colorScheme == 'dark' ? Colors.dark.tint : Colors.light.tint}/>
            </View>
        )
    }

    if (stateVerify === false) {
        return (
            <AuthContext.Provider value={stateUser}>
                <Begin onRegister={refreshUser} />
            </AuthContext.Provider>
        );
    }

    if (stateVerify === true) {
        return (
            <AuthContext.Provider value={stateUser}>
                <Dashboard/>
            </AuthContext.Provider>
        );
    }

    return null;
}
