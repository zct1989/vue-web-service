(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~203e0718"],{

/***/ "0347":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* reexport */ isMobile; });

// CONCATENATED MODULE: ./node_modules/ismobilejs/esm/isMobile.js
const appleIphone = /iPhone/i;
const appleIpod = /iPod/i;
const appleTablet = /iPad/i;
const androidPhone = /\bAndroid(?:.+)Mobile\b/i;
const androidTablet = /Android/i;
const amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i;
const amazonTablet = /Silk/i;
const windowsPhone = /Windows Phone/i;
const windowsTablet = /\bWindows(?:.+)ARM\b/i;
const otherBlackBerry = /BlackBerry/i;
const otherBlackBerry10 = /BB10/i;
const otherOpera = /Opera Mini/i;
const otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
const otherFirefox = /Mobile(?:.+)Firefox\b/i;
function match(regex, userAgent) {
    return regex.test(userAgent);
}
function isMobile(userAgent) {
    userAgent =
        userAgent || (typeof navigator !== 'undefined' ? navigator.userAgent : '');
    let tmp = userAgent.split('[FBAN');
    if (typeof tmp[1] !== 'undefined') {
        userAgent = tmp[0];
    }
    tmp = userAgent.split('Twitter');
    if (typeof tmp[1] !== 'undefined') {
        userAgent = tmp[0];
    }
    const result = {
        apple: {
            phone: match(appleIphone, userAgent) && !match(windowsPhone, userAgent),
            ipod: match(appleIpod, userAgent),
            tablet: !match(appleIphone, userAgent) &&
                match(appleTablet, userAgent) &&
                !match(windowsPhone, userAgent),
            device: (match(appleIphone, userAgent) ||
                match(appleIpod, userAgent) ||
                match(appleTablet, userAgent)) &&
                !match(windowsPhone, userAgent),
        },
        amazon: {
            phone: match(amazonPhone, userAgent),
            tablet: !match(amazonPhone, userAgent) && match(amazonTablet, userAgent),
            device: match(amazonPhone, userAgent) || match(amazonTablet, userAgent),
        },
        android: {
            phone: (!match(windowsPhone, userAgent) && match(amazonPhone, userAgent)) ||
                (!match(windowsPhone, userAgent) && match(androidPhone, userAgent)),
            tablet: !match(windowsPhone, userAgent) &&
                !match(amazonPhone, userAgent) &&
                !match(androidPhone, userAgent) &&
                (match(amazonTablet, userAgent) || match(androidTablet, userAgent)),
            device: (!match(windowsPhone, userAgent) &&
                (match(amazonPhone, userAgent) ||
                    match(amazonTablet, userAgent) ||
                    match(androidPhone, userAgent) ||
                    match(androidTablet, userAgent))) ||
                match(/\bokhttp\b/i, userAgent),
        },
        windows: {
            phone: match(windowsPhone, userAgent),
            tablet: match(windowsTablet, userAgent),
            device: match(windowsPhone, userAgent) || match(windowsTablet, userAgent),
        },
        other: {
            blackberry: match(otherBlackBerry, userAgent),
            blackberry10: match(otherBlackBerry10, userAgent),
            opera: match(otherOpera, userAgent),
            firefox: match(otherFirefox, userAgent),
            chrome: match(otherChrome, userAgent),
            device: match(otherBlackBerry, userAgent) ||
                match(otherBlackBerry10, userAgent) ||
                match(otherOpera, userAgent) ||
                match(otherFirefox, userAgent) ||
                match(otherChrome, userAgent),
        },
        any: false,
        phone: false,
        tablet: false,
    };
    result.any =
        result.apple.device ||
            result.android.device ||
            result.windows.device ||
            result.other.device;
    result.phone =
        result.apple.phone || result.android.phone || result.windows.phone;
    result.tablet =
        result.apple.tablet || result.android.tablet || result.windows.tablet;
    return result;
}
//# sourceMappingURL=isMobile.js.map
// CONCATENATED MODULE: ./node_modules/ismobilejs/esm/index.js


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "05cd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isNegativeZero(number) {
	return number === 0 && (1 / number) === -Infinity;
};



/***/ }),

