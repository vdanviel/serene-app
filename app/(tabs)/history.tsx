import UserInteractions from "@/components/UserInteractions";
import { View, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export default function History() {
    const styles = StyleSheet.create({
        conteiner:{
            flex: 1,
            backgroundColor:Colors.light.background
        }
    });

    return (

        <View style={styles.conteiner}>
            <UserInteractions/>
        </View>

    )

}