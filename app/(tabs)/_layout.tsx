import HapticTab from '@/app/components/HapticTab';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

// valid icon names explicit declearation
type TabIconName = keyof typeof MaterialCommunityIcons.glyphMap;

type TabItem = {
  name: string;
  title: string;
  icon: TabIconName;
  tabBarBage?: number
};

const tabItems: TabItem[] = [
  {
    name: 'index',
    title: 'Home',
    icon: 'home',
  },
  {
    name: 'cart',
    title: 'Cart',
    icon: 'cart-outline',
    tabBarBage: 1
  },
  {
    name: 'favorites',
    title: 'Favorites',
    icon: 'heart-outline',
  },
  {
    name: 'profile',
    title: 'Profile',
    icon: 'account-circle-outline',
  },
];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => {
        const currentTab = tabItems.find(tab => tab.name === route.name);

        return {
          headerTitle: 'Delivery Address',
          headerStyle: {
            backgroundColor: '#0f172a',
          },
          headerTintColor: '#f8fafc',

          tabBarShowLabel: true,
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: '#0f172a',
          tabBarInactiveTintColor: '#94a3b8',
          tabBarButton: HapticTab,

          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            tabBarLabelStyle: {
            color: '#60B5FF'
            },
          },
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 0.3,
            borderColor: '#e2e8f0',
            height: 80,
            paddingBottom: 5,
            elevation: 0,
          },

          tabBarIcon: ({ color, focused }) => {
            const iconName: TabIconName = currentTab?.icon || 'alert-circle-outline';

            return (
              <View
                style={{
                  width: 40,
                  height: 40,
                  // marginVertical: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: focused ? '#60B5FF' : 'transparent',
                  padding: 2,
                  paddingBottom: 4,
                  borderRadius: 30,
                }}
              >
                <MaterialCommunityIcons name={iconName} size={26} color={color} />
              </View>
            );
          },
        };
      }}
    >
      {tabItems.map(tab => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarBadge: tab.tabBarBage
          }}
        />
      ))}
    </Tabs>
  );
}
