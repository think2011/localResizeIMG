(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(7);
	__webpack_require__(8);

	module.exports = __webpack_require__(9);


	/**
	 *
	 * 　　　┏┓　　　┏┓
	 * 　　┏┛┻━━━┛┻┓
	 * 　　┃　　　　　　　┃
	 * 　　┃　　　━　　　┃
	 * 　　┃　┳┛　┗┳　┃
	 * 　　┃　　　　　　　┃
	 * 　　┃　　　┻　　　┃
	 * 　　┃　　　　　　　┃
	 * 　　┗━┓　　　┏━┛Code is far away from bug with the animal protecting
	 * 　　　　┃　　　┃    神兽保佑,代码无bug
	 * 　　　　┃　　　┃
	 * 　　　　┃　　　┗━━━┓
	 * 　　　　┃　　　　　 ┣┓
	 * 　　　　┃　　　　 ┏┛
	 * 　　　　┗┓┓┏━┳┓┏┛
	 * 　　　　　┃┫┫　┃┫┫
	 * 　　　　　┗┻┛　┗┻┛
	 *
	 */


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {(function (root) {

	    // Use polyfill for setImmediate for performance gains
	    var asap = (typeof setImmediate === 'function' && setImmediate) ||
	        function (fn) {
	            setTimeout(fn, 1);
	        };

	    // Polyfill for Function.prototype.bind
	    function bind (fn, thisArg) {
	        return function () {
	            fn.apply(thisArg, arguments);
	        }
	    }

	    var isArray = Array.isArray || function (value) {
	            return Object.prototype.toString.call(value) === "[object Array]"
	        };

	    function Promise (fn) {
	        if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
	        if (typeof fn !== 'function') throw new TypeError('not a function');
	        this._state     = null;
	        this._value     = null;
	        this._deferreds = []

	        doResolve(fn, bind(resolve, this), bind(reject, this))
	    }

	    function handle (deferred) {
	        var me = this;
	        if (this._state === null) {
	            this._deferreds.push(deferred);
	            return
	        }
	        asap(function () {
	            var cb = me._state ? deferred.onFulfilled : deferred.onRejected
	            if (cb === null) {
	                (me._state ? deferred.resolve : deferred.reject)(me._value);
	                return;
	            }
	            var ret;
	            try {
	                ret = cb(me._value);
	            }
	            catch (e) {
	                deferred.reject(e);
	                return;
	            }
	            deferred.resolve(ret);
	        })
	    }

	    function resolve (newValue) {
	        try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
	            if (newValue === this) throw new TypeError('A promise cannot be resolved with itself.');
	            if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
	                var then = newValue.then;
	                if (typeof then === 'function') {
	                    doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
	                    return;
	                }
	            }
	            this._state = true;
	            this._value = newValue;
	            finale.call(this);
	        } catch (e) {
	            reject.call(this, e);
	        }
	    }

	    function reject (newValue) {
	        this._state = false;
	        this._value = newValue;
	        finale.call(this);
	    }

	    function finale () {
	        for (var i = 0, len = this._deferreds.length; i < len; i++) {
	            handle.call(this, this._deferreds[i]);
	        }
	        this._deferreds = null;
	    }

	    function Handler (onFulfilled, onRejected, resolve, reject) {
	        this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
	        this.onRejected  = typeof onRejected === 'function' ? onRejected : null;
	        this.resolve     = resolve;
	        this.reject      = reject;
	    }

	    /**
	     * Take a potentially misbehaving resolver function and make sure
	     * onFulfilled and onRejected are only called once.
	     *
	     * Makes no guarantees about asynchrony.
	     */
	    function doResolve (fn, onFulfilled, onRejected) {
	        var done = false;
	        try {
	            fn(function (value) {
	                if (done) return;
	                done = true;
	                onFulfilled(value);
	            }, function (reason) {
	                if (done) return;
	                done = true;
	                onRejected(reason);
	            })
	        } catch (ex) {
	            if (done) return;
	            done = true;
	            onRejected(ex);
	        }
	    }

	    Promise.prototype['catch'] = function (onRejected) {
	        return this.then(null, onRejected);
	    };

	    Promise.prototype.then = function (onFulfilled, onRejected) {
	        var me = this;
	        return new Promise(function (resolve, reject) {
	            handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
	        })
	    };

	    Promise.all = function () {
	        var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);

	        return new Promise(function (resolve, reject) {
	            if (args.length === 0) return resolve([]);
	            var remaining = args.length;

	            function res (i, val) {
	                try {
	                    if (val && (typeof val === 'object' || typeof val === 'function')) {
	                        var then = val.then;
	                        if (typeof then === 'function') {
	                            then.call(val, function (val) {
	                                res(i, val)
	                            }, reject);
	                            return;
	                        }
	                    }
	                    args[i] = val;
	                    if (--remaining === 0) {
	                        resolve(args);
	                    }
	                } catch (ex) {
	                    reject(ex);
	                }
	            }

	            for (var i = 0; i < args.length; i++) {
	                res(i, args[i]);
	            }
	        });
	    };

	    Promise.resolve = function (value) {
	        if (value && typeof value === 'object' && value.constructor === Promise) {
	            return value;
	        }

	        return new Promise(function (resolve) {
	            resolve(value);
	        });
	    };

	    Promise.reject = function (value) {
	        return new Promise(function (resolve, reject) {
	            reject(value);
	        });
	    };

	    Promise.race = function (values) {
	        return new Promise(function (resolve, reject) {
	            for (var i = 0, len = values.length; i < len; i++) {
	                values[i].then(resolve, reject);
	            }
	        });
	    };

	    /**
	     * Set the immediate function to execute callbacks
	     * @param fn {function} Function to execute
	     * @private
	     */
	    Promise._setImmediateFn = function _setImmediateFn (fn) {
	        asap = fn;
	    };


	    Promise.prototype.always = function (callback) {
	        var constructor = this.constructor;

	        return this.then(function (value) {
	            return constructor.resolve(callback()).then(function () {
	                return value;
	            });
	        }, function (reason) {
	            return constructor.resolve(callback()).then(function () {
	                throw reason;
	            });
	        });
	    };

	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = Promise;
	    } else if (!root.Promise) {
	        root.Promise = Promise;
	    }

	})(this);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).setImmediate))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
	            (typeof self !== "undefined" && self) ||
	            window;
	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(scope, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(3);
	// On some exotic environments, it's not clear which object `setimmediate` was
	// able to install onto.  Search each possibility in the same order as the
	// `setimmediate` library.
	exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
	                       (typeof global !== "undefined" && global.setImmediate) ||
	                       (this && this.setImmediate);
	exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
	                         (typeof global !== "undefined" && global.clearImmediate) ||
	                         (this && this.clearImmediate);

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(4)))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	//@source https://xts.so/demo/compress/index.html

	// 早期版本的浏览器需要用BlobBuilder来构造Blob，创建一个通用构造器来兼容早期版本
	var BlobConstructor = ((function () {
	    try {
	        new Blob();
	        return true;
	    } catch (e) {
	        return false;
	    }
	})()) ? window.Blob : function (parts, opts) {
	    var bb = new (
	        window.BlobBuilder
	        || window.WebKitBlobBuilder
	        || window.MSBlobBuilder
	        || window.MozBlobBuilder
	    );
	    parts.forEach(function (p) {
	        bb.append(p);
	    });

	    return bb.getBlob(opts ? opts.type : undefined);
	};

	// Android上的AppleWebKit 534以前的内核存在一个Bug，
	// 导致FormData加入一个Blob对象后，上传的文件是0字节
	function hasFormDataBug () {
	    var bCheck = ~navigator.userAgent.indexOf('Android')
	        && ~navigator.vendor.indexOf('Google')
	        && !~navigator.userAgent.indexOf('Chrome');

	    // QQ X5浏览器也有这个BUG
	    return bCheck && navigator.userAgent.match(/AppleWebKit\/(\d+)/).pop() <= 534 || /MQQBrowser/g.test(navigator.userAgent);
	}
	var FormDataShim=(function(){
	    var formDataShimNums = 0;
	    function FormDataShim () {
	        var
	        // Store a reference to this
	        o        = this,
	    
	        // Data to be sent
	        parts = [],
	    
	        // Boundary parameter for separating the multipart values
	        boundary = Array(21).join('-') + (+new Date() * (1e16 * Math.random())).toString(36),
	    
	        // Store the current XHR send method so we can safely override it
	        oldSend  = XMLHttpRequest.prototype.send;
	        this.getParts = function () {
	            return parts.toString();
	        };
	        this.append   = function (name, value, filename) {
	            parts.push('--' + boundary + '\r\nContent-Disposition: form-data; name="' + name + '"');
	    
	            if (value instanceof Blob) {
	                parts.push('; filename="' + (filename || 'blob') + '"\r\nContent-Type: ' + value.type + '\r\n\r\n');
	                parts.push(value);
	            }
	            else {
	                parts.push('\r\n\r\n' + value);
	            }
	            parts.push('\r\n');
	        };
	    
	        formDataShimNums++;
	        XMLHttpRequest.prototype.send = function (val) {
	            var fr,
	                data,
	                oXHR = this;
	    
	            if (val === o) {
	                // Append the final boundary string
	                parts.push('--' + boundary + '--\r\n');
	                // Create the blob
	                data = new BlobConstructor(parts);
	    
	                // Set up and read the blob into an array to be sent
	                fr         = new FileReader();
	                fr.onload  = function () {
	                    oldSend.call(oXHR, fr.result);
	                };
	                fr.onerror = function (err) {
	                    throw err;
	                };
	                fr.readAsArrayBuffer(data);
	    
	                // Set the multipart content type and boudary
	                this.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);
	                formDataShimNums--;
	                if(formDataShimNums == 0){
	                    XMLHttpRequest.prototype.send = oldSend;
	                }
	            }
	            else {
	                oldSend.call(this, val);
	            }
	        };
	    };
	    FormDataShim.prototype = Object.create(FormData.prototype);
	    return FormDataShim;
	})();


	module.exports = {
	    Blob    : BlobConstructor,
	    FormData: hasFormDataBug() ? FormDataShim : FormData
	};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* exif */
	(function () {

	    var debug = false;

	    var root = this;

	    var EXIF = function (obj) {
	        if (obj instanceof EXIF) return obj;
	        if (!(this instanceof EXIF)) return new EXIF(obj);
	        this.EXIFwrapped = obj;
	    };

	    if (true) {
	        if (typeof module !== 'undefined' && module.exports) {
	            exports = module.exports = EXIF;
	        }
	        exports.EXIF = EXIF;
	    } else {
	        root.EXIF = EXIF;
	    }

	    var ExifTags = EXIF.Tags = {

	        // version tags
	        0x9000: "ExifVersion",             // EXIF version
	        0xA000: "FlashpixVersion",         // Flashpix format version

	        // colorspace tags
	        0xA001: "ColorSpace",              // Color space information tag

	        // image configuration
	        0xA002: "PixelXDimension",         // Valid width of meaningful image
	        0xA003: "PixelYDimension",         // Valid height of meaningful image
	        0x9101: "ComponentsConfiguration", // Information about channels
	        0x9102: "CompressedBitsPerPixel",  // Compressed bits per pixel

	        // user information
	        0x927C: "MakerNote",               // Any desired information written by the manufacturer
	        0x9286: "UserComment",             // Comments by user

	        // related file
	        0xA004: "RelatedSoundFile",        // Name of related sound file

	        // date and time
	        0x9003: "DateTimeOriginal",        // Date and time when the original image was generated
	        0x9004: "DateTimeDigitized",       // Date and time when the image was stored digitally
	        0x9290: "SubsecTime",              // Fractions of seconds for DateTime
	        0x9291: "SubsecTimeOriginal",      // Fractions of seconds for DateTimeOriginal
	        0x9292: "SubsecTimeDigitized",     // Fractions of seconds for DateTimeDigitized

	        // picture-taking conditions
	        0x829A: "ExposureTime",            // Exposure time (in seconds)
	        0x829D: "FNumber",                 // F number
	        0x8822: "ExposureProgram",         // Exposure program
	        0x8824: "SpectralSensitivity",     // Spectral sensitivity
	        0x8827: "ISOSpeedRatings",         // ISO speed rating
	        0x8828: "OECF",                    // Optoelectric conversion factor
	        0x9201: "ShutterSpeedValue",       // Shutter speed
	        0x9202: "ApertureValue",           // Lens aperture
	        0x9203: "BrightnessValue",         // Value of brightness
	        0x9204: "ExposureBias",            // Exposure bias
	        0x9205: "MaxApertureValue",        // Smallest F number of lens
	        0x9206: "SubjectDistance",         // Distance to subject in meters
	        0x9207: "MeteringMode",            // Metering mode
	        0x9208: "LightSource",             // Kind of light source
	        0x9209: "Flash",                   // Flash status
	        0x9214: "SubjectArea",             // Location and area of main subject
	        0x920A: "FocalLength",             // Focal length of the lens in mm
	        0xA20B: "FlashEnergy",             // Strobe energy in BCPS
	        0xA20C: "SpatialFrequencyResponse",    //
	        0xA20E: "FocalPlaneXResolution",   // Number of pixels in width direction per FocalPlaneResolutionUnit
	        0xA20F: "FocalPlaneYResolution",   // Number of pixels in height direction per FocalPlaneResolutionUnit
	        0xA210: "FocalPlaneResolutionUnit",    // Unit for measuring FocalPlaneXResolution and FocalPlaneYResolution
	        0xA214: "SubjectLocation",         // Location of subject in image
	        0xA215: "ExposureIndex",           // Exposure index selected on camera
	        0xA217: "SensingMethod",           // Image sensor type
	        0xA300: "FileSource",              // Image source (3 == DSC)
	        0xA301: "SceneType",               // Scene type (1 == directly photographed)
	        0xA302: "CFAPattern",              // Color filter array geometric pattern
	        0xA401: "CustomRendered",          // Special processing
	        0xA402: "ExposureMode",            // Exposure mode
	        0xA403: "WhiteBalance",            // 1 = auto white balance, 2 = manual
	        0xA404: "DigitalZoomRation",       // Digital zoom ratio
	        0xA405: "FocalLengthIn35mmFilm",   // Equivalent foacl length assuming 35mm film camera (in mm)
	        0xA406: "SceneCaptureType",        // Type of scene
	        0xA407: "GainControl",             // Degree of overall image gain adjustment
	        0xA408: "Contrast",                // Direction of contrast processing applied by camera
	        0xA409: "Saturation",              // Direction of saturation processing applied by camera
	        0xA40A: "Sharpness",               // Direction of sharpness processing applied by camera
	        0xA40B: "DeviceSettingDescription",    //
	        0xA40C: "SubjectDistanceRange",    // Distance to subject

	        // other tags
	        0xA005: "InteroperabilityIFDPointer",
	        0xA420: "ImageUniqueID"            // Identifier assigned uniquely to each image
	    };

	    var TiffTags = EXIF.TiffTags = {
	        0x0100: "ImageWidth",
	        0x0101: "ImageHeight",
	        0x8769: "ExifIFDPointer",
	        0x8825: "GPSInfoIFDPointer",
	        0xA005: "InteroperabilityIFDPointer",
	        0x0102: "BitsPerSample",
	        0x0103: "Compression",
	        0x0106: "PhotometricInterpretation",
	        0x0112: "Orientation",
	        0x0115: "SamplesPerPixel",
	        0x011C: "PlanarConfiguration",
	        0x0212: "YCbCrSubSampling",
	        0x0213: "YCbCrPositioning",
	        0x011A: "XResolution",
	        0x011B: "YResolution",
	        0x0128: "ResolutionUnit",
	        0x0111: "StripOffsets",
	        0x0116: "RowsPerStrip",
	        0x0117: "StripByteCounts",
	        0x0201: "JPEGInterchangeFormat",
	        0x0202: "JPEGInterchangeFormatLength",
	        0x012D: "TransferFunction",
	        0x013E: "WhitePoint",
	        0x013F: "PrimaryChromaticities",
	        0x0211: "YCbCrCoefficients",
	        0x0214: "ReferenceBlackWhite",
	        0x0132: "DateTime",
	        0x010E: "ImageDescription",
	        0x010F: "Make",
	        0x0110: "Model",
	        0x0131: "Software",
	        0x013B: "Artist",
	        0x8298: "Copyright"
	    };

	    var GPSTags = EXIF.GPSTags = {
	        0x0000: "GPSVersionID",
	        0x0001: "GPSLatitudeRef",
	        0x0002: "GPSLatitude",
	        0x0003: "GPSLongitudeRef",
	        0x0004: "GPSLongitude",
	        0x0005: "GPSAltitudeRef",
	        0x0006: "GPSAltitude",
	        0x0007: "GPSTimeStamp",
	        0x0008: "GPSSatellites",
	        0x0009: "GPSStatus",
	        0x000A: "GPSMeasureMode",
	        0x000B: "GPSDOP",
	        0x000C: "GPSSpeedRef",
	        0x000D: "GPSSpeed",
	        0x000E: "GPSTrackRef",
	        0x000F: "GPSTrack",
	        0x0010: "GPSImgDirectionRef",
	        0x0011: "GPSImgDirection",
	        0x0012: "GPSMapDatum",
	        0x0013: "GPSDestLatitudeRef",
	        0x0014: "GPSDestLatitude",
	        0x0015: "GPSDestLongitudeRef",
	        0x0016: "GPSDestLongitude",
	        0x0017: "GPSDestBearingRef",
	        0x0018: "GPSDestBearing",
	        0x0019: "GPSDestDistanceRef",
	        0x001A: "GPSDestDistance",
	        0x001B: "GPSProcessingMethod",
	        0x001C: "GPSAreaInformation",
	        0x001D: "GPSDateStamp",
	        0x001E: "GPSDifferential"
	    };

	    var StringValues = EXIF.StringValues = {
	        ExposureProgram     : {
	            0: "Not defined",
	            1: "Manual",
	            2: "Normal program",
	            3: "Aperture priority",
	            4: "Shutter priority",
	            5: "Creative program",
	            6: "Action program",
	            7: "Portrait mode",
	            8: "Landscape mode"
	        },
	        MeteringMode        : {
	            0  : "Unknown",
	            1  : "Average",
	            2  : "CenterWeightedAverage",
	            3  : "Spot",
	            4  : "MultiSpot",
	            5  : "Pattern",
	            6  : "Partial",
	            255: "Other"
	        },
	        LightSource         : {
	            0  : "Unknown",
	            1  : "Daylight",
	            2  : "Fluorescent",
	            3  : "Tungsten (incandescent light)",
	            4  : "Flash",
	            9  : "Fine weather",
	            10 : "Cloudy weather",
	            11 : "Shade",
	            12 : "Daylight fluorescent (D 5700 - 7100K)",
	            13 : "Day white fluorescent (N 4600 - 5400K)",
	            14 : "Cool white fluorescent (W 3900 - 4500K)",
	            15 : "White fluorescent (WW 3200 - 3700K)",
	            17 : "Standard light A",
	            18 : "Standard light B",
	            19 : "Standard light C",
	            20 : "D55",
	            21 : "D65",
	            22 : "D75",
	            23 : "D50",
	            24 : "ISO studio tungsten",
	            255: "Other"
	        },
	        Flash               : {
	            0x0000: "Flash did not fire",
	            0x0001: "Flash fired",
	            0x0005: "Strobe return light not detected",
	            0x0007: "Strobe return light detected",
	            0x0009: "Flash fired, compulsory flash mode",
	            0x000D: "Flash fired, compulsory flash mode, return light not detected",
	            0x000F: "Flash fired, compulsory flash mode, return light detected",
	            0x0010: "Flash did not fire, compulsory flash mode",
	            0x0018: "Flash did not fire, auto mode",
	            0x0019: "Flash fired, auto mode",
	            0x001D: "Flash fired, auto mode, return light not detected",
	            0x001F: "Flash fired, auto mode, return light detected",
	            0x0020: "No flash function",
	            0x0041: "Flash fired, red-eye reduction mode",
	            0x0045: "Flash fired, red-eye reduction mode, return light not detected",
	            0x0047: "Flash fired, red-eye reduction mode, return light detected",
	            0x0049: "Flash fired, compulsory flash mode, red-eye reduction mode",
	            0x004D: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
	            0x004F: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
	            0x0059: "Flash fired, auto mode, red-eye reduction mode",
	            0x005D: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
	            0x005F: "Flash fired, auto mode, return light detected, red-eye reduction mode"
	        },
	        SensingMethod       : {
	            1: "Not defined",
	            2: "One-chip color area sensor",
	            3: "Two-chip color area sensor",
	            4: "Three-chip color area sensor",
	            5: "Color sequential area sensor",
	            7: "Trilinear sensor",
	            8: "Color sequential linear sensor"
	        },
	        SceneCaptureType    : {
	            0: "Standard",
	            1: "Landscape",
	            2: "Portrait",
	            3: "Night scene"
	        },
	        SceneType           : {
	            1: "Directly photographed"
	        },
	        CustomRendered      : {
	            0: "Normal process",
	            1: "Custom process"
	        },
	        WhiteBalance        : {
	            0: "Auto white balance",
	            1: "Manual white balance"
	        },
	        GainControl         : {
	            0: "None",
	            1: "Low gain up",
	            2: "High gain up",
	            3: "Low gain down",
	            4: "High gain down"
	        },
	        Contrast            : {
	            0: "Normal",
	            1: "Soft",
	            2: "Hard"
	        },
	        Saturation          : {
	            0: "Normal",
	            1: "Low saturation",
	            2: "High saturation"
	        },
	        Sharpness           : {
	            0: "Normal",
	            1: "Soft",
	            2: "Hard"
	        },
	        SubjectDistanceRange: {
	            0: "Unknown",
	            1: "Macro",
	            2: "Close view",
	            3: "Distant view"
	        },
	        FileSource          : {
	            3: "DSC"
	        },

	        Components: {
	            0: "",
	            1: "Y",
	            2: "Cb",
	            3: "Cr",
	            4: "R",
	            5: "G",
	            6: "B"
	        }
	    };

	    function addEvent (element, event, handler) {
	        if (element.addEventListener) {
	            element.addEventListener(event, handler, false);
	        } else if (element.attachEvent) {
	            element.attachEvent("on" + event, handler);
	        }
	    }

	    function imageHasData (img) {
	        return !!(img.exifdata);
	    }


	    function base64ToArrayBuffer (base64, contentType) {
	        contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
	        base64     = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
	        var binary = atob(base64);
	        var len    = binary.length;
	        var buffer = new ArrayBuffer(len);
	        var view   = new Uint8Array(buffer);
	        for (var i = 0; i < len; i++) {
	            view[i] = binary.charCodeAt(i);
	        }
	        return buffer;
	    }

	    function objectURLToBlob (url, callback) {
	        var http          = new XMLHttpRequest();
	        http.open("GET", url, true);
	        http.responseType = "blob";
	        http.onload       = function (e) {
	            if (this.status == 200 || this.status === 0) {
	                callback(this.response);
	            }
	        };
	        http.send();
	    }

	    function getImageData (img, callback) {
	        function handleBinaryFile (binFile) {
	            var data     = findEXIFinJPEG(binFile);
	            var iptcdata = findIPTCinJPEG(binFile);
	            img.exifdata = data || {};
	            img.iptcdata = iptcdata || {};
	            if (callback) {
	                callback.call(img);
	            }
	        }

	        if (img.src) {
	            if (/^data\:/i.test(img.src)) { // Data URI
	                var arrayBuffer = base64ToArrayBuffer(img.src);
	                handleBinaryFile(arrayBuffer);

	            } else if (/^blob\:/i.test(img.src)) { // Object URL
	                var fileReader    = new FileReader();
	                fileReader.onload = function (e) {
	                    handleBinaryFile(e.target.result);
	                };
	                objectURLToBlob(img.src, function (blob) {
	                    fileReader.readAsArrayBuffer(blob);
	                });
	            } else {
	                var http          = new XMLHttpRequest();
	                http.onload       = function () {
	                    if (this.status == 200 || this.status === 0) {
	                        handleBinaryFile(http.response);
	                    } else {
	                        callback(new Error("Could not load image"));
	                    }
	                    http = null;
	                };
	                http.open("GET", img.src, true);
	                http.responseType = "arraybuffer";
	                http.send(null);
	            }
	        } else if (window.FileReader && (img instanceof window.Blob || img instanceof window.File)) {
	            var fileReader    = new FileReader();
	            fileReader.onload = function (e) {
	                if (debug) console.log("Got file of length " + e.target.result.byteLength);
	                handleBinaryFile(e.target.result);
	            };

	            fileReader.readAsArrayBuffer(img);
	        }
	    }

	    function findEXIFinJPEG (file) {
	        var dataView = new DataView(file);

	        if (debug) console.log("Got file of length " + file.byteLength);
	        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
	            if (debug) console.log("Not a valid JPEG");
	            return false; // not a valid jpeg
	        }

	        var offset = 2,
	            length = file.byteLength,
	            marker;

	        while (offset < length) {
	            if (dataView.getUint8(offset) != 0xFF) {
	                if (debug) console.log("Not a valid marker at offset " + offset + ", found: " + dataView.getUint8(offset));
	                return false; // not a valid marker, something is wrong
	            }

	            marker = dataView.getUint8(offset + 1);
	            if (debug) console.log(marker);

	            // we could implement handling for other markers here,
	            // but we're only looking for 0xFFE1 for EXIF data

	            if (marker == 225) {
	                if (debug) console.log("Found 0xFFE1 marker");

	                return readEXIFData(dataView, offset + 4, dataView.getUint16(offset + 2) - 2);

	                // offset += 2 + file.getShortAt(offset+2, true);

	            } else {
	                offset += 2 + dataView.getUint16(offset + 2);
	            }

	        }

	    }

	    function findIPTCinJPEG (file) {
	        var dataView = new DataView(file);

	        if (debug) console.log("Got file of length " + file.byteLength);
	        if ((dataView.getUint8(0) != 0xFF) || (dataView.getUint8(1) != 0xD8)) {
	            if (debug) console.log("Not a valid JPEG");
	            return false; // not a valid jpeg
	        }

	        var offset = 2,
	            length = file.byteLength;


	        var isFieldSegmentStart = function (dataView, offset) {
	            return (
	                dataView.getUint8(offset) === 0x38 &&
	                dataView.getUint8(offset + 1) === 0x42 &&
	                dataView.getUint8(offset + 2) === 0x49 &&
	                dataView.getUint8(offset + 3) === 0x4D &&
	                dataView.getUint8(offset + 4) === 0x04 &&
	                dataView.getUint8(offset + 5) === 0x04
	            );
	        };

	        while (offset < length) {

	            if (isFieldSegmentStart(dataView, offset)) {

	                // Get the length of the name header (which is padded to an even number of bytes)
	                var nameHeaderLength = dataView.getUint8(offset + 7);
	                if (nameHeaderLength % 2 !== 0) nameHeaderLength += 1;
	                // Check for pre photoshop 6 format
	                if (nameHeaderLength === 0) {
	                    // Always 4
	                    nameHeaderLength = 4;
	                }

	                var startOffset   = offset + 8 + nameHeaderLength;
	                var sectionLength = dataView.getUint16(offset + 6 + nameHeaderLength);

	                return readIPTCData(file, startOffset, sectionLength);

	                break;

	            }


	            // Not the marker, continue searching
	            offset++;

	        }

	    }

	    var IptcFieldMap = {
	        0x78: 'caption',
	        0x6E: 'credit',
	        0x19: 'keywords',
	        0x37: 'dateCreated',
	        0x50: 'byline',
	        0x55: 'bylineTitle',
	        0x7A: 'captionWriter',
	        0x69: 'headline',
	        0x74: 'copyright',
	        0x0F: 'category'
	    };

	    function readIPTCData (file, startOffset, sectionLength) {
	        var dataView        = new DataView(file);
	        var data            = {};
	        var fieldValue, fieldName, dataSize, segmentType, segmentSize;
	        var segmentStartPos = startOffset;
	        while (segmentStartPos < startOffset + sectionLength) {
	            if (dataView.getUint8(segmentStartPos) === 0x1C && dataView.getUint8(segmentStartPos + 1) === 0x02) {
	                segmentType = dataView.getUint8(segmentStartPos + 2);
	                if (segmentType in IptcFieldMap) {
	                    dataSize    = dataView.getInt16(segmentStartPos + 3);
	                    segmentSize = dataSize + 5;
	                    fieldName   = IptcFieldMap[segmentType];
	                    fieldValue  = getStringFromDB(dataView, segmentStartPos + 5, dataSize);
	                    // Check if we already stored a value with this name
	                    if (data.hasOwnProperty(fieldName)) {
	                        // Value already stored with this name, create multivalue field
	                        if (data[fieldName] instanceof Array) {
	                            data[fieldName].push(fieldValue);
	                        }
	                        else {
	                            data[fieldName] = [data[fieldName], fieldValue];
	                        }
	                    }
	                    else {
	                        data[fieldName] = fieldValue;
	                    }
	                }

	            }
	            segmentStartPos++;
	        }
	        return data;
	    }


	    function readTags (file, tiffStart, dirStart, strings, bigEnd) {
	        var entries = file.getUint16(dirStart, !bigEnd),
	            tags    = {},
	            entryOffset, tag,
	            i;

	        for (i = 0; i < entries; i++) {
	            entryOffset = dirStart + i * 12 + 2;
	            tag         = strings[file.getUint16(entryOffset, !bigEnd)];
	            if (!tag && debug) console.log("Unknown tag: " + file.getUint16(entryOffset, !bigEnd));
	            tags[tag] = readTagValue(file, entryOffset, tiffStart, dirStart, bigEnd);
	        }
	        return tags;
	    }


	    function readTagValue (file, entryOffset, tiffStart, dirStart, bigEnd) {
	        var type        = file.getUint16(entryOffset + 2, !bigEnd),
	            numValues   = file.getUint32(entryOffset + 4, !bigEnd),
	            valueOffset = file.getUint32(entryOffset + 8, !bigEnd) + tiffStart,
	            offset,
	            vals, val, n,
	            numerator, denominator;

	        switch (type) {
	            case 1: // byte, 8-bit unsigned int
	            case 7: // undefined, 8-bit byte, value depending on field
	                if (numValues == 1) {
	                    return file.getUint8(entryOffset + 8, !bigEnd);
	                } else {
	                    offset = numValues > 4 ? valueOffset : (entryOffset + 8);
	                    vals   = [];
	                    for (n = 0; n < numValues; n++) {
	                        vals[n] = file.getUint8(offset + n);
	                    }
	                    return vals;
	                }

	            case 2: // ascii, 8-bit byte
	                offset = numValues > 4 ? valueOffset : (entryOffset + 8);
	                return getStringFromDB(file, offset, numValues - 1);

	            case 3: // short, 16 bit int
	                if (numValues == 1) {
	                    return file.getUint16(entryOffset + 8, !bigEnd);
	                } else {
	                    offset = numValues > 2 ? valueOffset : (entryOffset + 8);
	                    vals   = [];
	                    for (n = 0; n < numValues; n++) {
	                        vals[n] = file.getUint16(offset + 2 * n, !bigEnd);
	                    }
	                    return vals;
	                }

	            case 4: // long, 32 bit int
	                if (numValues == 1) {
	                    return file.getUint32(entryOffset + 8, !bigEnd);
	                } else {
	                    vals = [];
	                    for (n = 0; n < numValues; n++) {
	                        vals[n] = file.getUint32(valueOffset + 4 * n, !bigEnd);
	                    }
	                    return vals;
	                }

	            case 5:    // rational = two long values, first is numerator, second is denominator
	                if (numValues == 1) {
	                    numerator       = file.getUint32(valueOffset, !bigEnd);
	                    denominator     = file.getUint32(valueOffset + 4, !bigEnd);
	                    val             = new Number(numerator / denominator);
	                    val.numerator   = numerator;
	                    val.denominator = denominator;
	                    return val;
	                } else {
	                    vals = [];
	                    for (n = 0; n < numValues; n++) {
	                        numerator           = file.getUint32(valueOffset + 8 * n, !bigEnd);
	                        denominator         = file.getUint32(valueOffset + 4 + 8 * n, !bigEnd);
	                        vals[n]             = new Number(numerator / denominator);
	                        vals[n].numerator   = numerator;
	                        vals[n].denominator = denominator;
	                    }
	                    return vals;
	                }

	            case 9: // slong, 32 bit signed int
	                if (numValues == 1) {
	                    return file.getInt32(entryOffset + 8, !bigEnd);
	                } else {
	                    vals = [];
	                    for (n = 0; n < numValues; n++) {
	                        vals[n] = file.getInt32(valueOffset + 4 * n, !bigEnd);
	                    }
	                    return vals;
	                }

	            case 10: // signed rational, two slongs, first is numerator, second is denominator
	                if (numValues == 1) {
	                    return file.getInt32(valueOffset, !bigEnd) / file.getInt32(valueOffset + 4, !bigEnd);
	                } else {
	                    vals = [];
	                    for (n = 0; n < numValues; n++) {
	                        vals[n] = file.getInt32(valueOffset + 8 * n, !bigEnd) / file.getInt32(valueOffset + 4 + 8 * n, !bigEnd);
	                    }
	                    return vals;
	                }
	        }
	    }

	    function getStringFromDB (buffer, start, length) {
	        var outstr = "", n;
	        for (n = start; n < start + length; n++) {
	            outstr += String.fromCharCode(buffer.getUint8(n));
	        }
	        return outstr;
	    }

	    function readEXIFData (file, start) {
	        if (getStringFromDB(file, start, 4) != "Exif") {
	            if (debug) console.log("Not valid EXIF data! " + getStringFromDB(file, start, 4));
	            return false;
	        }

	        var bigEnd,
	            tags, tag,
	            exifData, gpsData,
	            tiffOffset = start + 6;

	        // test for TIFF validity and endianness
	        if (file.getUint16(tiffOffset) == 0x4949) {
	            bigEnd = false;
	        } else if (file.getUint16(tiffOffset) == 0x4D4D) {
	            bigEnd = true;
	        } else {
	            if (debug) console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)");
	            return false;
	        }

	        if (file.getUint16(tiffOffset + 2, !bigEnd) != 0x002A) {
	            if (debug) console.log("Not valid TIFF data! (no 0x002A)");
	            return false;
	        }

	        var firstIFDOffset = file.getUint32(tiffOffset + 4, !bigEnd);

	        if (firstIFDOffset < 0x00000008) {
	            if (debug) console.log("Not valid TIFF data! (First offset less than 8)", file.getUint32(tiffOffset + 4, !bigEnd));
	            return false;
	        }

	        tags = readTags(file, tiffOffset, tiffOffset + firstIFDOffset, TiffTags, bigEnd);

	        if (tags.ExifIFDPointer) {
	            exifData = readTags(file, tiffOffset, tiffOffset + tags.ExifIFDPointer, ExifTags, bigEnd);
	            for (tag in exifData) {
	                switch (tag) {
	                    case "LightSource" :
	                    case "Flash" :
	                    case "MeteringMode" :
	                    case "ExposureProgram" :
	                    case "SensingMethod" :
	                    case "SceneCaptureType" :
	                    case "SceneType" :
	                    case "CustomRendered" :
	                    case "WhiteBalance" :
	                    case "GainControl" :
	                    case "Contrast" :
	                    case "Saturation" :
	                    case "Sharpness" :
	                    case "SubjectDistanceRange" :
	                    case "FileSource" :
	                        exifData[tag] = StringValues[tag][exifData[tag]];
	                        break;

	                    case "ExifVersion" :
	                    case "FlashpixVersion" :
	                        exifData[tag] = String.fromCharCode(exifData[tag][0], exifData[tag][1], exifData[tag][2], exifData[tag][3]);
	                        break;

	                    case "ComponentsConfiguration" :
	                        exifData[tag] =
	                            StringValues.Components[exifData[tag][0]] +
	                            StringValues.Components[exifData[tag][1]] +
	                            StringValues.Components[exifData[tag][2]] +
	                            StringValues.Components[exifData[tag][3]];
	                        break;
	                }
	                tags[tag] = exifData[tag];
	            }
	        }

	        if (tags.GPSInfoIFDPointer) {
	            gpsData = readTags(file, tiffOffset, tiffOffset + tags.GPSInfoIFDPointer, GPSTags, bigEnd);
	            for (tag in gpsData) {
	                switch (tag) {
	                    case "GPSVersionID" :
	                        gpsData[tag] = gpsData[tag][0] +
	                            "." + gpsData[tag][1] +
	                            "." + gpsData[tag][2] +
	                            "." + gpsData[tag][3];
	                        break;
	                }
	                tags[tag] = gpsData[tag];
	            }
	        }

	        return tags;
	    }

	    EXIF.getData = function (img, callback) {
	        if ((img instanceof Image || img instanceof HTMLImageElement) && !img.complete) return false;

	        if (!imageHasData(img)) {
	            getImageData(img, callback);
	        } else {
	            if (callback) {
	                callback.call(img);
	            }
	        }
	        return true;
	    }

	    EXIF.getTag = function (img, tag) {
	        if (!imageHasData(img)) return;
	        return img.exifdata[tag];
	    }

	    EXIF.getAllTags = function (img) {
	        if (!imageHasData(img)) return {};
	        var a,
	            data = img.exifdata,
	            tags = {};
	        for (a in data) {
	            if (data.hasOwnProperty(a)) {
	                tags[a] = data[a];
	            }
	        }
	        return tags;
	    }

	    EXIF.pretty = function (img) {
	        if (!imageHasData(img)) return "";
	        var a,
	            data      = img.exifdata,
	            strPretty = "";
	        for (a in data) {
	            if (data.hasOwnProperty(a)) {
	                if (typeof data[a] == "object") {
	                    if (data[a] instanceof Number) {
	                        strPretty += a + " : " + data[a] + " [" + data[a].numerator + "/" + data[a].denominator + "]\r\n";
	                    } else {
	                        strPretty += a + " : [" + data[a].length + " values]\r\n";
	                    }
	                } else {
	                    strPretty += a + " : " + data[a] + "\r\n";
	                }
	            }
	        }
	        return strPretty;
	    }

	    EXIF.readFromBinaryFile = function (file) {
	        return findEXIFinJPEG(file);
	    }

	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return EXIF;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	}.call(this));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * Mega pixel image rendering library for iOS6 Safari
	 *
	 * Fixes iOS6 Safari's image file rendering issue for large size image (over mega-pixel),
	 * which causes unexpected subsampling when drawing it in canvas.
	 * By using this library, you can safely render the image with proper stretching.
	 *
	 * Copyright (c) 2012 Shinichi Tomita <shinichi.tomita@gmail.com>
	 * Released under the MIT license
	 */
	(function () {

	    /**
	     * Detect subsampling in loaded image.
	     * In iOS, larger images than 2M pixels may be subsampled in rendering.
	     */
	    function detectSubsampling (img) {
	        var iw = img.naturalWidth, ih = img.naturalHeight;
	        if (iw * ih > 1024 * 1024) { // subsampling may happen over megapixel image
	            var canvas   = document.createElement('canvas');
	            canvas.width = canvas.height = 1;
	            var ctx = canvas.getContext('2d');
	            ctx.drawImage(img, -iw + 1, 0);
	            // subsampled image becomes half smaller in rendering size.
	            // check alpha channel value to confirm image is covering edge pixel or not.
	            // if alpha value is 0 image is not covering, hence subsampled.
	            return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
	        } else {
	            return false;
	        }
	    }

	    /**
	     * Detecting vertical squash in loaded image.
	     * Fixes a bug which squash image vertically while drawing into canvas for some images.
	     */
	    function detectVerticalSquash (img, iw, ih) {
	        var canvas    = document.createElement('canvas');
	        canvas.width  = 1;
	        canvas.height = ih;
	        var ctx       = canvas.getContext('2d');
	        ctx.drawImage(img, 0, 0);
	        var data      = ctx.getImageData(0, 0, 1, ih).data;
	        // search image edge pixel position in case it is squashed vertically.
	        var sy = 0;
	        var ey = ih;
	        var py = ih;
	        while (py > sy) {
	            var alpha = data[(py - 1) * 4 + 3];
	            if (alpha === 0) {
	                ey = py;
	            } else {
	                sy = py;
	            }
	            py = (ey + sy) >> 1;
	        }
	        var ratio = (py / ih);
	        return (ratio === 0) ? 1 : ratio;
	    }

	    /**
	     * Rendering image element (with resizing) and get its data URL
	     */
	    function renderImageToDataURL (img, options, doSquash) {
	        var canvas = document.createElement('canvas');
	        renderImageToCanvas(img, canvas, options, doSquash);
	        return canvas.toDataURL("image/jpeg", options.quality || 0.8);
	    }

	    /**
	     * Rendering image element (with resizing) into the canvas element
	     */
	    function renderImageToCanvas (img, canvas, options, doSquash) {
	        var iw         = img.naturalWidth, ih = img.naturalHeight;
	        var width      = options.width, height = options.height;
	        var ctx        = canvas.getContext('2d');
	        ctx.save();
	        transformCoordinate(canvas, ctx, width, height, options.orientation);
	        var subsampled = detectSubsampling(img);
	        if (subsampled) {
	            iw /= 2;
	            ih /= 2;
	        }
	        var d = 1024; // size of tiling canvas
	        var tmpCanvas   = document.createElement('canvas');
	        tmpCanvas.width = tmpCanvas.height = d;
	        var tmpCtx          = tmpCanvas.getContext('2d');
	        var vertSquashRatio = doSquash ? detectVerticalSquash(img, iw, ih) : 1;
	        var dw              = Math.ceil(d * width / iw);
	        var dh              = Math.ceil(d * height / ih / vertSquashRatio);
	        var sy              = 0;
	        var dy              = 0;
	        while (sy < ih) {
	            var sx = 0;
	            var dx = 0;
	            while (sx < iw) {
	                tmpCtx.clearRect(0, 0, d, d);
	                tmpCtx.drawImage(img, -sx, -sy);
	                ctx.drawImage(tmpCanvas, 0, 0, d, d, dx, dy, dw, dh);
	                sx += d;
	                dx += dw;
	            }
	            sy += d;
	            dy += dh;
	        }
	        ctx.restore();
	        tmpCanvas           = tmpCtx = null;
	    }

	    /**
	     * Transform canvas coordination according to specified frame size and orientation
	     * Orientation value is from EXIF tag
	     */
	    function transformCoordinate (canvas, ctx, width, height, orientation) {
	        switch (orientation) {
	            case 5:
	            case 6:
	            case 7:
	            case 8:
	                canvas.width  = height;
	                canvas.height = width;
	                break;
	            default:
	                canvas.width  = width;
	                canvas.height = height;
	        }
	        switch (orientation) {
	            case 2:
	                // horizontal flip
	                ctx.translate(width, 0);
	                ctx.scale(-1, 1);
	                break;
	            case 3:
	                // 180 rotate left
	                ctx.translate(width, height);
	                ctx.rotate(Math.PI);
	                break;
	            case 4:
	                // vertical flip
	                ctx.translate(0, height);
	                ctx.scale(1, -1);
	                break;
	            case 5:
	                // vertical flip + 90 rotate right
	                ctx.rotate(0.5 * Math.PI);
	                ctx.scale(1, -1);
	                break;
	            case 6:
	                // 90 rotate right
	                ctx.rotate(0.5 * Math.PI);
	                ctx.translate(0, -height);
	                break;
	            case 7:
	                // horizontal flip + 90 rotate right
	                ctx.rotate(0.5 * Math.PI);
	                ctx.translate(width, -height);
	                ctx.scale(-1, 1);
	                break;
	            case 8:
	                // 90 rotate left
	                ctx.rotate(-0.5 * Math.PI);
	                ctx.translate(-width, 0);
	                break;
	            default:
	                break;
	        }
	    }


	    /**
	     * MegaPixImage class
	     */
	    function MegaPixImage (srcImage) {
	        if (window.Blob && srcImage instanceof Blob) {
	            var img = new Image();
	            var URL = window.URL && window.URL.createObjectURL ? window.URL :
	                window.webkitURL && window.webkitURL.createObjectURL ? window.webkitURL :
	                    null;
	            if (!URL) {
	                throw Error("No createObjectURL function found to create blob url");
	            }
	            img.src   = URL.createObjectURL(srcImage);
	            this.blob = srcImage;
	            srcImage  = img;
	        }
	        if (!srcImage.naturalWidth && !srcImage.naturalHeight) {
	            var _this               = this;
	            srcImage.onload         = function () {
	                var listeners = _this.imageLoadListeners;
	                if (listeners) {
	                    _this.imageLoadListeners = null;
	                    for (var i = 0, len = listeners.length; i < len; i++) {
	                        listeners[i]();
	                    }
	                }
	            };
	            this.imageLoadListeners = [];
	        }
	        this.srcImage = srcImage;
	    }

	    /**
	     * Rendering megapix image into specified target element
	     */
	    MegaPixImage.prototype.render = function (target, options, callback) {
	        if (this.imageLoadListeners) {
	            var _this = this;
	            this.imageLoadListeners.push(function () {
	                _this.render(target, options, callback);
	            });
	            return;
	        }
	        options       = options || {};
	        var srcImage  = this.srcImage,
	            src       = srcImage.src,
	            srcLength = src.length,
	            imgWidth  = srcImage.naturalWidth, imgHeight = srcImage.naturalHeight,
	            width     = options.width, height = options.height,
	            maxWidth  = options.maxWidth, maxHeight = options.maxHeight,
	            doSquash  = this.blob && this.blob.type === 'image/jpeg' ||
	                src.indexOf('data:image/jpeg') === 0 ||
	                src.indexOf('.jpg') === srcLength - 4 ||
	                src.indexOf('.jpeg') === srcLength - 5;
	        if (width && !height) {
	            height = (imgHeight * width / imgWidth) << 0;
	        } else if (height && !width) {
	            width = (imgWidth * height / imgHeight) << 0;
	        } else {
	            width  = imgWidth;
	            height = imgHeight;
	        }
	        if (maxWidth && width > maxWidth) {
	            width  = maxWidth;
	            height = (imgHeight * width / imgWidth) << 0;
	        }
	        if (maxHeight && height > maxHeight) {
	            height = maxHeight;
	            width  = (imgWidth * height / imgHeight) << 0;
	        }
	        var opt = {width: width, height: height};
	        for (var k in options) opt[k] = options[k];

	        var tagName = target.tagName.toLowerCase();
	        if (tagName === 'img') {
	            target.src = renderImageToDataURL(this.srcImage, opt, doSquash);
	        } else if (tagName === 'canvas') {
	            renderImageToCanvas(this.srcImage, target, opt, doSquash);
	        }
	        if (typeof this.onrender === 'function') {
	            this.onrender(target);
	        }
	        if (callback) {
	            callback();
	        }
	    };

	    /**
	     * Export class to global
	     */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return MegaPixImage;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)); // for AMD loader
	    } else {
	        this.MegaPixImage = MegaPixImage;
	    }

	})();


