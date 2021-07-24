import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useFocusEffect} from '@react-navigation/native';

import {listsStyles} from '../styles';
import {LIST_MODE, LIST_STATUS} from '../config/Settings';
import model from '../model/Model';
import {sortList} from '../utils';
import {SortListsSwitch} from '../components/SortListsSwitch';

export const ArchivedShoppingLists = ({navigation}) => {
  const [archivedShoppingLists, setArchivedShoppingLists] = useState(null);
  const [sortType, setSortType] = useState('desc');

  useFocusEffect(
    useCallback(() => {
      model.readShoppingLists(LIST_STATUS.archived).then(lists => {
        const sortedLists = sortList(lists, sortType);

        setArchivedShoppingLists(
          sortedLists.map((list, index) => ({
            key: `${index}`,
            id: list.id,
            date: list.date,
            title: list.title,
            products: list.products,
            status: list.status,
          })),
        );
      });

      return () => {};
    }, [sortType]),
  );

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const unarchiveRow = async (rowMap, rowKey, list) => {
    closeRow(rowMap, rowKey);
    const newData = [...archivedShoppingLists];
    const prevIndex = archivedShoppingLists.findIndex(
      item => item.key === rowKey,
    );
    newData.splice(prevIndex, 1);
    setArchivedShoppingLists(newData);

    model.updateShoppingList(list, LIST_STATUS.active);
  };

  const deleteRow = (rowMap, rowKey, itemId) => {
    model
      .deleteShoppingList(itemId)
      .then(() => {
        closeRow(rowMap, rowKey);
        const newData = [...archivedShoppingLists];
        const prevIndex = archivedShoppingLists.findIndex(
          item => item.key === rowKey,
        );
        newData.splice(prevIndex, 1);
        setArchivedShoppingLists(newData);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onRowDidOpen = rowKey => {
    // console.log('This row opened', rowKey);
  };

  const onLeftActionStatusChange = rowKey => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = rowKey => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = rowKey => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey);
  };

  const VisibleItem = props => {
    const {
      data,
      rowHeightAnimatedValue,
      removeRow,
      leftActionState,
      rightActionState,
    } = props;

    if (rightActionState) {
      Animated.timing(rowHeightAnimatedValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        removeRow();
      });
    }

    return (
      <Animated.View
        style={[listsStyles.rowFront, {height: rowHeightAnimatedValue}]}>
        <TouchableHighlight
          style={listsStyles.rowFrontVisible}
          onPress={() =>
            navigation.navigate('AddShoppingList', {
              name: 'Archived Shopping List',
              mode: LIST_MODE.archived,
              paramList: data.item,
            })
          }
          underlayColor={'#aaa'}>
          <View>
            <Text style={listsStyles.title} numberOfLines={1}>
              {data.item.title}
            </Text>
            <Text>
              {new Date(data.item.date).toLocaleString('pl-PL', {
                timeZone: 'Europe/Warsaw',
              })}
            </Text>
          </View>
        </TouchableHighlight>
      </Animated.View>
    );
  };

  const renderItem = (data, rowMap) => {
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <VisibleItem
        data={data}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        removeRow={() => deleteRow(rowMap, data.item.key, data.item.id)}
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      leftActionActivated,
      rightActionActivated,
      rowActionAnimatedValue,
      rowHeightAnimatedValue,
      onClose,
      onDelete,
    } = props;

    if (rightActionActivated) {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(rowActionAnimatedValue, {
        toValue: 75,
        useNativeDriver: false,
      }).start();
    }

    return (
      <Animated.View
        style={[listsStyles.rowBack, {height: rowHeightAnimatedValue}]}>
        <Text>Left</Text>
        {!leftActionActivated && (
          <TouchableOpacity
            style={[listsStyles.backRightBtn, listsStyles.backRightBtnLeft]}
            onPress={onClose}>
            <MaterialCommunityIcons
              name="archive-arrow-up-outline"
              size={25}
              style={listsStyles.trash}
              color="#fff"
            />
          </TouchableOpacity>
        )}
        {!leftActionActivated && (
          <Animated.View
            style={[
              listsStyles.backRightBtn,
              listsStyles.backRightBtnRight,
              {
                flex: 1,
                width: rowActionAnimatedValue,
              },
            ]}>
            <TouchableOpacity
              style={[listsStyles.backRightBtn, listsStyles.backRightBtnRight]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  listsStyles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={25}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        )}
      </Animated.View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {
    const rowActionAnimatedValue = new Animated.Value(75);
    const rowHeightAnimatedValue = new Animated.Value(60);

    return (
      <HiddenItemWithActions
        data={data}
        rowMap={rowMap}
        rowActionAnimatedValue={rowActionAnimatedValue}
        rowHeightAnimatedValue={rowHeightAnimatedValue}
        onClose={() => unarchiveRow(rowMap, data.item.key, data.item)}
        onDelete={() => deleteRow(rowMap, data.item.key, data.item.id)}
      />
    );
  };

  return (
    <View style={listsStyles.container}>
      <SortListsSwitch sortType={sortType} setSortType={setSortType} />
      <StatusBar barStyle="dark-content" />
      <SwipeListView
        data={archivedShoppingLists}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-150}
        disableRightSwipe
        onRowDidOpen={onRowDidOpen}
        leftActivationValue={100}
        rightActivationValue={-200}
        leftActionValue={0}
        rightActionValue={-500}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
      />
    </View>
  );
};
