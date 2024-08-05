import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'expo-router';
import { Modal, Text, TextInput, View, StyleSheet, ScrollView, BackHandler, ActivityIndicator } from 'react-native';
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import IconWrapper from "@/components/IconWrapper";
import IndexButton from "@/components/layout/IndexButton";
import ConfirmExitModal from "@/components/ConfirmExitModal";
import { errorMesage } from "./alertMessages";
import { useUserContext } from "./AuthContext";
import env from "../env";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CardInterface {
    question: string | null,
    index: number,
    onAnswer: ([type] : string) => void
}

const Card = ({ question, onAnswer }: CardInterface) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [answer, setAnswer] = useState<string | null>(null);
    const textAreaRef = useRef<TextInput>(null)

    const router = useRouter();
    const colorScheme = useColorScheme();

    const cardStyles = StyleSheet.create({
        card: {
            marginBottom: 20,
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 10,
            elevation: 2,
        },
        question: {
            fontSize: 14,
            fontWeight: '400',
            textAlign: 'left',
            padding:12,
            paddingTop:0,
            color: "d0d0d0",
            height: 'auto'
        },
        modalContainer: {
            //flex: 1,
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',
            
            backgroundColor: '#fff',
            padding: 20,
            margin: 25,
            borderRadius: 10,

        },
        textArea: {
            height: '80%',
            width:'90%',
            marginBottom: 20
        }
    });
    
    useEffect(() => {

        setTimeout(() => {

            if (textAreaRef.current) {

                textAreaRef.current.focus();

            }

        }, 500);

    }, [modalVisible]);

    //abre modal
    const handleModalOpen = () => {

        setModalVisible(true);

    }

    //fecha modal
    const handleModalClose = () => setModalVisible(false);

    const handleChangeText = (text : string) => {

        onAnswer(text);

        setAnswer(text)

    }

    return (
        <View style={cardStyles.card}>

            <Text style={cardStyles.question}>{question}</Text>

            <IndexButton
                title={answer ? 'Done' : 'Provide an answer'}
                margin={0}
                bg={answer ? Colors.default.tint : 'transparent'}
                textColor={answer ? 'white' : Colors.default.tint}
                buttonStyle={answer ? {} :{borderColor:Colors.default.tint, borderWidth: 2}}
                onPress={handleModalOpen}
            >

                {
                    answer !== null 
                    ?
                    <IconWrapper name="check" IconComponent={FontAwesome5} color="white" size={20} /> 
                    : 
                    null
                }

            </IndexButton>

            <Modal
                animationType="fade"
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >

                    <View style={cardStyles.modalContainer}>

                        <TextInput
                            style={cardStyles.textArea}
                            multiline
                            ref={textAreaRef}
                            cursorColor={colorScheme == "dark" ? Colors.dark.tint : Colors.light.tint}
                            placeholder="Type your answer here..."
                            value={answer == null ? '' : answer}
                            onChangeText={text => handleChangeText(text)}
                            textAlignVertical="top"
                            selectionColor={colorScheme == "dark" ? Colors.dark.tint : Colors.light.tint}
                            maxLength={100}
                        />

                        <IndexButton
                            title={'Save'}
                            margin={0}
                            onPress={handleModalClose}
                            buttonStyle={{
                                zIndex:50,
                                width:'100%'
                            }}
                        />

                    </View>

            </Modal>
            
        </View>
    );
};

