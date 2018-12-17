let config = require('./../htmlpack.config');
let path = require('path');


var time = new Date().getTime();
require('./../js/analysisModules')(config);
let fileHash = require('./../js/fileHash');
new fileHash(config);
require('./../js/copyFile')(config);

if (config.server) {
    var shell = require('shelljs');
    var commond = 'node ';
    if (config.server.debug) {
        commond += '--inspect ';
    }
    commond += path.resolve('./js/http-server.js');
    shell.exec(commond, { encoding: 'utf8' }, function(code, stdout, stderr) {
        console.log('Exit code:', code);
        console.log('Program output:', stdout);
        console.log('Program stderr:', stderr);
    });
}
console.log('全程耗时：' + (new Date().getTime() - time) / 1000 + ' s')