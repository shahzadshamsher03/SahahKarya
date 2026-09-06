import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from './Icons';

export const BrandTitle = ({ fontSize = 26, style }) => (
  <View style={[styles.brandTitleRow, style]}>
    <Text style={[styles.brandSahah, { fontSize }]}>Sahah</Text>
    <Text style={[styles.brandKarya, { fontSize }]}>Karya</Text>
  </View>
);

export const HeaderNav = ({ onBack, title }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  const statusBarHeight = StatusBar.currentHeight || 24;
  const topPadding =
    Platform.OS === 'android'
      ? statusBarHeight + 14
      : Math.max(insets.top ? 14 : 20, 14);

  return (
    <View style={[styles.headerContainer, { paddingTop: topPadding }]}>
      <TouchableOpacity
        onPress={handleBack}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <ArrowLeftIcon size={20} color="#1E293B" />
      </TouchableOpacity>

      <View style={styles.headerCenter}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.headerMiniLogo}
          resizeMode="contain"
        />
        <BrandTitle fontSize={20} />
      </View>

      {/* Spacer to keep center balanced */}
      <View style={styles.headerSpacer} />
    </View>
  );
};

const styles = StyleSheet.create({
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandSahah: {
    color: '#131938',
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  brandKarya: {
    color: '#FF5F00',
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerMiniLogo: {
    width: 28,
    height: 28,
  },
  headerSpacer: {
    width: 44,
  },
});
