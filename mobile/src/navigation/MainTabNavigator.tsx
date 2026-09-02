import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedScreen } from '../screens/feed/FeedScreen';
import { UploadPhotoScreen } from '../screens/photo/UploadPhotoScreen';
import { VideoScreen } from '../screens/video/VideoScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { FloralTabBar } from '../components/navigation/FloralTabBar';
import type { MainTabParamList } from '../types';

const Tab = createBottomTabNavigator<MainTabParamList>();

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <FloralTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="UploadPhoto" component={UploadPhotoScreen} />
      <Tab.Screen name="RecordVideo" component={VideoScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
