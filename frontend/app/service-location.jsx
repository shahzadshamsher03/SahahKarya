import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import Svg, { Line, Rect, Circle, Path } from 'react-native-svg';
import { HeaderNav } from '../components/BrandHeader';
import {
  ArrowRightIcon,
  ChevronRightIcon,
  SearchIcon,
  TargetGpsIcon,
  MapPinIcon,
  HomeIcon,
  BriefcaseIcon,
  LightningIcon,
  WrenchIcon,
  ShieldCheckIcon,
  CheckIcon,
} from '../components/Icons';

export default function ServiceLocationScreen() {
  const router = useRouter();

  // State
  const [addressType, setAddressType] = useState('home'); // 'home' | 'office' | 'other'
  const [searchQuery, setSearchQuery] = useState('');
  const [flatNumber, setFlatNumber] = useState('Apt 402, Lotus Orchid Heights');
  const [streetAddress, setStreetAddress] = useState(
    'Main Link Road, Near Central Metro Station'
  );
  const [cityRegion, setCityRegion] = useState('South Jakarta');
  const [postalCode, setPostalCode] = useState('12190');
  const [isDefault, setIsDefault] = useState(true);

  // Location Services State
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [isLocationVerified, setIsLocationVerified] = useState(true);
  const [detectedCoords, setDetectedCoords] = useState(null);

  // Handle GPS location detection
  const handleUseCurrentLocation = async () => {
    if (!Location || !Location.requestForegroundPermissionsAsync) {
      Alert.alert(
        'Server Restart Required',
        'expo-location was recently installed. Please restart your Expo terminal using "npx expo start -c" to clear Metro bundler cache.',
        [{ text: 'OK' }]
      );
      return;
    }

    try {
      setIsLoadingLocation(true);

      // 1. Request foreground permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission Required',
          'Please allow location permission so we can automatically detect your current address.',
          [{ text: 'OK' }]
        );
        setIsLoadingLocation(false);
        return;
      }

      // 2. Fetch current GPS coordinates
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;
      setDetectedCoords({ latitude, longitude });

      // 3. Reverse geocode to real address
      const reverseResults = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (reverseResults && reverseResults.length > 0) {
        const item = reverseResults[0];

        // Format Flat / Building / House
        const buildingName =
          [item.name, item.streetNumber].filter(Boolean).join(' ') ||
          (item.street ? `Near ${item.street}` : 'Current GPS Location');

        // Format Street & Landmark
        const landmarkParts = [item.street, item.district, item.subregion].filter(
          Boolean
        );
        const streetText =
          landmarkParts.length > 0
            ? landmarkParts.join(', ')
            : 'Detected via GPS';

        // City / Region
        const cityText =
          item.city || item.subregion || item.region || item.country || '';

        // Postal Code
        const postalText = item.postalCode || '';

        if (buildingName) setFlatNumber(buildingName);
        if (streetText) setStreetAddress(streetText);
        if (cityText) setCityRegion(cityText);
        if (postalText) setPostalCode(postalText);
        setIsLocationVerified(true);
      }
    } catch (error) {
      console.warn('GPS location fetch error:', error);
      Alert.alert(
        'Location Detection',
        'Could not detect current location. Please make sure location services are turned on.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoadingLocation(false);
    }
  };

  // Handle manual address search
  const handleSearchAddress = async () => {
    if (!searchQuery.trim()) return;

    try {
      setIsSearchingLocation(true);
      const geocoded = await Location.geocodeAsync(searchQuery.trim());

      if (geocoded && geocoded.length > 0) {
        const { latitude, longitude } = geocoded[0];
        setDetectedCoords({ latitude, longitude });

        const rev = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (rev && rev.length > 0) {
          const item = rev[0];
          setFlatNumber(item.name || searchQuery);
          setStreetAddress(
            [item.street, item.district].filter(Boolean).join(', ') ||
              searchQuery
          );
          if (item.city || item.region) {
            setCityRegion(item.city || item.region);
          }
          if (item.postalCode) {
            setPostalCode(item.postalCode);
          }
          setIsLocationVerified(true);
        }
      } else {
        setStreetAddress(searchQuery.trim());
      }
    } catch (e) {
      console.warn('Geocoding search error:', e);
      setStreetAddress(searchQuery.trim());
    } finally {
      setIsSearchingLocation(false);
    }
  };

  const handleConfirmLocation = () => {
    router.push('/home');
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
          {/* Step Subheader */}
          <View style={styles.stepHeaderRow}>
            <Text style={styles.stepText}>Step 2 of 3: Service Location</Text>
            <View style={styles.stepIndicators}>
              <View style={[styles.stepBar, styles.stepBarActive]} />
              <View style={[styles.stepBar, styles.stepBarActive]} />
              <View style={[styles.stepBar, styles.stepBarInactive]} />
            </View>
          </View>

          {/* Interactive Map Preview Card */}
          <View style={styles.mapCard}>
            {/* SVG stylized street grid */}
            <Svg
              style={StyleSheet.absoluteFill}
              width="100%"
              height="100%"
              viewBox="0 0 360 180"
              preserveAspectRatio="none"
            >
              {/* Grid Background */}
              {[...Array(9)].map((_, i) => (
                <Line
                  key={`v-${i}`}
                  x1={i * 45}
                  y1={0}
                  x2={i * 45}
                  y2={180}
                  stroke="#EEF2F6"
                  strokeWidth="1.2"
                />
              ))}
              {[...Array(6)].map((_, i) => (
                <Line
                  key={`h-${i}`}
                  x1={0}
                  y1={i * 36}
                  x2={360}
                  y2={i * 36}
                  stroke="#EEF2F6"
                  strokeWidth="1.2"
                />
              ))}

              {/* Main Street Roads */}
              <Line
                x1={0}
                y1={65}
                x2={360}
                y2={54}
                stroke="#FFFFFF"
                strokeWidth={16}
              />
              <Line
                x1={162}
                y1={0}
                x2={126}
                y2={180}
                stroke="#FFFFFF"
                strokeWidth={14}
              />
            </Svg>

            {/* Pill 1: Electrician (Top Left) */}
            <View style={styles.electricianPill}>
              <View style={styles.greenDot} />
              <LightningIcon size={12} color="#FF5F00" />
              <Text style={styles.pillTextDark}>Electrician (0.8 km)</Text>
            </View>

            {/* Center Location Pin with Glow Ring */}
            <View style={styles.centerPinContainer}>
              <View style={styles.pulseOuterRing} />
              <View style={styles.pulsePinCircle}>
                <MapPinIcon size={18} color="#FFFFFF" strokeWidth={2.4} />
              </View>
            </View>

            {/* Pill 2: 18+ Verified Pros (Bottom Left) */}
            <View style={styles.verifiedProsPill}>
              <View style={styles.orangeDot} />
              <Text style={styles.verifiedProsText}>
                18+ Verified Pros Around You
              </Text>
            </View>

            {/* Pill 3: Plumber (Bottom Right) */}
            <View style={styles.plumberPill}>
              <WrenchIcon size={13} color="#64748B" />
              <Text style={styles.pillTextMuted}>Plumber (1.2 km)</Text>
            </View>
          </View>

          {/* Headline & Description */}
          <Text style={styles.heading}>Where do you need service?</Text>
          <Text style={styles.subheading}>
            Set your exact service address to discover skilled technicians and
            get fast, accurate arrival estimates.
          </Text>

          {/* Action Card: Use Current Location */}
          <TouchableOpacity
            style={[
              styles.currentLocationCard,
              isLoadingLocation && styles.currentLocationCardLoading,
            ]}
            onPress={handleUseCurrentLocation}
            disabled={isLoadingLocation}
            activeOpacity={0.85}
          >
            <View style={styles.gpsIconBox}>
              {isLoadingLocation ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <TargetGpsIcon size={22} color="#FFFFFF" strokeWidth={2.4} />
              )}
            </View>

            <View style={styles.currentLocationTextCol}>
              <View style={styles.currentLocationTitleRow}>
                <Text style={styles.currentLocationTitle}>
                  {isLoadingLocation
                    ? 'Detecting Location...'
                    : 'Use Current Location'}
                </Text>
                <View style={styles.fastestBadge}>
                  <Text style={styles.fastestText}>FASTEST</Text>
                </View>
              </View>
              <Text style={styles.currentLocationSubtitle}>
                {isLoadingLocation
                  ? 'Fetching GPS coordinates & address...'
                  : 'Auto-detects area via GPS for precise doorstep service'}
              </Text>
            </View>

            {isLoadingLocation ? (
              <ActivityIndicator size="small" color="#FF5F00" />
            ) : (
              <ChevronRightIcon size={20} color="#FF5F00" strokeWidth={2.4} />
            )}
          </TouchableOpacity>

          {/* Divider: Or Search Address Manually */}
          <View style={styles.manualDividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.manualDividerText}>
              OR SEARCH ADDRESS MANUALLY
            </Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Search Box */}
          <View style={styles.searchBar}>
            <SearchIcon size={18} color="#94A3B8" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search society, street, or landmark..."
              placeholderTextColor="#94A3B8"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchAddress}
              returnKeyType="search"
            />
            <TouchableOpacity
              style={styles.mapButton}
              onPress={handleSearchAddress}
              disabled={isSearchingLocation}
              activeOpacity={0.8}
            >
              {isSearchingLocation ? (
                <ActivityIndicator size="small" color="#FF5F00" />
              ) : (
                <Text style={styles.mapButtonText}>Map</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Save Address As Section */}
          <View style={styles.saveAsSection}>
            <Text style={styles.saveAsLabel}>SAVE ADDRESS AS</Text>
            <View style={styles.addressTypeRow}>
              {/* Home */}
              <TouchableOpacity
                style={[
                  styles.addressTypeChip,
                  addressType === 'home'
                    ? styles.addressTypeChipActive
                    : styles.addressTypeChipInactive,
                ]}
                onPress={() => setAddressType('home')}
                activeOpacity={0.8}
              >
                <HomeIcon
                  size={15}
                  color={addressType === 'home' ? '#FF5F00' : '#64748B'}
                />
                <Text
                  style={[
                    styles.addressTypeText,
                    addressType === 'home'
                      ? styles.addressTypeTextActive
                      : styles.addressTypeTextInactive,
                  ]}
                >
                  Home
                </Text>
              </TouchableOpacity>

              {/* Office */}
              <TouchableOpacity
                style={[
                  styles.addressTypeChip,
                  addressType === 'office'
                    ? styles.addressTypeChipActive
                    : styles.addressTypeChipInactive,
                ]}
                onPress={() => setAddressType('office')}
                activeOpacity={0.8}
              >
                <BriefcaseIcon
                  size={15}
                  color={addressType === 'office' ? '#FF5F00' : '#64748B'}
                />
                <Text
                  style={[
                    styles.addressTypeText,
                    addressType === 'office'
                      ? styles.addressTypeTextActive
                      : styles.addressTypeTextInactive,
                  ]}
                >
                  Office
                </Text>
              </TouchableOpacity>

              {/* Other */}
              <TouchableOpacity
                style={[
                  styles.addressTypeChip,
                  addressType === 'other'
                    ? styles.addressTypeChipActive
                    : styles.addressTypeChipInactive,
                ]}
                onPress={() => setAddressType('other')}
                activeOpacity={0.8}
              >
                <MapPinIcon
                  size={15}
                  color={addressType === 'other' ? '#FF5F00' : '#64748B'}
                />
                <Text
                  style={[
                    styles.addressTypeText,
                    addressType === 'other'
                      ? styles.addressTypeTextActive
                      : styles.addressTypeTextInactive,
                  ]}
                >
                  Other
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Address Details Card */}
          <View style={styles.addressDetailsCard}>
            <View style={styles.addressDetailsHeader}>
              <Text style={styles.addressDetailsTitle}>ADDRESS DETAILS</Text>
              <View style={styles.verifiedBadgeRow}>
                <View style={styles.greenDotSmall} />
                <Text style={styles.verifiedBadgeText}>Location Verified</Text>
              </View>
            </View>

            {/* Field 1: Flat / House No. */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>
                Flat / House No. / Building Name *
              </Text>
              <TextInput
                style={styles.fieldInput}
                value={flatNumber}
                onChangeText={setFlatNumber}
              />
            </View>

            {/* Field 2: Street Address & Landmark */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Street Address & Landmark *</Text>
              <TextInput
                style={styles.fieldInput}
                value={streetAddress}
                onChangeText={setStreetAddress}
              />
            </View>

            {/* Row with City / Region and Postal Code */}
            <View style={styles.twoColRow}>
              <View style={styles.halfField}>
                <Text style={styles.fieldLabel}>City / Region</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={cityRegion}
                  onChangeText={setCityRegion}
                />
              </View>

              <View style={styles.halfField}>
                <Text style={styles.fieldLabel}>Postal Code</Text>
                <TextInput
                  style={styles.fieldInput}
                  value={postalCode}
                  onChangeText={setPostalCode}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Default Location Checkbox */}
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setIsDefault(!isDefault)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.checkbox,
                  isDefault ? styles.checkboxChecked : styles.checkboxUnchecked,
                ]}
              >
                {isDefault && (
                  <CheckIcon size={12} color="#FFFFFF" strokeWidth={3} />
                )}
              </View>
              <Text style={styles.checkboxLabel}>
                Set as default location for rapid skilled worker matching
              </Text>
            </TouchableOpacity>
          </View>

          {/* Verified Privacy Note */}
          <View style={styles.privacyCard}>
            <ShieldCheckIcon size={18} color="#FF5F00" strokeWidth={2.2} />
            <Text style={styles.privacyText}>
              <Text style={styles.privacyBold}>Verified Privacy: </Text>
              Your exact apartment/house number is only shared with assigned
              service professionals after booking confirmation.
            </Text>
          </View>

          {/* Confirm Button */}
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmLocation}
            activeOpacity={0.88}
          >
            <Text style={styles.confirmButtonText}>
              Confirm Location & Continue
            </Text>
            <ArrowRightIcon size={18} color="#FFFFFF" strokeWidth={2.6} />
          </TouchableOpacity>

          <Text style={styles.settingsFooterNote}>
            You can switch or add multiple addresses anytime in settings.
          </Text>
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
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  stepHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginBottom: 14,
  },
  stepText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#64748B',
  },
  stepIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stepBar: {
    height: 4,
    borderRadius: 2,
  },
  stepBarActive: {
    width: 16,
    backgroundColor: '#FF5F00',
  },
  stepBarInactive: {
    width: 6,
    backgroundColor: '#E2E8F0',
  },
  mapCard: {
    height: 180,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 20,
  },
  electricianPill: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  pillTextDark: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
  },
  centerPinContainer: {
    position: 'absolute',
    top: '46%',
    left: '50%',
    transform: [{ translateX: -26 }, { translateY: -26 }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseOuterRing: {
    position: 'absolute',
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: 'rgba(255, 95, 0, 0.18)',
  },
  pulsePinCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF5F00',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF5F00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 4,
  },
  verifiedProsPill: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141A39',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    gap: 7,
    shadowColor: '#141A39',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  orangeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF5F00',
  },
  verifiedProsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  plumberPill: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  pillTextMuted: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  heading: {
    fontSize: 23,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.4,
  },
  subheading: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 19,
    marginBottom: 18,
  },
  currentLocationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#FFFAF5',
    borderWidth: 1.2,
    borderColor: '#FED7AA',
    marginBottom: 18,
  },
  currentLocationCardLoading: {
    borderColor: '#FF5F00',
    backgroundColor: '#FFF7ED',
  },
  gpsIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FF5F00',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  currentLocationTextCol: {
    flex: 1,
  },
  currentLocationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  currentLocationTitle: {
    fontSize: 15.5,
    fontWeight: '800',
    color: '#0F172A',
  },
  fastestBadge: {
    backgroundColor: '#FF5F00',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  fastestText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  currentLocationSubtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  manualDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  manualDividerText: {
    paddingHorizontal: 10,
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingLeft: 14,
    paddingRight: 8,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    marginLeft: 8,
    fontWeight: '500',
  },
  mapButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mapButtonText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#334155',
  },
  saveAsSection: {
    marginBottom: 20,
  },
  saveAsLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#334155',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  addressTypeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  addressTypeChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: 12,
    gap: 7,
  },
  addressTypeChipActive: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1.5,
    borderColor: '#FF5F00',
  },
  addressTypeChipInactive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  addressTypeText: {
    fontSize: 13,
    fontWeight: '700',
  },
  addressTypeTextActive: {
    color: '#FF5F00',
  },
  addressTypeTextInactive: {
    color: '#64748B',
  },
  addressDetailsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  addressDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  addressDetailsTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: 0.5,
  },
  verifiedBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  greenDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0D9488',
  },
  verifiedBadgeText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0D9488',
  },
  fieldGroup: {
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  fieldInput: {
    height: 48,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 14,
    fontSize: 13.5,
    fontWeight: '500',
    color: '#0F172A',
  },
  twoColRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 14,
  },
  halfField: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FF5F00',
  },
  checkboxUnchecked: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12,
    color: '#334155',
    lineHeight: 17,
    fontWeight: '500',
  },
  privacyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    padding: 12,
    gap: 10,
    marginBottom: 18,
  },
  privacyText: {
    flex: 1,
    fontSize: 11.5,
    color: '#64748B',
    lineHeight: 17,
  },
  privacyBold: {
    fontWeight: '700',
    color: '#334155',
  },
  confirmButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#FF5F00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#FF5F00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 4,
    marginBottom: 12,
  },
  confirmButtonText: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  settingsFooterNote: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 10,
  },
});
