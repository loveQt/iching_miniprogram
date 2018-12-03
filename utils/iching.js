!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("iching",[],e):"object"==typeof exports?exports.iching=e():t.iching=e()}(window,function(){return function(t){var e={};function r(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(i,n,function(e){return t[e]}.bind(null,n));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=10)}([function(t,e,r){"use strict";var i=this&&this.__values||function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],r=0;return e?e.call(t):{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}}};Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e){if(0===e.length)throw new Error("Polynomial is empty!");this.field=t;for(var r=0;r<e.length-1&&0===e[r];)r++;this.coefficients=e.slice(r)}return t.prototype.getDegree=function(){return this.coefficients.length-1},t.prototype.getCoefficients=function(){return this.coefficients},t.prototype.getCoefficient=function(t){if(t<0||t>=this.coefficients.length)throw new Error("Degree must be between 0 and the polynomial's degree!");return this.coefficients[this.coefficients.length-1-t]},t.prototype.evaluateAt=function(t){var e,r;if(0===t)return this.getCoefficient(0);var n=0;try{for(var o=i(this.coefficients),a=o.next();!a.done;a=o.next()){var s=a.value;n=this.field.add(s,this.field.multiply(n,t))}}catch(t){e={error:t}}finally{try{a&&!a.done&&(r=o.return)&&r.call(o)}finally{if(e)throw e.error}}return n},t.prototype.add=function(e){if(this.field!==e.field)throw new Error("BinaryGFPolys don't have same BinaryGF field");if(this.isZero())return e;if(e.isZero())return this;for(var r=Math.max(this.coefficients.length,e.coefficients.length),i=new Uint8ClampedArray(r),n=0;n<this.coefficients.length;n++)i[n+r-this.coefficients.length]=this.field.add(i[n+r-this.coefficients.length],this.coefficients[n]);for(n=0;n<e.coefficients.length;n++)i[n+r-e.coefficients.length]=this.field.add(i[n+r-e.coefficients.length],e.coefficients[n]);return new t(this.field,i)},t.prototype.multiplyPoly=function(e){if(this.field!==e.field)throw new Error("BinaryGFPolys don't have same BinaryGF field");if(this.isZero()||e.isZero())return this.field.getZeroPoly();if(this.isOne())return e;if(e.isOne())return this;for(var r=this.coefficients.length+e.coefficients.length-1,i=new Uint8ClampedArray(r),n=0;n<this.coefficients.length;n++)for(var o=0;o<e.coefficients.length;o++){var a=this.coefficients[n],s=e.coefficients[o];i[n+o]=this.field.add(i[n+o],this.field.multiply(a,s))}return new t(this.field,i)},t.prototype.multiplyScalar=function(e){if(0===e)return this.field.getZeroPoly();if(1===e)return this;for(var r=new Uint8ClampedArray(this.coefficients.length),i=0;i<this.coefficients.length;i++)r[i]=this.field.multiply(this.coefficients[i],e);return new t(this.field,r)},t.prototype.dividePoly=function(e){if(this.field!==e.field)throw new Error("BinaryGFPolys don't have same BinaryGF field");if(e.isZero())throw new Error("Division by zero!");if(this.isZero()||e.isOne())return[this,this.field.getZeroPoly()];for(var r=new Uint8ClampedArray(this.coefficients),i=e.coefficients[0],n=0;n<this.coefficients.length-e.coefficients.length+1;n++){r[n]=this.field.divide(r[n],i);var o=r[n];if(0!==o)for(var a=1;a<e.coefficients.length;a++)r[n+a]=this.field.add(r[n+a],this.field.multiply(o,e.coefficients[a]))}var s=e.coefficients.length-1;return[new t(this.field,r.slice(0,-s)),new t(this.field,r.slice(-s))]},t.prototype.isZero=function(){return 0===this.coefficients[0]},t.prototype.isOne=function(){return 1===this.coefficients.length&&1===this.coefficients[0]},t}();e.BinaryGFPoly=n},function(t,e,r){"use strict";var i,n=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),e.prototype.set=function(t,e,r){this.data[e*this.width+t]=0===r?0:1},e.prototype.toImage=function(){for(var t=this.width,e=this.height,r=new Uint8ClampedArray(4*e*t),i=0,n=0;n<e;n++)for(var o=0;o<t;o++){var a=255;1===this.get(o,n)&&(a=0),r[i]=a,r[i+1]=a,r[i+2]=a,r[i+3]=255,i+=4}return{width:t,height:e,data:r}},e}(r(3).Matrix);e.BitMatrix=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(5),n=function(){function t(){}return t.prototype.encode=function(e,r){if(0===e.length)throw new Error("Empty payload!");if(r<0||r>1)throw new Error("Error correction percentage must be a value between 0 - 1!");var n=Math.ceil(e.length*r)*t.SYMBOLS_PER_ERROR,o=t.OFFSET+e.length+n;if(o>t.MAX_SIZE)throw new Error("Payload and error correction level combination is too big!");for(var a=1;a*a<o;)a++;var s=a*a;n+=s-o&-2;var l=new Uint8ClampedArray(s-n);s-o&1&&(l[s-1-n]=0),l[0]=t.VERSION,l[1]=e.length,e=e.toUpperCase();for(var h=0;h<e.length;h++){var c=t.ALPHABET.indexOf(e[h]);if(-1===c)throw new Error("Invalid character in payload!");l[h+t.OFFSET]=c}var u,f=new i.ReedSolomonEncoder(i.BinaryGF.BINARY_GF_6);try{u=f.encode(l,n)}catch(t){throw new Error("Reed-Solomon encoding failed: '"+t.message+"'!")}return{version:l[0],size:a,data:u,imageData:null}},t.VERSION=1,t.MAX_SIZE=64,t.OFFSET=2,t.EC_NONE=0,t.EC_LOW=.05,t.EC_MEDIUM=.15,t.EC_HIGH=.25,t.SYMBOLS_PER_ERROR=2,t.ALPHABET='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(){}[]_+-=.,:;/?<>" ',t}();e.Encoder=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){if(!Number.isInteger(t)||!Number.isInteger(e))throw new Error("Width and height should be integers!");this.width=t,this.height=e,this.data=new Uint8ClampedArray(t*e)}return t.prototype.get=function(t,e){return this.data[e*this.width+t]},t}();e.Matrix=i},function(t,e,r){"use strict";var i,n=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0});var o=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),e.prototype.set=function(t,e,r){this.data[e*this.width+t]=r},e}(r(3).Matrix);e.ByteMatrix=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(16);e.BinaryGF=i.BinaryGF;var n=r(0);e.BinaryGFPoly=n.BinaryGFPoly;var o=r(17);e.ReedSolomonEncoder=o.ReedSolomonEncoder;var a=r(18);e.ReedSolomonDecoder=a.ReedSolomonDecoder},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(21);e.Writer=i.Writer},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sumArray=function(t){return t.reduce(function(t,e){return t+e})}},function(t,e,r){"use strict";var i=this&&this.__values||function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],r=0;return e?e.call(t):{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}}};Object.defineProperty(e,"__esModule",{value:!0});var n=r(7),o=function(){function t(){}return t.prototype.locate=function(t,e,r,i,n){void 0===r&&(r=!1),void 0===i&&(i={x:0,y:0}),void 0===n&&(n={x:t.width,y:t.height}),this.matrix=t,this.ratios=e,this.startX=i.x,this.startY=i.y,this.endX=n.x,this.endY=n.y,this.additionalChecks=r;for(var o=[],a=new Uint16Array(e.length),s=0,l=this.startY;l<this.endY;l+=2){for(var h=this.startX;h<this.endX;++h){if((1&s)===t.get(h,l)&&++s===e.length){if(this.isValidPattern(a)){var c=this.centerFromEnd({x:h-1,y:l},a),u=a[e.length>>1]<<2,f=this.calculatePatternMeasures(c,0,1,u);!0===this.isValidPattern(f.state)&&o.push(this.calculateLocationError(c,u))}for(var d=2;d<a.length;++d)a[d-2]=a[d];a[e.length-1]=a[e.length-2]=0,s=e.length-2}++a[s]}if(s===e.length-1&&this.isValidPattern(a))c=this.centerFromEnd({x:this.endX-1,y:l},a),o.push(this.calculateLocationError(c,2*a[e.length>>1]));else for(s=0,d=0;d<e.length;++d)a[d]=0}return o},t.prototype.centerFromEnd=function(t,e){for(var r=e.length>>1,i=e[r]>>1;++r<e.length;)i+=e[r];return{x:t.x-i,y:t.y}},t.prototype.isValidPattern=function(t){var e,r,o=0;try{for(var a=i(t),s=a.next();!s.done;s=a.next()){var l=s.value;if(0===l)return!1;o+=l}}catch(t){e={error:t}}finally{try{s&&!s.done&&(r=a.return)&&r.call(a)}finally{if(e)throw e.error}}var h=n.sumArray(this.ratios);if(o<h)return!1;for(var c=o/h,u=c/2,f=!0,d=0;d<this.ratios.length;++d)Math.abs(t[d]-c*this.ratios[d])>this.ratios[d]*u&&(f=!1);return f},t.prototype.calculateLocationError=function(e,r){var i=[0,1,1,-1,2,-1],o=[1,0,1,1,1,2],a=[1,1,t.SQRT2,t.SQRT2,t.SQRT5,t.SQRT5],s=i.length;this.additionalChecks||(s-=2);for(var l=n.sumArray(this.ratios),h=[],c=0,u=0,f=0,d=0;d<s;++d)h.push(this.calculatePatternMeasures(e,i[d],o[d],r/a[d])),c+=h[d].patternSize*a[d],u+=this.calculateStateError(h[d].state,h[d].patternSize/l),f+=h[d].centerError;c/=s,f/=s,u/=s*this.ratios.length;var y=0;for(d=0;d<s;++d)y+=(1-h[d].patternSize/c)*(1-h[d].patternSize/c);return y/=s,y*=t.SIZE_ERROR_FACTOR,{location:{x:h[1].location.x,y:h[0].location.y},error:u+f+y,size:c,standardRatioError:u,centerError:f,sizeError:y,measures:h,patternCenter:e}},t.prototype.calculateStateError=function(t,e){for(var r=0,i=0;i<this.ratios.length;++i){var n=t[i]/e/this.ratios[i]-1;r+=n*n}return r},t.prototype.calculatePatternMeasures=function(t,e,r,i){if(0===e&&0===r)throw new Error("x-axis and y-axis displacement should be either 1 or -1,             and they shouldn't be both zeros!");for(var o=new Uint16Array(this.ratios.length),a=t.x,s=t.y,l=-1===e?-1:this.matrix.width,h=-1===r?-1:this.matrix.height,c=this.ratios.length>>1,u=c;!(a===l||s===h||(1&u)===this.matrix.get(a,s)&&++u===this.ratios.length||++o[u]>i);)a+=e,s+=r;var f=o[c];for(a=t.x-e,s=t.y-r,l=1===e?-1:this.matrix.width,h=1===r?-1:this.matrix.height,u=c;!(a===l||s===h||(1&u)===this.matrix.get(a,s)&&-1==--u||++o[u]>i);)a-=e,s-=r;var d=o[c]-f,y=1-f/d;return y*=y,{location:{x:t.x+Math.floor((f-d)/2)*e,y:t.y+Math.floor((f-d)/2)*r},state:o,centerError:y,patternSize:n.sumArray(o)}},t.SQRT2=1.41421356237,t.SQRT5=2.2360679775,t.SIZE_ERROR_FACTOR=.1,t}();e.PatternLocator=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sqDistance=function(t,e){return(t.x-e.x)*(t.x-e.x)+(t.y-e.y)*(t.y-e.y)},e.distance=function(t,e){return Math.sqrt((t.x-e.x)*(t.x-e.x)+(t.y-e.y)*(t.y-e.y))},e.vec=function(t,e){return{x:e.x-t.x,y:e.y-t.y}},e.cross=function(t,e){return t.x*e.y-t.y*e.x},e.nearlySame=function(t,e,r){return Math.abs(t.x-e.x)<r&&Math.abs(t.y-e.y)<r}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(11);e.decode=i.decode;var n=r(28);e.encode=n.encode},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(12),n=r(15),o=r(19),a=r(22),s=r(24);function l(t,e,r){var l=(new i.FastAdaptiveBinarizer).binarize(t,e,r),h=(new a.Locator).locate(l),c=(new s.CodeTransform).transform(l,h),u=(new o.Extractor).extract(c),f=(new n.Decoder).decode(u);return f.patterns=h,f}e.decode=function(t,e,r){try{return l(t,e,r)}catch(a){for(var i=0,n=0;i<r;i++)for(var o=0;o<e;o++,n+=4)t[n]=255-t[n],t[n+1]=255-t[n+1],t[n+2]=255-t[n+2];return l(t,e,r)}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(13);e.FastAdaptiveBinarizer=i.FastAdaptiveBinarizer},function(t,e,r){"use strict";var i,n=this&&this.__extends||(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0});var o=r(1),a=r(4),s=r(14),l=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return n(e,t),e.prototype.binarize=function(t,r,i){if(t.length!==r*i*4)throw new Error("incorrect data length!");if(r<e.BLOCK_SIZE||i<e.BLOCK_SIZE)throw new Error("Image is too small!");for(var n=s.Binarizer.toGrayscale(t,r,i),a=this.calculateLocalMeanTable(n),l=e.MIN_VARIANCE,h=e.MEAN_CONST,c=new o.BitMatrix(r,i),u=e.BLOCK_SIZE,f=u>>1,d=0,y=void 0;d<i;++d){y=Math.max(Math.min(d+f,i-1)-u+1,0);for(var p=0,v=void 0;p<r;++p){v=Math.max(Math.min(p+f,r-1)-u+1,0);var _=n.get(p,d),E=a.get(v,y);if(Math.abs(E-_)<l)if(p>0&&d>0){var I=(n.get(p-1,d)+n.get(p,d-1)+n.get(p-1,d-1))/3;Math.abs(E-_)<Math.abs(I-_)&&(E=I)}else E=_/2-h;c.set(p,d,_<E?1:0),n.set(p,d,E)}}return c},e.prototype.calculateLocalMeanTable=function(t){for(var r=new a.ByteMatrix(t.width,t.height),i=new Uint16Array(t.height),n=e.BLOCK_SIZE,o=e.MEAN_CONST,s=r.width-n+1,l=r.height-n+1,h=0;h<r.height;++h)for(var c=0;c<n;++c)i[h]+=t.get(c,h);var u=0;for(h=0;h<n;++h)u+=i[h];r.set(0,0,u/(n*n)-o);var f=u;for(h=1;h<l;++h)u=f-i[h-1]+i[h+n-1],r.set(0,h,u/(n*n)-o),f=u;for(c=1;c<s;++c){for(h=0;h<r.height;++h)i[h]+=t.get(c+n-1,h)-t.get(c-1,h);for(u=0,h=0;h<n;++h)u+=i[h];for(r.set(c,0,u/(n*n)-o),f=u,h=1;h<l;++h)u=f-i[h-1]+i[h+n-1],r.set(c,h,u/(n*n)-o),f=u}return r},e.MEAN_CONST=3,e.MIN_VARIANCE=20,e.BLOCK_SIZE=30,e}(s.Binarizer);e.FastAdaptiveBinarizer=l},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(4),n=function(){function t(){}return t.toGrayscale=function(e,r,n){for(var o=new i.ByteMatrix(r,n),a=0;a<n;++a)for(var s=0;s<r;++s){var l=4*(a*r+s),h=e[l+0],c=e[l+1],u=e[l+2];o.set(s,a,h*t.TO_GRAY.RED+c*t.TO_GRAY.GREEN+u*t.TO_GRAY.BLUE)}return o},t.TO_GRAY={RED:.2126,GREEN:.7152,BLUE:.0722},t}();e.Binarizer=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(5),n=r(2),o=function(){function t(){}return t.prototype.decode=function(t){var e=t[0],r=Math.round(Math.sqrt(t.length));if(e!==n.Encoder.VERSION||r*r!==t.length)throw new Error("Invalid IChing code!");var o=n.Encoder.OFFSET,a=t[1];if(0===a||a+o>t.length)throw new Error("Invalid IChing code!");var s,l=t.length-o-a&-2;if(0!==l){var h=new i.ReedSolomonDecoder(i.BinaryGF.BINARY_GF_6);try{s=h.decode(t,l)}catch(t){throw new Error("Invalid IChing Code!")}}else s=t.slice();for(var c=0;c<o;c++)if(s[c]!==t[c])throw new Error("Invalid IChing Code!");var u=n.Encoder.ALPHABET,f="";for(c=0;c<a;c++){if(s[o+c]>=u.length)throw new Error("Invalid IChing Code!");f+=u[s[o+c]]}return{version:e,size:r,data:f,patterns:null}},t}();e.Decoder=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),n=function(){function t(e,r){if(r<1||r>t.M_LIMIT)throw new Error("Illegal value of Galois Field size!");this.size=1<<r,this.primitive=e,this.expTable=new Uint8ClampedArray(this.size),this.logTable=new Uint8ClampedArray(this.size);for(var n=1,o=0;o<this.size;o++)this.expTable[o]=n,this.logTable[n]=o,(n<<=1)&this.size&&(n^=this.primitive);this.zeroPoly=new i.BinaryGFPoly(this,new Uint8ClampedArray([0])),this.onePoly=new i.BinaryGFPoly(this,new Uint8ClampedArray([1]))}return t.prototype.getSize=function(){return this.size},t.prototype.exp=function(t){return this.expTable[t]},t.prototype.log=function(t){if(0===t)throw new Error("Log(0) is not defined in Galois Fields!");return this.logTable[t]},t.prototype.getZeroPoly=function(){return this.zeroPoly},t.prototype.getOnePoly=function(){return this.onePoly},t.prototype.buildMonomial=function(t,e){if(t<0)throw new Error("Monomial degree must be non-negative!");var r=new Uint8ClampedArray(t+1);return r[0]=e,new i.BinaryGFPoly(this,r)},t.prototype.add=function(t,e){return t^e},t.prototype.multiply=function(t,e){return 0===t||0===e?0:this.expTable[(this.logTable[t]+this.logTable[e])%(this.size-1)]},t.prototype.mulInverse=function(t){if(0===t)throw new Error("0 has no multiplicative inverse!");return this.expTable[this.size-1-this.logTable[t]]},t.prototype.divide=function(t,e){if(0===e)throw new Error("Division by zero!");return this.multiply(t,this.mulInverse(e))},t.PRIMITIVE_DEGREE_6=67,t.BINARY_GF_6=new t(t.PRIMITIVE_DEGREE_6,6),t.M_LIMIT=8,t}();e.BinaryGF=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),n=function(){function t(t){this.field=t,this.generators=[t.getOnePoly()]}return t.prototype.encode=function(t,e){if(0===t.length)throw new Error("No data symbols!");if(0===e)return new Uint8ClampedArray(t);var r=this.getGenerator(e),n=new Uint8ClampedArray(t.length+e);n.set(t);var o=new i.BinaryGFPoly(this.field,n).dividePoly(r)[1].getCoefficients();return n.set(o,n.length-o.length),n},t.prototype.getGenerator=function(t){for(var e=this.generators.length;e<=t;e++)this.generators.push(this.generators[e-1].multiplyPoly(new i.BinaryGFPoly(this.field,new Uint8ClampedArray([1,this.field.exp(e-1)]))));return this.generators[t]},t}();e.ReedSolomonEncoder=n},function(t,e,r){"use strict";var i=this&&this.__read||function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var i,n,o=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(i=o.next()).done;)a.push(i.value)}catch(t){n={error:t}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}return a};Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),o=function(){function t(t){this.field=t}return t.prototype.decode=function(t,e){var r=new n.BinaryGFPoly(this.field,t),o=this.computeSyndromes(r,e);if(o.isZero())return new Uint8ClampedArray(t);for(var a=i(this.computeLocatorAndEvaluator(o,e),2),s=a[0],l=a[1],h=this.computeErrorLocations(s),c=this.computeErrorMagnitudes(l,h),u=new Uint8ClampedArray(t),f=0;f<h.length;f++){var d=u.length-1-this.field.log(h[f]);if(d<0)throw new Error("Invalid error location");u[d]=this.field.add(u[d],c[f])}return u},t.prototype.computeSyndromes=function(t,e){for(var r=new Uint8ClampedArray(e),i=0;i<e;i++)r[e-1-i]=t.evaluateAt(this.field.exp(i));return new n.BinaryGFPoly(this.field,r)},t.prototype.computeLocatorAndEvaluator=function(t,e){for(var r=this.field.buildMonomial(e,1),i=t,n=this.field.getZeroPoly(),o=this.field.getOnePoly();i.getDegree()>=e/2;){var a=r.dividePoly(i)[0],s=r.add(a.multiplyPoly(i)),l=n.add(a.multiplyPoly(o));r=i,i=s,n=o,o=l}var h=o.getCoefficient(0),c=this.field.mulInverse(h);return[o.multiplyScalar(c),i.multiplyScalar(c)]},t.prototype.computeErrorLocations=function(t){for(var e=t.getDegree(),r=[],i=0,n=1;n<this.field.getSize();n++)0===t.evaluateAt(n)&&(i++,r.push(this.field.mulInverse(n)));if(i!==e)throw new Error("Error locator degree does not match number of roots!");return new Uint8ClampedArray(r)},t.prototype.computeErrorMagnitudes=function(t,e){for(var r=e.length,i=new Uint8ClampedArray(r),n=0;n<r;n++){for(var o=this.field.mulInverse(e[n]),a=1,s=0;s<r;s++)if(n!==s){var l=this.field.add(1,this.field.multiply(o,e[s]));a=this.field.multiply(a,l)}i[n]=this.field.multiply(t.evaluateAt(o),this.field.mulInverse(a))}return i},t}();e.ReedSolomonDecoder=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(20);e.Extractor=i.Extractor},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(2),n=r(6),o=r(7),a=r(8),s=function(){function t(){}return t.prototype.extract=function(e){var r=e.width,o=e.height;this.scale=this.estimateScale(e);var a=(n.Writer.UNIT_DIM,this.scale),s=n.Writer.SYMBOL_DIM*this.scale,l=n.Writer.GAP_DIM*this.scale,h=(n.Writer.FINDER_OUTER_RADIUS,this.scale),c=Math.round((r+l-s)/(l+s)),u=Math.round((o+l-s)/(l+s));if(c!==u)throw new Error("IChing code must be a square!");var f=(u+1)*n.Writer.SYMBOL_DIM+(u-1)*n.Writer.GAP_DIM;this.scale=(e.width+e.height)/f/2,a=n.Writer.UNIT_DIM*this.scale,s=n.Writer.SYMBOL_DIM*this.scale,l=n.Writer.GAP_DIM*this.scale,h=n.Writer.FINDER_OUTER_RADIUS*this.scale;for(var d=new Uint8ClampedArray(u*c),y=0;y<c;y++)for(var p=Math.round(h+y*(s+l)),v=Math.round(p+s),_=Math.round(h),E=Math.round(_+s),I=0;I<u;I++){for(var g=Math.max(0,Math.round(_-a)),R=this.fixHorizontalShift(e,p,_,v,E),m=R[0],M=R[1],w=E,O=!1,x=t.LINE_STATE_INVALID,S=0,A=g,T=0,L=(1<<n.Writer.BITS_PER_SYMBOL)-1,D=Math.min(e.height,Math.round(E+l));g<D&&!O;){var b=this.getHorizontalState(e,m,M,g);b===x?S++:(x!==t.LINE_STATE_INVALID&&S/a>t.UNIT_DIM_THRESHOLD&&(T>=n.Writer.BITS_PER_SYMBOL&&(L=L>>1|1<<--T),L&=~(1-x<<T),++T),x=b,S=1,A=g),x===t.LINE_STATE_INVALID&&S/l>t.GAP_DIM_THRESHOLD&&(A<=Math.round(E-a)?(1==++T&&Math.round(A+a),A=g+1,S=0):O=!0),g++}if(g===D?g-=Math.round(a):w=A,0===I&&0===y&&L!==i.Encoder.VERSION)throw new Error("Invalid IChing code!");if(0===I&&1===y&&L+i.Encoder.OFFSET>u*c)throw new Error("Invalid IChing code!");d[I*c+y]=L,p=m,v=M,_=Math.round(w+l),E=Math.round(_+s)}return d},t.prototype.estimateScale=function(t){var e,r=0,i=0;if(e=this.scanFinderRadius(t,{x:0,y:0},1,0),this.isValidFinderRadius(e)&&(r+=e[0]+e[1]+e[2],i++),e=this.scanFinderRadius(t,{x:0,y:0},0,1),this.isValidFinderRadius(e)&&(r+=e[0]+e[1]+e[2],i++),e=this.scanFinderRadius(t,{x:0,y:0},1,1),this.isValidFinderRadius(e)&&(r+=(e[0]+e[1]+e[2])*a.PatternLocator.SQRT2,i++),e=this.scanFinderRadius(t,{x:0,y:t.height-1},1,0),this.isValidFinderRadius(e)&&(r+=e[0]+e[1]+e[2],i++),e=this.scanFinderRadius(t,{x:0,y:t.height-1},0,-1),this.isValidFinderRadius(e)&&(r+=e[0]+e[1]+e[2],i++),e=this.scanFinderRadius(t,{x:0,y:t.height-1},1,-1),this.isValidFinderRadius(e)&&(r+=(e[0]+e[1]+e[2])*a.PatternLocator.SQRT2,i++),e=this.scanFinderRadius(t,{x:t.width-1,y:0},-1,0),this.isValidFinderRadius(e)&&(r+=e[0]+e[1]+e[2],i++),e=this.scanFinderRadius(t,{x:t.width-1,y:0},0,1),this.isValidFinderRadius(e)&&(r+=e[0]+e[1]+e[2],i++),e=this.scanFinderRadius(t,{x:t.width-1,y:0},-1,1),this.isValidFinderRadius(e)&&(r+=(e[0]+e[1]+e[2])*a.PatternLocator.SQRT2,i++),0===i)throw new Error("No valid finder patterns found!");return(r-i)/i/n.Writer.FINDER_OUTER_RADIUS},t.prototype.scanFinderRadius=function(t,e,r,i){if(Math.abs(r)>1||Math.abs(i)>1||0===r&&0===i)throw new Error("Invalid scanning direction");for(var n=0,o=[0,0,0],a=e.x,s=e.y;a>=0&&a<t.width&&s>=0&&s<t.height&&((1&n)===t.get(a,s)&&n++,3!==n);)o[n]++,a+=r,s+=i;return o},t.prototype.isValidFinderRadius=function(t){if(3!==t.length||0===t[0]||0===t[1]||0===t[2])return!1;for(var e=[n.Writer.FINDER_INNER_RADIUS,n.Writer.FINDER_MIDDLE_RADIUS-n.Writer.FINDER_INNER_RADIUS,n.Writer.FINDER_OUTER_RADIUS-n.Writer.FINDER_MIDDLE_RADIUS],r=o.sumArray(t)/o.sumArray(e),i=r/3,a=!0,s=0;s<e.length;++s)Math.abs(t[s]-r*e[s])>e[s]*i&&(a=!1);return a},t.prototype.fixHorizontalShift=function(e,r,i,n,o){for(var a=t.VERTICAL_BORDER_BLACK_THRESHOLD,s=o-i+1,l=(e.width,r),h=n,c=Math.round((n-r)/2),u=Math.max(0,l-c),f=Math.min(e.width-1,h+c);r>u&&this.countBlackInLine(e,r,i,r,o)/s>a;)r--;for(;r<f&&this.countBlackInLine(e,r,i,r,o)/s<a;)r++;for(;n<f&&this.countBlackInLine(e,n,i,n,o)/s>a;)n++;for(;n>u&&this.countBlackInLine(e,n,i,n,o)/s<a;)n--;return n<=r||r===u||n===f?[l,h]:[r,n]},t.prototype.countBlackInLine=function(t,e,r,i,n){if(e!==i&&r!==n)throw new Error("Line must be horizontal or vertical!");for(var o=0,a=e;a<=i;a++)for(var s=r;s<=n;s++)o+=t.get(a,s);return o},t.prototype.getHorizontalState=function(e,r,i,o){var a=i-r+1;if(this.countBlackInLine(e,r,o,i,o)/a<t.LINE_VALID_BLACK_THRESHOLD)return t.LINE_STATE_INVALID;var s=Math.floor(r+n.Writer.BIT_ZERO_OFFSET*this.scale),l=Math.ceil(i-n.Writer.BIT_ZERO_OFFSET*this.scale),h=l-s+1;return this.countBlackInLine(e,s,o,l,o)/h<t.LINE_ONE_BLACK_THRESHOLD?t.LINE_STATE_ZERO:t.LINE_STATE_ONE},t.FINDER_ERROR_THRESHOLD=.2,t.VERTICAL_BORDER_BLACK_THRESHOLD=.25,t.LINE_VALID_BLACK_THRESHOLD=.5,t.LINE_ONE_BLACK_THRESHOLD=.8,t.GAP_DIM_THRESHOLD=.67,t.UNIT_DIM_THRESHOLD=.5,t.LINE_STATE_INVALID=-1,t.LINE_STATE_ZERO=0,t.LINE_STATE_ONE=1,t}();e.Extractor=s},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(1),n=function(){function t(t,e,r){this.resolution=t,this.roundEdges=e,this.inverted=r}return t.prototype.render=function(e){var r=e.size,n=r*t.SYMBOL_DIM+(r-1)*t.GAP_DIM+2*(2*t.FINDER_OUTER_RADIUS+t.QUIET_ZONE);if(this.scale=Math.floor(this.resolution/n),this.scale<1)throw new Error("Resolution is too small!");this.matrix=new i.BitMatrix(this.resolution,this.resolution),this.pad=Math.floor((this.resolution-n*this.scale)/2);var o=(t.QUIET_ZONE+t.FINDER_OUTER_RADIUS)*this.scale+this.pad;this.drawFinderPattern({x:o,y:o}),this.drawFinderPattern({x:this.resolution-o,y:o}),this.drawFinderPattern({x:o,y:this.resolution-o}),this.drawAlignmentPattern({x:this.resolution-o,y:this.resolution-o});for(var a=0;a<r;a++)for(var s=0;s<r;s++)this.drawSymbol(a,s,e.data[a*r+s]);if(this.inverted)for(a=0;a<this.resolution;a++)for(s=0;s<this.resolution;s++)this.matrix.set(a,s,1-this.matrix.get(a,s));e.imageData=this.matrix.toImage()},t.prototype.drawFinderPattern=function(e){var r=t.FINDER_INNER_RADIUS*this.scale,i=t.FINDER_MIDDLE_RADIUS*this.scale,n=t.FINDER_OUTER_RADIUS*this.scale;this.fillCircle(e,n,1),this.fillCircle(e,i,0),this.fillCircle(e,r,1)},t.prototype.drawAlignmentPattern=function(e){var r=t.FINDER_INNER_RADIUS*this.scale,i=t.FINDER_MIDDLE_RADIUS*this.scale;this.fillCircle(e,i,1),this.fillCircle(e,r,0)},t.prototype.fillCircle=function(t,e,r){e=Math.round(e),t={x:Math.round(t.x),y:Math.round(t.y)};for(var i=e,n=0,o=1-2*e,a=1,s=0;i>=n;)this.fillSymmetricOctant(t,i,n,r),n++,s+=a,a+=2,2*s+o>0&&(i--,s+=o,o+=2)},t.prototype.fillSymmetricOctant=function(t,e,r,i){this.fillHorizontalLine(t.x-e,t.x+e,t.y+r,i),this.fillHorizontalLine(t.x-e,t.x+e,t.y-r,i),this.fillHorizontalLine(t.x-r,t.x+r,t.y+e,i),this.fillHorizontalLine(t.x-r,t.x+r,t.y-e,i)},t.prototype.fillHorizontalLine=function(t,e,r,i){for(var n=t;n<=e;n++)this.matrix.set(n,r,i)},t.prototype.drawSymbol=function(e,r,i){for(var n=t.QUIET_ZONE+2*t.FINDER_OUTER_RADIUS,o=(r*(t.SYMBOL_DIM+t.GAP_DIM)+n)*this.scale+this.pad,a=(e*(t.SYMBOL_DIM+t.GAP_DIM)+n)*this.scale+this.pad,s=t.SYMBOL_DIM*this.scale,l=t.UNIT_DIM*this.scale,h=t.BIT_ZERO_OFFSET*this.scale,c=t.BIT_ZERO_WIDTH*this.scale,u=l/2-1,f=0,d=o,y=a;f<t.BITS_PER_SYMBOL;f++,y+=2*l)this.fillRect(d+u,y,s-2*u,l,1),this.roundEdges?(this.fillCircle({x:d+u,y:y+u},u,1),this.fillCircle({x:d+u,y:y+u+1},u,1),this.fillCircle({x:d+s-u,y:y+u},u,1),this.fillCircle({x:d+s-u,y:y+u+1},u,1)):(this.fillRect(d,y,u,l,1),this.fillRect(d+s-u,y,u,l,1)),0==(i&1<<f)&&(this.fillRect(d+h-u,y,c+2*u,l,0),this.roundEdges?(this.fillCircle({x:d+h-u,y:y+u},u,1),this.fillCircle({x:d+h-u,y:y+u+1},u,1),this.fillCircle({x:d+h+c+u,y:y+u},u,1),this.fillCircle({x:d+h+c+u,y:y+u+1},u,1)):(this.fillRect(d+h-u,y,u,l,1),this.fillRect(d+h+c,y,u,l,1)))},t.prototype.fillRect=function(t,e,r,i,n){for(var o=0;o<i;o++)for(var a=0;a<r;a++)this.matrix.set(t+a,e+o,n)},t.UNIT_DIM=2,t.BITS_PER_SYMBOL=6,t.SYMBOL_DIM=(2*t.BITS_PER_SYMBOL-1)*t.UNIT_DIM,t.BIT_ZERO_OFFSET=4.5*t.UNIT_DIM,t.BIT_ZERO_WIDTH=2*t.UNIT_DIM,t.GAP_DIM=3*t.UNIT_DIM,t.FINDER_OUTER_RADIUS=.5*t.SYMBOL_DIM,t.FINDER_MIDDLE_RADIUS=5*t.FINDER_OUTER_RADIUS/7,t.FINDER_INNER_RADIUS=3*t.FINDER_OUTER_RADIUS/7,t.QUIET_ZONE=t.SYMBOL_DIM,t}();e.Writer=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(23);e.Locator=i.Locator},function(t,e,r){"use strict";var i=this&&this.__values||function(t){var e="function"==typeof Symbol&&t[Symbol.iterator],r=0;return e?e.call(t):{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}}},n=this&&this.__read||function(t,e){var r="function"==typeof Symbol&&t[Symbol.iterator];if(!r)return t;var i,n,o=r.call(t),a=[];try{for(;(void 0===e||e-- >0)&&!(i=o.next()).done;)a.push(i.value)}catch(t){n={error:t}}finally{try{i&&!i.done&&(r=o.return)&&r.call(o)}finally{if(n)throw n.error}}return a};Object.defineProperty(e,"__esModule",{value:!0});var o=r(9),a=r(8),s=function(){function t(){}return t.prototype.locate=function(e){var r,n;this.matrix=e,this.locations={};var s=function(t,e){return t.error-e.error},l=new a.PatternLocator,h=l.locate(this.matrix,t.FINDER_RATIOS);h.sort(s);var c=this.findOptimalPatterns(h),u=Math.max(c[0].size,c[1].size,c[2].size);c=this.findOptimalPatterns(h,u),this.assignFinders(c[0].location,c[1].location,c[2].location),this.locations.finderAverageSize=(c[0].size+c[1].size+c[2].size)/3,this.locations.bottomRight={x:this.locations.topRight.x-this.locations.topLeft.x+this.locations.bottomLeft.x,y:this.locations.topRight.y-this.locations.topLeft.y+this.locations.bottomLeft.y},this.locations.alignmentSize=this.locations.finderAverageSize*t.ALIGNMENT_TO_FINDER_RATIO;var f=o.distance(this.locations.topLeft,this.locations.topRight);f+=o.distance(this.locations.topLeft,this.locations.bottomLeft),f=Math.round(f/2);var d={x:Math.max(0,this.locations.bottomRight.x-f),y:Math.max(0,this.locations.bottomRight.y-f)},y={x:Math.min(e.width,this.locations.bottomRight.x+f),y:Math.min(e.height,this.locations.bottomRight.y+f)},p=l.locate(this.matrix,t.ALIGNMENT_RATIOS,!0,d,y),v=this.locations.alignmentSize;if(p.length>0){p.sort(s);try{for(var _=i(p),E=_.next();!E.done;E=_.next()){var I=E.value;if(I.size<t.LOOSE_SIZE_TOLERANCE*v&&I.size*t.CONFINED_SIZE_TOLERANCE>v){this.locations.bottomRight=I.location,this.locations.alignmentSize=I.size;break}}}catch(t){r={error:t}}finally{try{E&&!E.done&&(n=_.return)&&n.call(_)}finally{if(r)throw r.error}}}return this.locations},t.prototype.findOptimalPatterns=function(e,r){for(var n,a,s=[],l=0;l<e.length&&s.length<3;++l){var h=!0;try{for(var c=i(s),u=c.next();!u.done;u=c.next()){var f=u.value;if(o.nearlySame(f.location,e[l].location,t.MIN_PATTERN_DIST)){h=!1;break}}}catch(t){n={error:t}}finally{try{u&&!u.done&&(a=c.return)&&a.call(c)}finally{if(n)throw n.error}}h&&(!r||e[l].size<t.LOOSE_SIZE_TOLERANCE*r&&e[l].size*t.CONFINED_SIZE_TOLERANCE>r)&&s.push(e[l])}if(s.length<3)throw new Error("Couldn't Locate Finder Patterns!");return s},t.prototype.assignFinders=function(t,e,r){var i,a,s,l=o.sqDistance(t,e),h=o.sqDistance(t,r),c=o.sqDistance(e,r);h>l&&h>c?(r=(i=n([e,r],2))[0],e=i[1]):c>l&&(r=(a=n([t,r],2))[0],t=a[1]),o.cross(o.vec(t,e),o.vec(t,r))>0&&(t=(s=n([e,t],2))[0],e=s[1]),this.locations.bottomLeft=t,this.locations.topRight=e,this.locations.topLeft=r},t.MIN_PATTERN_DIST=50,t.ALIGNMENT_TO_FINDER_RATIO=5/7,t.LOOSE_SIZE_TOLERANCE=5,t.CONFINED_SIZE_TOLERANCE=4,t.FINDER_RATIOS=new Uint8Array([1,1,3,1,1]),t.ALIGNMENT_RATIOS=new Uint8Array([1,3,1]),t}();e.Locator=s},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(25);e.CodeTransform=i.CodeTransform},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(1),n=r(9),o=r(26),a=function(){function t(){}return t.prototype.transform=function(t,e){for(var r=Math.round((n.distance(e.topLeft,e.topRight)+n.distance(e.topLeft,e.bottomLeft))/2),a=new o.PerspectiveTransform([{x:r-1,y:0},{x:0,y:0},{x:0,y:r-1},{x:r-1,y:r-1}],[e.topRight,e.topLeft,e.bottomLeft,e.bottomRight]),s=new i.BitMatrix(r,r),l=0;l<r;++l)for(var h=0;h<r;++h){var c=a.transform({x:l,y:h});c={x:Math.round(c.x),y:Math.round(c.y)},s.set(l,h,t.get(c.x,c.y))}return s},t}();e.CodeTransform=a},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(27),n=function(){function t(t,e){if(4!==t.length||4!==e.length)throw new Error("Both source and distination point have to be exactly four points!");this.mat=this.quadrilateralToUnitSquareMatrix(t[0].x,t[0].y,t[1].x,t[1].y,t[2].x,t[2].y,t[3].x,t[3].y).times(this.unitSquareToQuadrilateralMatrix(e[0].x,e[0].y,e[1].x,e[1].y,e[2].x,e[2].y,e[3].x,e[3].y))}return t.prototype.transform=function(t){var e=this.mat.dotColumn(2,[t.x,t.y,1]);return{x:this.mat.dotColumn(0,[t.x,t.y,1])/e,y:this.mat.dotColumn(1,[t.x,t.y,1])/e}},t.prototype.quadrilateralToUnitSquareMatrix=function(t,e,r,i,n,o,a,s){return this.unitSquareToQuadrilateralMatrix(t,e,r,i,n,o,a,s).adjugate()},t.prototype.unitSquareToQuadrilateralMatrix=function(t,e,r,n,o,a,s,l){var h=r-o,c=s-o,u=t-r+o-s,f=n-a,d=l-a,y=e-n+a-l,p=h*d-c*f,v=new i.TransformationMatrix,_=(u*d-c*y)/p,E=(h*y-u*f)/p;return v.set(0,0,r-t+_*r),v.set(1,0,s-t+E*s),v.set(2,0,t),v.set(0,1,n-e+_*n),v.set(1,1,l-e+E*l),v.set(2,1,e),v.set(0,2,_),v.set(1,2,E),v.set(2,2,1),v},t}();e.PerspectiveTransform=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t){this.A=[];for(var e=0;e<3;++e)this.A.push(new Float32Array(3));if(null!==t&&void 0!==t)for(e=0;e<3;++e)for(var r=0;r<3;++r)this.A[e][r]=t.A[e][r]}return t.prototype.get=function(t,e){return this.A[t][e]},t.prototype.set=function(t,e,r){this.A[t][e]=r},t.prototype.dotRow=function(t,e){if(3!==e.length)throw new Error("The Other vector has to be of length 3!");return this.A[t][0]*e[0]+this.A[t][1]*e[1]+this.A[t][2]*e[2]},t.prototype.dotColumn=function(t,e){if(3!==e.length)throw new Error("The Other vector has to be of length 3!");return this.A[0][t]*e[0]+this.A[1][t]*e[1]+this.A[2][t]*e[2]},t.prototype.cofactor=function(){for(var e=new t,r=e.A,i=this.A,n=0,o=1;n<3;++n)for(var a=0;a<3;++a,o*=-1){for(var s=[],l=[],h=0;h<3;++h)h!==n&&s.push(h),h!==a&&l.push(h);r[n][a]=o*(i[s[0]][l[0]]*i[s[1]][l[1]]-i[s[0]][l[1]]*i[s[1]][l[0]])}return e},t.prototype.transpose=function(){for(var e=new t,r=e.A,i=this.A,n=0;n<3;++n)for(var o=0;o<3;++o)r[o][n]=i[n][o];return e},t.prototype.adjugate=function(){return this.cofactor().transpose()},t.prototype.times=function(e){for(var r=new t,i=r.A,n=e.A,o=this.A,a=0;a<3;++a)for(var s=0;s<3;++s){i[a][s]=0;for(var l=0;l<3;++l)i[a][s]+=o[a][l]*n[l][s]}return r},t}();e.TransformationMatrix=i},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=r(2),n=r(6);e.encode=function(t,e){void 0!==(e=e||{}).ecLevel&&null!==e.ecLevel||(e.ecLevel=i.Encoder.EC_MEDIUM),void 0!==e.resolution&&null!==e.resolution||(e.resolution=1250),void 0!==e.roundEdges&&null!==e.roundEdges||(e.roundEdges=!1),void 0!==e.inverted&&null!==e.inverted||(e.inverted=!1);var r=(new i.Encoder).encode(t,e.ecLevel);return new n.Writer(e.resolution,e.roundEdges,e.inverted).render(r),r}}])});
//# sourceMappingURL=index.min.js.map