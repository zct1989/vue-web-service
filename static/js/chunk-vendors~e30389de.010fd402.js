(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-vendors~e30389de"],{

/***/ "ef8a":
/***/ (function(module, exports) {

/**
 *
 * @namespace faker.image
 */
var Image = function (faker) {

  var self = this;

  /**
   * image
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.image
   */
  self.image = function (width, height, randomize) {
    var categories = ["abstract", "animals", "business", "cats", "city", "food", "nightlife", "fashion", "people", "nature", "sports", "technics", "transport"];
    return self[faker.random.arrayElement(categories)](width, height, randomize);
  };
  /**
   * avatar
   *
   * @method faker.image.avatar
   */
  self.avatar = function () {
    return faker.internet.avatar();
  };
  /**
   * imageUrl
   *
   * @param {number} width
   * @param {number} height
   * @param {string} category
   * @param {boolean} randomize
   * @method faker.image.imageUrl
   */
  self.imageUrl = function (width, height, category, randomize, https) {
      var width = width || 640;
      var height = height || 480;
      var protocol = 'http://';
      if (typeof https !== 'undefined' && https === true) {
        protocol = 'https://';
      }
      var url = protocol + 'lorempixel.com/' + width + '/' + height;
      if (typeof category !== 'undefined') {
        url += '/' + category;
      }

      if (randomize) {
        url += '?' + faker.random.number()
      }

      return url;
  };
  /**
   * abstract
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.abstract
   */
  self.abstract = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'abstract', randomize);
  };
  /**
   * animals
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.animals
   */
  self.animals = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'animals', randomize);
  };
  /**
   * business
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.business
   */
  self.business = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'business', randomize);
  };
  /**
   * cats
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.cats
   */
  self.cats = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'cats', randomize);
  };
  /**
   * city
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.city
   */
  self.city = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'city', randomize);
  };
  /**
   * food
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.food
   */
  self.food = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'food', randomize);
  };
  /**
   * nightlife
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.nightlife
   */
  self.nightlife = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'nightlife', randomize);
  };
  /**
   * fashion
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.fashion
   */
  self.fashion = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'fashion', randomize);
  };
  /**
   * people
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.people
   */
  self.people = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'people', randomize);
  };
  /**
   * nature
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.nature
   */
  self.nature = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'nature', randomize);
  };
  /**
   * sports
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.sports
   */
  self.sports = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'sports', randomize);
  };
  /**
   * technics
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.technics
   */
  self.technics = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'technics', randomize);
  };
  /**
   * transport
   *
   * @param {number} width
   * @param {number} height
   * @param {boolean} randomize
   * @method faker.image.transport
   */
  self.transport = function (width, height, randomize) {
    return faker.image.imageUrl(width, height, 'transport', randomize);
  };
  /**
   * dataUri
   *
   * @param {number} width
   * @param {number} height
   * @method faker.image.dataurl
   */
  self.dataUri = function (width, height) {
    var rawPrefix = 'data:image/svg+xml;charset=UTF-8,';
    var svgString = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="' + width + '" height="' + height + '"> <rect width="100%" height="100%" fill="grey"/>  <text x="0" y="20" font-size="20" text-anchor="start" fill="white">' + width + 'x' + height + '</text> </svg>';
    return rawPrefix + encodeURIComponent(svgString);
  };
}

module["exports"] = Image;

/***/ }),

