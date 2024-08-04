import { useEffect, useState } from "react";
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { Text, View } from '@/components/Themed';
import { StyleSheet, Pressable ,FlatList, Modal, ActivityIndicator} from "react-native";
import { useRouter } from 'expo-router';
import IconWrapper from "@/components/IconWrapper";
import { FontAwesome6, FontAwesome5, MaterialIcons  } from "@expo/vector-icons";
import { Interaction } from "../app/reusable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from "../env";
import IndexButton from "@/components/layout/IndexButton";
import { fetchDiags } from "../app/reusable";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function UserInteractions() {
    
    const router = useRouter();
    const colorScheme = useColorScheme();

    const interactStyle = StyleSheet.create({
        scroll: {
            margin: 12,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        modalConteiner: {
            margin: 20
        },
        containerLoading: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colorScheme === 'dark' ? Colors.dark.background : Colors.light.background,
        },
        card: {
            backgroundColor: Colors.light.background,
            borderRadius: 10,
            marginVertical: 10,
            elevation: 2,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        cardInModal: {
            backgroundColor: Colors.light.background,
            borderRadius: 10,
            margin: 10,
            elevation: 2,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        diagText: {
            fontWeight: 'bold',
            fontSize: 18,
            fontStyle: 'italic',
        },
        questionSmallText: {
            fontSize: 10,
            color: colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint,
        },
        advice: {
            borderColor: Colors.default.background,
            borderRadius: 16,
            margin: 15,
            marginTop: 30,
            padding: 20,
            borderWidth: 1,
            alignItems: 'center',
            gap: 10,
        },
        registerTime: {
            flexDirection: 'row',
            marginVertical: 10,
            alignItems: 'center',
            gap: 5,
        },
        icon: {
            justifyContent: 'center',
        },
        header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            paddingHorizontal: 15,
        },
        textHeader: {
            fontWeight: 'bold',
            fontSize: 24,
            marginBottom: 40,
        },
        list:{
            padding:10
        },
        initialConteiner:{
            marginHorizontal: 10,
            marginBottom: 20
        },
        textInit: {
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center',
            color: Colors.default.background
        }
    });

    const [stateInteracs, setInteracs] = useState<Interaction[]>([]);
    const [stateInitialInteracs, setInitialInteracs] = useState<Interaction[]>([]);
    const [stateModalInteracs, setModalInteracs] = useState<boolean>(false);
    const [stateOffset, setOffset] = useState<number>(0);
    const [stateIsLoading, setIsLoading] = useState<boolean>(true);


    //fetch dos interacs do user..
    const loadMoreDialogs = async () => {

        const token : string | null = await AsyncStorage.getItem(env.pass_key);

        setOffset(stateOffset + 5);

        const interacts = await fetchDiags(token, stateOffset, 5);

        if (interacts.length > 0) {
            
            const newData = stateInteracs.concat(interacts);

            setInteracs(newData);

        }
    
    }

    useEffect(() => {

        const initialData = async () => {

            //carrgando..
            setIsLoading(true);

            //definindo primeiros 5 cards q aparecem fora do modal..
            const token : string | null = await AsyncStorage.getItem(env.pass_key);
            const interacts = await fetchDiags(token, 0, 5);
            setInitialInteracs(interacts);

            //definindo os dados do modaal.
            await loadMoreDialogs();

            //qnd termnar o processo deixa de carregar..
            setIsLoading(false);

        }

        initialData();

    }, [])


    if (stateIsLoading == true) {

        return(
            <View style={interactStyle.containerLoading}>
                <ActivityIndicator size={50} color={colorScheme == 'dark' ? Colors.dark.tint : Colors.light.tint}/>
            </View>
        )

    }else{

        if (stateInteracs.length > 0) {
            
            const dates: string[] = stateInteracs.map(interaction =>
                new Date(interaction.created_at).toLocaleString()
            );

            return (
                <View style={interactStyle.scroll}>

                    <Modal
                        visible={stateModalInteracs}
                        animationType={'fade'}
                        onRequestClose={() => setModalInteracs(false)}
                    >
                        <View style={interactStyle.modalConteiner}>

                            <View style={interactStyle.header}>

                                <Text  style={interactStyle.textHeader}>Interactions</Text>
                                
                                <Pressable android_ripple={{color: "#ddd", borderless: true, foreground: true}} onPress={() => setModalInteracs(false)}>
                                    <IconWrapper name="window-close" IconComponent={MaterialCommunityIcons} size={32}/>
                                </Pressable>

                            </View>
                            
                            <FlatList
                                renderItem={({ item, index }) => 
                                    <Pressable android_ripple={{color: "#ffffff"}} style={interactStyle.cardInModal}>
                                        <View>
                                            <Text style={interactStyle.diagText}>"{item.diagnostic.length > 28 ? item.diagnostic.substring(0, item.diagnostic.length / 2) + "..." : item.diagnostic}"</Text>
                                            <View style={interactStyle.registerTime}>
                                                <IconWrapper name="stopwatch" IconComponent={FontAwesome6} size={10} />
                                                <Text>{dates[index]}</Text>
                                            </View>
                                            <Text>Press to see details</Text>
                                        </View>
                                        <View style={interactStyle.icon}>
                                            <IconWrapper name="comment-medical" IconComponent={FontAwesome6} size={35} color={Colors.default.tint} />
                                        </View>
                                    </Pressable>
                                }
                                data={stateInteracs}
                                onEndReached={loadMoreDialogs}
                                style={interactStyle.list}
                            />
                        </View>


                    </Modal>

                    <View style={interactStyle.initialConteiner}>
                        <Text  style={interactStyle.textInit}>History</Text>
                        {
                            stateInitialInteracs.map((item, index) => (
                                <Pressable android_ripple={{color: "#ffffff"}} key={index} style={[interactStyle.card, interactStyle.card]}>
                                    <View>
                                        <Text style={interactStyle.diagText}>
                                            {item.diagnostic.length > 28 ? item.diagnostic.substring(0, item.diagnostic.length / 2) + "..." : item.diagnostic}
                                        </Text>
                                        <View style={interactStyle.registerTime}>
                                            <IconWrapper name="stopwatch" IconComponent={FontAwesome6} size={10} />
                                            <Text>{dates[index]}</Text>
                                        </View>
                                        <Text>Press to see details</Text>
                                    </View>
                                    <View style={interactStyle.icon}>
                                        <IconWrapper name="comment-medical" IconComponent={FontAwesome6} size={35} color={Colors.default.tint} />
                                    </View>
                                </Pressable>
                            ))
                        }
                    </View>

                    <IndexButton 
                        title="See interactions"
                        onPress={() => setModalInteracs(true)}
                        margin={0}
                        align="center"
                        buttonStyle={{width:'46%', padding:5}}
                    >
                        <IconWrapper name="checklist" IconComponent={MaterialIcons } size={30} color={"white"} />
                    </IndexButton>

                </View>
            );

        }else{

            return (
                <View style={interactStyle.advice}>
                    <IconWrapper IconComponent={FontAwesome6} name="circle-minus" color={Colors.default.background} size={20} />
                    <Text style={{ textAlign: "center" }}>You have no interactions yet! Create one top button.</Text>
                </View>
            );

        }

    }

}
