let concatAssets = require('./../js/concatAssets');

class StylePlugin {
    constructor(options) {

    }
    apply(event) {
        event.addListener('before-emit', (config) => {
            concatAssets(config);
        })
    }
}

module.exports = StylePlugin;