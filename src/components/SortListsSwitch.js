import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SwitchSelector from 'react-native-switch-selector';

export const SortListsSwitch = props => {
  const sortOptions = [
    {
      label: 'DESC',
      value: 'desc',
      customIcon: (
        <MaterialCommunityIcons
          name="sort-descending"
          size={25}
          color={props.sortType === 'desc' ? '#fff' : '#000'}
        />
      ),
    },
    {
      label: 'ASC',
      value: 'asc',
      customIcon: (
        <MaterialCommunityIcons
          name="sort-ascending"
          size={25}
          color={props.sortType === 'asc' ? '#fff' : '#000'}
        />
      ),
    },
  ];

  return (
    <SwitchSelector
      options={sortOptions}
      hasPadding
      buttonColor={'deepskyblue'}
      initial={0}
      valuePadding={2}
      onPress={value => props.setSortType(value)}
    />
  );
};
