class StylePlugin {
    constructor(options) {

    }
    apply(event) {
        event.addListener('before-parse-file', (config, chunk) => {
            if (chunk.ext === 'html') {
                let html = chunk.data;
                var regexp = new RegExp('<style\\b[^<]*(?:(?!<\\/style>)<[^<]*)*<\\/style>', 'img');
                let styles = html.match(regexp);
                html = html.replace(regexp, '');
                if (styles) {
                    for (let style of styles) {
                        style = style.replace(/^<style[\s\S]*?>/, '');
                        style = style.replace(/^<\/style>$/, '');
                    }
                }
                chunk.data = html;
            }
        })
    }
}

module.exports = StylePlugin;