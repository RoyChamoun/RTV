import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {selectIsAuthenticated} from '../redux/authSlice';

import MainNavigator from './MainNavigator';
import DrawerNavigator from './drawernavigation/DrawerNavigation'; // Ensure you have a DrawerNavigator defined

const Navigation = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <NavigationContainer>
      {isAuthenticated ? <DrawerNavigator /> : <MainNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
