import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {ShoppingLists} from './scenes/ShoppingLists';
import {ArchivedShoppingLists} from './scenes/ArchivedShoppingLists';
import {AddShoppingList} from './components/AddShoppingList';
import Colors from './constants/Colors';

const CurrentStack = createStackNavigator();
const ArchivedStack = createStackNavigator();

const Tabs = createBottomTabNavigator();

const CurrentScreen = () => (
  <CurrentStack.Navigator>
    <CurrentStack.Screen
      name={'ShoppingLists'}
      component={ShoppingLists}
      options={{
        title: 'Shopping Lists',
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
      }}
    />
    <CurrentStack.Screen
      name={'AddShoppingList'}
      component={AddShoppingList}
      options={({route}) => ({
        title: route.params.name,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
      })}
    />
  </CurrentStack.Navigator>
);

const ArchivedScreen = () => (
  <ArchivedStack.Navigator>
    <ArchivedStack.Screen
      name={'ArchivedShoppingLists'}
      component={ArchivedShoppingLists}
      options={{
        title: 'Archived Shopping Lists',
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
      }}
    />
    <ArchivedStack.Screen
      name={'AddShoppingList'}
      component={AddShoppingList}
      options={({route}) => ({title: route.params.name})}
    />
  </ArchivedStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <Tabs.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'ShoppingLists') {
            iconName = focused ? 'view-list' : 'view-list-outline';
          } else if (route.name === 'ArchivedShoppingLists') {
            iconName = focused ? 'archive' : 'archive-outline';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.primary,
        inactiveTintColor: 'gray',
        keyboardHidesTabBar: true,
      }}>
      <Tabs.Screen
        name="ShoppingLists"
        component={CurrentScreen}
        options={{title: 'Shopping Lists'}}
      />
      <Tabs.Screen
        name="ArchivedShoppingLists"
        component={ArchivedScreen}
        options={{title: 'Archived Lists'}}
      />
    </Tabs.Navigator>
  </NavigationContainer>
);
