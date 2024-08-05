import UserInfo from "@/components/UserInfo";
import { View, StyleSheet } from "react-native";

export default function Profile() {
    const styles = StyleSheet.create({
        conteiner:{

        }
    });

    return (
        <View style={styles.conteiner}>
            <UserInfo/>
        </View>
        

    )

}