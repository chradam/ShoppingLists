import React, {useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../constants/Colors';

export const AddProduct = props => {
  const [inputText, setInputText] = useState(null);

  const addPress = () => {
    if (inputText === null) {
      Alert.alert('Error', 'Please input product');
    } else {
      props.onProductAdd(inputText);
      setInputText(null);
    }
  };

  return (
    <View style={styles.footer}>
      <View style={styles.inputContainer}>
        <TextInput
          value={inputText}
          placeholder="Add product"
          onChangeText={text => setInputText(text.trim())}
        />
      </View>
      <TouchableOpacity onPress={addPress}>
        <View style={styles.iconContainer}>
          <Icon name="add" color="white" size={20} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 0,
  },
  inputContainer: {
    height: 50,
    paddingHorizontal: 20,
    elevation: 40,
    backgroundColor: '#fff',
    flex: 1,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: Colors.primary,
    elevation: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
