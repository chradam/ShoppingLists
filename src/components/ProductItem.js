import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {LIST_MODE} from '../config/Settings';
import Colors from '../constants/Colors';

export const ProductItem = props => {
  return (
    <View style={styles.listItem}>
      <TouchableOpacity
        disabled={props.mode === LIST_MODE.archived}
        onPress={() => props.toggleProductComplete(props.product.id)}>
        <View
          style={[
            styles.actionIcon,
            {
              backgroundColor:
                props.mode === LIST_MODE.archived
                  ? 'gray'
                  : props.product?.completed
                  ? 'green'
                  : styles.listItem.backgroundColor,
              borderWidth:
                props.mode === LIST_MODE.archived
                  ? 0
                  : props.product?.completed
                  ? 0
                  : 1,
            },
          ]}>
          {props.product?.completed && (
            <Icon name="done" size={20} color="white" />
          )}
        </View>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 15,
            color: Colors.primary,
            paddingLeft: 20,
            textDecorationLine: props.product?.completed
              ? 'line-through'
              : 'none',
          }}>
          {props.product?.title}
        </Text>
      </View>
      <TouchableOpacity
        disabled={props.mode === LIST_MODE.archived}
        onPress={() => props.deleteProduct(props.product.id)}>
        <View
          style={[
            styles.actionIcon,
            {
              backgroundColor:
                props.mode === LIST_MODE.archived ? 'gray' : 'red',
            },
          ]}>
          <Icon name="delete" size={20} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
  },
});
