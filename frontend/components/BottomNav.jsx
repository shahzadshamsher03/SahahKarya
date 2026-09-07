import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import {
  HomeIcon,
  CompassIcon,
  DocumentIcon,
  UserIcon,
} from './Icons';

export const BottomNav = ({ activeTab = 'home' }) => {
  const router = useRouter();
  const pathname = usePathname();

  const currentTab =
    activeTab ||
    (pathname.includes('/map')
      ? 'map'
      : pathname.includes('/bookings')
      ? 'bookings'
      : pathname.includes('/profile')
      ? 'profile'
      : 'home');

  const tabs = [
    { key: 'home', route: '/home', icon: HomeIcon },
    { key: 'map', route: '/map', icon: CompassIcon },
    { key: 'bookings', route: '/bookings', icon: DocumentIcon },
    { key: 'profile', route: '/profile', icon: UserIcon },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;
          const IconComponent = tab.icon;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => router.push(tab.route)}
              activeOpacity={0.8}
            >
              <IconComponent
                size={22}
                color={isActive ? '#111827' : '#94A3B8'}
                strokeWidth={isActive ? 2.4 : 2}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 999,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    maxWidth: 360,
    height: 64,
    backgroundColor: '#191E29',
    borderRadius: 32,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  tabButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabButton: {
    backgroundColor: '#F59E0B', // Golden brand orange matching screenshot
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
});
