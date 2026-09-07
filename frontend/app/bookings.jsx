import React, { useState } from 'react';
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
import Svg, { Line, Circle } from 'react-native-svg';
import { UserHeader } from '../components/UserHeader';
import { BottomNav } from '../components/BottomNav';
import {
  SearchIcon,
  FilterIcon,
  PhoneIcon,
  MapPinIcon,
  ShieldCheckIcon,
  StarIcon,
  InvoiceIcon,
  RefreshIcon,
  WrenchIcon,
  LightningIcon,
} from '../components/Icons';

export default function BookingsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'history'

  return (
    <SafeAreaView style={styles.safeArea}>
      <UserHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Title Row */}
        <View style={styles.headerTitleRow}>
          <View>
            <Text style={styles.workOrdersLabel}>WORK ORDERS</Text>
            <Text style={styles.pageTitle}>My Bookings</Text>
          </View>

          <View style={styles.headerIconsRow}>
            <TouchableOpacity style={styles.iconCircle} activeOpacity={0.7}>
              <SearchIcon size={18} color="#1E293B" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle} activeOpacity={0.7}>
              <FilterIcon size={18} color="#1E293B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'active' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('active')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'active' && styles.tabTextActive,
              ]}
            >
              Active
            </Text>
            <View
              style={[
                styles.tabBadge,
                activeTab === 'active'
                  ? styles.tabBadgeOrange
                  : styles.tabBadgeGray,
              ]}
            >
              <Text
                style={[
                  styles.tabBadgeText,
                  activeTab === 'active' && styles.tabBadgeTextActive,
                ]}
              >
                1
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'history' && styles.tabButtonActive,
            ]}
            onPress={() => setActiveTab('history')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'history' && styles.tabTextActive,
              ]}
            >
              History
            </Text>
            <View
              style={[
                styles.tabBadge,
                activeTab === 'history'
                  ? styles.tabBadgeOrange
                  : styles.tabBadgeGray,
              ]}
            >
              <Text
                style={[
                  styles.tabBadgeText,
                  activeTab === 'history' && styles.tabBadgeTextActive,
                ]}
              >
                8
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ================= ACTIVE BOOKINGS TAB ================= */}
        {activeTab === 'active' ? (
          <View style={styles.tabContent}>
            {/* Active Job Card */}
            <View style={styles.activeCard}>
              {/* Card Meta Header */}
              <View style={styles.cardMetaRow}>
                <View style={styles.onTheWayPill}>
                  <Text style={styles.onTheWayText}>ON THE WAY</Text>
                </View>
                <Text style={styles.dateTimeText}>TODAY • 10:30 AM</Text>
                <Text style={styles.jobIdText}>#SK-84920</Text>
              </View>

              {/* Service Title */}
              <View style={styles.serviceRow}>
                <View style={styles.serviceIconBox}>
                  <LightningIcon size={20} color="#FF5F00" />
                </View>
                <View style={styles.serviceTextCol}>
                  <Text style={styles.serviceTitle}>
                    Emergency AC Repair & Gas Refill
                  </Text>
                  <Text style={styles.serviceSubtitle}>
                    Master Duct Split AC • Dual Cooling Inverter
                  </Text>
                </View>
              </View>

              {/* Assigned Technician Card */}
              <View style={styles.technicianBox}>
                <View style={styles.techAvatarWrap}>
                  <Image
                    source={{
                      uri: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
                    }}
                    style={styles.techAvatar}
                  />
                  <View style={styles.techOnlineDot} />
                </View>

                <View style={styles.techInfoCol}>
                  <Text style={styles.techName}>
                    Vinod Sharma <Text style={styles.techRating}>★ 4.9</Text>
                  </Text>
                  <Text style={styles.techSub}>
                    Certified Master Technician
                  </Text>
                </View>

                <View style={styles.techEtaCol}>
                  <Text style={styles.techEta}>ETA 12 MINS</Text>
                  <Text style={styles.techDistance}>1.8 km away</Text>
                </View>
              </View>

              {/* Live Tracking Map Preview */}
              <TouchableOpacity
                style={styles.trackingMapCard}
                onPress={() => router.push('/map')}
                activeOpacity={0.9}
              >
                <Svg
                  style={StyleSheet.absoluteFill}
                  width="100%"
                  height="100%"
                  viewBox="0 0 360 100"
                  preserveAspectRatio="none"
                >
                  <Line x1={0} y1={45} x2={360} y2={40} stroke="#CBD5E1" strokeWidth={12} />
                  <Line x1={108} y1={0} x2={126} y2={100} stroke="#E2E8F0" strokeWidth={10} />
                  <Circle cx={72} cy={46} r={7} fill="#FF5F00" />
                  <Circle cx={288} cy={40} r={9} fill="#141A39" />
                </Svg>

                <View style={styles.enRoutePill}>
                  <MapPinIcon size={12} color="#FF5F00" strokeWidth={2.4} />
                  <Text style={styles.enRouteText}>
                    En route via 100 Feet Road
                  </Text>
                </View>

                <View style={styles.liveGpsBadge}>
                  <View style={styles.liveGreenDot} />
                  <Text style={styles.liveGpsText}>Live GPS</Text>
                </View>
              </TouchableOpacity>

              {/* Action Buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.trackMapButton}
                  onPress={() => router.push('/map')}
                  activeOpacity={0.88}
                >
                  <MapPinIcon size={16} color="#FFFFFF" strokeWidth={2.4} />
                  <Text style={styles.trackMapText}>Track on Map</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.callProviderButton}
                  activeOpacity={0.85}
                >
                  <PhoneIcon size={16} color="#FF5F00" strokeWidth={2.2} />
                  <Text style={styles.callProviderText}>Call Provider</Text>
                </TouchableOpacity>
              </View>

              {/* Price Row */}
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>
                  Standard Diagnosis Deposit
                </Text>
                <Text style={styles.priceValue}>₹499.00</Text>
              </View>
            </View>

            {/* SahahKarya Protection Card */}
            <View style={styles.protectionCard}>
              <View style={styles.shieldWrap}>
                <ShieldCheckIcon size={20} color="#3B82F6" strokeWidth={2.2} />
              </View>
              <View style={styles.protectionTextCol}>
                <Text style={styles.protectionTitle}>
                  SahahKarya Protection
                </Text>
                <Text style={styles.protectionDesc}>
                  30-day rework guarantee on electrical and HVAC repairs.
                </Text>
              </View>
            </View>
          </View>
        ) : (
          /* ================= HISTORY BOOKINGS TAB ================= */
          <View style={styles.tabContent}>
            {/* History Item 1 */}
            <View style={styles.historyCard}>
              <View style={styles.historyMetaRow}>
                <View style={styles.completedPill}>
                  <View style={styles.completedDot} />
                  <Text style={styles.completedText}>COMPLETED</Text>
                </View>
                <Text style={styles.historyDate}>Yesterday, 4:30 PM</Text>
              </View>

              <View style={styles.historyMainRow}>
                <View style={styles.historyIconBox}>
                  <LightningIcon size={18} color="#1E293B" />
                </View>
                <View style={styles.historyTextCol}>
                  <Text style={styles.historyTitle}>
                    Full House Electrical Inspection
                  </Text>
                  <View style={styles.historyAddressRow}>
                    <MapPinIcon size={11} color="#64748B" />
                    <Text style={styles.historyAddress}>
                      Bapuji Nagar, Flat 402
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.ratingFeeRow}>
                <View style={styles.starRatingRow}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} size={12} color="#F59E0B" />
                  ))}
                  <Text style={styles.ratingLabel}>Rated 5.0</Text>
                </View>
                <Text style={styles.historyFee}>₹1,240</Text>
              </View>

              <View style={styles.historyActionRow}>
                <TouchableOpacity style={styles.invoiceButton} activeOpacity={0.8}>
                  <InvoiceIcon size={14} color="#1E293B" />
                  <Text style={styles.invoiceText}>Invoice</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.bookAgainButton}
                  onPress={() => router.push('/map')}
                  activeOpacity={0.88}
                >
                  <RefreshIcon size={14} color="#FFFFFF" />
                  <Text style={styles.bookAgainText}>Book Again</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* History Item 2 */}
            <View style={styles.historyCard}>
              <View style={styles.historyMetaRow}>
                <View style={styles.completedPill}>
                  <View style={styles.completedDot} />
                  <Text style={styles.completedText}>COMPLETED</Text>
                </View>
                <Text style={styles.historyDate}>12 Oct 2023</Text>
              </View>

              <View style={styles.historyMainRow}>
                <View style={styles.historyIconBox}>
                  <WrenchIcon size={18} color="#1E293B" />
                </View>
                <View style={styles.historyTextCol}>
                  <Text style={styles.historyTitle}>
                    Kitchen Pipe Leakage & Tap Fix
                  </Text>
                  <Text style={styles.technicianLabel}>
                    Technician: Rakesh Kumar
                  </Text>
                </View>
                <Text style={styles.historyFeeRight}>₹650</Text>
              </View>

              {/* Review Callout Box */}
              <View style={styles.reviewCalloutBox}>
                <View style={styles.reviewCalloutLeft}>
                  <StarIcon size={13} color="#FF5F00" />
                  <Text style={styles.reviewCalloutText}>
                    How was Rakesh's service?
                  </Text>
                </View>
                <TouchableOpacity style={styles.leaveReviewButton} activeOpacity={0.85}>
                  <Text style={styles.leaveReviewText}>Leave Review</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.historyActionRow}>
                <TouchableOpacity style={styles.invoiceButton} activeOpacity={0.8}>
                  <InvoiceIcon size={14} color="#1E293B" />
                  <Text style={styles.invoiceText}>Invoice</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.bookAgainButton}
                  onPress={() => router.push('/map')}
                  activeOpacity={0.88}
                >
                  <RefreshIcon size={14} color="#FFFFFF" />
                  <Text style={styles.bookAgainText}>Book Again</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* History Item 3: Cancelled */}
            <View style={styles.historyCard}>
              <View style={styles.historyMetaRow}>
                <View style={styles.cancelledPill}>
                  <View style={styles.cancelledDot} />
                  <Text style={styles.cancelledText}>CANCELLED</Text>
                </View>
                <Text style={styles.historyDate}>04 Oct 2023</Text>
              </View>

              <View style={styles.historyMainRow}>
                <View style={styles.historyIconBox}>
                  <LightningIcon size={18} color="#94A3B8" />
                </View>
                <View style={styles.historyTextCol}>
                  <Text style={styles.historyTitle}>
                    Ceiling Fan Installation
                  </Text>
                  <Text style={styles.cancelReason}>
                    Cancellation Reason: Customer rescheduled
                  </Text>
                </View>
              </View>

              <View style={styles.refundRow}>
                <Text style={styles.refundText}>
                  Refund: ₹350 Processed to UPI
                </Text>
                <TouchableOpacity
                  style={styles.rebookPill}
                  onPress={() => router.push('/map')}
                  activeOpacity={0.8}
                >
                  <Text style={styles.rebookText}>Re-book</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Load Older Link */}
            <View style={styles.loadOlderRow}>
              <Text style={styles.ordersCountText}>
                Showing 3 of 8 past work orders
              </Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.loadOlderLink}>Load Older</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <BottomNav activeTab="bookings" />
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 16,
  },
  workOrdersLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FF5F00',
    letterSpacing: 0.8,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
  headerIconsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#E0EDFA',
    borderRadius: 22,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 18,
    gap: 8,
  },
  tabButtonActive: {
    backgroundColor: '#141A39',
  },
  tabText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#475569',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  tabBadgeOrange: {
    backgroundColor: '#FF5F00',
  },
  tabBadgeGray: {
    backgroundColor: '#CBD5E1',
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
  },
  tabBadgeTextActive: {
    color: '#FFFFFF',
  },
  tabContent: {
    gap: 16,
  },
  activeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  onTheWayPill: {
    backgroundColor: '#FFF2E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  onTheWayText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FF5F00',
    letterSpacing: 0.4,
  },
  dateTimeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  jobIdText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  serviceIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF2E8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTextCol: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 14.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  serviceSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  technicianBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  techAvatarWrap: {
    position: 'relative',
    marginRight: 10,
  },
  techAvatar: {
    width: 42,
    height: 42,
    borderRadius: 14,
  },
  techOnlineDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF5F00',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  techInfoCol: {
    flex: 1,
  },
  techName: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  techRating: {
    color: '#F59E0B',
    fontSize: 12,
  },
  techSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  techEtaCol: {
    alignItems: 'flex-end',
  },
  techEta: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#FF5F00',
  },
  techDistance: {
    fontSize: 10.5,
    color: '#94A3B8',
    marginTop: 2,
  },
  trackingMapCard: {
    height: 100,
    borderRadius: 16,
    backgroundColor: '#E8EEF5',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 14,
  },
  enRoutePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  enRouteText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  liveGpsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  liveGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  liveGpsText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F172A',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  trackMapButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FF5F00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#FF5F00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },
  trackMapText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  callProviderButton: {
    flex: 1,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  callProviderText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#1E40AF',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  priceLabel: {
    fontSize: 11.5,
    color: '#64748B',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  protectionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    gap: 12,
  },
  shieldWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  protectionTextCol: {
    flex: 1,
  },
  protectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E40AF',
  },
  protectionDesc: {
    fontSize: 11,
    color: '#475569',
    marginTop: 2,
    lineHeight: 15,
  },
  historyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  historyMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  completedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 5,
  },
  completedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#3B82F6',
  },
  completedText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#1E293B',
  },
  historyDate: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  historyMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  historyIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyTextCol: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  historyAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 3,
  },
  historyAddress: {
    fontSize: 11,
    color: '#64748B',
  },
  technicianLabel: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  historyFeeRight: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  ratingFeeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  starRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  ratingLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#64748B',
    marginLeft: 6,
  },
  historyFee: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },
  reviewCalloutBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF7ED',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  reviewCalloutLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reviewCalloutText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#C2410C',
  },
  leaveReviewButton: {
    backgroundColor: '#FF5F00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  leaveReviewText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  historyActionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  invoiceButton: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  invoiceText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#1E293B',
  },
  bookAgainButton: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#141A39',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  bookAgainText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  cancelledPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 5,
  },
  cancelledDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#94A3B8',
  },
  cancelledText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#64748B',
  },
  cancelReason: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  refundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  refundText: {
    fontSize: 11,
    color: '#64748B',
  },
  rebookPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  rebookText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1E40AF',
  },
  loadOlderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    marginTop: 6,
  },
  ordersCountText: {
    fontSize: 11.5,
    color: '#94A3B8',
  },
  loadOlderLink: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FF5F00',
  },
});
