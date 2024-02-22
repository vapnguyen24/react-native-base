import EncryptedStorage from 'react-native-encrypted-storage';

const Storage = {
  setItem: async (key: string, data: any) => {
    data = typeof data === 'string' ? data : JSON.stringify(data);
    try {
      await EncryptedStorage.setItem(key, data);
    } catch (e) {
      console.error(e);
    }
  },

  getItem: async (key: string) => {
    try {
      let value = (await EncryptedStorage.getItem(key)) + '';
      try {
        return JSON.parse(value);
      } catch (e) {
        return value;
      }
    } catch (e) {
      return null;
    }
  },

  removeItem: async (key: string) => {
    try {
      await EncryptedStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  },
};

export default Storage;
