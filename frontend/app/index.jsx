import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BrandTitle } from '../components/BrandHeader';
import { ArrowRightIcon } from '../components/Icons';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Main Content Area */}
        <View style={styles.contentCenter}>
          {/* Logo Card with soft shadow */}
          <View style={styles.logoCard}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Brand Name */}
          <BrandTitle fontSize={34} style={styles.brandTitle} />

          {/* Tagline 1 */}
          <View style={styles.bulletRow}>
            <Text style={styles.bulletText}>Find</Text>
            <View style={styles.dot} />
            <Text style={styles.bulletText}>Book</Text>
            <View style={styles.dot} />
            <Text style={styles.bulletText}>Hire</Text>
          </View>

          {/* Tagline 2 */}
          <Text style={styles.subtitleTagline}>
            SKILLED WORKERS, AT YOUR DOORSTEP
          </Text>
        </View>

        {/* Bottom Action Area */}
        <View style={styles.bottomArea}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.88}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
            <View style={styles.arrowContainer}>
              <ArrowRightIcon size={20} color="#FF5F00" strokeWidth={2.6} />
            </View>
          </TouchableOpacity>

          <Text style={styles.versionFooter}>
            VERSION 2.4.0 • VERIFIED SERVICES
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 24,
  },
  contentCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  logoCard: {
    width: 170,
    height: 170,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#131938',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  brandTitle: {
    marginBottom: 14,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  bulletText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF5F00',
  },
  subtitleTagline: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1.2,
    marginTop: 4,
  },
  bottomArea: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  getStartedButton: {
    width: '100%',
    height: 56,
    borderRadius: 16,
    backgroundColor: '#141A39',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#141A39',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 4,
    gap: 10,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionFooter: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 0.8,
  },
});
