import { StyleSheet, Image } from 'react-native';

import { useRouter } from 'expo-router';
import { Button } from "react-native";

import Presentation from '@/components/Presentation';
import { Text, View } from '@/components/Themed';

import IconWrappper from "@/components/IconWrapper";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabOneScreen() {

  const router = useRouter();
  const colorScheme = useColorScheme();

  const goToBegin = () => {

    return router.navigate("/begin");

  }

  return (
    <View style={styles.container}>
      <Presentation/>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text style={styles.text}>Serene is a psycologist AI that guess if you have ansiety based on a quickmade form. It's develop with <Text style={styles.italic}>React Native</Text> / <Text style={styles.italic}>Symfony</Text> (as API) and <Text style={styles.italic}>Postgre</Text> as its Database.</Text>

      <View style={styles.techs}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/images/react-original.png')}
        />
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/images/symfony-original.png')}
        />
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/images/postgresql-plain.png')}
        />
      </View>

      <View style={styles.advice}>
        <IconWrappper IconComponent={MaterialCommunityIcons} name='doctor' color={Colors.default.background} size={30} />
        <Text style={styles.text}>It's important to relember that AI is not recommended to replace a profissional psycologists.</Text>
      </View>
    
      <Button
        title="Get Started"
        onPress={goToBegin}
        color={colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  techs:{
    flexDirection: 'row',
    display: 'flex',
    gap: 5
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    padding:10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  italic: {
    fontStyle: 'italic'
  },
  tinyLogo: {
    width: 25,
    height: 25,
    padding: 10
  },
  advice: {
    borderColor: Colors.default.background,
    borderRadius: 16,
    margin: 15,
    padding: 10,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center'
  }
});