/***/ }),
/* 8 */
/***/ (function(module, exports) {

	function JPEGEncoder (l) {
	    var o = this;
	    var s = Math.round;
	    var k = Math.floor;
	    var O = new Array(64);
	    var K = new Array(64);
	    var d = new Array(64);
	    var Z = new Array(64);
	    var u;
	    var h;
	    var G;
	    var T;
	    var n = new Array(65535);
	    var m = new Array(65535);
	    var P = new Array(64);
	    var S = new Array(64);
	    var j = [];
	    var t = 0;
	    var a = 7;
	    var A = new Array(64);
	    var f = new Array(64);
	    var U = new Array(64);
	    var e = new Array(256);
	    var C = new Array(2048);
	    var x;
	    var i = [0, 1, 5, 6, 14, 15, 27, 28, 2, 4, 7, 13, 16, 26, 29, 42, 3, 8, 12, 17, 25, 30, 41, 43, 9, 11, 18, 24, 31, 40, 44, 53, 10, 19, 23, 32, 39, 45, 52, 54, 20, 22, 33, 38, 46, 51, 55, 60, 21, 34, 37, 47, 50, 56, 59, 61, 35, 36, 48, 49, 57, 58, 62, 63];
	    var g = [0, 0, 1, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0];
	    var c = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	    var w = [0, 0, 2, 1, 3, 3, 2, 4, 3, 5, 5, 4, 4, 0, 0, 1, 125];
	    var E = [1, 2, 3, 0, 4, 17, 5, 18, 33, 49, 65, 6, 19, 81, 97, 7, 34, 113, 20, 50, 129, 145, 161, 8, 35, 66, 177, 193, 21, 82, 209, 240, 36, 51, 98, 114, 130, 9, 10, 22, 23, 24, 25, 26, 37, 38, 39, 40, 41, 42, 52, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250];
	    var v = [0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0];
	    var Y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	    var J = [0, 0, 2, 1, 2, 4, 4, 3, 4, 7, 5, 4, 4, 0, 1, 2, 119];
	    var B = [0, 1, 2, 3, 17, 4, 5, 33, 49, 6, 18, 65, 81, 7, 97, 113, 19, 34, 50, 129, 8, 20, 66, 145, 161, 177, 193, 9, 35, 51, 82, 240, 21, 98, 114, 209, 10, 22, 36, 52, 225, 37, 241, 23, 24, 25, 26, 38, 39, 40, 41, 42, 53, 54, 55, 56, 57, 58, 67, 68, 69, 70, 71, 72, 73, 74, 83, 84, 85, 86, 87, 88, 89, 90, 99, 100, 101, 102, 103, 104, 105, 106, 115, 116, 117, 118, 119, 120, 121, 122, 130, 131, 132, 133, 134, 135, 136, 137, 138, 146, 147, 148, 149, 150, 151, 152, 153, 154, 162, 163, 164, 165, 166, 167, 168, 169, 170, 178, 179, 180, 181, 182, 183, 184, 185, 186, 194, 195, 196, 197, 198, 199, 200, 201, 202, 210, 211, 212, 213, 214, 215, 216, 217, 218, 226, 227, 228, 229, 230, 231, 232, 233, 234, 242, 243, 244, 245, 246, 247, 248, 249, 250];

	    function M (ag) {
	        var af = [16, 11, 10, 16, 24, 40, 51, 61, 12, 12, 14, 19, 26, 58, 60, 55, 14, 13, 16, 24, 40, 57, 69, 56, 14, 17, 22, 29, 51, 87, 80, 62, 18, 22, 37, 56, 68, 109, 103, 77, 24, 35, 55, 64, 81, 104, 113, 92, 49, 64, 78, 87, 103, 121, 120, 101, 72, 92, 95, 98, 112, 100, 103, 99];
	        for (var ae = 0; ae < 64; ae++) {
	            var aj = k((af[ae] * ag + 50) / 100);
	            if (aj < 1) {
	                aj = 1
	            } else {
	                if (aj > 255) {
	                    aj = 255
	                }
	            }
	            O[i[ae]] = aj
	        }
	        var ah = [17, 18, 24, 47, 99, 99, 99, 99, 18, 21, 26, 66, 99, 99, 99, 99, 24, 26, 56, 99, 99, 99, 99, 99, 47, 66, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99, 99];
	        for (var ad = 0; ad < 64; ad++) {
	            var ai = k((ah[ad] * ag + 50) / 100);
	            if (ai < 1) {
	                ai = 1
	            } else {
	                if (ai > 255) {
	                    ai = 255
	                }
	            }
	            K[i[ad]] = ai
	        }
	        var ac = [1, 1.387039845, 1.306562965, 1.175875602, 1, 0.785694958, 0.5411961, 0.275899379];
	        var ab = 0;
	        for (var ak = 0; ak < 8; ak++) {
	            for (var aa = 0; aa < 8; aa++) {
	                d[ab] = (1 / (O[i[ab]] * ac[ak] * ac[aa] * 8));
	                Z[ab] = (1 / (K[i[ab]] * ac[ak] * ac[aa] * 8));
	                ab++
	            }
	        }
	    }

	    function q (ae, aa) {
	        var ad = 0;
	        var ag = 0;
	        var af = new Array();
	        for (var ab = 1; ab <= 16; ab++) {
	            for (var ac = 1; ac <= ae[ab]; ac++) {
	                af[aa[ag]]    = [];
	                af[aa[ag]][0] = ad;
	                af[aa[ag]][1] = ab;
	                ag++;
	                ad++
	            }
	            ad *= 2
	        }
	        return af
	    }

	    function W () {
	        u = q(g, c);
	        h = q(v, Y);
	        G = q(w, E);
	        T = q(J, B)
	    }

	    function z () {
	        var ac = 1;
	        var ab = 2;
	        for (var aa = 1; aa <= 15; aa++) {
	            for (var ad = ac; ad < ab; ad++) {
	                m[32767 + ad]    = aa;
	                n[32767 + ad]    = [];
	                n[32767 + ad][1] = aa;
	                n[32767 + ad][0] = ad
	            }
	            for (var ae = -(ab - 1); ae <= -ac; ae++) {
	                m[32767 + ae]    = aa;
	                n[32767 + ae]    = [];
	                n[32767 + ae][1] = aa;
	                n[32767 + ae][0] = ab - 1 + ae
	            }
	            ac <<= 1;
	            ab <<= 1
	        }
	    }

	    function V () {
	        for (var aa = 0; aa < 256; aa++) {
	            C[aa]               = 19595 * aa;
	            C[(aa + 256) >> 0]  = 38470 * aa;
	            C[(aa + 512) >> 0]  = 7471 * aa + 32768;
	            C[(aa + 768) >> 0]  = -11059 * aa;
	            C[(aa + 1024) >> 0] = -21709 * aa;
	            C[(aa + 1280) >> 0] = 32768 * aa + 8421375;
	            C[(aa + 1536) >> 0] = -27439 * aa;
	            C[(aa + 1792) >> 0] = -5329 * aa
	        }
	    }

	    function X (aa) {
	        var ac = aa[0];
	        var ab = aa[1] - 1;
	        while (ab >= 0) {
	            if (ac & (1 << ab)) {
	                t |= (1 << a)
	            }
	            ab--;
	            a--;
	            if (a < 0) {
	                if (t == 255) {
	                    F(255);
	                    F(0)
	                } else {
	                    F(t)
	                }
	                a = 7;
	                t = 0
	            }
	        }
	    }

	    function F (aa) {
	        j.push(e[aa])
	    }

	    function p (aa) {
	        F((aa >> 8) & 255);
	        F((aa) & 255)
	    }

	    function N (aZ, ap) {
	        var aL, aK, aJ, aI, aH, aD, aC, aB;
	        var aN   = 0;
	        var aR;
	        const aq = 8;
	        const ai = 64;
	        for (aR = 0; aR < aq; ++aR) {
	            aL         = aZ[aN];
	            aK         = aZ[aN + 1];
	            aJ         = aZ[aN + 2];
	            aI         = aZ[aN + 3];
	            aH         = aZ[aN + 4];
	            aD         = aZ[aN + 5];
	            aC         = aZ[aN + 6];
	            aB         = aZ[aN + 7];
	            var aY     = aL + aB;
	            var aO     = aL - aB;
	            var aX     = aK + aC;
	            var aP     = aK - aC;
	            var aU     = aJ + aD;
	            var aQ     = aJ - aD;
	            var aT     = aI + aH;
	            var aS     = aI - aH;
	            var an     = aY + aT;
	            var ak     = aY - aT;
	            var am     = aX + aU;
	            var al     = aX - aU;
	            aZ[aN]     = an + am;
	            aZ[aN + 4] = an - am;
	            var ax     = (al + ak) * 0.707106781;
	            aZ[aN + 2] = ak + ax;
	            aZ[aN + 6] = ak - ax;
	            an         = aS + aQ;
	            am         = aQ + aP;
	            al         = aP + aO;
	            var at     = (an - al) * 0.382683433;
	            var aw     = 0.5411961 * an + at;
	            var au     = 1.306562965 * al + at;
	            var av     = am * 0.707106781;
	            var ah     = aO + av;
	            var ag     = aO - av;
	            aZ[aN + 5] = ag + aw;
	            aZ[aN + 3] = ag - aw;
	            aZ[aN + 1] = ah + au;
	            aZ[aN + 7] = ah - au;
	            aN += 8
	        }
	        aN = 0;
	        for (aR = 0; aR < aq; ++aR) {
	            aL          = aZ[aN];
	            aK          = aZ[aN + 8];
	            aJ          = aZ[aN + 16];
	            aI          = aZ[aN + 24];
	            aH          = aZ[aN + 32];
	            aD          = aZ[aN + 40];
	            aC          = aZ[aN + 48];
	            aB          = aZ[aN + 56];
	            var ar      = aL + aB;
	            var aj      = aL - aB;
	            var az      = aK + aC;
	            var ae      = aK - aC;
	            var aG      = aJ + aD;
	            var ac      = aJ - aD;
	            var aW      = aI + aH;
	            var aa      = aI - aH;
	            var ao      = ar + aW;
	            var aV      = ar - aW;
	            var ay      = az + aG;
	            var aF      = az - aG;
	            aZ[aN]      = ao + ay;
	            aZ[aN + 32] = ao - ay;
	            var af      = (aF + aV) * 0.707106781;
	            aZ[aN + 16] = aV + af;
	            aZ[aN + 48] = aV - af;
	            ao          = aa + ac;
	            ay          = ac + ae;
	            aF          = ae + aj;
	            var aM      = (ao - aF) * 0.382683433;
	            var ad      = 0.5411961 * ao + aM;
	            var a1      = 1.306562965 * aF + aM;
	            var ab      = ay * 0.707106781;
	            var a0      = aj + ab;
	            var aA      = aj - ab;
	            aZ[aN + 40] = aA + ad;
	            aZ[aN + 24] = aA - ad;
	            aZ[aN + 8]  = a0 + a1;
	            aZ[aN + 56] = a0 - a1;
	            aN++
	        }
	        var aE;
	        for (aR = 0; aR < ai; ++aR) {
	            aE    = aZ[aR] * ap[aR];
	            P[aR] = (aE > 0) ? ((aE + 0.5) | 0) : ((aE - 0.5) | 0)
	        }
	        return P
	    }

	    function b () {
	        p(65504);
	        p(16);
	        F(74);
	        F(70);
	        F(73);
	        F(70);
	        F(0);
	        F(1);
	        F(1);
	        F(0);
	        p(1);
	        p(1);
	        F(0);
	        F(0)
	    }

	    function r (aa, ab) {
	        p(65472);
	        p(17);
	        F(8);
	        p(ab);
	        p(aa);
	        F(3);
	        F(1);
	        F(17);
	        F(0);
	        F(2);
	        F(17);
	        F(1);
	        F(3);
	        F(17);
	        F(1)
	    }

	    function D () {
	        p(65499);
	        p(132);
	        F(0);
	        for (var ab = 0; ab < 64; ab++) {
	            F(O[ab])
	        }
	        F(1);
	        for (var aa = 0; aa < 64; aa++) {
	            F(K[aa])
	        }
	    }

	    function H () {
	        p(65476);
	        p(418);
	        F(0);
	        for (var ae = 0; ae < 16; ae++) {
	            F(g[ae + 1])
	        }
	        for (var ad = 0; ad <= 11; ad++) {
	            F(c[ad])
	        }
	        F(16);
	        for (var ac = 0; ac < 16; ac++) {
	            F(w[ac + 1])
	        }
	        for (var ab = 0; ab <= 161; ab++) {
	            F(E[ab])
	        }
	        F(1);
	        for (var aa = 0; aa < 16; aa++) {
	            F(v[aa + 1])
	        }
	        for (var ah = 0; ah <= 11; ah++) {
	            F(Y[ah])
	        }
	        F(17);
	        for (var ag = 0; ag < 16; ag++) {
	            F(J[ag + 1])
	        }
	        for (var af = 0; af <= 161; af++) {
	            F(B[af])
	        }
	    }

	    function I () {
	        p(65498);
	        p(12);
	        F(3);
	        F(1);
	        F(0);
	        F(2);
	        F(17);
	        F(3);
	        F(17);
	        F(0);
	        F(63);
	        F(0)
	    }

	    function L (ad, aa, al, at, ap) {
	        var ag   = ap[0];
	        var ab   = ap[240];
	        var ac;
	        const ar = 16;
	        const ai = 63;
	        const ah = 64;
	        var aq   = N(ad, aa);
	        for (var am = 0; am < ah; ++am) {
	            S[i[am]] = aq[am]
	        }
	        var an = S[0] - al;
	        al     = S[0];
	        if (an == 0) {
	            X(at[0])
	        } else {
	            ac = 32767 + an;
	            X(at[m[ac]]);
	            X(n[ac])
	        }
	        var ae = 63;
	        for (; (ae > 0) && (S[ae] == 0); ae--) {
	        }
	        if (ae == 0) {
	            X(ag);
	            return al
	        }
	        var ao = 1;
	        var au;
	        while (ao <= ae) {
	            var ak = ao;
	            for (; (S[ao] == 0) && (ao <= ae); ++ao) {
	            }
	            var aj = ao - ak;
	            if (aj >= ar) {
	                au = aj >> 4;
	                for (var af = 1; af <= au; ++af) {
	                    X(ab)
	                }
	                aj = aj & 15
	            }
	            ac = 32767 + S[ao];
	            X(ap[(aj << 4) + m[ac]]);
	            X(n[ac]);
	            ao++
	        }
	        if (ae != ai) {
	            X(ag)
	        }
	        return al
	    }

	    function y () {
	        var ab = String.fromCharCode;
	        for (var aa = 0; aa < 256; aa++) {
	            e[aa] = ab(aa)
	        }
	    }

	    this.encode = function (an, aj, aB) {
	        var aa = new Date().getTime();
	        if (aj) {
	            R(aj)
	        }
	        j                       = new Array();
	        t                       = 0;
	        a                       = 7;
	        p(65496);
	        b();
	        D();
	        r(an.width, an.height);
	        H();
	        I();
	        var al                  = 0;
	        var aq                  = 0;
	        var ao                  = 0;
	        t                       = 0;
	        a                       = 7;
	        this.encode.displayName = "_encode_";
	        var at                  = an.data;
	        var ar                  = an.width;
	        var aA                  = an.height;
	        var ay                  = ar * 4;
	        var ai                  = ar * 3;
	        var ah, ag              = 0;
	        var am, ax, az;
	        var ab, ap, ac, af, ae;
	        while (ag < aA) {
	            ah = 0;
	            while (ah < ay) {
	                ab = ay * ag + ah;
	                ap = ab;
	                ac = -1;
	                af = 0;
	                for (ae = 0; ae < 64; ae++) {
	                    af = ae >> 3;
	                    ac = (ae & 7) * 4;
	                    ap = ab + (af * ay) + ac;
	                    if (ag + af >= aA) {
	                        ap -= (ay * (ag + 1 + af - aA))
	                    }
	                    if (ah + ac >= ay) {
	                        ap -= ((ah + ac) - ay + 4)
	                    }
	                    am    = at[ap++];
	                    ax    = at[ap++];
	                    az    = at[ap++];
	                    A[ae] = ((C[am] + C[(ax + 256) >> 0] + C[(az + 512) >> 0]) >> 16) - 128;
	                    f[ae] = ((C[(am + 768) >> 0] + C[(ax + 1024) >> 0] + C[(az + 1280) >> 0]) >> 16) - 128;
	                    U[ae] = ((C[(am + 1280) >> 0] + C[(ax + 1536) >> 0] + C[(az + 1792) >> 0]) >> 16) - 128
	                }
	                al = L(A, d, al, u, G);
	                aq = L(f, Z, aq, h, T);
	                ao = L(U, Z, ao, h, T);
	                ah += 32
	            }
	            ag += 8
	        }
	        if (a >= 0) {
	            var aw = [];
	            aw[1]  = a + 1;
	            aw[0]  = (1 << (a + 1)) - 1;
	            X(aw)
	        }
	        p(65497);
	        if (aB) {
	            var av = j.length;
	            var aC = new Uint8Array(av);
	            for (var au = 0; au < av; au++) {
	                aC[au] = j[au].charCodeAt()
	            }
	            j      = [];
	            var ak = new Date().getTime() - aa;
	            return aC
	        }
	        var ad = "data:image/jpeg;base64," + btoa(j.join(""));
	        j      = [];
	        var ak = new Date().getTime() - aa;
	        return ad
	    };
	    function R (ab) {
	        if (ab <= 0) {
	            ab = 1
	        }
	        if (ab > 100) {
	            ab = 100
	        }
	        if (x == ab) {
	            return
	        }
	        var aa = 0;
	        if (ab < 50) {
	            aa = Math.floor(5000 / ab)
	        } else {
	            aa = Math.floor(200 - ab * 2)
	        }
	        M(aa);
	        x      = ab;
	    }

	    function Q () {
	        var aa = new Date().getTime();
	        if (!l) {
	            l = 50
	        }
	        y();
	        W();
	        z();
	        V();
	        R(l);
	        var ab = new Date().getTime() - aa;
	    }

	    Q()
	}

	module.exports = JPEGEncoder;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	// 保证按需加载的文件路径正确
	__webpack_require__.p = getJsDir('lrz') + '/';
	window.URL              = window.URL || window.webkitURL;

	var Promise          = __webpack_require__(1),
	    BlobFormDataShim = __webpack_require__(5),
	    exif             = __webpack_require__(6);


	var UA = (function (userAgent) {
	    var ISOldIOS     = /OS (.*) like Mac OS X/g.exec(userAgent),
	        isOldAndroid = /Android (\d.*?);/g.exec(userAgent) || /Android\/(\d.*?) /g.exec(userAgent);

	    // 判断设备是否是IOS7以下
	    // 判断设备是否是android4.5以下
	    // 判断是否iOS
	    // 判断是否android
	    // 判断是否QQ浏览器
	    var IOS_VERSION = ISOldIOS ? +ISOldIOS.pop().replace(/_/g, '.') : 0
	    return {
	        oldIOS    : ISOldIOS ? IOS_VERSION < 8 : false,
	        newIOS    : ISOldIOS ? IOS_VERSION >= 13.4 : false,
	        oldAndroid: isOldAndroid ? +isOldAndroid.pop().substr(0, 3) < 4.5 : false,
	        iOS       : /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(userAgent),
	        android   : /Android/g.test(userAgent),
	        mQQBrowser: /MQQBrowser/g.test(userAgent)
	    }
	})(navigator.userAgent);


	function Lrz (file, opts) {
	    var that = this;

	    if (!file) throw new Error('没有收到图片，可能的解决方案：https://github.com/think2011/localResizeIMG/issues/7');

	    opts = opts || {};

	    that.defaults = {
	        width    : null,
	        height   : null,
	        fieldName: 'file',
	        ingnoreOrientation: UA.iOS ? UA.newIOS : true,
	        quality  : 0.7
	    };

	    that.file = file;

	    for (var p in opts) {
	        if (!opts.hasOwnProperty(p)) continue;
	        that.defaults[p] = opts[p];
	    }

	    return this.init();
	}

	Lrz.prototype.init = function () {
	    var that         = this,
	        file         = that.file,
	        fileIsString = typeof file === 'string',
	        fileIsBase64 = /^data:/.test(file),
	        img          = new Image(),
	        canvas       = document.createElement('canvas'),
	        blob         = fileIsString ? file : URL.createObjectURL(file);

	    that.img    = img;
	    that.blob   = blob;
	    that.canvas = canvas;

	    if (fileIsString) {
	        that.fileName = fileIsBase64 ? 'base64.jpg' : (file.split('/').pop());
	    } else {
	        that.fileName = file.name;
	    }

	    if (!document.createElement('canvas').getContext) {
	        throw new Error('浏览器不支持canvas');
	    }

	    return new Promise(function (resolve, reject) {
	        img.onerror = function () {
	            var err = new Error('加载图片文件失败');
	            reject(err);
	            throw err;
	        };

	        img.onload = function () {
	            that._getBase64()
	                .then(function (base64) {
	                    if (base64.length < 10) {
	                        var err = new Error('生成base64失败');
	                        reject(err);
	                        throw err;
	                    }

	                    return base64;
	                })
	                .then(function (base64) {
	                    var formData = null;

	                    // 压缩文件太大就采用源文件,且使用原生的FormData() @source #55
	                    if (typeof that.file === 'object' && base64.length > that.file.size) {
	                        formData = new FormData();
	                        file     = that.file;
	                    } else {
	                        formData = new BlobFormDataShim.FormData();
	                        file     = dataURItoBlob(base64);
	                    }

	                    formData.append(that.defaults.fieldName, file, (that.fileName.replace(/\..+/g, '.jpg')));

	                    resolve({
	                        formData : formData,
	                        fileLen : +file.size,
	                        base64  : base64,
	                        base64Len: base64.length,
	                        origin   : that.file,
	                        file   : file
	                    });

	                    // 释放内存
	                    for (var p in that) {
	                        if (!that.hasOwnProperty(p)) continue;

	                        that[p] = null;
	                    }
	                    URL.revokeObjectURL(that.blob);
	                });
	        };

	        // 如果传入的是base64在移动端会报错
	        !fileIsBase64 && (img.crossOrigin = "*");

	        img.src = blob;
	    });
	};

	Lrz.prototype._getBase64 = function () {
	    var that   = this,
	        img    = that.img,
	        file   = that.file,
	        canvas = that.canvas;

	    return new Promise(function (resolve) {
	        try {
	            // 传入blob在android4.3以下有bug
	            exif.getData(typeof file === 'object' ? file : img, function () {
	                that.orientation = that.defaults.ingnoreOrientation ? 0 : exif.getTag(this, "Orientation");

	                that.resize = that._getResize();
	                that.ctx    = canvas.getContext('2d');

	                canvas.width  = that.resize.width;
	                canvas.height = that.resize.height;

	                // 设置为白色背景，jpg是不支持透明的，所以会被默认为canvas默认的黑色背景。
	                that.ctx.fillStyle = '#fff';
	                that.ctx.fillRect(0, 0, canvas.width, canvas.height);

	                // 根据设备对应处理方式
	                if (UA.oldIOS) {
	                    that._createBase64ForOldIOS().then(resolve);
	                }
	                else {
	                    that._createBase64().then(resolve);
	                }
	            });
	        } catch (err) {
	            // 这样能解决低内存设备闪退的问题吗？
	            throw new Error(err);
	        }
	    });
	};


	Lrz.prototype._createBase64ForOldIOS = function () {
	    var that        = this,
	        img         = that.img,
	        canvas      = that.canvas,
	        defaults    = that.defaults,
	        orientation = that.orientation;

	    return new Promise(function (resolve) {
	        !/* require */(/* empty */function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(7)]; (function (MegaPixImage) {
	            var mpImg = new MegaPixImage(img);

	            if ("5678".indexOf(orientation) > -1) {
	                mpImg.render(canvas, {
	                    width      : canvas.height,
	                    height     : canvas.width,
	                    orientation: orientation
	                });
	            } else {
	                mpImg.render(canvas, {
	                    width      : canvas.width,
	                    height     : canvas.height,
	                    orientation: orientation
	                });
	            }

	            resolve(canvas.toDataURL('image/jpeg', defaults.quality));
	        }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}());
	    });
	};

	Lrz.prototype._createBase64 = function () {
	    var that        = this,
	        resize      = that.resize,
	        img         = that.img,
	        canvas      = that.canvas,
	        ctx         = that.ctx,
	        defaults    = that.defaults,
	        orientation = that.orientation;

	    // 调整为正确方向
	    switch (orientation) {
	        case 3:
	            ctx.rotate(180 * Math.PI / 180);
	            ctx.drawImage(img, -resize.width, -resize.height, resize.width, resize.height);
	            break;
	        case 6:
	            ctx.rotate(90 * Math.PI / 180);
	            ctx.drawImage(img, 0, -resize.width, resize.height, resize.width);
	            break;
	        case 8:
	            ctx.rotate(270 * Math.PI / 180);
	            ctx.drawImage(img, -resize.height, 0, resize.height, resize.width);
	            break;

	        case 2:
	            ctx.translate(resize.width, 0);
	            ctx.scale(-1, 1);
	            ctx.drawImage(img, 0, 0, resize.width, resize.height);
	            break;
	        case 4:
	            ctx.translate(resize.width, 0);
	            ctx.scale(-1, 1);
	            ctx.rotate(180 * Math.PI / 180);
	            ctx.drawImage(img, -resize.width, -resize.height, resize.width, resize.height);
	            break;
	        case 5:
	            ctx.translate(resize.width, 0);
	            ctx.scale(-1, 1);
	            ctx.rotate(90 * Math.PI / 180);
	            ctx.drawImage(img, 0, -resize.width, resize.height, resize.width);
	            break;
	        case 7:
	            ctx.translate(resize.width, 0);
	            ctx.scale(-1, 1);
	            ctx.rotate(270 * Math.PI / 180);
	            ctx.drawImage(img, -resize.height, 0, resize.height, resize.width);
	            break;

	        default:
	            ctx.drawImage(img, 0, 0, resize.width, resize.height);
	    }

	    return new Promise(function (resolve) {
	        if (UA.oldAndroid || UA.mQQBrowser || !navigator.userAgent) {
	            !/* require */(/* empty */function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(8)]; (function (JPEGEncoder) {
	                var encoder = new JPEGEncoder(),
	                    img     = ctx.getImageData(0, 0, canvas.width, canvas.height);

	                resolve(encoder.encode(img, defaults.quality * 100));
	            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}())
	        }
	        else {
	            resolve(canvas.toDataURL('image/jpeg', defaults.quality));
	        }
	    });
	};

	Lrz.prototype._getResize = function () {
	    var that        = this,
	        img         = that.img,
	        defaults    = that.defaults,
	        width       = defaults.width,
	        height      = defaults.height,
	        orientation = that.orientation;

	    var ret = {
	        width : img.width,
	        height: img.height
	    };

	    if ("5678".indexOf(orientation) > -1) {
	        ret.width  = img.height;
	        ret.height = img.width;
	    }

	    // 如果原图小于设定，采用原图
	    if (ret.width < width || ret.height < height) {
	        return ret;
	    }

	    var scale = ret.width / ret.height;

	    if (width && height) {
	        if (scale >= width / height) {
	            if (ret.width > width) {
	                ret.width  = width;
	                ret.height = Math.ceil(width / scale);
	            }
	        } else {
	            if (ret.height > height) {
	                ret.height = height;
	                ret.width  = Math.ceil(height * scale);
	            }
	        }
	    }
	    else if (width) {
	        if (width < ret.width) {
	            ret.width  = width;
	            ret.height = Math.ceil(width / scale);
	        }
	    }
	    else if (height) {
	        if (height < ret.height) {
	            ret.width  = Math.ceil(height * scale);
	            ret.height = height;
	        }
	    }

	    // 超过这个值base64无法生成，在IOS上
	    while (ret.width >= 3264 || ret.height >= 2448) {
	        ret.width *= 0.8;
	        ret.height *= 0.8;
	    }

	    return ret;
	};

	/**
	 * 获取当前js文件所在路径，必须得在代码顶部执行此函数
	 * @returns {string}
	 */
	function getJsDir (src) {
	    var script = null;

	    if (src) {
	        script = [].filter.call(document.scripts, function (v) {
	            return v.src.indexOf(src) !== -1;
	        })[0];
	    } else {
	        script = document.scripts[document.scripts.length - 1];
	    }

	    if (!script) return null;

	    return script.src.substr(0, script.src.lastIndexOf('/'));
	}


	/**
	 * 转换成formdata
	 * @param dataURI
	 * @returns {*}
	 *
	 * @source http://stackoverflow.com/questions/4998908/convert-data-uri-to-file-then-append-to-formdata
	 */
	function dataURItoBlob (dataURI) {
	    // convert base64/URLEncoded data component to raw binary data held in a string
	    var byteString;
	    if (dataURI.split(',')[0].indexOf('base64') >= 0)
	        byteString = atob(dataURI.split(',')[1]);
	    else
	        byteString = unescape(dataURI.split(',')[1]);

	    // separate out the mime component
	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	    // write the bytes of the string to a typed array
	    var ia = new Uint8Array(byteString.length);
	    for (var i = 0; i < byteString.length; i++) {
	        ia[i] = byteString.charCodeAt(i);
	    }

	    return new BlobFormDataShim.Blob([ia.buffer], {type: mimeString});
	}

	window.lrz = function (file, opts) {
	    return new Lrz(file, opts);
	};

	// 版本号来自package.json，构建时自动填充
	window.lrz.version = '__packageJSON.version__';

	module.exports = window.lrz;

	/**
	 *
	 * 　　　┏┓　　　┏┓
	 * 　　┏┛┻━━━┛┻┓
	 * 　　┃　　　　　　　┃
	 * 　　┃　　　━　　　┃
	 * 　　┃　┳┛　┗┳　┃
	 * 　　┃　　　　　　　┃
	 * 　　┃　　　┻　　　┃
	 * 　　┃　　　　　　　┃
	 * 　　┗━┓　　　┏━┛Code is far away from bug with the animal protecting
	 * 　　　　┃　　　┃    神兽保佑,代码无bug
	 * 　　　　┃　　　┃
	 * 　　　　┃　　　┗━━━┓
	 * 　　　　┃　　　　　 ┣┓
	 * 　　　　┃　　　　 ┏┛
	 * 　　　　┗┓┓┏━┳┓┏┛
	 * 　　　　　┃┫┫　┃┫┫
	 * 　　　　　┗┻┛　┗┻┛
	 *
	 */




/***/ })
/******/ ])
});
;