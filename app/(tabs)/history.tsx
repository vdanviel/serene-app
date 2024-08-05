import UserInteractions from "@/components/UserInteractions";
import { View, StyleSheet } from "react-native";

export default function History() {
    const styles = StyleSheet.create({
        conteiner:{
            flex: 1,
            height: '100%'
        }
    });

    return (

        <View style={styles.conteiner}>
            <UserInteractions/>
        </View>

    )

}