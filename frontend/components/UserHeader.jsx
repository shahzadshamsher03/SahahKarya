import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BellIcon, MapPinIcon, ChevronDownIcon } from './Icons';
import { BrandTitle } from './BrandHeader';

export const UserHeader = ({ locationText = 'Indiranagar, Bengaluru' }) => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = StatusBar.currentHeight || 24;
  const topPadding =
    Platform.OS === 'android'
      ? statusBarHeight + 12
      : Math.max(insets.top ? 12 : 20, 12);

  return (
    <View style={[styles.headerContainer, { paddingTop: topPadding }]}>
      {/* Left brand & location */}
      <View style={styles.brandCol}>
        <View style={styles.brandRow}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <BrandTitle fontSize={20} />
        </View>

        <TouchableOpacity style={styles.locationRow} activeOpacity={0.7}>
          <MapPinIcon size={13} color="#FF5F00" strokeWidth={2.2} />
          <Text style={styles.locationText}>{locationText}</Text>
          <ChevronDownIcon size={12} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Right Notification Bell */}
      <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
        <BellIcon size={22} color="#1E293B" strokeWidth={2} />
        <View style={styles.unreadDot} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  brandCol: {
    gap: 3,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logo: {
    width: 26,
    height: 26,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 34,
  },
  locationText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 9,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5F00',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
});
