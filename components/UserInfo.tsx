import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useUserContext } from "../app/AuthContext";
import Colors from "@/constants/Colors";
import { useColorScheme } from '@/components/useColorScheme';


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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="person" size={50} color="black" />
        <Text style={styles.name}>{client.user.name}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.tag}>
          <FontAwesome name="calendar" size={20} color="white" />
          <Text style={styles.tagText}>{`Joined: ${new Date(client.user.chances_anxiety).toLocaleDateString()}`}</Text>
        </View>
        <View style={styles.tag}>
          <FontAwesome name="comments" size={20} color="white" />
          <Text style={styles.tagText}>{`Interactions: ${client.user.total_interactions}`}</Text>
        </View>
        <View style={styles.tag}>
          <FontAwesome name="question" size={20} color="white" />
          <Text style={styles.tagText}>{`Answers: ${client.user.total_answers}`}</Text>
        </View>
        <View style={styles.tag}>
          <FontAwesome name="medkit" size={20} color="white" />
          <Text style={styles.tagText}>{`Chances of Anxiety: ${client.user.chances_anxiety}%`}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Logout')}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
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
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  tagText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#e63946',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default UserProfile;
