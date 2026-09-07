import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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
  LightningIcon,
  WrenchIcon,
  StarIcon,
  MapPinIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  TargetGpsIcon,
} from '../components/Icons';

export default function HomeScreen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState('carpenter');
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    { id: 'electrician', label: 'Electrician', icon: LightningIcon },
    { id: 'plumber', label: 'Plumber', icon: WrenchIcon },
    { id: 'carpenter', label: 'Carpenter', icon: WrenchIcon },
    { id: 'ac', label: 'AC Repair', icon: LightningIcon },
  ];

  const workers = [
    {
      id: '1',
      name: 'Ramesh Kumar',
      role: 'Master Electrician',
      jobs: '320+ Jobs',
      distance: '0.8 km away',
      perk: 'Free Inspection',
      rating: '4.9',
      fee: '₹199',
      buttonTheme: 'orange',
      image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: '2',
      name: 'Suresh Patil',
      role: 'Senior Plumber',
      jobs: '190+ Jobs Done',
      distance: '1.4 km away',
      perk: 'Leak Specialist',
      rating: '4.8',
      fee: '₹149',
      buttonTheme: 'navy',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    {
      id: '3',
      name: 'Arvind Verma',
      role: 'AC Technician',
      jobs: '410+ Completed',
      distance: '2.1 km away',
      perk: 'Next slot in 30m',
      rating: '4.9',
      fee: '₹249',
      buttonTheme: 'orange',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <UserHeader />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <SearchIcon size={18} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search electrician, plumber, AC rep..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity style={styles.filterButton} activeOpacity={0.8}>
            <FilterIcon size={18} color="#1E293B" />
          </TouchableOpacity>
        </View>

        {/* Explore Services */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Explore Services</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All (12)</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesScroll}
        >
          {services.map((srv) => {
            const isSelected = selectedService === srv.id;
            const Icon = srv.icon;
            return (
              <TouchableOpacity
                key={srv.id}
                style={[
                  styles.serviceChip,
                  isSelected && styles.serviceChipSelected,
                ]}
                onPress={() => setSelectedService(srv.id)}
                activeOpacity={0.8}
              >
                <Icon
                  size={14}
                  color={isSelected ? '#FF5F00' : '#FF5F00'}
                />
                <Text
                  style={[
                    styles.serviceChipText,
                    isSelected && styles.serviceChipTextSelected,
                  ]}
                >
                  {srv.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Live Radar Map Card */}
        <View style={styles.radarCard}>
          {/* Map Grid Vector Background */}
          <Svg
            style={StyleSheet.absoluteFill}
            width="100%"
            height="100%"
            viewBox="0 0 360 160"
            preserveAspectRatio="none"
          >
            <Line x1={0} y1={56} x2={360} y2={64} stroke="#E2E8F0" strokeWidth={12} />
            <Line x1={162} y1={0} x2={126} y2={160} stroke="#E2E8F0" strokeWidth={10} />
            <Line x1={36} y1={32} x2={324} y2={144} stroke="#E8EEF5" strokeWidth={6} />
            <Circle cx={126} cy={80} r={35} fill="rgba(255, 95, 0, 0.15)" />
            <Circle cx={245} cy={64} r={18} fill="rgba(20, 26, 57, 0.12)" />
          </Svg>

          {/* Top-left Radar badge */}
          <View style={styles.radarBadge}>
            <View style={styles.radarGreenDot} />
            <Text style={styles.radarBadgeText}>Live Radar: 14 Pros Nearby</Text>
          </View>

          {/* Top-right Compass */}
          <View style={styles.radarTarget}>
            <TargetGpsIcon size={18} color="#FF5F00" strokeWidth={2.4} />
          </View>

          {/* Pin 1: Electrician near center */}
          <View style={styles.radarCenterPin}>
            <View style={styles.radarOrangePinCircle}>
              <LightningIcon size={14} color="#FFFFFF" />
            </View>
          </View>

          {/* Pin 2: Plumber */}
          <View style={styles.radarNavyPin}>
            <WrenchIcon size={12} color="#FFFFFF" strokeWidth={2.2} />
          </View>

          {/* Bottom Left: Dispatch Time */}
          <View style={styles.dispatchPill}>
            <Text style={styles.dispatchText}>Avg. Dispatch: 12 mins</Text>
          </View>

          {/* Bottom Right: View Full Map Button */}
          <TouchableOpacity
            style={styles.viewMapButton}
            onPress={() => router.push('/map')}
            activeOpacity={0.88}
          >
            <Text style={styles.viewMapText}>View Full Map</Text>
            <ArrowRightIcon size={14} color="#FFFFFF" strokeWidth={2.6} />
          </TouchableOpacity>
        </View>

        {/* Top Rated Nearby Section */}
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Top Rated Nearby</Text>
            <Text style={styles.sectionSubtitle}>
              Verified background-checked tradesmen
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.filterLink}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Worker Cards */}
        <View style={styles.workerList}>
          {workers.map((worker) => (
            <View key={worker.id} style={styles.workerCard}>
              <View style={styles.workerMainRow}>
                {/* Avatar with verified badge */}
                <View style={styles.avatarWrap}>
                  <Image
                    source={{ uri: worker.image }}
                    style={styles.avatar}
                  />
                  <View style={styles.verifiedMiniBadge}>
                    <ShieldCheckIcon size={10} color="#FFFFFF" strokeWidth={2.8} />
                  </View>
                </View>

                {/* Info Column */}
                <View style={styles.workerInfo}>
                  <View style={styles.nameRatingRow}>
                    <Text style={styles.workerName}>{worker.name}</Text>
                    <View style={styles.ratingBadge}>
                      <StarIcon size={11} color="#F59E0B" />
                      <Text style={styles.ratingText}>{worker.rating}</Text>
                    </View>
                  </View>

                  <Text style={styles.workerRole}>
                    {worker.role} • {worker.jobs}
                  </Text>

                  <View style={styles.locationPerkRow}>
                    <MapPinIcon size={11} color="#FF5F00" strokeWidth={2.2} />
                    <Text style={styles.distanceText}>{worker.distance}</Text>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.perkText}>{worker.perk}</Text>
                  </View>
                </View>
              </View>

              {/* Bottom Card Row */}
              <View style={styles.cardBottomRow}>
                <View style={styles.feeCol}>
                  <Text style={styles.feeLabel}>Visiting Fee</Text>
                  <Text style={styles.feeValue}>{worker.fee}</Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.bookNowButton,
                    worker.buttonTheme === 'navy'
                      ? styles.bookNowNavy
                      : styles.bookNowOrange,
                  ]}
                  onPress={() => router.push('/map')}
                  activeOpacity={0.88}
                >
                  <Text style={styles.bookNowText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* The SahahKarya Promise Banner */}
        <View style={styles.promiseBanner}>
          <View style={styles.promiseTitleRow}>
            <ShieldCheckIcon size={18} color="#FF5F00" strokeWidth={2.4} />
            <Text style={styles.promiseTitle}>The SahahKarya Promise</Text>
          </View>

          <View style={styles.promiseRow}>
            <View style={styles.promiseBox}>
              <Text style={styles.promiseBoxTitle}>100% Verified</Text>
              <Text style={styles.promiseBoxDesc}>Govt. ID & Skills</Text>
            </View>
            <View style={styles.promiseBox}>
              <Text style={styles.promiseBoxTitle}>Upfront Rates</Text>
              <Text style={styles.promiseBoxDesc}>No hidden fee</Text>
            </View>
            <View style={styles.promiseBox}>
              <Text style={styles.promiseBoxTitle}>30-Day Cover</Text>
              <Text style={styles.promiseBoxDesc}>Free rework</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <BottomNav activeTab="home" />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#0F172A',
    marginLeft: 8,
    fontWeight: '500',
  },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 2,
  },
  seeAllText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FF5F00',
  },
  filterLink: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FF5F00',
  },
  servicesScroll: {
    gap: 10,
    marginBottom: 18,
  },
  serviceChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  serviceChipSelected: {
    backgroundColor: '#141A39',
    borderColor: '#141A39',
  },
  serviceChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  serviceChipTextSelected: {
    color: '#FFFFFF',
  },
  radarCard: {
    height: 160,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 22,
  },
  radarBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 6,
    elevation: 2,
  },
  radarGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },
  radarBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  radarTarget: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  radarCenterPin: {
    position: 'absolute',
    top: '40%',
    left: '35%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
  },
  radarOrangePinCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF5F00',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF5F00',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
  },
  radarNavyPin: {
    position: 'absolute',
    top: '38%',
    right: '28%',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#141A39',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  dispatchPill: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#141A39',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  dispatchText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  viewMapButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5F00',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    elevation: 3,
  },
  viewMapText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  workerList: {
    gap: 14,
    marginBottom: 20,
  },
  workerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  workerMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarWrap: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#E2E8F0',
  },
  verifiedMiniBadge: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  workerInfo: {
    flex: 1,
  },
  nameRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workerName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 3,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  workerRole: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  locationPerkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  distanceText: {
    fontSize: 11,
    color: '#64748B',
  },
  bulletDot: {
    fontSize: 11,
    color: '#94A3B8',
  },
  perkText: {
    fontSize: 11,
    color: '#64748B',
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  feeCol: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  feeLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  feeValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  bookNowButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 12,
  },
  bookNowOrange: {
    backgroundColor: '#FF5F00',
  },
  bookNowNavy: {
    backgroundColor: '#141A39',
  },
  bookNowText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  promiseBanner: {
    backgroundColor: '#F0F7FF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0EEFF',
  },
  promiseTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  promiseTitle: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  promiseRow: {
    flexDirection: 'row',
    gap: 8,
  },
  promiseBox: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  promiseBoxTitle: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  promiseBoxDesc: {
    fontSize: 9.5,
    color: '#64748B',
    marginTop: 2,
  },
});
