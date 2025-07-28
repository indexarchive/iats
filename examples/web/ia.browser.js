function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('xmldom')) : typeof define === 'function' && define.amd ? define(['xmldom'], factory) : (global = global || self, global.ia = factory(global.xmldom));
})(this, function (xmldom) {
  'use strict';

  xmldom = xmldom && Object.prototype.hasOwnProperty.call(xmldom, 'default') ? xmldom['default'] : xmldom;
  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }
  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }
  var cors = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.corsWorkAround = exports.isInBrowser = void 0;
    var isInBrowser = function isInBrowser() {
      return !(typeof window === "undefined");
    };
    exports.isInBrowser = isInBrowser;
    // instance of lib/cors-proxy.js
    var CORS_PROXY = "https://iajs-cors.rchrd2.workers.dev";
    var corsWorkAround = function corsWorkAround(url) {
      if ((0, exports.isInBrowser)()) {
        return "".concat(CORS_PROXY, "/").concat(url);
      }
      return url;
    };
    exports.corsWorkAround = corsWorkAround;
  });
  unwrapExports(cors);
  var cors_1 = cors.corsWorkAround;
  var cors_2 = cors.isInBrowser;
  var errors = createCommonjsModule(function (module, exports) {
    var __extends = commonjsGlobal && commonjsGlobal.__extends || function () {
      var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
        return _extendStatics(d, b);
      };
      return function (d, b) {
        if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        _extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ArchiveError = void 0;
    var ArchiveError = /** @class */function (_super) {
      __extends(ArchiveError, _super);
      function ArchiveError(method, response,
      // we don't currently type all of our responses including their
      // possible errors, but we should
      // biome-ignore lint/suspicious/noExplicitAny: ^
      data) {
        var _a;
        var _this = _super.call(this) || this;
        _this.method = method;
        _this.data = data;
        _this.status = response.status;
        _this.url = response.url;
        _this.message = typeof data.value === "string" ? data.value : typeof data.error === "string" ? data.error : (_a = data.message) !== null && _a !== void 0 ? _a : "";
        return _this;
      }
      return ArchiveError;
    }(Error);
    exports.ArchiveError = ArchiveError;
  });
  unwrapExports(errors);
  var errors_1 = errors.ArchiveError;
  var http = createCommonjsModule(function (module, exports) {
    var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    var __spreadArray = commonjsGlobal && commonjsGlobal.__spreadArray || function (to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
      return to.concat(ar || Array.prototype.slice.call(from));
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.newEmptyAuth = exports.authToHeaderCookies = exports.authToHeaderS3 = exports.fetchJson = exports.str2arr = exports.paramify = exports.enc = void 0;
    exports.enc = encodeURIComponent;
    var paramify = function paramify(obj) {
      var params = new URLSearchParams();
      for (var _i = 0, _a = Object.entries(obj); _i < _a.length; _i++) {
        var _b = _a[_i],
          key = _b[0],
          val = _b[1];
        if (Array.isArray(val)) {
          for (var _c = 0, val_1 = val; _c < val_1.length; _c++) {
            var value = val_1[_c];
            params.append(key, String(value));
          }
        } else if (val != null) {
          params.set(key, String(val));
        }
      }
      return params;
    };
    exports.paramify = paramify;
    var str2arr = function str2arr(v) {
      return Array.isArray(v) ? v : [v];
    };
    exports.str2arr = str2arr;
    // biome-ignore lint/suspicious/noExplicitAny: maybe could be unknown? todo
    var fetchJson = function fetchJson(url_1, options_1) {
      var args_1 = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args_1[_i - 2] = arguments[_i];
      }
      return __awaiter(void 0, __spreadArray([url_1, options_1], args_1, true), void 0, function (url, options, throwIfBad) {
        var res, data;
        var _a;
        if (throwIfBad === void 0) {
          throwIfBad = false;
        }
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              return [4 /*yield*/, fetch(url, options ? __assign({
                method: "GET"
              }, options) : {
                method: "GET"
              })];
            case 1:
              res = _b.sent();
              return [4 /*yield*/, res.json()];
            case 2:
              data = _b.sent();
              // biome-ignore lint/suspicious/noExplicitAny: some APIs might not work this way
              if (throwIfBad && (!res.ok || data.success === false)) {
                throw new errors.ArchiveError((_a = options.method) !== null && _a !== void 0 ? _a : "GET", res, data);
              }
              return [2 /*return*/, data];
          }
        });
      });
    };
    exports.fetchJson = fetchJson;
    var authToHeaderS3 = function authToHeaderS3(auth) {
      var headers = new Headers();
      if (auth.values.s3.access && auth.values.s3.secret) {
        headers.set("Authorization", "LOW ".concat(auth.values.s3.access, ":").concat(auth.values.s3.secret));
      }
      return headers;
    };
    exports.authToHeaderS3 = authToHeaderS3;
    var authToHeaderCookies = function authToHeaderCookies(auth) {
      if (auth.values.cookies["logged-in-sig"] && auth.values.cookies["logged-in-user"]) {
        var cookieStr = "logged-in-sig=".concat(auth.values.cookies["logged-in-sig"], ";");
        cookieStr += " logged-in-user=".concat(auth.values.cookies["logged-in-user"]);
        var headers = {
          Cookie: cookieStr
        };
        if ((0, cors.isInBrowser)()) {
          headers["X-Cookie-Cors"] = cookieStr;
        }
        return headers;
      }
      return {};
    };
    exports.authToHeaderCookies = authToHeaderCookies;
    var newEmptyAuth = function newEmptyAuth() {
      return JSON.parse(JSON.stringify({
        success: false,
        values: {
          cookies: {
            "logged-in-sig": null,
            "logged-in-user": null
          },
          email: null,
          itemname: null,
          s3: {
            access: null,
            secret: null
          },
          screenname: null
        },
        version: 1
      }));
    };
    exports.newEmptyAuth = newEmptyAuth;
  });
  unwrapExports(http);
  var http_1 = http.newEmptyAuth;
  var http_2 = http.authToHeaderCookies;
  var http_3 = http.authToHeaderS3;
  var http_4 = http.fetchJson;
  var http_5 = http.str2arr;
  var http_6 = http.paramify;
  var http_7 = http.enc;
  var auth = createCommonjsModule(function (module, exports) {
    var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Auth = void 0;
    var Auth = /** @class */function () {
      function Auth() {
        this.XAUTH_BASE = (0, cors.corsWorkAround)("https://archive.org/services/xauthn/");
      }
      Auth.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
          var fetchOptions, response, data, _a;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 3,, 4]);
                fetchOptions = {
                  method: "POST",
                  body: new URLSearchParams({
                    email: email,
                    password: password
                  }),
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                };
                return [4 /*yield*/, fetch("".concat(this.XAUTH_BASE, "?op=login"), fetchOptions)];
              case 1:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
              case 2:
                data = _b.sent();
                if (!data.success) {
                  data.values = __assign(__assign({}, data.values), (0, http.newEmptyAuth)().values);
                }
                return [2 /*return*/, data];
              case 3:
                _a = _b.sent();
                // TODO figure out syntax for catching error response
                return [2 /*return*/, (0, http.newEmptyAuth)()];
              case 4:
                return [2 /*return*/];
            }
          });
        });
      };
      Auth.prototype.fromS3 = function (access_1, secret_1) {
        return __awaiter(this, arguments, void 0, function (access, secret, newAuth) {
          var info;
          if (newAuth === void 0) {
            newAuth = (0, http.newEmptyAuth)();
          }
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                newAuth.success = 1;
                newAuth.values.s3.access = access;
                newAuth.values.s3.secret = secret;
                return [4 /*yield*/, (0, http.fetchJson)("https://s3.us.archive.org?check_auth=1", {
                  headers: (0, http.authToHeaderS3)(newAuth)
                })];
              case 1:
                info = _a.sent();
                newAuth.values.email = info.username;
                newAuth.values.itemname = info.itemname;
                newAuth.values.screenname = info.screenname;
                // Note the auth object is missing cookie fields.
                // It is still TBD if those are needed
                return [2 /*return*/, newAuth];
            }
          });
        });
      };
      Auth.prototype.fromCookies = function (loggedInSig_1, loggedInUser_1) {
        return __awaiter(this, arguments, void 0, function (loggedInSig, loggedInUser, newAuth) {
          var s3response, s3;
          if (newAuth === void 0) {
            newAuth = (0, http.newEmptyAuth)();
          }
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                newAuth.values.cookies["logged-in-sig"] = loggedInSig;
                newAuth.values.cookies["logged-in-user"] = loggedInUser;
                return [4 /*yield*/, fetch((0, cors.corsWorkAround)("https://archive.org/account/s3.php?output_json=1"), {
                  headers: (0, http.authToHeaderCookies)(newAuth)
                })];
              case 1:
                s3response = _a.sent();
                return [4 /*yield*/, s3response.json()];
              case 2:
                s3 = _a.sent();
                if (!s3.success) {
                  throw new Error();
                }
                return [4 /*yield*/, this.fromS3(s3.key.s3accesskey, s3.key.s3secretkey, newAuth)];
              case 3:
                return [2 /*return*/, _a.sent()];
            }
          });
        });
      };
      return Auth;
    }();
    exports.Auth = Auth;
  });
  unwrapExports(auth);
  var auth_1 = auth.Auth;
  var bookreader = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BookReaderAPI = void 0;
    var BookReaderAPI = /** @class */function () {
      function BookReaderAPI() {}
      return BookReaderAPI;
    }();
    exports.BookReaderAPI = BookReaderAPI;
  });
  unwrapExports(bookreader);
  var bookreader_1 = bookreader.BookReaderAPI;
  var metadata = createCommonjsModule(function (module, exports) {
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.MetadataAPI = void 0;
    var MetadataAPI = /** @class */function () {
      function MetadataAPI() {
        this.READ_API_BASE = "https://archive.org/metadata";
        this.WRITE_API_BASE = (0, cors.corsWorkAround)("https://archive.org/metadata");
      }
      MetadataAPI.prototype.get = function (options) {
        return __awaiter(this, void 0, void 0, function () {
          var identifier, path, _a, auth, url;
          return __generator(this, function (_b) {
            identifier = options.identifier, path = options.path, _a = options.auth, auth = _a === void 0 ? (0, http.newEmptyAuth)() : _a;
            url = "".concat(this.READ_API_BASE, "/").concat(identifier);
            if (path) url = "".concat(url, "/").concat(path);
            return [2 /*return*/, (0, http.fetchJson)(url, {
              headers: (0, http.authToHeaderS3)(auth)
            })];
          });
        });
      };
      MetadataAPI.prototype.patch = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
          var body, url, response;
          var identifier = _b.identifier,
            _c = _b.target,
            target = _c === void 0 ? "metadata" : _c,
            _d = _b.priority,
            priority = _d === void 0 ? -5 : _d,
            _e = _b.patch,
            patch = _e === void 0 ? {} : _e,
            _f = _b.auth,
            auth = _f === void 0 ? (0, http.newEmptyAuth)() : _f;
          return __generator(this, function (_g) {
            switch (_g.label) {
              case 0:
                body = new URLSearchParams({
                  "-target": target,
                  "-patch": JSON.stringify(patch),
                  priority: String(priority)
                });
                if (auth.values.s3.secret) body.set("secret", auth.values.s3.secret);
                if (auth.values.s3.access) body.set("access", auth.values.s3.access);
                url = "".concat(this.WRITE_API_BASE, "/").concat(identifier);
                return [4 /*yield*/, fetch(url, {
                  method: "POST",
                  body: body,
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                })];
              case 1:
                response = _g.sent();
                return [4 /*yield*/, response.json()];
              case 2:
                return [2 /*return*/, _g.sent()];
            }
          });
        });
      };
      return MetadataAPI;
    }();
    exports.MetadataAPI = MetadataAPI;
  });
  unwrapExports(metadata);
  var metadata_1 = metadata.MetadataAPI;
  var favorites = createCommonjsModule(function (module, exports) {
    var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.FavoritesAPI = void 0;
    var FavoritesAPI = /** @class */function () {
      function FavoritesAPI() {
        this.API_BASE = (0, cors.corsWorkAround)("https://archive.org/bookmarks.php");
        this.EXPLORE_API_BASE = "https://archive.org/bookmarks-explore.php";
      }
      FavoritesAPI.prototype.get = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
          var params;
          var _c = _b.screenname,
            screenname = _c === void 0 ? null : _c,
            _d = _b.auth,
            auth = _d === void 0 ? (0, http.newEmptyAuth)() : _d;
          return __generator(this, function (_e) {
            switch (_e.label) {
              case 0:
                if (!screenname && auth.values.screenname) {
                  screenname = auth.values.screenname;
                }
                if (!screenname) return [3 /*break*/, 2];
                params = {
                  output: "json",
                  screenname: screenname
                };
                return [4 /*yield*/, (0, http.fetchJson)("".concat(this.API_BASE, "?").concat((0, http.paramify)(params)))];
              case 1:
                return [2 /*return*/, _e.sent()];
              case 2:
                throw new Error("Neither screenname or auth provided for bookmarks lookup");
            }
          });
        });
      };
      FavoritesAPI.prototype.add = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
          var identifier = _b.identifier,
            _c = _b.auth,
            auth = _c === void 0 ? (0, http.newEmptyAuth)() : _c;
          return __generator(this, function (_d) {
            switch (_d.label) {
              case 0:
                return [4 /*yield*/, this.modify({
                  identifier: identifier,
                  add_bookmark: 1
                }, auth)];
              case 1:
                return [2 /*return*/, _d.sent()];
            }
          });
        });
      };
      FavoritesAPI.prototype.remove = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
          var identifier = _b.identifier,
            _c = _b.auth,
            auth = _c === void 0 ? (0, http.newEmptyAuth)() : _c;
          return __generator(this, function (_d) {
            switch (_d.label) {
              case 0:
                return [4 /*yield*/, this.modify({
                  identifier: identifier,
                  del_bookmark: identifier
                }, auth)];
              case 1:
                return [2 /*return*/, _d.sent()];
            }
          });
        });
      };
      FavoritesAPI.prototype.modify = function (params, auth) {
        return __awaiter(this, void 0, void 0, function () {
          var mdResponse, _a, response;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _b.trys.push([0, 2,, 3]);
                return [4 /*yield*/, new metadata.MetadataAPI().get({
                  identifier: params.identifier,
                  path: "metadata"
                })];
              case 1:
                mdResponse = _b.sent();
                params.title = (0, http.str2arr)(mdResponse.result.title).join(", ");
                params.mediatype = mdResponse.result.mediatype;
                return [3 /*break*/, 3];
              case 2:
                _a = _b.sent();
                throw new Error("Metadata lookup failed for: ".concat(params.identifier));
              case 3:
                return [4 /*yield*/, fetch("".concat(this.API_BASE, "?").concat((0, http.paramify)(__assign(__assign({}, params), {
                  output: "json"
                }))), {
                  method: "POST",
                  headers: (0, http.authToHeaderCookies)(auth)
                })];
              case 4:
                response = _b.sent();
                return [4 /*yield*/, response.json()["catch"](function (e) {
                  return {
                    error: e
                  };
                })];
              case 5:
                return [2 /*return*/, _b.sent()];
            }
          });
        });
      };
      return FavoritesAPI;
    }();
    exports.FavoritesAPI = FavoritesAPI;
  });
  unwrapExports(favorites);
  var favorites_1 = favorites.FavoritesAPI;
  var gifcities = createCommonjsModule(function (module, exports) {
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.GifcitiesAPI = void 0;
    var GifcitiesAPI = /** @class */function () {
      function GifcitiesAPI() {
        this.API_BASE = "https://gifcities.archive.org/api/v1/gifsearch";
      }
      GifcitiesAPI.prototype.get = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
          var q = _b.q;
          return __generator(this, function (_c) {
            if (!q) return [2 /*return*/, []];
            return [2 /*return*/, (0, http.fetchJson)("".concat(this.API_BASE, "?").concat(new URLSearchParams({
              q: q
            })))];
          });
        });
      };
      GifcitiesAPI.prototype.search = function (q) {
        return __awaiter(this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/, this.get({
              q: q
            })];
          });
        });
      };
      return GifcitiesAPI;
    }();
    exports.GifcitiesAPI = GifcitiesAPI;
  });
  unwrapExports(gifcities);
  var gifcities_1 = gifcities.GifcitiesAPI;
  var related = createCommonjsModule(function (module, exports) {
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.RelatedAPI = void 0;
    var RelatedAPI = /** @class */function () {
      function RelatedAPI() {
        this.API_BASE = "https://be-api.us.archive.org/mds/v1";
      }
      RelatedAPI.prototype.get = function () {
        return __awaiter(this, arguments, void 0, function (_a) {
          var _b = _a === void 0 ? {} : _a,
            _c = _b.identifier,
            identifier = _c === void 0 ? null : _c;
          return __generator(this, function (_d) {
            return [2 /*return*/, (0, http.fetchJson)("".concat(this.API_BASE, "/get_related/all/").concat(identifier))];
          });
        });
      };
      return RelatedAPI;
    }();
    exports.RelatedAPI = RelatedAPI;
  });
  unwrapExports(related);
  var related_1 = related.RelatedAPI;
  var reviews = createCommonjsModule(function (module, exports) {
    var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ReviewsAPI = void 0;
    var ReviewsAPI = /** @class */function () {
      function ReviewsAPI() {
        this.WRITE_API_BASE = (0, cors.corsWorkAround)("https://archive.org/services/reviews.php?identifier=");
        this.READ_API_BASE = "https://archive.org/metadata";
      }
      ReviewsAPI.prototype.get = function () {
        return __awaiter(this, arguments, void 0, function (_a) {
          var _b = _a === void 0 ? {} : _a,
            _c = _b.identifier,
            identifier = _c === void 0 ? null : _c;
          return __generator(this, function (_d) {
            return [2 /*return*/, (0, http.fetchJson)("".concat(this.READ_API_BASE, "/").concat(identifier, "/reviews"))];
          });
        });
      };
      ReviewsAPI.prototype.add = function () {
        return __awaiter(this, arguments, void 0, function (_a) {
          var url, response;
          var _b = _a === void 0 ? {} : _a,
            _c = _b.identifier,
            identifier = _c === void 0 ? null : _c,
            _d = _b.title,
            title = _d === void 0 ? null : _d,
            _e = _b.body,
            body = _e === void 0 ? null : _e,
            _f = _b.stars,
            stars = _f === void 0 ? null : _f,
            _g = _b.auth,
            auth = _g === void 0 ? (0, http.newEmptyAuth)() : _g;
          return __generator(this, function (_h) {
            switch (_h.label) {
              case 0:
                url = "".concat(this.WRITE_API_BASE).concat(identifier);
                return [4 /*yield*/, fetch(url, {
                  method: "POST",
                  body: JSON.stringify({
                    title: title,
                    body: body,
                    stars: stars
                  }),
                  headers: __assign({
                    "Content-Type": "application/json"
                  }, (0, http.authToHeaderS3)(auth))
                })];
              case 1:
                response = _h.sent();
                return [4 /*yield*/, response.json()];
              case 2:
                return [2 /*return*/, _h.sent()];
            }
          });
        });
      };
      return ReviewsAPI;
    }();
    exports.ReviewsAPI = ReviewsAPI;
  });
  unwrapExports(reviews);
  var reviews_1 = reviews.ReviewsAPI;
  var s3 = createCommonjsModule(function (module, exports) {
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.S3API = void 0;
    var S3API = /** @class */function () {
      function S3API() {
        this.API_BASE = "https://s3.us.archive.org";
      }
      S3API.prototype.ls = function () {
        return __awaiter(this, arguments, void 0, function (_a) {
          var _b = _a === void 0 ? {} : _a,
            _c = _b.identifier,
            identifier = _c === void 0 ? null : _c,
            _d = _b.auth,
            auth = _d === void 0 ? (0, http.newEmptyAuth)() : _d;
          return __generator(this, function (_e) {
            switch (_e.label) {
              case 0:
                // throw new Error("TODO parse that XML");
                if (!identifier) {
                  throw new Error("Missing required args");
                }
                return [4 /*yield*/, fetch("".concat(this.API_BASE, "/").concat(identifier), {
                  method: "GET",
                  headers: (0, http.authToHeaderS3)(auth)
                })];
              case 1:
                return [4 /*yield*/, _e.sent().text()];
              case 2:
                return [2 /*return*/, _e.sent()];
            }
          });
        });
      };
      S3API.prototype.createEmptyItem = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
          var identifier = _b.identifier,
            _c = _b.testItem,
            testItem = _c === void 0 ? false : _c,
            _d = _b.metadata,
            metadata = _d === void 0 ? {} : _d,
            _e = _b.headers,
            headers = _e === void 0 ? {} : _e,
            _f = _b.wait,
            wait = _f === void 0 ? true : _f,
            _g = _b.auth,
            auth = _g === void 0 ? (0, http.newEmptyAuth)() : _g;
          return __generator(this, function (_h) {
            switch (_h.label) {
              case 0:
                return [4 /*yield*/, this.upload({
                  identifier: identifier,
                  testItem: testItem,
                  metadata: metadata,
                  headers: headers,
                  wait: wait,
                  auth: auth,
                  autocreate: true
                })];
              case 1:
                return [2 /*return*/, _h.sent()];
            }
          });
        });
      };
      S3API.prototype.upload = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
          var requestHeaders, _i, _c, k, i, _d, _e, v, headerKey, requestUrl, response;
          var identifier = _b.identifier,
            key = _b.key,
            body = _b.body,
            _f = _b.autocreate,
            autocreate = _f === void 0 ? false : _f,
            _g = _b.skipDerive,
            skipDerive = _g === void 0 ? false : _g,
            _h = _b.testItem,
            testItem = _h === void 0 ? false : _h,
            _j = _b.keepOldVersions,
            keepOldVersions = _j === void 0 ? true : _j,
            _k = _b.metadata,
            metadata = _k === void 0 ? {} : _k,
            _l = _b.headers,
            headers = _l === void 0 ? {} : _l,
            _m = _b.wait,
            wait = _m === void 0 ? true : _m,
            _o = _b.auth,
            auth = _o === void 0 ? (0, http.newEmptyAuth)() : _o;
          return __generator(this, function (_p) {
            switch (_p.label) {
              case 0:
                if (!identifier) {
                  throw new Error("Missing required args");
                }
                if (testItem) {
                  metadata.collection = "test_collection";
                }
                requestHeaders = {};
                for (_i = 0, _c = Object.keys(metadata); _i < _c.length; _i++) {
                  k = _c[_i];
                  i = 0;
                  for (_d = 0, _e = (0, http.str2arr)(metadata[k]); _d < _e.length; _d++) {
                    v = _e[_d];
                    headerKey = "x-archive-meta".concat(i, "-").concat(k.replace(/_/g, "--"));
                    requestHeaders[headerKey] = v;
                    i += 1;
                  }
                }
                Object.assign(requestHeaders, headers, (0, http.authToHeaderS3)(auth));
                if (autocreate) {
                  requestHeaders["x-archive-auto-make-bucket"] = "1";
                }
                if (skipDerive) {
                  requestHeaders["x-archive-queue-derive"] = "0";
                }
                requestHeaders["x-archive-keep-old-version"] = keepOldVersions ? "1" : "0";
                requestUrl = key ? "".concat(this.API_BASE, "/").concat(identifier, "/").concat(key) : "".concat(this.API_BASE, "/").concat(identifier);
                return [4 /*yield*/, fetch(requestUrl, {
                  method: "PUT",
                  headers: requestHeaders,
                  body: body
                })];
              case 1:
                response = _p.sent();
                if (response.status !== 200) {
                  // NOTE this may not be the right thing to check.
                  // Maybe different codes are okay
                  throw new Error("Response: ".concat(response.status));
                }
                if (!wait) {
                  return [2 /*return*/, response];
                }
                return [4 /*yield*/, response.text()];
              case 2:
                // The finished response seems to be empty
                return [2 /*return*/, _p.sent()];
            }
          });
        });
      };
      return S3API;
    }();
    exports.S3API = S3API;
  });
  unwrapExports(s3);
  var s3_1 = s3.S3API;
  var search = createCommonjsModule(function (module, exports) {
    var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    var __rest = commonjsGlobal && commonjsGlobal.__rest || function (s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SearchAPI = void 0;
    var SearchAPI = /** @class */function () {
      function SearchAPI() {
        this.API_BASE = "https://archive.org/advancedsearch.php";
      }
      SearchAPI.prototype.get = function (options) {
        return __awaiter(this, void 0, void 0, function () {
          var q, _a, page, _b, fields, sort, rest, url;
          return __generator(this, function (_c) {
            q = options.q, _a = options.page, page = _a === void 0 ? 1 : _a, _b = options.fields, fields = _b === void 0 ? ["identifier"] : _b, sort = options.sort, rest = __rest(options, ["q", "page", "fields", "sort"]);
            if (_typeof(q) === "object") {
              q = this.buildQueryFromObject(q);
            }
            url = "".concat(this.API_BASE, "?").concat((0, http.paramify)(__assign(__assign({
              q: q,
              page: page,
              "fl[]": fields,
              sort: sort
            }, rest), {
              output: "json"
            })));
            return [2 /*return*/, (0, http.fetchJson)(url)];
          });
        });
      };
      SearchAPI.prototype.search = function (q) {
        return this.get({
          q: q
        });
      };
      /**
       * convert an object representing a query to a string for the advanced
       * search API.
       * @see https://archive.org/advancedsearch.php
       * @param query keys in an object are joined by "AND", whereas items in an
       * array are joined with "OR". If any inner value is not a string, it will
       * be converted.
       * ```js
       * buildQueryFromObject({ title: "foo", subject: ["educational", "sports"] })
       * // result:
       * // title:"foo" AND ( subject:"educational" OR subject:"sports" )
       * ```
       *
       * Values enclosed in parentheses will not be quoted, since this indicates a
       * vague or "contains" match:
       * ```js
       * buildQueryFromObject({ title: "(bar)", subject: ["educational", "(baz)"] })
       * // result:
       * // title:(bar) AND ( subject:"educational" OR subject:(baz) )
       * ```
       * Values equalling `*` or those enclosed in double quotes or square brackets
       * will also not be modified.
       *
       * Blank keys will be given no prefix to match the "any field" behavior:
       * ```js
       * buildQueryFromObject({ "": "(fuzzy)", subject: "cat" })
       * // result:
       * // (fuzzy) AND subject:"cat"
       * ```
       * @returns compiled string
       */
      SearchAPI.prototype.buildQueryFromObject = function (query) {
        var wrapValue = function wrapValue(value) {
          var val = String(value);
          if (val.startsWith("(") && val.endsWith(")") || val.startsWith("\"") && val.endsWith("\"") || val.startsWith("[") && val.endsWith("]") || val === "*") {
            return val;
          }
          return "\"".concat(val, "\"");
        };
        return Object.entries(query).map(function (_a) {
          var key = _a[0],
            value = _a[1];
          // allow any-field search by omitting prefix
          var prefix = key === "" ? "" : "".concat(key, ":");
          if (Array.isArray(value)) {
            return "".concat(prefix, "( ").concat(value.map(function (v) {
              return wrapValue(v);
            }).join(" OR "), " )");
          }
          // allow the user to quote or parenthesize their own values
          return "".concat(prefix).concat(wrapValue(value));
        }).join(" AND ");
      };
      return SearchAPI;
    }();
    exports.SearchAPI = SearchAPI;
  });
  unwrapExports(search);
  var search_1 = search.SearchAPI;
  var searchtext = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SearchTextAPI = void 0;
    var SearchTextAPI = /** @class */function () {
      function SearchTextAPI() {}
      return SearchTextAPI;
    }();
    exports.SearchTextAPI = SearchTextAPI;
  });
  unwrapExports(searchtext);
  var searchtext_1 = searchtext.SearchTextAPI;
  var services = createCommonjsModule(function (module, exports) {
    var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    var __rest = commonjsGlobal && commonjsGlobal.__rest || function (s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
      return t;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ServicesAPI = void 0;
    var ServicesAPI = /** @class */function () {
      function ServicesAPI() {
        this.READ_API_BASE = "https://archive.org/services";
        this.WRITE_API_BASE = (0, cors.corsWorkAround)("https://archive.org/services");
      }
      ServicesAPI.prototype.getLists = function () {
        return __awaiter(this, arguments, void 0, function (options) {
          var _a, user, item, _b, auth, url, data;
          if (options === void 0) {
            options = {};
          }
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                _a = options.user, user = _a === void 0 ? "me" : _a, item = options.item, _b = options.auth, auth = _b === void 0 ? (0, http.newEmptyAuth)() : _b;
                url = new URL("".concat(this.READ_API_BASE, "/users/").concat(user, "/lists"));
                if (item) url.searchParams.set("item", item);
                return [4 /*yield*/, (0, http.fetchJson)(url, {
                  headers: (0, http.authToHeaderCookies)(auth)
                }, true)];
              case 1:
                data = _c.sent();
                return [2 /*return*/, data.value];
            }
          });
        });
      };
      /**
       * Get a single list on the account.
       * @param options options for the request.
       * - `user`: the user itemname to query. defaults to `me` (the current user).
       * - `listId`: ID of the list
       * - `auth`: authentication data. cookies are required to access private
       *   lists.
       * @returns the requested list
       */
      ServicesAPI.prototype.getList = function (options) {
        return __awaiter(this, void 0, void 0, function () {
          var _a, user, listId, auth, url, data;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _a = options.user, user = _a === void 0 ? "me" : _a, listId = options.listId, auth = options.auth;
                url = "".concat(this.WRITE_API_BASE, "/users/").concat(user, "/lists/").concat(listId);
                return [4 /*yield*/, (0, http.fetchJson)(url, {
                  headers: (0, http.authToHeaderCookies)(auth)
                }, true)];
              case 1:
                data = _b.sent();
                return [2 /*return*/, data.value];
            }
          });
        });
      };
      /**
       * Modify list details.
       * @param options options for the request.
       * - `user`: the user itemname to query. defaults to `me` (the current user).
       * - `listId`: ID of the list to modify
       * - `name`: new name for the list
       * - `description`: new description for the list (set to empty string to
       *   clear)
       * - `private`: whether the list should be private
       * - `auth`: authentication data. cookies are required to access private
       *   lists.
       * @returns
       */
      ServicesAPI.prototype.modifyList = function (options) {
        return __awaiter(this, void 0, void 0, function () {
          var _a, user, listId, auth, body, url, response, data;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _a = options.user, user = _a === void 0 ? "me" : _a, listId = options.listId, auth = options.auth, body = __rest(options, ["user", "listId", "auth"]);
                url = "".concat(this.WRITE_API_BASE, "/users/").concat(user, "/lists/").concat(listId);
                return [4 /*yield*/, fetch(url, {
                  method: "PATCH",
                  body: JSON.stringify({
                    list_name: body.name,
                    description: body.description,
                    is_private: body["private"]
                  }),
                  headers: __assign({
                    "Content-Type": "application/json"
                  }, (0, http.authToHeaderCookies)(auth))
                })];
              case 1:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
              case 2:
                data = _b.sent();
                if (!data.success || !response.ok) {
                  throw new errors.ArchiveError("PATCH", response, data);
                }
                return [2 /*return*/, data.value];
            }
          });
        });
      };
      /**
       * Add a member to a list.
       * @param options options for the request.
       * - `user`: the user itemname to query. defaults to `me` (the current user).
       * - `listId`: ID of the list
       * - `identifier`: the identifier of the item to add. this can be a member
       *   already present in the list or even an identifier that does not exist.
       *   in both cases, a new member will be created.
       * - `auth`: authentication data. cookies are required to access private
       *   lists.
       * @returns the created list member
       */
      ServicesAPI.prototype.addToList = function (options) {
        return __awaiter(this, void 0, void 0, function () {
          var _a, user, listId, identifier, auth, url, response, data;
          return __generator(this, function (_b) {
            switch (_b.label) {
              case 0:
                _a = options.user, user = _a === void 0 ? "me" : _a, listId = options.listId, identifier = options.identifier, auth = options.auth;
                url = "".concat(this.WRITE_API_BASE, "/users/").concat(user, "/lists/").concat(listId, "/members");
                return [4 /*yield*/, fetch(url, {
                  method: "POST",
                  body: JSON.stringify({
                    identifier: identifier
                  }),
                  headers: __assign({
                    "Content-Type": "application/json"
                  }, (0, http.authToHeaderCookies)(auth))
                })];
              case 1:
                response = _b.sent();
                return [4 /*yield*/, response.json()];
              case 2:
                data = _b.sent();
                if (!data.success || !response.ok) {
                  throw new errors.ArchiveError("POST", response, data);
                }
                return [2 /*return*/, data.value];
            }
          });
        });
      };
      /**
       * Returns a URL to a low resolution (180w) thumbnail for the item. For most
       * items, the content will be the `__ia_thumb.jpg` file. For users, it will
       * be their avatar. If a thumbnail cannot be determined, the image will be a
       * generic placeholder with the archive.org logo (or it may redirect to
       * `/images/notfound.png`).
       * @param identifier the identifier for the item
       * @returns the constructed URL
       */
      ServicesAPI.prototype.getItemImageUrl = function (identifier) {
        return "".concat(this.READ_API_BASE, "/img/").concat(identifier);
      };
      return ServicesAPI;
    }();
    exports.ServicesAPI = ServicesAPI;
  });
  unwrapExports(services);
  var services_1 = services.ServicesAPI;
  var metadata$1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  });
  unwrapExports(metadata$1);
  var search$1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  });
  unwrapExports(search$1);
  var services$1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  });
  unwrapExports(services$1);
  var types = createCommonjsModule(function (module, exports) {
    var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
          enumerable: true,
          get: function get() {
            return m[k];
          }
        };
      }
      Object.defineProperty(o, k2, desc);
    } : function (o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    __exportStar(metadata$1, exports);
    __exportStar(search$1, exports);
    __exportStar(services$1, exports);
  });
  unwrapExports(types);
  var views = createCommonjsModule(function (module, exports) {
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ViewsAPI = void 0;
    var ViewsAPI = /** @class */function () {
      function ViewsAPI() {
        // https://be-api.us.archive.org/views/v1/short/<identifier>[,<identifier>,...]
        this.API_BASE = "https://be-api.us.archive.org/views/v1/short";
      }
      ViewsAPI.prototype.get = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
          var identifier = _b.identifier;
          return __generator(this, function (_c) {
            return [2 /*return*/, (0, http.fetchJson)("".concat(this.API_BASE, "/").concat(Array.isArray(identifier) ? identifier.join(",") : identifier))];
          });
        });
      };
      return ViewsAPI;
    }();
    exports.ViewsAPI = ViewsAPI;
  });
  unwrapExports(views);
  var views_1 = views.ViewsAPI;
  var wayback = createCommonjsModule(function (module, exports) {
    var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WaybackAPI = void 0;
    var WaybackAPI = /** @class */function () {
      function WaybackAPI() {
        this.AVAILABLE_API_BASE = "https://archive.org/wayback/available";
        this.CDX_API_BASE = (0, cors.corsWorkAround)("https://web.archive.org/cdx/search/");
        this.SAVE_API_BASE = (0, cors.corsWorkAround)("https://web.archive.org/save/");
      }
      /**
       * @see https://archive.org/help/wayback_api.php
       */
      WaybackAPI.prototype.available = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
          var params, response;
          var url = _b.url,
            timestamp = _b.timestamp;
          return __generator(this, function (_c) {
            switch (_c.label) {
              case 0:
                params = new URLSearchParams({
                  url: url
                });
                if (timestamp != null) {
                  params.set("timestamp", timestamp);
                }
                return [4 /*yield*/, fetch("".concat(this.AVAILABLE_API_BASE, "?").concat(params))];
              case 1:
                response = _c.sent();
                return [4 /*yield*/, response.json()];
              case 2:
                return [2 /*return*/, _c.sent()];
            }
          });
        });
      };
      /**
       * @see https://github.com/internetarchive/wayback/tree/master/wayback-cdx-server
       */
      WaybackAPI.prototype.cdx = function (options) {
        return __awaiter(this, void 0, void 0, function () {
          var response, raw, json;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, fetch("".concat(this.CDX_API_BASE, "?").concat((0, http.paramify)(__assign(__assign({}, options), {
                  output: "json"
                }))))];
              case 1:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
              case 2:
                raw = _a.sent();
                try {
                  json = JSON.parse(raw);
                } catch (_b) {
                  json = {
                    error: raw.trim()
                  };
                }
                return [2 /*return*/, json];
            }
          });
        });
      };
      /**
       * @see https://docs.google.com/document/d/1Nsv52MvSjbLb2PCpHlat0gkzw0EvtSgpKHu4mk0MnrA/edit
       */
      WaybackAPI.prototype.savePageNow = function (_a) {
        return __awaiter(this, arguments, void 0, function (_b) {
          var params, response;
          var url = _b.url,
            _c = _b.captureOutlinks,
            captureOutlinks = _c === void 0 ? false : _c,
            _d = _b.captureAll,
            captureAll = _d === void 0 ? true : _d,
            _e = _b.captureScreenshot,
            captureScreenshot = _e === void 0 ? false : _e,
            _f = _b.skipFirstArchive,
            skipFirstArchive = _f === void 0 ? true : _f,
            ifNotArchivedWithin = _b.ifNotArchivedWithin,
            _g = _b.auth,
            auth = _g === void 0 ? (0, http.newEmptyAuth)() : _g;
          return __generator(this, function (_h) {
            switch (_h.label) {
              case 0:
                params = new URLSearchParams({
                  url: url.replace(/^https?:\/\//, ""),
                  capture_outlinks: captureOutlinks ? "1" : "0",
                  capture_screenshot: captureScreenshot ? "1" : "0",
                  capture_all: captureAll ? "1" : "0",
                  skip_first_archive: skipFirstArchive ? "1" : "0"
                });
                if (ifNotArchivedWithin) {
                  params.set("if_not_archived_within", String(ifNotArchivedWithin));
                }
                return [4 /*yield*/, fetch(this.SAVE_API_BASE, {
                  credentials: "omit",
                  method: "POST",
                  body: params,
                  headers: __assign({
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                  }, (0, http.authToHeaderS3)(auth))
                })];
              case 1:
                response = _h.sent();
                return [4 /*yield*/, response.json()];
              case 2:
                return [2 /*return*/, _h.sent()];
            }
          });
        });
      };
      return WaybackAPI;
    }();
    exports.WaybackAPI = WaybackAPI;
  });
  unwrapExports(wayback);
  var wayback_1 = wayback.WaybackAPI;
  var zip = createCommonjsModule(function (module, exports) {
    var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function (thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = commonjsGlobal && commonjsGlobal.__generator || function (thisArg, body) {
      var _ = {
          label: 0,
          sent: function sent() {
            if (t[0] & 1) throw t[1];
            return t[1];
          },
          trys: [],
          ops: []
        },
        f,
        y,
        t,
        g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
      return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function () {
        return this;
      }), g;
      function verb(n) {
        return function (v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return {
                value: op[1],
                done: false
              };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
          value: op[0] ? op[1] : void 0,
          done: true
        };
      }
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ZipFileAPI = void 0;
    var ZipFileAPI = /** @class */function () {
      function ZipFileAPI() {}
      /**
       * List the contents of a zip file in an item
       * Eg: https://archive.org/download/goodytwoshoes00newyiala/goodytwoshoes00newyiala_jp2.zip/
       */
      ZipFileAPI.prototype.ls = function (identifier_1, zipPath_1) {
        return __awaiter(this, arguments, void 0, function (identifier, zipPath, auth) {
          var requestUrl, response, html, tableHtml, match, table, rows, results, _loop_1, i;
          var _a, _b, _c, _d, _e, _f, _g;
          if (auth === void 0) {
            auth = (0, http.newEmptyAuth)();
          }
          return __generator(this, function (_h) {
            switch (_h.label) {
              case 0:
                if (!zipPath.match(/\.(7z|cbr|cbz|cdr|iso|rar|tar|zip)$/)) {
                  throw new Error("Invalid zip type");
                }
                requestUrl = (0, cors.corsWorkAround)("https://archive.org/download/".concat(identifier, "/").concat((0, http.enc)(zipPath), "/"));
                return [4 /*yield*/, fetch(requestUrl, {
                  headers: (0, http.authToHeaderCookies)(auth)
                })];
              case 1:
                response = _h.sent();
                if (response.status !== 200) {
                  throw Error("not found");
                }
                return [4 /*yield*/, response.text()];
              case 2:
                html = _h.sent();
                tableHtml = html;
                match = html.match(/(<table class="archext">[\w\W]*<\/table>)/g);
                if (match) {
                  tableHtml = match[0].replace(/(<td[^>]*>[\w\W]*?)(?=<(?:td|\/tr))/g, "$1</td>");
                }
                table = new xmldom.DOMParser().parseFromString(tableHtml, "text/html");
                rows = table.getElementsByTagName("tr");
                results = [];
                _loop_1 = function _loop_1(i) {
                  var cells = (_b = (_a = rows.item(i)) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("td")) !== null && _b !== void 0 ? _b : new HTMLCollection();
                  if (cells.length !== 4) return "continue";
                  try {
                    var a = (_c = cells.item(0)) === null || _c === void 0 ? void 0 : _c.getElementsByTagName("a").item(0);
                    if (a) {
                      results.push({
                        key: a.textContent,
                        href: "https:".concat(a.getAttribute("href")),
                        jpegUrl: function () {
                          var _a, _b;
                          try {
                            var href = (_b = (_a = cells.item(1)) === null || _a === void 0 ? void 0 : _a.getElementsByTagName("a").item(0)) === null || _b === void 0 ? void 0 : _b.getAttribute("href");
                            if (href) return "https:".concat(href);
                          } catch (_c) {}
                          return null;
                        }(),
                        timestamp: (_e = (_d = cells.item(2)) === null || _d === void 0 ? void 0 : _d.textContent) !== null && _e !== void 0 ? _e : null,
                        size: (_g = (_f = cells.item(3)) === null || _f === void 0 ? void 0 : _f.textContent) !== null && _g !== void 0 ? _g : null
                      });
                    }
                  } catch (_j) {}
                };
                for (i = 0; i < rows.length; i++) {
                  _loop_1(i);
                }
                return [2 /*return*/, results];
            }
          });
        });
      };
      return ZipFileAPI;
    }();
    exports.ZipFileAPI = ZipFileAPI;
  });
  unwrapExports(zip);
  var zip_1 = zip.ZipFileAPI;
  var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
    __assign = Object.assign || function (t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };

  // it's not unused, I think the namespace is confusing the linter?
  // biome-ignore lint/correctness/noUnusedVariables: ^
  var ia = {
    Auth: new auth.Auth(),
    BookReaderAPI: new bookreader.BookReaderAPI(),
    GifcitiesAPI: new gifcities.GifcitiesAPI(),
    FavoritesAPI: new favorites.FavoritesAPI(),
    MetadataAPI: new metadata.MetadataAPI(),
    RelatedAPI: new related.RelatedAPI(),
    ReviewsAPI: new reviews.ReviewsAPI(),
    SearchAPI: new search.SearchAPI(),
    SearchTextAPI: new searchtext.SearchTextAPI(),
    ServicesAPI: new services.ServicesAPI(),
    S3API: new s3.S3API(),
    ViewsAPI: new views.ViewsAPI(),
    WaybackAPI: new wayback.WaybackAPI(),
    ZipFileAPI: new zip.ZipFileAPI()
  };
  var dist = __assign(__assign(__assign(__assign({}, ia), types), errors), {
    newEmptyAuth: http.newEmptyAuth,
    paramify: http.paramify
  });
  return dist;
});
