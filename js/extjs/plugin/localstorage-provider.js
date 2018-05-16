/* source: https://gist.github.com/malteo/1468207 */
/* source2: https://www.sencha.com/forum/archive/index.php/t-102065.html */


Ext.ns('Ext.ux.state');
 
Ext.ux.state.LocalStorageProvider = Ext.extend(Ext.state.Provider, {
	prefix : 'ys-',
    constructor: function (config) {
        Ext.ux.state.LocalStorageProvider.superclass.constructor.call(this);
        Ext.apply(this, config);
        this.store = this.getStorageObject();
        this.state = this.readLocalStorage();
    },
    readLocalStorage: function () {
        var store = this.store,
            i = 0,
            len = store.length,
            prefix = this.prefix,
            prefixLen = prefix.length,
            data = {},
            key;
 
        for (; i < len; ++i) {
            key = store.key(i);
            if (key.substring(0, prefixLen) == prefix) {
                data[key.substr(prefixLen)] = this.decodeValue(store.getItem(key));
            }
        }
 
        return data;
    },
    set: function (name, value) {
        this.clear(name);
        if (typeof value == "undefined" || value === null) {
            return;
        }
        this.store.setItem(this.prefix + name, this.encodeValue(value));
 
        Ext.ux.state.LocalStorageProvider.superclass.set.call(this, name, value);
    },
    clear: function (name) {
        this.store.removeItem(this.prefix + name);
 
        Ext.ux.state.LocalStorageProvider.superclass.clear.call(this, name);
    },
    getStorageObject: function () {
        try {
            var supports = 'localStorage' in window && window['localStorage'] !== null;
            if (supports) {
                return window.localStorage;
            }
        } catch (e) {
            return false;
        }
        throw 'LocalStorage is not supported by the current browser';
    }
});
