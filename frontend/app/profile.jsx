import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { UserHeader } from '../components/UserHeader';
import { BottomNav } from '../components/BottomNav';
import {
  FilterIcon,
  EditIcon,
  ShieldCheckIcon,
  DocumentIcon,
  MapPinIcon,
  WrenchIcon,
  CreditCardIcon,
  BellIcon,
  HelpIcon,
  LogoutIcon,
  ChevronRightIcon,
  CheckIcon,
} from '../components/Icons';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <UserHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <TouchableOpacity style={styles.settingsIconTop} activeOpacity={0.7}>
            <FilterIcon size={18} color="#64748B" />
          </TouchableOpacity>

          <View style={styles.profileTopRow}>
            {/* Avatar with Edit Badge */}
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
                }}
                style={styles.avatarImage}
              />
              <TouchableOpacity style={styles.editBadge} activeOpacity={0.8}>
                <EditIcon size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* User Info Details */}
            <View style={styles.userInfoCol}>
              <View style={styles.nameRow}>
                <Text style={styles.userName}>Roshini Verma</Text>
                <View style={styles.verifiedCheckBadge}>
                  <CheckIcon size={9} color="#FFFFFF" strokeWidth={3} />
                </View>
              </View>

              <Text style={styles.memberText}>Customer • Member since 2023</Text>

              <View style={styles.phoneVerifiedRow}>
                <Text style={styles.phoneText}>+91 98765 43210</Text>
                <View style={styles.verifiedTag}>
                  <Text style={styles.verifiedTagText}>Verified</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Consumer Shield Banner */}
          <View style={styles.shieldBanner}>
            <View style={styles.shieldBannerLeft}>
              <ShieldCheckIcon size={16} color="#EA580C" strokeWidth={2.4} />
              <Text style={styles.shieldBannerText}>
                Verified Consumer Shield Active
              </Text>
            </View>
            <Text style={styles.guaranteedText}>100% Guaranteed</Text>
          </View>
        </View>

        {/* Section 1: SERVICES & BOOKINGS */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>SERVICES & BOOKINGS</Text>
          <View style={styles.menuGroup}>
            {/* My Bookings */}
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push('/bookings')}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIconBox, { backgroundColor: '#EFF6FF' }]}>
                <DocumentIcon size={18} color="#2563EB" strokeWidth={2.2} />
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>My Bookings</Text>
                <Text style={styles.menuSubtitle}>
                  Active order & complete service lo...
                </Text>
              </View>
              <View style={styles.liveOrderBadge}>
                <Text style={styles.liveOrderText}>1 Live</Text>
              </View>
              <ChevronRightIcon size={16} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Saved Addresses */}
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={[styles.menuIconBox, { backgroundColor: '#F0FDF4' }]}>
                <MapPinIcon size={18} color="#16A34A" strokeWidth={2.2} />
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>Saved Addresses</Text>
                <Text style={styles.menuSubtitle}>
                  Home, Office, Parents residence
                </Text>
              </View>
              <ChevronRightIcon size={16} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Saved / Favorite Technicians */}
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={[styles.menuIconBox, { backgroundColor: '#FFF7ED' }]}>
                <WrenchIcon size={18} color="#EA580C" strokeWidth={2.2} />
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>Saved / Favorite Technicians</Text>
                <Text style={styles.menuSubtitle}>
                  1-tap rebook trusted electricians & plumbers
                </Text>
              </View>
              <ChevronRightIcon size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 2: ACCOUNT & PREFERENCES */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>ACCOUNT & PREFERENCES</Text>
          <View style={styles.menuGroup}>
            {/* Payment Methods */}
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={[styles.menuIconBox, { backgroundColor: '#F8FAFC' }]}>
                <CreditCardIcon size={18} color="#475569" strokeWidth={2.2} />
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>
                  Payment Methods & SahahKary...
                </Text>
                <Text style={styles.menuSubtitle}>
                  UPI, Cards, SahahCoins balance
                </Text>
              </View>
              <ChevronRightIcon size={16} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Notifications & Dispatch Alerts */}
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={[styles.menuIconBox, { backgroundColor: '#EFF6FF' }]}>
                <BellIcon size={18} color="#2563EB" strokeWidth={2.2} />
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>
                  Notifications & Dispatch Alerts
                </Text>
                <Text style={styles.menuSubtitle}>
                  SMS, WhatsApp updates, push pings
                </Text>
              </View>
              <ChevronRightIcon size={16} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Language Preferences */}
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={[styles.menuIconBox, { backgroundColor: '#F1F5F9' }]}>
                <Text style={styles.langIconText}>文A</Text>
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>Language Preferences</Text>
                <Text style={styles.menuSubtitle}>
                  English (IN) • हिंदी • ಕನ್ನಡ
                </Text>
              </View>
              <Text style={styles.langValueText}>English</Text>
              <ChevronRightIcon size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 3: SUPPORT & COMMUNITY */}
        <View style={styles.sectionWrap}>
          <Text style={styles.sectionHeading}>SUPPORT & COMMUNITY</Text>
          <View style={styles.menuGroup}>
            {/* Help & Customer Support 24/7 */}
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={[styles.menuIconBox, { backgroundColor: '#FFF7ED' }]}>
                <HelpIcon size={18} color="#EA580C" strokeWidth={2.2} />
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>Help & Customer Support 24/7</Text>
                <Text style={styles.menuSubtitle}>
                  Emergency technician helpline & chat
                </Text>
              </View>
              <ChevronRightIcon size={16} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* FAQs */}
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={[styles.menuIconBox, { backgroundColor: '#F1F5F9' }]}>
                <Text style={styles.faqIconText}>?</Text>
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>
                  Frequently Asked Questions (F...
                </Text>
                <Text style={styles.menuSubtitle}>
                  Pricing transparency & service guarantee
                </Text>
              </View>
              <ChevronRightIcon size={16} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Terms of Service */}
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={[styles.menuIconBox, { backgroundColor: '#F1F5F9' }]}>
                <ShieldCheckIcon size={18} color="#475569" strokeWidth={2.2} />
              </View>
              <View style={styles.menuTextCol}>
                <Text style={styles.menuTitle}>Terms of Service & Privacy Policy</Text>
                <Text style={styles.menuSubtitle}>
                  User safety & insurance guidelines
                </Text>
              </View>
              <ChevronRightIcon size={16} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Switch to Partner Mode Card */}
        <TouchableOpacity style={styles.partnerCard} activeOpacity={0.88}>
          <View style={styles.partnerIconBox}>
            <WrenchIcon size={20} color="#FF5F00" strokeWidth={2.4} />
          </View>
          <View style={styles.partnerTextCol}>
            <Text style={styles.partnerTitle}>Switch to Partner Mode</Text>
            <Text style={styles.partnerSubtitle}>
              Earn by offering trade services
            </Text>
          </View>
          <Text style={styles.partnerArrow}>⇄</Text>
        </TouchableOpacity>

        {/* Log Out Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace('/login')}
          activeOpacity={0.85}
        >
          <LogoutIcon size={18} color="#EF4444" strokeWidth={2.4} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* Delete Account Link */}
        <TouchableOpacity style={styles.deleteAccountRow} activeOpacity={0.7}>
          <Text style={styles.deleteAccountText}>
            Delete SahahKarya Account & Personal Data
          </Text>
        </TouchableOpacity>

        {/* Version Footer */}
        <Text style={styles.versionText}>
          SahahKarya v4.8.2 • Proudly Crafted in Bengaluru
        </Text>
      </ScrollView>

      <BottomNav activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFCFE',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 110,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    padding: 16,
    marginTop: 4,
    marginBottom: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  settingsIconTop: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 14,
  },
  avatarImage: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#E2E8F0',
  },
  editBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FF5F00',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  verifiedCheckBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF5F00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberText: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  phoneVerifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  phoneText: {
    fontSize: 11.5,
    color: '#475569',
    fontWeight: '600',
  },
  verifiedTag: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  verifiedTagText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#2563EB',
  },
  shieldBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  shieldBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shieldBannerText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#C2410C',
  },
  guaranteedText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#EA580C',
  },
  sectionWrap: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.6,
    marginBottom: 8,
    marginLeft: 4,
  },
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  menuIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTextCol: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  menuSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  liveOrderBadge: {
    backgroundColor: '#FF5F00',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 8,
  },
  liveOrderText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  langValueText: {
    fontSize: 11.5,
    color: '#64748B',
    marginRight: 6,
    fontWeight: '500',
  },
  langIconText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  faqIconText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#64748B',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 62,
  },
  partnerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141A39',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },
  partnerIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 95, 0, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  partnerTextCol: {
    flex: 1,
  },
  partnerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  partnerSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  partnerArrow: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  logoutButton: {
    height: 50,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#EF4444',
  },
  deleteAccountRow: {
    alignItems: 'center',
    marginBottom: 14,
  },
  deleteAccountText: {
    fontSize: 11.5,
    color: '#94A3B8',
    textDecorationLine: 'underline',
  },
  versionText: {
    fontSize: 10.5,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 8,
  },
});