/***/ "1c0b4":
/***/ (function(module, exports) {

/*

Copyright (c) 2012-2014 Jeffrey Mealo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

------------------------------------------------------------------------------------------------------------------------

Based loosely on Luka Pusic's PHP Script: http://360percents.com/posts/php-random-user-agent-generator/

The license for that script is as follows:

"THE BEER-WARE LICENSE" (Revision 42):

<pusic93@gmail.com> wrote this file. As long as you retain this notice you can do whatever you want with this stuff.
If we meet some day, and you think this stuff is worth it, you can buy me a beer in return. Luka Pusic
*/

function rnd(a, b) {
    //calling rnd() with no arguments is identical to rnd(0, 100)
    a = a || 0;
    b = b || 100;

    if (typeof b === 'number' && typeof a === 'number') {
        //rnd(int min, int max) returns integer between min, max
        return (function (min, max) {
            if (min > max) {
                throw new RangeError('expected min <= max; got min = ' + min + ', max = ' + max);
            }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }(a, b));
    }

    if (Object.prototype.toString.call(a) === "[object Array]") {
        //returns a random element from array (a), even weighting
        return a[Math.floor(Math.random() * a.length)];
    }

    if (a && typeof a === 'object') {
        //returns a random key from the passed object; keys are weighted by the decimal probability in their value
        return (function (obj) {
            var rand = rnd(0, 100) / 100, min = 0, max = 0, key, return_val;

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    max = obj[key] + min;
                    return_val = key;
                    if (rand >= min && rand <= max) {
                        break;
                    }
                    min = min + obj[key];
                }
            }

            return return_val;
        }(a));
    }

    throw new TypeError('Invalid arguments passed to rnd. (' + (b ? a + ', ' + b : a) + ')');
}

function randomLang() {
    return rnd(['AB', 'AF', 'AN', 'AR', 'AS', 'AZ', 'BE', 'BG', 'BN', 'BO', 'BR', 'BS', 'CA', 'CE', 'CO', 'CS',
                'CU', 'CY', 'DA', 'DE', 'EL', 'EN', 'EO', 'ES', 'ET', 'EU', 'FA', 'FI', 'FJ', 'FO', 'FR', 'FY',
                'GA', 'GD', 'GL', 'GV', 'HE', 'HI', 'HR', 'HT', 'HU', 'HY', 'ID', 'IS', 'IT', 'JA', 'JV', 'KA',
                'KG', 'KO', 'KU', 'KW', 'KY', 'LA', 'LB', 'LI', 'LN', 'LT', 'LV', 'MG', 'MK', 'MN', 'MO', 'MS',
                'MT', 'MY', 'NB', 'NE', 'NL', 'NN', 'NO', 'OC', 'PL', 'PT', 'RM', 'RO', 'RU', 'SC', 'SE', 'SK',
                'SL', 'SO', 'SQ', 'SR', 'SV', 'SW', 'TK', 'TR', 'TY', 'UK', 'UR', 'UZ', 'VI', 'VO', 'YI', 'ZH']);
}

function randomBrowserAndOS() {
    var browser = rnd({
        chrome:    .45132810566,
        iexplorer: .27477061836,
        firefox:   .19384170608,
        safari:    .06186781118,
        opera:     .01574236955
    }),
    os = {
        chrome:  {win: .89,  mac: .09 , lin: .02},
        firefox: {win: .83,  mac: .16,  lin: .01},
        opera:   {win: .91,  mac: .03 , lin: .06},
        safari:  {win: .04 , mac: .96  },
        iexplorer: ['win']
    };

    return [browser, rnd(os[browser])];
}

function randomProc(arch) {
    var procs = {
        lin:['i686', 'x86_64'],
        mac: {'Intel' : .48, 'PPC': .01, 'U; Intel':.48, 'U; PPC' :.01},
        win:['', 'WOW64', 'Win64; x64']
    };
    return rnd(procs[arch]);
}

function randomRevision(dots) {
    var return_val = '';
    //generate a random revision
    //dots = 2 returns .x.y where x & y are between 0 and 9
    for (var x = 0; x < dots; x++) {
        return_val += '.' + rnd(0, 9);
    }
    return return_val;
}

