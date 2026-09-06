import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { HeaderNav } from '../components/BrandHeader';
import { UserIcon, PhoneIcon, ArrowRightIcon } from '../components/Icons';

export default function PersonalDetailsScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const isFormValid =
    fullName.trim().length >= 2 &&
    phoneNumber.trim().replace(/\D/g, '').length === 10;

  const handleNext = () => {
    if (!isFormValid) return;
    router.push('/service-location');
  };

  const handleLogin = () => {
    router.push('/login');
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
          <View style={styles.content}>
            {/* Avatar Circle */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarCircle}>
                <UserIcon size={44} color="#FF5F00" strokeWidth={1.8} />
              </View>
            </View>

            {/* Headings */}
            <Text style={styles.title}>Personal Details</Text>
            <Text style={styles.subtitle}>
              Enter your basic details to create your customer account.
            </Text>

            {/* Form Fields */}
            <View style={styles.form}>
              {/* Full Name Input */}
              <View style={styles.inputBox}>
                <View style={styles.inputIconLeft}>
                  <UserIcon size={20} color="#94A3B8" strokeWidth={2} />
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Full Name"
                  placeholderTextColor="#94A3B8"
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                />
              </View>

              {/* Phone Number Input */}
              <View style={styles.inputBox}>
                <View style={styles.inputIconLeft}>
                  <PhoneIcon size={19} color="#94A3B8" strokeWidth={2} />
                </View>

                {/* Country Flag & Code */}
                <View style={styles.flagCodeRow}>
                  <Text style={styles.flagEmoji}>🇮🇳</Text>
                  <Text style={styles.countryCodeText}>+91</Text>
                </View>

                <View style={styles.verticalDivider} />

                <TextInput
                  style={styles.textInput}
                  placeholder="Phone Number"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                />
              </View>

              {/* Next Button */}
              <TouchableOpacity
                style={[
                  styles.nextButton,
                  !isFormValid && styles.nextButtonDisabled,
                ]}
                onPress={handleNext}
                disabled={!isFormValid}
                activeOpacity={0.88}
              >
                <Text style={styles.nextButtonText}>Next</Text>
                <View
                  style={[
                    styles.arrowCircle,
                    !isFormValid && styles.arrowCircleDisabled,
                  ]}
                >
                  <ArrowRightIcon size={18} color="#FFFFFF" strokeWidth={2.8} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.loginRow}>
              <Text style={styles.alreadyAccountText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
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
    paddingBottom: 24,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    paddingTop: 10,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatarCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#FFF2E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13.5,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
    lineHeight: 20,
  },
  form: {
    width: '100%',
    marginTop: 32,
    gap: 16,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
  },
  inputIconLeft: {
    marginRight: 10,
  },
  flagCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 10,
  },
  flagEmoji: {
    fontSize: 18,
  },
  countryCodeText: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#0F172A',
  },
  verticalDivider: {
    width: 1,
    height: 22,
    backgroundColor: '#E2E8F0',
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
    paddingVertical: 0,
  },
  nextButton: {
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
    marginTop: 8,
    position: 'relative',
  },
  nextButtonDisabled: {
    backgroundColor: '#FED7AA',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  arrowCircle: {
    position: 'absolute',
    right: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCircleDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  bottomSection: {
    width: '100%',
    marginTop: 40,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alreadyAccountText: {
    fontSize: 13.5,
    color: '#64748B',
    fontWeight: '500',
  },
  loginLink: {
    fontSize: 13.5,
    color: '#FF5F00',
    fontWeight: '700',
  },
});
