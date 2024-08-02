import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';
import { Button, View } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import IconWrapper from "@/components/IconWrapper";
import { FontAwesome6 } from "@expo/vector-icons";
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import env from "../../env";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  const colorScheme = useColorScheme();
  const [stateUserLogged, setLogged] = useState<boolean | null>(null);

  useEffect(() => {
    
    setLogged(false);

    const isLogged = async () => {

      try {

        const token = await AsyncStorage.getItem(env.pass_key);
        

        if (token === null || token === undefined) {
          setLogged(false);
        } else {
          setLogged(true);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        setLogged(true);
      }
    };

    isLogged();
    

  }, []);


  if (stateUserLogged === null) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>

      <Tabs.Screen
        name="index"
        options={{
          headerTitle:"Welcome",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="user"
        options={{
          headerLeft: () => (
            <View style={{marginLeft:22}}>
              <IconWrapper
                IconComponent={FontAwesome6} 
                name="brain" 
                color={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint} 
                size={24} 
              />
            </View>
          ),
          headerRight: () => (
            stateUserLogged === true
            ? (
              <View style={{paddingRight:24}}>
                <Button color={Colors.default.tint}  title='restart'/>
              </View>
            ) 
            : null
          ),
          headerTitle: "Use Serene",
          headerTitleAllowFontScaling: true,
          headerTitleStyle: {
            color: colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint,
            fontWeight: 'bold'
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="brain" color={color} />,
        }}
      />

      <Tabs.Screen
        name="access"
        options={{
          headerTitle:"Restrict Access",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="door-closed" color={color} />,
        }}
      />

    </Tabs>
  );

}
