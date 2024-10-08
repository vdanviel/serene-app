import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import BackButton from "@/components/layout/BackButton";
import { useColorScheme } from '@/components/useColorScheme';
import ConfirmExitModal from "@/components/ConfirmExitModal";
import {AuthProvider } from "./AuthContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
  
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const confirmationExitForm = () => {

    setModalVisible(true);

  }

  /*
      CONTEXT EM REACT:
      é uma maneira de acessar dados sem precisar ficar passando de props em props.
      vc define um componente, e TODOS os filhos desse componente tem acesso a esse dado.
      acesse app/AuthController.ts
  */

  //para acessar essas paginas o usuário precisa estar logado..
  return (
    <AuthProvider>{/*<AuthContext.Provider value={stateUser}> - está definindo o provedor de onde vamos consumir os dados, que no caso é o valor de "value", que no caso é o fetch dos dados do user..*/}
        <ConfirmExitModal visible={modalVisible} onClose={() => setModalVisible(false)}/>{/*modal de confirmação de saida do formulário de perguntas, quando aperta no butão back do header*/}

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="interac" options={{ headerShown: true, headerTitle: 'Interaction' }} />
          <Stack.Screen name="diagnostic" options={{ headerShown: false, headerTitle:"Your diagnostic", animation: 'flip' }} />
          <Stack.Screen name='form' options={{ headerShown:true, headerBackVisible: false, headerLeft: () => <BackButton onBack={confirmationExitForm}/>, headerTitle:"New Interaction", animation: 'flip' }} />
        </Stack>

    </AuthProvider>
  );

}
