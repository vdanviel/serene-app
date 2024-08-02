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

interface CardInterface {
    question: string,
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
                title={answer ? 'Done' : 'Provide a answer'}
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


const dialog: { question: string, answer: string | null }[] = [
    {
        question: "In the past six months, have you often felt worried or anxious about various issues and everyday situations?",
        answer: null 
    },
    {
        question: "Do you have difficulty controlling your worries or feel overwhelmed by them, how do you feel about them?",
        answer: null 
    },
    {
        question: "Have you experienced physical symptoms of anxiety, such as palpitations, trembling, excessive sweating, dizziness, or shortness of breath, even without an apparent reason?",
        answer: null 
    },
    {
        question: "Do you avoid situations or activities that you fear might trigger anxiety or panic?",
        answer: null 
    },
    {
        question: "Does your anxiety interfere with your ability to work, study, or perform daily tasks?",
        answer: null 
    }
];

const Form = () => {

    const colorScheme = useColorScheme();
    const router = useRouter();
    

    const [stateAnswers, setAnswers] = useState(dialog);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [stateisLoading, setIsLoading] = useState<boolean>(false);
    const [stateIsReleased, setIsReleased] = useState<boolean>(false);


    const createAnswerHandler = (index : number) => {//index - o numero q index (para saber o numero da pergunta..)

        return (text : string) => {//text - o texto (valor) da pergunta..

            //salva a resposta da pergunta atual...
            stateAnswers[index].answer = text;
            setAnswers(stateAnswers);
            
            console.log(stateAnswers);
            
            //verificar se todas as perguntas estão respondidas, se sim liberar o botão de gerar diagnostico..
            const incompleted = stateAnswers.find(interaction => interaction.answer === null || interaction.answer === "");

            console.log(incompleted);
            

            if (incompleted === undefined) {
                setIsReleased(true);    
            }else{
                setIsReleased(false);
            }

        };

    };

    useEffect(() => {

        const backAction = () => {

            setModalVisible(true);

            return true;
        };
    
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );
    
        return () => backHandler.remove();

    }, []);

    const styles = StyleSheet.create({
          container: {
            flex: 1,
            padding: 20,
            margin: 20
          }
    })

    const registerDiagnostic = async () => {
        const user = useUserContext();
        
        setIsLoading(true);

        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            const payload = {
                dialog: dialog.map(d => ({
                    question: d.question,
                    answer: d.answer,
                })),
                token: user.user.token,
            };
    
            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(payload),
            };
    
            const response = await fetch(env.pass_key, requestOptions);
            const result = await response.json();
    
            if (response.ok) {
                
                router.push({
                    pathname: '/diagnostic',
                    params: {
                        markdownString: result.diagnostic,
                    },
                });

            } else {
                throw new Error(result.message || 'Failed to register diagnostic');
            }
    
        } catch (error) {
            errorMesage(error);
            console.error(error);
        }

        setIsLoading(false);

    };

    return (
        <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>{/*keyboardShouldPersistTaps - https://reactnative.dev/docs/scrollview#keyboardshouldpersisttaps* (usado para quando o usuario clicar em "Save do Card>Modal>IndexButton ele funcionar pois teclado não abaixa")*/}

            <ConfirmExitModal visible={modalVisible} onClose={() => setModalVisible(false)}/>

            {dialog.map((item, index) => (
                <Card key={index} question={item.question} index={index} onAnswer={createAnswerHandler(index)} />
            ))}
        
            <IndexButton align="center" activate={stateIsReleased} buttonStyle={{marginBottom:40, margin:0}} title={stateisLoading ? "" : "Generete your diagnostic"} onPress={registerDiagnostic}>

                
                {
                    stateisLoading 
                    ?
                    <ActivityIndicator size={25} color={'white'}/>
                    :
                    <IconWrapper name="stethoscope" IconComponent={FontAwesome5} color="white" size={25} />
                }
                

            </IndexButton>

        </ScrollView>
    );
};

export default Form;