var version_string = {
    net: function () {
        return [rnd(1, 4), rnd(0, 9), rnd(10000, 99999), rnd(0, 9)].join('.');
    },
    nt: function () {
        return rnd(5, 6) + '.' + rnd(0, 3);
    },
    ie: function () {
        return rnd(7, 11);
    },
    trident: function () {
        return rnd(3, 7) + '.' + rnd(0, 1);
    },
    osx: function (delim) {
        return [10, rnd(5, 10), rnd(0, 9)].join(delim || '.');
    },
    chrome: function () {
        return [rnd(13, 39), 0, rnd(800, 899), 0].join('.');
    },
    presto: function () {
        return '2.9.' + rnd(160, 190);
    },
    presto2: function () {
        return rnd(10, 12) + '.00';
    },
    safari: function () {
        return rnd(531, 538) + '.' + rnd(0, 2) + '.' + rnd(0,2);
    }
};

var browser = {
    firefox: function firefox(arch) {
        //https://developer.mozilla.org/en-US/docs/Gecko_user_agent_string_reference
        var firefox_ver = rnd(5, 15) + randomRevision(2),
            gecko_ver = 'Gecko/20100101 Firefox/' + firefox_ver,
            proc = randomProc(arch),
            os_ver = (arch === 'win') ? '(Windows NT ' + version_string.nt() + ((proc) ? '; ' + proc : '')
            : (arch === 'mac') ? '(Macintosh; ' + proc + ' Mac OS X ' + version_string.osx()
            : '(X11; Linux ' + proc;

        return 'Mozilla/5.0 ' + os_ver + '; rv:' + firefox_ver.slice(0, -2) + ') ' + gecko_ver;
    },

    iexplorer: function iexplorer() {
        var ver = version_string.ie();

        if (ver >= 11) {
            //http://msdn.microsoft.com/en-us/library/ie/hh869301(v=vs.85).aspx
            return 'Mozilla/5.0 (Windows NT 6.' + rnd(1,3) + '; Trident/7.0; ' + rnd(['Touch; ', '']) + 'rv:11.0) like Gecko';
        }

        //http://msdn.microsoft.com/en-us/library/ie/ms537503(v=vs.85).aspx
        return 'Mozilla/5.0 (compatible; MSIE ' + ver + '.0; Windows NT ' + version_string.nt() + '; Trident/' +
            version_string.trident() + ((rnd(0, 1) === 1) ? '; .NET CLR ' + version_string.net() : '') + ')';
    },

    opera: function opera(arch) {
        //http://www.opera.com/docs/history/
        var presto_ver = ' Presto/' + version_string.presto() + ' Version/' + version_string.presto2() + ')',
            os_ver = (arch === 'win') ? '(Windows NT ' + version_string.nt() + '; U; ' + randomLang() + presto_ver
            : (arch === 'lin') ? '(X11; Linux ' + randomProc(arch) + '; U; ' + randomLang() + presto_ver
            : '(Macintosh; Intel Mac OS X ' + version_string.osx() + ' U; ' + randomLang() + ' Presto/' +
            version_string.presto() + ' Version/' + version_string.presto2() + ')';

        return 'Opera/' + rnd(9, 14) + '.' + rnd(0, 99) + ' ' + os_ver;
    },

    safari: function safari(arch) {
        var safari = version_string.safari(),
            ver = rnd(4, 7) + '.' + rnd(0,1) + '.' + rnd(0,10),
            os_ver = (arch === 'mac') ? '(Macintosh; ' + randomProc('mac') + ' Mac OS X '+ version_string.osx('_') + ' rv:' + rnd(2, 6) + '.0; '+ randomLang() + ') '
            : '(Windows; U; Windows NT ' + version_string.nt() + ')';

        return 'Mozilla/5.0 ' + os_ver + 'AppleWebKit/' + safari + ' (KHTML, like Gecko) Version/' + ver + ' Safari/' + safari;
    },

    chrome: function chrome(arch) {
        var safari = version_string.safari(),
            os_ver = (arch === 'mac') ? '(Macintosh; ' + randomProc('mac') + ' Mac OS X ' + version_string.osx('_') + ') '
            : (arch === 'win') ? '(Windows; U; Windows NT ' + version_string.nt() + ')'
            : '(X11; Linux ' + randomProc(arch);

        return 'Mozilla/5.0 ' + os_ver + ' AppleWebKit/' + safari + ' (KHTML, like Gecko) Chrome/' + version_string.chrome() + ' Safari/' + safari;
    }
};

