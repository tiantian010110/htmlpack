/*****************************************************source：resources/js/commons/wxSign.js*****************************************************//**
 * info：微信授权
 * author：田鑫龙
 * date：2017-05-10
 */

(function(){
	window.lyb = window.lyb || {};
	lyb.wxSign = function(apiList, callback){
		if(apiList.indexOf('chooseWXPay') === -1) {
			apiList.push('chooseWXPay');
		}
		if(apiList.indexOf('openLocation') === -1) {
            apiList.push('openLocation');
		}
		// 微信签名
		lyb.ajax(ctx + 'weixin/jsSignature', {
		    dataType: 'json',
		    type: 'get',
		    data:{
		        url: encodeURIComponent(location.href.split('#')[0])
		    },
		    success: function (result) {
		    	var data = result.data;
		        wx.config({
					// debug: true,
		            appId: data.appId, // 必填，公众号的唯一标识
		            timestamp: data.timestamp, // 必填，生成签名的时间戳
		            nonceStr: data.nonceStr, // 必填，生成签名的随机串
		            signature: data.signature,// 必填，签名，见附录1
		            jsApiList: apiList || ['checkJsApi'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		        });
					        
		        wx.ready(function(){
		        	window.wxSDK = true;
		        	callback && callback.call(wx, data);
				});
							
				wx.error(function(res){
					// lyb.error('系统异常，稍后重试!');
				});
		    }
		});
	};
})();
/*****************************************************source：resources/js/commons/qrcode.js*****************************************************/﻿var QRCode;!function(){function a(a){this.mode=c.MODE_8BIT_BYTE,this.data=a,this.parsedData=[];for(var b=[],d=0,e=this.data.length;e>d;d++){var f=this.data.charCodeAt(d);f>65536?(b[0]=240|(1835008&f)>>>18,b[1]=128|(258048&f)>>>12,b[2]=128|(4032&f)>>>6,b[3]=128|63&f):f>2048?(b[0]=224|(61440&f)>>>12,b[1]=128|(4032&f)>>>6,b[2]=128|63&f):f>128?(b[0]=192|(1984&f)>>>6,b[1]=128|63&f):b[0]=f,this.parsedData=this.parsedData.concat(b)}this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}function b(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}function i(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function j(a,b){this.totalCount=a,this.dataCount=b}function k(){this.buffer=[],this.length=0}function m(){return"undefined"!=typeof CanvasRenderingContext2D}function n(){var a=!1,b=navigator.userAgent;return/android/i.test(b)&&(a=!0,aMat=b.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(a=parseFloat(aMat[1]))),a}function r(a,b){for(var c=1,e=s(a),f=0,g=l.length;g>=f;f++){var h=0;switch(b){case d.L:h=l[f][0];break;case d.M:h=l[f][1];break;case d.Q:h=l[f][2];break;case d.H:h=l[f][3]}if(h>=e)break;c++}if(c>l.length)throw new Error("Too long data");return c}function s(a){var b=encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");return b.length+(b.length!=a?3:0)}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;c>b;b++)a.put(this.parsedData[b],8)}},b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c),this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,c),this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,c)},setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=f.getLostPoint(this);(0==c||a>d)&&(a=d,b=c)}return b},createMovieClip:function(a,b,c){var d=a.createEmptyMovieClip(b,c),e=1;this.make();for(var f=0;f<this.modules.length;f++)for(var g=f*e,h=0;h<this.modules[f].length;h++){var i=h*e,j=this.modules[f][h];j&&(d.beginFill(0,100),d.moveTo(i,g),d.lineTo(i+e,g),d.lineTo(i+e,g+e),d.lineTo(i,g+e),d.endFill())}return d},setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=0==b%2)},setupPositionAdjustPattern:function(){for(var a=f.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var g=-2;2>=g;g++)for(var h=-2;2>=h;h++)this.modules[d+g][e+h]=-2==g||2==g||-2==h||2==h||0==g&&0==h?!0:!1}},setupTypeNumber:function(a){for(var b=f.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(var c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=f.getBCHTypeInfo(c),e=0;15>e;e++){var g=!a&&1==(1&d>>e);6>e?this.modules[e][8]=g:8>e?this.modules[e+1][8]=g:this.modules[this.moduleCount-15+e][8]=g}for(var e=0;15>e;e++){var g=!a&&1==(1&d>>e);8>e?this.modules[8][this.moduleCount-e-1]=g:9>e?this.modules[8][15-e-1+1]=g:this.modules[8][15-e-1]=g}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,g=0,h=this.moduleCount-1;h>0;h-=2)for(6==h&&h--;;){for(var i=0;2>i;i++)if(null==this.modules[d][h-i]){var j=!1;g<a.length&&(j=1==(1&a[g]>>>e));var k=f.getMask(b,d,h-i);k&&(j=!j),this.modules[d][h-i]=j,e--,-1==e&&(g++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},b.PAD0=236,b.PAD1=17,b.createData=function(a,c,d){for(var e=j.getRSBlocks(a,c),g=new k,h=0;h<d.length;h++){var i=d[h];g.put(i.mode,4),g.put(i.getLength(),f.getLengthInBits(i.mode,a)),i.write(g)}for(var l=0,h=0;h<e.length;h++)l+=e[h].dataCount;if(g.getLengthInBits()>8*l)throw new Error("code length overflow. ("+g.getLengthInBits()+">"+8*l+")");for(g.getLengthInBits()+4<=8*l&&g.put(0,4);0!=g.getLengthInBits()%8;)g.putBit(!1);for(;;){if(g.getLengthInBits()>=8*l)break;if(g.put(b.PAD0,8),g.getLengthInBits()>=8*l)break;g.put(b.PAD1,8)}return b.createBytes(g,e)},b.createBytes=function(a,b){for(var c=0,d=0,e=0,g=new Array(b.length),h=new Array(b.length),j=0;j<b.length;j++){var k=b[j].dataCount,l=b[j].totalCount-k;d=Math.max(d,k),e=Math.max(e,l),g[j]=new Array(k);for(var m=0;m<g[j].length;m++)g[j][m]=255&a.buffer[m+c];c+=k;var n=f.getErrorCorrectPolynomial(l),o=new i(g[j],n.getLength()-1),p=o.mod(n);h[j]=new Array(n.getLength()-1);for(var m=0;m<h[j].length;m++){var q=m+p.getLength()-h[j].length;h[j][m]=q>=0?p.get(q):0}}for(var r=0,m=0;m<b.length;m++)r+=b[m].totalCount;for(var s=new Array(r),t=0,m=0;d>m;m++)for(var j=0;j<b.length;j++)m<g[j].length&&(s[t++]=g[j][m]);for(var m=0;e>m;m++)for(var j=0;j<b.length;j++)m<h[j].length&&(s[t++]=h[j][m]);return s};for(var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},d={L:1,M:0,Q:3,H:2},e={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,getBCHTypeInfo:function(a){for(var b=a<<10;f.getBCHDigit(b)-f.getBCHDigit(f.G15)>=0;)b^=f.G15<<f.getBCHDigit(b)-f.getBCHDigit(f.G15);return(a<<10|b)^f.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;f.getBCHDigit(b)-f.getBCHDigit(f.G18)>=0;)b^=f.G18<<f.getBCHDigit(b)-f.getBCHDigit(f.G18);return a<<12|b},getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return f.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case e.PATTERN000:return 0==(b+c)%2;case e.PATTERN001:return 0==b%2;case e.PATTERN010:return 0==c%3;case e.PATTERN011:return 0==(b+c)%3;case e.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case e.PATTERN101:return 0==b*c%2+b*c%3;case e.PATTERN110:return 0==(b*c%2+b*c%3)%2;case e.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new i([1],0),c=0;a>c;c++)b=b.multiply(new i([1,g.gexp(c)],0));return b},getLengthInBits:function(a,b){if(b>=1&&10>b)switch(a){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:return 8;case c.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(27>b)switch(a){case c.MODE_NUMBER:return 12;case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(41>b))throw new Error("type:"+b);switch(a){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12;default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;b>d;d++)for(var e=0;b>e;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||d+h>=b))for(var i=-1;1>=i;i++)0>e+i||e+i>=b||(0!=h||0!=i)&&g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var d=0;b-1>d;d++)for(var e=0;b-1>e;e++){var j=0;a.isDark(d,e)&&j++,a.isDark(d+1,e)&&j++,a.isDark(d,e+1)&&j++,a.isDark(d+1,e+1)&&j++,(0==j||4==j)&&(c+=3)}for(var d=0;b>d;d++)for(var e=0;b-6>e;e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);for(var e=0;b>e;e++)for(var d=0;b-6>d;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(var k=0,e=0;b>e;e++)for(var d=0;b>d;d++)a.isDark(d,e)&&k++;var l=Math.abs(100*k/b/b-50)/5;return c+=10*l}},g={glog:function(a){if(1>a)throw new Error("glog("+a+")");return g.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;return g.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;8>h;h++)g.EXP_TABLE[h]=1<<h;for(var h=8;256>h;h++)g.EXP_TABLE[h]=g.EXP_TABLE[h-4]^g.EXP_TABLE[h-5]^g.EXP_TABLE[h-6]^g.EXP_TABLE[h-8];for(var h=0;255>h;h++)g.LOG_TABLE[g.EXP_TABLE[h]]=h;i.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=g.gexp(g.glog(this.get(c))+g.glog(a.get(d)));return new i(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;for(var b=g.glog(this.get(0))-g.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(var d=0;d<a.getLength();d++)c[d]^=g.gexp(g.glog(a.get(d))+b);return new i(c,0).mod(a)}},j.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],j.getRSBlocks=function(a,b){var c=j.getRsBlockTable(a,b);if(void 0==c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;d>f;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],k=0;g>k;k++)e.push(new j(h,i));return e},j.getRsBlockTable=function(a,b){switch(b){case d.L:return j.RS_BLOCK_TABLE[4*(a-1)+0];case d.M:return j.RS_BLOCK_TABLE[4*(a-1)+1];case d.Q:return j.RS_BLOCK_TABLE[4*(a-1)+2];case d.H:return j.RS_BLOCK_TABLE[4*(a-1)+3];default:return void 0}},k.prototype={get:function(a){var b=Math.floor(a/8);return 1==(1&this.buffer[b]>>>7-a%8)},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1==(1&a>>>b-c-1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};var l=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],o=function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){function g(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg",a);for(var d in b)b.hasOwnProperty(d)&&c.setAttribute(d,b[d]);return c}var b=this._htOption,c=this._el,d=a.getModuleCount();Math.floor(b.width/d),Math.floor(b.height/d),this.clear();var h=g("svg",{viewBox:"0 0 "+String(d)+" "+String(d),width:"100%",height:"100%",fill:b.colorLight});h.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),c.appendChild(h),h.appendChild(g("rect",{fill:b.colorDark,width:"1",height:"1",id:"template"}));for(var i=0;d>i;i++)for(var j=0;d>j;j++)if(a.isDark(i,j)){var k=g("use",{x:String(i),y:String(j)});k.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),h.appendChild(k)}},a.prototype.clear=function(){for(;this._el.hasChildNodes();)this._el.removeChild(this._el.lastChild)},a}(),p="svg"===document.documentElement.tagName.toLowerCase(),q=p?o:m()?function(){function a(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function d(a,b){var c=this;if(c._fFail=b,c._fSuccess=a,null===c._bSupportDataURI){var d=document.createElement("img"),e=function(){c._bSupportDataURI=!1,c._fFail&&_fFail.call(c)},f=function(){c._bSupportDataURI=!0,c._fSuccess&&c._fSuccess.call(c)};return d.onabort=e,d.onerror=e,d.onload=f,d.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",void 0}c._bSupportDataURI===!0&&c._fSuccess?c._fSuccess.call(c):c._bSupportDataURI===!1&&c._fFail&&c._fFail.call(c)}if(this._android&&this._android<=2.1){var b=1/window.devicePixelRatio,c=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(a,d,e,f,g,h,i,j){if("nodeName"in a&&/img/i.test(a.nodeName))for(var l=arguments.length-1;l>=1;l--)arguments[l]=arguments[l]*b;else"undefined"==typeof j&&(arguments[1]*=b,arguments[2]*=b,arguments[3]*=b,arguments[4]*=b);c.apply(this,arguments)}}var e=function(a,b){this._bIsPainted=!1,this._android=n(),this._htOption=b,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=b.width,this._elCanvas.height=b.height,a.appendChild(this._elCanvas),this._el=a,this._oContext=this._elCanvas.getContext("2d"),this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null;var that = this;this._elImage.addEventListener('load', function (e) {that._htOption.success && that._htOption.success(e)})};return e.prototype.draw=function(a){var b=this._elImage,c=this._oContext,d=this._htOption,e=a.getModuleCount(),f=d.width/e,g=d.height/e,h=Math.round(f),i=Math.round(g);b.style.display="none",this.clear();for(var j=0;e>j;j++)for(var k=0;e>k;k++){var l=a.isDark(j,k),m=k*f,n=j*g;c.strokeStyle=l?d.colorDark:d.colorLight,c.lineWidth=1,c.fillStyle=l?d.colorDark:d.colorLight,c.fillRect(m,n,f,g),c.strokeRect(Math.floor(m)+.5,Math.floor(n)+.5,h,i),c.strokeRect(Math.ceil(m)-.5,Math.ceil(n)-.5,h,i)}this._bIsPainted=!0},e.prototype.makeImage=function(){this._bIsPainted&&d.call(this,a)},e.prototype.isPainted=function(){return this._bIsPainted},e.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},e.prototype.round=function(a){return a?Math.floor(1e3*a)/1e3:a},e}():function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){for(var b=this._htOption,c=this._el,d=a.getModuleCount(),e=Math.floor(b.width/d),f=Math.floor(b.height/d),g=['<table style="border:0;border-collapse:collapse;">'],h=0;d>h;h++){g.push("<tr>");for(var i=0;d>i;i++)g.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+e+"px;height:"+f+"px;background-color:"+(a.isDark(h,i)?b.colorDark:b.colorLight)+';"></td>');g.push("</tr>")}g.push("</table>"),c.innerHTML=g.join("");var j=c.childNodes[0],k=(b.width-j.offsetWidth)/2,l=(b.height-j.offsetHeight)/2;k>0&&l>0&&(j.style.margin=l+"px "+k+"px")},a.prototype.clear=function(){this._el.innerHTML=""},a}();QRCode=function(a,b){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:d.H},"string"==typeof b&&(b={text:b}),b)for(var c in b)this._htOption[c]=b[c];"string"==typeof a&&(a=document.getElementById(a)),this._android=n(),this._el=a,this._oQRCode=null,this._oDrawing=new q(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},QRCode.prototype.makeCode=function(a){this._oQRCode=new b(r(a,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(a),this._oQRCode.make(),this._el.title=a,this._oDrawing.draw(this._oQRCode),this.makeImage()},QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=d}();
/*****************************************************source：resources/js/business/doctor/doctor_detail.js*****************************************************/lyb.parse();

//判断显示那个页签
var hash = window.location.hash;
if (hash === '#webim') {
    window.location.href = ctx + 'html/chat/chat.html?id=' + params.id;
}

var GAOFANGJIE_STATUS = {};


var service = jQuery('#doctor_service'), moreService = jQuery('#doctor_more_service');
//查询医生详情
lyb.ajax({
    url: ctx + 'doctor/info/get?id=' + params.id+'&shareId='+(params.shareId||''),
    dataType: 'json',
    success: function (result) {
        if (result.success) {
            var data = result.data;

            if (data.headimgUrl)
                document.querySelector('#head_url').src = data.headimgUrl;

            document.querySelector('#doctor_name').innerHTML = '<span class="fontBold marginRight8">' + data.name + '</span><span style="opacity: 0.8;">' + (data.titles || '') + '</span>';
            params.name = data.name;
            // if(data.source === 'bd'){
            //     jQuery('#xw_doctor_schedule').show();
            // }
            document.querySelector('#doctor_info').innerHTML = (data.hospital || '') + '<span class="marginLeft8">' + (data.officeName || 'nbsp;') + '</span>';
            document.querySelector('#visit_count').innerHTML = data.visitsCount || '--';
            document.querySelector('#commont_count').innerHTML = '（' + (data.commentsCount || '--') + '人评价）';
            document.querySelector('#comments_persent').innerHTML = data.goodCommentsPersent || '--';
            document.querySelector('#visit_rate').innerHTML = data.repeatVisitPersent || '--';
            document.querySelector('#clinic_pricef').innerHTML = data.consultationFeeStr || 0;
            if (params.shareId) {
                new QRCode(document.querySelector('#doctor_qr'), {
                    text: data[window.firstHost === 'lyb' || window.firstHost === 'lyh' ? 'shareWithWxInfoQrcodeLyb' : 'shareWithWxInfoQrcodeZan'],
                    width: 100,
                    height: 100
                });
                new QRCode(document.querySelector('#qrCode'), {
                    text: data[window.firstHost === 'lyb' || window.firstHost === 'lyh' ? 'shareWithWxInfoQrcodeLyb' : 'shareWithWxInfoQrcodeZan'],
                    width: 100,
                    height: 100
                });
            }else{
                new QRCode(document.querySelector('#doctor_qr'), {
                    text: data[window.firstHost === 'lyb' || window.firstHost === 'lyh' ? 'lybQrcodeUrl' : 'qrcodeUrl'],
                    width: 100,
                    height: 100
                });
                new QRCode(document.querySelector('#qrCode'), {
                    text: data[window.firstHost === 'lyb' || window.firstHost === 'lyh' ? 'lybQrcodeUrl' : 'qrcodeUrl'],
                    width: 100,
                    height: 100
                });
            }
            var clinic = document.querySelector('#clinic_switch');

            var allowQueryService = lyb.wxBrowser && data.subFlag || !lyb.wxBrowser;
            if (allowQueryService) {
                if (data.clinicSwitch == "ON" || data.clinicSwitch == "ON1" || data.clinicSwitch == "ON2" || data.clinicSwitch == "ON3") {
                    clinic.onclick = function() {
                        zhuge.track('医生主页链接', {
                            '功能入口': '门诊预约',
                            '医生名称': params.name
                        }, function () {
                            window.location.href = 'doctor_schedule.html?id=' + params.id + '&channel=' + (params.channel || '');
                        });
                    }
                    clinic.innerHTML = '点此预约';
                    jQuery('#clinicGao').show();
                    clinic.parentNode.classList.remove('his-hide');
                } else if (data.clinicSwitch == "OFF" && data.schedule) {
                    clinic.onclick = function() {
                        zhuge.track('医生主页链接', {
                            '功能入口': '查看排班',
                            '医生名称': params.name
                        }, function () {
                            window.location.href = ctx + 'html/schedule/view_schedule.html?id=' + params.id;
                        });
                    };
                    jQuery('#clinicGao').attr('data-href', ctx + 'html/schedule/view_schedule.html?id=' + params.id).show();
                    clinic.innerHTML = '查看排班';
                    clinic.parentNode.classList.remove('his-hide');
                } else {
                    clinic.parentNode.classList.add('his-hide');
                    clinic.classList.add('gray-border');
                    clinic.classList.add('gray-color');
                    clinic.classList.add('white-background');
                }

                //服务
                params.consulting = data.consulting;

                service.append(renderGraphic(data.isFirst || false, data.graphicPrice || 0, data.graphicFurtherPrice || 0, (data.serviceSwitch == 'ON' && data.graphicSwitch == 'ON' ? true : false), data.consulting));
                service.append(renderPhone(data.isFirst || false, data.phonePrice || 0, data.phoneFurtherPrice || 0, (data.serviceSwitch == 'ON' && data.phoneSwitch == 'ON' ? true : false), data.consulting));
                service.append(renderFurtherConsultation(data.consultPrice || 0, data.consultCount || 0, data.consultCount > 0 || data.serviceSwitch == 'ON' && data.consultAfterSwitch == "ON" && data.consultCount == 0));

                queryDoctorOther();

                //TODO 王买亮图文复诊2
                if (params.id === "f0200471b3414238ab61e6f8d0801eac") {
                    renderGraphic2();
                }
            } else {
                jQuery('#un_care_mp').removeClass('his-hide').prevAll().addClass('his-hide');
            }

            //简介
            var doctor_jianjie = document.querySelector('#doctor_jianjie');
            if (data.speciality) {
                doctor_jianjie.classList.remove('his-hide');
                document.querySelector('#inst').innerHTML = data.speciality;
            }

            //擅长
            var html = '', shareHTML = data.symptomName || '';
            var sympList = data.symptomName && data.symptomName != '' ? data.symptomName.split(',') : [];
            for (var j = 0, length = sympList.length; j < length; j++) {
                var symptom = sympList[j];
                html += '<span class="illness-item">' + symptom + '</span>';
            }
            var doctor_shanchang = document.querySelector('#doctor_shanchang');
            if (html) {
                doctor_shanchang.classList.remove('his-hide');
                document.querySelector('#doctor_symptoms').innerHTML = html;
            }

            zhuge.track('医生主页', {'医生名称': params.name, '来源': decodeURIComponent(params.sourcePage)});

            //微信签名授权
            lyb.wxSign(['checkJsApi', 'hideMenuItems', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'onMenuShareQQ'], function () {
                wx.hideMenuItems({
                    menuList: ["menuItem:copyUrl", "menuItem:share:weiboApp", "menuItem:favorite", "menuItem:share:facebook", "menuItem:share:QZone", "menuItem:share:email", "menuItem:share:brand", "menuItem:readMode", "menuItem:originPage", "menuItem:editTag", "menuItem:delete"] // 要显示的菜单项，所有menu项见附录3
                });
                wx.showMenuItems({
                    menuList: ["menuItem:share:timeline", "menuItem:openWithSafari", "menuItem:openWithQQBrowser", "menuItem:share:appMessage", "menuItem:share:qq"] // 要显示的菜单项，所有menu项见附录3
                });
                wx.onMenuShareTimeline({
                    title: '【' + window.mpName + '】推荐好中医：' + data.name, // 分享标题
                    link: ctx + 'weixin/doctor/' + params.id+'?shareId='+data.currentWxId, // 分享链接
                    imgUrl: data.headimgUrl, // 分享图标
                    success: function () {
                        lyb.alert('分享成功!');
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({
                    title: '【' + window.mpName + '】推荐好中医：' + data.name, // 分享标题
                    desc: '擅长：' + shareHTML, // 分享描述
                    link: ctx + 'weixin/doctor/' + params.id+'?shareId='+data.currentWxId, // 分享链接
                    imgUrl: data.headimgUrl,
                    success: function () {
                        lyb.alert('分享成功!');
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
            });
        }
    }
});

//服务按钮点击事件
service.on('click', '.buy-service', function (e) {
    e.stopPropagation();
    var dataSet = this.dataset;
    zhuge.track('医生主页链接', {
        '医生名称': params.name,
        '功能入口': {
            'graphic': '图文复诊',
            'phone': '电话复诊',
            'consult': '诊后提问',
            'graphic2': '舒眠咨询'
        }[dataSet.serviceType]
    }, function () {
        var url = ctx + 'pay/wx/mp/redirect/buy_service?id=' + params.id + '&serviceType=' + dataSet.serviceType + '&channel=' + (params.channel || '');
        if (dataSet.serviceType === 'consult') {
            if (dataSet.count > 0) {
                url = '../consult/consult.html?id=' + params.id;
            } else {
                url = ctx + 'pay/wx/mp/redirect/buy_service?id=' + params.id + '&serviceType=' + dataSet.serviceType + '&channel=' + (params.channel || '');
            }
        } else if (dataSet.serviceType === 'graphic' || dataSet.serviceType === 'phone') {
            lyb.ajax({
                url: ctx + 'doctor/info/serviceEnd?doctorId=' + params.id,
                success: function (result) {
                    if (result.code === 403 || result.code === 401) {
                        return;
                    }
                    if (result.success) {
                        window.location.href = ctx + 'sysInquiry/redirectSysInquiry?doctorId=' + params.id + '&channel=' + (params.channel || '');
                    } else {
                        window.location.href = url;
                    }
                }
            })
            return;
        }
        window.location.href = url + '&_=' + new Date().getTime();
    });//打点
});

//图文复诊
function renderGraphic(isFirst, firstPrice, morePrice, service, consulting) {
    var btnText = service ? consulting ? '正在咨询' : '点此复诊' : '暂未开通';
    if(btnText === '点此复诊'){
        GAOFANGJIE_STATUS.TUWEN = true;
        judgeBtnsStatuMethod();
    }
    var cls = (service || consulting) ? 'buy-service ' : '';
    var html = '<div class="white-background his-flex padding15">';
    html += '<div class="">';
    html += '<div class="marginBottom10">';
    html += '<span class="deep-color" style="vertical-align: middle;">图文复诊</span>';
    html += '<span class="margin-0-5" style="vertical-align: middle;display: inline-block;height: 12px;width: 1px;background: #222;"></span>';
    html += '<span class="red-color" style="vertical-align: middle;">' + comparePrice(firstPrice, morePrice) + '<span class="font11">元/次</span></span>';
    html += '</div>';
    html += '<div class="light-color font12">在线图文交流，开方调药</div>';
    html += '</div>';
    html += '<a data-service="' + service + '" data-service-type="graphic" class="' + cls + 'weui-btn weui-btn_mini buy-btn ' + (service ? consulting ? 'yellow-background' : '' : 'gray-background') + '">' + btnText + '</a>';
    html += '</div>';
    return html;
}

//图文复诊2
function renderGraphic2() {
    lyb.ajax(ctx + 'order/special/count?doctorId=' + params.id, {
        success: function (result) {
            if (result.success) {
                var html = '<div class="white-background his-flex padding15">';
                html += '<div class="">';
                html += '<div class="marginBottom10">';
                html += '<span class="deep-color" style="vertical-align: middle;">舒眠咨询</span>';
                html += '<span class="margin-0-5" style="vertical-align: middle;display: inline-block;height: 12px;width: 1px;background: #222;"></span>';
                html += '<span class="red-color" style="vertical-align: middle;">600<span class="font11">元/次</span><span class="font11 marginLeft5">限量</span>1<span class="font11">次</span></span>';
                html += '</div>';
                html += '<div class="light-color font12">一小时与医生单独沟通</div>';
                html += '</div>';
                html += '<a data-service="ON" data-service-type="graphic2" class="buy-service weui-btn weui-btn_mini buy-btn">点此复诊</a>';
                html += '</div>';

                service.append(html);
            }
        }
    })
}

//电话复诊
function renderPhone(isFirst, firstPrice, morePrice, service, consulting) {
    var btnText = service ? consulting ? '正在咨询' : '点此复诊' : '暂未开通';
    if(btnText === '点此复诊'){
        GAOFANGJIE_STATUS.DIANHUA = true;
        judgeBtnsStatuMethod();
    }
    var cls = (service || consulting) ? 'buy-service ' : '';
    var html = '<div class="white-background his-flex padding15">';
    html += '<div class="">';
    html += '<div class="marginBottom10">';
    html += '<span class="deep-color" style="vertical-align: middle;">电话复诊</span>';
    html += '<span class="margin-0-5" style="vertical-align: middle;display: inline-block;height: 12px;width: 1px;background: #222;"></span>';
    html += '<span class="red-color" style="vertical-align: middle;">' + comparePrice(firstPrice, morePrice) + '<span class="font11">元/次</span></span>';
    html += '</div>';
    html += '<div class="light-color font12">20分钟通话，图文交流，开方调药</div>';
    html += '</div>';
    html += '<a data-service="' + service + '" data-service-type="phone" class="' + cls + 'weui-btn weui-btn_mini buy-btn ' + (service ? consulting ? 'yellow-background' : '' : 'gray-background') + '">' + btnText + '</a>';
    html += '</div>';
    return html;
}

function comparePrice(firstPrice, morePrice) {
    if (firstPrice > morePrice) {
        return morePrice + ' - ' + firstPrice;
    } else if (firstPrice === morePrice) {
        return firstPrice;
    }
    return firstPrice + ' - ' + morePrice;
}

//诊后提问
function renderFurtherConsultation(price, serviceCount, consultSwitch) {
    var btnText = consultSwitch ? '点此提问' : '暂未开通';
    var cls = (consultSwitch) ? 'buy-service ' : 'gray-background ';
    return '<div class="white-background his-flex padding15">' +
        '<div class="">' +
        '<div class="marginBottom10">' +
        '<span class="deep-color" style="vertical-align: middle;">诊后提问</span>' +
        '<span class="margin-0-5" style="vertical-align: middle;display: inline-block;height: 12px;width: 1px;background: #222;"></span>' +
        '<span class="red-color" style="vertical-align: middle;">' + price + '<span class="font11">元/5次</span></span>' +
        '</div>' +
        '<div class="light-color font12 marginBottom5">在线快速提问，大夫解答</div>' +
        '<div class="light-color red-color font12">剩余' + serviceCount + '次免费机会</div>' +
        '</div>' +
        '<a data-service-type="consult" data-count="' + serviceCount + '" class="' + cls + 'weui-btn weui-btn_mini buy-btn his-flex-unshrink">' + btnText + '</a>' +
        '</div>';
}

function queryDoctorOther() {
    var array = ['', '', '', ''];
    lyb.Promise.all(function (resolve) {
         //有调理方案
         lyb.ajax(ctx + 'product/doctor/online/' + params.id + "?pageNum=1&pageSize=1", {
             dataType: 'json',
             success: function (result) {
                 if (result.success && result.data && result.data.length) {
                     var html = '<div class="white-background his-flex padding15">\n' +
                         '    <div>\n' +
                         '        <div class="marginBottom10">\n' +
                         '            <span class="deep-color">在售产品</span>\n' +
                         '        </div>\n' +
                         '        <div class="light-color font12 margin0">健康调理方案，明医定制</div>\n' +
                         '    </div>\n' +
                         '    <a data-text="在售产品" data-page="' + ctx + 'html/discovery/doctor_product.html?doctorId=' + params.id + '" class="weui-btn weui-btn_mini his-flex-unshrink buy-more-btn" href="javascript: void(0);">查看详情</a>\n' +
                         '</div>';
                     array[0] = html;
                 }
                 resolve();
             },
             error: function () {
                resolve();
             }
         });
    }, function (resolve) {
        //有医生讲座
        lyb.ajax({
            url: ctx + 'course/doctor/' + params.id + "?pageNum=1&pageSize=1",
            dataType: 'json',
            success: function (result) {
                if (result.success && result.data && result.data.length) {
                    var html = '<div class="white-background his-flex padding15">\n' +
                        '    <div>\n' +
                        '        <div class="marginBottom10">\n' +
                        '            <span class="deep-color">明医讲座</span>\n' +
                        '        </div>\n' +
                        '        <div class="light-color font12 margin0">和明医面对面，线下讲座</div>\n' +
                        '    </div>\n' +
                        '    <a data-text="明医讲座" data-page="' + ctx + 'html/course/doctor_course_list.html?id=' + params.id + '" class="weui-btn weui-btn_mini his-flex-unshrink buy-more-btn" href="javascript: void(0);">查看详情</a>\n' +
                        '</div>';
                    array[2] = html;
                }
                resolve();
            },
            error: function () {
                resolve();
            }
        });
    }, function (resolve) {
        //有医生套餐
        lyb.ajax({
            url: ctx + 'market/package/list?doctorId=' + params.id + "&pageNum=1&pageSize=1",
            dataType: 'json',
            success: function (result) {
                if (result.success && result.data && result.data.length) {
                    var html = '<div class="white-background his-flex padding15">\n' +
                        '    <div>\n' +
                        '        <div class="marginBottom10">\n' +
                        '            <span class="deep-color">明医套餐</span>\n' +
                        '        </div>\n' +
                        '        <div class="light-color font12 margin0">问诊服务套餐，专属折扣</div>\n' +
                        '    </div>\n' +
                        '    <a data-text="明医套餐" data-page="' + ctx + 'html/package_special/doctor_package_list.html?id=' + params.id + '" class="weui-btn weui-btn_mini his-flex-unshrink buy-more-btn" href="javascript: void(0);">查看详情</a>\n' +
                        '</div>';
                    array[1] = html;
                }
                resolve();
            },
            error: function () {
                resolve();
            }
        });
    }, function (resolve) {
        //有医生专科
        lyb.ajax({
            url: ctx + 'market/specialist/list?doctorId=' + params.id + "&pageNum=1&pageSize=1",
            dataType: 'json',
            success: function (result) {
                if (result.success && result.data && result.data.length) {
                    var html = '<div class="white-background his-flex padding15">\n' +
                        '    <div>\n' +
                        '        <div class="marginBottom10">\n' +
                        '            <span class="deep-color">明医专科</span>\n' +
                        '        </div>\n' +
                        '        <div class="light-color font12 margin0">门诊诊疗专科服务</div>\n' +
                        '    </div>\n' +
                        '    <a data-text="明医专科" data-page="' + ctx + 'html/package_special/doctor_special_list.html?id=' + params.id + '" class="weui-btn weui-btn_mini his-flex-unshrink buy-more-btn" href="javascript: void(0);">查看详情</a>\n' +
                        '</div>';
                    array[3] = html;
                }
                resolve();
            },
            error: function () {
                resolve();
            }
        });
    }).then(function () {
        var html = array.join('');
        // if (html === '') {
        //     jQuery('#service_more').hide();
        //     return;
        // }
        service.append(html);
        service.on('click', '.buy-more-btn', function (e) {
            e.stopPropagation();
            var data = this.dataset;
            zhuge.track('医生主页链接', {
                '功能入口': '查看' + data.text,
                '医生名称': params.name
            }, function () {
                window.location.href = data.page;
            });
        });
    });
}
//
// var moreServiceOpen = true;
// jQuery('#service_more').click(function () {
//     if (moreServiceOpen) {
//         this.children[1].style.transform = 'rotate(180deg)';
//         moreService.show();
//         // moreService.slideDown();
//     } else {
//         this.children[1].style.transform = 'rotate(0deg)';
//         moreService.hide();
//         // moreService.slideUp();
//     }
//
//     moreServiceOpen = !moreServiceOpen;
// });

jQuery('#doctor_service').on('click', '.white-background.his-flex.padding15', function () {
    var buyBtn = jQuery(this).children('a.buy-btn');
    if(buyBtn && buyBtn[0] && (buyBtn[0].dataset.service === 'true' || buyBtn[0].dataset.serviceType === 'consult')) {
        buyBtn.trigger('click');
    }
    var buyMoreBtn = jQuery(this).children('a.buy-more-btn');
    if(buyMoreBtn && buyMoreBtn[0]) {
        buyMoreBtn.trigger('click');
    }
});

//系外大夫出诊接口
lyb.ajax(ctx + 'doctor/visit/schedule/hospital?doctorId=' + params.id, {
    success: function(result){
        if(result.success){
            renderHospitalList(result.data);
        }
    }
});


function renderHospitalList(data){
    if(data.length){
        var html = [];
        var index = 0;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if(index === 2){
                break;
            }
            /*     if(!item.schedule){
                     continue;
                 }*/
            index++;
            html.push('<div class="marginBottom20 color-999999">');
            html.push('<div class="middle-color marginBottom8">'+ item.hospitalNane +'</div>');
            html.push('<div class="marginBottom8">门诊地址：'+ (item.address || '暂未添加') +'</div>');
            if(item.schedule){
                html.push('<div class="">出诊日期：'+ item.schedule +'</div>');
            }
            html.push('</div>');
        }
        jQuery('#xw_doctor_schedule').show()
        jQuery('#xw_schedule').html(html.join(''));
    }
}


//是否关注了该医生
lyb.ajax({
    url: ctx + 'member/doctor/get/' + params.id,
    dataType: 'json',
    success: function (result) {
        if (result.code === 1) {
            jQuery('#careDoctor').addClass('unlogin');
            return;
        }
        if (result.data) {
            jQuery('#careDoctor').removeClass('icon-care-empty').addClass('icon-care');
        }
    }
});

//有安康诊疗套餐
lyb.ajax({
    url: ctx + 'market/package/ad/' + params.id,
    dataType: 'json',
    success: function (result) {
        if (result.success && result.data) {
            var border = document.querySelector('#special_ps');
            border.classList.remove('his-hide');
            border.innerHTML = '<div class="his-flex-grow marginRight8 fontBold" style="color: #C78736;line-height: 50px;font-size: 13px;">' +
                '购买安康诊疗套餐预约门诊更优惠' +
                '</div>' +
                '<a href="../package_special/ps_detail.html?id=' + result.data + '&type=package" class="weui-btn weui-btn_mini his-noborder font12 lineHeight22 radius2" style="background: #E5AA60;color: #fff;padding: 0 8px;">查看详情</a>';
        }
    }
});

//最后一条文章
lyb.ajax({
    url: ctx + 'doctor/article/' + params.id + '/newest',
    dataType: 'json',
    success: function (result) {
        if (result.success && result.data) {
            var data = result.data;
            var wenzhang = document.querySelector('#doctor_wenzhang');
            wenzhang.classList.remove('his-hide');
            var content = document.querySelector('#wenzhang');
            content.innerHTML = '<div class="middle-color lineHeight22" style="margin-bottom: 4px;">' + data.title + '</div>' +
                '<div class="lineHeight22 light-color" style="margin-bottom: 4px;">' + data.summary + '</div>' +
                '<div class="font12 light-color">' + data.createTime.split(' ')[0] + '</div>';
            (function (id, link) {
                content.onclick = function () {
                    zhuge.track('医生主页链接', {
                        '功能入口': '文章详情',
                        '医生名称': params.name
                    }, function () {
                        if (link) {
                            window.location.href = link;
                        } else {
                            window.location.href = ctx + 'html/article/art_detail.html?artId=' + id;
                        }
                    });
                }
            })(data.id, data.link);
        }
    }
});

//最后一条公告
lyb.ajax({
    url: ctx + 'sysNotices/wxList?doctorId=' + params.id + '&pageNum=1&pageSize=1',
    dataType: 'json',
    success: function (result) {
        if (result.success && result.data && result.data.length) {
            var data = result.data[0];
            var gonggao = document.querySelector('#doctor_gonggao');
            gonggao.classList.remove('his-hide');

            var content = data.type=='TEXT'? data.content : data.title;
            document.querySelector('#gonggao').innerHTML = '<span class="font12 marginRight8" style="background: #EFF6F1;border-radius: 10px;color: #C0CAC3;padding: 3px 8px;">' + data.modifyTime.split(' ')[0] + '</span>' + content;
        }
    }
});

jQuery('#careDoctor').on('click', function (e) {
    if (this.classList.contains('unlogin')) {
        lyb.confirm('登录后可关注该医生，是否去登录？', {
            buttons: [{
                label: '稍后再说',
                type: 'default',
                onClick: function () {
                }
            }, {
                label: '马上去',
                type: 'primary',
                onClick: function () {
                    sessionStorage.setItem('callbackUrl', window.location.href);
                    window.location.href = '../login/login.html';
                }
            }]
        });
        return;
    }
    var that = this;
    var url = ctx + 'member/doctor/attention/' + params.id;
    if (that.classList.contains('icon-care')) {
        url = ctx + 'member/doctor/cancel/attention/' + params.id;
    }
    lyb.ajax({
        url: url,
        dataType: 'json',
        success: function (result) {
            if (result.success) {
                lyb.toast(result.msg);
                if (that.classList.contains('icon-care')) {
                    that.classList.remove('icon-care');
                    that.classList.add('icon-care-empty');
                } else {
                    that.classList.add('icon-care');
                    that.classList.remove('icon-care-empty');
                }
            }
        }
    });
});

//评价
var doctor_pingjia = document.querySelector('#doctor_pingjia');
var evaluationList = jQuery('#evaluation_list');
lyb.ajax(ctx + 'doctor/info/doctorCommentsList?doctorId=' + params.id + '&pageNum=1&pageSize=5', {
    success: function (result) {
        var list = result.data || [];
        if (result.success) {
            var html = renderEvaluation(list);
            if (html) {
                evaluationList.append(html);
                doctor_pingjia.classList.remove('his-hide');
            }
        } else {
            lyb.error(result.msg);
        }
    }
});
var types = {'1': '还可以', '2': '满意', '3': '很满意'};

function renderEvaluation(list) {
    var html = '', list = list || [];
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        var tags = (item.contentTags && item.contentTags != '' ? item.contentTags.split(',') : []), yx = '';
        for (var j = 0; j < tags.length; j++) {
            yx += '<span class="illness-item doctor-eval-item">' + tags[j] + '</span>';
        }
        var type = Number(item.type || 0), pj = '';
        for (var index = 0; index < type; index++) {
            pj += '<i class="icon-star font14 marginRight8 red-color"></i>';
        }
        html += '<div class="weui-panel paddingBottom12" style="margin-bottom: 16px;">\n';
        html += '    <div class="his-flex marginBottom12">\n';
        html += '        <div class="his-flex">\n';
        html += '            <img src="//image-1252304461.file.myqcloud.com/image/doctor.png" class="doctor-eval-head" alt=""/>\n';
        html += '            <span class="font12 middle-color marginLeft12 marginRight8">' + item.patientName + '</span>\n';
        html += '            <div class="font12 light-color his-flex-grow">\n';
        html += pj;
        html += '            </div>\n';
        html += '        </div>\n';
        html += '        <span class="light-color font12">' + item.createTime + '</span>\n';
        html += '    </div>\n';
        html += '    <div class="marginBottom8">\n';
        html += '        <div class="illness-view his-flex-grow">\n';
        html += yx;
        html += '        </div>\n';
        html += '    </div>\n';
        if (item.content) {
            html += '    <div class="lineHeight22 middle-color marginBottom8">\n';
            html += item.content;
            html += '    </div>\n';
        }

        if (item.recent) {
            html += '    <div class="lineHeight22 middle-color marginBottom8">\n';
            html += '追加评论：' + item.recent;
            html += '    </div>\n';
        }
        if (item.masterSymptom) {
            html += '    <div class="" style="padding-top: 6px;position: relative;">\n';
            html += '        <span class="doctor-eval-angle"></span>\n';
            html += '        <div class="lineHeight22 light-color padding10" style="background: #f7f7f7;">\n';
            html += item.masterSymptom || '未填写';
            html += '        </div>\n';
            html += '    </div>\n';
        }
        html += '</div>'

    }
    return html;
}

if(params.isActiveGF === '1') {
    document.querySelector('#gaofang').classList.remove('his-hide');
}

function judgeBtnsStatuMethod(){
    if(GAOFANGJIE_STATUS.DIANHUA || GAOFANGJIE_STATUS.TUWEN){
        jQuery('#netGao').show();
        if(GAOFANGJIE_STATUS.TUWEN){
            var url = ctx + 'pay/wx/mp/redirect/buy_service?id=' + params.id + '&serviceType=graphic&isActiveGF=' + params.isActiveGF + '&channel=' + (params.channel || '');
            jQuery('#netGao').attr('data-href', url)
        }
    }
}

jQuery('.gaofang_link').on('click', 'a', function(){
    var href = this.dataset.href;
    var text = this.innerHTML;
    zhuge.track('膏方节活动', {
        '页面': '医生详情页',
        '类别': text
    }, function(){
        window.location.href = href;
    })
});
