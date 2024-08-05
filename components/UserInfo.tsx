import React, {useState} from 'react';
import { View, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { MaterialIcons,MaterialCommunityIcons , FontAwesome } from '@expo/vector-icons';
import { useUserContext } from "../app/AuthContext";
import Colors from "@/constants/Colors";
import { useColorScheme } from '@/components/useColorScheme';
import IndexButton from "@/components/layout/IndexButton";
import IconWrapper from "@/components/IconWrapper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";

const UserProfile: React.FC= () => {

  const loadingStyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
  });

  const colorScheme = useColorScheme();
  const client = useUserContext();

  if (client === null) {
    return(
        <View style={loadingStyles.container}>
            <ActivityIndicator size={'large'} color={colorScheme == 'dark' ? Colors.dark.tint : Colors.light.tint}/>
        </View>
    )
  }

  const router = useRouter();
  const logoutAccount = async () => {
    
    await AsyncStorage.clear();

    router.push('/index');


  }

  const [stateModal, setModal] = useState<boolean>(false);

  return (
    <View style={styles.container}>

      <Modal animationType="fade" transparent={true} visible={stateModal}>
        <View onTouchStart={() => setModal(false)} style={styles.centeredView}>
          <View onTouchStart={(e) => e.stopPropagation()} style={styles.modalView}>
            <Text style={styles.modalTitle}>Are you sure you want restart yout Serene app?</Text>
            <Text style={styles.modalText}>You are going to lose all your progress.</Text>

            <View style={styles.buttonRow}>
                <IndexButton
                  title="Exit Form"
                  onPress={logoutAccount}
                  margin={0}
                  buttonStyle={styles.buttonSpacing}
                />
                <IndexButton title="Cancel" onPress={() => setModal(false)} buttonStyle={styles.buttonSpacing} margin={0} />
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <IconWrapper name="person" IconComponent={MaterialIcons} size={50} color="black" />
        <Text style={styles.name}>{client.user.name}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.tag}>
          <IconWrapper name="calendar" IconComponent={FontAwesome} size={20} color="black" />
          <Text style={styles.tagText}>{`Joined: ${new Date(client.user.created_at).toDateString()}`}</Text>
        </View>
        <View style={styles.tag}>
          <IconWrapper name="comments" IconComponent={FontAwesome} size={20} color="black" />
          <Text style={styles.tagText}>{`Interactions: ${client.user.total_interactions}`}</Text>
        </View>
        <View style={styles.tag}>
          <IconWrapper name="question" IconComponent={FontAwesome} size={20} color="black" />
          <Text style={styles.tagText}>{`Answers: ${client.user.total_answers}`}</Text>
        </View>
        <View style={styles.tag}>
          <IconWrapper name="medkit" IconComponent={FontAwesome} size={20} color="black" />
          <Text style={styles.tagText}>{`Chances of Anxiety: ${client.user.chances_anxiety}%`}</Text>
        </View>
      </View>

      <Text style={{textAlign:'center'}}>
        The "anxiety odds" calculation displayed by my app is based on an algorithm that analyzes the number of positive anxiety diagnoses compared to negative ones. It is important to understand that this analysis is not an accurate clinical assessment of the user's anxiety.
      </Text>

      <IndexButton title='Restart your Serene' align='center' onPress={() => console.log('Logout')}>
        <IconWrapper name="restart" IconComponent={MaterialCommunityIcons} size={30} color="white" />
      </IndexButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  details: {
    marginBottom: 20,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.default.background,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  tagText: {
    color: '#000',
    marginLeft: 10,
    fontSize: 16,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
    fontSize: 16,
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:10
  },
  buttonSpacing: {
    marginHorizontal: 10,
  },
});

export default UserProfile;
