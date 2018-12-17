const fs = require('fs');
const path = require('path');
const events = require('events');
const fileIO = require('./file');
const fileWriter = require('./fileWriter');

let map = {
    html: 'utf8',
    text: 'utf8',
    json: 'utf8',
    js: 'utf8',
    css: 'utf8',
    sass: 'utf8'
}

class CopyFile {
    constructor(config) {
        this.config = config;
        this.readFile();
    }

    readFile() {
        this.removeDir(() => {
            // setTimeout(e => {
            this.copyHandler();
            // }, 1000);
        });
    }

    copyHandler() { //执行copy任务
        this.eventHandler('before-emit'); //before事件

        var chunks = this.config.chunks;
        Object.keys(chunks).forEach((key) => {
            var chunk = chunks[key];
            var url = chunk.fullFileName;

            this.eventHandler('before-parse-file', chunk); //before事件

            var targetDir = this.config.output.baseDir;
            var sourceDir = this.config.sourceDir;
            var newUrl = url.replace(path.join(path.sep, sourceDir, path.sep), path.join(path.sep, targetDir, path.sep));
            fileWriter(newUrl, chunk.compressData);

            this.eventHandler('after-parse-file', chunk); //after事件

        });

        this.eventHandler('after-emit'); //after事件
    }

    eventHandler(eventType, chunk) { //执行插件
        var plugins = this.config.plugins;
        var eventEmitter = new events.EventEmitter();
        for (let plugin of plugins) {
            plugin.apply(eventEmitter);
        }
        let params = [this.config];
        if (chunk) {
            params.push(chunk);
        }
        eventEmitter.emit(eventType, ...params);
    }

    removeDir(callback) { //删除指定目录
        var url = path.resolve('.' + path.sep + this.config.output.baseDir);
        fileIO.removeDirSync(url, callback);
    }
}


module.exports = (config) => {
    return new CopyFile(config).chunks;
};