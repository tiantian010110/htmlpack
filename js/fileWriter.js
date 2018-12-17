let fs = require('fs');
let path = require('path');
let fileIO = require('./file');
const uglifyjs = require("uglify-js");


/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dirs) {
    let dirArray = dirs.split(path.sep);
    var newDirArray = [];
    while (dirArray.length) {
        newDirArray.push(dirArray.shift());
        var newDir = newDirArray.join(path.sep);
        let status = fileIO.fileIsExist(newDir);
        if (status) {
            continue;
        } else {
            fs.mkdirSync(newDir);
        }
    }
}

let writeFile = (filePath, content, options) => {
    options = options || {};
    content = content || '';
    let dirs = path.dirname(filePath);
    let status = fileIO.fileIsExist(filePath);
    if (!status) {
        mkdir(dirs);
    }
    fs.writeFileSync(filePath, content, options);
}


module.exports = writeFile