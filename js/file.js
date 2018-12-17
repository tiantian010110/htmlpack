let fs = require('fs');
let path = require('path');
const rimraf = require('rimraf');

let fileIsExist = (filePath) => {
    return fs.existsSync(filePath)
};

let removeDirSync = (dir, callback) => {
    rimraf(dir, function(err) {
        if (!err) {
            if (callback) {
                callback();
            }
        }
    });
}

module.exports = {
    fileIsExist: fileIsExist,
    removeDirSync: removeDirSync
}