exports.generate = function generate() {
    var random = randomBrowserAndOS();
    return browser[random[0]](random[1]);
};


/***/ }),

/***/ "1dc2":
/***/ (function(module, exports) {

// this program is a JavaScript version of Mersenne Twister, with concealment and encapsulation in class,
// an almost straight conversion from the original program, mt19937ar.c,
// translated by y. okada on July 17, 2006.
// and modified a little at july 20, 2006, but there are not any substantial differences.
// in this program, procedure descriptions and comments of original source code were not removed.
// lines commented with //c// were originally descriptions of c procedure. and a few following lines are appropriate JavaScript descriptions.
// lines commented with /* and */ are original comments.
// lines commented with // are additional comments in this JavaScript version.
// before using this version, create at least one instance of MersenneTwister19937 class, and initialize the each state, given below in c comments, of all the instances.
/*
   A C-program for MT19937, with initialization improved 2002/1/26.
   Coded by Takuji Nishimura and Makoto Matsumoto.

   Before using, initialize the state by using init_genrand(seed)
   or init_by_array(init_key, key_length).

   Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura,
   All rights reserved.

   Redistribution and use in source and binary forms, with or without
   modification, are permitted provided that the following conditions
   are met:

     1. Redistributions of source code must retain the above copyright
        notice, this list of conditions and the following disclaimer.

     2. Redistributions in binary form must reproduce the above copyright
        notice, this list of conditions and the following disclaimer in the
        documentation and/or other materials provided with the distribution.

     3. The names of its contributors may not be used to endorse or promote
        products derived from this software without specific prior written
        permission.

   THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
   "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
   LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
   A PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
   CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
   EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
   PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
   PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
   LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
   NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
   SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


   Any feedback is very welcome.
   http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
   email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
*/

function MersenneTwister19937()
{
	/* constants should be scoped inside the class */
	var N, M, MATRIX_A, UPPER_MASK, LOWER_MASK;
	/* Period parameters */
	//c//#define N 624
	//c//#define M 397
	//c//#define MATRIX_A 0x9908b0dfUL   /* constant vector a */
	//c//#define UPPER_MASK 0x80000000UL /* most significant w-r bits */
	//c//#define LOWER_MASK 0x7fffffffUL /* least significant r bits */
	N = 624;
	M = 397;
	MATRIX_A = 0x9908b0df;   /* constant vector a */
	UPPER_MASK = 0x80000000; /* most significant w-r bits */
	LOWER_MASK = 0x7fffffff; /* least significant r bits */
	//c//static unsigned long mt[N]; /* the array for the state vector  */
	//c//static int mti=N+1; /* mti==N+1 means mt[N] is not initialized */
	var mt = new Array(N);   /* the array for the state vector  */
	var mti = N+1;           /* mti==N+1 means mt[N] is not initialized */

	function unsigned32 (n1) // returns a 32-bits unsiged integer from an operand to which applied a bit operator.
	{
		return n1 < 0 ? (n1 ^ UPPER_MASK) + UPPER_MASK : n1;
	}

	function subtraction32 (n1, n2) // emulates lowerflow of a c 32-bits unsiged integer variable, instead of the operator -. these both arguments must be non-negative integers expressible using unsigned 32 bits.
	{
		return n1 < n2 ? unsigned32((0x100000000 - (n2 - n1)) & 0xffffffff) : n1 - n2;
	}

	function addition32 (n1, n2) // emulates overflow of a c 32-bits unsiged integer variable, instead of the operator +. these both arguments must be non-negative integers expressible using unsigned 32 bits.
	{
		return unsigned32((n1 + n2) & 0xffffffff)
	}

	function multiplication32 (n1, n2) // emulates overflow of a c 32-bits unsiged integer variable, instead of the operator *. these both arguments must be non-negative integers expressible using unsigned 32 bits.
	{
		var sum = 0;
		for (var i = 0; i < 32; ++i){
			if ((n1 >>> i) & 0x1){
				sum = addition32(sum, unsigned32(n2 << i));
			}
		}
		return sum;
	}

	/* initializes mt[N] with a seed */
	//c//void init_genrand(unsigned long s)
	this.init_genrand = function (s)
	{
		//c//mt[0]= s & 0xffffffff;
		mt[0]= unsigned32(s & 0xffffffff);
		for (mti=1; mti<N; mti++) {
			mt[mti] =
			//c//(1812433253 * (mt[mti-1] ^ (mt[mti-1] >> 30)) + mti);
			addition32(multiplication32(1812433253, unsigned32(mt[mti-1] ^ (mt[mti-1] >>> 30))), mti);
			/* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
			/* In the previous versions, MSBs of the seed affect   */
			/* only MSBs of the array mt[].                        */
			/* 2002/01/09 modified by Makoto Matsumoto             */
			//c//mt[mti] &= 0xffffffff;
			mt[mti] = unsigned32(mt[mti] & 0xffffffff);
			/* for >32 bit machines */
		}
	}

	/* initialize by an array with array-length */
	/* init_key is the array for initializing keys */
	/* key_length is its length */
	/* slight change for C++, 2004/2/26 */
	//c//void init_by_array(unsigned long init_key[], int key_length)
	this.init_by_array = function (init_key, key_length)
	{
		//c//int i, j, k;
		var i, j, k;
		//c//init_genrand(19650218);
		this.init_genrand(19650218);
		i=1; j=0;
		k = (N>key_length ? N : key_length);
		for (; k; k--) {
			//c//mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1664525))
			//c//	+ init_key[j] + j; /* non linear */
			mt[i] = addition32(addition32(unsigned32(mt[i] ^ multiplication32(unsigned32(mt[i-1] ^ (mt[i-1] >>> 30)), 1664525)), init_key[j]), j);
			mt[i] =
			//c//mt[i] &= 0xffffffff; /* for WORDSIZE > 32 machines */
			unsigned32(mt[i] & 0xffffffff);
			i++; j++;
			if (i>=N) { mt[0] = mt[N-1]; i=1; }
			if (j>=key_length) j=0;
		}
		for (k=N-1; k; k--) {
			//c//mt[i] = (mt[i] ^ ((mt[i-1] ^ (mt[i-1] >> 30)) * 1566083941))
			//c//- i; /* non linear */
			mt[i] = subtraction32(unsigned32((dbg=mt[i]) ^ multiplication32(unsigned32(mt[i-1] ^ (mt[i-1] >>> 30)), 1566083941)), i);
			//c//mt[i] &= 0xffffffff; /* for WORDSIZE > 32 machines */
			mt[i] = unsigned32(mt[i] & 0xffffffff);
			i++;
			if (i>=N) { mt[0] = mt[N-1]; i=1; }
		}
		mt[0] = 0x80000000; /* MSB is 1; assuring non-zero initial array */
	}

    /* moved outside of genrand_int32() by jwatte 2010-11-17; generate less garbage */
    var mag01 = [0x0, MATRIX_A];

	/* generates a random number on [0,0xffffffff]-interval */
	//c//unsigned long genrand_int32(void)
	this.genrand_int32 = function ()
	{
		//c//unsigned long y;
		//c//static unsigned long mag01[2]={0x0UL, MATRIX_A};
		var y;
		/* mag01[x] = x * MATRIX_A  for x=0,1 */

		if (mti >= N) { /* generate N words at one time */
			//c//int kk;
			var kk;

			if (mti == N+1)   /* if init_genrand() has not been called, */
				//c//init_genrand(5489); /* a default initial seed is used */
				this.init_genrand(5489); /* a default initial seed is used */

			for (kk=0;kk<N-M;kk++) {
				//c//y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
				//c//mt[kk] = mt[kk+M] ^ (y >> 1) ^ mag01[y & 0x1];
				y = unsigned32((mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK));
				mt[kk] = unsigned32(mt[kk+M] ^ (y >>> 1) ^ mag01[y & 0x1]);
			}
			for (;kk<N-1;kk++) {
				//c//y = (mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK);
				//c//mt[kk] = mt[kk+(M-N)] ^ (y >> 1) ^ mag01[y & 0x1];
				y = unsigned32((mt[kk]&UPPER_MASK)|(mt[kk+1]&LOWER_MASK));
				mt[kk] = unsigned32(mt[kk+(M-N)] ^ (y >>> 1) ^ mag01[y & 0x1]);
			}
			//c//y = (mt[N-1]&UPPER_MASK)|(mt[0]&LOWER_MASK);
			//c//mt[N-1] = mt[M-1] ^ (y >> 1) ^ mag01[y & 0x1];
			y = unsigned32((mt[N-1]&UPPER_MASK)|(mt[0]&LOWER_MASK));
			mt[N-1] = unsigned32(mt[M-1] ^ (y >>> 1) ^ mag01[y & 0x1]);
			mti = 0;
		}

		y = mt[mti++];

		/* Tempering */
		//c//y ^= (y >> 11);
		//c//y ^= (y << 7) & 0x9d2c5680;
		//c//y ^= (y << 15) & 0xefc60000;
		//c//y ^= (y >> 18);
		y = unsigned32(y ^ (y >>> 11));
		y = unsigned32(y ^ ((y << 7) & 0x9d2c5680));
		y = unsigned32(y ^ ((y << 15) & 0xefc60000));
		y = unsigned32(y ^ (y >>> 18));

		return y;
	}

	/* generates a random number on [0,0x7fffffff]-interval */
	//c//long genrand_int31(void)
	this.genrand_int31 = function ()
	{
		//c//return (genrand_int32()>>1);
		return (this.genrand_int32()>>>1);
	}

	/* generates a random number on [0,1]-real-interval */
	//c//double genrand_real1(void)
	this.genrand_real1 = function ()
	{
		//c//return genrand_int32()*(1.0/4294967295.0);
		return this.genrand_int32()*(1.0/4294967295.0);
		/* divided by 2^32-1 */
	}

	/* generates a random number on [0,1)-real-interval */
	//c//double genrand_real2(void)
	this.genrand_real2 = function ()
	{
		//c//return genrand_int32()*(1.0/4294967296.0);
		return this.genrand_int32()*(1.0/4294967296.0);
		/* divided by 2^32 */
	}

	/* generates a random number on (0,1)-real-interval */
	//c//double genrand_real3(void)
	this.genrand_real3 = function ()
	{
		//c//return ((genrand_int32()) + 0.5)*(1.0/4294967296.0);
		return ((this.genrand_int32()) + 0.5)*(1.0/4294967296.0);
		/* divided by 2^32 */
	}

	/* generates a random number on [0,1) with 53-bit resolution*/
	//c//double genrand_res53(void)
	this.genrand_res53 = function ()
	{
		//c//unsigned long a=genrand_int32()>>5, b=genrand_int32()>>6;
		var a=this.genrand_int32()>>>5, b=this.genrand_int32()>>>6;
		return(a*67108864.0+b)*(1.0/9007199254740992.0);
	}
	/* These real versions are due to Isaku Wada, 2002/01/09 added */
}

//  Exports: Public API

//  Export the twister class
exports.MersenneTwister19937 = MersenneTwister19937;

//  Export a simplified function to generate random numbers
var gen = new MersenneTwister19937;
gen.init_genrand((new Date).getTime() % 1000000000);

// Added max, min range functionality, Marak Squires Sept 11 2014
exports.rand = function(max, min) {
    if (max === undefined)
        {
        min = 0;
        max = 32768;
        }
    return Math.floor(gen.genrand_real2() * (max - min) + min);
}
exports.seed = function(S) {
    if (typeof(S) != 'number')
        {
        throw new Error("seed(S) must take numeric argument; is " + typeof(S));
        }
    gen.init_genrand(S);
}
exports.seed_array = function(A) {
    if (typeof(A) != 'object')
        {
        throw new Error("seed_array(A) must take array of numbers; is " + typeof(A));
        }
    gen.init_by_array(A);
}


/***/ }),

