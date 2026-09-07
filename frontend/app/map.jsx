import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import * as Location from 'expo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomNav } from '../components/BottomNav';
import { BrandTitle } from '../components/BrandHeader';
import {
  SearchIcon,
  LightningIcon,
  StarIcon,
  MapPinIcon,
  PhoneIcon,
  TargetGpsIcon,
  CheckIcon,
  BellIcon,
  ChevronDownIcon,
} from '../components/Icons';

const { width } = Dimensions.get('window');

// Fallback initial coordinates (Visakhapatnam region)
const INITIAL_LAT = 17.6868;
const INITIAL_LNG = 83.2185;

// Base technician templates
const BASE_WORKERS = [
  {
    id: '1',
    name: 'Ramesh Kumar',
    role: 'Certified Master Electrician',
    category: 'electrician',
    rating: '4.9',
    reviews: '324 reviews',
    fee: '₹199',
    eta: '10 mins',
    distance: '0.6 km',
    dLat: 0.0035,
    dLng: -0.0030,
    status: 'Ready to Dispatch',
    image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    tags: ['Short Circuit Fix', 'MCB & Wiring', 'Switchboard'],
  },
  {
    id: '2',
    name: 'Suresh Patil',
    role: 'Senior Leak Specialist & Plumber',
    category: 'plumber',
    rating: '4.8',
    reviews: '198 reviews',
    fee: '₹149',
    eta: '8 mins',
    distance: '0.4 km',
    dLat: -0.0025,
    dLng: 0.0028,
    status: 'Available Now',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    tags: ['Pipe Leak Repair', 'Tap Installation', 'Drainage'],
  },
  {
    id: '3',
    name: 'Arvind Verma',
    role: 'Certified AC & Cooling Engineer',
    category: 'electrician',
    rating: '4.9',
    reviews: '412 reviews',
    fee: '₹249',
    eta: '15 mins',
    distance: '1.0 km',
    dLat: 0.0048,
    dLng: 0.0038,
    status: 'Ready to Dispatch',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    tags: ['Gas Refill', 'Compressor Check', 'Deep Jet Clean'],
  },
  {
    id: '4',
    name: 'Karthik Rao',
    role: 'Master Carpenter & Woodwork',
    category: 'carpenter',
    rating: '4.7',
    reviews: '142 reviews',
    fee: '₹179',
    eta: '18 mins',
    distance: '1.3 km',
    dLat: -0.0055,
    dLng: -0.0035,
    status: 'On Duty',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    tags: ['Door Alignment', 'Locks & Latches', 'Furniture Fix'],
  },
  {
    id: '5',
    name: 'Priya Sharma',
    role: 'Deep Cleaning & Sanitization Lead',
    category: 'cleaning',
    rating: '4.95',
    reviews: '280 reviews',
    fee: '₹299',
    eta: '12 mins',
    distance: '0.8 km',
    dLat: -0.0018,
    dLng: 0.0050,
    status: 'Ready to Dispatch',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tags: ['Kitchen Deep Clean', 'Bathroom Sanitize', 'Full Home'],
  },
];

function buildWorkers(lat, lng, locality) {
  return BASE_WORKERS.map((w) => ({
    ...w,
    lat: lat + w.dLat,
    lng: lng + w.dLng,
    address: `Near ${locality}`,
  }));
}

const INITIAL_WORKERS = buildWorkers(INITIAL_LAT, INITIAL_LNG, 'Current Area');

