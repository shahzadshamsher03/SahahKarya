import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { BrandTitle, HeaderNav } from '../components/BrandHeader';
import { ArrowRightIcon, ChevronDownIcon } from '../components/Icons';

export default function LoginScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGetOTP = () => {
    // Navigate or trigger OTP
    router.push('/choose-role');
  };

  const handleCreateAccount = () => {
    router.push('/choose-role');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderNav />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Centered Content */}
          <View style={styles.mainContent}>
            {/* Top Brand Section */}
            <View style={styles.topSection}>
              <View style={styles.logoCardSmall}>
                <Image
                  source={require('../assets/logo.png')}
                  style={styles.logoImageSmall}
                  resizeMode="contain"
                />
              </View>

              <BrandTitle fontSize={24} />

              <Text style={styles.welcomeHeading}>Welcome back</Text>
              <Text style={styles.subHeading}>
                Enter your mobile number to continue
              </Text>
            </View>

            {/* Form Section */}
            <View style={styles.formSection}>
              {/* Phone Input Box */}
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={styles.countryCodeSelector}
                  activeOpacity={0.7}
                >
                  <Text style={styles.countryCodeText}>+91</Text>
                  <ChevronDownIcon size={14} color="#64748B" />
                </TouchableOpacity>

                <View style={styles.verticalDivider} />

                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter mobile number"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>

              {/* Get OTP Button */}
              <TouchableOpacity
                style={styles.getOtpButton}
                onPress={handleGetOTP}
                activeOpacity={0.88}
              >
                <Text style={styles.getOtpText}>Get OTP</Text>
                <ArrowRightIcon size={18} color="#FFFFFF" strokeWidth={2.6} />
              </TouchableOpacity>

              {/* Or Divider */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Don't have account row */}
              <View style={styles.createAccountRow}>
                <Text style={styles.dontHaveText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={handleCreateAccount}
                  activeOpacity={0.7}
                >
                  <Text style={styles.createAccountLink}>Create Account ›</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Footer Terms */}
          <View style={styles.footerSection}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.termsUnderline}>Terms</Text> •{' '}
              <Text style={styles.termsUnderline}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 12,
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCardSmall: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#131938',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  logoImageSmall: {
    width: 60,
    height: 60,
  },
  welcomeHeading: {
    fontSize: 23,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 18,
    letterSpacing: -0.4,
  },
  subHeading: {
    fontSize: 13.5,
    color: '#64748B',
    marginTop: 6,
    fontWeight: '400',
  },
  formSection: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    marginBottom: 18,
  },
  countryCodeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingRight: 10,
  },
  countryCodeText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  verticalDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#E2E8F0',
    marginRight: 12,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    paddingVertical: 0,
    fontWeight: '500',
  },
  getOtpButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FF5F00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF5F00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 4,
    gap: 10,
    marginBottom: 30,
  },
  getOtpText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  dividerText: {
    paddingHorizontal: 14,
    fontSize: 12.5,
    color: '#94A3B8',
    fontWeight: '500',
  },
  createAccountRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dontHaveText: {
    fontSize: 13.5,
    color: '#64748B',
    fontWeight: '500',
  },
  createAccountLink: {
    fontSize: 13.5,
    color: '#FF5F00',
    fontWeight: '700',
  },
  footerSection: {
    alignItems: 'center',
    marginTop: 30,
  },
  termsText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
  },
  termsUnderline: {
    textDecorationLine: 'underline',
  },
});