/***/ "55bd":
/***/ (function(module, exports, __webpack_require__) {

module.exports = fullscreen
fullscreen.available = available
fullscreen.enabled = enabled

var EE = __webpack_require__("faa1").EventEmitter
var ael = __webpack_require__("4270")
var rel = ael.removeEventListener

function available() {
  return !!shim(document.body)
}

function enabled() {
  return !!(document.fullscreenEnabled ||
    document.webkitFullscreenEnabled ||
    document.mozFullScreenEnabled ||
    document.msFullscreenEnabled);
}

function fullscreen(el) {
  var doc = el.ownerDocument
    , body = doc.body
    , rfs = shim(el)
    , ee = new EE

  var vendors = ['', 'webkit', 'moz']

  for(var i = 0, len = vendors.length; i < len; ++i) {
    ael(doc, vendors[i] + 'fullscreenchange', onfullscreenchange)
    ael(doc, vendors[i] + 'fullscreenerror', onfullscreenerror)
  }
  // MS uses different casing:
  ael(doc, 'MSFullscreenChange', onfullscreenchange)
  ael(doc, 'MSFullscreenError', onfullscreenerror)

  ee.release = release
  ee.request = request
  ee.dispose = dispose
  ee.target = fullscreenelement

  if(!shim) {
    setTimeout(function() {
      ee.emit('error', new Error('fullscreen is not supported'))
    }, 0)
  }
  return ee

  function onfullscreenchange() {
    if(!fullscreenelement()) {
      return ee.emit('release')
    }
    ee.emit('attain')
  }

  function onfullscreenerror() {
    ee.emit('error')
  }

  function request() {
    return rfs.apply(el, arguments)
  }

  function release() {

    var element_exit = (el.exitFullscreen ||
      el.webkitExitFullscreen ||
      el.mozCancelFullScreen ||
      el.mozExitFullScreen ||
      el.msExitFullscreen);

    if (element_exit) {
      element_exit.apply(el, arguments);
      return;
    }

    var document_exit = (doc.exitFullscreen ||
      doc.webkitExitFullscreen ||
      doc.mozCancelFullScreen ||
      doc.mozExitFullScreen ||
      doc.msExitFullscreen);

    document_exit.apply(doc, arguments);
  } 

  function fullscreenelement() {
    return ( false ||
      doc.fullscreenElement ||
      doc.webkitFullscreenElement ||
      doc.mozFullScreenElement ||
      doc.msFullscreenElement ||
      null);
  }

  function dispose() {
    for(var i = 0, len = vendors.length; i < len; ++i) {
      rel(doc, vendors[i] + 'fullscreenchange', onfullscreenchange)
      rel(doc, vendors[i] + 'fullscreenerror', onfullscreenerror)
    }
    // MS uses different casing:
    rel(doc, 'MSFullscreenChange', onfullscreenchange)
    rel(doc, 'MSFullscreenError', onfullscreenerror)
  }
}

function shim(el) {
  return (el.requestFullscreen ||
    el.webkitRequestFullscreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen);
}


/***/ }),

