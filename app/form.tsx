import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'expo-router';
import { Modal, Text, TextInput, View, StyleSheet, ScrollView, BackHandler } from 'react-native';
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import IconWrapper from "@/components/IconWrapper";
import IndexButton from "@/components/layout/IndexButton";
import ConfirmExitModal from "@/components/ConfirmExitModal";

interface CardInterface {
    question: string,
    index: number,
    onAnswer: ([type] : string) => void
}

const Card = ({ question, index, onAnswer }: CardInterface) => {

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
            flex: 1,
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center',

        },
        modalContent: {
            width:'100%',
            height:'100%',
            backgroundColor: '#fff',
            padding: 20,
            margin: 25,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center'
          },
        textArea: {
            height: '80%',
            marginBottom: 20
        }
    });
    
    useEffect(() => {

        if (textAreaRef.current) {
            
            textAreaRef.current.focus();
            
        }

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
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleModalClose}
            >

                <View onTouchStart={handleModalClose} style={cardStyles.modalContainer}>

                    <View onTouchStart={(e) => e.stopPropagation()} style={cardStyles.modalContent}>

                        <TextInput
                            style={cardStyles.textArea}                        
                            autoFocus={true}
                            focusable={true}
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
                        />

                    </View>

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
    const [modalVisible, setModalVisible] = useState(false);

    const storeAnswers = (index : number, text : string) => {

        //salva a resposta da pergunta atual...
        stateAnswers[index].answer = text;
        setAnswers(stateAnswers);

    };

    const createAnswerHandler = (index : number) => {//index - o numero q index (para saber o numero da pergunta..)

        return (text : string) => {//text - o texto (valor) da pergunta..

            storeAnswers(index, text);//ele manda para uma função que armanena esses dados de maneira reativa..

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

    return (
        <ScrollView style={styles.container}>

            <ConfirmExitModal visible={modalVisible} onClose={() => setModalVisible(false)}/>

            {dialog.map((item, index) => (
                <Card key={index} question={item.question} index={index} onAnswer={createAnswerHandler(index)} />
            ))}
        
            <IndexButton buttonStyle={{marginBottom:40, margin:0}} title="Generete your diagnostic" onPress={() => {}}>

                <IconWrapper name="stethoscope" IconComponent={FontAwesome} color="white" size={25} /> 

            </IndexButton>

        </ScrollView>
    );
};

export default Form;
