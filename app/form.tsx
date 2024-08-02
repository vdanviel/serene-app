import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from 'expo-router';
import { Modal, Text, TextInput, Pressable, View, StyleSheet, Button, ScrollView, SafeAreaView, Alert, BackHandler } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import IconWrapper from "@/components/IconWrapper";
import IndexButton from "@/components/layout/IndexButton";
import ConfirmExitModal from "@/components/ConfirmExitModal";

interface CardInterface {
    question: string,
    onAnswer: ([type] : string) => void
}

const Card = ({ question, onAnswer }: CardInterface) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [answer, setAnswer] = useState('');
    const textAreaRef = useRef()

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
            fontSize: 16,
            marginBottom: 10,
        },
        button: {
            backgroundColor: Colors.default.background,
            padding: 10,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
        },
        buttonText: {
            color: colorScheme == "dark" ? "#ffffff" : "#000",
            fontSize: 16,
            fontWeight: 'bold',
            marginRight: 10
        },
        modalContainer: {
            flex: 1,
            zIndex: 10,
            justifyContent: 'center',
            alignItems: 'center'
        },
        modalContent: {
            zIndex: 30,
            width: '80%',
            height: '65%',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: '#fff',
            padding: 20,
            margin: 25,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 10
          },
        textArea: {
            height: '80%',
            marginBottom: 20,
            padding: 1
        },
        saveButton: {
            backgroundColor: colorScheme == "dark" ? Colors.dark.tint : Colors.light.tint,
            padding: 10,
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        saveButtonText: {
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 16,
            marginRight: 10,
        },
    });
  
    //abre modal
    const handleModalOpen = () => setModalVisible(true);

    //fecha modal
    const handleModalClose = () => setModalVisible(false);

    const handleChangeText = (text : string) => {

        onAnswer(text);

        setAnswer(text)

    }

    return (
        <View style={cardStyles.card}>

            <Text style={cardStyles.question}>{question}</Text>

            <Pressable
                style={cardStyles.button}
                onPress={handleModalOpen}
            >

                <Text style={cardStyles.buttonText}>
                    {answer ? 'Done' : 'Write Answer'}
                </Text>

                {answer && <IconWrapper name="check" IconComponent={FontAwesome5} color="black" size={20} />}

            </Pressable>

            <Modal
                animationType="slide"
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
                            cursorColor={colorScheme == "dark" ? Colors.dark.tint : Colors.light.tint}
                            verticalAlign="top"
                            textAlign="left"
                            placeholder="Type your answer here..."
                            value={answer}
                            onChangeText={text => handleChangeText(text)}
                        />

                        <Pressable
                            style={cardStyles.saveButton}
                            onPress={handleModalClose}
                        >

                            <Text style={cardStyles.saveButtonText}>
                                Save
                            </Text>

                        </Pressable>

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
        question: "Do you have difficulty controlling your worries or feel overwhelmed by them?",
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
                <Card key={index} question={item.question} onAnswer={createAnswerHandler(index)} />
            ))}

            <IndexButton buttonStyle={{marginBottom:40}} title="Generete your diagnostic" onPress={() => {}}>
            </IndexButton>



        </ScrollView>
    );
};

export default Form;
