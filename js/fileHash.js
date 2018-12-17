let fs = require('fs');
let path = require('path');
let crypto = require('crypto');

class FileHashHandler {
    constructor(config) {
        this.config = config;
        config.fileHash = {};
        //定义cache路径
        this.init();
    }
    init() {
        var chunks = this.config.chunks;
        let array = [];
        Object.keys(chunks).forEach(key => {
            let chunk = chunks[key];
            let file = chunk.fullFileName;
            this.readFileHash(file);
        });
    }


    readFileHash(file) { //读取文件的MD5值，并生成临时hash
        let buffer = fs.readFileSync(file);
        let fsHash = crypto.createHash('md5');
        fsHash.update(buffer);
        let hash = fsHash.digest('hex').slice(-8);
        this.config.fileHash[file] = hash;
    }
}

FileHashHandler.readFileHash = file => { //读取文件的MD5值，并生成临时hash
    let buffer = fs.readFileSync(file);
    let fsHash = crypto.createHash('md5');
    fsHash.update(buffer);
    let hash = fsHash.digest('hex').slice(-8);
    return {
        filePath: file,
        hash: hash
    }
}

module.exports = FileHashHandler;