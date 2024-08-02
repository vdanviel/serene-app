import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import BackButton from "@/components/layout/BackButton";
import { useColorScheme } from '@/components/useColorScheme';
import ConfirmExitModal from "@/components/ConfirmExitModal";

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



  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>

      <ConfirmExitModal visible={modalVisible} onClose={() => setModalVisible(false)}/>{/**/}

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name='form'  options={{ headerBackVisible: false, headerLeft: () => <BackButton onBack={confirmationExitForm}/>, headerTitle:"New Interaction", animation: 'flip' }} />
      </Stack>
    </ThemeProvider>
  );

}
