const path = require('path');
const fileWriter = require('./fileWriter');
const FileHashHandler = require('./fileHash');

class ConcatAssets {
    constructor(config) {
        this.config = config;
        this.config.modifyModule = {};
        this.init();
    }

    init() {
        let module = this.config.module;
        this.processSize = 0;
        this.start(module);
        this.writeModuleFile();

    }

    writeModuleFile() {
        let url = path.resolve('./', this.config.output.baseDir, 'statics', 'js', 'module.js');
        fileWriter(url, 'window.business = {"modules": ' + JSON.stringify(this.config.modifyModule) + '}');
        let json = FileHashHandler.readFileHash(url);
        this.config.modulePath = ['statics', 'js', 'module.js?' + json.hash].join('/');
    }

    start(module) {
        this.array = [];
        Object.keys(module).forEach((key) => {
            let json = module[key];
            let css = json.css,
                js = json.js;
            this.array.push({
                css: css,
                js: js,
                key: key
            })
        });
        this.executeProcess();
    }

    executeProcess() {
        let list = this.array;
        while (this.processSize < 20 && this.array.length) {
            let json = this.array.shift(),
                cssObj, jsObj;
            this.processSize++;
            if (json.css) {
                let cssText = this.concat(json.css);
                cssObj = this.writeFile(cssText, json.key, 'css');
            }
            if (json.js) {
                let jsText = this.concat(json.js);
                jsObj = this.writeFile(jsText, json.key, 'js');
            }
            this.writePathToModifyModule(json.key, cssObj, jsObj);
        }
    }

    writePathToModifyModule(key, cssObj, jsObj) { //写合并后的文件到config中
        let result = {};
        if (cssObj) {
            let hash = this.writeHashToCache(cssObj.filePath);
            result.css = cssObj.pageUrl + '?' + hash
        };
        if (jsObj) {
            let hash = this.writeHashToCache(jsObj.filePath);
            result.js = jsObj.pageUrl + '?' + hash
        };
        this.config.modifyModule[key] = result;
    }

    writeHashToCache(path) { //写合并后的文件的hash值到config中
        let json = FileHashHandler.readFileHash(path);
        this.config.fileHash[json.filePath] = json.hash;
        return json.hash;
    }

    concat(list) {
        let fullText = '';
        for (let url of list) {
            var text = this.readFile(url);
            fullText += '/*****************************************************\r';
            fullText += 'source：' + url + '\r';
            fullText += '*****************************************************/\r';
            fullText += text + '\r\n';
        }
        return fullText;
    }

    readFile(url) {
        url = path.resolve('./', this.config.sourceDir, url);
        let key = url.replace(/(\.\w+)?$/, ''); //去掉ext就可得到绝对路径的文件在config.chunks中的key
        if (!this.config.chunks[key]) {
            console.log(key)
        }
        return this.config.chunks[key].compressData;
    }

    writeFile(text, key, ext) {
        let url = path.resolve('./', this.config.output.baseDir, 'statics', ext, key + '.' + ext);
        fileWriter(url, text, { ext: ext, minify: this.config.minify });
        this.processSize--;
        this.executeProcess();
        return {
            filePath: url,
            pageUrl: ['statics', ext, key + '.' + ext].join('/')
        };
    }

}

module.exports = (config) => {
    return new ConcatAssets(config);
}