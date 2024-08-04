import { useColorScheme } from '@/components/useColorScheme';
import IconWrapper from "@/components/IconWrapper";
import Colors from "@/constants/Colors";
import { View, StyleSheet, Text } from "react-native";
import { useUserContext } from "../app/AuthContext";
import { Ionicons, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

export default function UserInfo() {
    
    const client = useUserContext();

    const styles = StyleSheet.create({
        conteiner: {
            borderColor: Colors.default.background,
            borderRadius: 16,
            margin: 15,
            marginTop:30,
            padding: 10,
            borderWidth: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          },
          dataConteiner:{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row'
          },
          textDataStyle:{
            
          },
          info:{
            display: 'flex',
            flexDirection: 'row'
          }
    })

    return (
        <View style={styles.conteiner}>

            <Text>
                Remember that this data cannot replace specialists or thier services.
            </Text>

            <View style={styles.info}>
                <View style={styles.dataConteiner}>
                    <IconWrapper IconComponent={Ionicons} name='chatbubble-ellipses'/>
                    <Text style={styles.textDataStyle}>{client.user.total_interactions}</Text>
                </View>

                <View style={styles.dataConteiner}>
                    <IconWrapper IconComponent={MaterialCommunityIcons} name='message-question'/>
                    <Text style={styles.textDataStyle}>{client.user.total_answers}</Text>
                </View>

                <View style={styles.dataConteiner}>
                    <IconWrapper IconComponent={AntDesign} name='frown'/>
                    <Text style={styles.textDataStyle}>{client.user.chances_anxiety}%</Text>
                </View>
            </View>


        </View>
    )

}