/***/ "f16b":
/***/ (function(module, exports, __webpack_require__) {

var random_ua = __webpack_require__("1c0b4");

/**
 *
 * @namespace faker.internet
 */
var Internet = function (faker) {
  var self = this;
  /**
   * avatar
   *
   * @method faker.internet.avatar
   */
  self.avatar = function () {
      return faker.random.arrayElement(faker.definitions.internet.avatar_uri);
  };

  self.avatar.schema = {
    "description": "Generates a URL for an avatar.",
    "sampleResults": ["https://s3.amazonaws.com/uifaces/faces/twitter/igorgarybaldi/128.jpg"]
  };

  /**
   * email
   *
   * @method faker.internet.email
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} provider
   */
  self.email = function (firstName, lastName, provider) {
      provider = provider || faker.random.arrayElement(faker.definitions.internet.free_email);
      return  faker.helpers.slugify(faker.internet.userName(firstName, lastName)) + "@" + provider;
  };

  self.email.schema = {
    "description": "Generates a valid email address based on optional input criteria",
    "sampleResults": ["foo.bar@gmail.com"],
    "properties": {
      "firstName": {
        "type": "string",
        "required": false,
        "description": "The first name of the user"
      },
      "lastName": {
        "type": "string",
        "required": false,
        "description": "The last name of the user"
      },
      "provider": {
        "type": "string",
        "required": false,
        "description": "The domain of the user"
      }
    }
  };
  /**
   * exampleEmail
   *
   * @method faker.internet.exampleEmail
   * @param {string} firstName
   * @param {string} lastName
   */
  self.exampleEmail = function (firstName, lastName) {
      var provider = faker.random.arrayElement(faker.definitions.internet.example_email);
      return self.email(firstName, lastName, provider);
  };

  /**
   * userName
   *
   * @method faker.internet.userName
   * @param {string} firstName
   * @param {string} lastName
   */
  self.userName = function (firstName, lastName) {
      var result;
      firstName = firstName || faker.name.firstName();
      lastName = lastName || faker.name.lastName();
      switch (faker.random.number(2)) {
      case 0:
          result = firstName + faker.random.number(99);
          break;
      case 1:
          result = firstName + faker.random.arrayElement([".", "_"]) + lastName;
          break;
      case 2:
          result = firstName + faker.random.arrayElement([".", "_"]) + lastName + faker.random.number(99);
          break;
      }
      result = result.toString().replace(/'/g, "");
      result = result.replace(/ /g, "");
      return result;
  };

  self.userName.schema = {
    "description": "Generates a username based on one of several patterns. The pattern is chosen randomly.",
    "sampleResults": [
      "Kirstin39",
      "Kirstin.Smith",
      "Kirstin.Smith39",
      "KirstinSmith",
      "KirstinSmith39",
    ],
    "properties": {
      "firstName": {
        "type": "string",
        "required": false,
        "description": "The first name of the user"
      },
      "lastName": {
        "type": "string",
        "required": false,
        "description": "The last name of the user"
      }
    }
  };

  /**
   * protocol
   *
   * @method faker.internet.protocol
   */
  self.protocol = function () {
      var protocols = ['http','https'];
      return faker.random.arrayElement(protocols);
  };

  self.protocol.schema = {
    "description": "Randomly generates http or https",
    "sampleResults": ["https", "http"]
  };

  /**
   * url
   *
   * @method faker.internet.url
   */
  self.url = function () {
      return faker.internet.protocol() + '://' + faker.internet.domainName();
  };

  self.url.schema = {
    "description": "Generates a random URL. The URL could be secure or insecure.",
    "sampleResults": [
      "http://rashawn.name",
      "https://rashawn.name"
    ]
  };

  /**
   * domainName
   *
   * @method faker.internet.domainName
   */
  self.domainName = function () {
      return faker.internet.domainWord() + "." + faker.internet.domainSuffix();
  };

  self.domainName.schema = {
    "description": "Generates a random domain name.",
    "sampleResults": ["marvin.org"]
  };

  /**
   * domainSuffix
   *
   * @method faker.internet.domainSuffix
   */
  self.domainSuffix = function () {
      return faker.random.arrayElement(faker.definitions.internet.domain_suffix);
  };

  self.domainSuffix.schema = {
    "description": "Generates a random domain suffix.",
    "sampleResults": ["net"]
  };

  /**
   * domainWord
   *
   * @method faker.internet.domainWord
   */
  self.domainWord = function () {
      return faker.name.firstName().replace(/([\\~#&*{}/:<>?|\"'])/ig, '').toLowerCase();
  };

  self.domainWord.schema = {
    "description": "Generates a random domain word.",
    "sampleResults": ["alyce"]
  };

  /**
   * ip
   *
   * @method faker.internet.ip
   */
  self.ip = function () {
      var randNum = function () {
          return (faker.random.number(255)).toFixed(0);
      };

      var result = [];
      for (var i = 0; i < 4; i++) {
          result[i] = randNum();
      }

      return result.join(".");
  };

  self.ip.schema = {
    "description": "Generates a random IP.",
    "sampleResults": ["97.238.241.11"]
  };

  /**
   * ipv6
   *
   * @method faker.internet.ipv6
   */
  self.ipv6 = function () {
      var randHash = function () {
          var result = "";
          for (var i = 0; i < 4; i++) {
            result += (faker.random.arrayElement(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]));
          }
          return result
      };

      var result = [];
      for (var i = 0; i < 8; i++) {
        result[i] = randHash();
      }
      return result.join(":");
  };

  self.ipv6.schema = {
    "description": "Generates a random IPv6 address.",
    "sampleResults": ["2001:0db8:6276:b1a7:5213:22f1:25df:c8a0"]
  };

  /**
   * userAgent
   *
   * @method faker.internet.userAgent
   */
  self.userAgent = function () {
    return random_ua.generate();
  };

  self.userAgent.schema = {
    "description": "Generates a random user agent.",
    "sampleResults": ["Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_7_5 rv:6.0; SL) AppleWebKit/532.0.1 (KHTML, like Gecko) Version/7.1.6 Safari/532.0.1"]
  };

  /**
   * color
   *
   * @method faker.internet.color
   * @param {number} baseRed255
   * @param {number} baseGreen255
   * @param {number} baseBlue255
   */
  self.color = function (baseRed255, baseGreen255, baseBlue255) {
      baseRed255 = baseRed255 || 0;
      baseGreen255 = baseGreen255 || 0;
      baseBlue255 = baseBlue255 || 0;
      // based on awesome response : http://stackoverflow.com/questions/43044/algorithm-to-randomly-generate-an-aesthetically-pleasing-color-palette
      var red = Math.floor((faker.random.number(256) + baseRed255) / 2);
      var green = Math.floor((faker.random.number(256) + baseGreen255) / 2);
      var blue = Math.floor((faker.random.number(256) + baseBlue255) / 2);
      var redStr = red.toString(16);
      var greenStr = green.toString(16);
      var blueStr = blue.toString(16);
      return '#' +
        (redStr.length === 1 ? '0' : '') + redStr +
        (greenStr.length === 1 ? '0' : '') + greenStr +
        (blueStr.length === 1 ? '0': '') + blueStr;

  };

  self.color.schema = {
    "description": "Generates a random hexadecimal color.",
    "sampleResults": ["#06267f"],
    "properties": {
      "baseRed255": {
        "type": "number",
        "required": false,
        "description": "The red value. Valid values are 0 - 255."
      },
      "baseGreen255": {
        "type": "number",
        "required": false,
        "description": "The green value. Valid values are 0 - 255."
      },
      "baseBlue255": {
        "type": "number",
        "required": false,
        "description": "The blue value. Valid values are 0 - 255."
      }
    }
  };

  /**
   * mac
   *
   * @method faker.internet.mac
   */
  self.mac = function(){
      var i, mac = "";
      for (i=0; i < 12; i++) {
          mac+= faker.random.number(15).toString(16);
          if (i%2==1 && i != 11) {
              mac+=":";
          }
      }
      return mac;
  };

  self.mac.schema = {
    "description": "Generates a random mac address.",
    "sampleResults": ["78:06:cc:ae:b3:81"]
  };

  /**
   * password
   *
   * @method faker.internet.password
   * @param {number} len
   * @param {boolean} memorable
   * @param {string} pattern
   * @param {string} prefix
   */
   self.password = function (len, memorable, pattern, prefix) {
     len = len || 15;
     if (typeof memorable === "undefined") {
       memorable = false;
     }
     /*
      * password-generator ( function )
      * Copyright(c) 2011-2013 Bermi Ferrer <bermi@bermilabs.com>
      * MIT Licensed
      */
     var consonant, letter, password, vowel;
     letter = /[a-zA-Z]$/;
     vowel = /[aeiouAEIOU]$/;
     consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;
     var _password = function (length, memorable, pattern, prefix) {
       var char, n;
       if (length == null) {
         length = 10;
       }
       if (memorable == null) {
         memorable = true;
       }
       if (pattern == null) {
         pattern = /\w/;
       }
       if (prefix == null) {
         prefix = '';
       }
       if (prefix.length >= length) {
         return prefix;
       }
       if (memorable) {
         if (prefix.match(consonant)) {
           pattern = vowel;
         } else {
           pattern = consonant;
         }
       }
       n = faker.random.number(94) + 33;
       char = String.fromCharCode(n);
       if (memorable) {
         char = char.toLowerCase();
       }
       if (!char.match(pattern)) {
         return _password(length, memorable, pattern, prefix);
       }
       return _password(length, memorable, pattern, "" + prefix + char);
     };
     return _password(len, memorable, pattern, prefix);
   }

  self.password.schema = {
    "description": "Generates a random password.",
    "sampleResults": [
      "AM7zl6Mg",
      "susejofe"
    ],
    "properties": {
      "length": {
        "type": "number",
        "required": false,
        "description": "The number of characters in the password."
      },
      "memorable": {
        "type": "boolean",
        "required": false,
        "description": "Whether a password should be easy to remember."
      },
      "pattern": {
        "type": "regex",
        "required": false,
        "description": "A regex to match each character of the password against. This parameter will be negated if the memorable setting is turned on."
      },
      "prefix": {
        "type": "string",
        "required": false,
        "description": "A value to prepend to the generated password. The prefix counts towards the length of the password."
      }
    }
  };

};


module["exports"] = Internet;


/***/ }),

/***/ "f3ee":
/***/ (function(module, exports, __webpack_require__) {

/*

   this index.js file is used for including the faker library as a CommonJS module, instead of a bundle

   you can include the faker library into your existing node.js application by requiring the entire /faker directory

    var faker = require(./faker);
    var randomName = faker.name.findName();

   you can also simply include the "faker.js" file which is the auto-generated bundled version of the faker library

    var faker = require(./customAppPath/faker);
    var randomName = faker.name.findName();


  if you plan on modifying the faker library you should be performing your changes in the /lib/ directory

*/

/**
 *
 * @namespace faker
 */
function Faker (opts) {

  var self = this;

  opts = opts || {};

  // assign options
  var locales = self.locales || opts.locales || {};
  var locale = self.locale || opts.locale || "en";
  var localeFallback = self.localeFallback || opts.localeFallback || "en";

  self.locales = locales;
  self.locale = locale;
  self.localeFallback = localeFallback;

  self.definitions = {};

  function bindAll(obj) {
      Object.keys(obj).forEach(function(meth) {
          if (typeof obj[meth] === 'function') {
              obj[meth] = obj[meth].bind(obj);
          }
      });
      return obj;
  }

  var Fake = __webpack_require__("2454");
  self.fake = new Fake(self).fake;

  var Random = __webpack_require__("33ef");
  self.random = bindAll(new Random(self));

  var Helpers = __webpack_require__("8799");
  self.helpers = new Helpers(self);

  var Name = __webpack_require__("c2b7");
  self.name = bindAll(new Name(self));

  var Address = __webpack_require__("6276");
  self.address = bindAll(new Address(self));

  var Company = __webpack_require__("05cd4");
  self.company = bindAll(new Company(self));

  var Finance = __webpack_require__("ee9a");
  self.finance = bindAll(new Finance(self));

  var Image = __webpack_require__("ef8a");
  self.image = bindAll(new Image(self));

  var Lorem = __webpack_require__("e05d");
  self.lorem = bindAll(new Lorem(self));

  var Hacker = __webpack_require__("a2b9");
  self.hacker = bindAll(new Hacker(self));

  var Internet = __webpack_require__("f16b");
  self.internet = bindAll(new Internet(self));

  var Database = __webpack_require__("9ba9");
  self.database = bindAll(new Database(self));

  var Phone = __webpack_require__("6bad");
  self.phone = bindAll(new Phone(self));

  var _Date = __webpack_require__("8600");
  self.date = bindAll(new _Date(self));

  var Commerce = __webpack_require__("1b9d");
  self.commerce = bindAll(new Commerce(self));

  var System = __webpack_require__("94ce");
  self.system = bindAll(new System(self));

  var _definitions = {
    "name": ["first_name", "last_name", "prefix", "suffix", "title", "male_first_name", "female_first_name", "male_middle_name", "female_middle_name", "male_last_name", "female_last_name"],
    "address": ["city_prefix", "city_suffix", "street_suffix", "county", "country", "country_code", "state", "state_abbr", "street_prefix", "postcode"],
    "company": ["adjective", "noun", "descriptor", "bs_adjective", "bs_noun", "bs_verb", "suffix"],
    "lorem": ["words"],
    "hacker": ["abbreviation", "adjective", "noun", "verb", "ingverb"],
    "phone_number": ["formats"],
    "finance": ["account_type", "transaction_type", "currency", "iban"],
    "internet": ["avatar_uri", "domain_suffix", "free_email", "example_email", "password"],
    "commerce": ["color", "department", "product_name", "price", "categories"],
    "database": ["collation", "column", "engine", "type"],
    "system": ["mimeTypes"],
    "date": ["month", "weekday"],
    "title": "",
    "separator": ""
  };

  // Create a Getter for all definitions.foo.bar properties
  Object.keys(_definitions).forEach(function(d){
    if (typeof self.definitions[d] === "undefined") {
      self.definitions[d] = {};
    }

    if (typeof _definitions[d] === "string") {
        self.definitions[d] = _definitions[d];
      return;
    }

    _definitions[d].forEach(function(p){
      Object.defineProperty(self.definitions[d], p, {
        get: function () {
          if (typeof self.locales[self.locale][d] === "undefined" || typeof self.locales[self.locale][d][p] === "undefined") {
            // certain localization sets contain less data then others.
            // in the case of a missing definition, use the default localeFallback to substitute the missing set data
            // throw new Error('unknown property ' + d + p)
            return self.locales[localeFallback][d][p];
          } else {
            // return localized data
            return self.locales[self.locale][d][p];
          }
        }
      });
    });
  });

};

Faker.prototype.seed = function(value) {
  var Random = __webpack_require__("33ef");
  this.seedValue = value;
  this.random = new Random(this, this.seedValue);
}
module['exports'] = Faker;


/***/ })

}]);