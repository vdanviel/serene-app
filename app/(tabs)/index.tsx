import { StyleSheet, Image } from 'react-native';

import { useRouter } from 'expo-router';
import IndexButton from "@/components/layout/IndexButton";

import Presentation from '@/components/Presentation';
import { Text, View } from '@/components/Themed';

import { ExternalLink } from '@/components/ExternalLink';

import IconWrappper from "@/components/IconWrapper";
import { FontAwesome6 } from "@expo/vector-icons";

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabOneScreen() {

  const router = useRouter();
  const colorScheme = useColorScheme();

  const goTouser = () => {

    return router.navigate("/user");

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

      <IndexButton title='Get started' onPress={goTouser}>

          <IconWrappper IconComponent={FontAwesome6} name='brain' color={"white"} size={30} />

      </IndexButton>

      <View style={styles.advice} >

          <IconWrappper IconComponent={FontAwesome6} name='user-doctor' color={Colors.default.background} size={30} />
          <ExternalLink href='https://www.nami.org/' style={styles.text}>It's important to relember that AI is not recommended to replace a profissional psycologists. Click to access NAMI (National Alliance on Mental Illness)</ExternalLink>

      </View>

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
    gap: 5,
    marginBottom: 20,
    marginTop: 10
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
    marginTop:30,
    padding: 10,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});
