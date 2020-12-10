const path = require('path');
const glob = require('glob');

const CONFIG_PATH = path.join(__dirname, '../config');

class App {
  appConfigs = {};

  async init() {
    this.loadConfigFiles(`${CONFIG_PATH}/*.js`, this.appConfigs);
  }

  loadConfigFiles(dir, store, ext = '.js') {
    const files = glob.sync(dir);

    if (files) {
      files.forEach((file) => {
        const filename = path.basename(file, ext);

        store[filename] = require(file);
      });
    }
  }

  getConfig(filename) {
    return this.appConfigs[filename] || {};
  }
}

const app = new App();

module.exports = app;
