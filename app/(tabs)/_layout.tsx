import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
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
      }}>

      <Tabs.Screen
        name="index"
        options={{
          headerTitle:"Use Serene",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="begin"
        options={{
          headerTitle:"Start",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="brain" color={color} />,
        }}
      />

      <Tabs.Screen
        name="access"
        options={{
          headerTitle:"Restrict Acess",
          tabBarShowLabel: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="door-closed" color={color} />,
        }}
      />

    </Tabs>

  );
}
