import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FeedScreen } from '../screens/feed/FeedScreen';
import { UploadPhotoScreen } from '../screens/photo/UploadPhotoScreen';
import { VideoScreen } from '../screens/video/VideoScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { colors, fontSize, radius } from '../theme';
import type { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

type IconName = keyof typeof Ionicons.glyphMap;

const tabs: { name: keyof MainTabParamList; label: string; icon: IconName; iconFocused: IconName }[] = [
  { name: 'Feed', label: 'Jardim', icon: 'leaf-outline', iconFocused: 'leaf' },
  { name: 'UploadPhoto', label: 'Foto', icon: 'camera-outline', iconFocused: 'camera' },
  { name: 'RecordVideo', label: 'Vídeo', icon: 'videocam-outline', iconFocused: 'videocam' },
  { name: 'Profile', label: 'Perfil', icon: 'person-outline', iconFocused: 'person' },
];

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabActive,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopWidth: 0,
          paddingTop: 8,
          height: 88,
          borderTopLeftRadius: radius.xl,
          borderTopRightRadius: radius.xl,
          shadowColor: '#6B5B7A',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 8,
        },
        tabBarLabelStyle: { fontSize: fontSize.xs, fontWeight: '500' },
      }}
    >
      {tabs.map(({ name, label, icon, iconFocused }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={
            name === 'Feed' ? FeedScreen
            : name === 'UploadPhoto' ? UploadPhotoScreen
            : name === 'RecordVideo' ? VideoScreen
            : ProfileScreen
          }
          options={{
            tabBarLabel: label,
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons name={focused ? iconFocused : icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
}
