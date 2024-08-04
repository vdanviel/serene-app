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
import { fetchAccount, UserData } from "../reusable";

// Você pode explorar as famílias e ícones incorporados na web em https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [stateUser, setUser] = useState<UserData>(null);

  useEffect(() => {
    const isLogged = async () => {
      try {
        const token = await AsyncStorage.getItem(env.pass_key);
        const user = await fetchAccount(token, "0", "0");

        if (user && 'status' in user) {
          setUser(null);
        } else {
          setUser(user);
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        setUser(null);
      }
    };

    isLogged();
  }, []);

  // Função para definir as telas
  const renderTabs = () => {
    const tabs = [
      {
        name: 'index',
        options: {
          headerTitle: "Welcome",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        },
      },
      {
        name: 'user',
        options: {
          headerLeft: () => (
            <View style={{ marginLeft: 22 }}>
              <IconWrapper
                IconComponent={FontAwesome6}
                name="brain"
                color={colorScheme === "dark" ? Colors.dark.tint : Colors.light.tint}
                size={24}
              />
            </View>
          ),
          headerRight: () => (
            stateUser && (
              <View style={{ paddingRight: 24 }}>
                <Button color={Colors.default.tint} title='restart' />
              </View>
            )
          ),
          headerTitle: "Use Serene",
          headerTitleAllowFontScaling: true,
          headerTitleStyle: {
            color: colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint,
            fontWeight: 'bold',
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="brain" color={color} />,
        },
      },
    ];

    if (stateUser) {
      tabs.push({
        name: 'access',
        options: {
          headerTitle: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="door-closed" color={color} />,
        },
      });
    }

    return tabs;
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      {renderTabs().map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={tab.options}
        />
      ))}
    </Tabs>
  );
}
