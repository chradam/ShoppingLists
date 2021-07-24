import DataStorage from './DataStorage';

class Model {
  constructor() {
    if (!Model.instance) {
      this.dataStorage = new DataStorage();
      Model.instance = this;
    }
    return Model.instance;
  }

  createShoppingList = list => {
    const listString = JSON.stringify(list);
    this.dataStorage.createData(list.id, listString);
  };

  readShoppingLists = filter => {
    return this.dataStorage.readAllData(filter);
  };

  updateShoppingList = (list, status) => {
    list.status = status;
    const listString = JSON.stringify(list);

    this.dataStorage.createData(list.id, listString);
  };

  deleteShoppingList = id => {
    return this.dataStorage.deleteShoppingList(id);
  };
}

const instance = Object.freeze(new Model());
export default instance;