const MAP_HTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" />
  <style>
    * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
    html, body, #map {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: #e5edf5;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
    }
    .leaflet-control-attribution { display: none !important; }

    /* Worker Pin Styles */
    .worker-pin {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transform: translate3d(0,0,0);
      transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .worker-pin:active {
      transform: scale(1.18);
    }
    .worker-pin.selected .avatar-circle {
      border-color: #10B981;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.4), 0 6px 14px rgba(0,0,0,0.35);
    }
    .worker-pin.selected .eta-bubble {
      background: #10B981;
    }
    .eta-bubble {
      background: #141A39;
      color: #FFFFFF;
      font-size: 10.5px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 9px;
      margin-bottom: 3px;
      white-space: nowrap;
      box-shadow: 0 3px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      gap: 4px;
      pointer-events: none;
    }
    .eta-dot { width: 6px; height: 6px; border-radius: 50%; background: #10B981; }
    .avatar-circle {
      width: 44px;
      height: 44px;
      border-radius: 22px;
      border: 3px solid #FF5F00;
      background: #FFFFFF;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(255,95,0,0.45);
    }
    .avatar-circle img { width: 100%; height: 100%; object-fit: cover; }

    /* User Pin Styles */
    .user-pin {
      display: flex;
      flex-direction: column;
      align-items: center;
      pointer-events: none;
    }
    .user-pulse {
      width: 48px;
      height: 48px;
      border-radius: 24px;
      background: rgba(255, 95, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: pulseAnim 2s infinite ease-out;
    }
    @keyframes pulseAnim {
      0% { transform: scale(0.85); opacity: 0.9; }
      50% { transform: scale(1.2); opacity: 0.45; }
      100% { transform: scale(0.85); opacity: 0.9; }
    }
    .user-dot {
      width: 18px;
      height: 18px;
      border-radius: 9px;
      background: #FF5F00;
      border: 3.5px solid #FFFFFF;
      box-shadow: 0 2px 8px rgba(0,0,0,0.4);
    }
    .user-label {
      background: #141A39;
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 800;
      padding: 3px 9px;
      border-radius: 7px;
      margin-top: 3px;
      white-space: nowrap;
      box-shadow: 0 2px 6px rgba(0,0,0,0.3);
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>
  <script>
    var currentLat = ${INITIAL_LAT};
    var currentLng = ${INITIAL_LNG};
    var allWorkers = ${JSON.stringify(INITIAL_WORKERS)};
    var workerMarkers = {};
    var selectedWorkerId = null;
    var map = null;
    var userMarker = null;

    window.onerror = function(msg, url, line) {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'LOG', text: 'Error: ' + msg + ' (' + line + ')' }));
      }
    };

    function startApp() {
      if (typeof L === 'undefined') {
        setTimeout(startApp, 100);
        return;
      }
      initMap();
    }

    function initMap() {
      if (map) return;

      map = L.map('map', {
        center: [currentLat, currentLng],
        zoom: 15,
        zoomControl: false,
        tap: false
      });

      // Primary: OpenStreetMap standard tiles
      var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        subdomains: ['a', 'b', 'c']
      });

      // Automatic fallback if OSM tile times out or fails on mobile network
      tileLayer.on('tileerror', function(err) {
        if (err && err.tile) {
          err.tile.src = 'https://a.basemaps.cartocdn.com/rastertiles/voyager/' + err.coords.z + '/' + err.coords.x + '/' + err.coords.y + '.png';
        }
      });
      tileLayer.addTo(map);

      // User Marker
      var userIcon = L.divIcon({
        className: '',
        html: '<div class="user-pin"><div class="user-pulse"><div class="user-dot"></div></div><div class="user-label">📍 You are here</div></div>',
        iconSize: [90, 90],
        iconAnchor: [45, 45]
      });
      userMarker = L.marker([currentLat, currentLng], { icon: userIcon, zIndexOffset: 1000 }).addTo(map);

      // Render initial workers
      renderWorkers(allWorkers);

      // Apply any location detected before Leaflet finished loading
      if (window._pendingLoc) {
        window.setUserLocation(window._pendingLoc.lat, window._pendingLoc.lng, window._pendingLoc.workers);
        window._pendingLoc = null;
      }

      map.on('click', function(e) {
        selectedWorkerId = null;
        renderWorkers(allWorkers);
        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'DESELECT' }));
        }
      });

      setTimeout(function() { if (map) map.invalidateSize(); }, 250);
      setTimeout(function() { if (map) map.invalidateSize(); }, 600);

      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'MAP_READY' }));
      }
    }

    function renderWorkers(workers) {
      if (!map) return;
      Object.keys(workerMarkers).forEach(function(k) {
        map.removeLayer(workerMarkers[k]);
      });
      workerMarkers = {};

      workers.forEach(function(w) {
        var isSelected = (w.id === selectedWorkerId);
        var icon = L.divIcon({
          className: '',
          html: '<div class="worker-pin ' + (isSelected ? 'selected' : '') + '" onclick="onWorkerTap(\\'' + w.id + '\\', event)"><div class="eta-bubble"><div class="eta-dot"></div>' + w.distance + ' • ' + w.eta + '</div><div class="avatar-circle"><img src="' + w.image + '" alt="' + w.name + '" /></div></div>',
          iconSize: [95, 80],
          iconAnchor: [47, 60]
        });
        var marker = L.marker([w.lat, w.lng], { icon: icon, zIndexOffset: isSelected ? 900 : 500 }).addTo(map);
        workerMarkers[w.id] = marker;
      });
    }

    window.onWorkerTap = function(id, evt) {
      if (evt) evt.stopPropagation();
      selectedWorkerId = id;
      var worker = allWorkers.find(function(w) { return w.id === id; });
      if (worker && map) {
        map.flyTo([worker.lat, worker.lng], 16, { animate: true, duration: 0.6 });
      }
      renderWorkers(allWorkers);
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'SELECT_WORKER', id: id }));
      }
    };

    window.setUserLocation = function(lat, lng, workers) {
      currentLat = lat;
      currentLng = lng;
      if (!map) {
        window._pendingLoc = { lat: lat, lng: lng, workers: workers };
        return;
      }
      if (userMarker) {
        userMarker.setLatLng([lat, lng]);
      }
      if (workers && workers.length) {
        allWorkers = workers;
        renderWorkers(allWorkers);
      }
      map.setView([lat, lng], 15);
      setTimeout(function() { if (map) map.invalidateSize(); }, 200);
    };

    window.zoomIn = function() { if (map) map.zoomIn(); };
    window.zoomOut = function() { if (map) map.zoomOut(); };
    window.recenterMap = function() {
      if (map) map.flyTo([currentLat, currentLng], 15, { animate: true, duration: 0.8 });
    };

    window.filterWorkers = function(category, query) {
      var filtered = allWorkers.filter(function(w) {
        var matchesCat = (category === 'all' || w.category === category);
        var q = (query || '').toLowerCase().trim();
        var matchesQ = !q || w.name.toLowerCase().includes(q) || w.role.toLowerCase().includes(q);
        return matchesCat && matchesQ;
      });
      renderWorkers(filtered);
    };

    window.setSelectedWorker = function(id) {
      selectedWorkerId = id;
      renderWorkers(allWorkers);
    };

    // Safe execution after DOM is ready
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      startApp();
    } else {
      window.addEventListener('DOMContentLoaded', startApp);
    }
  </script>
