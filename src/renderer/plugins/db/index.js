const db = require('electron-db');

function DB() {
  this.init = () => {
    db.createTable('configs', () => {});
  };

  this.deleteConfig = (key) => {
    if ((key || '') === '') {
      return;
    }

    db.deleteRow('configs', { key }, () => {});
  };

  this.setConfig = (key, value) => {
    if ((key || '') === '') {
      return;
    }

    db.getRows('configs', { key }, (success, result) => {
      if (success === false) {
        return;
      }
      if (result.length) {
        db.updateRow('configs', { key }, { value }, () => {});
      } else {
        db.insertTableContent('configs', {
          key,
          value,
        }, () => {});
      }
    });
  };

  this.getConfig = (key, defaultValue) => {
    let value = defaultValue || null;
    db.getRows('configs', { key }, (success, result) => {
      if (success && result.length) {
        [{ value }] = result;
      }
    });
    return value;
  };
}

export default {
  install(Vue) {
    const db = new DB();
    db.init();
    Vue.prototype.$db = db;
  },
};
