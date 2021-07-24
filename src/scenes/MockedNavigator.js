import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const MockStack = createStackNavigator();

export default ({component, params = {}}) => (
  <NavigationContainer>
    <MockStack.Navigator>
      <MockStack.Screen
        name="MockedScreen"
        component={component}
        initialParams={params}
      />
    </MockStack.Navigator>
  </NavigationContainer>
);
