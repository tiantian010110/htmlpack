let fs = require("fs");
let path = require("path");
const uglifyjs = require("uglify-js");

let map = {
    html: 'utf8',
    text: 'utf8',
    json: 'utf8',
    js: 'utf8',
    css: 'utf8',
    sass: 'utf8'
}
let chunks = {};
let filter = ['js'];


class Analysis {
    constructor(config) {
        this.config = config;
        this.minify = this.config.minify;
        this.config.chunks = {};
        this.readDirSync(path.join(path.resolve(), config.sourceDir));
    }
    readDirSync(url) {
        let parent = fs.readdirSync(url);
        parent.forEach((target, index) => {
            let fullFileName = path.join(url, target);
            let info = fs.statSync(fullFileName);

            if (info.isDirectory()) {
                this.readDirSync(fullFileName);
            } else {
                let chunk = path.parse(fullFileName);
                chunk.ext = chunk.ext.replace(/\./g, '');
                chunk.size = info.size;
                chunk.fullFileName = fullFileName;
                chunk.data = fs.readFileSync(fullFileName, { encoding: map[chunk.ext] || null }) || '';
                //开启压缩功能
                chunk.compressData = this.compressFile({ data: chunk.data, ext: chunk.ext }) || '';
                this.config.chunks[path.join(url, chunk.name)] = chunk;
            }
        })
    }
    compressFile(options) { //如果开启压缩就执行压缩
        /**
         * 支持的文件格式包括：css,js
         */
        if (filter.includes(options.ext) && this.minify) {
            try {
                return uglifyjs.minify(options.data).code;
            } catch (e) {
                console.log(e)
                return '';
            }
        } else {
            return options.data;
        }
    }
}

module.exports = function(config) {
    new Analysis(config);
};