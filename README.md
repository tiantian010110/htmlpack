
# htmlpack
`目的是为了解决已经搭建完前端框架，再转node开发困难的目的。`


说一下该工具的来源吧


由于微信端开发任务比较紧急，直接用原生js搭建了当前src目录下的框架（不全）。（为什么不用成熟的前端框架呢？一肚子苦水啊，一开始做另一个微信项目，使用了mui，看他们的demo功能老牛叉了，但是bug太多，bug太多，bug太多...）
后来项目越做越大，许多重复的劳动其实可以再精简一下，而且如果使用node自动化工具处理之后可以很方便的解决缓存问题，因此在该项目基本完善的情况下开发了这个自动化构建工具。

这个自动化构建工具有个`缺点是适合纯H5开发`，但是不用nodejs直接生成页面。说的直白一点就是不支持nodejs直接产出*.html等页面。


###说明：
  * htmlpack.config.js是配置文件，这个配置文件是自动化构建的配置
  ```javascript
  const htmlPlugin = require('./plugins/htmlPlugin');
  const stylePlugin = require('./plugins/stylePlugin');
  const concatAssetsPlugin = require('./plugins/concatAssetsPlugin');

  module.exports = {
      module: require('./module.config'),
      sourceDir: 'src',//源码目录文件夹
      entry: ['load'], //从module.config.js中指定一个key值作为入口
      output: {
          baseDir: 'build',
          relative: true
      },
      // minify: true,
      plugins: [ //插件
          new concatAssetsPlugin(), //合并资源的插件
          new htmlPlugin() //处理html的插件
          ... //可以自己开发更多插件
      ],
      console: true,
      server: { //远程接口服务器配置，指定要请求数据远程服务器
          port: 8000,
          // hostname: '192.168.1.170:8080',
          hostname: 'testmp.zanchina.com',
          protocol: 'http',
          debug: true
      }
  }
  ```
  
  * module.config.js 是功能模块配置文件，把需要引入的外部资源写入。
  ```javascript
  module.exports = {
    load: {
        css: ['resources/css/weui.css'],
        js: ['resources/js/weui.js', 'resources/js/load.js']
    },
    index: {
        css: ['resources/css/single_page.css'],
        js: ['resources/js/commons/wxSign.js', 'resources/js/single_page.js', 'resources/js/business/index.js']
    }
  };
```

 * 本地服务直接使用`http://ip:8000`，由于该项目没有完全开发完，暂时没有改成配置项
