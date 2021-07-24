import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

import {AddProduct} from './AddProduct';
import {ProductItem} from './ProductItem';
import Colors from '../constants/Colors';
import {LIST_STATUS, LIST_MODE} from '../config/Settings';
import model from '../model/Model';

export const AddShoppingList = ({navigation, route}) => {
  const {mode, paramList} = route.params;

  const initialState = {
    titleInput: null,
    products: [],
  };
  const [{titleInput, products}, setList] = useState(initialState);

  useEffect(() => {
    if (mode === LIST_MODE.edit || mode === LIST_MODE.archived) {
      setList(prevState => ({...prevState, titleInput: paramList.title}));
      setList(prevState => ({...prevState, products: paramList.products}));
    }
  }, [paramList, mode]);

  // Pass this prop to AddProduct
  const onProductAdd = text => {
    const productItem = {
      id: uuidv4(),
      title: text,
      completed: false,
    };
    setList(prevState => ({
      ...prevState,
      products: [...products, productItem],
    }));
  };

  const toggleProductComplete = ProductId => {
    const newProductItem = products.map(item => {
      if (item.id === ProductId) {
        return {...item, completed: !item.completed};
      }
      return item;
    });
    setList(prevState => ({...prevState, products: newProductItem}));
  };

  const deleteProduct = ProductId => {
    const newProductsItem = products.filter(item => item.id !== ProductId);
    setList(prevState => ({...prevState, products: newProductsItem}));
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <TextInput
          placeholder="Title"
          value={titleInput}
          onChangeText={title =>
            setList(prevState => ({...prevState, titleInput: title}))
          }
          maxLength={23}
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            flex: 1,
          }}
          editable={mode !== LIST_MODE.archived}
        />
        {mode !== LIST_MODE.archived && (
          <TouchableOpacity
            onPress={() => {
              const listItem = {
                id: mode === LIST_MODE.edit ? paramList.id : uuidv4(),
                date: new Date(),
                title: titleInput,
                products: products,
                status: LIST_STATUS.active,
              };

              model.createShoppingList(listItem);
              navigation.goBack();
            }}>
            <View style={[styles.saveIcon, {backgroundColor: Colors.primary}]}>
              <Icon name="save" size={20} color="white" />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{padding: 20}}
          data={products}
          renderItem={({item}) => (
            <ProductItem
              product={item}
              toggleProductComplete={toggleProductComplete}
              deleteProduct={deleteProduct}
              mode={mode}
            />
          )}
        />
      </View>
      {mode !== LIST_MODE.archived && (
        <AddProduct onProductAdd={onProductAdd} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  saveIcon: {
    height: 50,
    width: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 3,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
