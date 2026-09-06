import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { HeaderNav } from '../components/BrandHeader';
import {
  UserIcon,
  CheckIcon,
  ArrowRightIcon,
  ServiceProviderIcon,
  ChevronRightIcon,
  MobileOutlineIcon,
} from '../components/Icons';

export default function ChooseRoleScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('customer'); // 'customer' or 'provider'

  const handleContinue = () => {
    router.push('/personal-details');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Navigation Header */}
      <HeaderNav />

      <View style={styles.container}>
        {/* Main Content */}
        <View style={styles.content}>
          <Text style={styles.screenHeading}>Choose Your Role</Text>

          {/* Customer Role Card */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              selectedRole === 'customer'
                ? styles.roleCardActive
                : styles.roleCardInactive,
            ]}
            onPress={() => setSelectedRole('customer')}
            activeOpacity={0.9}
          >
            <View style={styles.customerIconContainer}>
              <UserIcon size={22} color="#FF5F00" strokeWidth={2.2} />
            </View>

            <View style={styles.roleTextContainer}>
              <Text style={styles.roleTitle}>Customer</Text>
              <Text style={styles.roleSubtitle}>
                Find & book verified skilled workers
              </Text>
            </View>

            {selectedRole === 'customer' && (
              <View style={styles.checkBadge}>
                <CheckIcon size={14} color="#FFFFFF" strokeWidth={3} />
              </View>
            )}
          </TouchableOpacity>

          {/* Continue with Mobile Number Button */}
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            activeOpacity={0.88}
          >
            <View style={styles.continueButtonContent}>
              <MobileOutlineIcon size={20} color="#FFFFFF" strokeWidth={2.2} />
              <Text style={styles.continueButtonText}>
                Continue with Mobile Number
              </Text>
              <ArrowRightIcon size={18} color="#FFFFFF" strokeWidth={2.6} />
            </View>
          </TouchableOpacity>

          {/* Service Provider Card */}
          <TouchableOpacity
            style={[
              styles.roleCard,
              styles.providerCard,
              selectedRole === 'provider' && styles.roleCardActive,
            ]}
            onPress={() => setSelectedRole('provider')}
            activeOpacity={0.85}
          >
            <View style={styles.providerIconContainer}>
              <ServiceProviderIcon size={22} color="#1E293B" />
            </View>

            <View style={styles.roleTextContainer}>
              <Text style={styles.providerPrompt}>
                Want to offer your services?
              </Text>
              <Text style={styles.providerTitle}>
                Become a Service Provider
              </Text>
            </View>

            <ChevronRightIcon size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Already have account */}
          <View style={styles.loginRow}>
            <Text style={styles.alreadyAccountText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
              <Text style={styles.loginLink}>Log In →</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 24,
  },
  content: {
    paddingTop: 16,
  },
  screenHeading: {
    fontSize: 25,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 30,
    letterSpacing: -0.5,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  roleCardActive: {
    borderWidth: 2,
    borderColor: '#FF5F00',
    shadowColor: '#FF5F00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  roleCardInactive: {
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  customerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFF2E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  roleTextContainer: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  roleSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    marginTop: 3,
    fontWeight: '400',
  },
  checkBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FF5F00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FF5F00',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF5F00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 20,
  },
  continueButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 16,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 15.5,
    fontWeight: '700',
  },
  providerCard: {
    backgroundColor: '#FAFCFE',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  providerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  providerPrompt: {
    fontSize: 12,
    color: '#64748B',
  },
  providerTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  bottomSection: {
    width: '100%',
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
