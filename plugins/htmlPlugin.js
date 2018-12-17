let path = require('path');

class HtmlPlugin {
    constructor(options) {

    }
    apply(event) {
        event.addListener('before-parse-file', (config, chunk) => {
            let html = chunk.compressData;
            if (chunk.ext === 'html') {
                //重新组装html页面
                //提前head中的内容 暂时只支持style、link、title
                let title = html.match(/<title\b[^<]*(?:(?!<\/title>)<[^<]*)*<\/title>/img);
                let links = Array.prototype.slice.call(html.match(/<link\b[^<]*(?:(?!<\/link>)<[^<]*)*<\/link>/img) || []);
                let styles = Array.prototype.slice.call(html.match(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/img) || []);
                let template = html.match(/<template\b[^<]*(?:(?!<\/template>)<[^<]*)*<\/template>/img);
                let scripts = Array.prototype.slice.call(html.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/img) || { 0: [], length: 0 });

                scripts.unshift('<script type="text/javascript" src="../../' + config.modulePath + '"></script>\n');
                let entries = config.entry || [];
                for (const entry of entries) {
                    var json = config.modifyModule[entry];
                    if (json) {
                        var jsPath = json.js,
                            cssPath = json.css;
                        scripts.unshift('<script type="text/javascript" src="../../' + jsPath + '"></script>\n');
                        links.unshift('<link rel="stylesheet" type="text/css" href="../../' + cssPath + '"></link>\n');
                    }
                }

                let page = [];
                page.push('<!DOCTYPE html>\n');
                page.push('<html>\n');
                page.push('<head>\n');
                page.push('<meta charset="utf-8">\n');
                page.push('<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>\n');
                title && title.length && page.push(title[0] + '\n');
                if (links && links.length) {
                    for (const link of links) {
                        page.push(link + '\n');
                    }
                }
                if (styles && styles.length) {
                    for (const style of styles) {
                        page.push(style + '\n');
                    }
                }
                page.push('</head>\n');
                page.push('<body style="visibility: hidden;">\n');
                if (template) {
                    template = template[0].replace(/<\/*template[\s\S]*?>/g, '');
                    page.push(template);
                }

                page.push('</body>\n');

                if (scripts && scripts.length) {
                    for (const script of scripts) {
                        page.push(script + '\n');
                    }
                }
                page.push('</html>\n');

                html = page.join('');
                html = this.replaceSourceUrl(config, chunk, html)
                chunk.compressData = html;
            }
        })
    }

    replaceSourceUrl(config, chunk, html) {
        let paths = chunk.dir.split(path.sep);
        let regexp = new RegExp('(src|href)+?="[\\s\\S]+?"', 'img');
        let els = html.match(regexp);
        if (els) {
            for (let el of els) {
                let url = el.replace(/^(src|href)+?="/, '').replace(/"/g, ''); //提取url
                if (/^javascript\:/.test(url) || /^http(s)*\:\/\//.test(url) || /^(\/\/)/.test(url)) {
                    continue;
                }

                let splits = url.split('?');
                let validPath = splits[0];

                //根据../出现的次数生成绝对路径
                let pathsCopy = JSON.parse(JSON.stringify(paths));
                let parentMatch = validPath.match(/\.\.\//g);
                let parentLength = parentMatch ? parentMatch.length : 0;
                while (parentLength) {
                    pathsCopy.pop();
                    --parentLength;
                }
                validPath = validPath.replace(/\.\.\//g, '');
                let newPaths = pathsCopy.concat(validPath.split('/'));
                let newURL = newPaths.join(path.sep);

                let cache = config.fileHash;
                let json = cache[newURL];
                if (json) {
                    if (/\.html$/.test(validPath)) {
                        if (splits[1]) {
                            html = html.replace(url, url + '&_v=' + json);
                        } else {
                            html = html.replace(url, url + '?_v=' + json);
                        }
                    } else if (/\.\w+$/.test(validPath)) {
                        html = html.replace(url, url + '?' + json);
                    }
                }
            }
        }
        return html;
    }
}

module.exports = HtmlPlugin;