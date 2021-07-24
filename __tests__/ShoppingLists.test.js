import React from 'react';
import renderer from 'react-test-renderer';
import MockedNavigator from '../src/scenes/MockedNavigator';
import {ShoppingLists} from '../src/scenes/ShoppingLists';
import Colors from '../src/constants/Colors';

test('render', () => {
  const snap = renderer.create(
    <MockedNavigator
      component={ShoppingLists}
      initialParams={{
        title: 'Shopping Lists',
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
      }}
    />,
  );
  expect(snap).toMatchSnapshot();
});
