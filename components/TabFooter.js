import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainScreenCheck from './ScanScreen/MainScreenCheck';
import HistoryCheck from './ChecksScreen/HistoryCheck';
import {Provider} from 'react-redux';
import store from '../store';
import ProfileMain from './ProfileScreen/ProfileMain';

const styles = StyleSheet.create({
  img: {
    width: 25,
    height: 25,
  },
});

const Tab = createBottomTabNavigator();

const TabFooter = () => {
  function HistoryScreen() {
    return <HistoryCheck />;
  }
  function ScanScreenRoute() {
    return <MainScreenCheck />;
  }
  function ProfileScreen() {
    return <ProfileMain />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator initialRouteName="HistoryScreen">
          <Tab.Screen
            name="HistoryCheck"
            component={HistoryScreen}
            options={{
              tabBarLabel: 'Мои чеки',
              tabBarIcon: () => (
                <Image
                  style={styles.img}
                  source={require('../images/paper.png')}
                />
              ),
            }}
          />
          <Tab.Screen
            name="MainScreenCheck"
            component={ScanScreenRoute}
            options={{
              tabBarLabel: 'Сканирование',
              tabBarIcon: () => (
                <Image
                  style={styles.img}
                  source={require('../images/qr-code.png')}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ProfileMain"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Профиль',
              tabBarIcon: () => (
                <Image
                  style={styles.img}
                  source={require('../images/user.png')}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default TabFooter;