</body>
</html>
`;

export default function MapScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const mapRef = useRef(null);

  const [localityName, setLocalityName] = useState('Pedagantyada, Gajuwaka');
  const [coords, setCoords] = useState({ lat: INITIAL_LAT, lng: INITIAL_LNG });
  const [workers, setWorkers] = useState(INITIAL_WORKERS);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);

  const filters = [
    { id: 'all', label: 'All Pros', count: workers.length },
    { id: 'electrician', label: 'Electricians', count: 2 },
    { id: 'plumber', label: 'Plumbers', count: 1 },
    { id: 'carpenter', label: 'Carpenters', count: 1 },
    { id: 'cleaning', label: 'Cleaning', count: 1 },
  ];

  // Auto-detect Real User GPS Location
  useEffect(() => {
    let isMounted = true;

    async function detectUserLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const loc = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

          if (!isMounted || !loc?.coords) return;

          const { latitude, longitude } = loc.coords;
          setCoords({ lat: latitude, lng: longitude });

          // Reverse geocode
          const reverse = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });

          let locationLabel = 'Current Location';
          if (reverse && reverse[0]) {
            const p = reverse[0];
            const parts = [
              p.district || p.subregion || p.name,
              p.city,
            ].filter(Boolean);
            if (parts.length > 0) {
              locationLabel = parts.join(', ');
            }
          }
          setLocalityName(locationLabel);

          // Update workers around real coordinates
          const updatedWorkers = buildWorkers(latitude, longitude, locationLabel);
          setWorkers(updatedWorkers);

          // Update Leaflet map inside WebView
          if (mapRef.current) {
            const js = `window.setUserLocation && window.setUserLocation(${latitude}, ${longitude}, ${JSON.stringify(
              updatedWorkers
            )}); true;`;
            mapRef.current.injectJavaScript(js);
          }
        }
      } catch (err) {
        console.log('Location detection note:', err);
      }
    }

    detectUserLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedWorker = selectedWorkerId
    ? workers.find((w) => w.id === selectedWorkerId)
    : null;

  const handleMapMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'SELECT_WORKER') {
        setSelectedWorkerId(data.id);
      } else if (data.type === 'DESELECT') {
        setSelectedWorkerId(null);
      } else if (data.type === 'LOG') {
        console.log('Leaflet Log:', data.text);
      }
    } catch (e) {
      console.warn('Map message error:', e);
    }
  };

  const handleSelectFilter = (filterId) => {
    setSelectedFilter(filterId);
    if (mapRef.current) {
      const js = `window.filterWorkers && window.filterWorkers('${filterId}', '${searchQuery.replace(/'/g, "\\'")}'); true;`;
      mapRef.current.injectJavaScript(js);
    }
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
    if (mapRef.current) {
      const js = `window.filterWorkers && window.filterWorkers('${selectedFilter}', '${text.replace(/'/g, "\\'")}'); true;`;
      mapRef.current.injectJavaScript(js);
    }
  };

  const handleSearchSubmit = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}&limit=1`,
        {
          headers: { 'User-Agent': 'SahahKaryaApp/1.0' },
        }
      );
      const data = await res.json();
      if (data && data[0]) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        if (mapRef.current) {
          mapRef.current.injectJavaScript(
            `map.flyTo([${lat}, ${lon}], 15, { animate: true, duration: 1 }); true;`
          );
        }
      }
    } catch (err) {
      console.warn('Place search error:', err);
    }
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.injectJavaScript('window.zoomIn && window.zoomIn(); true;');
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.injectJavaScript('window.zoomOut && window.zoomOut(); true;');
    }
  };

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.injectJavaScript('window.recenterMap && window.recenterMap(); true;');
    }
  };

  const handleCloseProfile = () => {
    setSelectedWorkerId(null);
    if (mapRef.current) {
      mapRef.current.injectJavaScript('window.setSelectedWorker && window.setSelectedWorker(null); true;');
    }
  };

  const topInset = Math.max(
    insets.top,
    Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 16
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

      {/* 1. TRUE FULL SCREEN MAP - Edge to Edge Background */}
      <WebView
        ref={mapRef}
        originWhitelist={['*']}
        source={{
          html: MAP_HTML,
          baseUrl: 'https://unpkg.com',
        }}
        style={StyleSheet.absoluteFillObject}
        onMessage={handleMapMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        overScrollMode="never"
        allowsInlineMediaPlayback={true}
        geolocationEnabled={true}
        mixedContentMode="always"
      />

      {/* 2. Top Floating Header Card (Brand + Real Location + Live Search) */}
      <View style={[styles.topFloatingCard, { paddingTop: topInset + 6 }]}>
        <View style={styles.headerTopRow}>
          <View style={styles.brandRow}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <BrandTitle fontSize={18} />
          </View>

          <TouchableOpacity
            style={styles.locationPill}
            activeOpacity={0.7}
            onPress={handleRecenter}
          >
            <MapPinIcon size={12} color="#FF5F00" strokeWidth={2.4} />
            <Text style={styles.locationText} numberOfLines={1}>
              {localityName}
            </Text>
            <ChevronDownIcon size={11} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
            <BellIcon size={18} color="#1E293B" strokeWidth={2} />
            <View style={styles.unreadDot} />
          </TouchableOpacity>
        </View>

        {/* Floating Search Bar */}
        <View style={styles.searchBar}>
          <SearchIcon size={16} color="#FF5F00" />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search street or pro in ${localityName.split(',')[0]}...`}
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={handleSearchChange}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => handleSearchChange('')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text style={styles.clearSearchText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 3. Floating Horizontal Category Filter Bar */}
      <View style={[styles.filterBarContainer, { top: topInset + 116 }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterBarScroll}
        >
          {filters.map((f) => {
            const isSelected = selectedFilter === f.id;
            return (
              <TouchableOpacity
                key={f.id}
                style={[
                  styles.filterChip,
                  isSelected && styles.filterChipActive,
                ]}
                onPress={() => handleSelectFilter(f.id)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    isSelected && styles.filterChipTextActive,
                  ]}
                >
                  {f.label}
                </Text>
                <View
                  style={[
                    styles.filterBadge,
                    isSelected && styles.filterBadgeActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterBadgeText,
                      isSelected && styles.filterBadgeTextActive,
                    ]}
                  >
                    {f.count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* 4. Floating Zoom & GPS Controls (Right Edge) */}
      <View style={styles.floatingControls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleZoomIn}
          activeOpacity={0.8}
        >
          <Text style={styles.zoomButtonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleZoomOut}
          activeOpacity={0.8}
        >
          <Text style={styles.zoomButtonText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={handleRecenter}
          activeOpacity={0.8}
        >
          <TargetGpsIcon size={18} color="#FF5F00" strokeWidth={2.4} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.flashButton]}
          activeOpacity={0.8}
          onPress={() => {
            if (workers.length > 0) {
              const firstId = workers[0].id;
              setSelectedWorkerId(firstId);
              if (mapRef.current) {
                mapRef.current.injectJavaScript(
                  `window.onWorkerTap && window.onWorkerTap('${firstId}'); true;`
                );
              }
            }
          }}
        >
          <LightningIcon size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* 5. When NO Worker Selected: Pure map with clean minimal guide pill */}
      {!selectedWorker && (
        <View style={styles.hintPill}>
          <MapPinIcon size={12} color="#FF5F00" strokeWidth={2.4} />
          <Text style={styles.hintText}>
            Drag map to explore • Tap any worker pin to view profile
          </Text>
        </View>
      )}

      {/* 6. When Worker Selected: Interactive Profile Bottom Sheet */}
      {selectedWorker && (
        <View style={styles.bottomSheetCard}>
          <View style={styles.sheetHeaderRow}>
            <View style={styles.sheetHandle} />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseProfile}
              activeOpacity={0.7}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Worker Top Row */}
          <View style={styles.sheetTopRow}>
            <View style={styles.sheetAvatarWrap}>
              <Image
                source={{ uri: selectedWorker.image }}
                style={styles.sheetAvatar}
              />
              <View style={styles.sheetOnlineDot} />
            </View>

            <View style={styles.sheetInfoCol}>
              <View style={styles.sheetNameRow}>
                <Text style={styles.sheetName}>{selectedWorker.name}</Text>
                <View style={styles.verifiedGreenBadge}>
                  <CheckIcon size={9} color="#FFFFFF" strokeWidth={3} />
                </View>
              </View>

              <Text style={styles.sheetRole}>{selectedWorker.role}</Text>

              <View style={styles.sheetRatingRow}>
                <StarIcon size={12} color="#F59E0B" />
                <Text style={styles.sheetRatingBold}>
                  {selectedWorker.rating}
                </Text>
                <Text style={styles.sheetReviewsText}>
                  ({selectedWorker.reviews})
                </Text>
              </View>
            </View>

            <View style={styles.sheetFeeCol}>
              <Text style={styles.sheetFeeValue}>{selectedWorker.fee}</Text>
              <Text style={styles.sheetFeeLabel}>Base Visit Fee</Text>
            </View>
          </View>

          {/* Real Address & Arrival ETA Row */}
          <View style={styles.addressBox}>
            <MapPinIcon size={13} color="#FF5F00" strokeWidth={2.4} />
            <View style={styles.addressTextCol}>
              <Text style={styles.addressTitle}>Nearby Location</Text>
              <Text style={styles.addressSub} numberOfLines={1}>
                {selectedWorker.address} ({selectedWorker.distance})
              </Text>
            </View>
            <View style={styles.etaBadge}>
              <Text style={styles.etaBadgeText}>{selectedWorker.eta}</Text>
            </View>
          </View>

          {/* Skill Tags */}
          <View style={styles.sheetTagRow}>
            {selectedWorker.tags.map((tag, i) => (
              <View key={i} style={styles.sheetTagPill}>
                <Text style={styles.sheetTagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Action Buttons */}
          <View style={styles.sheetActionsRow}>
            <TouchableOpacity
              style={styles.sheetCallButton}
              activeOpacity={0.8}
            >
              <PhoneIcon size={18} color="#1E293B" strokeWidth={2.2} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetDispatchButton}
              onPress={() => router.push('/bookings')}
              activeOpacity={0.88}
            >
              <LightningIcon size={16} color="#FFFFFF" />
              <Text style={styles.sheetDispatchText}>
                Request Instant Dispatch ({selectedWorker.fee})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 7. Bottom Navigation Floating Bar */}
      <BottomNav activeTab="map" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EDF5',
    position: 'relative',
  },
  fullScreenWebView: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#E5EDF5',
  },
  topFloatingCard: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 22,
    paddingHorizontal: 14,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 30,
    borderWidth: 1,
    borderColor: 'rgba(241, 245, 249, 0.8)',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logo: {
    width: 24,
    height: 24,
  },
  locationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
    maxWidth: 150,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  locationText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  bellButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  unreadDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#FF5F00',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 42,
    backgroundColor: '#F1F5F9',
    borderRadius: 21,
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 12.5,
    color: '#0F172A',
    marginLeft: 7,
    fontWeight: '500',
  },
  clearSearchText: {
    fontSize: 13,
    color: '#94A3B8',
    paddingHorizontal: 4,
    fontWeight: '700',
  },
  filterBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 25,
  },
  filterBarScroll: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    gap: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 3,
  },
  filterChipActive: {
    backgroundColor: '#141A39',
  },
  filterChipText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#334155',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  filterBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 8,
  },
  filterBadgeActive: {
    backgroundColor: '#FF5F00',
  },
  filterBadgeText: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#64748B',
  },
  filterBadgeTextActive: {
    color: '#FFFFFF',
  },
  floatingControls: {
    position: 'absolute',
    right: 14,
    top: '38%',
    gap: 8,
    zIndex: 25,
  },
  controlButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 5,
  },
  zoomButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    lineHeight: 24,
  },
  flashButton: {
    backgroundColor: '#FF5F00',
  },
  hintPill: {
    position: 'absolute',
    bottom: 92,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(20, 26, 57, 0.94)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 20,
    maxWidth: width - 36,
  },
  hintText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bottomSheetCard: {
    position: 'absolute',
    bottom: 88,
    left: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    zIndex: 35,
  },
  sheetHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 6,
  },
  sheetHandle: {
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: -6,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
  },
  sheetTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sheetAvatarWrap: {
    position: 'relative',
    marginRight: 10,
  },
  sheetAvatar: {
    width: 46,
    height: 46,
    borderRadius: 14,
  },
  sheetOnlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  sheetInfoCol: {
    flex: 1,
  },
  sheetNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  sheetName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  verifiedGreenBadge: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetRole: {
    fontSize: 11.5,
    color: '#64748B',
    marginTop: 1,
  },
  sheetRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 3,
  },
  sheetRatingBold: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0F172A',
  },
  sheetReviewsText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  sheetFeeCol: {
    alignItems: 'flex-end',
  },
  sheetFeeValue: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FF5F00',
  },
  sheetFeeLabel: {
    fontSize: 9.5,
    color: '#94A3B8',
    marginTop: 1,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    gap: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  addressTextCol: {
    flex: 1,
  },
  addressTitle: {
    fontSize: 9.5,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  addressSub: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 1,
  },
  etaBadge: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  etaBadgeText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#059669',
  },
  sheetTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginBottom: 10,
  },
  sheetTagPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  sheetTagText: {
    fontSize: 10.5,
    color: '#475569',
    fontWeight: '600',
  },
  sheetActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sheetCallButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetDispatchButton: {
    flex: 1,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FF5F00',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#FF5F00',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  sheetDispatchText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
