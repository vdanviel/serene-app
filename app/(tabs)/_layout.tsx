import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs, Stack, useRouter } from 'expo-router';
import { Button, View, ActivityIndicator } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import IconWrapper from "@/components/IconWrapper";
import { FontAwesome6,FontAwesome } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import env from '../../env'

// Você pode explorar as famílias de ícones e ícones integrados na web em https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >

      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {display: 'none'},//oculta tab bar no começo
          tabBarButton: () => null, // Oculta o ícone da tab
          unmountOnBlur: true, // Exemplo de outra opção que você pode ter
        }}
      />

      <Tabs.Screen
        name="main"
        options={{
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
          headerTitle: "Use Serene",
          headerTitleAllowFontScaling: true,
          headerTitleStyle: {
            color: colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint,
            fontWeight: 'bold'
          },
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <IconWrapper IconComponent={FontAwesome6} name="brain" color={color} />,
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          headerTitle: "History",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <IconWrapper IconComponent={FontAwesome} name="history" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Your profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <IconWrapper IconComponent={FontAwesome6} name="user" color={color} />,
        }}
      />



    </Tabs>
  );

}