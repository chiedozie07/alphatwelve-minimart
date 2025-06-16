import CustomTabBarButton from '@/atoms/buttons/CustomTabBarButton';
import { useCart } from '@/hooks/useCart';
import { useHaptic } from '@/hooks/useHaptic';
import { ALERT_ACTIONS } from '@/state/actions/alertActions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { TabIconName, TabItem } from '../../src/constants/dtos/common';


export default function TabLayout() {
  const { cart } = useCart();
  const haptic = useHaptic();

  // tab items definition
  const tabItems: TabItem[] = [
    { name: 'index', title: 'Home', icon: 'home' },
    { name: 'cart', title: 'Cart', icon: 'cart-outline', tabBarBadge: cart?.length === 0 ? undefined : cart?.length },
    { name: 'favorites', title: 'Favorites', icon: 'heart-outline' },
    { name: 'profile', title: 'Profile', icon: 'account-circle-outline' },
  ];

  return (
    <Tabs
      screenOptions={({ route }) => {
        const currentTab = tabItems.find((t) => t.name === route.name);
        return {
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelPosition: 'below-icon',
          tabBarActiveTintColor: '#60B5FF',
          tabBarInactiveTintColor: '#374151',
          // tabBarButton: () => haptic({style: ALERT_ACTIONS.HAPTIC.STYLE.IMPACT, type: ALERT_ACTIONS.HAPTIC.TYPE.HEAVY}),
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginBottom: Platform.OS === 'ios' ? 4 : 2,
          },
          // tab bar container styling
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            height: 62,
            paddingBottom: Platform.OS === 'ios' ? 10 : 5,
            marginBottom: Platform.OS === 'ios' && 15,
            paddingTop: 5,
            elevation: 0,
          },
          // icon wrapper and the actual icon
          tabBarIcon: ({ color, focused }) => {
            const iconName: TabIconName = currentTab?.icon || 'alert-circle-outline';
            return (
              <View
                style={{
                  // width:  40,
                  // height: 40,
                  minWidth: 40,
                  padding: 6,
                  paddingBottom: 0,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: focused ? '#60B5FF' : 'transparent',
                }}
              >
                <MaterialCommunityIcons
                  name={iconName}
                  size={22}
                  color={focused ? '#FFFFFF' : color}
                />
              </View>
            );
          },
        };
      }}
    >
      {tabItems.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          listeners={{
            tabPress: () => {
              haptic({
                style: ALERT_ACTIONS.HAPTIC.STYLE.IMPACT,
                type: ALERT_ACTIONS.HAPTIC.TYPE.HEAVY,
              });
            },
          }}
          options={{
            title: tab.title,
            tabBarBadge: tab.tabBarBadge,
            tabBarHideOnKeyboard: false,
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
            tabBarBadgeStyle: {
              backgroundColor: '#3C4856',
              color: '#FFFFFF',
              fontSize: 10,
              minWidth: 16,
              height: 16,
              lineHeight: 16,
              paddingHorizontal: 4,
              top: -4,
              right: -10,
            },
          }}
        />
      ))}
    </Tabs>
  );
};