/***/ "694b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;

module.exports = function equal(a, b) {
  if (a === b) return true;

  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a)
      , arrB = isArray(b)
      , i
      , length
      , key;

    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;)
        if (!equal(a[i], b[i])) return false;
      return true;
    }

    if (arrA != arrB) return false;

    var dateA = a instanceof Date
      , dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();

    var regexpA = a instanceof RegExp
      , regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();

    var keys = keyList(a);
    length = keys.length;

    if (length !== keyList(b).length)
      return false;

    for (i = length; i-- !== 0;)
      if (!hasProp.call(b, keys[i])) return false;

    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (!equal(a[key], b[key])) return false;
    }

    return true;
  }

  return a!==a && b!==b;
};


/***/ }),

/***/ "9152":
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "a48b":
/***/ (function(module, exports, __webpack_require__) {

var camel2hyphen = __webpack_require__("0497");

var isDimension = function (feature) {
  var re = /[height|width]$/;
  return re.test(feature);
};

var obj2mq = function (obj) {
  var mq = '';
  var features = Object.keys(obj);
  features.forEach(function (feature, index) {
    var value = obj[feature];
    feature = camel2hyphen(feature);
    // Add px to dimension features
    if (isDimension(feature) && typeof value === 'number') {
      value = value + 'px';
    }
    if (value === true) {
      mq += feature;
    } else if (value === false) {
      mq += 'not ' + feature;
    } else {
      mq += '(' + feature + ': ' + value + ')';
    }
    if (index < features.length-1) {
      mq += ' and '
    }
  });
  return mq;
};

var json2mq = function (query) {
  var mq = '';
  if (typeof query === 'string') {
    return query;
  }
  // Handling array of media queries
  if (query instanceof Array) {
    query.forEach(function (q, index) {
      mq += obj2mq(q);
      if (index < query.length-1) {
        mq += ', '
      }
    });
    return mq;
  }
  // Handling single media query
  return obj2mq(query);
};

module.exports = json2mq;

/***/ }),

/***/ "e3db":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ })

}]);