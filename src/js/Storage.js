export default {
    getPrefix() {
        return 'fleet-';
    },

    setPrefix(id) {
        return this.getPrefix() + id;
    },

    async getItem(id) {  
        let storageId = this.setPrefix(id);

        return browser.storage.local.get(storageId)
            .then((item) => {
                return item[storageId] ? item[storageId] : false;
            });
    },

    removeItem(id) {
        browser.storage.local.remove(this.setPrefix(id))
    },

    setItem(id, color) {
        let key = this.setPrefix(id);
        browser.storage.local.set({ [key] : color })
    },

    async clearAllItems() {
        browser.storage.local.get().then((items) => {
            for (const [key, value] of Object.entries(items)) {
                if (key.includes(this.getPrefix())) {
                    browser.storage.local.remove(key);
                }
            }
        })
    }
};