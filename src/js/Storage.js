export default {
  getPrefix() {
    return 'fleet-';
  },

  setPrefix(id) {
    return this.getPrefix() + id;
  },

  async getItem(id) {
    const storageId = this.setPrefix(id);

    return browser.storage.local.get(storageId)
      .then((item) => (item[storageId] ? item[storageId] : false));
  },

  removeItem(id) {
    browser.storage.local.remove(this.setPrefix(id));
  },

  setItem(id, color) {
    const key = this.setPrefix(id);
    browser.storage.local.set({ [key]: color });
  },

  async clearAllItems() {
    browser.storage.local.get().then((items) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key] of Object.entries(items)) {
        if (key.includes(this.getPrefix())) {
          browser.storage.local.remove(key);
        }
      }
    });
  },
};
