import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DataStorage {
  createData = async (key, dataString) => {
    try {
      await AsyncStorage.setItem(key, dataString);
    } catch (error) {
      console.log('Error saving data');
    }
  };

  readAllData = filter => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getAllKeys((err, keys) => {
        AsyncStorage.multiGet(keys, (err, result) => {
          let shoppingLists = [];

          result.map(item => {
            //item[0] = key | item[1] = value
            const list = JSON.parse(item[1]);

            if (filter !== undefined && list.status === filter) {
              shoppingLists.push(list);
            } else if (filter === undefined) {
              shoppingLists.push(list);
            }
          });
          resolve(shoppingLists);
        });
      });
    });
  };

  deleteShoppingList = key => {
    return new Promise((resolve, reject) => {
      AsyncStorage.removeItem(key, err => {
        if (err) {
          reject(err);
        }
        resolve('done');
      });
    });
  };
}
