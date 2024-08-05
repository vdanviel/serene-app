import { StyleSheet, View, Text, Image } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import IconWrapper from "@/components/IconWrapper";
import {ExternalLink }from "@/components/ExternalLink";
import { FontAwesome5 } from "@expo/vector-icons";

interface Me {
    name: string;
    date: string;
    project: string;
    github: string;
    repo: string;
    link: string;
}

const vdanviel: Me = {
    name: "vdanviel",
    project: "serene",
    github: "https://github.com/vdanviel",
    date: "29/07/2024",
    repo: "https://github.com/vdanviel/serene-app",
    link: "https://vdanviel.github.io/"
};

export default function Presentation() {

    const colorScheme = useColorScheme();

    const styles = StyleSheet.create({
        container: {
            backgroundColor: Colors.default.background,
            padding: 15,
        },
        link: {
            color: colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint
        },
        separator: {
            marginVertical: 30,
            height: 1,
            width: '80%',
        },
        text: {
        fontSize: 15,
        textAlign: 'center',
        padding:10
        },
        tinyLogo: {
        width: 25,
        height: 25,
        padding: 10
        },
        techs:{
        flexDirection: 'row',
        display: 'flex',
        gap: 5,
        marginBottom: 20,
        marginTop: 10,
        justifyContent: 'center'
        },
        descConteiner: {
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
        italic: {
        fontStyle: 'italic'
        },

        advice: {
        borderColor: Colors.default.background,
        borderRadius: 16,
        margin: 15,
        marginTop:30,
        padding: 10,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
        }
    });

    return (
        <View>

            <View style={styles.advice} >

                <IconWrapper IconComponent={FontAwesome5} name='brain' color={Colors.default.tint} size={30} />
                <ExternalLink href='https://vdanviel.github.io/' style={styles.text}>Serene is a psycologist AI that guess if you have ansiety based on a quickmade form. It's develop with <Text style={styles.italic}>React Native</Text> / <Text style={styles.italic}>Symfony</Text> (as API) and <Text style={styles.italic}>Postgre</Text> as its Database. Made by <Text style={styles.italic}>vdanviel</Text>. Click to see more about me!</ExternalLink>

            </View>
            
            <View style={styles.techs}>
                <Image
                style={styles.tinyLogo}
                source={require('../assets/images/react-original.png')}
                />
                <Image
                style={styles.tinyLogo}
                source={require('../assets/images/symfony-original.png')}
                />
                <Image
                style={styles.tinyLogo}
                source={require('../assets/images/postgresql-plain.png')}
                />
            </View>

        </View>
    );
}
