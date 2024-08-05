import { Text, View, StyleSheet, Image,ActivityIndicator } from "react-native";
import { useRouter } from 'expo-router';
import UserInteractions from "@/components/UserInteractions";
import { useColorScheme } from '@/components/useColorScheme';
import IconWrapper from "@/components/IconWrapper";
import { useUserContext } from "../app/AuthContext";
import IndexButton from "@/components/layout/IndexButton";
import Colors from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useState, useEffect } from 'react';

export default function Dashboard() {

    const router = useRouter();
    const colorScheme = useColorScheme();

    const tips = [
        { text: "Take deep breaths and count to ten.", image: require('@/assets/images/breathing.jpg') },
        { text: "Go for a walk to clear your mind.", image: require('@/assets/images/walking.jpg') },
        { text: "Practice mindfulness meditation.", image: require('@/assets/images/meditation.jpg') },
        { text: "Talk to a friend or family member.", image: require('@/assets/images/talking.jpg') },
        { text: "Listen to your favorite music.", image: require('@/assets/images/music.jpg') },
        { text: "Write down your thoughts in a journal.", image: require('@/assets/images/journal.jpg') },
        { text: "Engage in a hobby you enjoy.", image: require('@/assets/images/hobby.jpg') },
        { text: "Exercise regularly to reduce stress.", image: require('@/assets/images/exercise.jpg') },
    ];

    const [randomTip, setRandomTip] = useState(tips[0]);

    useEffect(() => {
        setRandomTip(tips[Math.floor(Math.random() * tips.length)]);
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colorScheme == 'dark' ? Colors.dark.background : Colors.light.background,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        welcome: {
            fontWeight: 'bold',
            fontSize: 30,
            textAlign:'center',
        },
        serene: {
            color: colorScheme == "dark" ? Colors.dark.tint : Colors.light.tint,
            fontSize: 40,
            fontWeight: 'bold'
        },
        icon: {
            margin: 20,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8
        },
        welcomeContainer: {
            marginVertical: 40,
            alignItems: 'center'
        },
        tipContainer: {
            alignItems: 'center',
            marginTop: 20
        },
        tipText: {
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 10,
            color: colorScheme == 'dark' ? Colors.dark.text : Colors.light.text
        },
        tipImage: {
            width: 200,
            height: 200,
            borderRadius: 16,
            resizeMode: 'contain',
            objectFit: 'cover'
        }
    });

    const client = useUserContext();

    const loadingStyles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    if (client === null) {
        return(
            <View style={loadingStyles.container}>
                <ActivityIndicator size={'large'} color={colorScheme == 'dark' ? Colors.dark.tint : Colors.light.tint}/>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <View style={styles.welcomeContainer}>
                <Text style={styles.welcome}>Hello {client.user.name}!</Text>
                <IndexButton buttonStyle={{ marginBottom: 0 }} title="Create a new interaction" onPress={() => router.push('/form')}>
                    <IconWrapper IconComponent={FontAwesome6} name="heart-circle-plus" color="white" />
                </IndexButton>
            </View>

            <View style={styles.tipContainer}>
                <Text style={styles.tipText}>{randomTip.text}</Text>
                <Image source={randomTip.image} style={styles.tipImage} />
            </View>
            
        </View>
    );
}
