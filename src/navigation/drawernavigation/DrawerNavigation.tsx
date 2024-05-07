import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Image, TouchableOpacity, Text, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {resetAuthState} from '../../redux/authSlice';
import LinearGradient from 'react-native-linear-gradient';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import TabNavigator from '../TabNavigator';
import Saved from '../../screens/saved/Saved';
import styles from './DrawerNavigationStyles';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'OK', onPress: () => dispatch(resetAuthState())},
      ],
      {cancelable: false},
    );
  };

  return (
    <LinearGradient colors={['#3EA1FF', '#7CCAFF']} style={styles.gradient}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/user.png')}
            style={styles.profileImage}
          />
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.drawerItem, styles.logoutButton]}>
            <Image
              source={require('../../assets/logout.png')}
              style={[styles.icon, {tintColor: 'white'}]}
            />
            <Text style={[styles.label, {color: 'white'}]}>Logout</Text>
          </TouchableOpacity>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerTitleAlign: 'center',
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: 'white',
        drawerStyle: {backgroundColor: 'transparent', width: 280},
        drawerItemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Image
              source={require('../../assets/home.png')}
              style={[styles.icon, {tintColor: focused ? 'black' : 'white'}]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Saved"
        component={Saved}
        options={{
          drawerIcon: ({focused}) => (
            <Image
              source={require('../../assets/save.png')}
              style={[styles.icon, {tintColor: focused ? 'black' : 'white'}]}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