const Form = () => {

    const colorScheme = useColorScheme();
    const router = useRouter();
    
    const dialog: { question: string | null, answer: string | null }[] = [
        {
            question: null,
            answer: null 
        },
        {
            question: null,
            answer: null 
        },
        {
            question: null,
            answer: null 
        },
        {
            question: null,
            answer: null 
        },
        {
            question: null,
            answer: null 
        }
    ];

    const [stateDialog, setDialog] = useState(dialog);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [stateRegisterDiagIsLoading, setRegisterDiagIsLoading] = useState<boolean>(false);
    const [stateGenerateQuestionsIsLoading, setGenerateQuestionsIsLoading] = useState<boolean>(true);
    const [stateIsReleased, setIsReleased] = useState<boolean>(false);
    

    const createAnswerHandler = (index : number) => {//index - o numero q index (para saber o numero da pergunta..)

        return (text : string) => {//text - o texto (valor) da pergunta..

            //salva a resposta da pergunta atual...
            stateDialog[index].answer = text;
            setDialog(stateDialog);
            
            //verificar se todas as perguntas estão respondidas, se sim liberar o botão de gerar diagnostico..
            const incompleted = stateDialog.find(interaction => interaction.answer === null || interaction.answer === "");
            
            if (incompleted === undefined) {
                setIsReleased(true);    
            }else{
                setIsReleased(false);
            }

        };

    };

    useEffect(() => {

        //GERAR AS PERGUNTAS ALEATÓRIAS..
        const fetchRandomQuestions = async () => {

            const response = await fetch(env.url_fetch + "/serene/questions?len=" + dialog.length, {
                method: "GET",
                headers : {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }
            });
    
            const data = await response.json();

            data.forEach((apiQuestion : string, index : number) => {

                stateDialog[index].question = apiQuestion;

            });            

            setDialog(stateDialog);

            setGenerateQuestionsIsLoading(false);

        }

        fetchRandomQuestions();

        //MODAL QUANDO USUARIO TENTA SAIR DO FORMULÁRIO
        const backAction = () => {

            setModalVisible(true);

            return true;
        };
    
        BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

    }, []);

    const styles = StyleSheet.create({
          container: {
            padding: 20,
            margin: 20,
            paddingTop:0,
            marginTop:0
          }
    })

    const loadingStyles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
      });

    if (stateGenerateQuestionsIsLoading) {
        
        return(
            <View style={loadingStyles.container}>
                <ActivityIndicator size={'large'} color={colorScheme == 'dark' ? Colors.dark.tint : Colors.light.tint}/>
            </View>
        )

    }else{

        const registerDiagnostic = async () => {
            
            setRegisterDiagIsLoading(true);
    
            try {

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                
                const token = await AsyncStorage.getItem(env.pass_key);

                const payload = {
                    dialog: stateDialog.map(d => ({
                        question: d.question,
                        answer: d.answer,
                    })),
                    token: token
                };
        
                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(payload),
                };
        
                const response = await fetch(env.url_fetch + "/serene/result", requestOptions);
                const data = await response.json();

                if (response.ok) {
                    
                    router.push({
                        pathname: '/diagnostic',
                        params: {
                            description: data.description,
                            result: data.result
                        },
                    });
    
                } else {
                    throw new Error(data.message || 'Failed to register diagnostic');
                }
        
            } catch (error) {

                errorMesage(error, () => {});
                console.error(error);

            }
    
            setRegisterDiagIsLoading(false);
    
        };

        return (
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={styles.container}>{/*keyboardShouldPersistTaps - https://reactnative.dev/docs/scrollview#keyboardshouldpersisttaps* (usado para quando o usuario clicar em "Save do Card>Modal>IndexButton ele funcionar pois teclado não abaixa")*/}

                <ConfirmExitModal visible={modalVisible} onClose={() => setModalVisible(false)}/>

                <Text style={{textAlign:'center', padding:20}}>
                    To ensure you get the most accurate and realistic response possible from my application, it is essential that you complete the form with complete transparency and honesty.
                </Text>

                {
                    stateDialog.map((item, index) => (
                        <Card key={index} question={item.question} index={index} onAnswer={createAnswerHandler(index)} />
                    ))
                }

                <IndexButton align="center" activate={stateIsReleased} buttonStyle={{marginBottom:40, margin:0}} title={stateRegisterDiagIsLoading ? "" : "Generete your diagnostic"} onPress={registerDiagnostic}>

                    
                    {
                        stateRegisterDiagIsLoading 
                        ?
                        <ActivityIndicator size={25} color={'white'}/>
                        :
                        <IconWrapper name="stethoscope" IconComponent={FontAwesome5} color="white" size={25} />
                    }
                    

                </IndexButton>

            </ScrollView>
        );

    }
};

export default Form;
