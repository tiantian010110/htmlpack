let config = require('./../htmlpack.config');
let express = require('express');
let proxy = require('http-proxy-middleware');
let path = require('path');

// proxy middleware options
let options = {
    target: config.server.protocol + '://' + config.server.hostname, // target host
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    onProxyRes: relayResponseHeaders
};

function relayResponseHeaders(proxyRes, req, res) {
    let domain = getSecondDomain(req.hostname);
    let cookies = proxyRes.headers['set-cookie'] || [];
    for (let i = 0, len = cookies.length; i < len; i++) {
        let cookie = cookies[i];
        cookies[i] = cookie.replace(getSecondDomain(config.server.hostname), domain);
    }
    Object.keys(proxyRes.headers).forEach(function(key) {
        res.append(key, proxyRes.headers[key]);
    });
};
//获取二级域名
function getSecondDomain(hostname) {
    if (!/\d+\.\d+\.\d+\.\d+/.test(hostname)) {
        return hostname.replace(/(^\w+\.)?/, '');
    }
    return hostname;
}

// create the proxy (without context)
let exampleProxy = proxy(options);

// mount `exampleProxy` in web server
let app = express();
app.use('/', (req, res, next) => {
    let url = req.url.split('?')[0];
    if (/\.\w+$/.test(url)) {
        res.sendFile(path.resolve(path.join('.', 'build', url)));
    } else {
        exampleProxy(req, res, next);
    }
});
app.listen(8000);