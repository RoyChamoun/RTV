import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import News from '../screens/home/News';
import AboutUs from '../screens/aboutus/AboutUs';
const homeIcon = require('../assets/news-report.png');
const profileIcon = require('../assets/profile.png');

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const DrawerButton = () => (
    <TouchableOpacity onPress={openDrawer}>
      <Image
        source={require('../assets/bars.png')}
        style={{height: 20, width: 19, marginLeft: 10}}
      />
    </TouchableOpacity>
  );
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarIcon: ({color, size}) => {
          let iconName: ImageSourcePropType;

          switch (route.name) {
            case 'Home':
              iconName = homeIcon;
              break;
            case 'AboutUs':
              iconName = profileIcon;
              break;
            default:
              iconName = homeIcon;
          }

          return (
            <Image
              source={iconName}
              style={{width: size, height: size, tintColor: color}}
              resizeMode="contain"
            />
          );
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: '#f0f0f0',
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#8e8e93',
      })}
      initialRouteName="News">
      <Tab.Screen
        name="News"
        component={News}
        options={{headerLeft: DrawerButton}}
      />

      <Tab.Screen
        name="AboutUs"
        component={AboutUs}
        options={{headerLeft: DrawerButton}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
