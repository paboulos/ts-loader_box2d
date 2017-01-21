/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	const Main_1 = __webpack_require__(1);
	var game = new Main_1.default("canvas", true, 30);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/// <reference path="../../typings/globals/box2d/index.d.ts" />
	const greeter_1 = __webpack_require__(2);
	__webpack_require__(3);
	const box2dweb_commonjs_1 = __webpack_require__(4);
	var b2Vec2 = box2dweb_commonjs_1.default.Common.Math.b2Vec2;
	var b2World = box2dweb_commonjs_1.default.Dynamics.b2World;
	/**
	 *Box2D
	 */
	class Main {
	    constructor(elem, debug, scale) {
	        // Use () => syntax so Render always gets 'this' context
	        // from the class instance
	        this.Render = () => {
	            var tm = new Date().getTime();
	            requestAnimationFrame(this.Render);
	            var dt = (tm - this.lastFrame) / 1000;
	            if (dt > 1 / 15) {
	                dt = 1 / 15;
	            }
	            this.step(dt);
	            this.lastFrame = tm;
	        };
	        // TypeScript uses '<>' to surround casts
	        var cvs = document.getElementById(elem);
	        this.gravity = new b2Vec2(0, 9.8);
	        this.world = new b2World(this.gravity, true);
	        this.scale = scale || 30;
	        this.context = cvs.getContext("2d");
	        this.stepAmt = 1 / 60;
	        this.dtRemaining = 0;
	        this.lastFrame = new Date().getTime();
	        if (debug) {
	            this.debug();
	        }
	        //$("#msg").html(greeter("Fagner"));
	        $(() => { $("#msg").html(greeter_1.default("World")); });
	        this.init();
	    }
	    debug() {
	        this.debugDraw = new box2dweb_commonjs_1.default.Dynamics.b2DebugDraw();
	        this.debugDraw.SetSprite(this.context);
	        this.debugDraw.SetDrawScale(this.scale);
	        this.debugDraw.SetFillAlpha(0.3);
	        this.debugDraw.SetLineThickness(1.0);
	        this.debugDraw.SetFlags(box2dweb_commonjs_1.default.Dynamics.b2DebugDraw.e_shapeBit | box2dweb_commonjs_1.default.Dynamics.b2DebugDraw.e_jointBit);
	        this.world.SetDebugDraw(this.debugDraw);
	    }
	    step(dt) {
	        this.dtRemaining += dt;
	        while (this.dtRemaining > this.stepAmt) {
	            this.dtRemaining -= this.stepAmt;
	            this.world.Step(this.stepAmt, 8, // velocity iterations
	            3); // position iterations
	        }
	        if (this.debugDraw) {
	            this.world.DrawDebugData();
	        }
	    }
	    createFloor() {
	        //A body definition holds all the data needed to construct a rigid body.
	        var bodyDef = new box2dweb_commonjs_1.default.Dynamics.b2BodyDef();
	        bodyDef.type = box2dweb_commonjs_1.default.Dynamics.b2Body.b2_staticBody;
	        bodyDef.position.x = 600 / 2 / this.scale;
	        bodyDef.position.y = 300 / this.scale;
	        // A fixture is used to attach a shape to a body for collision detection.
	        // A fixture definition is used to create a fixture.
	        var fixtureDef = new box2dweb_commonjs_1.default.Dynamics.b2FixtureDef();
	        fixtureDef.density = 1.0;
	        fixtureDef.friction = 0.5;
	        fixtureDef.restitution = 0.2;
	        var shape = new box2dweb_commonjs_1.default.Collision.Shapes.b2PolygonShape();
	        fixtureDef.shape = shape;
	        shape.SetAsBox(300 / this.scale, 10 / this.scale); //640 pixels wide and 20 pixels tall
	        var body = this.world.CreateBody(bodyDef);
	        var fixture = body.CreateFixture(fixtureDef);
	    }
	    init() {
	        var _self = this;
	        this.createFloor();
	        requestAnimationFrame(_self.Render);
	    }
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Main;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	function greet(name) {
	    return 'Hello ' + name;
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = greet;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v2.2.4
	 * http://jquery.com/
	 *
	 * Includes Sizzle.js
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-05-20T17:23Z
	 */
	
	(function( global, factory ) {
	
		if ( typeof module === "object" && typeof module.exports === "object" ) {
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}
	
	// Pass this if window is not defined yet
	}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	// Support: Firefox 18+
	// Can't be in strict mode, several libs including ASP.NET trace
	// the stack via arguments.caller.callee and Firefox dies if
	// you try to trace through "use strict" call chains. (#13335)
	//"use strict";
	var arr = [];
	
	var document = window.document;
	
	var slice = arr.slice;
	
	var concat = arr.concat;
	
	var push = arr.push;
	
	var indexOf = arr.indexOf;
	
	var class2type = {};
	
	var toString = class2type.toString;
	
	var hasOwn = class2type.hasOwnProperty;
	
	var support = {};
	
	
	
	var
		version = "2.2.4",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
	
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Support: Android<4.1
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	
		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([\da-z])/gi,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
	
	jQuery.fn = jQuery.prototype = {
	
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// Start with an empty selector
		selector: "",
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
			return num != null ?
	
				// Return just the one element from the set
				( num < 0 ? this[ num + this.length ] : this[ num ] ) :
	
				// Return all the elements in a clean array
				slice.call( this );
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
			ret.context = this.context;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor();
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
	
			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {
	
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {
	
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend( {
	
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},
	
		isArray: Array.isArray,
	
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},
	
		isNumeric: function( obj ) {
	
			// parseFloat NaNs numeric-cast false positives (null|true|false|"")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			// adding 1 corrects loss of precision from parseFloat (#15100)
			var realStringObj = obj && obj.toString();
			return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
		},
	
		isPlainObject: function( obj ) {
			var key;
	
			// Not plain objects:
			// - Any object or value whose internal [[Class]] property is not "[object Object]"
			// - DOM nodes
			// - window
			if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
				return false;
			}
	
			// Not own constructor property must be Object
			if ( obj.constructor &&
					!hasOwn.call( obj, "constructor" ) &&
					!hasOwn.call( obj.constructor.prototype || {}, "isPrototypeOf" ) ) {
				return false;
			}
	
			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own
			for ( key in obj ) {}
	
			return key === undefined || hasOwn.call( obj, key );
		},
	
		isEmptyObject: function( obj ) {
			var name;
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
	
			// Support: Android<4.0, iOS<6 (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			var script,
				indirect = eval;
	
			code = jQuery.trim( code );
	
			if ( code ) {
	
				// If the code includes a valid, prologue position
				// strict mode pragma, execute code by injecting a
				// script tag into the document.
				if ( code.indexOf( "use strict" ) === 1 ) {
					script = document.createElement( "script" );
					script.text = code;
					document.head.appendChild( script ).parentNode.removeChild( script );
				} else {
	
					// Otherwise, avoid the DOM node creation, insertion
					// and removal by using an indirect global eval
	
					indirect( code );
				}
			}
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE9-11+
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
	
		each: function( obj, callback ) {
			var length, i = 0;
	
			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}
	
			return obj;
		},
	
		// Support: Android<4.1
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;
	
			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
			return proxy;
		},
	
		now: Date.now,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );
	
	// JSHint would error on this code due to the Symbol not being defined in ES5.
	// Defining this global in .jshintrc would create a danger of using the global
	// unguarded in another place, it seems safer to just disable JSHint for these
	// three lines.
	/* jshint ignore: start */
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	/* jshint ignore: end */
	
	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );
	
	function isArrayLike( obj ) {
	
		// Support: iOS 8.2 (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );
	
		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.2.1
	 * http://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2015-10-17
	 */
	(function( window ) {
	
	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,
	
		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
	
		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},
	
		// General-purpose constants
		MAX_NEGATIVE = 1 << 31,
	
		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// http://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},
	
		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
		// Regular expressions
	
		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
	
		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
	
		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",
	
		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",
	
		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),
	
		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},
	
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,
	
		rnative = /^[^{]+\{\s*\[native \w/,
	
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
		rsibling = /[+~]/,
		rescape = /'|\\/g,
	
		// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},
	
		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		};
	
	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?
	
			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :
	
			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}
	
	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, nidselect, match, groups, newSelector,
			newContext = context && context.ownerDocument,
	
			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;
	
		results = results || [];
	
		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
	
			return results;
		}
	
		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {
	
			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;
	
			if ( documentIsHTML ) {
	
				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
	
					// ID selector
					if ( (m = match[1]) ) {
	
						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {
	
								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}
	
						// Element context
						} else {
	
							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {
	
								results.push( elem );
								return results;
							}
						}
	
					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;
	
					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {
	
						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}
	
				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
	
					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;
	
					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {
	
						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rescape, "\\$&" );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}
	
						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
						while ( i-- ) {
							groups[i] = nidselect + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );
	
						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}
	
					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}
	
		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];
	
		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created div and expects a boolean result
	 */
	function assert( fn ) {
		var div = document.createElement("div");
	
		try {
			return !!fn( div );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( div.parentNode ) {
				div.parentNode.removeChild( div );
			}
			// release memory in IE
			div = null;
		}
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;
	
		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				( ~b.sourceIndex || MAX_NEGATIVE ) -
				( ~a.sourceIndex || MAX_NEGATIVE );
	
		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}
	
		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}
	
		return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;
	
				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}
	
	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, parent,
			doc = node ? node.ownerDocument || node : preferredDoc;
	
		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	
		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );
	
		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( (parent = document.defaultView) && parent.top !== parent ) {
			// Support: IE 11
			if ( parent.addEventListener ) {
				parent.addEventListener( "unload", unloadHandler, false );
	
			// Support: IE 9 - 10 only
			} else if ( parent.attachEvent ) {
				parent.attachEvent( "onunload", unloadHandler );
			}
		}
	
		/* Attributes
		---------------------------------------------------------------------- */
	
		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( div ) {
			div.className = "i";
			return !div.getAttribute("className");
		});
	
		/* getElement(s)By*
		---------------------------------------------------------------------- */
	
		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( div ) {
			div.appendChild( document.createComment("") );
			return !div.getElementsByTagName("*").length;
		});
	
		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );
	
		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( div ) {
			docElem.appendChild( div ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});
	
		// ID find and filter
		if ( support.getById ) {
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var m = context.getElementById( id );
					return m ? [ m ] : [];
				}
			};
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
		} else {
			// Support: IE6/7
			// getElementById is not reliable as a find shortcut
			delete Expr.find["ID"];
	
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
		}
	
		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );
	
				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :
	
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );
	
				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}
	
					return tmp;
				}
				return results;
			};
	
		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};
	
		/* QSA/matchesSelector
		---------------------------------------------------------------------- */
	
		// QSA and matchesSelector support
	
		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];
	
		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See http://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];
	
		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( div ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// http://bugs.jquery.com/ticket/12359
				docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";
	
				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( div.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}
	
				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !div.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}
	
				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}
	
				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
	
				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibing-combinator selector` fails
				if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});
	
			assert(function( div ) {
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				div.appendChild( input ).setAttribute( "name", "D" );
	
				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( div.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}
	
				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( !div.querySelectorAll(":enabled").length ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Opera 10-11 does not throw on post-comma invalid pseudos
				div.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}
	
		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {
	
			assert(function( div ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( div, "div" );
	
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( div, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}
	
		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );
	
		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};
	
		/* Sorting
		---------------------------------------------------------------------- */
	
		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {
	
			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}
	
			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :
	
				// Otherwise we know they are disconnected
				1;
	
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}
	
				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}
	
			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];
	
			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
	
			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}
	
			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}
	
			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}
	
			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :
	
				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};
	
		return document;
	};
	
	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );
	
		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
			try {
				var ret = matches.call( elem, expr );
	
				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}
	
		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;
	
		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;
	
		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );
	
		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}
	
		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;
	
		return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;
	
		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	
		return ret;
	};
	
	Expr = Sizzle.selectors = {
	
		// Can be adjusted by the user
		cacheLength: 50,
	
		createPseudo: markFunction,
	
		match: matchExpr,
	
		attrHandle: {},
	
		find: {},
	
		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},
	
		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );
	
				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
	
				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}
	
				return match.slice( 0, 4 );
			},
	
			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();
	
				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}
	
					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}
	
				return match;
			},
	
			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];
	
				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}
	
				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";
	
				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}
	
				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},
	
		filter: {
	
			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},
	
			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];
	
				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},
	
			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );
	
					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}
	
					result += "";
	
					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},
	
			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";
	
				return first === 1 && last === 0 ?
	
					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :
	
					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;
	
						if ( parent ) {
	
							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {
	
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}
	
							start = [ forward ? parent.firstChild : parent.lastChild ];
	
							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
	
								// Seek `elem` from a previously-cached index
	
								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});
	
								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});
	
								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];
	
								while ( (node = ++nodeIndex && node && node[ dir ] ||
	
									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}
	
							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});
	
									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});
	
									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}
	
								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {
	
										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {
	
											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});
	
												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});
	
												uniqueCache[ type ] = [ dirruns, diff ];
											}
	
											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}
	
							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},
	
			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );
	
				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}
	
				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}
	
				return fn;
			}
		},
	
		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );
	
				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;
	
						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),
	
			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),
	
			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),
	
			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),
	
			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},
	
			"root": function( elem ) {
				return elem === docElem;
			},
	
			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},
	
			// Boolean properties
			"enabled": function( elem ) {
				return elem.disabled === false;
			},
	
			"disabled": function( elem ) {
				return elem.disabled === true;
			},
	
			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},
	
			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},
	
			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},
	
			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},
	
			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},
	
			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},
	
			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
	
					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},
	
			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),
	
			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),
	
			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),
	
			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];
	
		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}
	
		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;
	
		while ( soFar ) {
	
			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}
	
			matched = false;
	
			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}
	
			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}
	
			if ( !matched ) {
				break;
			}
		}
	
		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};
	
	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			checkNonElements = base && dir === "parentNode",
			doneName = done++;
	
		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
			} :
	
			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];
	
				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
	
							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});
	
							if ( (oldCache = uniqueCache[ dir ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
	
								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ dir ] = newCache;
	
								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
			};
	}
	
	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}
	
	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}
	
	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;
	
		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}
	
		return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,
	
				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,
	
				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
						// ...intermediate processing is necessary
						[] :
	
						// ...otherwise use results directly
						results :
					matcherIn;
	
			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}
	
			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );
	
				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}
	
			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}
	
					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
	
							seed[temp] = !(results[temp] = elem);
						}
					}
				}
	
			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}
	
	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,
	
			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];
	
		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}
	
		return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;
	
				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}
	
				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}
	
					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}
	
						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}
	
				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;
	
				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}
	
					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}
	
						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}
	
					// Add matches to results
					push.apply( results, setMatched );
	
					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {
	
						Sizzle.uniqueSort( results );
					}
				}
	
				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}
	
				return unmatched;
			};
	
		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];
	
		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}
	
			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	
			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};
	
	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );
	
		results = results || [];
	
		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {
	
			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {
	
				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
	
				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}
	
				selector = selector.slice( tokens.shift().value.length );
			}
	
			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];
	
				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {
	
						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}
	
						break;
					}
				}
			}
		}
	
		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( div1 ) {
		// Should return 1, but returns 4 (following)
		return div1.compareDocumentPosition( document.createElement("div") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( div ) {
		div.innerHTML = "<a href='#'></a>";
		return div.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( div ) {
		div.innerHTML = "<input/>";
		div.firstChild.setAttribute( "value", "" );
		return div.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( div ) {
		return div.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}
	
	return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	
	
	
	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;
	
		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};
	
	
	var siblings = function( n, elem ) {
		var matched = [];
	
		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}
	
		return matched;
	};
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );
	
	
	
	var risSimple = /^.[^:#\[\.,]*$/;
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				/* jshint -W018 */
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
	
		}
	
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
	
		}
	
		if ( typeof qualifier === "string" ) {
			if ( risSimple.test( qualifier ) ) {
				return jQuery.filter( qualifier, elements, not );
			}
	
			qualifier = jQuery.filter( qualifier, elements );
		}
	
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			} ) );
	};
	
	jQuery.fn.extend( {
		find: function( selector ) {
			var i,
				len = this.length,
				ret = [],
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			// Needed because $( selector, context ) becomes $( context ).find( selector )
			ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
			ret.selector = this.selector ? this.selector + " " + selector : selector;
			return ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );
	
	
	// Initialize a jQuery object
	
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
	
		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {
	
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;
	
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
	
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );
	
						// Support: Blackberry 4.6
						// gEBID returns nodes no longer in the document (#6963)
						if ( elem && elem.parentNode ) {
	
							// Inject the element directly into the jQuery object
							this.length = 1;
							this[ 0 ] = elem;
						}
	
						this.context = document;
						this.selector = selector;
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this.context = this[ 0 ] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :
	
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			if ( selector.selector !== undefined ) {
				this.selector = selector.selector;
				this.context = selector.context;
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
					jQuery( selectors, context || this.context ) :
					0;
	
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {
	
					// Always skip document fragments
					if ( cur.nodeType < 11 && ( pos ?
						pos.index( cur ) > -1 :
	
						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {
	
						matched.push( cur );
						break;
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},
	
		// Determine the position of an element within the set
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );
	
	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
	
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	} );
	var rnotwhite = ( /\S+/g );
	
	
	
	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );
	
		var // Flag to know if list is currently firing
			firing,
	
			// Last fire value for non-forgettable lists
			memory,
	
			// Flag to know if list was already fired
			fired,
	
			// Flag to prevent firing
			locked,
	
			// Actual callback list
			list = [],
	
			// Queue of execution data for repeatable lists
			queue = [],
	
			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,
	
			// Fire callbacks
			fire = function() {
	
				// Enforce single-firing
				locked = options.once;
	
				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {
	
						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {
	
							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}
	
				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}
	
				firing = false;
	
				// Clean up if we're done firing for good
				if ( locked ) {
	
					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];
	
					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},
	
			// Actual Callbacks object
			self = {
	
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
	
						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}
	
						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {
	
									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );
	
						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
	
							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},
	
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},
	
				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},
	
				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},
	
				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},
	
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
	
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	jQuery.extend( {
	
		Deferred: function( func ) {
			var tuples = [
	
					// action, add listener, listener list, final state
					[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
					[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					then: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
								var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
	
								// deferred[ done | fail | progress ] for forwarding actions to newDefer
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this === promise ? newDefer.promise() : this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
	
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Keep pipe for back-compat
			promise.pipe = promise.then;
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 3 ];
	
				// promise[ done | fail | progress ] = list.add
				promise[ tuple[ 1 ] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add( function() {
	
						// state = [ resolved | rejected ]
						state = stateString;
	
					// [ reject_list | resolve_list ].disable; progress_list.lock
					}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
				}
	
				// deferred[ resolve | reject | notify ]
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
					return this;
				};
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( subordinate /* , ..., subordinateN */ ) {
			var i = 0,
				resolveValues = slice.call( arguments ),
				length = resolveValues.length,
	
				// the count of uncompleted subordinates
				remaining = length !== 1 ||
					( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,
	
				// the master Deferred.
				// If resolveValues consist of only a single Deferred, just use that.
				deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
	
				// Update function for both resolve and progress values
				updateFunc = function( i, contexts, values ) {
					return function( value ) {
						contexts[ i ] = this;
						values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( values === progressValues ) {
							deferred.notifyWith( contexts, values );
						} else if ( !( --remaining ) ) {
							deferred.resolveWith( contexts, values );
						}
					};
				},
	
				progressValues, progressContexts, resolveContexts;
	
			// Add listeners to Deferred subordinates; treat others as resolved
			if ( length > 1 ) {
				progressValues = new Array( length );
				progressContexts = new Array( length );
				resolveContexts = new Array( length );
				for ( ; i < length; i++ ) {
					if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
						resolveValues[ i ].promise()
							.progress( updateFunc( i, progressContexts, progressValues ) )
							.done( updateFunc( i, resolveContexts, resolveValues ) )
							.fail( deferred.reject );
					} else {
						--remaining;
					}
				}
			}
	
			// If we're not waiting on anything, resolve the master
			if ( !remaining ) {
				deferred.resolveWith( resolveContexts, resolveValues );
			}
	
			return deferred.promise();
		}
	} );
	
	
	// The deferred used on DOM ready
	var readyList;
	
	jQuery.fn.ready = function( fn ) {
	
		// Add the callback
		jQuery.ready.promise().done( fn );
	
		return this;
	};
	
	jQuery.extend( {
	
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},
	
		// Handle when the DOM is ready
		ready: function( wait ) {
	
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}
	
			// Remember that the DOM is ready
			jQuery.isReady = true;
	
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}
	
			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
	
			// Trigger any bound ready events
			if ( jQuery.fn.triggerHandler ) {
				jQuery( document ).triggerHandler( "ready" );
				jQuery( document ).off( "ready" );
			}
		}
	} );
	
	/**
	 * The ready event handler and self cleanup method
	 */
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}
	
	jQuery.ready.promise = function( obj ) {
		if ( !readyList ) {
	
			readyList = jQuery.Deferred();
	
			// Catch cases where $(document).ready() is called
			// after the browser event has already occurred.
			// Support: IE9-10 only
			// Older IE sometimes signals "interactive" too soon
			if ( document.readyState === "complete" ||
				( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
	
				// Handle it asynchronously to allow scripts the opportunity to delay ready
				window.setTimeout( jQuery.ready );
	
			} else {
	
				// Use the handy event callback
				document.addEventListener( "DOMContentLoaded", completed );
	
				// A fallback to window.onload, that will always work
				window.addEventListener( "load", completed );
			}
		}
		return readyList.promise( obj );
	};
	
	// Kick off the DOM ready check even if the user does not
	jQuery.ready.promise();
	
	
	
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
	
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}
	
		return chainable ?
			elems :
	
			// Gets
			bulk ?
				fn.call( elems ) :
				len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {
	
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		/* jshint -W018 */
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	
	
	
	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}
	
	Data.uid = 1;
	
	Data.prototype = {
	
		register: function( owner, initial ) {
			var value = initial || {};
	
			// If it is a node unlikely to be stringify-ed or looped over
			// use plain assignment
			if ( owner.nodeType ) {
				owner[ this.expando ] = value;
	
			// Otherwise secure it in a non-enumerable, non-writable property
			// configurability must be true to allow the property to be
			// deleted with the delete operator
			} else {
				Object.defineProperty( owner, this.expando, {
					value: value,
					writable: true,
					configurable: true
				} );
			}
			return owner[ this.expando ];
		},
		cache: function( owner ) {
	
			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( !acceptData( owner ) ) {
				return {};
			}
	
			// Check if the owner object already has a cache
			var value = owner[ this.expando ];
	
			// If not, create one
			if ( !value ) {
				value = {};
	
				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {
	
					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;
	
					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}
	
			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );
	
			// Handle: [ owner, key, value ] args
			if ( typeof data === "string" ) {
				cache[ data ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
	
				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
				owner[ this.expando ] && owner[ this.expando ][ key ];
		},
		access: function( owner, key, value ) {
			var stored;
	
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {
	
				stored = this.get( owner, key );
	
				return stored !== undefined ?
					stored : this.get( owner, jQuery.camelCase( key ) );
			}
	
			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i, name, camel,
				cache = owner[ this.expando ];
	
			if ( cache === undefined ) {
				return;
			}
	
			if ( key === undefined ) {
				this.register( owner );
	
			} else {
	
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
	
					// If "name" is an array of keys...
					// When data is initially created, via ("key", "val") signature,
					// keys will be converted to camelCase.
					// Since there is no way to tell _how_ a key was added, remove
					// both plain key and camelCase key. #12786
					// This will only penalize the array argument path.
					name = key.concat( key.map( jQuery.camelCase ) );
				} else {
					camel = jQuery.camelCase( key );
	
					// Try the string as a key before any manipulation
					if ( key in cache ) {
						name = [ key, camel ];
					} else {
	
						// If a key with the spaces exists, use it.
						// Otherwise, create an array by matching non-whitespace
						name = camel;
						name = name in cache ?
							[ name ] : ( name.match( rnotwhite ) || [] );
					}
				}
	
				i = name.length;
	
				while ( i-- ) {
					delete cache[ name[ i ] ];
				}
			}
	
			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
	
				// Support: Chrome <= 35-45+
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://code.google.com/p/chromium/issues/detail?id=378607
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();
	
	var dataUser = new Data();
	
	
	
	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
	
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;
	
	function dataAttr( elem, key, data ) {
		var name;
	
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = data === "true" ? true :
						data === "false" ? false :
						data === "null" ? null :
	
						// Only convert to a number if it doesn't change the string
						+data + "" === data ? +data :
						rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
				} catch ( e ) {}
	
				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}
	
	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},
	
		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},
	
		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},
	
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},
	
		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );
	
	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );
	
					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {
	
							// Support: IE11+
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}
	
			return access( this, function( value ) {
				var data, camelKey;
	
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
	
					// Attempt to get data from the cache
					// with the key as-is
					data = dataUser.get( elem, key ) ||
	
						// Try to find dashed key if it exists (gh-2779)
						// This is for 2.2.x only
						dataUser.get( elem, key.replace( rmultiDash, "-$&" ).toLowerCase() );
	
					if ( data !== undefined ) {
						return data;
					}
	
					camelKey = jQuery.camelCase( key );
	
					// Attempt to get data from the cache
					// with the key camelized
					data = dataUser.get( elem, camelKey );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, camelKey, undefined );
					if ( data !== undefined ) {
						return data;
					}
	
					// We tried really hard, but the data doesn't exist.
					return;
				}
	
				// Set the data...
				camelKey = jQuery.camelCase( key );
				this.each( function() {
	
					// First, attempt to store a copy or reference of any
					// data that might've been store with a camelCased key.
					var data = dataUser.get( this, camelKey );
	
					// For HTML5 data-* attribute interop, we have to
					// store property names with dashes in a camelCase form.
					// This might not apply to all properties...*
					dataUser.set( this, camelKey, value );
	
					// *... In the case of properties that might _actually_
					// have dashes, we need to also store a copy of that
					// unchanged property.
					if ( key.indexOf( "-" ) > -1 && data !== undefined ) {
						dataUser.set( this, key, value );
					}
				} );
			}, null, value, arguments.length > 1, null, true );
		},
	
		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );
	
	
	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;
	
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}
	
			if ( fn ) {
	
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}
	
			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},
	
		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );
	
	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}
	
			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );
	
					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );
	
					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
	
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};
	
			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
	
			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
	
	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );
	
	
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	var isHidden = function( elem, el ) {
	
			// isHidden might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
			return jQuery.css( elem, "display" ) === "none" ||
				!jQuery.contains( elem.ownerDocument, elem );
		};
	
	
	
	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() { return tween.cur(); } :
				function() { return jQuery.css( elem, prop, "" ); },
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );
	
		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
	
			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];
	
			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
	
			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;
	
			do {
	
				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";
	
				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );
	
			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}
	
		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;
	
			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	var rcheckableType = ( /^(?:checkbox|radio)$/i );
	
	var rtagName = ( /<([\w:-]+)/ );
	
	var rscriptType = ( /^$|\/(?:java|ecma)script/i );
	
	
	
	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {
	
		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
		_default: [ 0, "", "" ]
	};
	
	// Support: IE9
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	
	function getAll( context, tag ) {
	
		// Support: IE9-11+
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret = typeof context.getElementsByTagName !== "undefined" ?
				context.getElementsByTagName( tag || "*" ) :
				typeof context.querySelectorAll !== "undefined" ?
					context.querySelectorAll( tag || "*" ) :
				[];
	
		return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
			jQuery.merge( [ context ], ret ) :
			ret;
	}
	
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	
	var rhtml = /<|&#?\w+;/;
	
	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			elem = elems[ i ];
	
			if ( elem || elem === 0 ) {
	
				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
	
					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );
	
				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );
	
					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
	
					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}
	
					// Support: Android<4.1, PhantomJS<2
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );
	
					// Remember the top-level container
					tmp = fragment.firstChild;
	
					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}
	
		// Remove wrapper from fragment
		fragment.textContent = "";
	
		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {
	
			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}
	
			contains = jQuery.contains( elem.ownerDocument, elem );
	
			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );
	
			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}
	
			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}
	
		return fragment;
	}
	
	
	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );
	
		// Support: Android 4.0-4.3, Safari<=5.1
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
	
		// Support: Safari<=5.1, Android<4.2
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Support: IE<=11+
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	// Support: IE9
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;
	
		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
	
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
	
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}
	
		if ( data == null && fn == null ) {
	
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
	
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
	
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}
	
		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
	
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
	
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {
	
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
	
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );
	
			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnotwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
	
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},
	
		dispatch: function( event ) {
	
			// Make a writable jQuery.Event from the native event object
			event = jQuery.event.fix( event );
	
			var i, j, ret, matched, handleObj,
				handlerQueue = [],
				args = slice.call( arguments ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, matches, sel, handleObj,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Support (at least): Chrome, IE9
			// Find delegate handlers
			// Black-hole SVG <use> instance trees (#13180)
			//
			// Support: Firefox<=42+
			// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
			if ( delegateCount && cur.nodeType &&
				( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
						matches = [];
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matches[ sel ] === undefined ) {
								matches[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matches[ sel ] ) {
								matches.push( handleObj );
							}
						}
						if ( matches.length ) {
							handlerQueue.push( { elem: cur, handlers: matches } );
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
			}
	
			return handlerQueue;
		},
	
		// Includes some event props shared by KeyEvent and MouseEvent
		props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
			"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),
	
		fixHooks: {},
	
		keyHooks: {
			props: "char charCode key keyCode".split( " " ),
			filter: function( event, original ) {
	
				// Add which for key events
				if ( event.which == null ) {
					event.which = original.charCode != null ? original.charCode : original.keyCode;
				}
	
				return event;
			}
		},
	
		mouseHooks: {
			props: ( "button buttons clientX clientY offsetX offsetY pageX pageY " +
				"screenX screenY toElement" ).split( " " ),
			filter: function( event, original ) {
				var eventDoc, doc, body,
					button = original.button;
	
				// Calculate pageX/Y if missing and clientX/Y available
				if ( event.pageX == null && original.clientX != null ) {
					eventDoc = event.target.ownerDocument || document;
					doc = eventDoc.documentElement;
					body = eventDoc.body;
	
					event.pageX = original.clientX +
						( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
						( doc && doc.clientLeft || body && body.clientLeft || 0 );
					event.pageY = original.clientY +
						( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
						( doc && doc.clientTop  || body && body.clientTop  || 0 );
				}
	
				// Add which for click: 1 === left; 2 === middle; 3 === right
				// Note: button is not normalized, so don't use it
				if ( !event.which && button !== undefined ) {
					event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
				}
	
				return event;
			}
		},
	
		fix: function( event ) {
			if ( event[ jQuery.expando ] ) {
				return event;
			}
	
			// Create a writable copy of the event object and normalize some properties
			var i, prop, copy,
				type = event.type,
				originalEvent = event,
				fixHook = this.fixHooks[ type ];
	
			if ( !fixHook ) {
				this.fixHooks[ type ] = fixHook =
					rmouseEvent.test( type ) ? this.mouseHooks :
					rkeyEvent.test( type ) ? this.keyHooks :
					{};
			}
			copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;
	
			event = new jQuery.Event( originalEvent );
	
			i = copy.length;
			while ( i-- ) {
				prop = copy[ i ];
				event[ prop ] = originalEvent[ prop ];
			}
	
			// Support: Cordova 2.5 (WebKit) (#13255)
			// All events should have a target; Cordova deviceready doesn't
			if ( !event.target ) {
				event.target = document;
			}
	
			// Support: Safari 6.0+, Chrome<28
			// Target should not be a text node (#504, #13143)
			if ( event.target.nodeType === 3 ) {
				event.target = event.target.parentNode;
			}
	
			return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
		},
	
		special: {
			load: {
	
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
	
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
	
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
	
		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};
	
	jQuery.Event = function( src, props ) {
	
		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
	
					// Support: Android<4.0
					src.returnValue === false ?
				returnTrue :
				returnFalse;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
	
			this.isImmediatePropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}
	
			this.stopPropagation();
		}
	};
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://code.google.com/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );
	
	jQuery.fn.extend( {
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
	
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
	
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
	
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );
	
	
	var
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
	
		// Support: IE 10-11, Edge 10240+
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,
	
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	
	// Manipulating tables requires a tbody
	function manipulationTarget( elem, content ) {
		return jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?
	
			elem.getElementsByTagName( "tbody" )[ 0 ] ||
				elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
			elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
	
		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}
	
		return elem;
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			dataUser.set( dest, udataCur );
		}
	}
	
	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	function domManip( collection, args, callback, ignored ) {
	
		// Flatten any nested arrays
		args = concat.apply( [], args );
	
		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );
	
		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}
	
		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;
	
			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}
	
			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;
	
				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;
	
					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );
	
						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
	
							// Support: Android<4.1, PhantomJS<2
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}
	
					callback.call( collection[ i ], node, i );
				}
	
				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;
	
					// Reenable scripts
					jQuery.map( scripts, restoreScript );
	
					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {
	
							if ( node.src ) {
	
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}
	
		return collection;
	}
	
	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;
	
		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}
	
			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}
	
		return elem;
	}
	
	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},
	
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
	
						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {
	
						// Support: Chrome <= 35-45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );
	
	jQuery.fn.extend( {
	
		// Keep domManip exposed until 3.0 (gh-2225)
		domManip: domManip,
	
		detach: function( selector ) {
			return remove( this, selector, true );
		},
	
		remove: function( selector ) {
			return remove( this, selector );
		},
	
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},
	
		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},
	
		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},
	
		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},
	
		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = jQuery.htmlPrefilter( value );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var ignored = [];
	
			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;
	
				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}
	
			// Force callback invocation
			}, ignored );
		}
	} );
	
	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: QtWebKit
				// .get() because push.apply(_, arraylike) throws
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	} );
	
	
	var iframe,
		elemdisplay = {
	
			// Support: Firefox
			// We have to pre-define these values for FF (#10227)
			HTML: "block",
			BODY: "block"
		};
	
	/**
	 * Retrieve the actual display of a element
	 * @param {String} name nodeName of the element
	 * @param {Object} doc Document object
	 */
	
	// Called only from within defaultDisplay
	function actualDisplay( name, doc ) {
		var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
	
			display = jQuery.css( elem[ 0 ], "display" );
	
		// We don't have any data stored on the element,
		// so use "detach" method as fast way to get rid of the element
		elem.detach();
	
		return display;
	}
	
	/**
	 * Try to determine the default display value of an element
	 * @param {String} nodeName
	 */
	function defaultDisplay( nodeName ) {
		var doc = document,
			display = elemdisplay[ nodeName ];
	
		if ( !display ) {
			display = actualDisplay( nodeName, doc );
	
			// If the simple way fails, read from inside an iframe
			if ( display === "none" || !display ) {
	
				// Use the already-created iframe if possible
				iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
					.appendTo( doc.documentElement );
	
				// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
				doc = iframe[ 0 ].contentDocument;
	
				// Support: IE
				doc.write();
				doc.close();
	
				display = actualDisplay( nodeName, doc );
				iframe.detach();
			}
	
			// Store the correct default display
			elemdisplay[ nodeName ] = display;
		}
	
		return display;
	}
	var rmargin = ( /^margin/ );
	
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
	
	var getStyles = function( elem ) {
	
			// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;
	
			if ( !view || !view.opener ) {
				view = window;
			}
	
			return view.getComputedStyle( elem );
		};
	
	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};
	
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}
	
		ret = callback.apply( elem, args || [] );
	
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	
		return ret;
	};
	
	
	var documentElement = document.documentElement;
	
	
	
	( function() {
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );
	
		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}
	
		// Support: IE9-11+
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );
	
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
			div.style.cssText =
	
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );
	
			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";
	
			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";
	
			documentElement.removeChild( container );
		}
	
		jQuery.extend( support, {
			pixelPosition: function() {
	
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {
	
				// Support: Android 4.0-4.3
				// We're checking for boxSizingReliableVal here instead of pixelMarginRightVal
				// since that compresses better and they're computed together anyway.
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {
	
				// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
				if ( boxSizingReliableVal == null ) {
					computeStyleTests();
				}
				return reliableMarginLeftVal;
			},
			reliableMarginRight: function() {
	
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );
	
				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
	
					// Support: Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;box-sizing:content-box;" +
					"display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				documentElement.appendChild( container );
	
				ret = !parseFloat( window.getComputedStyle( marginDiv ).marginRight );
	
				documentElement.removeChild( container );
				div.removeChild( marginDiv );
	
				return ret;
			}
		} );
	} )();
	
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;
	
		computed = computed || getStyles( elem );
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;
	
		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}
	
		// Support: IE9
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
	
			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
	
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
	
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
	
		return ret !== undefined ?
	
			// Support: IE9-11+
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}
	
	
	function addGetHookIf( conditionFn, hookFn ) {
	
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
	
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}
	
				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}
	
	
	var
	
		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
	
		cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;
	
	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {
	
		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}
	
		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}
	
	function setPositiveNumber( elem, value, subtract ) {
	
		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?
	
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}
	
	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i = extra === ( isBorderBox ? "border" : "content" ) ?
	
			// If we already have the right measurement, avoid augmentation
			4 :
	
			// Otherwise initialize for horizontal or vertical properties
			name === "width" ? 1 : 0,
	
			val = 0;
	
		for ( ; i < 4; i += 2 ) {
	
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}
	
			if ( isBorderBox ) {
	
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}
	
				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
	
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}
	
		return val;
	}
	
	function getWidthOrHeight( elem, name, extra ) {
	
		// Start with offset property, which is equivalent to the border-box value
		var valueIsBorderBox = true,
			val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	
		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
	
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}
	
			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}
	
			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );
	
			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}
	
		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}
	
	function showHide( elements, show ) {
		var display, elem, hidden,
			values = [],
			index = 0,
			length = elements.length;
	
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
	
			values[ index ] = dataPriv.get( elem, "olddisplay" );
			display = elem.style.display;
			if ( show ) {
	
				// Reset the inline display of this element to learn if it is
				// being hidden by cascaded rules or not
				if ( !values[ index ] && display === "none" ) {
					elem.style.display = "";
				}
	
				// Set elements which have been overridden with display: none
				// in a stylesheet to whatever the default browser style is
				// for such an element
				if ( elem.style.display === "" && isHidden( elem ) ) {
					values[ index ] = dataPriv.access(
						elem,
						"olddisplay",
						defaultDisplay( elem.nodeName )
					);
				}
			} else {
				hidden = isHidden( elem );
	
				if ( display !== "none" || !hidden ) {
					dataPriv.set(
						elem,
						"olddisplay",
						hidden ? display : jQuery.css( elem, "display" )
					);
				}
			}
		}
	
		// Set the display of most of the elements in a second loop
		// to avoid the constant reflow
		for ( index = 0; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
			if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
				elem.style.display = show ? values[ index ] || "" : "none";
			}
		}
	
		return elements;
	}
	
	jQuery.extend( {
	
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
	
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
	
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
	
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;
	
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );
	
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}
	
				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}
	
				// Support: IE9-11+
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {
	
					style[ name ] = value;
				}
	
			} else {
	
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
	
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );
	
			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}
	
			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}
	
			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}
	
			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );
	
	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
	
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
						elem.offsetWidth === 0 ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},
	
			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);
	
				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {
	
					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}
	
				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );
	
	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);
	
	// Support: Android 2.3
	jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
		function( elem, computed ) {
			if ( computed ) {
				return swap( elem, { "display": "inline-block" },
					curCSS, [ elem, "marginRight" ] );
			}
		}
	);
	
	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},
	
					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];
	
				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	
		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );
	
	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;
	
				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;
	
					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}
	
					return map;
				}
	
				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		},
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}
	
			return this.each( function() {
				if ( isHidden( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	
	
	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];
	
			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];
	
			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;
	
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;
	
				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}
	
				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
	
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
	
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};
	
	// Support: IE9
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};
	
	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};
	
	jQuery.fx = Tween.prototype.init;
	
	// Back Compat <1.8 extension point
	jQuery.fx.step = {};
	
	
	
	
	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };
	
		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4 ; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}
	
		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}
	
		return attrs;
	}
	
	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {
	
				// We're done with this property
				return tween;
			}
		}
	}
	
	function defaultPrefilter( elem, props, opts ) {
		/* jshint validthis: true */
		var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHidden( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );
	
		// Handle queue: false promises
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
	
			anim.always( function() {
	
				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}
	
		// Height/width overflow pass
		if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
	
			// Make sure that nothing sneaks out
			// Record all 3 overflow attributes because IE9-10 do not
			// change the overflow attribute when overflowX and
			// overflowY are set to the same value
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
			// Set display property to inline-block for height/width
			// animations on inline elements that are having width/height animated
			display = jQuery.css( elem, "display" );
	
			// Test default display if display is currently "none"
			checkDisplay = display === "none" ?
				dataPriv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;
	
			if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
				style.display = "inline-block";
			}
		}
	
		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	
		// show/hide pass
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.exec( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
	
					// If there is dataShow left over from a stopped hide or show
					// and we are going to proceed with show, we should pretend to be hidden
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
	
			// Any non-fx value stops us from restoring the original display value
			} else {
				display = undefined;
			}
		}
	
		if ( !jQuery.isEmptyObject( orig ) ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", {} );
			}
	
			// Store state if its toggle - enables .stop().toggle() to "reverse"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}
			if ( hidden ) {
				jQuery( elem ).show();
			} else {
				anim.done( function() {
					jQuery( elem ).hide();
				} );
			}
			anim.done( function() {
				var prop;
	
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
			for ( prop in orig ) {
				tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
	
				if ( !( prop in dataShow ) ) {
					dataShow[ prop ] = tween.start;
					if ( hidden ) {
						tween.end = tween.start;
						tween.start = prop === "width" || prop === "height" ? 1 : 0;
					}
				}
			}
	
		// If this is a noop like .hide().hide(), restore an overwritten display value
		} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
			style.display = display;
		}
	}
	
	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;
	
		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}
	
			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}
	
			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];
	
				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}
	
	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {
	
				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
	
					// Support: Android 2.3
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
	
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( percent );
				}
	
				deferred.notifyWith( elem, [ animation, percent, remaining ] );
	
				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
	
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length ; index++ ) {
						animation.tweens[ index ].run( 1 );
					}
	
					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;
	
		propFilter( props, animation.opts.specialEasing );
	
		for ( ; index < length ; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}
	
		jQuery.map( props, createTween, animation );
	
		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}
	
		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);
	
		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},
	
		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnotwhite );
			}
	
			var prop,
				index = 0,
				length = props.length;
	
			for ( ; index < length ; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},
	
		prefilters: [ defaultPrefilter ],
	
		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );
	
	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};
	
		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ?
			opt.duration : opt.duration in jQuery.fx.speeds ?
				jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;
	
		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}
	
		// Queueing
		opt.old = opt.complete;
	
		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
	
			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};
	
		return opt;
	};
	
	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {
	
			// Show any hidden elements after setting opacity to 0
			return this.filter( isHidden ).css( "opacity", 0 ).show()
	
				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
	
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;
	
			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};
	
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );
	
				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {
	
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}
	
				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
	
				// Enable finishing flag on private data
				data.finish = true;
	
				// Empty the queue first
				jQuery.queue( this, type, [] );
	
				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}
	
				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}
	
				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}
	
				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );
	
	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );
	
	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );
	
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
	
		fxNow = jQuery.now();
	
		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
	
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}
	
		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};
	
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};
	
	jQuery.fx.stop = function() {
		window.clearInterval( timerId );
	
		timerId = null;
	};
	
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
	
		// Default speed
		_default: 400
	};
	
	
	// Based off of the plugin by Clint Helfers, with permission.
	// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";
	
		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};
	
	
	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: iOS<=5.1, Android<=4.2+
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
	
		// Support: IE<=11+
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
	
		// Support: Android<=2.3
		// Options inside disabled selects are incorrectly marked as disabled
		select.disabled = true;
		support.optDisabled = !opt.disabled;
	
		// Support: IE<=11+
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();
	
	
	var boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );
	
	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}
	
			// All attributes are lowercase
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				name = name.toLowerCase();
				hooks = jQuery.attrHooks[ name ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}
	
			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}
	
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				elem.setAttribute( name, value + "" );
				return value;
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			ret = jQuery.find.attr( elem, name );
	
			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},
	
		removeAttr: function( elem, value ) {
			var name, propName,
				i = 0,
				attrNames = value && value.match( rnotwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					propName = jQuery.propFix[ name ] || name;
	
					// Boolean attributes get special treatment (#10870)
					if ( jQuery.expr.match.bool.test( name ) ) {
	
						// Set corresponding property to false
						elem[ propName ] = false;
					}
	
					elem.removeAttribute( name );
				}
			}
		}
	} );
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
	
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
	
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} );
	
	
	
	
	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;
	
	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );
	
	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
	
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				return ( elem[ name ] = value );
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			return elem[ name ];
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
	
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );
	
					return tabindex ?
						parseInt( tabindex, 10 ) :
						rfocusable.test( elem.nodeName ) ||
							rclickable.test( elem.nodeName ) && elem.href ?
								0 :
								-1;
				}
			}
		},
	
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );
	
	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;
	
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}
	
	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );
	
	
	
	
	var rclass = /[\t\r\n\f]/g;
	
	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}
	
	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnotwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
	
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 &&
						( " " + curValue + " " ).replace( rclass, " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
	
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = jQuery.trim( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value;
	
			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}
	
			return this.each( function() {
				var className, i, self, classNames;
	
				if ( type === "string" ) {
	
					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnotwhite ) || [];
	
					while ( ( className = classNames[ i++ ] ) ) {
	
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {
	
						// Store className if set
						dataPriv.set( this, "__className__", className );
					}
	
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},
	
		hasClass: function( selector ) {
			var className, elem,
				i = 0;
	
			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + getClass( elem ) + " " ).replace( rclass, " " )
						.indexOf( className ) > -1
				) {
					return true;
				}
			}
	
			return false;
		}
	} );
	
	
	
	
	var rreturn = /\r/g,
		rspaces = /[\x20\t\r\n\f]+/g;
	
	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}
	
					ret = elem.value;
	
					return typeof ret === "string" ?
	
						// Handle most common string cases
						ret.replace( rreturn, "" ) :
	
						// Handle cases where value is null/undef or number
						ret == null ? "" : ret;
				}
	
				return;
			}
	
			isFunction = jQuery.isFunction( value );
	
			return this.each( function( i ) {
				var val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
	
				} else if ( typeof val === "number" ) {
					val += "";
	
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );
	
	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {
	
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
	
						// Support: IE10-11+
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
				}
			},
			select: {
				get: function( elem ) {
					var value, option,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one" || index < 0,
						values = one ? null : [],
						max = one ? index + 1 : options.length,
						i = index < 0 ?
							max :
							one ? index : 0;
	
					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
	
								// Don't return options that are disabled or in a disabled optgroup
								( support.optDisabled ?
									!option.disabled : option.getAttribute( "disabled" ) === null ) &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;
	
					while ( i-- ) {
						option = options[ i ];
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
					}
	
					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );
	
	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );
	
	
	
	
	// Return jQuery for attributes-only inclusion
	
	
	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
	
	jQuery.extend( jQuery.event, {
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];
	
			cur = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf( "." ) > -1 ) {
	
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
	
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);
	
			jQuery.event.trigger( e, null, elem );
		}
	
	} );
	
	jQuery.fn.extend( {
	
		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );
	
	
	jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
		function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );
	
	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );
	
	
	
	
	support.focusin = "onfocusin" in window;
	
	
	// Support: Firefox
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome, Safari
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );
	
					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;
	
	var nonce = jQuery.now();
	
	var rquery = ( /\?/ );
	
	
	
	// Support: Android 2.3
	// Workaround failure to string-cast null input
	jQuery.parseJSON = function( data ) {
		return JSON.parse( data + "" );
	};
	
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE9
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	
	var
		rhash = /#.*$/,
		rts = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),
	
		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];
	
			if ( jQuery.isFunction( func ) ) {
	
				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {
	
					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );
	
					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {
	
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
	
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
	
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
	
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
			// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
	
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend( {
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": jQuery.parseJSON,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
	
				// URL without anti-cache param
				cacheURL,
	
				// Response headers
				responseHeadersString,
				responseHeaders,
	
				// timeout handle
				timeoutTimer,
	
				// Url cleanup var
				urlAnchor,
	
				// To know if global events are to be dispatched
				fireGlobals,
	
				// Loop variable
				i,
	
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
	
				// Callbacks context
				callbackContext = s.context || s,
	
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,
	
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),
	
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
	
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
	
				// The jqXHR state
				state = 0,
	
				// Default abort message
				strAbort = "canceled",
	
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( state === 2 ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return state === 2 ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						var lname = name.toLowerCase();
						if ( !state ) {
							name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( !state ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( state < 2 ) {
								for ( code in map ) {
	
									// Lazy-add the new callback in a way that preserves old ones
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							} else {
	
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR ).complete = completeDeferred.add;
			jqXHR.success = jqXHR.done;
			jqXHR.error = jqXHR.fail;
	
			// Remove hash character (#7531: and string promotion)
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" ).replace( rhash, "" )
				.replace( rprotocol, location.protocol + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];
	
			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );
	
				// Support: IE8-11+
				// IE throws exception if url is malformed, e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;
	
					// Support: IE8-11+
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {
	
					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( state === 2 ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			cacheURL = s.url;
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// If data is available, append data to url
				if ( s.data ) {
					cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
	
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add anti-cache in url if needed
				if ( s.cache === false ) {
					s.url = rts.test( cacheURL ) ?
	
						// If there is already a '_' parameter, set its value
						cacheURL.replace( rts, "$1_=" + nonce++ ) :
	
						// Otherwise add one to the end
						cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
				}
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
	
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// Aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			for ( i in { success: 1, error: 1, complete: 1 } ) {
				jqXHR[ i ]( s[ i ] );
			}
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
	
				// If request was aborted inside ajaxSend, stop there
				if ( state === 2 ) {
					return jqXHR;
				}
	
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}
	
				try {
					state = 1;
					transport.send( requestHeaders, done );
				} catch ( e ) {
	
					// Propagate exception as error if not done
					if ( state < 2 ) {
						done( -1, e );
	
					// Simply rethrow otherwise
					} else {
						throw e;
					}
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Called once
				if ( state === 2 ) {
					return;
				}
	
				// State is "done" now
				state = 2;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
	
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
	
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
	
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );
	
	
	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,
	
			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		} );
	};
	
	
	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;
	
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapAll( html.call( this, i ) );
				} );
			}
	
			if ( this[ 0 ] ) {
	
				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}
	
				wrap.map( function() {
					var elem = this;
	
					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}
	
					return elem;
				} ).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}
	
			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			} );
		},
	
		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );
	
			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},
	
		unwrap: function() {
			return this.parent().each( function() {
				if ( !jQuery.nodeName( this, "body" ) ) {
					jQuery( this ).replaceWith( this.childNodes );
				}
			} ).end();
		}
	} );
	
	
	jQuery.expr.filters.hidden = function( elem ) {
		return !jQuery.expr.filters.visible( elem );
	};
	jQuery.expr.filters.visible = function( elem ) {
	
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		// Use OR instead of AND as the element is not visible if either is true
		// See tickets #10406 and #13132
		return elem.offsetWidth > 0 || elem.offsetHeight > 0 || elem.getClientRects().length > 0;
	};
	
	
	
	
	var r20 = /%20/g,
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	function buildParams( prefix, obj, traditional, add ) {
		var name;
	
		if ( jQuery.isArray( obj ) ) {
	
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
	
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
	
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );
	
		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
	
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
	
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, value ) {
	
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};
	
		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
		}
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
	
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );
	
		} else {
	
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}
	
		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	};
	
	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {
	
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;
	
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();
	
				return val == null ?
					null :
					jQuery.isArray( val ) ?
						jQuery.map( val, function( val ) {
							return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
						} ) :
						{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );
	
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};
	
	var xhrSuccessStatus = {
	
			// File protocol always yields status code 0, assume 200
			0: 200,
	
			// Support: IE9
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();
	
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
	
									// Support: IE9
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(
	
											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
	
										// Support: IE9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );
	
					// Support: IE9
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {
	
							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {
	
								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}
	
					// Create the abort callback
					callback = callback( "abort" );
	
					try {
	
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
	
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
	
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
	
					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);
	
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;
	
			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}
	
			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// Force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};
	
			// Clean-up function (fires after converters)
			jqXHR.always( function() {
	
				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );
	
				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}
	
				// Save back as free
				if ( s[ callbackName ] ) {
	
					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
	
					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}
	
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}
	
				responseContainer = overwritten = undefined;
			} );
	
			// Delegate to script
			return "script";
		}
	} );
	
	
	
	
	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;
	
		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}
	
		parsed = buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	
	// Keep a copy of the old load method
	var _load = jQuery.fn.load;
	
	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );
		}
	
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );
	
		if ( off > -1 ) {
			selector = jQuery.trim( url.slice( off ) );
			url = url.slice( 0, off );
		}
	
		// If it's a function
		if ( jQuery.isFunction( params ) ) {
	
			// We assume that it's the callback
			callback = params;
			params = undefined;
	
		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}
	
		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,
	
				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {
	
				// Save response for use in complete callback
				response = arguments;
	
				self.html( selector ?
	
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
					// Otherwise use the full result
					responseText );
	
			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}
	
		return this;
	};
	
	
	
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );
	
	
	
	
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};
	
	
	
	
	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}
	
	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};
	
			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;
	
			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
	
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( jQuery.isFunction( options ) ) {
	
				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
	
			} else {
				curElem.css( props );
			}
		}
	};
	
	jQuery.fn.extend( {
		offset: function( options ) {
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}
	
			var docElem, win,
				elem = this[ 0 ],
				box = { top: 0, left: 0 },
				doc = elem && elem.ownerDocument;
	
			if ( !doc ) {
				return;
			}
	
			docElem = doc.documentElement;
	
			// Make sure it's not a disconnected DOM node
			if ( !jQuery.contains( docElem, elem ) ) {
				return box;
			}
	
			box = elem.getBoundingClientRect();
			win = getWindow( doc );
			return {
				top: box.top + win.pageYOffset - docElem.clientTop,
				left: box.left + win.pageXOffset - docElem.clientLeft
			};
		},
	
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}
	
			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };
	
			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
	
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
	
			} else {
	
				// Get *real* offsetParent
				offsetParent = this.offsetParent();
	
				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}
	
				// Add offsetParent borders
				parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
			}
	
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},
	
		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;
	
				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}
	
				return offsetParent || documentElement;
			} );
		}
	} );
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );
	
				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );
	
	// Support: Safari<7-8+, Chrome<37-44+
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
	
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );
	
	
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {
	
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
				return access( this, function( elem, type, value ) {
					var doc;
	
					if ( jQuery.isWindow( elem ) ) {
	
						// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
						// isn't a whole lot we can do. See pull request at this URL for discussion:
						// https://github.com/jquery/jquery/pull/764
						return elem.document.documentElement[ "client" + name ];
					}
	
					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;
	
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}
	
					return value === undefined ?
	
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :
	
						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable, null );
			};
		} );
	} );
	
	
	jQuery.fn.extend( {
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
	
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		},
		size: function() {
			return this.length;
		}
	} );
	
	jQuery.fn.andSelf = jQuery.fn.addBack;
	
	
	
	
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	
	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	
	
	var
	
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$;
	
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
	
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
	
		return jQuery;
	};
	
	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}
	
	return jQuery;
	}));


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*
	* Copyright (c) 2006-2007 Erin Catto http://www.gphysics.com
	*
	* This software is provided 'as-is', without any express or implied
	* warranty.  In no event will the authors be held liable for any damages
	* arising from the use of this software.
	* Permission is granted to anyone to use this software for any purpose,
	* including commercial applications, and to alter it and redistribute it
	* freely, subject to the following restrictions:
	* 1. The origin of this software must not be misrepresented; you must not
	* claim that you wrote the original software. If you use this software
	* in a product, an acknowledgment in the product documentation would be
	* appreciated but is not required.
	* 2. Altered source versions must be plainly marked as such, and must not be
	* misrepresented as being the original software.
	* 3. This notice may not be removed or altered from any source distribution.
	*/
	var Box2D = {};
	
	(function (a2j, undefined) {
	
	   if(!Object.defineProperty
	      && Object.prototype.__defineGetter__ instanceof Function
	      && Object.prototype.__defineSetter__ instanceof Function)
	   {
	      Object.defineProperty = function(obj, p, cfg) {
	         if(cfg.get instanceof Function)
	            obj.__defineGetter__(p, cfg.get);
	         if(cfg.set instanceof Function)
	            obj.__defineSetter__(p, cfg.set);
	      }
	   }
	   
	   function emptyFn() {};
	   a2j.inherit = function(cls, base) {
	      var tmpCtr = cls;
	      emptyFn.prototype = base.prototype;
	      cls.prototype = new emptyFn;
	      cls.prototype.constructor = tmpCtr;
	   };
	   
	   a2j.generateCallback = function generateCallback(context, cb) {
	      return function () {
	         cb.apply(context, arguments);
	      };
	   };
	   
	   a2j.NVector = function NVector(length) {
	      if (length === undefined) length = 0;
	      var tmp = new Array(length || 0);
	      for (var i = 0; i < length; ++i)
	      tmp[i] = 0;
	      return tmp;
	   };
	   
	   a2j.is = function is(o1, o2) {
	      if (o1 === null) return false;
	      if ((o2 instanceof Function) && (o1 instanceof o2)) return true;
	      if ((o1.constructor.__implements != undefined) && (o1.constructor.__implements[o2])) return true;
	      return false;
	   };
	   
	   a2j.parseUInt = function(v) {
	      return Math.abs(parseInt(v));
	   }
	   
	})(Box2D);
	
	//#TODO remove assignments from global namespace
	var Vector = Array;
	var Vector_a2j_Number = Box2D.NVector;
	//package structure
	if (typeof(Box2D) === "undefined") Box2D = {};
	if (typeof(Box2D.Collision) === "undefined") Box2D.Collision = {};
	if (typeof(Box2D.Collision.Shapes) === "undefined") Box2D.Collision.Shapes = {};
	if (typeof(Box2D.Common) === "undefined") Box2D.Common = {};
	if (typeof(Box2D.Common.Math) === "undefined") Box2D.Common.Math = {};
	if (typeof(Box2D.Dynamics) === "undefined") Box2D.Dynamics = {};
	if (typeof(Box2D.Dynamics.Contacts) === "undefined") Box2D.Dynamics.Contacts = {};
	if (typeof(Box2D.Dynamics.Controllers) === "undefined") Box2D.Dynamics.Controllers = {};
	if (typeof(Box2D.Dynamics.Joints) === "undefined") Box2D.Dynamics.Joints = {};
	//pre-definitions
	(function () {
	   Box2D.Collision.IBroadPhase = 'Box2D.Collision.IBroadPhase';
	
	   function b2AABB() {
	      b2AABB.b2AABB.apply(this, arguments);
	   };
	   Box2D.Collision.b2AABB = b2AABB;
	
	   function b2Bound() {
	      b2Bound.b2Bound.apply(this, arguments);
	   };
	   Box2D.Collision.b2Bound = b2Bound;
	
	   function b2BoundValues() {
	      b2BoundValues.b2BoundValues.apply(this, arguments);
	      if (this.constructor === b2BoundValues) this.b2BoundValues.apply(this, arguments);
	   };
	   Box2D.Collision.b2BoundValues = b2BoundValues;
	
	   function b2Collision() {
	      b2Collision.b2Collision.apply(this, arguments);
	   };
	   Box2D.Collision.b2Collision = b2Collision;
	
	   function b2ContactID() {
	      b2ContactID.b2ContactID.apply(this, arguments);
	      if (this.constructor === b2ContactID) this.b2ContactID.apply(this, arguments);
	   };
	   Box2D.Collision.b2ContactID = b2ContactID;
	
	   function b2ContactPoint() {
	      b2ContactPoint.b2ContactPoint.apply(this, arguments);
	   };
	   Box2D.Collision.b2ContactPoint = b2ContactPoint;
	
	   function b2Distance() {
	      b2Distance.b2Distance.apply(this, arguments);
	   };
	   Box2D.Collision.b2Distance = b2Distance;
	
	   function b2DistanceInput() {
	      b2DistanceInput.b2DistanceInput.apply(this, arguments);
	   };
	   Box2D.Collision.b2DistanceInput = b2DistanceInput;
	
	   function b2DistanceOutput() {
	      b2DistanceOutput.b2DistanceOutput.apply(this, arguments);
	   };
	   Box2D.Collision.b2DistanceOutput = b2DistanceOutput;
	
	   function b2DistanceProxy() {
	      b2DistanceProxy.b2DistanceProxy.apply(this, arguments);
	   };
	   Box2D.Collision.b2DistanceProxy = b2DistanceProxy;
	
	   function b2DynamicTree() {
	      b2DynamicTree.b2DynamicTree.apply(this, arguments);
	      if (this.constructor === b2DynamicTree) this.b2DynamicTree.apply(this, arguments);
	   };
	   Box2D.Collision.b2DynamicTree = b2DynamicTree;
	
	   function b2DynamicTreeBroadPhase() {
	      b2DynamicTreeBroadPhase.b2DynamicTreeBroadPhase.apply(this, arguments);
	   };
	   Box2D.Collision.b2DynamicTreeBroadPhase = b2DynamicTreeBroadPhase;
	
	   function b2DynamicTreeNode() {
	      b2DynamicTreeNode.b2DynamicTreeNode.apply(this, arguments);
	   };
	   Box2D.Collision.b2DynamicTreeNode = b2DynamicTreeNode;
	
	   function b2DynamicTreePair() {
	      b2DynamicTreePair.b2DynamicTreePair.apply(this, arguments);
	   };
	   Box2D.Collision.b2DynamicTreePair = b2DynamicTreePair;
	
	   function b2Manifold() {
	      b2Manifold.b2Manifold.apply(this, arguments);
	      if (this.constructor === b2Manifold) this.b2Manifold.apply(this, arguments);
	   };
	   Box2D.Collision.b2Manifold = b2Manifold;
	
	   function b2ManifoldPoint() {
	      b2ManifoldPoint.b2ManifoldPoint.apply(this, arguments);
	      if (this.constructor === b2ManifoldPoint) this.b2ManifoldPoint.apply(this, arguments);
	   };
	   Box2D.Collision.b2ManifoldPoint = b2ManifoldPoint;
	
	   function b2Point() {
	      b2Point.b2Point.apply(this, arguments);
	   };
	   Box2D.Collision.b2Point = b2Point;
	
	   function b2RayCastInput() {
	      b2RayCastInput.b2RayCastInput.apply(this, arguments);
	      if (this.constructor === b2RayCastInput) this.b2RayCastInput.apply(this, arguments);
	   };
	   Box2D.Collision.b2RayCastInput = b2RayCastInput;
	
	   function b2RayCastOutput() {
	      b2RayCastOutput.b2RayCastOutput.apply(this, arguments);
	   };
	   Box2D.Collision.b2RayCastOutput = b2RayCastOutput;
	
	   function b2Segment() {
	      b2Segment.b2Segment.apply(this, arguments);
	   };
	   Box2D.Collision.b2Segment = b2Segment;
	
	   function b2SeparationFunction() {
	      b2SeparationFunction.b2SeparationFunction.apply(this, arguments);
	   };
	   Box2D.Collision.b2SeparationFunction = b2SeparationFunction;
	
	   function b2Simplex() {
	      b2Simplex.b2Simplex.apply(this, arguments);
	      if (this.constructor === b2Simplex) this.b2Simplex.apply(this, arguments);
	   };
	   Box2D.Collision.b2Simplex = b2Simplex;
	
	   function b2SimplexCache() {
	      b2SimplexCache.b2SimplexCache.apply(this, arguments);
	   };
	   Box2D.Collision.b2SimplexCache = b2SimplexCache;
	
	   function b2SimplexVertex() {
	      b2SimplexVertex.b2SimplexVertex.apply(this, arguments);
	   };
	   Box2D.Collision.b2SimplexVertex = b2SimplexVertex;
	
	   function b2TimeOfImpact() {
	      b2TimeOfImpact.b2TimeOfImpact.apply(this, arguments);
	   };
	   Box2D.Collision.b2TimeOfImpact = b2TimeOfImpact;
	
	   function b2TOIInput() {
	      b2TOIInput.b2TOIInput.apply(this, arguments);
	   };
	   Box2D.Collision.b2TOIInput = b2TOIInput;
	
	   function b2WorldManifold() {
	      b2WorldManifold.b2WorldManifold.apply(this, arguments);
	      if (this.constructor === b2WorldManifold) this.b2WorldManifold.apply(this, arguments);
	   };
	   Box2D.Collision.b2WorldManifold = b2WorldManifold;
	
	   function ClipVertex() {
	      ClipVertex.ClipVertex.apply(this, arguments);
	   };
	   Box2D.Collision.ClipVertex = ClipVertex;
	
	   function Features() {
	      Features.Features.apply(this, arguments);
	   };
	   Box2D.Collision.Features = Features;
	
	   function b2CircleShape() {
	      b2CircleShape.b2CircleShape.apply(this, arguments);
	      if (this.constructor === b2CircleShape) this.b2CircleShape.apply(this, arguments);
	   };
	   Box2D.Collision.Shapes.b2CircleShape = b2CircleShape;
	
	   function b2EdgeChainDef() {
	      b2EdgeChainDef.b2EdgeChainDef.apply(this, arguments);
	      if (this.constructor === b2EdgeChainDef) this.b2EdgeChainDef.apply(this, arguments);
	   };
	   Box2D.Collision.Shapes.b2EdgeChainDef = b2EdgeChainDef;
	
	   function b2EdgeShape() {
	      b2EdgeShape.b2EdgeShape.apply(this, arguments);
	      if (this.constructor === b2EdgeShape) this.b2EdgeShape.apply(this, arguments);
	   };
	   Box2D.Collision.Shapes.b2EdgeShape = b2EdgeShape;
	
	   function b2MassData() {
	      b2MassData.b2MassData.apply(this, arguments);
	   };
	   Box2D.Collision.Shapes.b2MassData = b2MassData;
	
	   function b2PolygonShape() {
	      b2PolygonShape.b2PolygonShape.apply(this, arguments);
	      if (this.constructor === b2PolygonShape) this.b2PolygonShape.apply(this, arguments);
	   };
	   Box2D.Collision.Shapes.b2PolygonShape = b2PolygonShape;
	
	   function b2Shape() {
	      b2Shape.b2Shape.apply(this, arguments);
	      if (this.constructor === b2Shape) this.b2Shape.apply(this, arguments);
	   };
	   Box2D.Collision.Shapes.b2Shape = b2Shape;
	   Box2D.Common.b2internal = 'Box2D.Common.b2internal';
	
	   function b2Color() {
	      b2Color.b2Color.apply(this, arguments);
	      if (this.constructor === b2Color) this.b2Color.apply(this, arguments);
	   };
	   Box2D.Common.b2Color = b2Color;
	
	   function b2Settings() {
	      b2Settings.b2Settings.apply(this, arguments);
	   };
	   Box2D.Common.b2Settings = b2Settings;
	
	   function b2Mat22() {
	      b2Mat22.b2Mat22.apply(this, arguments);
	      if (this.constructor === b2Mat22) this.b2Mat22.apply(this, arguments);
	   };
	   Box2D.Common.Math.b2Mat22 = b2Mat22;
	
	   function b2Mat33() {
	      b2Mat33.b2Mat33.apply(this, arguments);
	      if (this.constructor === b2Mat33) this.b2Mat33.apply(this, arguments);
	   };
	   Box2D.Common.Math.b2Mat33 = b2Mat33;
	
	   function b2Math() {
	      b2Math.b2Math.apply(this, arguments);
	   };
	   Box2D.Common.Math.b2Math = b2Math;
	
	   function b2Sweep() {
	      b2Sweep.b2Sweep.apply(this, arguments);
	   };
	   Box2D.Common.Math.b2Sweep = b2Sweep;
	
	   function b2Transform() {
	      b2Transform.b2Transform.apply(this, arguments);
	      if (this.constructor === b2Transform) this.b2Transform.apply(this, arguments);
	   };
	   Box2D.Common.Math.b2Transform = b2Transform;
	
	   function b2Vec2() {
	      b2Vec2.b2Vec2.apply(this, arguments);
	      if (this.constructor === b2Vec2) this.b2Vec2.apply(this, arguments);
	   };
	   Box2D.Common.Math.b2Vec2 = b2Vec2;
	
	   function b2Vec3() {
	      b2Vec3.b2Vec3.apply(this, arguments);
	      if (this.constructor === b2Vec3) this.b2Vec3.apply(this, arguments);
	   };
	   Box2D.Common.Math.b2Vec3 = b2Vec3;
	
	   function b2Body() {
	      b2Body.b2Body.apply(this, arguments);
	      if (this.constructor === b2Body) this.b2Body.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2Body = b2Body;
	
	   function b2BodyDef() {
	      b2BodyDef.b2BodyDef.apply(this, arguments);
	      if (this.constructor === b2BodyDef) this.b2BodyDef.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2BodyDef = b2BodyDef;
	
	   function b2ContactFilter() {
	      b2ContactFilter.b2ContactFilter.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2ContactFilter = b2ContactFilter;
	
	   function b2ContactImpulse() {
	      b2ContactImpulse.b2ContactImpulse.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2ContactImpulse = b2ContactImpulse;
	
	   function b2ContactListener() {
	      b2ContactListener.b2ContactListener.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2ContactListener = b2ContactListener;
	
	   function b2ContactManager() {
	      b2ContactManager.b2ContactManager.apply(this, arguments);
	      if (this.constructor === b2ContactManager) this.b2ContactManager.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2ContactManager = b2ContactManager;
	
	   function b2DebugDraw() {
	      b2DebugDraw.b2DebugDraw.apply(this, arguments);
	      if (this.constructor === b2DebugDraw) this.b2DebugDraw.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2DebugDraw = b2DebugDraw;
	
	   function b2DestructionListener() {
	      b2DestructionListener.b2DestructionListener.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2DestructionListener = b2DestructionListener;
	
	   function b2FilterData() {
	      b2FilterData.b2FilterData.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2FilterData = b2FilterData;
	
	   function b2Fixture() {
	      b2Fixture.b2Fixture.apply(this, arguments);
	      if (this.constructor === b2Fixture) this.b2Fixture.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2Fixture = b2Fixture;
	
	   function b2FixtureDef() {
	      b2FixtureDef.b2FixtureDef.apply(this, arguments);
	      if (this.constructor === b2FixtureDef) this.b2FixtureDef.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2FixtureDef = b2FixtureDef;
	
	   function b2Island() {
	      b2Island.b2Island.apply(this, arguments);
	      if (this.constructor === b2Island) this.b2Island.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2Island = b2Island;
	
	   function b2TimeStep() {
	      b2TimeStep.b2TimeStep.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2TimeStep = b2TimeStep;
	
	   function b2World() {
	      b2World.b2World.apply(this, arguments);
	      if (this.constructor === b2World) this.b2World.apply(this, arguments);
	   };
	   Box2D.Dynamics.b2World = b2World;
	
	   function b2CircleContact() {
	      b2CircleContact.b2CircleContact.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2CircleContact = b2CircleContact;
	
	   function b2Contact() {
	      b2Contact.b2Contact.apply(this, arguments);
	      if (this.constructor === b2Contact) this.b2Contact.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2Contact = b2Contact;
	
	   function b2ContactConstraint() {
	      b2ContactConstraint.b2ContactConstraint.apply(this, arguments);
	      if (this.constructor === b2ContactConstraint) this.b2ContactConstraint.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2ContactConstraint = b2ContactConstraint;
	
	   function b2ContactConstraintPoint() {
	      b2ContactConstraintPoint.b2ContactConstraintPoint.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2ContactConstraintPoint = b2ContactConstraintPoint;
	
	   function b2ContactEdge() {
	      b2ContactEdge.b2ContactEdge.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2ContactEdge = b2ContactEdge;
	
	   function b2ContactFactory() {
	      b2ContactFactory.b2ContactFactory.apply(this, arguments);
	      if (this.constructor === b2ContactFactory) this.b2ContactFactory.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2ContactFactory = b2ContactFactory;
	
	   function b2ContactRegister() {
	      b2ContactRegister.b2ContactRegister.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2ContactRegister = b2ContactRegister;
	
	   function b2ContactResult() {
	      b2ContactResult.b2ContactResult.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2ContactResult = b2ContactResult;
	
	   function b2ContactSolver() {
	      b2ContactSolver.b2ContactSolver.apply(this, arguments);
	      if (this.constructor === b2ContactSolver) this.b2ContactSolver.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2ContactSolver = b2ContactSolver;
	
	   function b2EdgeAndCircleContact() {
	      b2EdgeAndCircleContact.b2EdgeAndCircleContact.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = b2EdgeAndCircleContact;
	
	   function b2NullContact() {
	      b2NullContact.b2NullContact.apply(this, arguments);
	      if (this.constructor === b2NullContact) this.b2NullContact.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2NullContact = b2NullContact;
	
	   function b2PolyAndCircleContact() {
	      b2PolyAndCircleContact.b2PolyAndCircleContact.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2PolyAndCircleContact = b2PolyAndCircleContact;
	
	   function b2PolyAndEdgeContact() {
	      b2PolyAndEdgeContact.b2PolyAndEdgeContact.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = b2PolyAndEdgeContact;
	
	   function b2PolygonContact() {
	      b2PolygonContact.b2PolygonContact.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2PolygonContact = b2PolygonContact;
	
	   function b2PositionSolverManifold() {
	      b2PositionSolverManifold.b2PositionSolverManifold.apply(this, arguments);
	      if (this.constructor === b2PositionSolverManifold) this.b2PositionSolverManifold.apply(this, arguments);
	   };
	   Box2D.Dynamics.Contacts.b2PositionSolverManifold = b2PositionSolverManifold;
	
	   function b2BuoyancyController() {
	      b2BuoyancyController.b2BuoyancyController.apply(this, arguments);
	   };
	   Box2D.Dynamics.Controllers.b2BuoyancyController = b2BuoyancyController;
	
	   function b2ConstantAccelController() {
	      b2ConstantAccelController.b2ConstantAccelController.apply(this, arguments);
	   };
	   Box2D.Dynamics.Controllers.b2ConstantAccelController = b2ConstantAccelController;
	
	   function b2ConstantForceController() {
	      b2ConstantForceController.b2ConstantForceController.apply(this, arguments);
	   };
	   Box2D.Dynamics.Controllers.b2ConstantForceController = b2ConstantForceController;
	
	   function b2Controller() {
	      b2Controller.b2Controller.apply(this, arguments);
	   };
	   Box2D.Dynamics.Controllers.b2Controller = b2Controller;
	
	   function b2ControllerEdge() {
	      b2ControllerEdge.b2ControllerEdge.apply(this, arguments);
	   };
	   Box2D.Dynamics.Controllers.b2ControllerEdge = b2ControllerEdge;
	
	   function b2GravityController() {
	      b2GravityController.b2GravityController.apply(this, arguments);
	   };
	   Box2D.Dynamics.Controllers.b2GravityController = b2GravityController;
	
	   function b2TensorDampingController() {
	      b2TensorDampingController.b2TensorDampingController.apply(this, arguments);
	   };
	   Box2D.Dynamics.Controllers.b2TensorDampingController = b2TensorDampingController;
	
	   function b2DistanceJoint() {
	      b2DistanceJoint.b2DistanceJoint.apply(this, arguments);
	      if (this.constructor === b2DistanceJoint) this.b2DistanceJoint.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2DistanceJoint = b2DistanceJoint;
	
	   function b2DistanceJointDef() {
	      b2DistanceJointDef.b2DistanceJointDef.apply(this, arguments);
	      if (this.constructor === b2DistanceJointDef) this.b2DistanceJointDef.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2DistanceJointDef = b2DistanceJointDef;
	
	   function b2FrictionJoint() {
	      b2FrictionJoint.b2FrictionJoint.apply(this, arguments);
	      if (this.constructor === b2FrictionJoint) this.b2FrictionJoint.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2FrictionJoint = b2FrictionJoint;
	
	   function b2FrictionJointDef() {
	      b2FrictionJointDef.b2FrictionJointDef.apply(this, arguments);
	      if (this.constructor === b2FrictionJointDef) this.b2FrictionJointDef.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2FrictionJointDef = b2FrictionJointDef;
	
	   function b2GearJoint() {
	      b2GearJoint.b2GearJoint.apply(this, arguments);
	      if (this.constructor === b2GearJoint) this.b2GearJoint.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2GearJoint = b2GearJoint;
	
	   function b2GearJointDef() {
	      b2GearJointDef.b2GearJointDef.apply(this, arguments);
	      if (this.constructor === b2GearJointDef) this.b2GearJointDef.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2GearJointDef = b2GearJointDef;
	
	   function b2Jacobian() {
	      b2Jacobian.b2Jacobian.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2Jacobian = b2Jacobian;
	
	   function b2Joint() {
	      b2Joint.b2Joint.apply(this, arguments);
	      if (this.constructor === b2Joint) this.b2Joint.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2Joint = b2Joint;
	
	   function b2JointDef() {
	      b2JointDef.b2JointDef.apply(this, arguments);
	      if (this.constructor === b2JointDef) this.b2JointDef.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2JointDef = b2JointDef;
	
	   function b2JointEdge() {
	      b2JointEdge.b2JointEdge.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2JointEdge = b2JointEdge;
	
	   function b2LineJoint() {
	      b2LineJoint.b2LineJoint.apply(this, arguments);
	      if (this.constructor === b2LineJoint) this.b2LineJoint.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2LineJoint = b2LineJoint;
	
	   function b2LineJointDef() {
	      b2LineJointDef.b2LineJointDef.apply(this, arguments);
	      if (this.constructor === b2LineJointDef) this.b2LineJointDef.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2LineJointDef = b2LineJointDef;
	
	   function b2MouseJoint() {
	      b2MouseJoint.b2MouseJoint.apply(this, arguments);
	      if (this.constructor === b2MouseJoint) this.b2MouseJoint.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2MouseJoint = b2MouseJoint;
	
	   function b2MouseJointDef() {
	      b2MouseJointDef.b2MouseJointDef.apply(this, arguments);
	      if (this.constructor === b2MouseJointDef) this.b2MouseJointDef.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2MouseJointDef = b2MouseJointDef;
	
	   function b2PrismaticJoint() {
	      b2PrismaticJoint.b2PrismaticJoint.apply(this, arguments);
	      if (this.constructor === b2PrismaticJoint) this.b2PrismaticJoint.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2PrismaticJoint = b2PrismaticJoint;
	
	   function b2PrismaticJointDef() {
	      b2PrismaticJointDef.b2PrismaticJointDef.apply(this, arguments);
	      if (this.constructor === b2PrismaticJointDef) this.b2PrismaticJointDef.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2PrismaticJointDef = b2PrismaticJointDef;
	
	   function b2PulleyJoint() {
	      b2PulleyJoint.b2PulleyJoint.apply(this, arguments);
	      if (this.constructor === b2PulleyJoint) this.b2PulleyJoint.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2PulleyJoint = b2PulleyJoint;
	
	   function b2PulleyJointDef() {
	      b2PulleyJointDef.b2PulleyJointDef.apply(this, arguments);
	      if (this.constructor === b2PulleyJointDef) this.b2PulleyJointDef.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2PulleyJointDef = b2PulleyJointDef;
	
	   function b2RevoluteJoint() {
	      b2RevoluteJoint.b2RevoluteJoint.apply(this, arguments);
	      if (this.constructor === b2RevoluteJoint) this.b2RevoluteJoint.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2RevoluteJoint = b2RevoluteJoint;
	
	   function b2RevoluteJointDef() {
	      b2RevoluteJointDef.b2RevoluteJointDef.apply(this, arguments);
	      if (this.constructor === b2RevoluteJointDef) this.b2RevoluteJointDef.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2RevoluteJointDef = b2RevoluteJointDef;
	
	   function b2WeldJoint() {
	      b2WeldJoint.b2WeldJoint.apply(this, arguments);
	      if (this.constructor === b2WeldJoint) this.b2WeldJoint.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2WeldJoint = b2WeldJoint;
	
	   function b2WeldJointDef() {
	      b2WeldJointDef.b2WeldJointDef.apply(this, arguments);
	      if (this.constructor === b2WeldJointDef) this.b2WeldJointDef.apply(this, arguments);
	   };
	   Box2D.Dynamics.Joints.b2WeldJointDef = b2WeldJointDef;
	})(); //definitions
	Box2D.postDefs = [];
	(function () {
	   var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	      b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
	      b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
	      b2MassData = Box2D.Collision.Shapes.b2MassData,
	      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	      b2Shape = Box2D.Collision.Shapes.b2Shape,
	      b2Color = Box2D.Common.b2Color,
	      b2internal = Box2D.Common.b2internal,
	      b2Settings = Box2D.Common.b2Settings,
	      b2Mat22 = Box2D.Common.Math.b2Mat22,
	      b2Mat33 = Box2D.Common.Math.b2Mat33,
	      b2Math = Box2D.Common.Math.b2Math,
	      b2Sweep = Box2D.Common.Math.b2Sweep,
	      b2Transform = Box2D.Common.Math.b2Transform,
	      b2Vec2 = Box2D.Common.Math.b2Vec2,
	      b2Vec3 = Box2D.Common.Math.b2Vec3,
	      b2AABB = Box2D.Collision.b2AABB,
	      b2Bound = Box2D.Collision.b2Bound,
	      b2BoundValues = Box2D.Collision.b2BoundValues,
	      b2Collision = Box2D.Collision.b2Collision,
	      b2ContactID = Box2D.Collision.b2ContactID,
	      b2ContactPoint = Box2D.Collision.b2ContactPoint,
	      b2Distance = Box2D.Collision.b2Distance,
	      b2DistanceInput = Box2D.Collision.b2DistanceInput,
	      b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
	      b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
	      b2DynamicTree = Box2D.Collision.b2DynamicTree,
	      b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
	      b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
	      b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
	      b2Manifold = Box2D.Collision.b2Manifold,
	      b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
	      b2Point = Box2D.Collision.b2Point,
	      b2RayCastInput = Box2D.Collision.b2RayCastInput,
	      b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
	      b2Segment = Box2D.Collision.b2Segment,
	      b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
	      b2Simplex = Box2D.Collision.b2Simplex,
	      b2SimplexCache = Box2D.Collision.b2SimplexCache,
	      b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
	      b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
	      b2TOIInput = Box2D.Collision.b2TOIInput,
	      b2WorldManifold = Box2D.Collision.b2WorldManifold,
	      ClipVertex = Box2D.Collision.ClipVertex,
	      Features = Box2D.Collision.Features,
	      IBroadPhase = Box2D.Collision.IBroadPhase;
	
	   b2AABB.b2AABB = function () {
	      this.lowerBound = new b2Vec2();
	      this.upperBound = new b2Vec2();
	   };
	   b2AABB.prototype.IsValid = function () {
	      var dX = this.upperBound.x - this.lowerBound.x;
	      var dY = this.upperBound.y - this.lowerBound.y;
	      var valid = dX >= 0.0 && dY >= 0.0;
	      valid = valid && this.lowerBound.IsValid() && this.upperBound.IsValid();
	      return valid;
	   }
	   b2AABB.prototype.GetCenter = function () {
	      return new b2Vec2((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2);
	   }
	   b2AABB.prototype.GetExtents = function () {
	      return new b2Vec2((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2);
	   }
	   b2AABB.prototype.Contains = function (aabb) {
	      var result = true;
	      result = result && this.lowerBound.x <= aabb.lowerBound.x;
	      result = result && this.lowerBound.y <= aabb.lowerBound.y;
	      result = result && aabb.upperBound.x <= this.upperBound.x;
	      result = result && aabb.upperBound.y <= this.upperBound.y;
	      return result;
	   }
	   b2AABB.prototype.RayCast = function (output, input) {
	      var tmin = (-Number.MAX_VALUE);
	      var tmax = Number.MAX_VALUE;
	      var pX = input.p1.x;
	      var pY = input.p1.y;
	      var dX = input.p2.x - input.p1.x;
	      var dY = input.p2.y - input.p1.y;
	      var absDX = Math.abs(dX);
	      var absDY = Math.abs(dY);
	      var normal = output.normal;
	      var inv_d = 0;
	      var t1 = 0;
	      var t2 = 0;
	      var t3 = 0;
	      var s = 0; {
	         if (absDX < Number.MIN_VALUE) {
	            if (pX < this.lowerBound.x || this.upperBound.x < pX) return false;
	         }
	         else {
	            inv_d = 1.0 / dX;
	            t1 = (this.lowerBound.x - pX) * inv_d;
	            t2 = (this.upperBound.x - pX) * inv_d;
	            s = (-1.0);
	            if (t1 > t2) {
	               t3 = t1;
	               t1 = t2;
	               t2 = t3;
	               s = 1.0;
	            }
	            if (t1 > tmin) {
	               normal.x = s;
	               normal.y = 0;
	               tmin = t1;
	            }
	            tmax = Math.min(tmax, t2);
	            if (tmin > tmax) return false;
	         }
	      } {
	         if (absDY < Number.MIN_VALUE) {
	            if (pY < this.lowerBound.y || this.upperBound.y < pY) return false;
	         }
	         else {
	            inv_d = 1.0 / dY;
	            t1 = (this.lowerBound.y - pY) * inv_d;
	            t2 = (this.upperBound.y - pY) * inv_d;
	            s = (-1.0);
	            if (t1 > t2) {
	               t3 = t1;
	               t1 = t2;
	               t2 = t3;
	               s = 1.0;
	            }
	            if (t1 > tmin) {
	               normal.y = s;
	               normal.x = 0;
	               tmin = t1;
	            }
	            tmax = Math.min(tmax, t2);
	            if (tmin > tmax) return false;
	         }
	      }
	      output.fraction = tmin;
	      return true;
	   }
	   b2AABB.prototype.TestOverlap = function (other) {
	      var d1X = other.lowerBound.x - this.upperBound.x;
	      var d1Y = other.lowerBound.y - this.upperBound.y;
	      var d2X = this.lowerBound.x - other.upperBound.x;
	      var d2Y = this.lowerBound.y - other.upperBound.y;
	      if (d1X > 0.0 || d1Y > 0.0) return false;
	      if (d2X > 0.0 || d2Y > 0.0) return false;
	      return true;
	   }
	   b2AABB.Combine = function (aabb1, aabb2) {
	      var aabb = new b2AABB();
	      aabb.Combine(aabb1, aabb2);
	      return aabb;
	   }
	   b2AABB.prototype.Combine = function (aabb1, aabb2) {
	      this.lowerBound.x = Math.min(aabb1.lowerBound.x, aabb2.lowerBound.x);
	      this.lowerBound.y = Math.min(aabb1.lowerBound.y, aabb2.lowerBound.y);
	      this.upperBound.x = Math.max(aabb1.upperBound.x, aabb2.upperBound.x);
	      this.upperBound.y = Math.max(aabb1.upperBound.y, aabb2.upperBound.y);
	   }
	   b2Bound.b2Bound = function () {};
	   b2Bound.prototype.IsLower = function () {
	      return (this.value & 1) == 0;
	   }
	   b2Bound.prototype.IsUpper = function () {
	      return (this.value & 1) == 1;
	   }
	   b2Bound.prototype.Swap = function (b) {
	      var tempValue = this.value;
	      var tempProxy = this.proxy;
	      var tempStabbingCount = this.stabbingCount;
	      this.value = b.value;
	      this.proxy = b.proxy;
	      this.stabbingCount = b.stabbingCount;
	      b.value = tempValue;
	      b.proxy = tempProxy;
	      b.stabbingCount = tempStabbingCount;
	   }
	   b2BoundValues.b2BoundValues = function () {};
	   b2BoundValues.prototype.b2BoundValues = function () {
	      this.lowerValues = new Vector_a2j_Number();
	      this.lowerValues[0] = 0.0;
	      this.lowerValues[1] = 0.0;
	      this.upperValues = new Vector_a2j_Number();
	      this.upperValues[0] = 0.0;
	      this.upperValues[1] = 0.0;
	   }
	   b2Collision.b2Collision = function () {};
	   b2Collision.ClipSegmentToLine = function (vOut, vIn, normal, offset) {
	      if (offset === undefined) offset = 0;
	      var cv;
	      var numOut = 0;
	      cv = vIn[0];
	      var vIn0 = cv.v;
	      cv = vIn[1];
	      var vIn1 = cv.v;
	      var distance0 = normal.x * vIn0.x + normal.y * vIn0.y - offset;
	      var distance1 = normal.x * vIn1.x + normal.y * vIn1.y - offset;
	      if (distance0 <= 0.0) vOut[numOut++].Set(vIn[0]);
	      if (distance1 <= 0.0) vOut[numOut++].Set(vIn[1]);
	      if (distance0 * distance1 < 0.0) {
	         var interp = distance0 / (distance0 - distance1);
	         cv = vOut[numOut];
	         var tVec = cv.v;
	         tVec.x = vIn0.x + interp * (vIn1.x - vIn0.x);
	         tVec.y = vIn0.y + interp * (vIn1.y - vIn0.y);
	         cv = vOut[numOut];
	         var cv2;
	         if (distance0 > 0.0) {
	            cv2 = vIn[0];
	            cv.id = cv2.id;
	         }
	         else {
	            cv2 = vIn[1];
	            cv.id = cv2.id;
	         }++numOut;
	      }
	      return numOut;
	   }
	   b2Collision.EdgeSeparation = function (poly1, xf1, edge1, poly2, xf2) {
	      if (edge1 === undefined) edge1 = 0;
	      var count1 = parseInt(poly1.m_vertexCount);
	      var vertices1 = poly1.m_vertices;
	      var normals1 = poly1.m_normals;
	      var count2 = parseInt(poly2.m_vertexCount);
	      var vertices2 = poly2.m_vertices;
	      var tMat;
	      var tVec;
	      tMat = xf1.R;
	      tVec = normals1[edge1];
	      var normal1WorldX = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      var normal1WorldY = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      tMat = xf2.R;
	      var normal1X = (tMat.col1.x * normal1WorldX + tMat.col1.y * normal1WorldY);
	      var normal1Y = (tMat.col2.x * normal1WorldX + tMat.col2.y * normal1WorldY);
	      var index = 0;
	      var minDot = Number.MAX_VALUE;
	      for (var i = 0; i < count2; ++i) {
	         tVec = vertices2[i];
	         var dot = tVec.x * normal1X + tVec.y * normal1Y;
	         if (dot < minDot) {
	            minDot = dot;
	            index = i;
	         }
	      }
	      tVec = vertices1[edge1];
	      tMat = xf1.R;
	      var v1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      var v1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      tVec = vertices2[index];
	      tMat = xf2.R;
	      var v2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      var v2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      v2X -= v1X;
	      v2Y -= v1Y;
	      var separation = v2X * normal1WorldX + v2Y * normal1WorldY;
	      return separation;
	   }
	   b2Collision.FindMaxSeparation = function (edgeIndex, poly1, xf1, poly2, xf2) {
	      var count1 = parseInt(poly1.m_vertexCount);
	      var normals1 = poly1.m_normals;
	      var tVec;
	      var tMat;
	      tMat = xf2.R;
	      tVec = poly2.m_centroid;
	      var dX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      var dY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      tMat = xf1.R;
	      tVec = poly1.m_centroid;
	      dX -= xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      dY -= xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      var dLocal1X = (dX * xf1.R.col1.x + dY * xf1.R.col1.y);
	      var dLocal1Y = (dX * xf1.R.col2.x + dY * xf1.R.col2.y);
	      var edge = 0;
	      var maxDot = (-Number.MAX_VALUE);
	      for (var i = 0; i < count1; ++i) {
	         tVec = normals1[i];
	         var dot = (tVec.x * dLocal1X + tVec.y * dLocal1Y);
	         if (dot > maxDot) {
	            maxDot = dot;
	            edge = i;
	         }
	      }
	      var s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
	      var prevEdge = parseInt(edge - 1 >= 0 ? edge - 1 : count1 - 1);
	      var sPrev = b2Collision.EdgeSeparation(poly1, xf1, prevEdge, poly2, xf2);
	      var nextEdge = parseInt(edge + 1 < count1 ? edge + 1 : 0);
	      var sNext = b2Collision.EdgeSeparation(poly1, xf1, nextEdge, poly2, xf2);
	      var bestEdge = 0;
	      var bestSeparation = 0;
	      var increment = 0;
	      if (sPrev > s && sPrev > sNext) {
	         increment = (-1);
	         bestEdge = prevEdge;
	         bestSeparation = sPrev;
	      }
	      else if (sNext > s) {
	         increment = 1;
	         bestEdge = nextEdge;
	         bestSeparation = sNext;
	      }
	      else {
	         edgeIndex[0] = edge;
	         return s;
	      }
	      while (true) {
	         if (increment == (-1)) edge = bestEdge - 1 >= 0 ? bestEdge - 1 : count1 - 1;
	         else edge = bestEdge + 1 < count1 ? bestEdge + 1 : 0;s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
	         if (s > bestSeparation) {
	            bestEdge = edge;
	            bestSeparation = s;
	         }
	         else {
	            break;
	         }
	      }
	      edgeIndex[0] = bestEdge;
	      return bestSeparation;
	   }
	   b2Collision.FindIncidentEdge = function (c, poly1, xf1, edge1, poly2, xf2) {
	      if (edge1 === undefined) edge1 = 0;
	      var count1 = parseInt(poly1.m_vertexCount);
	      var normals1 = poly1.m_normals;
	      var count2 = parseInt(poly2.m_vertexCount);
	      var vertices2 = poly2.m_vertices;
	      var normals2 = poly2.m_normals;
	      var tMat;
	      var tVec;
	      tMat = xf1.R;
	      tVec = normals1[edge1];
	      var normal1X = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      var normal1Y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      tMat = xf2.R;
	      var tX = (tMat.col1.x * normal1X + tMat.col1.y * normal1Y);
	      normal1Y = (tMat.col2.x * normal1X + tMat.col2.y * normal1Y);
	      normal1X = tX;
	      var index = 0;
	      var minDot = Number.MAX_VALUE;
	      for (var i = 0; i < count2; ++i) {
	         tVec = normals2[i];
	         var dot = (normal1X * tVec.x + normal1Y * tVec.y);
	         if (dot < minDot) {
	            minDot = dot;
	            index = i;
	         }
	      }
	      var tClip;
	      var i1 = parseInt(index);
	      var i2 = parseInt(i1 + 1 < count2 ? i1 + 1 : 0);
	      tClip = c[0];
	      tVec = vertices2[i1];
	      tMat = xf2.R;
	      tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      tClip.id.features.referenceEdge = edge1;
	      tClip.id.features.incidentEdge = i1;
	      tClip.id.features.incidentVertex = 0;
	      tClip = c[1];
	      tVec = vertices2[i2];
	      tMat = xf2.R;
	      tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      tClip.id.features.referenceEdge = edge1;
	      tClip.id.features.incidentEdge = i2;
	      tClip.id.features.incidentVertex = 1;
	   }
	   b2Collision.MakeClipPointVector = function () {
	      var r = new Vector(2);
	      r[0] = new ClipVertex();
	      r[1] = new ClipVertex();
	      return r;
	   }
	   b2Collision.CollidePolygons = function (manifold, polyA, xfA, polyB, xfB) {
	      var cv;
	      manifold.m_pointCount = 0;
	      var totalRadius = polyA.m_radius + polyB.m_radius;
	      var edgeA = 0;
	      b2Collision.s_edgeAO[0] = edgeA;
	      var separationA = b2Collision.FindMaxSeparation(b2Collision.s_edgeAO, polyA, xfA, polyB, xfB);
	      edgeA = b2Collision.s_edgeAO[0];
	      if (separationA > totalRadius) return;
	      var edgeB = 0;
	      b2Collision.s_edgeBO[0] = edgeB;
	      var separationB = b2Collision.FindMaxSeparation(b2Collision.s_edgeBO, polyB, xfB, polyA, xfA);
	      edgeB = b2Collision.s_edgeBO[0];
	      if (separationB > totalRadius) return;
	      var poly1;
	      var poly2;
	      var xf1;
	      var xf2;
	      var edge1 = 0;
	      var flip = 0;
	      var k_relativeTol = 0.98;
	      var k_absoluteTol = 0.001;
	      var tMat;
	      if (separationB > k_relativeTol * separationA + k_absoluteTol) {
	         poly1 = polyB;
	         poly2 = polyA;
	         xf1 = xfB;
	         xf2 = xfA;
	         edge1 = edgeB;
	         manifold.m_type = b2Manifold.e_faceB;
	         flip = 1;
	      }
	      else {
	         poly1 = polyA;
	         poly2 = polyB;
	         xf1 = xfA;
	         xf2 = xfB;
	         edge1 = edgeA;
	         manifold.m_type = b2Manifold.e_faceA;
	         flip = 0;
	      }
	      var incidentEdge = b2Collision.s_incidentEdge;
	      b2Collision.FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
	      var count1 = parseInt(poly1.m_vertexCount);
	      var vertices1 = poly1.m_vertices;
	      var local_v11 = vertices1[edge1];
	      var local_v12;
	      if (edge1 + 1 < count1) {
	         local_v12 = vertices1[parseInt(edge1 + 1)];
	      }
	      else {
	         local_v12 = vertices1[0];
	      }
	      var localTangent = b2Collision.s_localTangent;
	      localTangent.Set(local_v12.x - local_v11.x, local_v12.y - local_v11.y);
	      localTangent.Normalize();
	      var localNormal = b2Collision.s_localNormal;
	      localNormal.x = localTangent.y;
	      localNormal.y = (-localTangent.x);
	      var planePoint = b2Collision.s_planePoint;
	      planePoint.Set(0.5 * (local_v11.x + local_v12.x), 0.5 * (local_v11.y + local_v12.y));
	      var tangent = b2Collision.s_tangent;
	      tMat = xf1.R;
	      tangent.x = (tMat.col1.x * localTangent.x + tMat.col2.x * localTangent.y);
	      tangent.y = (tMat.col1.y * localTangent.x + tMat.col2.y * localTangent.y);
	      var tangent2 = b2Collision.s_tangent2;
	      tangent2.x = (-tangent.x);
	      tangent2.y = (-tangent.y);
	      var normal = b2Collision.s_normal;
	      normal.x = tangent.y;
	      normal.y = (-tangent.x);
	      var v11 = b2Collision.s_v11;
	      var v12 = b2Collision.s_v12;
	      v11.x = xf1.position.x + (tMat.col1.x * local_v11.x + tMat.col2.x * local_v11.y);
	      v11.y = xf1.position.y + (tMat.col1.y * local_v11.x + tMat.col2.y * local_v11.y);
	      v12.x = xf1.position.x + (tMat.col1.x * local_v12.x + tMat.col2.x * local_v12.y);
	      v12.y = xf1.position.y + (tMat.col1.y * local_v12.x + tMat.col2.y * local_v12.y);
	      var frontOffset = normal.x * v11.x + normal.y * v11.y;
	      var sideOffset1 = (-tangent.x * v11.x) - tangent.y * v11.y + totalRadius;
	      var sideOffset2 = tangent.x * v12.x + tangent.y * v12.y + totalRadius;
	      var clipPoints1 = b2Collision.s_clipPoints1;
	      var clipPoints2 = b2Collision.s_clipPoints2;
	      var np = 0;
	      np = b2Collision.ClipSegmentToLine(clipPoints1, incidentEdge, tangent2, sideOffset1);
	      if (np < 2) return;
	      np = b2Collision.ClipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2);
	      if (np < 2) return;
	      manifold.m_localPlaneNormal.SetV(localNormal);
	      manifold.m_localPoint.SetV(planePoint);
	      var pointCount = 0;
	      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; ++i) {
	         cv = clipPoints2[i];
	         var separation = normal.x * cv.v.x + normal.y * cv.v.y - frontOffset;
	         if (separation <= totalRadius) {
	            var cp = manifold.m_points[pointCount];
	            tMat = xf2.R;
	            var tX = cv.v.x - xf2.position.x;
	            var tY = cv.v.y - xf2.position.y;
	            cp.m_localPoint.x = (tX * tMat.col1.x + tY * tMat.col1.y);
	            cp.m_localPoint.y = (tX * tMat.col2.x + tY * tMat.col2.y);
	            cp.m_id.Set(cv.id);
	            cp.m_id.features.flip = flip;
	            ++pointCount;
	         }
	      }
	      manifold.m_pointCount = pointCount;
	   }
	   b2Collision.CollideCircles = function (manifold, circle1, xf1, circle2, xf2) {
	      manifold.m_pointCount = 0;
	      var tMat;
	      var tVec;
	      tMat = xf1.R;
	      tVec = circle1.m_p;
	      var p1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      var p1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      tMat = xf2.R;
	      tVec = circle2.m_p;
	      var p2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      var p2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      var dX = p2X - p1X;
	      var dY = p2Y - p1Y;
	      var distSqr = dX * dX + dY * dY;
	      var radius = circle1.m_radius + circle2.m_radius;
	      if (distSqr > radius * radius) {
	         return;
	      }
	      manifold.m_type = b2Manifold.e_circles;
	      manifold.m_localPoint.SetV(circle1.m_p);
	      manifold.m_localPlaneNormal.SetZero();
	      manifold.m_pointCount = 1;
	      manifold.m_points[0].m_localPoint.SetV(circle2.m_p);
	      manifold.m_points[0].m_id.key = 0;
	   }
	   b2Collision.CollidePolygonAndCircle = function (manifold, polygon, xf1, circle, xf2) {
	      manifold.m_pointCount = 0;
	      var tPoint;
	      var dX = 0;
	      var dY = 0;
	      var positionX = 0;
	      var positionY = 0;
	      var tVec;
	      var tMat;
	      tMat = xf2.R;
	      tVec = circle.m_p;
	      var cX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      var cY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      dX = cX - xf1.position.x;
	      dY = cY - xf1.position.y;
	      tMat = xf1.R;
	      var cLocalX = (dX * tMat.col1.x + dY * tMat.col1.y);
	      var cLocalY = (dX * tMat.col2.x + dY * tMat.col2.y);
	      var dist = 0;
	      var normalIndex = 0;
	      var separation = (-Number.MAX_VALUE);
	      var radius = polygon.m_radius + circle.m_radius;
	      var vertexCount = parseInt(polygon.m_vertexCount);
	      var vertices = polygon.m_vertices;
	      var normals = polygon.m_normals;
	      for (var i = 0; i < vertexCount; ++i) {
	         tVec = vertices[i];
	         dX = cLocalX - tVec.x;
	         dY = cLocalY - tVec.y;
	         tVec = normals[i];
	         var s = tVec.x * dX + tVec.y * dY;
	         if (s > radius) {
	            return;
	         }
	         if (s > separation) {
	            separation = s;
	            normalIndex = i;
	         }
	      }
	      var vertIndex1 = parseInt(normalIndex);
	      var vertIndex2 = parseInt(vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0);
	      var v1 = vertices[vertIndex1];
	      var v2 = vertices[vertIndex2];
	      if (separation < Number.MIN_VALUE) {
	         manifold.m_pointCount = 1;
	         manifold.m_type = b2Manifold.e_faceA;
	         manifold.m_localPlaneNormal.SetV(normals[normalIndex]);
	         manifold.m_localPoint.x = 0.5 * (v1.x + v2.x);
	         manifold.m_localPoint.y = 0.5 * (v1.y + v2.y);
	         manifold.m_points[0].m_localPoint.SetV(circle.m_p);
	         manifold.m_points[0].m_id.key = 0;
	         return;
	      }
	      var u1 = (cLocalX - v1.x) * (v2.x - v1.x) + (cLocalY - v1.y) * (v2.y - v1.y);
	      var u2 = (cLocalX - v2.x) * (v1.x - v2.x) + (cLocalY - v2.y) * (v1.y - v2.y);
	      if (u1 <= 0.0) {
	         if ((cLocalX - v1.x) * (cLocalX - v1.x) + (cLocalY - v1.y) * (cLocalY - v1.y) > radius * radius) return;
	         manifold.m_pointCount = 1;
	         manifold.m_type = b2Manifold.e_faceA;
	         manifold.m_localPlaneNormal.x = cLocalX - v1.x;
	         manifold.m_localPlaneNormal.y = cLocalY - v1.y;
	         manifold.m_localPlaneNormal.Normalize();
	         manifold.m_localPoint.SetV(v1);
	         manifold.m_points[0].m_localPoint.SetV(circle.m_p);
	         manifold.m_points[0].m_id.key = 0;
	      }
	      else if (u2 <= 0) {
	         if ((cLocalX - v2.x) * (cLocalX - v2.x) + (cLocalY - v2.y) * (cLocalY - v2.y) > radius * radius) return;
	         manifold.m_pointCount = 1;
	         manifold.m_type = b2Manifold.e_faceA;
	         manifold.m_localPlaneNormal.x = cLocalX - v2.x;
	         manifold.m_localPlaneNormal.y = cLocalY - v2.y;
	         manifold.m_localPlaneNormal.Normalize();
	         manifold.m_localPoint.SetV(v2);
	         manifold.m_points[0].m_localPoint.SetV(circle.m_p);
	         manifold.m_points[0].m_id.key = 0;
	      }
	      else {
	         var faceCenterX = 0.5 * (v1.x + v2.x);
	         var faceCenterY = 0.5 * (v1.y + v2.y);
	         separation = (cLocalX - faceCenterX) * normals[vertIndex1].x + (cLocalY - faceCenterY) * normals[vertIndex1].y;
	         if (separation > radius) return;
	         manifold.m_pointCount = 1;
	         manifold.m_type = b2Manifold.e_faceA;
	         manifold.m_localPlaneNormal.x = normals[vertIndex1].x;
	         manifold.m_localPlaneNormal.y = normals[vertIndex1].y;
	         manifold.m_localPlaneNormal.Normalize();
	         manifold.m_localPoint.Set(faceCenterX, faceCenterY);
	         manifold.m_points[0].m_localPoint.SetV(circle.m_p);
	         manifold.m_points[0].m_id.key = 0;
	      }
	   }
	   b2Collision.TestOverlap = function (a, b) {
	      var t1 = b.lowerBound;
	      var t2 = a.upperBound;
	      var d1X = t1.x - t2.x;
	      var d1Y = t1.y - t2.y;
	      t1 = a.lowerBound;
	      t2 = b.upperBound;
	      var d2X = t1.x - t2.x;
	      var d2Y = t1.y - t2.y;
	      if (d1X > 0.0 || d1Y > 0.0) return false;
	      if (d2X > 0.0 || d2Y > 0.0) return false;
	      return true;
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Collision.b2Collision.s_incidentEdge = b2Collision.MakeClipPointVector();
	      Box2D.Collision.b2Collision.s_clipPoints1 = b2Collision.MakeClipPointVector();
	      Box2D.Collision.b2Collision.s_clipPoints2 = b2Collision.MakeClipPointVector();
	      Box2D.Collision.b2Collision.s_edgeAO = new Vector_a2j_Number(1);
	      Box2D.Collision.b2Collision.s_edgeBO = new Vector_a2j_Number(1);
	      Box2D.Collision.b2Collision.s_localTangent = new b2Vec2();
	      Box2D.Collision.b2Collision.s_localNormal = new b2Vec2();
	      Box2D.Collision.b2Collision.s_planePoint = new b2Vec2();
	      Box2D.Collision.b2Collision.s_normal = new b2Vec2();
	      Box2D.Collision.b2Collision.s_tangent = new b2Vec2();
	      Box2D.Collision.b2Collision.s_tangent2 = new b2Vec2();
	      Box2D.Collision.b2Collision.s_v11 = new b2Vec2();
	      Box2D.Collision.b2Collision.s_v12 = new b2Vec2();
	      Box2D.Collision.b2Collision.b2CollidePolyTempVec = new b2Vec2();
	      Box2D.Collision.b2Collision.b2_nullFeature = 0x000000ff;
	   });
	   b2ContactID.b2ContactID = function () {
	      this.features = new Features();
	   };
	   b2ContactID.prototype.b2ContactID = function () {
	      this.features._m_id = this;
	   }
	   b2ContactID.prototype.Set = function (id) {
	      this.key = id._key;
	   }
	   b2ContactID.prototype.Copy = function () {
	      var id = new b2ContactID();
	      id.key = this.key;
	      return id;
	   }
	   Object.defineProperty(b2ContactID.prototype, 'key', {
	      enumerable: false,
	      configurable: true,
	      get: function () {
	         return this._key;
	      }
	   });
	   Object.defineProperty(b2ContactID.prototype, 'key', {
	      enumerable: false,
	      configurable: true,
	      set: function (value) {
	         if (value === undefined) value = 0;
	         this._key = value;
	         this.features._referenceEdge = this._key & 0x000000ff;
	         this.features._incidentEdge = ((this._key & 0x0000ff00) >> 8) & 0x000000ff;
	         this.features._incidentVertex = ((this._key & 0x00ff0000) >> 16) & 0x000000ff;
	         this.features._flip = ((this._key & 0xff000000) >> 24) & 0x000000ff;
	      }
	   });
	   b2ContactPoint.b2ContactPoint = function () {
	      this.position = new b2Vec2();
	      this.velocity = new b2Vec2();
	      this.normal = new b2Vec2();
	      this.id = new b2ContactID();
	   };
	   b2Distance.b2Distance = function () {};
	   b2Distance.Distance = function (output, cache, input) {
	      ++b2Distance.b2_gjkCalls;
	      var proxyA = input.proxyA;
	      var proxyB = input.proxyB;
	      var transformA = input.transformA;
	      var transformB = input.transformB;
	      var simplex = b2Distance.s_simplex;
	      simplex.ReadCache(cache, proxyA, transformA, proxyB, transformB);
	      var vertices = simplex.m_vertices;
	      var k_maxIters = 20;
	      var saveA = b2Distance.s_saveA;
	      var saveB = b2Distance.s_saveB;
	      var saveCount = 0;
	      var closestPoint = simplex.GetClosestPoint();
	      var distanceSqr1 = closestPoint.LengthSquared();
	      var distanceSqr2 = distanceSqr1;
	      var i = 0;
	      var p;
	      var iter = 0;
	      while (iter < k_maxIters) {
	         saveCount = simplex.m_count;
	         for (i = 0;
	         i < saveCount; i++) {
	            saveA[i] = vertices[i].indexA;
	            saveB[i] = vertices[i].indexB;
	         }
	         switch (simplex.m_count) {
	         case 1:
	            break;
	         case 2:
	            simplex.Solve2();
	            break;
	         case 3:
	            simplex.Solve3();
	            break;
	         default:
	            b2Settings.b2Assert(false);
	         }
	         if (simplex.m_count == 3) {
	            break;
	         }
	         p = simplex.GetClosestPoint();
	         distanceSqr2 = p.LengthSquared();
	         if (distanceSqr2 > distanceSqr1) {}
	         distanceSqr1 = distanceSqr2;
	         var d = simplex.GetSearchDirection();
	         if (d.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) {
	            break;
	         }
	         var vertex = vertices[simplex.m_count];
	         vertex.indexA = proxyA.GetSupport(b2Math.MulTMV(transformA.R, d.GetNegative()));
	         vertex.wA = b2Math.MulX(transformA, proxyA.GetVertex(vertex.indexA));
	         vertex.indexB = proxyB.GetSupport(b2Math.MulTMV(transformB.R, d));
	         vertex.wB = b2Math.MulX(transformB, proxyB.GetVertex(vertex.indexB));
	         vertex.w = b2Math.SubtractVV(vertex.wB, vertex.wA);
	         ++iter;
	         ++b2Distance.b2_gjkIters;
	         var duplicate = false;
	         for (i = 0;
	         i < saveCount; i++) {
	            if (vertex.indexA == saveA[i] && vertex.indexB == saveB[i]) {
	               duplicate = true;
	               break;
	            }
	         }
	         if (duplicate) {
	            break;
	         }++simplex.m_count;
	      }
	      b2Distance.b2_gjkMaxIters = b2Math.Max(b2Distance.b2_gjkMaxIters, iter);
	      simplex.GetWitnessPoints(output.pointA, output.pointB);
	      output.distance = b2Math.SubtractVV(output.pointA, output.pointB).Length();
	      output.iterations = iter;
	      simplex.WriteCache(cache);
	      if (input.useRadii) {
	         var rA = proxyA.m_radius;
	         var rB = proxyB.m_radius;
	         if (output.distance > rA + rB && output.distance > Number.MIN_VALUE) {
	            output.distance -= rA + rB;
	            var normal = b2Math.SubtractVV(output.pointB, output.pointA);
	            normal.Normalize();
	            output.pointA.x += rA * normal.x;
	            output.pointA.y += rA * normal.y;
	            output.pointB.x -= rB * normal.x;
	            output.pointB.y -= rB * normal.y;
	         }
	         else {
	            p = new b2Vec2();
	            p.x = .5 * (output.pointA.x + output.pointB.x);
	            p.y = .5 * (output.pointA.y + output.pointB.y);
	            output.pointA.x = output.pointB.x = p.x;
	            output.pointA.y = output.pointB.y = p.y;
	            output.distance = 0.0;
	         }
	      }
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Collision.b2Distance.s_simplex = new b2Simplex();
	      Box2D.Collision.b2Distance.s_saveA = new Vector_a2j_Number(3);
	      Box2D.Collision.b2Distance.s_saveB = new Vector_a2j_Number(3);
	   });
	   b2DistanceInput.b2DistanceInput = function () {};
	   b2DistanceOutput.b2DistanceOutput = function () {
	      this.pointA = new b2Vec2();
	      this.pointB = new b2Vec2();
	   };
	   b2DistanceProxy.b2DistanceProxy = function () {};
	   b2DistanceProxy.prototype.Set = function (shape) {
	      switch (shape.GetType()) {
	      case b2Shape.e_circleShape:
	         {
	            var circle = (shape instanceof b2CircleShape ? shape : null);
	            this.m_vertices = new Vector(1, true);
	            this.m_vertices[0] = circle.m_p;
	            this.m_count = 1;
	            this.m_radius = circle.m_radius;
	         }
	         break;
	      case b2Shape.e_polygonShape:
	         {
	            var polygon = (shape instanceof b2PolygonShape ? shape : null);
	            this.m_vertices = polygon.m_vertices;
	            this.m_count = polygon.m_vertexCount;
	            this.m_radius = polygon.m_radius;
	         }
	         break;
	      default:
	         b2Settings.b2Assert(false);
	      }
	   }
	   b2DistanceProxy.prototype.GetSupport = function (d) {
	      var bestIndex = 0;
	      var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
	      for (var i = 1; i < this.m_count; ++i) {
	         var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
	         if (value > bestValue) {
	            bestIndex = i;
	            bestValue = value;
	         }
	      }
	      return bestIndex;
	   }
	   b2DistanceProxy.prototype.GetSupportVertex = function (d) {
	      var bestIndex = 0;
	      var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
	      for (var i = 1; i < this.m_count; ++i) {
	         var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
	         if (value > bestValue) {
	            bestIndex = i;
	            bestValue = value;
	         }
	      }
	      return this.m_vertices[bestIndex];
	   }
	   b2DistanceProxy.prototype.GetVertexCount = function () {
	      return this.m_count;
	   }
	   b2DistanceProxy.prototype.GetVertex = function (index) {
	      if (index === undefined) index = 0;
	      b2Settings.b2Assert(0 <= index && index < this.m_count);
	      return this.m_vertices[index];
	   }
	   b2DynamicTree.b2DynamicTree = function () {};
	   b2DynamicTree.prototype.b2DynamicTree = function () {
	      this.m_root = null;
	      this.m_freeList = null;
	      this.m_path = 0;
	      this.m_insertionCount = 0;
	   }
	   b2DynamicTree.prototype.CreateProxy = function (aabb, userData) {
	      var node = this.AllocateNode();
	      var extendX = b2Settings.b2_aabbExtension;
	      var extendY = b2Settings.b2_aabbExtension;
	      node.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
	      node.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
	      node.aabb.upperBound.x = aabb.upperBound.x + extendX;
	      node.aabb.upperBound.y = aabb.upperBound.y + extendY;
	      node.userData = userData;
	      this.InsertLeaf(node);
	      return node;
	   }
	   b2DynamicTree.prototype.DestroyProxy = function (proxy) {
	      this.RemoveLeaf(proxy);
	      this.FreeNode(proxy);
	   }
	   b2DynamicTree.prototype.MoveProxy = function (proxy, aabb, displacement) {
	      b2Settings.b2Assert(proxy.IsLeaf());
	      if (proxy.aabb.Contains(aabb)) {
	         return false;
	      }
	      this.RemoveLeaf(proxy);
	      var extendX = b2Settings.b2_aabbExtension + b2Settings.b2_aabbMultiplier * (displacement.x > 0 ? displacement.x : (-displacement.x));
	      var extendY = b2Settings.b2_aabbExtension + b2Settings.b2_aabbMultiplier * (displacement.y > 0 ? displacement.y : (-displacement.y));
	      proxy.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
	      proxy.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
	      proxy.aabb.upperBound.x = aabb.upperBound.x + extendX;
	      proxy.aabb.upperBound.y = aabb.upperBound.y + extendY;
	      this.InsertLeaf(proxy);
	      return true;
	   }
	   b2DynamicTree.prototype.Rebalance = function (iterations) {
	      if (iterations === undefined) iterations = 0;
	      if (this.m_root == null) return;
	      for (var i = 0; i < iterations; i++) {
	         var node = this.m_root;
	         var bit = 0;
	         while (node.IsLeaf() == false) {
	            node = (this.m_path >> bit) & 1 ? node.child2 : node.child1;
	            bit = (bit + 1) & 31;
	         }++this.m_path;
	         this.RemoveLeaf(node);
	         this.InsertLeaf(node);
	      }
	   }
	   b2DynamicTree.prototype.GetFatAABB = function (proxy) {
	      return proxy.aabb;
	   }
	   b2DynamicTree.prototype.GetUserData = function (proxy) {
	      return proxy.userData;
	   }
	   b2DynamicTree.prototype.Query = function (callback, aabb) {
	      if (this.m_root == null) return;
	      var stack = new Vector();
	      var count = 0;
	      stack[count++] = this.m_root;
	      while (count > 0) {
	         var node = stack[--count];
	         if (node.aabb.TestOverlap(aabb)) {
	            if (node.IsLeaf()) {
	               var proceed = callback(node);
	               if (!proceed) return;
	            }
	            else {
	               stack[count++] = node.child1;
	               stack[count++] = node.child2;
	            }
	         }
	      }
	   }
	   b2DynamicTree.prototype.RayCast = function (callback, input) {
	      if (this.m_root == null) return;
	      var p1 = input.p1;
	      var p2 = input.p2;
	      var r = b2Math.SubtractVV(p1, p2);
	      r.Normalize();
	      var v = b2Math.CrossFV(1.0, r);
	      var abs_v = b2Math.AbsV(v);
	      var maxFraction = input.maxFraction;
	      var segmentAABB = new b2AABB();
	      var tX = 0;
	      var tY = 0; {
	         tX = p1.x + maxFraction * (p2.x - p1.x);
	         tY = p1.y + maxFraction * (p2.y - p1.y);
	         segmentAABB.lowerBound.x = Math.min(p1.x, tX);
	         segmentAABB.lowerBound.y = Math.min(p1.y, tY);
	         segmentAABB.upperBound.x = Math.max(p1.x, tX);
	         segmentAABB.upperBound.y = Math.max(p1.y, tY);
	      }
	      var stack = new Vector();
	      var count = 0;
	      stack[count++] = this.m_root;
	      while (count > 0) {
	         var node = stack[--count];
	         if (node.aabb.TestOverlap(segmentAABB) == false) {
	            continue;
	         }
	         var c = node.aabb.GetCenter();
	         var h = node.aabb.GetExtents();
	         var separation = Math.abs(v.x * (p1.x - c.x) + v.y * (p1.y - c.y)) - abs_v.x * h.x - abs_v.y * h.y;
	         if (separation > 0.0) continue;
	         if (node.IsLeaf()) {
	            var subInput = new b2RayCastInput();
	            subInput.p1 = input.p1;
	            subInput.p2 = input.p2;
	            subInput.maxFraction = input.maxFraction;
	            maxFraction = callback(subInput, node);
	            if (maxFraction == 0.0) return;
	            if (maxFraction > 0.0) {
	               tX = p1.x + maxFraction * (p2.x - p1.x);
	               tY = p1.y + maxFraction * (p2.y - p1.y);
	               segmentAABB.lowerBound.x = Math.min(p1.x, tX);
	               segmentAABB.lowerBound.y = Math.min(p1.y, tY);
	               segmentAABB.upperBound.x = Math.max(p1.x, tX);
	               segmentAABB.upperBound.y = Math.max(p1.y, tY);
	            }
	         }
	         else {
	            stack[count++] = node.child1;
	            stack[count++] = node.child2;
	         }
	      }
	   }
	   b2DynamicTree.prototype.AllocateNode = function () {
	      if (this.m_freeList) {
	         var node = this.m_freeList;
	         this.m_freeList = node.parent;
	         node.parent = null;
	         node.child1 = null;
	         node.child2 = null;
	         return node;
	      }
	      return new b2DynamicTreeNode();
	   }
	   b2DynamicTree.prototype.FreeNode = function (node) {
	      node.parent = this.m_freeList;
	      this.m_freeList = node;
	   }
	   b2DynamicTree.prototype.InsertLeaf = function (leaf) {
	      ++this.m_insertionCount;
	      if (this.m_root == null) {
	         this.m_root = leaf;
	         this.m_root.parent = null;
	         return;
	      }
	      var center = leaf.aabb.GetCenter();
	      var sibling = this.m_root;
	      if (sibling.IsLeaf() == false) {
	         do {
	            var child1 = sibling.child1;
	            var child2 = sibling.child2;
	            var norm1 = Math.abs((child1.aabb.lowerBound.x + child1.aabb.upperBound.x) / 2 - center.x) + Math.abs((child1.aabb.lowerBound.y + child1.aabb.upperBound.y) / 2 - center.y);
	            var norm2 = Math.abs((child2.aabb.lowerBound.x + child2.aabb.upperBound.x) / 2 - center.x) + Math.abs((child2.aabb.lowerBound.y + child2.aabb.upperBound.y) / 2 - center.y);
	            if (norm1 < norm2) {
	               sibling = child1;
	            }
	            else {
	               sibling = child2;
	            }
	         }
	         while (sibling.IsLeaf() == false)
	      }
	      var node1 = sibling.parent;
	      var node2 = this.AllocateNode();
	      node2.parent = node1;
	      node2.userData = null;
	      node2.aabb.Combine(leaf.aabb, sibling.aabb);
	      if (node1) {
	         if (sibling.parent.child1 == sibling) {
	            node1.child1 = node2;
	         }
	         else {
	            node1.child2 = node2;
	         }
	         node2.child1 = sibling;
	         node2.child2 = leaf;
	         sibling.parent = node2;
	         leaf.parent = node2;
	         do {
	            if (node1.aabb.Contains(node2.aabb)) break;
	            node1.aabb.Combine(node1.child1.aabb, node1.child2.aabb);
	            node2 = node1;
	            node1 = node1.parent;
	         }
	         while (node1)
	      }
	      else {
	         node2.child1 = sibling;
	         node2.child2 = leaf;
	         sibling.parent = node2;
	         leaf.parent = node2;
	         this.m_root = node2;
	      }
	   }
	   b2DynamicTree.prototype.RemoveLeaf = function (leaf) {
	      if (leaf == this.m_root) {
	         this.m_root = null;
	         return;
	      }
	      var node2 = leaf.parent;
	      var node1 = node2.parent;
	      var sibling;
	      if (node2.child1 == leaf) {
	         sibling = node2.child2;
	      }
	      else {
	         sibling = node2.child1;
	      }
	      if (node1) {
	         if (node1.child1 == node2) {
	            node1.child1 = sibling;
	         }
	         else {
	            node1.child2 = sibling;
	         }
	         sibling.parent = node1;
	         this.FreeNode(node2);
	         while (node1) {
	            var oldAABB = node1.aabb;
	            node1.aabb = b2AABB.Combine(node1.child1.aabb, node1.child2.aabb);
	            if (oldAABB.Contains(node1.aabb)) break;
	            node1 = node1.parent;
	         }
	      }
	      else {
	         this.m_root = sibling;
	         sibling.parent = null;
	         this.FreeNode(node2);
	      }
	   }
	   b2DynamicTreeBroadPhase.b2DynamicTreeBroadPhase = function () {
	      this.m_tree = new b2DynamicTree();
	      this.m_moveBuffer = new Vector();
	      this.m_pairBuffer = new Vector();
	      this.m_pairCount = 0;
	   };
	   b2DynamicTreeBroadPhase.prototype.CreateProxy = function (aabb, userData) {
	      var proxy = this.m_tree.CreateProxy(aabb, userData);
	      ++this.m_proxyCount;
	      this.BufferMove(proxy);
	      return proxy;
	   }
	   b2DynamicTreeBroadPhase.prototype.DestroyProxy = function (proxy) {
	      this.UnBufferMove(proxy);
	      --this.m_proxyCount;
	      this.m_tree.DestroyProxy(proxy);
	   }
	   b2DynamicTreeBroadPhase.prototype.MoveProxy = function (proxy, aabb, displacement) {
	      var buffer = this.m_tree.MoveProxy(proxy, aabb, displacement);
	      if (buffer) {
	         this.BufferMove(proxy);
	      }
	   }
	   b2DynamicTreeBroadPhase.prototype.TestOverlap = function (proxyA, proxyB) {
	      var aabbA = this.m_tree.GetFatAABB(proxyA);
	      var aabbB = this.m_tree.GetFatAABB(proxyB);
	      return aabbA.TestOverlap(aabbB);
	   }
	   b2DynamicTreeBroadPhase.prototype.GetUserData = function (proxy) {
	      return this.m_tree.GetUserData(proxy);
	   }
	   b2DynamicTreeBroadPhase.prototype.GetFatAABB = function (proxy) {
	      return this.m_tree.GetFatAABB(proxy);
	   }
	   b2DynamicTreeBroadPhase.prototype.GetProxyCount = function () {
	      return this.m_proxyCount;
	   }
	   b2DynamicTreeBroadPhase.prototype.UpdatePairs = function (callback) {
	      var __this = this;
	      __this.m_pairCount = 0;
	      var i = 0,
	         queryProxy;
	      for (i = 0;
	      i < __this.m_moveBuffer.length; ++i) {
	         queryProxy = __this.m_moveBuffer[i];
	
	         function QueryCallback(proxy) {
	            if (proxy == queryProxy) return true;
	            if (__this.m_pairCount == __this.m_pairBuffer.length) {
	               __this.m_pairBuffer[__this.m_pairCount] = new b2DynamicTreePair();
	            }
	            var pair = __this.m_pairBuffer[__this.m_pairCount];
	            pair.proxyA = proxy < queryProxy ? proxy : queryProxy;
	            pair.proxyB = proxy >= queryProxy ? proxy : queryProxy;++__this.m_pairCount;
	            return true;
	         };
	         var fatAABB = __this.m_tree.GetFatAABB(queryProxy);
	         __this.m_tree.Query(QueryCallback, fatAABB);
	      }
	      __this.m_moveBuffer.length = 0;
	      for (var i = 0; i < __this.m_pairCount;) {
	         var primaryPair = __this.m_pairBuffer[i];
	         var userDataA = __this.m_tree.GetUserData(primaryPair.proxyA);
	         var userDataB = __this.m_tree.GetUserData(primaryPair.proxyB);
	         callback(userDataA, userDataB);
	         ++i;
	         while (i < __this.m_pairCount) {
	            var pair = __this.m_pairBuffer[i];
	            if (pair.proxyA != primaryPair.proxyA || pair.proxyB != primaryPair.proxyB) {
	               break;
	            }++i;
	         }
	      }
	   }
	   b2DynamicTreeBroadPhase.prototype.Query = function (callback, aabb) {
	      this.m_tree.Query(callback, aabb);
	   }
	   b2DynamicTreeBroadPhase.prototype.RayCast = function (callback, input) {
	      this.m_tree.RayCast(callback, input);
	   }
	   b2DynamicTreeBroadPhase.prototype.Validate = function () {}
	   b2DynamicTreeBroadPhase.prototype.Rebalance = function (iterations) {
	      if (iterations === undefined) iterations = 0;
	      this.m_tree.Rebalance(iterations);
	   }
	   b2DynamicTreeBroadPhase.prototype.BufferMove = function (proxy) {
	      this.m_moveBuffer[this.m_moveBuffer.length] = proxy;
	   }
	   b2DynamicTreeBroadPhase.prototype.UnBufferMove = function (proxy) {
	      var i = parseInt(this.m_moveBuffer.indexOf(proxy));
	      this.m_moveBuffer.splice(i, 1);
	   }
	   b2DynamicTreeBroadPhase.prototype.ComparePairs = function (pair1, pair2) {
	      return 0;
	   }
	   b2DynamicTreeBroadPhase.__implements = {};
	   b2DynamicTreeBroadPhase.__implements[IBroadPhase] = true;
	   b2DynamicTreeNode.b2DynamicTreeNode = function () {
	      this.aabb = new b2AABB();
	   };
	   b2DynamicTreeNode.prototype.IsLeaf = function () {
	      return this.child1 == null;
	   }
	   b2DynamicTreePair.b2DynamicTreePair = function () {};
	   b2Manifold.b2Manifold = function () {
	      this.m_pointCount = 0;
	   };
	   b2Manifold.prototype.b2Manifold = function () {
	      this.m_points = new Vector(b2Settings.b2_maxManifoldPoints);
	      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
	         this.m_points[i] = new b2ManifoldPoint();
	      }
	      this.m_localPlaneNormal = new b2Vec2();
	      this.m_localPoint = new b2Vec2();
	   }
	   b2Manifold.prototype.Reset = function () {
	      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
	         ((this.m_points[i] instanceof b2ManifoldPoint ? this.m_points[i] : null)).Reset();
	      }
	      this.m_localPlaneNormal.SetZero();
	      this.m_localPoint.SetZero();
	      this.m_type = 0;
	      this.m_pointCount = 0;
	   }
	   b2Manifold.prototype.Set = function (m) {
	      this.m_pointCount = m.m_pointCount;
	      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
	         ((this.m_points[i] instanceof b2ManifoldPoint ? this.m_points[i] : null)).Set(m.m_points[i]);
	      }
	      this.m_localPlaneNormal.SetV(m.m_localPlaneNormal);
	      this.m_localPoint.SetV(m.m_localPoint);
	      this.m_type = m.m_type;
	   }
	   b2Manifold.prototype.Copy = function () {
	      var copy = new b2Manifold();
	      copy.Set(this);
	      return copy;
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Collision.b2Manifold.e_circles = 0x0001;
	      Box2D.Collision.b2Manifold.e_faceA = 0x0002;
	      Box2D.Collision.b2Manifold.e_faceB = 0x0004;
	   });
	   b2ManifoldPoint.b2ManifoldPoint = function () {
	      this.m_localPoint = new b2Vec2();
	      this.m_id = new b2ContactID();
	   };
	   b2ManifoldPoint.prototype.b2ManifoldPoint = function () {
	      this.Reset();
	   }
	   b2ManifoldPoint.prototype.Reset = function () {
	      this.m_localPoint.SetZero();
	      this.m_normalImpulse = 0.0;
	      this.m_tangentImpulse = 0.0;
	      this.m_id.key = 0;
	   }
	   b2ManifoldPoint.prototype.Set = function (m) {
	      this.m_localPoint.SetV(m.m_localPoint);
	      this.m_normalImpulse = m.m_normalImpulse;
	      this.m_tangentImpulse = m.m_tangentImpulse;
	      this.m_id.Set(m.m_id);
	   }
	   b2Point.b2Point = function () {
	      this.p = new b2Vec2();
	   };
	   b2Point.prototype.Support = function (xf, vX, vY) {
	      if (vX === undefined) vX = 0;
	      if (vY === undefined) vY = 0;
	      return this.p;
	   }
	   b2Point.prototype.GetFirstVertex = function (xf) {
	      return this.p;
	   }
	   b2RayCastInput.b2RayCastInput = function () {
	      this.p1 = new b2Vec2();
	      this.p2 = new b2Vec2();
	   };
	   b2RayCastInput.prototype.b2RayCastInput = function (p1, p2, maxFraction) {
	      if (p1 === undefined) p1 = null;
	      if (p2 === undefined) p2 = null;
	      if (maxFraction === undefined) maxFraction = 1;
	      if (p1) this.p1.SetV(p1);
	      if (p2) this.p2.SetV(p2);
	      this.maxFraction = maxFraction;
	   }
	   b2RayCastOutput.b2RayCastOutput = function () {
	      this.normal = new b2Vec2();
	   };
	   b2Segment.b2Segment = function () {
	      this.p1 = new b2Vec2();
	      this.p2 = new b2Vec2();
	   };
	   b2Segment.prototype.TestSegment = function (lambda, normal, segment, maxLambda) {
	      if (maxLambda === undefined) maxLambda = 0;
	      var s = segment.p1;
	      var rX = segment.p2.x - s.x;
	      var rY = segment.p2.y - s.y;
	      var dX = this.p2.x - this.p1.x;
	      var dY = this.p2.y - this.p1.y;
	      var nX = dY;
	      var nY = (-dX);
	      var k_slop = 100.0 * Number.MIN_VALUE;
	      var denom = (-(rX * nX + rY * nY));
	      if (denom > k_slop) {
	         var bX = s.x - this.p1.x;
	         var bY = s.y - this.p1.y;
	         var a = (bX * nX + bY * nY);
	         if (0.0 <= a && a <= maxLambda * denom) {
	            var mu2 = (-rX * bY) + rY * bX;
	            if ((-k_slop * denom) <= mu2 && mu2 <= denom * (1.0 + k_slop)) {
	               a /= denom;
	               var nLen = Math.sqrt(nX * nX + nY * nY);
	               nX /= nLen;
	               nY /= nLen;
	               lambda[0] = a;
	               normal.Set(nX, nY);
	               return true;
	            }
	         }
	      }
	      return false;
	   }
	   b2Segment.prototype.Extend = function (aabb) {
	      this.ExtendForward(aabb);
	      this.ExtendBackward(aabb);
	   }
	   b2Segment.prototype.ExtendForward = function (aabb) {
	      var dX = this.p2.x - this.p1.x;
	      var dY = this.p2.y - this.p1.y;
	      var lambda = Math.min(dX > 0 ? (aabb.upperBound.x - this.p1.x) / dX : dX < 0 ? (aabb.lowerBound.x - this.p1.x) / dX : Number.POSITIVE_INFINITY,
	      dY > 0 ? (aabb.upperBound.y - this.p1.y) / dY : dY < 0 ? (aabb.lowerBound.y - this.p1.y) / dY : Number.POSITIVE_INFINITY);
	      this.p2.x = this.p1.x + dX * lambda;
	      this.p2.y = this.p1.y + dY * lambda;
	   }
	   b2Segment.prototype.ExtendBackward = function (aabb) {
	      var dX = (-this.p2.x) + this.p1.x;
	      var dY = (-this.p2.y) + this.p1.y;
	      var lambda = Math.min(dX > 0 ? (aabb.upperBound.x - this.p2.x) / dX : dX < 0 ? (aabb.lowerBound.x - this.p2.x) / dX : Number.POSITIVE_INFINITY,
	      dY > 0 ? (aabb.upperBound.y - this.p2.y) / dY : dY < 0 ? (aabb.lowerBound.y - this.p2.y) / dY : Number.POSITIVE_INFINITY);
	      this.p1.x = this.p2.x + dX * lambda;
	      this.p1.y = this.p2.y + dY * lambda;
	   }
	   b2SeparationFunction.b2SeparationFunction = function () {
	      this.m_localPoint = new b2Vec2();
	      this.m_axis = new b2Vec2();
	   };
	   b2SeparationFunction.prototype.Initialize = function (cache, proxyA, transformA, proxyB, transformB) {
	      this.m_proxyA = proxyA;
	      this.m_proxyB = proxyB;
	      var count = parseInt(cache.count);
	      b2Settings.b2Assert(0 < count && count < 3);
	      var localPointA;
	      var localPointA1;
	      var localPointA2;
	      var localPointB;
	      var localPointB1;
	      var localPointB2;
	      var pointAX = 0;
	      var pointAY = 0;
	      var pointBX = 0;
	      var pointBY = 0;
	      var normalX = 0;
	      var normalY = 0;
	      var tMat;
	      var tVec;
	      var s = 0;
	      var sgn = 0;
	      if (count == 1) {
	         this.m_type = b2SeparationFunction.e_points;
	         localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
	         localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
	         tVec = localPointA;
	         tMat = transformA.R;
	         pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	         pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	         tVec = localPointB;
	         tMat = transformB.R;
	         pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	         pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	         this.m_axis.x = pointBX - pointAX;
	         this.m_axis.y = pointBY - pointAY;
	         this.m_axis.Normalize();
	      }
	      else if (cache.indexB[0] == cache.indexB[1]) {
	         this.m_type = b2SeparationFunction.e_faceA;
	         localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
	         localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
	         localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
	         this.m_localPoint.x = 0.5 * (localPointA1.x + localPointA2.x);
	         this.m_localPoint.y = 0.5 * (localPointA1.y + localPointA2.y);
	         this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointA2, localPointA1), 1.0);
	         this.m_axis.Normalize();
	         tVec = this.m_axis;
	         tMat = transformA.R;
	         normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	         normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	         tVec = this.m_localPoint;
	         tMat = transformA.R;
	         pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	         pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	         tVec = localPointB;
	         tMat = transformB.R;
	         pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	         pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	         s = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
	         if (s < 0.0) {
	            this.m_axis.NegativeSelf();
	         }
	      }
	      else if (cache.indexA[0] == cache.indexA[0]) {
	         this.m_type = b2SeparationFunction.e_faceB;
	         localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
	         localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
	         localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
	         this.m_localPoint.x = 0.5 * (localPointB1.x + localPointB2.x);
	         this.m_localPoint.y = 0.5 * (localPointB1.y + localPointB2.y);
	         this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointB2, localPointB1), 1.0);
	         this.m_axis.Normalize();
	         tVec = this.m_axis;
	         tMat = transformB.R;
	         normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	         normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	         tVec = this.m_localPoint;
	         tMat = transformB.R;
	         pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	         pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	         tVec = localPointA;
	         tMat = transformA.R;
	         pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	         pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	         s = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
	         if (s < 0.0) {
	            this.m_axis.NegativeSelf();
	         }
	      }
	      else {
	         localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
	         localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
	         localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
	         localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
	         var pA = b2Math.MulX(transformA, localPointA);
	         var dA = b2Math.MulMV(transformA.R, b2Math.SubtractVV(localPointA2, localPointA1));
	         var pB = b2Math.MulX(transformB, localPointB);
	         var dB = b2Math.MulMV(transformB.R, b2Math.SubtractVV(localPointB2, localPointB1));
	         var a = dA.x * dA.x + dA.y * dA.y;
	         var e = dB.x * dB.x + dB.y * dB.y;
	         var r = b2Math.SubtractVV(dB, dA);
	         var c = dA.x * r.x + dA.y * r.y;
	         var f = dB.x * r.x + dB.y * r.y;
	         var b = dA.x * dB.x + dA.y * dB.y;
	         var denom = a * e - b * b;
	         s = 0.0;
	         if (denom != 0.0) {
	            s = b2Math.Clamp((b * f - c * e) / denom, 0.0, 1.0);
	         }
	         var t = (b * s + f) / e;
	         if (t < 0.0) {
	            t = 0.0;
	            s = b2Math.Clamp((b - c) / a, 0.0, 1.0);
	         }
	         localPointA = new b2Vec2();
	         localPointA.x = localPointA1.x + s * (localPointA2.x - localPointA1.x);
	         localPointA.y = localPointA1.y + s * (localPointA2.y - localPointA1.y);
	         localPointB = new b2Vec2();
	         localPointB.x = localPointB1.x + s * (localPointB2.x - localPointB1.x);
	         localPointB.y = localPointB1.y + s * (localPointB2.y - localPointB1.y);
	         if (s == 0.0 || s == 1.0) {
	            this.m_type = b2SeparationFunction.e_faceB;
	            this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointB2, localPointB1), 1.0);
	            this.m_axis.Normalize();
	            this.m_localPoint = localPointB;
	            tVec = this.m_axis;
	            tMat = transformB.R;
	            normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	            normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	            tVec = this.m_localPoint;
	            tMat = transformB.R;
	            pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	            pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	            tVec = localPointA;
	            tMat = transformA.R;
	            pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	            pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	            sgn = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
	            if (s < 0.0) {
	               this.m_axis.NegativeSelf();
	            }
	         }
	         else {
	            this.m_type = b2SeparationFunction.e_faceA;
	            this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointA2, localPointA1), 1.0);
	            this.m_localPoint = localPointA;
	            tVec = this.m_axis;
	            tMat = transformA.R;
	            normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	            normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	            tVec = this.m_localPoint;
	            tMat = transformA.R;
	            pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	            pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	            tVec = localPointB;
	            tMat = transformB.R;
	            pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	            pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	            sgn = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
	            if (s < 0.0) {
	               this.m_axis.NegativeSelf();
	            }
	         }
	      }
	   }
	   b2SeparationFunction.prototype.Evaluate = function (transformA, transformB) {
	      var axisA;
	      var axisB;
	      var localPointA;
	      var localPointB;
	      var pointA;
	      var pointB;
	      var seperation = 0;
	      var normal;
	      switch (this.m_type) {
	      case b2SeparationFunction.e_points:
	         {
	            axisA = b2Math.MulTMV(transformA.R, this.m_axis);
	            axisB = b2Math.MulTMV(transformB.R, this.m_axis.GetNegative());
	            localPointA = this.m_proxyA.GetSupportVertex(axisA);
	            localPointB = this.m_proxyB.GetSupportVertex(axisB);
	            pointA = b2Math.MulX(transformA, localPointA);
	            pointB = b2Math.MulX(transformB, localPointB);
	            seperation = (pointB.x - pointA.x) * this.m_axis.x + (pointB.y - pointA.y) * this.m_axis.y;
	            return seperation;
	         }
	      case b2SeparationFunction.e_faceA:
	         {
	            normal = b2Math.MulMV(transformA.R, this.m_axis);
	            pointA = b2Math.MulX(transformA, this.m_localPoint);
	            axisB = b2Math.MulTMV(transformB.R, normal.GetNegative());
	            localPointB = this.m_proxyB.GetSupportVertex(axisB);
	            pointB = b2Math.MulX(transformB, localPointB);
	            seperation = (pointB.x - pointA.x) * normal.x + (pointB.y - pointA.y) * normal.y;
	            return seperation;
	         }
	      case b2SeparationFunction.e_faceB:
	         {
	            normal = b2Math.MulMV(transformB.R, this.m_axis);
	            pointB = b2Math.MulX(transformB, this.m_localPoint);
	            axisA = b2Math.MulTMV(transformA.R, normal.GetNegative());
	            localPointA = this.m_proxyA.GetSupportVertex(axisA);
	            pointA = b2Math.MulX(transformA, localPointA);
	            seperation = (pointA.x - pointB.x) * normal.x + (pointA.y - pointB.y) * normal.y;
	            return seperation;
	         }
	      default:
	         b2Settings.b2Assert(false);
	         return 0.0;
	      }
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Collision.b2SeparationFunction.e_points = 0x01;
	      Box2D.Collision.b2SeparationFunction.e_faceA = 0x02;
	      Box2D.Collision.b2SeparationFunction.e_faceB = 0x04;
	   });
	   b2Simplex.b2Simplex = function () {
	      this.m_v1 = new b2SimplexVertex();
	      this.m_v2 = new b2SimplexVertex();
	      this.m_v3 = new b2SimplexVertex();
	      this.m_vertices = new Vector(3);
	   };
	   b2Simplex.prototype.b2Simplex = function () {
	      this.m_vertices[0] = this.m_v1;
	      this.m_vertices[1] = this.m_v2;
	      this.m_vertices[2] = this.m_v3;
	   }
	   b2Simplex.prototype.ReadCache = function (cache, proxyA, transformA, proxyB, transformB) {
	      b2Settings.b2Assert(0 <= cache.count && cache.count <= 3);
	      var wALocal;
	      var wBLocal;
	      this.m_count = cache.count;
	      var vertices = this.m_vertices;
	      for (var i = 0; i < this.m_count; i++) {
	         var v = vertices[i];
	         v.indexA = cache.indexA[i];
	         v.indexB = cache.indexB[i];
	         wALocal = proxyA.GetVertex(v.indexA);
	         wBLocal = proxyB.GetVertex(v.indexB);
	         v.wA = b2Math.MulX(transformA, wALocal);
	         v.wB = b2Math.MulX(transformB, wBLocal);
	         v.w = b2Math.SubtractVV(v.wB, v.wA);
	         v.a = 0;
	      }
	      if (this.m_count > 1) {
	         var metric1 = cache.metric;
	         var metric2 = this.GetMetric();
	         if (metric2 < .5 * metric1 || 2.0 * metric1 < metric2 || metric2 < Number.MIN_VALUE) {
	            this.m_count = 0;
	         }
	      }
	      if (this.m_count == 0) {
	         v = vertices[0];
	         v.indexA = 0;
	         v.indexB = 0;
	         wALocal = proxyA.GetVertex(0);
	         wBLocal = proxyB.GetVertex(0);
	         v.wA = b2Math.MulX(transformA, wALocal);
	         v.wB = b2Math.MulX(transformB, wBLocal);
	         v.w = b2Math.SubtractVV(v.wB, v.wA);
	         this.m_count = 1;
	      }
	   }
	   b2Simplex.prototype.WriteCache = function (cache) {
	      cache.metric = this.GetMetric();
	      cache.count = Box2D.parseUInt(this.m_count);
	      var vertices = this.m_vertices;
	      for (var i = 0; i < this.m_count; i++) {
	         cache.indexA[i] = Box2D.parseUInt(vertices[i].indexA);
	         cache.indexB[i] = Box2D.parseUInt(vertices[i].indexB);
	      }
	   }
	   b2Simplex.prototype.GetSearchDirection = function () {
	      switch (this.m_count) {
	      case 1:
	         return this.m_v1.w.GetNegative();
	      case 2:
	         {
	            var e12 = b2Math.SubtractVV(this.m_v2.w, this.m_v1.w);
	            var sgn = b2Math.CrossVV(e12, this.m_v1.w.GetNegative());
	            if (sgn > 0.0) {
	               return b2Math.CrossFV(1.0, e12);
	            }
	            else {
	               return b2Math.CrossVF(e12, 1.0);
	            }
	         }
	      default:
	         b2Settings.b2Assert(false);
	         return new b2Vec2();
	      }
	   }
	   b2Simplex.prototype.GetClosestPoint = function () {
	      switch (this.m_count) {
	      case 0:
	         b2Settings.b2Assert(false);
	         return new b2Vec2();
	      case 1:
	         return this.m_v1.w;
	      case 2:
	         return new b2Vec2(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
	      default:
	         b2Settings.b2Assert(false);
	         return new b2Vec2();
	      }
	   }
	   b2Simplex.prototype.GetWitnessPoints = function (pA, pB) {
	      switch (this.m_count) {
	      case 0:
	         b2Settings.b2Assert(false);
	         break;
	      case 1:
	         pA.SetV(this.m_v1.wA);
	         pB.SetV(this.m_v1.wB);
	         break;
	      case 2:
	         pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
	         pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
	         pB.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
	         pB.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
	         break;
	      case 3:
	         pB.x = pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
	         pB.y = pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
	         break;
	      default:
	         b2Settings.b2Assert(false);
	         break;
	      }
	   }
	   b2Simplex.prototype.GetMetric = function () {
	      switch (this.m_count) {
	      case 0:
	         b2Settings.b2Assert(false);
	         return 0.0;
	      case 1:
	         return 0.0;
	      case 2:
	         return b2Math.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
	      case 3:
	         return b2Math.CrossVV(b2Math.SubtractVV(this.m_v2.w, this.m_v1.w), b2Math.SubtractVV(this.m_v3.w, this.m_v1.w));
	      default:
	         b2Settings.b2Assert(false);
	         return 0.0;
	      }
	   }
	   b2Simplex.prototype.Solve2 = function () {
	      var w1 = this.m_v1.w;
	      var w2 = this.m_v2.w;
	      var e12 = b2Math.SubtractVV(w2, w1);
	      var d12_2 = (-(w1.x * e12.x + w1.y * e12.y));
	      if (d12_2 <= 0.0) {
	         this.m_v1.a = 1.0;
	         this.m_count = 1;
	         return;
	      }
	      var d12_1 = (w2.x * e12.x + w2.y * e12.y);
	      if (d12_1 <= 0.0) {
	         this.m_v2.a = 1.0;
	         this.m_count = 1;
	         this.m_v1.Set(this.m_v2);
	         return;
	      }
	      var inv_d12 = 1.0 / (d12_1 + d12_2);
	      this.m_v1.a = d12_1 * inv_d12;
	      this.m_v2.a = d12_2 * inv_d12;
	      this.m_count = 2;
	   }
	   b2Simplex.prototype.Solve3 = function () {
	      var w1 = this.m_v1.w;
	      var w2 = this.m_v2.w;
	      var w3 = this.m_v3.w;
	      var e12 = b2Math.SubtractVV(w2, w1);
	      var w1e12 = b2Math.Dot(w1, e12);
	      var w2e12 = b2Math.Dot(w2, e12);
	      var d12_1 = w2e12;
	      var d12_2 = (-w1e12);
	      var e13 = b2Math.SubtractVV(w3, w1);
	      var w1e13 = b2Math.Dot(w1, e13);
	      var w3e13 = b2Math.Dot(w3, e13);
	      var d13_1 = w3e13;
	      var d13_2 = (-w1e13);
	      var e23 = b2Math.SubtractVV(w3, w2);
	      var w2e23 = b2Math.Dot(w2, e23);
	      var w3e23 = b2Math.Dot(w3, e23);
	      var d23_1 = w3e23;
	      var d23_2 = (-w2e23);
	      var n123 = b2Math.CrossVV(e12, e13);
	      var d123_1 = n123 * b2Math.CrossVV(w2, w3);
	      var d123_2 = n123 * b2Math.CrossVV(w3, w1);
	      var d123_3 = n123 * b2Math.CrossVV(w1, w2);
	      if (d12_2 <= 0.0 && d13_2 <= 0.0) {
	         this.m_v1.a = 1.0;
	         this.m_count = 1;
	         return;
	      }
	      if (d12_1 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
	         var inv_d12 = 1.0 / (d12_1 + d12_2);
	         this.m_v1.a = d12_1 * inv_d12;
	         this.m_v2.a = d12_2 * inv_d12;
	         this.m_count = 2;
	         return;
	      }
	      if (d13_1 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
	         var inv_d13 = 1.0 / (d13_1 + d13_2);
	         this.m_v1.a = d13_1 * inv_d13;
	         this.m_v3.a = d13_2 * inv_d13;
	         this.m_count = 2;
	         this.m_v2.Set(this.m_v3);
	         return;
	      }
	      if (d12_1 <= 0.0 && d23_2 <= 0.0) {
	         this.m_v2.a = 1.0;
	         this.m_count = 1;
	         this.m_v1.Set(this.m_v2);
	         return;
	      }
	      if (d13_1 <= 0.0 && d23_1 <= 0.0) {
	         this.m_v3.a = 1.0;
	         this.m_count = 1;
	         this.m_v1.Set(this.m_v3);
	         return;
	      }
	      if (d23_1 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
	         var inv_d23 = 1.0 / (d23_1 + d23_2);
	         this.m_v2.a = d23_1 * inv_d23;
	         this.m_v3.a = d23_2 * inv_d23;
	         this.m_count = 2;
	         this.m_v1.Set(this.m_v3);
	         return;
	      }
	      var inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
	      this.m_v1.a = d123_1 * inv_d123;
	      this.m_v2.a = d123_2 * inv_d123;
	      this.m_v3.a = d123_3 * inv_d123;
	      this.m_count = 3;
	   }
	   b2SimplexCache.b2SimplexCache = function () {
	      this.indexA = new Vector_a2j_Number(3);
	      this.indexB = new Vector_a2j_Number(3);
	   };
	   b2SimplexVertex.b2SimplexVertex = function () {};
	   b2SimplexVertex.prototype.Set = function (other) {
	      this.wA.SetV(other.wA);
	      this.wB.SetV(other.wB);
	      this.w.SetV(other.w);
	      this.a = other.a;
	      this.indexA = other.indexA;
	      this.indexB = other.indexB;
	   }
	   b2TimeOfImpact.b2TimeOfImpact = function () {};
	   b2TimeOfImpact.TimeOfImpact = function (input) {
	      ++b2TimeOfImpact.b2_toiCalls;
	      var proxyA = input.proxyA;
	      var proxyB = input.proxyB;
	      var sweepA = input.sweepA;
	      var sweepB = input.sweepB;
	      b2Settings.b2Assert(sweepA.t0 == sweepB.t0);
	      b2Settings.b2Assert(1.0 - sweepA.t0 > Number.MIN_VALUE);
	      var radius = proxyA.m_radius + proxyB.m_radius;
	      var tolerance = input.tolerance;
	      var alpha = 0.0;
	      var k_maxIterations = 1000;
	      var iter = 0;
	      var target = 0.0;
	      b2TimeOfImpact.s_cache.count = 0;
	      b2TimeOfImpact.s_distanceInput.useRadii = false;
	      for (;;) {
	         sweepA.GetTransform(b2TimeOfImpact.s_xfA, alpha);
	         sweepB.GetTransform(b2TimeOfImpact.s_xfB, alpha);
	         b2TimeOfImpact.s_distanceInput.proxyA = proxyA;
	         b2TimeOfImpact.s_distanceInput.proxyB = proxyB;
	         b2TimeOfImpact.s_distanceInput.transformA = b2TimeOfImpact.s_xfA;
	         b2TimeOfImpact.s_distanceInput.transformB = b2TimeOfImpact.s_xfB;
	         b2Distance.Distance(b2TimeOfImpact.s_distanceOutput, b2TimeOfImpact.s_cache, b2TimeOfImpact.s_distanceInput);
	         if (b2TimeOfImpact.s_distanceOutput.distance <= 0.0) {
	            alpha = 1.0;
	            break;
	         }
	         b2TimeOfImpact.s_fcn.Initialize(b2TimeOfImpact.s_cache, proxyA, b2TimeOfImpact.s_xfA, proxyB, b2TimeOfImpact.s_xfB);
	         var separation = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
	         if (separation <= 0.0) {
	            alpha = 1.0;
	            break;
	         }
	         if (iter == 0) {
	            if (separation > radius) {
	               target = b2Math.Max(radius - tolerance, 0.75 * radius);
	            }
	            else {
	               target = b2Math.Max(separation - tolerance, 0.02 * radius);
	            }
	         }
	         if (separation - target < 0.5 * tolerance) {
	            if (iter == 0) {
	               alpha = 1.0;
	               break;
	            }
	            break;
	         }
	         var newAlpha = alpha; {
	            var x1 = alpha;
	            var x2 = 1.0;
	            var f1 = separation;
	            sweepA.GetTransform(b2TimeOfImpact.s_xfA, x2);
	            sweepB.GetTransform(b2TimeOfImpact.s_xfB, x2);
	            var f2 = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
	            if (f2 >= target) {
	               alpha = 1.0;
	               break;
	            }
	            var rootIterCount = 0;
	            for (;;) {
	               var x = 0;
	               if (rootIterCount & 1) {
	                  x = x1 + (target - f1) * (x2 - x1) / (f2 - f1);
	               }
	               else {
	                  x = 0.5 * (x1 + x2);
	               }
	               sweepA.GetTransform(b2TimeOfImpact.s_xfA, x);
	               sweepB.GetTransform(b2TimeOfImpact.s_xfB, x);
	               var f = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
	               if (b2Math.Abs(f - target) < 0.025 * tolerance) {
	                  newAlpha = x;
	                  break;
	               }
	               if (f > target) {
	                  x1 = x;
	                  f1 = f;
	               }
	               else {
	                  x2 = x;
	                  f2 = f;
	               }++rootIterCount;
	               ++b2TimeOfImpact.b2_toiRootIters;
	               if (rootIterCount == 50) {
	                  break;
	               }
	            }
	            b2TimeOfImpact.b2_toiMaxRootIters = b2Math.Max(b2TimeOfImpact.b2_toiMaxRootIters, rootIterCount);
	         }
	         if (newAlpha < (1.0 + 100.0 * Number.MIN_VALUE) * alpha) {
	            break;
	         }
	         alpha = newAlpha;
	         iter++;
	         ++b2TimeOfImpact.b2_toiIters;
	         if (iter == k_maxIterations) {
	            break;
	         }
	      }
	      b2TimeOfImpact.b2_toiMaxIters = b2Math.Max(b2TimeOfImpact.b2_toiMaxIters, iter);
	      return alpha;
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0;
	      Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0;
	      Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0;
	      Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0;
	      Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0;
	      Box2D.Collision.b2TimeOfImpact.s_cache = new b2SimplexCache();
	      Box2D.Collision.b2TimeOfImpact.s_distanceInput = new b2DistanceInput();
	      Box2D.Collision.b2TimeOfImpact.s_xfA = new b2Transform();
	      Box2D.Collision.b2TimeOfImpact.s_xfB = new b2Transform();
	      Box2D.Collision.b2TimeOfImpact.s_fcn = new b2SeparationFunction();
	      Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new b2DistanceOutput();
	   });
	   b2TOIInput.b2TOIInput = function () {
	      this.proxyA = new b2DistanceProxy();
	      this.proxyB = new b2DistanceProxy();
	      this.sweepA = new b2Sweep();
	      this.sweepB = new b2Sweep();
	   };
	   b2WorldManifold.b2WorldManifold = function () {
	      this.m_normal = new b2Vec2();
	   };
	   b2WorldManifold.prototype.b2WorldManifold = function () {
	      this.m_points = new Vector(b2Settings.b2_maxManifoldPoints);
	      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
	         this.m_points[i] = new b2Vec2();
	      }
	   }
	   b2WorldManifold.prototype.Initialize = function (manifold, xfA, radiusA, xfB, radiusB) {
	      if (radiusA === undefined) radiusA = 0;
	      if (radiusB === undefined) radiusB = 0;
	      if (manifold.m_pointCount == 0) {
	         return;
	      }
	      var i = 0;
	      var tVec;
	      var tMat;
	      var normalX = 0;
	      var normalY = 0;
	      var planePointX = 0;
	      var planePointY = 0;
	      var clipPointX = 0;
	      var clipPointY = 0;
	      switch (manifold.m_type) {
	      case b2Manifold.e_circles:
	         {
	            tMat = xfA.R;
	            tVec = manifold.m_localPoint;
	            var pointAX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	            var pointAY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	            tMat = xfB.R;
	            tVec = manifold.m_points[0].m_localPoint;
	            var pointBX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	            var pointBY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	            var dX = pointBX - pointAX;
	            var dY = pointBY - pointAY;
	            var d2 = dX * dX + dY * dY;
	            if (d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
	               var d = Math.sqrt(d2);
	               this.m_normal.x = dX / d;
	               this.m_normal.y = dY / d;
	            }
	            else {
	               this.m_normal.x = 1;
	               this.m_normal.y = 0;
	            }
	            var cAX = pointAX + radiusA * this.m_normal.x;
	            var cAY = pointAY + radiusA * this.m_normal.y;
	            var cBX = pointBX - radiusB * this.m_normal.x;
	            var cBY = pointBY - radiusB * this.m_normal.y;
	            this.m_points[0].x = 0.5 * (cAX + cBX);
	            this.m_points[0].y = 0.5 * (cAY + cBY);
	         }
	         break;
	      case b2Manifold.e_faceA:
	         {
	            tMat = xfA.R;
	            tVec = manifold.m_localPlaneNormal;
	            normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	            normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	            tMat = xfA.R;
	            tVec = manifold.m_localPoint;
	            planePointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	            planePointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	            this.m_normal.x = normalX;
	            this.m_normal.y = normalY;
	            for (i = 0;
	            i < manifold.m_pointCount; i++) {
	               tMat = xfB.R;
	               tVec = manifold.m_points[i].m_localPoint;
	               clipPointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	               clipPointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	               this.m_points[i].x = clipPointX + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalX;
	               this.m_points[i].y = clipPointY + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalY;
	            }
	         }
	         break;
	      case b2Manifold.e_faceB:
	         {
	            tMat = xfB.R;
	            tVec = manifold.m_localPlaneNormal;
	            normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	            normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	            tMat = xfB.R;
	            tVec = manifold.m_localPoint;
	            planePointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	            planePointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	            this.m_normal.x = (-normalX);
	            this.m_normal.y = (-normalY);
	            for (i = 0;
	            i < manifold.m_pointCount; i++) {
	               tMat = xfA.R;
	               tVec = manifold.m_points[i].m_localPoint;
	               clipPointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	               clipPointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	               this.m_points[i].x = clipPointX + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalX;
	               this.m_points[i].y = clipPointY + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalY;
	            }
	         }
	         break;
	      }
	   }
	   ClipVertex.ClipVertex = function () {
	      this.v = new b2Vec2();
	      this.id = new b2ContactID();
	   };
	   ClipVertex.prototype.Set = function (other) {
	      this.v.SetV(other.v);
	      this.id.Set(other.id);
	   }
	   Features.Features = function () {};
	   Object.defineProperty(Features.prototype, 'referenceEdge', {
	      enumerable: false,
	      configurable: true,
	      get: function () {
	         return this._referenceEdge;
	      }
	   });
	   Object.defineProperty(Features.prototype, 'referenceEdge', {
	      enumerable: false,
	      configurable: true,
	      set: function (value) {
	         if (value === undefined) value = 0;
	         this._referenceEdge = value;
	         this._m_id._key = (this._m_id._key & 0xffffff00) | (this._referenceEdge & 0x000000ff);
	      }
	   });
	   Object.defineProperty(Features.prototype, 'incidentEdge', {
	      enumerable: false,
	      configurable: true,
	      get: function () {
	         return this._incidentEdge;
	      }
	   });
	   Object.defineProperty(Features.prototype, 'incidentEdge', {
	      enumerable: false,
	      configurable: true,
	      set: function (value) {
	         if (value === undefined) value = 0;
	         this._incidentEdge = value;
	         this._m_id._key = (this._m_id._key & 0xffff00ff) | ((this._incidentEdge << 8) & 0x0000ff00);
	      }
	   });
	   Object.defineProperty(Features.prototype, 'incidentVertex', {
	      enumerable: false,
	      configurable: true,
	      get: function () {
	         return this._incidentVertex;
	      }
	   });
	   Object.defineProperty(Features.prototype, 'incidentVertex', {
	      enumerable: false,
	      configurable: true,
	      set: function (value) {
	         if (value === undefined) value = 0;
	         this._incidentVertex = value;
	         this._m_id._key = (this._m_id._key & 0xff00ffff) | ((this._incidentVertex << 16) & 0x00ff0000);
	      }
	   });
	   Object.defineProperty(Features.prototype, 'flip', {
	      enumerable: false,
	      configurable: true,
	      get: function () {
	         return this._flip;
	      }
	   });
	   Object.defineProperty(Features.prototype, 'flip', {
	      enumerable: false,
	      configurable: true,
	      set: function (value) {
	         if (value === undefined) value = 0;
	         this._flip = value;
	         this._m_id._key = (this._m_id._key & 0x00ffffff) | ((this._flip << 24) & 0xff000000);
	      }
	   });
	})();
	(function () {
	   var b2Color = Box2D.Common.b2Color,
	      b2internal = Box2D.Common.b2internal,
	      b2Settings = Box2D.Common.b2Settings,
	      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	      b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
	      b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
	      b2MassData = Box2D.Collision.Shapes.b2MassData,
	      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	      b2Shape = Box2D.Collision.Shapes.b2Shape,
	      b2Mat22 = Box2D.Common.Math.b2Mat22,
	      b2Mat33 = Box2D.Common.Math.b2Mat33,
	      b2Math = Box2D.Common.Math.b2Math,
	      b2Sweep = Box2D.Common.Math.b2Sweep,
	      b2Transform = Box2D.Common.Math.b2Transform,
	      b2Vec2 = Box2D.Common.Math.b2Vec2,
	      b2Vec3 = Box2D.Common.Math.b2Vec3,
	      b2Body = Box2D.Dynamics.b2Body,
	      b2BodyDef = Box2D.Dynamics.b2BodyDef,
	      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
	      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
	      b2ContactListener = Box2D.Dynamics.b2ContactListener,
	      b2ContactManager = Box2D.Dynamics.b2ContactManager,
	      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
	      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
	      b2FilterData = Box2D.Dynamics.b2FilterData,
	      b2Fixture = Box2D.Dynamics.b2Fixture,
	      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	      b2Island = Box2D.Dynamics.b2Island,
	      b2TimeStep = Box2D.Dynamics.b2TimeStep,
	      b2World = Box2D.Dynamics.b2World,
	      b2AABB = Box2D.Collision.b2AABB,
	      b2Bound = Box2D.Collision.b2Bound,
	      b2BoundValues = Box2D.Collision.b2BoundValues,
	      b2Collision = Box2D.Collision.b2Collision,
	      b2ContactID = Box2D.Collision.b2ContactID,
	      b2ContactPoint = Box2D.Collision.b2ContactPoint,
	      b2Distance = Box2D.Collision.b2Distance,
	      b2DistanceInput = Box2D.Collision.b2DistanceInput,
	      b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
	      b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
	      b2DynamicTree = Box2D.Collision.b2DynamicTree,
	      b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
	      b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
	      b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
	      b2Manifold = Box2D.Collision.b2Manifold,
	      b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
	      b2Point = Box2D.Collision.b2Point,
	      b2RayCastInput = Box2D.Collision.b2RayCastInput,
	      b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
	      b2Segment = Box2D.Collision.b2Segment,
	      b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
	      b2Simplex = Box2D.Collision.b2Simplex,
	      b2SimplexCache = Box2D.Collision.b2SimplexCache,
	      b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
	      b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
	      b2TOIInput = Box2D.Collision.b2TOIInput,
	      b2WorldManifold = Box2D.Collision.b2WorldManifold,
	      ClipVertex = Box2D.Collision.ClipVertex,
	      Features = Box2D.Collision.Features,
	      IBroadPhase = Box2D.Collision.IBroadPhase;
	
	   Box2D.inherit(b2CircleShape, Box2D.Collision.Shapes.b2Shape);
	   b2CircleShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
	   b2CircleShape.b2CircleShape = function () {
	      Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
	      this.m_p = new b2Vec2();
	   };
	   b2CircleShape.prototype.Copy = function () {
	      var s = new b2CircleShape();
	      s.Set(this);
	      return s;
	   }
	   b2CircleShape.prototype.Set = function (other) {
	      this.__super.Set.call(this, other);
	      if (Box2D.is(other, b2CircleShape)) {
	         var other2 = (other instanceof b2CircleShape ? other : null);
	         this.m_p.SetV(other2.m_p);
	      }
	   }
	   b2CircleShape.prototype.TestPoint = function (transform, p) {
	      var tMat = transform.R;
	      var dX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
	      var dY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
	      dX = p.x - dX;
	      dY = p.y - dY;
	      return (dX * dX + dY * dY) <= this.m_radius * this.m_radius;
	   }
	   b2CircleShape.prototype.RayCast = function (output, input, transform) {
	      var tMat = transform.R;
	      var positionX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
	      var positionY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
	      var sX = input.p1.x - positionX;
	      var sY = input.p1.y - positionY;
	      var b = (sX * sX + sY * sY) - this.m_radius * this.m_radius;
	      var rX = input.p2.x - input.p1.x;
	      var rY = input.p2.y - input.p1.y;
	      var c = (sX * rX + sY * rY);
	      var rr = (rX * rX + rY * rY);
	      var sigma = c * c - rr * b;
	      if (sigma < 0.0 || rr < Number.MIN_VALUE) {
	         return false;
	      }
	      var a = (-(c + Math.sqrt(sigma)));
	      if (0.0 <= a && a <= input.maxFraction * rr) {
	         a /= rr;
	         output.fraction = a;
	         output.normal.x = sX + a * rX;
	         output.normal.y = sY + a * rY;
	         output.normal.Normalize();
	         return true;
	      }
	      return false;
	   }
	   b2CircleShape.prototype.ComputeAABB = function (aabb, transform) {
	      var tMat = transform.R;
	      var pX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
	      var pY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
	      aabb.lowerBound.Set(pX - this.m_radius, pY - this.m_radius);
	      aabb.upperBound.Set(pX + this.m_radius, pY + this.m_radius);
	   }
	   b2CircleShape.prototype.ComputeMass = function (massData, density) {
	      if (density === undefined) density = 0;
	      massData.mass = density * b2Settings.b2_pi * this.m_radius * this.m_radius;
	      massData.center.SetV(this.m_p);
	      massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y));
	   }
	   b2CircleShape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
	      if (offset === undefined) offset = 0;
	      var p = b2Math.MulX(xf, this.m_p);
	      var l = (-(b2Math.Dot(normal, p) - offset));
	      if (l < (-this.m_radius) + Number.MIN_VALUE) {
	         return 0;
	      }
	      if (l > this.m_radius) {
	         c.SetV(p);
	         return Math.PI * this.m_radius * this.m_radius;
	      }
	      var r2 = this.m_radius * this.m_radius;
	      var l2 = l * l;
	      var area = r2 * (Math.asin(l / this.m_radius) + Math.PI / 2) + l * Math.sqrt(r2 - l2);
	      var com = (-2 / 3 * Math.pow(r2 - l2, 1.5) / area);
	      c.x = p.x + normal.x * com;
	      c.y = p.y + normal.y * com;
	      return area;
	   }
	   b2CircleShape.prototype.GetLocalPosition = function () {
	      return this.m_p;
	   }
	   b2CircleShape.prototype.SetLocalPosition = function (position) {
	      this.m_p.SetV(position);
	   }
	   b2CircleShape.prototype.GetRadius = function () {
	      return this.m_radius;
	   }
	   b2CircleShape.prototype.SetRadius = function (radius) {
	      if (radius === undefined) radius = 0;
	      this.m_radius = radius;
	   }
	   b2CircleShape.prototype.b2CircleShape = function (radius) {
	      if (radius === undefined) radius = 0;
	      this.__super.b2Shape.call(this);
	      this.m_type = b2Shape.e_circleShape;
	      this.m_radius = radius;
	   }
	   b2EdgeChainDef.b2EdgeChainDef = function () {};
	   b2EdgeChainDef.prototype.b2EdgeChainDef = function () {
	      this.vertexCount = 0;
	      this.isALoop = true;
	      this.vertices = [];
	   }
	   Box2D.inherit(b2EdgeShape, Box2D.Collision.Shapes.b2Shape);
	   b2EdgeShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
	   b2EdgeShape.b2EdgeShape = function () {
	      Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
	      this.s_supportVec = new b2Vec2();
	      this.m_v1 = new b2Vec2();
	      this.m_v2 = new b2Vec2();
	      this.m_coreV1 = new b2Vec2();
	      this.m_coreV2 = new b2Vec2();
	      this.m_normal = new b2Vec2();
	      this.m_direction = new b2Vec2();
	      this.m_cornerDir1 = new b2Vec2();
	      this.m_cornerDir2 = new b2Vec2();
	   };
	   b2EdgeShape.prototype.TestPoint = function (transform, p) {
	      return false;
	   }
	   b2EdgeShape.prototype.RayCast = function (output, input, transform) {
	      var tMat;
	      var rX = input.p2.x - input.p1.x;
	      var rY = input.p2.y - input.p1.y;
	      tMat = transform.R;
	      var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
	      var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
	      var nX = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y) - v1Y;
	      var nY = (-(transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y) - v1X));
	      var k_slop = 100.0 * Number.MIN_VALUE;
	      var denom = (-(rX * nX + rY * nY));
	      if (denom > k_slop) {
	         var bX = input.p1.x - v1X;
	         var bY = input.p1.y - v1Y;
	         var a = (bX * nX + bY * nY);
	         if (0.0 <= a && a <= input.maxFraction * denom) {
	            var mu2 = (-rX * bY) + rY * bX;
	            if ((-k_slop * denom) <= mu2 && mu2 <= denom * (1.0 + k_slop)) {
	               a /= denom;
	               output.fraction = a;
	               var nLen = Math.sqrt(nX * nX + nY * nY);
	               output.normal.x = nX / nLen;
	               output.normal.y = nY / nLen;
	               return true;
	            }
	         }
	      }
	      return false;
	   }
	   b2EdgeShape.prototype.ComputeAABB = function (aabb, transform) {
	      var tMat = transform.R;
	      var v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
	      var v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
	      var v2X = transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y);
	      var v2Y = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y);
	      if (v1X < v2X) {
	         aabb.lowerBound.x = v1X;
	         aabb.upperBound.x = v2X;
	      }
	      else {
	         aabb.lowerBound.x = v2X;
	         aabb.upperBound.x = v1X;
	      }
	      if (v1Y < v2Y) {
	         aabb.lowerBound.y = v1Y;
	         aabb.upperBound.y = v2Y;
	      }
	      else {
	         aabb.lowerBound.y = v2Y;
	         aabb.upperBound.y = v1Y;
	      }
	   }
	   b2EdgeShape.prototype.ComputeMass = function (massData, density) {
	      if (density === undefined) density = 0;
	      massData.mass = 0;
	      massData.center.SetV(this.m_v1);
	      massData.I = 0;
	   }
	   b2EdgeShape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
	      if (offset === undefined) offset = 0;
	      var v0 = new b2Vec2(normal.x * offset, normal.y * offset);
	      var v1 = b2Math.MulX(xf, this.m_v1);
	      var v2 = b2Math.MulX(xf, this.m_v2);
	      var d1 = b2Math.Dot(normal, v1) - offset;
	      var d2 = b2Math.Dot(normal, v2) - offset;
	      if (d1 > 0) {
	         if (d2 > 0) {
	            return 0;
	         }
	         else {
	            v1.x = (-d2 / (d1 - d2) * v1.x) + d1 / (d1 - d2) * v2.x;
	            v1.y = (-d2 / (d1 - d2) * v1.y) + d1 / (d1 - d2) * v2.y;
	         }
	      }
	      else {
	         if (d2 > 0) {
	            v2.x = (-d2 / (d1 - d2) * v1.x) + d1 / (d1 - d2) * v2.x;
	            v2.y = (-d2 / (d1 - d2) * v1.y) + d1 / (d1 - d2) * v2.y;
	         }
	         else {}
	      }
	      c.x = (v0.x + v1.x + v2.x) / 3;
	      c.y = (v0.y + v1.y + v2.y) / 3;
	      return 0.5 * ((v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x));
	   }
	   b2EdgeShape.prototype.GetLength = function () {
	      return this.m_length;
	   }
	   b2EdgeShape.prototype.GetVertex1 = function () {
	      return this.m_v1;
	   }
	   b2EdgeShape.prototype.GetVertex2 = function () {
	      return this.m_v2;
	   }
	   b2EdgeShape.prototype.GetCoreVertex1 = function () {
	      return this.m_coreV1;
	   }
	   b2EdgeShape.prototype.GetCoreVertex2 = function () {
	      return this.m_coreV2;
	   }
	   b2EdgeShape.prototype.GetNormalVector = function () {
	      return this.m_normal;
	   }
	   b2EdgeShape.prototype.GetDirectionVector = function () {
	      return this.m_direction;
	   }
	   b2EdgeShape.prototype.GetCorner1Vector = function () {
	      return this.m_cornerDir1;
	   }
	   b2EdgeShape.prototype.GetCorner2Vector = function () {
	      return this.m_cornerDir2;
	   }
	   b2EdgeShape.prototype.Corner1IsConvex = function () {
	      return this.m_cornerConvex1;
	   }
	   b2EdgeShape.prototype.Corner2IsConvex = function () {
	      return this.m_cornerConvex2;
	   }
	   b2EdgeShape.prototype.GetFirstVertex = function (xf) {
	      var tMat = xf.R;
	      return new b2Vec2(xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y), xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y));
	   }
	   b2EdgeShape.prototype.GetNextEdge = function () {
	      return this.m_nextEdge;
	   }
	   b2EdgeShape.prototype.GetPrevEdge = function () {
	      return this.m_prevEdge;
	   }
	   b2EdgeShape.prototype.Support = function (xf, dX, dY) {
	      if (dX === undefined) dX = 0;
	      if (dY === undefined) dY = 0;
	      var tMat = xf.R;
	      var v1X = xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y);
	      var v1Y = xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y);
	      var v2X = xf.position.x + (tMat.col1.x * this.m_coreV2.x + tMat.col2.x * this.m_coreV2.y);
	      var v2Y = xf.position.y + (tMat.col1.y * this.m_coreV2.x + tMat.col2.y * this.m_coreV2.y);
	      if ((v1X * dX + v1Y * dY) > (v2X * dX + v2Y * dY)) {
	         this.s_supportVec.x = v1X;
	         this.s_supportVec.y = v1Y;
	      }
	      else {
	         this.s_supportVec.x = v2X;
	         this.s_supportVec.y = v2Y;
	      }
	      return this.s_supportVec;
	   }
	   b2EdgeShape.prototype.b2EdgeShape = function (v1, v2) {
	      this.__super.b2Shape.call(this);
	      this.m_type = b2Shape.e_edgeShape;
	      this.m_prevEdge = null;
	      this.m_nextEdge = null;
	      this.m_v1 = v1;
	      this.m_v2 = v2;
	      this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y);
	      this.m_length = this.m_direction.Normalize();
	      this.m_normal.Set(this.m_direction.y, (-this.m_direction.x));
	      this.m_coreV1.Set((-b2Settings.b2_toiSlop * (this.m_normal.x - this.m_direction.x)) + this.m_v1.x, (-b2Settings.b2_toiSlop * (this.m_normal.y - this.m_direction.y)) + this.m_v1.y);
	      this.m_coreV2.Set((-b2Settings.b2_toiSlop * (this.m_normal.x + this.m_direction.x)) + this.m_v2.x, (-b2Settings.b2_toiSlop * (this.m_normal.y + this.m_direction.y)) + this.m_v2.y);
	      this.m_cornerDir1 = this.m_normal;
	      this.m_cornerDir2.Set((-this.m_normal.x), (-this.m_normal.y));
	   }
	   b2EdgeShape.prototype.SetPrevEdge = function (edge, core, cornerDir, convex) {
	      this.m_prevEdge = edge;
	      this.m_coreV1 = core;
	      this.m_cornerDir1 = cornerDir;
	      this.m_cornerConvex1 = convex;
	   }
	   b2EdgeShape.prototype.SetNextEdge = function (edge, core, cornerDir, convex) {
	      this.m_nextEdge = edge;
	      this.m_coreV2 = core;
	      this.m_cornerDir2 = cornerDir;
	      this.m_cornerConvex2 = convex;
	   }
	   b2MassData.b2MassData = function () {
	      this.mass = 0.0;
	      this.center = new b2Vec2(0, 0);
	      this.I = 0.0;
	   };
	   Box2D.inherit(b2PolygonShape, Box2D.Collision.Shapes.b2Shape);
	   b2PolygonShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
	   b2PolygonShape.b2PolygonShape = function () {
	      Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
	   };
	   b2PolygonShape.prototype.Copy = function () {
	      var s = new b2PolygonShape();
	      s.Set(this);
	      return s;
	   }
	   b2PolygonShape.prototype.Set = function (other) {
	      this.__super.Set.call(this, other);
	      if (Box2D.is(other, b2PolygonShape)) {
	         var other2 = (other instanceof b2PolygonShape ? other : null);
	         this.m_centroid.SetV(other2.m_centroid);
	         this.m_vertexCount = other2.m_vertexCount;
	         this.Reserve(this.m_vertexCount);
	         for (var i = 0; i < this.m_vertexCount; i++) {
	            this.m_vertices[i].SetV(other2.m_vertices[i]);
	            this.m_normals[i].SetV(other2.m_normals[i]);
	         }
	      }
	   }
	   b2PolygonShape.prototype.SetAsArray = function (vertices, vertexCount) {
	      if (vertexCount === undefined) vertexCount = 0;
	      var v = new Vector();
	      var i = 0,
	         tVec;
	      for (i = 0;
	      i < vertices.length; ++i) {
	         tVec = vertices[i];
	         v.push(tVec);
	      }
	      this.SetAsVector(v, vertexCount);
	   }
	   b2PolygonShape.AsArray = function (vertices, vertexCount) {
	      if (vertexCount === undefined) vertexCount = 0;
	      var polygonShape = new b2PolygonShape();
	      polygonShape.SetAsArray(vertices, vertexCount);
	      return polygonShape;
	   }
	   b2PolygonShape.prototype.SetAsVector = function (vertices, vertexCount) {
	      if (vertexCount === undefined) vertexCount = 0;
	      if (vertexCount == 0) vertexCount = vertices.length;
	      b2Settings.b2Assert(2 <= vertexCount);
	      this.m_vertexCount = vertexCount;
	      this.Reserve(vertexCount);
	      var i = 0;
	      for (i = 0;
	      i < this.m_vertexCount; i++) {
	         this.m_vertices[i].SetV(vertices[i]);
	      }
	      for (i = 0;
	      i < this.m_vertexCount; ++i) {
	         var i1 = parseInt(i);
	         var i2 = parseInt(i + 1 < this.m_vertexCount ? i + 1 : 0);
	         var edge = b2Math.SubtractVV(this.m_vertices[i2], this.m_vertices[i1]);
	         b2Settings.b2Assert(edge.LengthSquared() > Number.MIN_VALUE);
	         this.m_normals[i].SetV(b2Math.CrossVF(edge, 1.0));
	         this.m_normals[i].Normalize();
	      }
	      this.m_centroid = b2PolygonShape.ComputeCentroid(this.m_vertices, this.m_vertexCount);
	   }
	   b2PolygonShape.AsVector = function (vertices, vertexCount) {
	      if (vertexCount === undefined) vertexCount = 0;
	      var polygonShape = new b2PolygonShape();
	      polygonShape.SetAsVector(vertices, vertexCount);
	      return polygonShape;
	   }
	   b2PolygonShape.prototype.SetAsBox = function (hx, hy) {
	      if (hx === undefined) hx = 0;
	      if (hy === undefined) hy = 0;
	      this.m_vertexCount = 4;
	      this.Reserve(4);
	      this.m_vertices[0].Set((-hx), (-hy));
	      this.m_vertices[1].Set(hx, (-hy));
	      this.m_vertices[2].Set(hx, hy);
	      this.m_vertices[3].Set((-hx), hy);
	      this.m_normals[0].Set(0.0, (-1.0));
	      this.m_normals[1].Set(1.0, 0.0);
	      this.m_normals[2].Set(0.0, 1.0);
	      this.m_normals[3].Set((-1.0), 0.0);
	      this.m_centroid.SetZero();
	   }
	   b2PolygonShape.AsBox = function (hx, hy) {
	      if (hx === undefined) hx = 0;
	      if (hy === undefined) hy = 0;
	      var polygonShape = new b2PolygonShape();
	      polygonShape.SetAsBox(hx, hy);
	      return polygonShape;
	   }
	   b2PolygonShape.prototype.SetAsOrientedBox = function (hx, hy, center, angle) {
	      if (hx === undefined) hx = 0;
	      if (hy === undefined) hy = 0;
	      if (center === undefined) center = null;
	      if (angle === undefined) angle = 0.0;
	      this.m_vertexCount = 4;
	      this.Reserve(4);
	      this.m_vertices[0].Set((-hx), (-hy));
	      this.m_vertices[1].Set(hx, (-hy));
	      this.m_vertices[2].Set(hx, hy);
	      this.m_vertices[3].Set((-hx), hy);
	      this.m_normals[0].Set(0.0, (-1.0));
	      this.m_normals[1].Set(1.0, 0.0);
	      this.m_normals[2].Set(0.0, 1.0);
	      this.m_normals[3].Set((-1.0), 0.0);
	      this.m_centroid = center;
	      var xf = new b2Transform();
	      xf.position = center;
	      xf.R.Set(angle);
	      for (var i = 0; i < this.m_vertexCount; ++i) {
	         this.m_vertices[i] = b2Math.MulX(xf, this.m_vertices[i]);
	         this.m_normals[i] = b2Math.MulMV(xf.R, this.m_normals[i]);
	      }
	   }
	   b2PolygonShape.AsOrientedBox = function (hx, hy, center, angle) {
	      if (hx === undefined) hx = 0;
	      if (hy === undefined) hy = 0;
	      if (center === undefined) center = null;
	      if (angle === undefined) angle = 0.0;
	      var polygonShape = new b2PolygonShape();
	      polygonShape.SetAsOrientedBox(hx, hy, center, angle);
	      return polygonShape;
	   }
	   b2PolygonShape.prototype.SetAsEdge = function (v1, v2) {
	      this.m_vertexCount = 2;
	      this.Reserve(2);
	      this.m_vertices[0].SetV(v1);
	      this.m_vertices[1].SetV(v2);
	      this.m_centroid.x = 0.5 * (v1.x + v2.x);
	      this.m_centroid.y = 0.5 * (v1.y + v2.y);
	      this.m_normals[0] = b2Math.CrossVF(b2Math.SubtractVV(v2, v1), 1.0);
	      this.m_normals[0].Normalize();
	      this.m_normals[1].x = (-this.m_normals[0].x);
	      this.m_normals[1].y = (-this.m_normals[0].y);
	   }
	   b2PolygonShape.AsEdge = function (v1, v2) {
	      var polygonShape = new b2PolygonShape();
	      polygonShape.SetAsEdge(v1, v2);
	      return polygonShape;
	   }
	   b2PolygonShape.prototype.TestPoint = function (xf, p) {
	      var tVec;
	      var tMat = xf.R;
	      var tX = p.x - xf.position.x;
	      var tY = p.y - xf.position.y;
	      var pLocalX = (tX * tMat.col1.x + tY * tMat.col1.y);
	      var pLocalY = (tX * tMat.col2.x + tY * tMat.col2.y);
	      for (var i = 0; i < this.m_vertexCount; ++i) {
	         tVec = this.m_vertices[i];
	         tX = pLocalX - tVec.x;
	         tY = pLocalY - tVec.y;
	         tVec = this.m_normals[i];
	         var dot = (tVec.x * tX + tVec.y * tY);
	         if (dot > 0.0) {
	            return false;
	         }
	      }
	      return true;
	   }
	   b2PolygonShape.prototype.RayCast = function (output, input, transform) {
	      var lower = 0.0;
	      var upper = input.maxFraction;
	      var tX = 0;
	      var tY = 0;
	      var tMat;
	      var tVec;
	      tX = input.p1.x - transform.position.x;
	      tY = input.p1.y - transform.position.y;
	      tMat = transform.R;
	      var p1X = (tX * tMat.col1.x + tY * tMat.col1.y);
	      var p1Y = (tX * tMat.col2.x + tY * tMat.col2.y);
	      tX = input.p2.x - transform.position.x;
	      tY = input.p2.y - transform.position.y;
	      tMat = transform.R;
	      var p2X = (tX * tMat.col1.x + tY * tMat.col1.y);
	      var p2Y = (tX * tMat.col2.x + tY * tMat.col2.y);
	      var dX = p2X - p1X;
	      var dY = p2Y - p1Y;
	      var index = parseInt((-1));
	      for (var i = 0; i < this.m_vertexCount; ++i) {
	         tVec = this.m_vertices[i];
	         tX = tVec.x - p1X;
	         tY = tVec.y - p1Y;
	         tVec = this.m_normals[i];
	         var numerator = (tVec.x * tX + tVec.y * tY);
	         var denominator = (tVec.x * dX + tVec.y * dY);
	         if (denominator == 0.0) {
	            if (numerator < 0.0) {
	               return false;
	            }
	         }
	         else {
	            if (denominator < 0.0 && numerator < lower * denominator) {
	               lower = numerator / denominator;
	               index = i;
	            }
	            else if (denominator > 0.0 && numerator < upper * denominator) {
	               upper = numerator / denominator;
	            }
	         }
	         if (upper < lower - Number.MIN_VALUE) {
	            return false;
	         }
	      }
	      if (index >= 0) {
	         output.fraction = lower;
	         tMat = transform.R;
	         tVec = this.m_normals[index];
	         output.normal.x = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	         output.normal.y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	         return true;
	      }
	      return false;
	   }
	   b2PolygonShape.prototype.ComputeAABB = function (aabb, xf) {
	      var tMat = xf.R;
	      var tVec = this.m_vertices[0];
	      var lowerX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      var lowerY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      var upperX = lowerX;
	      var upperY = lowerY;
	      for (var i = 1; i < this.m_vertexCount; ++i) {
	         tVec = this.m_vertices[i];
	         var vX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	         var vY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	         lowerX = lowerX < vX ? lowerX : vX;
	         lowerY = lowerY < vY ? lowerY : vY;
	         upperX = upperX > vX ? upperX : vX;
	         upperY = upperY > vY ? upperY : vY;
	      }
	      aabb.lowerBound.x = lowerX - this.m_radius;
	      aabb.lowerBound.y = lowerY - this.m_radius;
	      aabb.upperBound.x = upperX + this.m_radius;
	      aabb.upperBound.y = upperY + this.m_radius;
	   }
	   b2PolygonShape.prototype.ComputeMass = function (massData, density) {
	      if (density === undefined) density = 0;
	      if (this.m_vertexCount == 2) {
	         massData.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x);
	         massData.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y);
	         massData.mass = 0.0;
	         massData.I = 0.0;
	         return;
	      }
	      var centerX = 0.0;
	      var centerY = 0.0;
	      var area = 0.0;
	      var I = 0.0;
	      var p1X = 0.0;
	      var p1Y = 0.0;
	      var k_inv3 = 1.0 / 3.0;
	      for (var i = 0; i < this.m_vertexCount; ++i) {
	         var p2 = this.m_vertices[i];
	         var p3 = i + 1 < this.m_vertexCount ? this.m_vertices[parseInt(i + 1)] : this.m_vertices[0];
	         var e1X = p2.x - p1X;
	         var e1Y = p2.y - p1Y;
	         var e2X = p3.x - p1X;
	         var e2Y = p3.y - p1Y;
	         var D = e1X * e2Y - e1Y * e2X;
	         var triangleArea = 0.5 * D;area += triangleArea;
	         centerX += triangleArea * k_inv3 * (p1X + p2.x + p3.x);
	         centerY += triangleArea * k_inv3 * (p1Y + p2.y + p3.y);
	         var px = p1X;
	         var py = p1Y;
	         var ex1 = e1X;
	         var ey1 = e1Y;
	         var ex2 = e2X;
	         var ey2 = e2Y;
	         var intx2 = k_inv3 * (0.25 * (ex1 * ex1 + ex2 * ex1 + ex2 * ex2) + (px * ex1 + px * ex2)) + 0.5 * px * px;
	         var inty2 = k_inv3 * (0.25 * (ey1 * ey1 + ey2 * ey1 + ey2 * ey2) + (py * ey1 + py * ey2)) + 0.5 * py * py;I += D * (intx2 + inty2);
	      }
	      massData.mass = density * area;
	      centerX *= 1.0 / area;
	      centerY *= 1.0 / area;
	      massData.center.Set(centerX, centerY);
	      massData.I = density * I;
	   }
	   b2PolygonShape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
	      if (offset === undefined) offset = 0;
	      var normalL = b2Math.MulTMV(xf.R, normal);
	      var offsetL = offset - b2Math.Dot(normal, xf.position);
	      var depths = new Vector_a2j_Number();
	      var diveCount = 0;
	      var intoIndex = parseInt((-1));
	      var outoIndex = parseInt((-1));
	      var lastSubmerged = false;
	      var i = 0;
	      for (i = 0;
	      i < this.m_vertexCount; ++i) {
	         depths[i] = b2Math.Dot(normalL, this.m_vertices[i]) - offsetL;
	         var isSubmerged = depths[i] < (-Number.MIN_VALUE);
	         if (i > 0) {
	            if (isSubmerged) {
	               if (!lastSubmerged) {
	                  intoIndex = i - 1;
	                  diveCount++;
	               }
	            }
	            else {
	               if (lastSubmerged) {
	                  outoIndex = i - 1;
	                  diveCount++;
	               }
	            }
	         }
	         lastSubmerged = isSubmerged;
	      }
	      switch (diveCount) {
	      case 0:
	         if (lastSubmerged) {
	            var md = new b2MassData();
	            this.ComputeMass(md, 1);
	            c.SetV(b2Math.MulX(xf, md.center));
	            return md.mass;
	         }
	         else {
	            return 0;
	         }
	         break;
	      case 1:
	         if (intoIndex == (-1)) {
	            intoIndex = this.m_vertexCount - 1;
	         }
	         else {
	            outoIndex = this.m_vertexCount - 1;
	         }
	         break;
	      }
	      var intoIndex2 = parseInt((intoIndex + 1) % this.m_vertexCount);
	      var outoIndex2 = parseInt((outoIndex + 1) % this.m_vertexCount);
	      var intoLamdda = (0 - depths[intoIndex]) / (depths[intoIndex2] - depths[intoIndex]);
	      var outoLamdda = (0 - depths[outoIndex]) / (depths[outoIndex2] - depths[outoIndex]);
	      var intoVec = new b2Vec2(this.m_vertices[intoIndex].x * (1 - intoLamdda) + this.m_vertices[intoIndex2].x * intoLamdda, this.m_vertices[intoIndex].y * (1 - intoLamdda) + this.m_vertices[intoIndex2].y * intoLamdda);
	      var outoVec = new b2Vec2(this.m_vertices[outoIndex].x * (1 - outoLamdda) + this.m_vertices[outoIndex2].x * outoLamdda, this.m_vertices[outoIndex].y * (1 - outoLamdda) + this.m_vertices[outoIndex2].y * outoLamdda);
	      var area = 0;
	      var center = new b2Vec2();
	      var p2 = this.m_vertices[intoIndex2];
	      var p3;
	      i = intoIndex2;
	      while (i != outoIndex2) {
	         i = (i + 1) % this.m_vertexCount;
	         if (i == outoIndex2) p3 = outoVec;
	         else p3 = this.m_vertices[i];
	         var triangleArea = 0.5 * ((p2.x - intoVec.x) * (p3.y - intoVec.y) - (p2.y - intoVec.y) * (p3.x - intoVec.x));
	         area += triangleArea;
	         center.x += triangleArea * (intoVec.x + p2.x + p3.x) / 3;
	         center.y += triangleArea * (intoVec.y + p2.y + p3.y) / 3;
	         p2 = p3;
	      }
	      center.Multiply(1 / area);
	      c.SetV(b2Math.MulX(xf, center));
	      return area;
	   }
	   b2PolygonShape.prototype.GetVertexCount = function () {
	      return this.m_vertexCount;
	   }
	   b2PolygonShape.prototype.GetVertices = function () {
	      return this.m_vertices;
	   }
	   b2PolygonShape.prototype.GetNormals = function () {
	      return this.m_normals;
	   }
	   b2PolygonShape.prototype.GetSupport = function (d) {
	      var bestIndex = 0;
	      var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
	      for (var i = 1; i < this.m_vertexCount; ++i) {
	         var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
	         if (value > bestValue) {
	            bestIndex = i;
	            bestValue = value;
	         }
	      }
	      return bestIndex;
	   }
	   b2PolygonShape.prototype.GetSupportVertex = function (d) {
	      var bestIndex = 0;
	      var bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
	      for (var i = 1; i < this.m_vertexCount; ++i) {
	         var value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
	         if (value > bestValue) {
	            bestIndex = i;
	            bestValue = value;
	         }
	      }
	      return this.m_vertices[bestIndex];
	   }
	   b2PolygonShape.prototype.Validate = function () {
	      return false;
	   }
	   b2PolygonShape.prototype.b2PolygonShape = function () {
	      this.__super.b2Shape.call(this);
	      this.m_type = b2Shape.e_polygonShape;
	      this.m_centroid = new b2Vec2();
	      this.m_vertices = new Vector();
	      this.m_normals = new Vector();
	   }
	   b2PolygonShape.prototype.Reserve = function (count) {
	      if (count === undefined) count = 0;
	      for (var i = parseInt(this.m_vertices.length); i < count; i++) {
	         this.m_vertices[i] = new b2Vec2();
	         this.m_normals[i] = new b2Vec2();
	      }
	   }
	   b2PolygonShape.ComputeCentroid = function (vs, count) {
	      if (count === undefined) count = 0;
	      var c = new b2Vec2();
	      var area = 0.0;
	      var p1X = 0.0;
	      var p1Y = 0.0;
	      var inv3 = 1.0 / 3.0;
	      for (var i = 0; i < count; ++i) {
	         var p2 = vs[i];
	         var p3 = i + 1 < count ? vs[parseInt(i + 1)] : vs[0];
	         var e1X = p2.x - p1X;
	         var e1Y = p2.y - p1Y;
	         var e2X = p3.x - p1X;
	         var e2Y = p3.y - p1Y;
	         var D = (e1X * e2Y - e1Y * e2X);
	         var triangleArea = 0.5 * D;area += triangleArea;
	         c.x += triangleArea * inv3 * (p1X + p2.x + p3.x);
	         c.y += triangleArea * inv3 * (p1Y + p2.y + p3.y);
	      }
	      c.x *= 1.0 / area;
	      c.y *= 1.0 / area;
	      return c;
	   }
	   b2PolygonShape.ComputeOBB = function (obb, vs, count) {
	      if (count === undefined) count = 0;
	      var i = 0;
	      var p = new Vector(count + 1);
	      for (i = 0;
	      i < count; ++i) {
	         p[i] = vs[i];
	      }
	      p[count] = p[0];
	      var minArea = Number.MAX_VALUE;
	      for (i = 1;
	      i <= count; ++i) {
	         var root = p[parseInt(i - 1)];
	         var uxX = p[i].x - root.x;
	         var uxY = p[i].y - root.y;
	         var length = Math.sqrt(uxX * uxX + uxY * uxY);
	         uxX /= length;
	         uxY /= length;
	         var uyX = (-uxY);
	         var uyY = uxX;
	         var lowerX = Number.MAX_VALUE;
	         var lowerY = Number.MAX_VALUE;
	         var upperX = (-Number.MAX_VALUE);
	         var upperY = (-Number.MAX_VALUE);
	         for (var j = 0; j < count; ++j) {
	            var dX = p[j].x - root.x;
	            var dY = p[j].y - root.y;
	            var rX = (uxX * dX + uxY * dY);
	            var rY = (uyX * dX + uyY * dY);
	            if (rX < lowerX) lowerX = rX;
	            if (rY < lowerY) lowerY = rY;
	            if (rX > upperX) upperX = rX;
	            if (rY > upperY) upperY = rY;
	         }
	         var area = (upperX - lowerX) * (upperY - lowerY);
	         if (area < 0.95 * minArea) {
	            minArea = area;
	            obb.R.col1.x = uxX;
	            obb.R.col1.y = uxY;
	            obb.R.col2.x = uyX;
	            obb.R.col2.y = uyY;
	            var centerX = 0.5 * (lowerX + upperX);
	            var centerY = 0.5 * (lowerY + upperY);
	            var tMat = obb.R;
	            obb.center.x = root.x + (tMat.col1.x * centerX + tMat.col2.x * centerY);
	            obb.center.y = root.y + (tMat.col1.y * centerX + tMat.col2.y * centerY);
	            obb.extents.x = 0.5 * (upperX - lowerX);
	            obb.extents.y = 0.5 * (upperY - lowerY);
	         }
	      }
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Collision.Shapes.b2PolygonShape.s_mat = new b2Mat22();
	   });
	   b2Shape.b2Shape = function () {};
	   b2Shape.prototype.Copy = function () {
	      return null;
	   }
	   b2Shape.prototype.Set = function (other) {
	      this.m_radius = other.m_radius;
	   }
	   b2Shape.prototype.GetType = function () {
	      return this.m_type;
	   }
	   b2Shape.prototype.TestPoint = function (xf, p) {
	      return false;
	   }
	   b2Shape.prototype.RayCast = function (output, input, transform) {
	      return false;
	   }
	   b2Shape.prototype.ComputeAABB = function (aabb, xf) {}
	   b2Shape.prototype.ComputeMass = function (massData, density) {
	      if (density === undefined) density = 0;
	   }
	   b2Shape.prototype.ComputeSubmergedArea = function (normal, offset, xf, c) {
	      if (offset === undefined) offset = 0;
	      return 0;
	   }
	   b2Shape.TestOverlap = function (shape1, transform1, shape2, transform2) {
	      var input = new b2DistanceInput();
	      input.proxyA = new b2DistanceProxy();
	      input.proxyA.Set(shape1);
	      input.proxyB = new b2DistanceProxy();
	      input.proxyB.Set(shape2);
	      input.transformA = transform1;
	      input.transformB = transform2;
	      input.useRadii = true;
	      var simplexCache = new b2SimplexCache();
	      simplexCache.count = 0;
	      var output = new b2DistanceOutput();
	      b2Distance.Distance(output, simplexCache, input);
	      return output.distance < 10.0 * Number.MIN_VALUE;
	   }
	   b2Shape.prototype.b2Shape = function () {
	      this.m_type = b2Shape.e_unknownShape;
	      this.m_radius = b2Settings.b2_linearSlop;
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Collision.Shapes.b2Shape.e_unknownShape = parseInt((-1));
	      Box2D.Collision.Shapes.b2Shape.e_circleShape = 0;
	      Box2D.Collision.Shapes.b2Shape.e_polygonShape = 1;
	      Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2;
	      Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount = 3;
	      Box2D.Collision.Shapes.b2Shape.e_hitCollide = 1;
	      Box2D.Collision.Shapes.b2Shape.e_missCollide = 0;
	      Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = parseInt((-1));
	   });
	})();
	(function () {
	   var b2Color = Box2D.Common.b2Color,
	      b2internal = Box2D.Common.b2internal,
	      b2Settings = Box2D.Common.b2Settings,
	      b2Mat22 = Box2D.Common.Math.b2Mat22,
	      b2Mat33 = Box2D.Common.Math.b2Mat33,
	      b2Math = Box2D.Common.Math.b2Math,
	      b2Sweep = Box2D.Common.Math.b2Sweep,
	      b2Transform = Box2D.Common.Math.b2Transform,
	      b2Vec2 = Box2D.Common.Math.b2Vec2,
	      b2Vec3 = Box2D.Common.Math.b2Vec3;
	
	   b2Color.b2Color = function () {
	      this._r = 0;
	      this._g = 0;
	      this._b = 0;
	   };
	   b2Color.prototype.b2Color = function (rr, gg, bb) {
	      if (rr === undefined) rr = 0;
	      if (gg === undefined) gg = 0;
	      if (bb === undefined) bb = 0;
	      this._r = Box2D.parseUInt(255 * b2Math.Clamp(rr, 0.0, 1.0));
	      this._g = Box2D.parseUInt(255 * b2Math.Clamp(gg, 0.0, 1.0));
	      this._b = Box2D.parseUInt(255 * b2Math.Clamp(bb, 0.0, 1.0));
	   }
	   b2Color.prototype.Set = function (rr, gg, bb) {
	      if (rr === undefined) rr = 0;
	      if (gg === undefined) gg = 0;
	      if (bb === undefined) bb = 0;
	      this._r = Box2D.parseUInt(255 * b2Math.Clamp(rr, 0.0, 1.0));
	      this._g = Box2D.parseUInt(255 * b2Math.Clamp(gg, 0.0, 1.0));
	      this._b = Box2D.parseUInt(255 * b2Math.Clamp(bb, 0.0, 1.0));
	   }
	   Object.defineProperty(b2Color.prototype, 'r', {
	      enumerable: false,
	      configurable: true,
	      set: function (rr) {
	         if (rr === undefined) rr = 0;
	         this._r = Box2D.parseUInt(255 * b2Math.Clamp(rr, 0.0, 1.0));
	      }
	   });
	   Object.defineProperty(b2Color.prototype, 'g', {
	      enumerable: false,
	      configurable: true,
	      set: function (gg) {
	         if (gg === undefined) gg = 0;
	         this._g = Box2D.parseUInt(255 * b2Math.Clamp(gg, 0.0, 1.0));
	      }
	   });
	   Object.defineProperty(b2Color.prototype, 'b', {
	      enumerable: false,
	      configurable: true,
	      set: function (bb) {
	         if (bb === undefined) bb = 0;
	         this._b = Box2D.parseUInt(255 * b2Math.Clamp(bb, 0.0, 1.0));
	      }
	   });
	   Object.defineProperty(b2Color.prototype, 'color', {
	      enumerable: false,
	      configurable: true,
	      get: function () {
	         return (this._r << 16) | (this._g << 8) | (this._b);
	      }
	   });
	   b2Settings.b2Settings = function () {};
	   b2Settings.b2MixFriction = function (friction1, friction2) {
	      if (friction1 === undefined) friction1 = 0;
	      if (friction2 === undefined) friction2 = 0;
	      return Math.sqrt(friction1 * friction2);
	   }
	   b2Settings.b2MixRestitution = function (restitution1, restitution2) {
	      if (restitution1 === undefined) restitution1 = 0;
	      if (restitution2 === undefined) restitution2 = 0;
	      return restitution1 > restitution2 ? restitution1 : restitution2;
	   }
	   b2Settings.b2Assert = function (a) {
	      if (!a) {
	         throw "Assertion Failed";
	      }
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Common.b2Settings.VERSION = "2.1alpha";
	      Box2D.Common.b2Settings.USHRT_MAX = 0x0000ffff;
	      Box2D.Common.b2Settings.b2_pi = Math.PI;
	      Box2D.Common.b2Settings.b2_maxManifoldPoints = 2;
	      Box2D.Common.b2Settings.b2_aabbExtension = 0.1;
	      Box2D.Common.b2Settings.b2_aabbMultiplier = 2.0;
	      Box2D.Common.b2Settings.b2_polygonRadius = 2.0 * b2Settings.b2_linearSlop;
	      Box2D.Common.b2Settings.b2_linearSlop = 0.005;
	      Box2D.Common.b2Settings.b2_angularSlop = 2.0 / 180.0 * b2Settings.b2_pi;
	      Box2D.Common.b2Settings.b2_toiSlop = 8.0 * b2Settings.b2_linearSlop;
	      Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32;
	      Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32;
	      Box2D.Common.b2Settings.b2_velocityThreshold = 1.0;
	      Box2D.Common.b2Settings.b2_maxLinearCorrection = 0.2;
	      Box2D.Common.b2Settings.b2_maxAngularCorrection = 8.0 / 180.0 * b2Settings.b2_pi;
	      Box2D.Common.b2Settings.b2_maxTranslation = 2.0;
	      Box2D.Common.b2Settings.b2_maxTranslationSquared = b2Settings.b2_maxTranslation * b2Settings.b2_maxTranslation;
	      Box2D.Common.b2Settings.b2_maxRotation = 0.5 * b2Settings.b2_pi;
	      Box2D.Common.b2Settings.b2_maxRotationSquared = b2Settings.b2_maxRotation * b2Settings.b2_maxRotation;
	      Box2D.Common.b2Settings.b2_contactBaumgarte = 0.2;
	      Box2D.Common.b2Settings.b2_timeToSleep = 0.5;
	      Box2D.Common.b2Settings.b2_linearSleepTolerance = 0.01;
	      Box2D.Common.b2Settings.b2_angularSleepTolerance = 2.0 / 180.0 * b2Settings.b2_pi;
	   });
	})();
	(function () {
	   var b2AABB = Box2D.Collision.b2AABB,
	      b2Color = Box2D.Common.b2Color,
	      b2internal = Box2D.Common.b2internal,
	      b2Settings = Box2D.Common.b2Settings,
	      b2Mat22 = Box2D.Common.Math.b2Mat22,
	      b2Mat33 = Box2D.Common.Math.b2Mat33,
	      b2Math = Box2D.Common.Math.b2Math,
	      b2Sweep = Box2D.Common.Math.b2Sweep,
	      b2Transform = Box2D.Common.Math.b2Transform,
	      b2Vec2 = Box2D.Common.Math.b2Vec2,
	      b2Vec3 = Box2D.Common.Math.b2Vec3;
	
	   b2Mat22.b2Mat22 = function () {
	      this.col1 = new b2Vec2();
	      this.col2 = new b2Vec2();
	   };
	   b2Mat22.prototype.b2Mat22 = function () {
	      this.SetIdentity();
	   }
	   b2Mat22.FromAngle = function (angle) {
	      if (angle === undefined) angle = 0;
	      var mat = new b2Mat22();
	      mat.Set(angle);
	      return mat;
	   }
	   b2Mat22.FromVV = function (c1, c2) {
	      var mat = new b2Mat22();
	      mat.SetVV(c1, c2);
	      return mat;
	   }
	   b2Mat22.prototype.Set = function (angle) {
	      if (angle === undefined) angle = 0;
	      var c = Math.cos(angle);
	      var s = Math.sin(angle);
	      this.col1.x = c;
	      this.col2.x = (-s);
	      this.col1.y = s;
	      this.col2.y = c;
	   }
	   b2Mat22.prototype.SetVV = function (c1, c2) {
	      this.col1.SetV(c1);
	      this.col2.SetV(c2);
	   }
	   b2Mat22.prototype.Copy = function () {
	      var mat = new b2Mat22();
	      mat.SetM(this);
	      return mat;
	   }
	   b2Mat22.prototype.SetM = function (m) {
	      this.col1.SetV(m.col1);
	      this.col2.SetV(m.col2);
	   }
	   b2Mat22.prototype.AddM = function (m) {
	      this.col1.x += m.col1.x;
	      this.col1.y += m.col1.y;
	      this.col2.x += m.col2.x;
	      this.col2.y += m.col2.y;
	   }
	   b2Mat22.prototype.SetIdentity = function () {
	      this.col1.x = 1.0;
	      this.col2.x = 0.0;
	      this.col1.y = 0.0;
	      this.col2.y = 1.0;
	   }
	   b2Mat22.prototype.SetZero = function () {
	      this.col1.x = 0.0;
	      this.col2.x = 0.0;
	      this.col1.y = 0.0;
	      this.col2.y = 0.0;
	   }
	   b2Mat22.prototype.GetAngle = function () {
	      return Math.atan2(this.col1.y, this.col1.x);
	   }
	   b2Mat22.prototype.GetInverse = function (out) {
	      var a = this.col1.x;
	      var b = this.col2.x;
	      var c = this.col1.y;
	      var d = this.col2.y;
	      var det = a * d - b * c;
	      if (det != 0.0) {
	         det = 1.0 / det;
	      }
	      out.col1.x = det * d;
	      out.col2.x = (-det * b);
	      out.col1.y = (-det * c);
	      out.col2.y = det * a;
	      return out;
	   }
	   b2Mat22.prototype.Solve = function (out, bX, bY) {
	      if (bX === undefined) bX = 0;
	      if (bY === undefined) bY = 0;
	      var a11 = this.col1.x;
	      var a12 = this.col2.x;
	      var a21 = this.col1.y;
	      var a22 = this.col2.y;
	      var det = a11 * a22 - a12 * a21;
	      if (det != 0.0) {
	         det = 1.0 / det;
	      }
	      out.x = det * (a22 * bX - a12 * bY);
	      out.y = det * (a11 * bY - a21 * bX);
	      return out;
	   }
	   b2Mat22.prototype.Abs = function () {
	      this.col1.Abs();
	      this.col2.Abs();
	   }
	   b2Mat33.b2Mat33 = function () {
	      this.col1 = new b2Vec3();
	      this.col2 = new b2Vec3();
	      this.col3 = new b2Vec3();
	   };
	   b2Mat33.prototype.b2Mat33 = function (c1, c2, c3) {
	      if (c1 === undefined) c1 = null;
	      if (c2 === undefined) c2 = null;
	      if (c3 === undefined) c3 = null;
	      if (!c1 && !c2 && !c3) {
	         this.col1.SetZero();
	         this.col2.SetZero();
	         this.col3.SetZero();
	      }
	      else {
	         this.col1.SetV(c1);
	         this.col2.SetV(c2);
	         this.col3.SetV(c3);
	      }
	   }
	   b2Mat33.prototype.SetVVV = function (c1, c2, c3) {
	      this.col1.SetV(c1);
	      this.col2.SetV(c2);
	      this.col3.SetV(c3);
	   }
	   b2Mat33.prototype.Copy = function () {
	      return new b2Mat33(this.col1, this.col2, this.col3);
	   }
	   b2Mat33.prototype.SetM = function (m) {
	      this.col1.SetV(m.col1);
	      this.col2.SetV(m.col2);
	      this.col3.SetV(m.col3);
	   }
	   b2Mat33.prototype.AddM = function (m) {
	      this.col1.x += m.col1.x;
	      this.col1.y += m.col1.y;
	      this.col1.z += m.col1.z;
	      this.col2.x += m.col2.x;
	      this.col2.y += m.col2.y;
	      this.col2.z += m.col2.z;
	      this.col3.x += m.col3.x;
	      this.col3.y += m.col3.y;
	      this.col3.z += m.col3.z;
	   }
	   b2Mat33.prototype.SetIdentity = function () {
	      this.col1.x = 1.0;
	      this.col2.x = 0.0;
	      this.col3.x = 0.0;
	      this.col1.y = 0.0;
	      this.col2.y = 1.0;
	      this.col3.y = 0.0;
	      this.col1.z = 0.0;
	      this.col2.z = 0.0;
	      this.col3.z = 1.0;
	   }
	   b2Mat33.prototype.SetZero = function () {
	      this.col1.x = 0.0;
	      this.col2.x = 0.0;
	      this.col3.x = 0.0;
	      this.col1.y = 0.0;
	      this.col2.y = 0.0;
	      this.col3.y = 0.0;
	      this.col1.z = 0.0;
	      this.col2.z = 0.0;
	      this.col3.z = 0.0;
	   }
	   b2Mat33.prototype.Solve22 = function (out, bX, bY) {
	      if (bX === undefined) bX = 0;
	      if (bY === undefined) bY = 0;
	      var a11 = this.col1.x;
	      var a12 = this.col2.x;
	      var a21 = this.col1.y;
	      var a22 = this.col2.y;
	      var det = a11 * a22 - a12 * a21;
	      if (det != 0.0) {
	         det = 1.0 / det;
	      }
	      out.x = det * (a22 * bX - a12 * bY);
	      out.y = det * (a11 * bY - a21 * bX);
	      return out;
	   }
	   b2Mat33.prototype.Solve33 = function (out, bX, bY, bZ) {
	      if (bX === undefined) bX = 0;
	      if (bY === undefined) bY = 0;
	      if (bZ === undefined) bZ = 0;
	      var a11 = this.col1.x;
	      var a21 = this.col1.y;
	      var a31 = this.col1.z;
	      var a12 = this.col2.x;
	      var a22 = this.col2.y;
	      var a32 = this.col2.z;
	      var a13 = this.col3.x;
	      var a23 = this.col3.y;
	      var a33 = this.col3.z;
	      var det = a11 * (a22 * a33 - a32 * a23) + a21 * (a32 * a13 - a12 * a33) + a31 * (a12 * a23 - a22 * a13);
	      if (det != 0.0) {
	         det = 1.0 / det;
	      }
	      out.x = det * (bX * (a22 * a33 - a32 * a23) + bY * (a32 * a13 - a12 * a33) + bZ * (a12 * a23 - a22 * a13));
	      out.y = det * (a11 * (bY * a33 - bZ * a23) + a21 * (bZ * a13 - bX * a33) + a31 * (bX * a23 - bY * a13));
	      out.z = det * (a11 * (a22 * bZ - a32 * bY) + a21 * (a32 * bX - a12 * bZ) + a31 * (a12 * bY - a22 * bX));
	      return out;
	   }
	   b2Math.b2Math = function () {};
	   b2Math.IsValid = function (x) {
	      if (x === undefined) x = 0;
	      return isFinite(x);
	   }
	   b2Math.Dot = function (a, b) {
	      return a.x * b.x + a.y * b.y;
	   }
	   b2Math.CrossVV = function (a, b) {
	      return a.x * b.y - a.y * b.x;
	   }
	   b2Math.CrossVF = function (a, s) {
	      if (s === undefined) s = 0;
	      var v = new b2Vec2(s * a.y, (-s * a.x));
	      return v;
	   }
	   b2Math.CrossFV = function (s, a) {
	      if (s === undefined) s = 0;
	      var v = new b2Vec2((-s * a.y), s * a.x);
	      return v;
	   }
	   b2Math.MulMV = function (A, v) {
	      var u = new b2Vec2(A.col1.x * v.x + A.col2.x * v.y, A.col1.y * v.x + A.col2.y * v.y);
	      return u;
	   }
	   b2Math.MulTMV = function (A, v) {
	      var u = new b2Vec2(b2Math.Dot(v, A.col1), b2Math.Dot(v, A.col2));
	      return u;
	   }
	   b2Math.MulX = function (T, v) {
	      var a = b2Math.MulMV(T.R, v);
	      a.x += T.position.x;
	      a.y += T.position.y;
	      return a;
	   }
	   b2Math.MulXT = function (T, v) {
	      var a = b2Math.SubtractVV(v, T.position);
	      var tX = (a.x * T.R.col1.x + a.y * T.R.col1.y);
	      a.y = (a.x * T.R.col2.x + a.y * T.R.col2.y);
	      a.x = tX;
	      return a;
	   }
	   b2Math.AddVV = function (a, b) {
	      var v = new b2Vec2(a.x + b.x, a.y + b.y);
	      return v;
	   }
	   b2Math.SubtractVV = function (a, b) {
	      var v = new b2Vec2(a.x - b.x, a.y - b.y);
	      return v;
	   }
	   b2Math.Distance = function (a, b) {
	      var cX = a.x - b.x;
	      var cY = a.y - b.y;
	      return Math.sqrt(cX * cX + cY * cY);
	   }
	   b2Math.DistanceSquared = function (a, b) {
	      var cX = a.x - b.x;
	      var cY = a.y - b.y;
	      return (cX * cX + cY * cY);
	   }
	   b2Math.MulFV = function (s, a) {
	      if (s === undefined) s = 0;
	      var v = new b2Vec2(s * a.x, s * a.y);
	      return v;
	   }
	   b2Math.AddMM = function (A, B) {
	      var C = b2Mat22.FromVV(b2Math.AddVV(A.col1, B.col1), b2Math.AddVV(A.col2, B.col2));
	      return C;
	   }
	   b2Math.MulMM = function (A, B) {
	      var C = b2Mat22.FromVV(b2Math.MulMV(A, B.col1), b2Math.MulMV(A, B.col2));
	      return C;
	   }
	   b2Math.MulTMM = function (A, B) {
	      var c1 = new b2Vec2(b2Math.Dot(A.col1, B.col1), b2Math.Dot(A.col2, B.col1));
	      var c2 = new b2Vec2(b2Math.Dot(A.col1, B.col2), b2Math.Dot(A.col2, B.col2));
	      var C = b2Mat22.FromVV(c1, c2);
	      return C;
	   }
	   b2Math.Abs = function (a) {
	      if (a === undefined) a = 0;
	      return a > 0.0 ? a : (-a);
	   }
	   b2Math.AbsV = function (a) {
	      var b = new b2Vec2(b2Math.Abs(a.x), b2Math.Abs(a.y));
	      return b;
	   }
	   b2Math.AbsM = function (A) {
	      var B = b2Mat22.FromVV(b2Math.AbsV(A.col1), b2Math.AbsV(A.col2));
	      return B;
	   }
	   b2Math.Min = function (a, b) {
	      if (a === undefined) a = 0;
	      if (b === undefined) b = 0;
	      return a < b ? a : b;
	   }
	   b2Math.MinV = function (a, b) {
	      var c = new b2Vec2(b2Math.Min(a.x, b.x), b2Math.Min(a.y, b.y));
	      return c;
	   }
	   b2Math.Max = function (a, b) {
	      if (a === undefined) a = 0;
	      if (b === undefined) b = 0;
	      return a > b ? a : b;
	   }
	   b2Math.MaxV = function (a, b) {
	      var c = new b2Vec2(b2Math.Max(a.x, b.x), b2Math.Max(a.y, b.y));
	      return c;
	   }
	   b2Math.Clamp = function (a, low, high) {
	      if (a === undefined) a = 0;
	      if (low === undefined) low = 0;
	      if (high === undefined) high = 0;
	      return a < low ? low : a > high ? high : a;
	   }
	   b2Math.ClampV = function (a, low, high) {
	      return b2Math.MaxV(low, b2Math.MinV(a, high));
	   }
	   b2Math.Swap = function (a, b) {
	      var tmp = a[0];
	      a[0] = b[0];
	      b[0] = tmp;
	   }
	   b2Math.Random = function () {
	      return Math.random() * 2 - 1;
	   }
	   b2Math.RandomRange = function (lo, hi) {
	      if (lo === undefined) lo = 0;
	      if (hi === undefined) hi = 0;
	      var r = Math.random();
	      r = (hi - lo) * r + lo;
	      return r;
	   }
	   b2Math.NextPowerOfTwo = function (x) {
	      if (x === undefined) x = 0;
	      x |= (x >> 1) & 0x7FFFFFFF;
	      x |= (x >> 2) & 0x3FFFFFFF;
	      x |= (x >> 4) & 0x0FFFFFFF;
	      x |= (x >> 8) & 0x00FFFFFF;
	      x |= (x >> 16) & 0x0000FFFF;
	      return x + 1;
	   }
	   b2Math.IsPowerOfTwo = function (x) {
	      if (x === undefined) x = 0;
	      var result = x > 0 && (x & (x - 1)) == 0;
	      return result;
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Common.Math.b2Math.b2Vec2_zero = new b2Vec2(0.0, 0.0);
	      Box2D.Common.Math.b2Math.b2Mat22_identity = b2Mat22.FromVV(new b2Vec2(1.0, 0.0), new b2Vec2(0.0, 1.0));
	      Box2D.Common.Math.b2Math.b2Transform_identity = new b2Transform(b2Math.b2Vec2_zero, b2Math.b2Mat22_identity);
	   });
	   b2Sweep.b2Sweep = function () {
	      this.localCenter = new b2Vec2();
	      this.c0 = new b2Vec2;
	      this.c = new b2Vec2();
	   };
	   b2Sweep.prototype.Set = function (other) {
	      this.localCenter.SetV(other.localCenter);
	      this.c0.SetV(other.c0);
	      this.c.SetV(other.c);
	      this.a0 = other.a0;
	      this.a = other.a;
	      this.t0 = other.t0;
	   }
	   b2Sweep.prototype.Copy = function () {
	      var copy = new b2Sweep();
	      copy.localCenter.SetV(this.localCenter);
	      copy.c0.SetV(this.c0);
	      copy.c.SetV(this.c);
	      copy.a0 = this.a0;
	      copy.a = this.a;
	      copy.t0 = this.t0;
	      return copy;
	   }
	   b2Sweep.prototype.GetTransform = function (xf, alpha) {
	      if (alpha === undefined) alpha = 0;
	      xf.position.x = (1.0 - alpha) * this.c0.x + alpha * this.c.x;
	      xf.position.y = (1.0 - alpha) * this.c0.y + alpha * this.c.y;
	      var angle = (1.0 - alpha) * this.a0 + alpha * this.a;
	      xf.R.Set(angle);
	      var tMat = xf.R;
	      xf.position.x -= (tMat.col1.x * this.localCenter.x + tMat.col2.x * this.localCenter.y);
	      xf.position.y -= (tMat.col1.y * this.localCenter.x + tMat.col2.y * this.localCenter.y);
	   }
	   b2Sweep.prototype.Advance = function (t) {
	      if (t === undefined) t = 0;
	      if (this.t0 < t && 1.0 - this.t0 > Number.MIN_VALUE) {
	         var alpha = (t - this.t0) / (1.0 - this.t0);
	         this.c0.x = (1.0 - alpha) * this.c0.x + alpha * this.c.x;
	         this.c0.y = (1.0 - alpha) * this.c0.y + alpha * this.c.y;
	         this.a0 = (1.0 - alpha) * this.a0 + alpha * this.a;
	         this.t0 = t;
	      }
	   }
	   b2Transform.b2Transform = function () {
	      this.position = new b2Vec2;
	      this.R = new b2Mat22();
	   };
	   b2Transform.prototype.b2Transform = function (pos, r) {
	      if (pos === undefined) pos = null;
	      if (r === undefined) r = null;
	      if (pos) {
	         this.position.SetV(pos);
	         this.R.SetM(r);
	      }
	   }
	   b2Transform.prototype.Initialize = function (pos, r) {
	      this.position.SetV(pos);
	      this.R.SetM(r);
	   }
	   b2Transform.prototype.SetIdentity = function () {
	      this.position.SetZero();
	      this.R.SetIdentity();
	   }
	   b2Transform.prototype.Set = function (x) {
	      this.position.SetV(x.position);
	      this.R.SetM(x.R);
	   }
	   b2Transform.prototype.GetAngle = function () {
	      return Math.atan2(this.R.col1.y, this.R.col1.x);
	   }
	   b2Vec2.b2Vec2 = function () {};
	   b2Vec2.prototype.b2Vec2 = function (x_, y_) {
	      if (x_ === undefined) x_ = 0;
	      if (y_ === undefined) y_ = 0;
	      this.x = x_;
	      this.y = y_;
	   }
	   b2Vec2.prototype.SetZero = function () {
	      this.x = 0.0;
	      this.y = 0.0;
	   }
	   b2Vec2.prototype.Set = function (x_, y_) {
	      if (x_ === undefined) x_ = 0;
	      if (y_ === undefined) y_ = 0;
	      this.x = x_;
	      this.y = y_;
	   }
	   b2Vec2.prototype.SetV = function (v) {
	      this.x = v.x;
	      this.y = v.y;
	   }
	   b2Vec2.prototype.GetNegative = function () {
	      return new b2Vec2((-this.x), (-this.y));
	   }
	   b2Vec2.prototype.NegativeSelf = function () {
	      this.x = (-this.x);
	      this.y = (-this.y);
	   }
	   b2Vec2.Make = function (x_, y_) {
	      if (x_ === undefined) x_ = 0;
	      if (y_ === undefined) y_ = 0;
	      return new b2Vec2(x_, y_);
	   }
	   b2Vec2.prototype.Copy = function () {
	      return new b2Vec2(this.x, this.y);
	   }
	   b2Vec2.prototype.Add = function (v) {
	      this.x += v.x;
	      this.y += v.y;
	   }
	   b2Vec2.prototype.Subtract = function (v) {
	      this.x -= v.x;
	      this.y -= v.y;
	   }
	   b2Vec2.prototype.Multiply = function (a) {
	      if (a === undefined) a = 0;
	      this.x *= a;
	      this.y *= a;
	   }
	   b2Vec2.prototype.MulM = function (A) {
	      var tX = this.x;
	      this.x = A.col1.x * tX + A.col2.x * this.y;
	      this.y = A.col1.y * tX + A.col2.y * this.y;
	   }
	   b2Vec2.prototype.MulTM = function (A) {
	      var tX = b2Math.Dot(this, A.col1);
	      this.y = b2Math.Dot(this, A.col2);
	      this.x = tX;
	   }
	   b2Vec2.prototype.CrossVF = function (s) {
	      if (s === undefined) s = 0;
	      var tX = this.x;
	      this.x = s * this.y;
	      this.y = (-s * tX);
	   }
	   b2Vec2.prototype.CrossFV = function (s) {
	      if (s === undefined) s = 0;
	      var tX = this.x;
	      this.x = (-s * this.y);
	      this.y = s * tX;
	   }
	   b2Vec2.prototype.MinV = function (b) {
	      this.x = this.x < b.x ? this.x : b.x;
	      this.y = this.y < b.y ? this.y : b.y;
	   }
	   b2Vec2.prototype.MaxV = function (b) {
	      this.x = this.x > b.x ? this.x : b.x;
	      this.y = this.y > b.y ? this.y : b.y;
	   }
	   b2Vec2.prototype.Abs = function () {
	      if (this.x < 0) this.x = (-this.x);
	      if (this.y < 0) this.y = (-this.y);
	   }
	   b2Vec2.prototype.Length = function () {
	      return Math.sqrt(this.x * this.x + this.y * this.y);
	   }
	   b2Vec2.prototype.LengthSquared = function () {
	      return (this.x * this.x + this.y * this.y);
	   }
	   b2Vec2.prototype.Normalize = function () {
	      var length = Math.sqrt(this.x * this.x + this.y * this.y);
	      if (length < Number.MIN_VALUE) {
	         return 0.0;
	      }
	      var invLength = 1.0 / length;
	      this.x *= invLength;
	      this.y *= invLength;
	      return length;
	   }
	   b2Vec2.prototype.IsValid = function () {
	      return b2Math.IsValid(this.x) && b2Math.IsValid(this.y);
	   }
	   b2Vec3.b2Vec3 = function () {};
	   b2Vec3.prototype.b2Vec3 = function (x, y, z) {
	      if (x === undefined) x = 0;
	      if (y === undefined) y = 0;
	      if (z === undefined) z = 0;
	      this.x = x;
	      this.y = y;
	      this.z = z;
	   }
	   b2Vec3.prototype.SetZero = function () {
	      this.x = this.y = this.z = 0.0;
	   }
	   b2Vec3.prototype.Set = function (x, y, z) {
	      if (x === undefined) x = 0;
	      if (y === undefined) y = 0;
	      if (z === undefined) z = 0;
	      this.x = x;
	      this.y = y;
	      this.z = z;
	   }
	   b2Vec3.prototype.SetV = function (v) {
	      this.x = v.x;
	      this.y = v.y;
	      this.z = v.z;
	   }
	   b2Vec3.prototype.GetNegative = function () {
	      return new b2Vec3((-this.x), (-this.y), (-this.z));
	   }
	   b2Vec3.prototype.NegativeSelf = function () {
	      this.x = (-this.x);
	      this.y = (-this.y);
	      this.z = (-this.z);
	   }
	   b2Vec3.prototype.Copy = function () {
	      return new b2Vec3(this.x, this.y, this.z);
	   }
	   b2Vec3.prototype.Add = function (v) {
	      this.x += v.x;
	      this.y += v.y;
	      this.z += v.z;
	   }
	   b2Vec3.prototype.Subtract = function (v) {
	      this.x -= v.x;
	      this.y -= v.y;
	      this.z -= v.z;
	   }
	   b2Vec3.prototype.Multiply = function (a) {
	      if (a === undefined) a = 0;
	      this.x *= a;
	      this.y *= a;
	      this.z *= a;
	   }
	})();
	(function () {
	   var b2ControllerEdge = Box2D.Dynamics.Controllers.b2ControllerEdge,
	      b2Mat22 = Box2D.Common.Math.b2Mat22,
	      b2Mat33 = Box2D.Common.Math.b2Mat33,
	      b2Math = Box2D.Common.Math.b2Math,
	      b2Sweep = Box2D.Common.Math.b2Sweep,
	      b2Transform = Box2D.Common.Math.b2Transform,
	      b2Vec2 = Box2D.Common.Math.b2Vec2,
	      b2Vec3 = Box2D.Common.Math.b2Vec3,
	      b2Color = Box2D.Common.b2Color,
	      b2internal = Box2D.Common.b2internal,
	      b2Settings = Box2D.Common.b2Settings,
	      b2AABB = Box2D.Collision.b2AABB,
	      b2Bound = Box2D.Collision.b2Bound,
	      b2BoundValues = Box2D.Collision.b2BoundValues,
	      b2Collision = Box2D.Collision.b2Collision,
	      b2ContactID = Box2D.Collision.b2ContactID,
	      b2ContactPoint = Box2D.Collision.b2ContactPoint,
	      b2Distance = Box2D.Collision.b2Distance,
	      b2DistanceInput = Box2D.Collision.b2DistanceInput,
	      b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
	      b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
	      b2DynamicTree = Box2D.Collision.b2DynamicTree,
	      b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
	      b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
	      b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
	      b2Manifold = Box2D.Collision.b2Manifold,
	      b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
	      b2Point = Box2D.Collision.b2Point,
	      b2RayCastInput = Box2D.Collision.b2RayCastInput,
	      b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
	      b2Segment = Box2D.Collision.b2Segment,
	      b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
	      b2Simplex = Box2D.Collision.b2Simplex,
	      b2SimplexCache = Box2D.Collision.b2SimplexCache,
	      b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
	      b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
	      b2TOIInput = Box2D.Collision.b2TOIInput,
	      b2WorldManifold = Box2D.Collision.b2WorldManifold,
	      ClipVertex = Box2D.Collision.ClipVertex,
	      Features = Box2D.Collision.Features,
	      IBroadPhase = Box2D.Collision.IBroadPhase,
	      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	      b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
	      b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
	      b2MassData = Box2D.Collision.Shapes.b2MassData,
	      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	      b2Shape = Box2D.Collision.Shapes.b2Shape,
	      b2Body = Box2D.Dynamics.b2Body,
	      b2BodyDef = Box2D.Dynamics.b2BodyDef,
	      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
	      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
	      b2ContactListener = Box2D.Dynamics.b2ContactListener,
	      b2ContactManager = Box2D.Dynamics.b2ContactManager,
	      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
	      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
	      b2FilterData = Box2D.Dynamics.b2FilterData,
	      b2Fixture = Box2D.Dynamics.b2Fixture,
	      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	      b2Island = Box2D.Dynamics.b2Island,
	      b2TimeStep = Box2D.Dynamics.b2TimeStep,
	      b2World = Box2D.Dynamics.b2World,
	      b2CircleContact = Box2D.Dynamics.Contacts.b2CircleContact,
	      b2Contact = Box2D.Dynamics.Contacts.b2Contact,
	      b2ContactConstraint = Box2D.Dynamics.Contacts.b2ContactConstraint,
	      b2ContactConstraintPoint = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
	      b2ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge,
	      b2ContactFactory = Box2D.Dynamics.Contacts.b2ContactFactory,
	      b2ContactRegister = Box2D.Dynamics.Contacts.b2ContactRegister,
	      b2ContactResult = Box2D.Dynamics.Contacts.b2ContactResult,
	      b2ContactSolver = Box2D.Dynamics.Contacts.b2ContactSolver,
	      b2EdgeAndCircleContact = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
	      b2NullContact = Box2D.Dynamics.Contacts.b2NullContact,
	      b2PolyAndCircleContact = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
	      b2PolyAndEdgeContact = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
	      b2PolygonContact = Box2D.Dynamics.Contacts.b2PolygonContact,
	      b2PositionSolverManifold = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
	      b2Controller = Box2D.Dynamics.Controllers.b2Controller,
	      b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint,
	      b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
	      b2FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint,
	      b2FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef,
	      b2GearJoint = Box2D.Dynamics.Joints.b2GearJoint,
	      b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef,
	      b2Jacobian = Box2D.Dynamics.Joints.b2Jacobian,
	      b2Joint = Box2D.Dynamics.Joints.b2Joint,
	      b2JointDef = Box2D.Dynamics.Joints.b2JointDef,
	      b2JointEdge = Box2D.Dynamics.Joints.b2JointEdge,
	      b2LineJoint = Box2D.Dynamics.Joints.b2LineJoint,
	      b2LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef,
	      b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint,
	      b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
	      b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint,
	      b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef,
	      b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint,
	      b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef,
	      b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
	      b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
	      b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint,
	      b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;
	
	   b2Body.b2Body = function () {
	      this.m_xf = new b2Transform();
	      this.m_sweep = new b2Sweep();
	      this.m_linearVelocity = new b2Vec2();
	      this.m_force = new b2Vec2();
	   };
	   b2Body.prototype.connectEdges = function (s1, s2, angle1) {
	      if (angle1 === undefined) angle1 = 0;
	      var angle2 = Math.atan2(s2.GetDirectionVector().y, s2.GetDirectionVector().x);
	      var coreOffset = Math.tan((angle2 - angle1) * 0.5);
	      var core = b2Math.MulFV(coreOffset, s2.GetDirectionVector());
	      core = b2Math.SubtractVV(core, s2.GetNormalVector());
	      core = b2Math.MulFV(b2Settings.b2_toiSlop, core);
	      core = b2Math.AddVV(core, s2.GetVertex1());
	      var cornerDir = b2Math.AddVV(s1.GetDirectionVector(), s2.GetDirectionVector());
	      cornerDir.Normalize();
	      var convex = b2Math.Dot(s1.GetDirectionVector(), s2.GetNormalVector()) > 0.0;
	      s1.SetNextEdge(s2, core, cornerDir, convex);
	      s2.SetPrevEdge(s1, core, cornerDir, convex);
	      return angle2;
	   }
	   b2Body.prototype.CreateFixture = function (def) {
	      if (this.m_world.IsLocked() == true) {
	         return null;
	      }
	      var fixture = new b2Fixture();
	      fixture.Create(this, this.m_xf, def);
	      if (this.m_flags & b2Body.e_activeFlag) {
	         var broadPhase = this.m_world.m_contactManager.m_broadPhase;
	         fixture.CreateProxy(broadPhase, this.m_xf);
	      }
	      fixture.m_next = this.m_fixtureList;
	      this.m_fixtureList = fixture;
	      ++this.m_fixtureCount;
	      fixture.m_body = this;
	      if (fixture.m_density > 0.0) {
	         this.ResetMassData();
	      }
	      this.m_world.m_flags |= b2World.e_newFixture;
	      return fixture;
	   }
	   b2Body.prototype.CreateFixture2 = function (shape, density) {
	      if (density === undefined) density = 0.0;
	      var def = new b2FixtureDef();
	      def.shape = shape;
	      def.density = density;
	      return this.CreateFixture(def);
	   }
	   b2Body.prototype.DestroyFixture = function (fixture) {
	      if (this.m_world.IsLocked() == true) {
	         return;
	      }
	      var node = this.m_fixtureList;
	      var ppF = null;
	      var found = false;
	      while (node != null) {
	         if (node == fixture) {
	            if (ppF) ppF.m_next = fixture.m_next;
	            else this.m_fixtureList = fixture.m_next;
	            found = true;
	            break;
	         }
	         ppF = node;
	         node = node.m_next;
	      }
	      var edge = this.m_contactList;
	      while (edge) {
	         var c = edge.contact;
	         edge = edge.next;
	         var fixtureA = c.GetFixtureA();
	         var fixtureB = c.GetFixtureB();
	         if (fixture == fixtureA || fixture == fixtureB) {
	            this.m_world.m_contactManager.Destroy(c);
	         }
	      }
	      if (this.m_flags & b2Body.e_activeFlag) {
	         var broadPhase = this.m_world.m_contactManager.m_broadPhase;
	         fixture.DestroyProxy(broadPhase);
	      }
	      else {}
	      fixture.Destroy();
	      fixture.m_body = null;
	      fixture.m_next = null;
	      --this.m_fixtureCount;
	      this.ResetMassData();
	   }
	   b2Body.prototype.SetPositionAndAngle = function (position, angle) {
	      if (angle === undefined) angle = 0;
	      var f;
	      if (this.m_world.IsLocked() == true) {
	         return;
	      }
	      this.m_xf.R.Set(angle);
	      this.m_xf.position.SetV(position);
	      var tMat = this.m_xf.R;
	      var tVec = this.m_sweep.localCenter;
	      this.m_sweep.c.x = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      this.m_sweep.c.y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      this.m_sweep.c.x += this.m_xf.position.x;
	      this.m_sweep.c.y += this.m_xf.position.y;
	      this.m_sweep.c0.SetV(this.m_sweep.c);
	      this.m_sweep.a0 = this.m_sweep.a = angle;
	      var broadPhase = this.m_world.m_contactManager.m_broadPhase;
	      for (f = this.m_fixtureList;
	      f; f = f.m_next) {
	         f.Synchronize(broadPhase, this.m_xf, this.m_xf);
	      }
	      this.m_world.m_contactManager.FindNewContacts();
	   }
	   b2Body.prototype.SetTransform = function (xf) {
	      this.SetPositionAndAngle(xf.position, xf.GetAngle());
	   }
	   b2Body.prototype.GetTransform = function () {
	      return this.m_xf;
	   }
	   b2Body.prototype.GetPosition = function () {
	      return this.m_xf.position;
	   }
	   b2Body.prototype.SetPosition = function (position) {
	      this.SetPositionAndAngle(position, this.GetAngle());
	   }
	   b2Body.prototype.GetAngle = function () {
	      return this.m_sweep.a;
	   }
	   b2Body.prototype.SetAngle = function (angle) {
	      if (angle === undefined) angle = 0;
	      this.SetPositionAndAngle(this.GetPosition(), angle);
	   }
	   b2Body.prototype.GetWorldCenter = function () {
	      return this.m_sweep.c;
	   }
	   b2Body.prototype.GetLocalCenter = function () {
	      return this.m_sweep.localCenter;
	   }
	   b2Body.prototype.SetLinearVelocity = function (v) {
	      if (this.m_type == b2Body.b2_staticBody) {
	         return;
	      }
	      this.m_linearVelocity.SetV(v);
	   }
	   b2Body.prototype.GetLinearVelocity = function () {
	      return this.m_linearVelocity;
	   }
	   b2Body.prototype.SetAngularVelocity = function (omega) {
	      if (omega === undefined) omega = 0;
	      if (this.m_type == b2Body.b2_staticBody) {
	         return;
	      }
	      this.m_angularVelocity = omega;
	   }
	   b2Body.prototype.GetAngularVelocity = function () {
	      return this.m_angularVelocity;
	   }
	   b2Body.prototype.GetDefinition = function () {
	      var bd = new b2BodyDef();
	      bd.type = this.GetType();
	      bd.allowSleep = (this.m_flags & b2Body.e_allowSleepFlag) == b2Body.e_allowSleepFlag;
	      bd.angle = this.GetAngle();
	      bd.angularDamping = this.m_angularDamping;
	      bd.angularVelocity = this.m_angularVelocity;
	      bd.fixedRotation = (this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag;
	      bd.bullet = (this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag;
	      bd.awake = (this.m_flags & b2Body.e_awakeFlag) == b2Body.e_awakeFlag;
	      bd.linearDamping = this.m_linearDamping;
	      bd.linearVelocity.SetV(this.GetLinearVelocity());
	      bd.position = this.GetPosition();
	      bd.userData = this.GetUserData();
	      return bd;
	   }
	   b2Body.prototype.ApplyForce = function (force, point) {
	      if (this.m_type != b2Body.b2_dynamicBody) {
	         return;
	      }
	      if (this.IsAwake() == false) {
	         this.SetAwake(true);
	      }
	      this.m_force.x += force.x;
	      this.m_force.y += force.y;
	      this.m_torque += ((point.x - this.m_sweep.c.x) * force.y - (point.y - this.m_sweep.c.y) * force.x);
	   }
	   b2Body.prototype.ApplyTorque = function (torque) {
	      if (torque === undefined) torque = 0;
	      if (this.m_type != b2Body.b2_dynamicBody) {
	         return;
	      }
	      if (this.IsAwake() == false) {
	         this.SetAwake(true);
	      }
	      this.m_torque += torque;
	   }
	   b2Body.prototype.ApplyImpulse = function (impulse, point) {
	      if (this.m_type != b2Body.b2_dynamicBody) {
	         return;
	      }
	      if (this.IsAwake() == false) {
	         this.SetAwake(true);
	      }
	      this.m_linearVelocity.x += this.m_invMass * impulse.x;
	      this.m_linearVelocity.y += this.m_invMass * impulse.y;
	      this.m_angularVelocity += this.m_invI * ((point.x - this.m_sweep.c.x) * impulse.y - (point.y - this.m_sweep.c.y) * impulse.x);
	   }
	   b2Body.prototype.Split = function (callback) {
	      var linearVelocity = this.GetLinearVelocity().Copy();
	      var angularVelocity = this.GetAngularVelocity();
	      var center = this.GetWorldCenter();
	      var body1 = this;
	      var body2 = this.m_world.CreateBody(this.GetDefinition());
	      var prev;
	      for (var f = body1.m_fixtureList; f;) {
	         if (callback(f)) {
	            var next = f.m_next;
	            if (prev) {
	               prev.m_next = next;
	            }
	            else {
	               body1.m_fixtureList = next;
	            }
	            body1.m_fixtureCount--;
	            f.m_next = body2.m_fixtureList;
	            body2.m_fixtureList = f;
	            body2.m_fixtureCount++;
	            f.m_body = body2;
	            f = next;
	         }
	         else {
	            prev = f;
	            f = f.m_next;
	         }
	      }
	      body1.ResetMassData();
	      body2.ResetMassData();
	      var center1 = body1.GetWorldCenter();
	      var center2 = body2.GetWorldCenter();
	      var velocity1 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center1, center)));
	      var velocity2 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center2, center)));
	      body1.SetLinearVelocity(velocity1);
	      body2.SetLinearVelocity(velocity2);
	      body1.SetAngularVelocity(angularVelocity);
	      body2.SetAngularVelocity(angularVelocity);
	      body1.SynchronizeFixtures();
	      body2.SynchronizeFixtures();
	      return body2;
	   }
	   b2Body.prototype.Merge = function (other) {
	      var f;
	      for (f = other.m_fixtureList;
	      f;) {
	         var next = f.m_next;
	         other.m_fixtureCount--;
	         f.m_next = this.m_fixtureList;
	         this.m_fixtureList = f;
	         this.m_fixtureCount++;
	         f.m_body = body2;
	         f = next;
	      }
	      body1.m_fixtureCount = 0;
	      var body1 = this;
	      var body2 = other;
	      var center1 = body1.GetWorldCenter();
	      var center2 = body2.GetWorldCenter();
	      var velocity1 = body1.GetLinearVelocity().Copy();
	      var velocity2 = body2.GetLinearVelocity().Copy();
	      var angular1 = body1.GetAngularVelocity();
	      var angular = body2.GetAngularVelocity();
	      body1.ResetMassData();
	      this.SynchronizeFixtures();
	   }
	   b2Body.prototype.GetMass = function () {
	      return this.m_mass;
	   }
	   b2Body.prototype.GetInertia = function () {
	      return this.m_I;
	   }
	   b2Body.prototype.GetMassData = function (data) {
	      data.mass = this.m_mass;
	      data.I = this.m_I;
	      data.center.SetV(this.m_sweep.localCenter);
	   }
	   b2Body.prototype.SetMassData = function (massData) {
	      b2Settings.b2Assert(this.m_world.IsLocked() == false);
	      if (this.m_world.IsLocked() == true) {
	         return;
	      }
	      if (this.m_type != b2Body.b2_dynamicBody) {
	         return;
	      }
	      this.m_invMass = 0.0;
	      this.m_I = 0.0;
	      this.m_invI = 0.0;
	      this.m_mass = massData.mass;
	      if (this.m_mass <= 0.0) {
	         this.m_mass = 1.0;
	      }
	      this.m_invMass = 1.0 / this.m_mass;
	      if (massData.I > 0.0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
	         this.m_I = massData.I - this.m_mass * (massData.center.x * massData.center.x + massData.center.y * massData.center.y);
	         this.m_invI = 1.0 / this.m_I;
	      }
	      var oldCenter = this.m_sweep.c.Copy();
	      this.m_sweep.localCenter.SetV(massData.center);
	      this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
	      this.m_sweep.c.SetV(this.m_sweep.c0);
	      this.m_linearVelocity.x += this.m_angularVelocity * (-(this.m_sweep.c.y - oldCenter.y));
	      this.m_linearVelocity.y += this.m_angularVelocity * (+(this.m_sweep.c.x - oldCenter.x));
	   }
	   b2Body.prototype.ResetMassData = function () {
	      this.m_mass = 0.0;
	      this.m_invMass = 0.0;
	      this.m_I = 0.0;
	      this.m_invI = 0.0;
	      this.m_sweep.localCenter.SetZero();
	      if (this.m_type == b2Body.b2_staticBody || this.m_type == b2Body.b2_kinematicBody) {
	         return;
	      }
	      var center = b2Vec2.Make(0, 0);
	      for (var f = this.m_fixtureList; f; f = f.m_next) {
	         if (f.m_density == 0.0) {
	            continue;
	         }
	         var massData = f.GetMassData();
	         this.m_mass += massData.mass;
	         center.x += massData.center.x * massData.mass;
	         center.y += massData.center.y * massData.mass;
	         this.m_I += massData.I;
	      }
	      if (this.m_mass > 0.0) {
	         this.m_invMass = 1.0 / this.m_mass;
	         center.x *= this.m_invMass;
	         center.y *= this.m_invMass;
	      }
	      else {
	         this.m_mass = 1.0;
	         this.m_invMass = 1.0;
	      }
	      if (this.m_I > 0.0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
	         this.m_I -= this.m_mass * (center.x * center.x + center.y * center.y);
	         this.m_I *= this.m_inertiaScale;
	         b2Settings.b2Assert(this.m_I > 0);
	         this.m_invI = 1.0 / this.m_I;
	      }
	      else {
	         this.m_I = 0.0;
	         this.m_invI = 0.0;
	      }
	      var oldCenter = this.m_sweep.c.Copy();
	      this.m_sweep.localCenter.SetV(center);
	      this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
	      this.m_sweep.c.SetV(this.m_sweep.c0);
	      this.m_linearVelocity.x += this.m_angularVelocity * (-(this.m_sweep.c.y - oldCenter.y));
	      this.m_linearVelocity.y += this.m_angularVelocity * (+(this.m_sweep.c.x - oldCenter.x));
	   }
	   b2Body.prototype.GetWorldPoint = function (localPoint) {
	      var A = this.m_xf.R;
	      var u = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
	      u.x += this.m_xf.position.x;
	      u.y += this.m_xf.position.y;
	      return u;
	   }
	   b2Body.prototype.GetWorldVector = function (localVector) {
	      return b2Math.MulMV(this.m_xf.R, localVector);
	   }
	   b2Body.prototype.GetLocalPoint = function (worldPoint) {
	      return b2Math.MulXT(this.m_xf, worldPoint);
	   }
	   b2Body.prototype.GetLocalVector = function (worldVector) {
	      return b2Math.MulTMV(this.m_xf.R, worldVector);
	   }
	   b2Body.prototype.GetLinearVelocityFromWorldPoint = function (worldPoint) {
	      return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x));
	   }
	   b2Body.prototype.GetLinearVelocityFromLocalPoint = function (localPoint) {
	      var A = this.m_xf.R;
	      var worldPoint = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
	      worldPoint.x += this.m_xf.position.x;
	      worldPoint.y += this.m_xf.position.y;
	      return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x));
	   }
	   b2Body.prototype.GetLinearDamping = function () {
	      return this.m_linearDamping;
	   }
	   b2Body.prototype.SetLinearDamping = function (linearDamping) {
	      if (linearDamping === undefined) linearDamping = 0;
	      this.m_linearDamping = linearDamping;
	   }
	   b2Body.prototype.GetAngularDamping = function () {
	      return this.m_angularDamping;
	   }
	   b2Body.prototype.SetAngularDamping = function (angularDamping) {
	      if (angularDamping === undefined) angularDamping = 0;
	      this.m_angularDamping = angularDamping;
	   }
	   b2Body.prototype.SetType = function (type) {
	      if (type === undefined) type = 0;
	      if (this.m_type == type) {
	         return;
	      }
	      this.m_type = type;
	      this.ResetMassData();
	      if (this.m_type == b2Body.b2_staticBody) {
	         this.m_linearVelocity.SetZero();
	         this.m_angularVelocity = 0.0;
	      }
	      this.SetAwake(true);
	      this.m_force.SetZero();
	      this.m_torque = 0.0;
	      for (var ce = this.m_contactList; ce; ce = ce.next) {
	         ce.contact.FlagForFiltering();
	      }
	   }
	   b2Body.prototype.GetType = function () {
	      return this.m_type;
	   }
	   b2Body.prototype.SetBullet = function (flag) {
	      if (flag) {
	         this.m_flags |= b2Body.e_bulletFlag;
	      }
	      else {
	         this.m_flags &= ~b2Body.e_bulletFlag;
	      }
	   }
	   b2Body.prototype.IsBullet = function () {
	      return (this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag;
	   }
	   b2Body.prototype.SetSleepingAllowed = function (flag) {
	      if (flag) {
	         this.m_flags |= b2Body.e_allowSleepFlag;
	      }
	      else {
	         this.m_flags &= ~b2Body.e_allowSleepFlag;
	         this.SetAwake(true);
	      }
	   }
	   b2Body.prototype.SetAwake = function (flag) {
	      if (flag) {
	         this.m_flags |= b2Body.e_awakeFlag;
	         this.m_sleepTime = 0.0;
	      }
	      else {
	         this.m_flags &= ~b2Body.e_awakeFlag;
	         this.m_sleepTime = 0.0;
	         this.m_linearVelocity.SetZero();
	         this.m_angularVelocity = 0.0;
	         this.m_force.SetZero();
	         this.m_torque = 0.0;
	      }
	   }
	   b2Body.prototype.IsAwake = function () {
	      return (this.m_flags & b2Body.e_awakeFlag) == b2Body.e_awakeFlag;
	   }
	   b2Body.prototype.SetFixedRotation = function (fixed) {
	      if (fixed) {
	         this.m_flags |= b2Body.e_fixedRotationFlag;
	      }
	      else {
	         this.m_flags &= ~b2Body.e_fixedRotationFlag;
	      }
	      this.ResetMassData();
	   }
	   b2Body.prototype.IsFixedRotation = function () {
	      return (this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag;
	   }
	   b2Body.prototype.SetActive = function (flag) {
	      if (flag == this.IsActive()) {
	         return;
	      }
	      var broadPhase;
	      var f;
	      if (flag) {
	         this.m_flags |= b2Body.e_activeFlag;
	         broadPhase = this.m_world.m_contactManager.m_broadPhase;
	         for (f = this.m_fixtureList;
	         f; f = f.m_next) {
	            f.CreateProxy(broadPhase, this.m_xf);
	         }
	      }
	      else {
	         this.m_flags &= ~b2Body.e_activeFlag;
	         broadPhase = this.m_world.m_contactManager.m_broadPhase;
	         for (f = this.m_fixtureList;
	         f; f = f.m_next) {
	            f.DestroyProxy(broadPhase);
	         }
	         var ce = this.m_contactList;
	         while (ce) {
	            var ce0 = ce;
	            ce = ce.next;
	            this.m_world.m_contactManager.Destroy(ce0.contact);
	         }
	         this.m_contactList = null;
	      }
	   }
	   b2Body.prototype.IsActive = function () {
	      return (this.m_flags & b2Body.e_activeFlag) == b2Body.e_activeFlag;
	   }
	   b2Body.prototype.IsSleepingAllowed = function () {
	      return (this.m_flags & b2Body.e_allowSleepFlag) == b2Body.e_allowSleepFlag;
	   }
	   b2Body.prototype.GetFixtureList = function () {
	      return this.m_fixtureList;
	   }
	   b2Body.prototype.GetJointList = function () {
	      return this.m_jointList;
	   }
	   b2Body.prototype.GetControllerList = function () {
	      return this.m_controllerList;
	   }
	   b2Body.prototype.GetContactList = function () {
	      return this.m_contactList;
	   }
	   b2Body.prototype.GetNext = function () {
	      return this.m_next;
	   }
	   b2Body.prototype.GetUserData = function () {
	      return this.m_userData;
	   }
	   b2Body.prototype.SetUserData = function (data) {
	      this.m_userData = data;
	   }
	   b2Body.prototype.GetWorld = function () {
	      return this.m_world;
	   }
	   b2Body.prototype.b2Body = function (bd, world) {
	      this.m_flags = 0;
	      if (bd.bullet) {
	         this.m_flags |= b2Body.e_bulletFlag;
	      }
	      if (bd.fixedRotation) {
	         this.m_flags |= b2Body.e_fixedRotationFlag;
	      }
	      if (bd.allowSleep) {
	         this.m_flags |= b2Body.e_allowSleepFlag;
	      }
	      if (bd.awake) {
	         this.m_flags |= b2Body.e_awakeFlag;
	      }
	      if (bd.active) {
	         this.m_flags |= b2Body.e_activeFlag;
	      }
	      this.m_world = world;
	      this.m_xf.position.SetV(bd.position);
	      this.m_xf.R.Set(bd.angle);
	      this.m_sweep.localCenter.SetZero();
	      this.m_sweep.t0 = 1.0;
	      this.m_sweep.a0 = this.m_sweep.a = bd.angle;
	      var tMat = this.m_xf.R;
	      var tVec = this.m_sweep.localCenter;
	      this.m_sweep.c.x = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      this.m_sweep.c.y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      this.m_sweep.c.x += this.m_xf.position.x;
	      this.m_sweep.c.y += this.m_xf.position.y;
	      this.m_sweep.c0.SetV(this.m_sweep.c);
	      this.m_jointList = null;
	      this.m_controllerList = null;
	      this.m_contactList = null;
	      this.m_controllerCount = 0;
	      this.m_prev = null;
	      this.m_next = null;
	      this.m_linearVelocity.SetV(bd.linearVelocity);
	      this.m_angularVelocity = bd.angularVelocity;
	      this.m_linearDamping = bd.linearDamping;
	      this.m_angularDamping = bd.angularDamping;
	      this.m_force.Set(0.0, 0.0);
	      this.m_torque = 0.0;
	      this.m_sleepTime = 0.0;
	      this.m_type = bd.type;
	      if (this.m_type == b2Body.b2_dynamicBody) {
	         this.m_mass = 1.0;
	         this.m_invMass = 1.0;
	      }
	      else {
	         this.m_mass = 0.0;
	         this.m_invMass = 0.0;
	      }
	      this.m_I = 0.0;
	      this.m_invI = 0.0;
	      this.m_inertiaScale = bd.inertiaScale;
	      this.m_userData = bd.userData;
	      this.m_fixtureList = null;
	      this.m_fixtureCount = 0;
	   }
	   b2Body.prototype.SynchronizeFixtures = function () {
	      var xf1 = b2Body.s_xf1;
	      xf1.R.Set(this.m_sweep.a0);
	      var tMat = xf1.R;
	      var tVec = this.m_sweep.localCenter;
	      xf1.position.x = this.m_sweep.c0.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      xf1.position.y = this.m_sweep.c0.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	      var f;
	      var broadPhase = this.m_world.m_contactManager.m_broadPhase;
	      for (f = this.m_fixtureList;
	      f; f = f.m_next) {
	         f.Synchronize(broadPhase, xf1, this.m_xf);
	      }
	   }
	   b2Body.prototype.SynchronizeTransform = function () {
	      this.m_xf.R.Set(this.m_sweep.a);
	      var tMat = this.m_xf.R;
	      var tVec = this.m_sweep.localCenter;
	      this.m_xf.position.x = this.m_sweep.c.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	      this.m_xf.position.y = this.m_sweep.c.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	   }
	   b2Body.prototype.ShouldCollide = function (other) {
	      if (this.m_type != b2Body.b2_dynamicBody && other.m_type != b2Body.b2_dynamicBody) {
	         return false;
	      }
	      for (var jn = this.m_jointList; jn; jn = jn.next) {
	         if (jn.other == other) if (jn.joint.m_collideConnected == false) {
	            return false;
	         }
	      }
	      return true;
	   }
	   b2Body.prototype.Advance = function (t) {
	      if (t === undefined) t = 0;
	      this.m_sweep.Advance(t);
	      this.m_sweep.c.SetV(this.m_sweep.c0);
	      this.m_sweep.a = this.m_sweep.a0;
	      this.SynchronizeTransform();
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.b2Body.s_xf1 = new b2Transform();
	      Box2D.Dynamics.b2Body.e_islandFlag = 0x0001;
	      Box2D.Dynamics.b2Body.e_awakeFlag = 0x0002;
	      Box2D.Dynamics.b2Body.e_allowSleepFlag = 0x0004;
	      Box2D.Dynamics.b2Body.e_bulletFlag = 0x0008;
	      Box2D.Dynamics.b2Body.e_fixedRotationFlag = 0x0010;
	      Box2D.Dynamics.b2Body.e_activeFlag = 0x0020;
	      Box2D.Dynamics.b2Body.b2_staticBody = 0;
	      Box2D.Dynamics.b2Body.b2_kinematicBody = 1;
	      Box2D.Dynamics.b2Body.b2_dynamicBody = 2;
	   });
	   b2BodyDef.b2BodyDef = function () {
	      this.position = new b2Vec2();
	      this.linearVelocity = new b2Vec2();
	   };
	   b2BodyDef.prototype.b2BodyDef = function () {
	      this.userData = null;
	      this.position.Set(0.0, 0.0);
	      this.angle = 0.0;
	      this.linearVelocity.Set(0, 0);
	      this.angularVelocity = 0.0;
	      this.linearDamping = 0.0;
	      this.angularDamping = 0.0;
	      this.allowSleep = true;
	      this.awake = true;
	      this.fixedRotation = false;
	      this.bullet = false;
	      this.type = b2Body.b2_staticBody;
	      this.active = true;
	      this.inertiaScale = 1.0;
	   }
	   b2ContactFilter.b2ContactFilter = function () {};
	   b2ContactFilter.prototype.ShouldCollide = function (fixtureA, fixtureB) {
	      var filter1 = fixtureA.GetFilterData();
	      var filter2 = fixtureB.GetFilterData();
	      if (filter1.groupIndex == filter2.groupIndex && filter1.groupIndex != 0) {
	         return filter1.groupIndex > 0;
	      }
	      var collide = (filter1.maskBits & filter2.categoryBits) != 0 && (filter1.categoryBits & filter2.maskBits) != 0;
	      return collide;
	   }
	   b2ContactFilter.prototype.RayCollide = function (userData, fixture) {
	      if (!userData) return true;
	      return this.ShouldCollide((userData instanceof b2Fixture ? userData : null), fixture);
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new b2ContactFilter();
	   });
	   b2ContactImpulse.b2ContactImpulse = function () {
	      this.normalImpulses = new Vector_a2j_Number(b2Settings.b2_maxManifoldPoints);
	      this.tangentImpulses = new Vector_a2j_Number(b2Settings.b2_maxManifoldPoints);
	   };
	   b2ContactListener.b2ContactListener = function () {};
	   b2ContactListener.prototype.BeginContact = function (contact) {}
	   b2ContactListener.prototype.EndContact = function (contact) {}
	   b2ContactListener.prototype.PreSolve = function (contact, oldManifold) {}
	   b2ContactListener.prototype.PostSolve = function (contact, impulse) {}
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.b2ContactListener.b2_defaultListener = new b2ContactListener();
	   });
	   b2ContactManager.b2ContactManager = function () {};
	   b2ContactManager.prototype.b2ContactManager = function () {
	      this.m_world = null;
	      this.m_contactCount = 0;
	      this.m_contactFilter = b2ContactFilter.b2_defaultFilter;
	      this.m_contactListener = b2ContactListener.b2_defaultListener;
	      this.m_contactFactory = new b2ContactFactory(this.m_allocator);
	      this.m_broadPhase = new b2DynamicTreeBroadPhase();
	   }
	   b2ContactManager.prototype.AddPair = function (proxyUserDataA, proxyUserDataB) {
	      var fixtureA = (proxyUserDataA instanceof b2Fixture ? proxyUserDataA : null);
	      var fixtureB = (proxyUserDataB instanceof b2Fixture ? proxyUserDataB : null);
	      var bodyA = fixtureA.GetBody();
	      var bodyB = fixtureB.GetBody();
	      if (bodyA == bodyB) return;
	      var edge = bodyB.GetContactList();
	      while (edge) {
	         if (edge.other == bodyA) {
	            var fA = edge.contact.GetFixtureA();
	            var fB = edge.contact.GetFixtureB();
	            if (fA == fixtureA && fB == fixtureB) return;
	            if (fA == fixtureB && fB == fixtureA) return;
	         }
	         edge = edge.next;
	      }
	      if (bodyB.ShouldCollide(bodyA) == false) {
	         return;
	      }
	      if (this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
	         return;
	      }
	      var c = this.m_contactFactory.Create(fixtureA, fixtureB);
	      fixtureA = c.GetFixtureA();
	      fixtureB = c.GetFixtureB();
	      bodyA = fixtureA.m_body;
	      bodyB = fixtureB.m_body;
	      c.m_prev = null;
	      c.m_next = this.m_world.m_contactList;
	      if (this.m_world.m_contactList != null) {
	         this.m_world.m_contactList.m_prev = c;
	      }
	      this.m_world.m_contactList = c;
	      c.m_nodeA.contact = c;
	      c.m_nodeA.other = bodyB;
	      c.m_nodeA.prev = null;
	      c.m_nodeA.next = bodyA.m_contactList;
	      if (bodyA.m_contactList != null) {
	         bodyA.m_contactList.prev = c.m_nodeA;
	      }
	      bodyA.m_contactList = c.m_nodeA;
	      c.m_nodeB.contact = c;
	      c.m_nodeB.other = bodyA;
	      c.m_nodeB.prev = null;
	      c.m_nodeB.next = bodyB.m_contactList;
	      if (bodyB.m_contactList != null) {
	         bodyB.m_contactList.prev = c.m_nodeB;
	      }
	      bodyB.m_contactList = c.m_nodeB;
	      ++this.m_world.m_contactCount;
	      return;
	   }
	   b2ContactManager.prototype.FindNewContacts = function () {
	      this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair));
	   }
	   b2ContactManager.prototype.Destroy = function (c) {
	      var fixtureA = c.GetFixtureA();
	      var fixtureB = c.GetFixtureB();
	      var bodyA = fixtureA.GetBody();
	      var bodyB = fixtureB.GetBody();
	      if (c.IsTouching()) {
	         this.m_contactListener.EndContact(c);
	      }
	      if (c.m_prev) {
	         c.m_prev.m_next = c.m_next;
	      }
	      if (c.m_next) {
	         c.m_next.m_prev = c.m_prev;
	      }
	      if (c == this.m_world.m_contactList) {
	         this.m_world.m_contactList = c.m_next;
	      }
	      if (c.m_nodeA.prev) {
	         c.m_nodeA.prev.next = c.m_nodeA.next;
	      }
	      if (c.m_nodeA.next) {
	         c.m_nodeA.next.prev = c.m_nodeA.prev;
	      }
	      if (c.m_nodeA == bodyA.m_contactList) {
	         bodyA.m_contactList = c.m_nodeA.next;
	      }
	      if (c.m_nodeB.prev) {
	         c.m_nodeB.prev.next = c.m_nodeB.next;
	      }
	      if (c.m_nodeB.next) {
	         c.m_nodeB.next.prev = c.m_nodeB.prev;
	      }
	      if (c.m_nodeB == bodyB.m_contactList) {
	         bodyB.m_contactList = c.m_nodeB.next;
	      }
	      this.m_contactFactory.Destroy(c);
	      --this.m_contactCount;
	   }
	   b2ContactManager.prototype.Collide = function () {
	      var c = this.m_world.m_contactList;
	      while (c) {
	         var fixtureA = c.GetFixtureA();
	         var fixtureB = c.GetFixtureB();
	         var bodyA = fixtureA.GetBody();
	         var bodyB = fixtureB.GetBody();
	         if (bodyA.IsAwake() == false && bodyB.IsAwake() == false) {
	            c = c.GetNext();
	            continue;
	         }
	         if (c.m_flags & b2Contact.e_filterFlag) {
	            if (bodyB.ShouldCollide(bodyA) == false) {
	               var cNuke = c;
	               c = cNuke.GetNext();
	               this.Destroy(cNuke);
	               continue;
	            }
	            if (this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
	               cNuke = c;
	               c = cNuke.GetNext();
	               this.Destroy(cNuke);
	               continue;
	            }
	            c.m_flags &= ~b2Contact.e_filterFlag;
	         }
	         var proxyA = fixtureA.m_proxy;
	         var proxyB = fixtureB.m_proxy;
	         var overlap = this.m_broadPhase.TestOverlap(proxyA, proxyB);
	         if (overlap == false) {
	            cNuke = c;
	            c = cNuke.GetNext();
	            this.Destroy(cNuke);
	            continue;
	         }
	         c.Update(this.m_contactListener);
	         c = c.GetNext();
	      }
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.b2ContactManager.s_evalCP = new b2ContactPoint();
	   });
	   b2DebugDraw.b2DebugDraw = function () {};
	   b2DebugDraw.prototype.b2DebugDraw = function () {}
	   b2DebugDraw.prototype.SetFlags = function (flags) {
	      if (flags === undefined) flags = 0;
	   }
	   b2DebugDraw.prototype.GetFlags = function () {}
	   b2DebugDraw.prototype.AppendFlags = function (flags) {
	      if (flags === undefined) flags = 0;
	   }
	   b2DebugDraw.prototype.ClearFlags = function (flags) {
	      if (flags === undefined) flags = 0;
	   }
	   b2DebugDraw.prototype.SetSprite = function (sprite) {}
	   b2DebugDraw.prototype.GetSprite = function () {}
	   b2DebugDraw.prototype.SetDrawScale = function (drawScale) {
	      if (drawScale === undefined) drawScale = 0;
	   }
	   b2DebugDraw.prototype.GetDrawScale = function () {}
	   b2DebugDraw.prototype.SetLineThickness = function (lineThickness) {
	      if (lineThickness === undefined) lineThickness = 0;
	   }
	   b2DebugDraw.prototype.GetLineThickness = function () {}
	   b2DebugDraw.prototype.SetAlpha = function (alpha) {
	      if (alpha === undefined) alpha = 0;
	   }
	   b2DebugDraw.prototype.GetAlpha = function () {}
	   b2DebugDraw.prototype.SetFillAlpha = function (alpha) {
	      if (alpha === undefined) alpha = 0;
	   }
	   b2DebugDraw.prototype.GetFillAlpha = function () {}
	   b2DebugDraw.prototype.SetXFormScale = function (xformScale) {
	      if (xformScale === undefined) xformScale = 0;
	   }
	   b2DebugDraw.prototype.GetXFormScale = function () {}
	   b2DebugDraw.prototype.DrawPolygon = function (vertices, vertexCount, color) {
	      if (vertexCount === undefined) vertexCount = 0;
	   }
	   b2DebugDraw.prototype.DrawSolidPolygon = function (vertices, vertexCount, color) {
	      if (vertexCount === undefined) vertexCount = 0;
	   }
	   b2DebugDraw.prototype.DrawCircle = function (center, radius, color) {
	      if (radius === undefined) radius = 0;
	   }
	   b2DebugDraw.prototype.DrawSolidCircle = function (center, radius, axis, color) {
	      if (radius === undefined) radius = 0;
	   }
	   b2DebugDraw.prototype.DrawSegment = function (p1, p2, color) {}
	   b2DebugDraw.prototype.DrawTransform = function (xf) {}
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.b2DebugDraw.e_shapeBit = 0x0001;
	      Box2D.Dynamics.b2DebugDraw.e_jointBit = 0x0002;
	      Box2D.Dynamics.b2DebugDraw.e_aabbBit = 0x0004;
	      Box2D.Dynamics.b2DebugDraw.e_pairBit = 0x0008;
	      Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 0x0010;
	      Box2D.Dynamics.b2DebugDraw.e_controllerBit = 0x0020;
	   });
	   b2DestructionListener.b2DestructionListener = function () {};
	   b2DestructionListener.prototype.SayGoodbyeJoint = function (joint) {}
	   b2DestructionListener.prototype.SayGoodbyeFixture = function (fixture) {}
	   b2FilterData.b2FilterData = function () {
	      this.categoryBits = 0x0001;
	      this.maskBits = 0xFFFF;
	      this.groupIndex = 0;
	   };
	   b2FilterData.prototype.Copy = function () {
	      var copy = new b2FilterData();
	      copy.categoryBits = this.categoryBits;
	      copy.maskBits = this.maskBits;
	      copy.groupIndex = this.groupIndex;
	      return copy;
	   }
	   b2Fixture.b2Fixture = function () {
	      this.m_filter = new b2FilterData();
	   };
	   b2Fixture.prototype.GetType = function () {
	      return this.m_shape.GetType();
	   }
	   b2Fixture.prototype.GetShape = function () {
	      return this.m_shape;
	   }
	   b2Fixture.prototype.SetSensor = function (sensor) {
	      if (this.m_isSensor == sensor) return;
	      this.m_isSensor = sensor;
	      if (this.m_body == null) return;
	      var edge = this.m_body.GetContactList();
	      while (edge) {
	         var contact = edge.contact;
	         var fixtureA = contact.GetFixtureA();
	         var fixtureB = contact.GetFixtureB();
	         if (fixtureA == this || fixtureB == this) contact.SetSensor(fixtureA.IsSensor() || fixtureB.IsSensor());
	         edge = edge.next;
	      }
	   }
	   b2Fixture.prototype.IsSensor = function () {
	      return this.m_isSensor;
	   }
	   b2Fixture.prototype.SetFilterData = function (filter) {
	      this.m_filter = filter.Copy();
	      if (this.m_body) return;
	      var edge = this.m_body.GetContactList();
	      while (edge) {
	         var contact = edge.contact;
	         var fixtureA = contact.GetFixtureA();
	         var fixtureB = contact.GetFixtureB();
	         if (fixtureA == this || fixtureB == this) contact.FlagForFiltering();
	         edge = edge.next;
	      }
	   }
	   b2Fixture.prototype.GetFilterData = function () {
	      return this.m_filter.Copy();
	   }
	   b2Fixture.prototype.GetBody = function () {
	      return this.m_body;
	   }
	   b2Fixture.prototype.GetNext = function () {
	      return this.m_next;
	   }
	   b2Fixture.prototype.GetUserData = function () {
	      return this.m_userData;
	   }
	   b2Fixture.prototype.SetUserData = function (data) {
	      this.m_userData = data;
	   }
	   b2Fixture.prototype.TestPoint = function (p) {
	      return this.m_shape.TestPoint(this.m_body.GetTransform(), p);
	   }
	   b2Fixture.prototype.RayCast = function (output, input) {
	      return this.m_shape.RayCast(output, input, this.m_body.GetTransform());
	   }
	   b2Fixture.prototype.GetMassData = function (massData) {
	      if (massData === undefined) massData = null;
	      if (massData == null) {
	         massData = new b2MassData();
	      }
	      this.m_shape.ComputeMass(massData, this.m_density);
	      return massData;
	   }
	   b2Fixture.prototype.SetDensity = function (density) {
	      if (density === undefined) density = 0;
	      this.m_density = density;
	   }
	   b2Fixture.prototype.GetDensity = function () {
	      return this.m_density;
	   }
	   b2Fixture.prototype.GetFriction = function () {
	      return this.m_friction;
	   }
	   b2Fixture.prototype.SetFriction = function (friction) {
	      if (friction === undefined) friction = 0;
	      this.m_friction = friction;
	   }
	   b2Fixture.prototype.GetRestitution = function () {
	      return this.m_restitution;
	   }
	   b2Fixture.prototype.SetRestitution = function (restitution) {
	      if (restitution === undefined) restitution = 0;
	      this.m_restitution = restitution;
	   }
	   b2Fixture.prototype.GetAABB = function () {
	      return this.m_aabb;
	   }
	   b2Fixture.prototype.b2Fixture = function () {
	      this.m_aabb = new b2AABB();
	      this.m_userData = null;
	      this.m_body = null;
	      this.m_next = null;
	      this.m_shape = null;
	      this.m_density = 0.0;
	      this.m_friction = 0.0;
	      this.m_restitution = 0.0;
	   }
	   b2Fixture.prototype.Create = function (body, xf, def) {
	      this.m_userData = def.userData;
	      this.m_friction = def.friction;
	      this.m_restitution = def.restitution;
	      this.m_body = body;
	      this.m_next = null;
	      this.m_filter = def.filter.Copy();
	      this.m_isSensor = def.isSensor;
	      this.m_shape = def.shape.Copy();
	      this.m_density = def.density;
	   }
	   b2Fixture.prototype.Destroy = function () {
	      this.m_shape = null;
	   }
	   b2Fixture.prototype.CreateProxy = function (broadPhase, xf) {
	      this.m_shape.ComputeAABB(this.m_aabb, xf);
	      this.m_proxy = broadPhase.CreateProxy(this.m_aabb, this);
	   }
	   b2Fixture.prototype.DestroyProxy = function (broadPhase) {
	      if (this.m_proxy == null) {
	         return;
	      }
	      broadPhase.DestroyProxy(this.m_proxy);
	      this.m_proxy = null;
	   }
	   b2Fixture.prototype.Synchronize = function (broadPhase, transform1, transform2) {
	      if (!this.m_proxy) return;
	      var aabb1 = new b2AABB();
	      var aabb2 = new b2AABB();
	      this.m_shape.ComputeAABB(aabb1, transform1);
	      this.m_shape.ComputeAABB(aabb2, transform2);
	      this.m_aabb.Combine(aabb1, aabb2);
	      var displacement = b2Math.SubtractVV(transform2.position, transform1.position);
	      broadPhase.MoveProxy(this.m_proxy, this.m_aabb, displacement);
	   }
	   b2FixtureDef.b2FixtureDef = function () {
	      this.filter = new b2FilterData();
	   };
	   b2FixtureDef.prototype.b2FixtureDef = function () {
	      this.shape = null;
	      this.userData = null;
	      this.friction = 0.2;
	      this.restitution = 0.0;
	      this.density = 0.0;
	      this.filter.categoryBits = 0x0001;
	      this.filter.maskBits = 0xFFFF;
	      this.filter.groupIndex = 0;
	      this.isSensor = false;
	   }
	   b2Island.b2Island = function () {};
	   b2Island.prototype.b2Island = function () {
	      this.m_bodies = new Vector();
	      this.m_contacts = new Vector();
	      this.m_joints = new Vector();
	   }
	   b2Island.prototype.Initialize = function (bodyCapacity, contactCapacity, jointCapacity, allocator, listener, contactSolver) {
	      if (bodyCapacity === undefined) bodyCapacity = 0;
	      if (contactCapacity === undefined) contactCapacity = 0;
	      if (jointCapacity === undefined) jointCapacity = 0;
	      var i = 0;
	      this.m_bodyCapacity = bodyCapacity;
	      this.m_contactCapacity = contactCapacity;
	      this.m_jointCapacity = jointCapacity;
	      this.m_bodyCount = 0;
	      this.m_contactCount = 0;
	      this.m_jointCount = 0;
	      this.m_allocator = allocator;
	      this.m_listener = listener;
	      this.m_contactSolver = contactSolver;
	      for (i = this.m_bodies.length;
	      i < bodyCapacity; i++)
	      this.m_bodies[i] = null;
	      for (i = this.m_contacts.length;
	      i < contactCapacity; i++)
	      this.m_contacts[i] = null;
	      for (i = this.m_joints.length;
	      i < jointCapacity; i++)
	      this.m_joints[i] = null;
	   }
	   b2Island.prototype.Clear = function () {
	      this.m_bodyCount = 0;
	      this.m_contactCount = 0;
	      this.m_jointCount = 0;
	   }
	   b2Island.prototype.Solve = function (step, gravity, allowSleep) {
	      var i = 0;
	      var j = 0;
	      var b;
	      var joint;
	      for (i = 0;
	      i < this.m_bodyCount; ++i) {
	         b = this.m_bodies[i];
	         if (b.GetType() != b2Body.b2_dynamicBody) continue;
	         b.m_linearVelocity.x += step.dt * (gravity.x + b.m_invMass * b.m_force.x);
	         b.m_linearVelocity.y += step.dt * (gravity.y + b.m_invMass * b.m_force.y);
	         b.m_angularVelocity += step.dt * b.m_invI * b.m_torque;
	         b.m_linearVelocity.Multiply(b2Math.Clamp(1.0 - step.dt * b.m_linearDamping, 0.0, 1.0));
	         b.m_angularVelocity *= b2Math.Clamp(1.0 - step.dt * b.m_angularDamping, 0.0, 1.0);
	      }
	      this.m_contactSolver.Initialize(step, this.m_contacts, this.m_contactCount, this.m_allocator);
	      var contactSolver = this.m_contactSolver;
	      contactSolver.InitVelocityConstraints(step);
	      for (i = 0;
	      i < this.m_jointCount; ++i) {
	         joint = this.m_joints[i];
	         joint.InitVelocityConstraints(step);
	      }
	      for (i = 0;
	      i < step.velocityIterations; ++i) {
	         for (j = 0;
	         j < this.m_jointCount; ++j) {
	            joint = this.m_joints[j];
	            joint.SolveVelocityConstraints(step);
	         }
	         contactSolver.SolveVelocityConstraints();
	      }
	      for (i = 0;
	      i < this.m_jointCount; ++i) {
	         joint = this.m_joints[i];
	         joint.FinalizeVelocityConstraints();
	      }
	      contactSolver.FinalizeVelocityConstraints();
	      for (i = 0;
	      i < this.m_bodyCount; ++i) {
	         b = this.m_bodies[i];
	         if (b.GetType() == b2Body.b2_staticBody) continue;
	         var translationX = step.dt * b.m_linearVelocity.x;
	         var translationY = step.dt * b.m_linearVelocity.y;
	         if ((translationX * translationX + translationY * translationY) > b2Settings.b2_maxTranslationSquared) {
	            b.m_linearVelocity.Normalize();
	            b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * step.inv_dt;
	            b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * step.inv_dt;
	         }
	         var rotation = step.dt * b.m_angularVelocity;
	         if (rotation * rotation > b2Settings.b2_maxRotationSquared) {
	            if (b.m_angularVelocity < 0.0) {
	               b.m_angularVelocity = (-b2Settings.b2_maxRotation * step.inv_dt);
	            }
	            else {
	               b.m_angularVelocity = b2Settings.b2_maxRotation * step.inv_dt;
	            }
	         }
	         b.m_sweep.c0.SetV(b.m_sweep.c);
	         b.m_sweep.a0 = b.m_sweep.a;
	         b.m_sweep.c.x += step.dt * b.m_linearVelocity.x;
	         b.m_sweep.c.y += step.dt * b.m_linearVelocity.y;
	         b.m_sweep.a += step.dt * b.m_angularVelocity;
	         b.SynchronizeTransform();
	      }
	      for (i = 0;
	      i < step.positionIterations; ++i) {
	         var contactsOkay = contactSolver.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
	         var jointsOkay = true;
	         for (j = 0;
	         j < this.m_jointCount; ++j) {
	            joint = this.m_joints[j];
	            var jointOkay = joint.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
	            jointsOkay = jointsOkay && jointOkay;
	         }
	         if (contactsOkay && jointsOkay) {
	            break;
	         }
	      }
	      this.Report(contactSolver.m_constraints);
	      if (allowSleep) {
	         var minSleepTime = Number.MAX_VALUE;
	         var linTolSqr = b2Settings.b2_linearSleepTolerance * b2Settings.b2_linearSleepTolerance;
	         var angTolSqr = b2Settings.b2_angularSleepTolerance * b2Settings.b2_angularSleepTolerance;
	         for (i = 0;
	         i < this.m_bodyCount; ++i) {
	            b = this.m_bodies[i];
	            if (b.GetType() == b2Body.b2_staticBody) {
	               continue;
	            }
	            if ((b.m_flags & b2Body.e_allowSleepFlag) == 0) {
	               b.m_sleepTime = 0.0;
	               minSleepTime = 0.0;
	            }
	            if ((b.m_flags & b2Body.e_allowSleepFlag) == 0 || b.m_angularVelocity * b.m_angularVelocity > angTolSqr || b2Math.Dot(b.m_linearVelocity, b.m_linearVelocity) > linTolSqr) {
	               b.m_sleepTime = 0.0;
	               minSleepTime = 0.0;
	            }
	            else {
	               b.m_sleepTime += step.dt;
	               minSleepTime = b2Math.Min(minSleepTime, b.m_sleepTime);
	            }
	         }
	         if (minSleepTime >= b2Settings.b2_timeToSleep) {
	            for (i = 0;
	            i < this.m_bodyCount; ++i) {
	               b = this.m_bodies[i];
	               b.SetAwake(false);
	            }
	         }
	      }
	   }
	   b2Island.prototype.SolveTOI = function (subStep) {
	      var i = 0;
	      var j = 0;
	      this.m_contactSolver.Initialize(subStep, this.m_contacts, this.m_contactCount, this.m_allocator);
	      var contactSolver = this.m_contactSolver;
	      for (i = 0;
	      i < this.m_jointCount; ++i) {
	         this.m_joints[i].InitVelocityConstraints(subStep);
	      }
	      for (i = 0;
	      i < subStep.velocityIterations; ++i) {
	         contactSolver.SolveVelocityConstraints();
	         for (j = 0;
	         j < this.m_jointCount; ++j) {
	            this.m_joints[j].SolveVelocityConstraints(subStep);
	         }
	      }
	      for (i = 0;
	      i < this.m_bodyCount; ++i) {
	         var b = this.m_bodies[i];
	         if (b.GetType() == b2Body.b2_staticBody) continue;
	         var translationX = subStep.dt * b.m_linearVelocity.x;
	         var translationY = subStep.dt * b.m_linearVelocity.y;
	         if ((translationX * translationX + translationY * translationY) > b2Settings.b2_maxTranslationSquared) {
	            b.m_linearVelocity.Normalize();
	            b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * subStep.inv_dt;
	            b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * subStep.inv_dt;
	         }
	         var rotation = subStep.dt * b.m_angularVelocity;
	         if (rotation * rotation > b2Settings.b2_maxRotationSquared) {
	            if (b.m_angularVelocity < 0.0) {
	               b.m_angularVelocity = (-b2Settings.b2_maxRotation * subStep.inv_dt);
	            }
	            else {
	               b.m_angularVelocity = b2Settings.b2_maxRotation * subStep.inv_dt;
	            }
	         }
	         b.m_sweep.c0.SetV(b.m_sweep.c);
	         b.m_sweep.a0 = b.m_sweep.a;
	         b.m_sweep.c.x += subStep.dt * b.m_linearVelocity.x;
	         b.m_sweep.c.y += subStep.dt * b.m_linearVelocity.y;
	         b.m_sweep.a += subStep.dt * b.m_angularVelocity;
	         b.SynchronizeTransform();
	      }
	      var k_toiBaumgarte = 0.75;
	      for (i = 0;
	      i < subStep.positionIterations; ++i) {
	         var contactsOkay = contactSolver.SolvePositionConstraints(k_toiBaumgarte);
	         var jointsOkay = true;
	         for (j = 0;
	         j < this.m_jointCount; ++j) {
	            var jointOkay = this.m_joints[j].SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
	            jointsOkay = jointsOkay && jointOkay;
	         }
	         if (contactsOkay && jointsOkay) {
	            break;
	         }
	      }
	      this.Report(contactSolver.m_constraints);
	   }
	   b2Island.prototype.Report = function (constraints) {
	      if (this.m_listener == null) {
	         return;
	      }
	      for (var i = 0; i < this.m_contactCount; ++i) {
	         var c = this.m_contacts[i];
	         var cc = constraints[i];
	         for (var j = 0; j < cc.pointCount; ++j) {
	            b2Island.s_impulse.normalImpulses[j] = cc.points[j].normalImpulse;
	            b2Island.s_impulse.tangentImpulses[j] = cc.points[j].tangentImpulse;
	         }
	         this.m_listener.PostSolve(c, b2Island.s_impulse);
	      }
	   }
	   b2Island.prototype.AddBody = function (body) {
	      body.m_islandIndex = this.m_bodyCount;
	      this.m_bodies[this.m_bodyCount++] = body;
	   }
	   b2Island.prototype.AddContact = function (contact) {
	      this.m_contacts[this.m_contactCount++] = contact;
	   }
	   b2Island.prototype.AddJoint = function (joint) {
	      this.m_joints[this.m_jointCount++] = joint;
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.b2Island.s_impulse = new b2ContactImpulse();
	   });
	   b2TimeStep.b2TimeStep = function () {};
	   b2TimeStep.prototype.Set = function (step) {
	      this.dt = step.dt;
	      this.inv_dt = step.inv_dt;
	      this.positionIterations = step.positionIterations;
	      this.velocityIterations = step.velocityIterations;
	      this.warmStarting = step.warmStarting;
	   }
	   b2World.b2World = function () {
	      this.s_stack = new Vector();
	      this.m_contactManager = new b2ContactManager();
	      this.m_contactSolver = new b2ContactSolver();
	      this.m_island = new b2Island();
	   };
	   b2World.prototype.b2World = function (gravity, doSleep) {
	      this.m_destructionListener = null;
	      this.m_debugDraw = null;
	      this.m_bodyList = null;
	      this.m_contactList = null;
	      this.m_jointList = null;
	      this.m_controllerList = null;
	      this.m_bodyCount = 0;
	      this.m_contactCount = 0;
	      this.m_jointCount = 0;
	      this.m_controllerCount = 0;
	      b2World.m_warmStarting = true;
	      b2World.m_continuousPhysics = true;
	      this.m_allowSleep = doSleep;
	      this.m_gravity = gravity;
	      this.m_inv_dt0 = 0.0;
	      this.m_contactManager.m_world = this;
	      var bd = new b2BodyDef();
	      this.m_groundBody = this.CreateBody(bd);
	   }
	   b2World.prototype.SetDestructionListener = function (listener) {
	      this.m_destructionListener = listener;
	   }
	   b2World.prototype.SetContactFilter = function (filter) {
	      this.m_contactManager.m_contactFilter = filter;
	   }
	   b2World.prototype.SetContactListener = function (listener) {
	      this.m_contactManager.m_contactListener = listener;
	   }
	   b2World.prototype.SetDebugDraw = function (debugDraw) {
	      this.m_debugDraw = debugDraw;
	   }
	   b2World.prototype.SetBroadPhase = function (broadPhase) {
	      var oldBroadPhase = this.m_contactManager.m_broadPhase;
	      this.m_contactManager.m_broadPhase = broadPhase;
	      for (var b = this.m_bodyList; b; b = b.m_next) {
	         for (var f = b.m_fixtureList; f; f = f.m_next) {
	            f.m_proxy = broadPhase.CreateProxy(oldBroadPhase.GetFatAABB(f.m_proxy), f);
	         }
	      }
	   }
	   b2World.prototype.Validate = function () {
	      this.m_contactManager.m_broadPhase.Validate();
	   }
	   b2World.prototype.GetProxyCount = function () {
	      return this.m_contactManager.m_broadPhase.GetProxyCount();
	   }
	   b2World.prototype.CreateBody = function (def) {
	      if (this.IsLocked() == true) {
	         return null;
	      }
	      var b = new b2Body(def, this);
	      b.m_prev = null;
	      b.m_next = this.m_bodyList;
	      if (this.m_bodyList) {
	         this.m_bodyList.m_prev = b;
	      }
	      this.m_bodyList = b;
	      ++this.m_bodyCount;
	      return b;
	   }
	   b2World.prototype.DestroyBody = function (b) {
	      if (this.IsLocked() == true) {
	         return;
	      }
	      var jn = b.m_jointList;
	      while (jn) {
	         var jn0 = jn;
	         jn = jn.next;
	         if (this.m_destructionListener) {
	            this.m_destructionListener.SayGoodbyeJoint(jn0.joint);
	         }
	         this.DestroyJoint(jn0.joint);
	      }
	      var coe = b.m_controllerList;
	      while (coe) {
	         var coe0 = coe;
	         coe = coe.nextController;
	         coe0.controller.RemoveBody(b);
	      }
	      var ce = b.m_contactList;
	      while (ce) {
	         var ce0 = ce;
	         ce = ce.next;
	         this.m_contactManager.Destroy(ce0.contact);
	      }
	      b.m_contactList = null;
	      var f = b.m_fixtureList;
	      while (f) {
	         var f0 = f;
	         f = f.m_next;
	         if (this.m_destructionListener) {
	            this.m_destructionListener.SayGoodbyeFixture(f0);
	         }
	         f0.DestroyProxy(this.m_contactManager.m_broadPhase);
	         f0.Destroy();
	      }
	      b.m_fixtureList = null;
	      b.m_fixtureCount = 0;
	      if (b.m_prev) {
	         b.m_prev.m_next = b.m_next;
	      }
	      if (b.m_next) {
	         b.m_next.m_prev = b.m_prev;
	      }
	      if (b == this.m_bodyList) {
	         this.m_bodyList = b.m_next;
	      }--this.m_bodyCount;
	   }
	   b2World.prototype.CreateJoint = function (def) {
	      var j = b2Joint.Create(def, null);
	      j.m_prev = null;
	      j.m_next = this.m_jointList;
	      if (this.m_jointList) {
	         this.m_jointList.m_prev = j;
	      }
	      this.m_jointList = j;
	      ++this.m_jointCount;
	      j.m_edgeA.joint = j;
	      j.m_edgeA.other = j.m_bodyB;
	      j.m_edgeA.prev = null;
	      j.m_edgeA.next = j.m_bodyA.m_jointList;
	      if (j.m_bodyA.m_jointList) j.m_bodyA.m_jointList.prev = j.m_edgeA;
	      j.m_bodyA.m_jointList = j.m_edgeA;
	      j.m_edgeB.joint = j;
	      j.m_edgeB.other = j.m_bodyA;
	      j.m_edgeB.prev = null;
	      j.m_edgeB.next = j.m_bodyB.m_jointList;
	      if (j.m_bodyB.m_jointList) j.m_bodyB.m_jointList.prev = j.m_edgeB;
	      j.m_bodyB.m_jointList = j.m_edgeB;
	      var bodyA = def.bodyA;
	      var bodyB = def.bodyB;
	      if (def.collideConnected == false) {
	         var edge = bodyB.GetContactList();
	         while (edge) {
	            if (edge.other == bodyA) {
	               edge.contact.FlagForFiltering();
	            }
	            edge = edge.next;
	         }
	      }
	      return j;
	   }
	   b2World.prototype.DestroyJoint = function (j) {
	      var collideConnected = j.m_collideConnected;
	      if (j.m_prev) {
	         j.m_prev.m_next = j.m_next;
	      }
	      if (j.m_next) {
	         j.m_next.m_prev = j.m_prev;
	      }
	      if (j == this.m_jointList) {
	         this.m_jointList = j.m_next;
	      }
	      var bodyA = j.m_bodyA;
	      var bodyB = j.m_bodyB;
	      bodyA.SetAwake(true);
	      bodyB.SetAwake(true);
	      if (j.m_edgeA.prev) {
	         j.m_edgeA.prev.next = j.m_edgeA.next;
	      }
	      if (j.m_edgeA.next) {
	         j.m_edgeA.next.prev = j.m_edgeA.prev;
	      }
	      if (j.m_edgeA == bodyA.m_jointList) {
	         bodyA.m_jointList = j.m_edgeA.next;
	      }
	      j.m_edgeA.prev = null;
	      j.m_edgeA.next = null;
	      if (j.m_edgeB.prev) {
	         j.m_edgeB.prev.next = j.m_edgeB.next;
	      }
	      if (j.m_edgeB.next) {
	         j.m_edgeB.next.prev = j.m_edgeB.prev;
	      }
	      if (j.m_edgeB == bodyB.m_jointList) {
	         bodyB.m_jointList = j.m_edgeB.next;
	      }
	      j.m_edgeB.prev = null;
	      j.m_edgeB.next = null;
	      b2Joint.Destroy(j, null);
	      --this.m_jointCount;
	      if (collideConnected == false) {
	         var edge = bodyB.GetContactList();
	         while (edge) {
	            if (edge.other == bodyA) {
	               edge.contact.FlagForFiltering();
	            }
	            edge = edge.next;
	         }
	      }
	   }
	   b2World.prototype.AddController = function (c) {
	      c.m_next = this.m_controllerList;
	      c.m_prev = null;
	      this.m_controllerList = c;
	      c.m_world = this;
	      this.m_controllerCount++;
	      return c;
	   }
	   b2World.prototype.RemoveController = function (c) {
	      if (c.m_prev) c.m_prev.m_next = c.m_next;
	      if (c.m_next) c.m_next.m_prev = c.m_prev;
	      if (this.m_controllerList == c) this.m_controllerList = c.m_next;
	      this.m_controllerCount--;
	   }
	   b2World.prototype.CreateController = function (controller) {
	      if (controller.m_world != this) throw new Error("Controller can only be a member of one world");
	      controller.m_next = this.m_controllerList;
	      controller.m_prev = null;
	      if (this.m_controllerList) this.m_controllerList.m_prev = controller;
	      this.m_controllerList = controller;
	      ++this.m_controllerCount;
	      controller.m_world = this;
	      return controller;
	   }
	   b2World.prototype.DestroyController = function (controller) {
	      controller.Clear();
	      if (controller.m_next) controller.m_next.m_prev = controller.m_prev;
	      if (controller.m_prev) controller.m_prev.m_next = controller.m_next;
	      if (controller == this.m_controllerList) this.m_controllerList = controller.m_next;
	      --this.m_controllerCount;
	   }
	   b2World.prototype.SetWarmStarting = function (flag) {
	      b2World.m_warmStarting = flag;
	   }
	   b2World.prototype.SetContinuousPhysics = function (flag) {
	      b2World.m_continuousPhysics = flag;
	   }
	   b2World.prototype.GetBodyCount = function () {
	      return this.m_bodyCount;
	   }
	   b2World.prototype.GetJointCount = function () {
	      return this.m_jointCount;
	   }
	   b2World.prototype.GetContactCount = function () {
	      return this.m_contactCount;
	   }
	   b2World.prototype.SetGravity = function (gravity) {
	      this.m_gravity = gravity;
	   }
	   b2World.prototype.GetGravity = function () {
	      return this.m_gravity;
	   }
	   b2World.prototype.GetGroundBody = function () {
	      return this.m_groundBody;
	   }
	   b2World.prototype.Step = function (dt, velocityIterations, positionIterations) {
	      if (dt === undefined) dt = 0;
	      if (velocityIterations === undefined) velocityIterations = 0;
	      if (positionIterations === undefined) positionIterations = 0;
	      if (this.m_flags & b2World.e_newFixture) {
	         this.m_contactManager.FindNewContacts();
	         this.m_flags &= ~b2World.e_newFixture;
	      }
	      this.m_flags |= b2World.e_locked;
	      var step = b2World.s_timestep2;
	      step.dt = dt;
	      step.velocityIterations = velocityIterations;
	      step.positionIterations = positionIterations;
	      if (dt > 0.0) {
	         step.inv_dt = 1.0 / dt;
	      }
	      else {
	         step.inv_dt = 0.0;
	      }
	      step.dtRatio = this.m_inv_dt0 * dt;
	      step.warmStarting = b2World.m_warmStarting;
	      this.m_contactManager.Collide();
	      if (step.dt > 0.0) {
	         this.Solve(step);
	      }
	      if (b2World.m_continuousPhysics && step.dt > 0.0) {
	         this.SolveTOI(step);
	      }
	      if (step.dt > 0.0) {
	         this.m_inv_dt0 = step.inv_dt;
	      }
	      this.m_flags &= ~b2World.e_locked;
	   }
	   b2World.prototype.ClearForces = function () {
	      for (var body = this.m_bodyList; body; body = body.m_next) {
	         body.m_force.SetZero();
	         body.m_torque = 0.0;
	      }
	   }
	   b2World.prototype.DrawDebugData = function () {
	      if (this.m_debugDraw == null) {
	         return;
	      }
	      this.m_debugDraw.m_sprite.graphics.clear();
	      var flags = this.m_debugDraw.GetFlags();
	      var i = 0;
	      var b;
	      var f;
	      var s;
	      var j;
	      var bp;
	      var invQ = new b2Vec2;
	      var x1 = new b2Vec2;
	      var x2 = new b2Vec2;
	      var xf;
	      var b1 = new b2AABB();
	      var b2 = new b2AABB();
	      var vs = [new b2Vec2(), new b2Vec2(), new b2Vec2(), new b2Vec2()];
	      var color = new b2Color(0, 0, 0);
	      if (flags & b2DebugDraw.e_shapeBit) {
	         for (b = this.m_bodyList;
	         b; b = b.m_next) {
	            xf = b.m_xf;
	            for (f = b.GetFixtureList();
	            f; f = f.m_next) {
	               s = f.GetShape();
	               if (b.IsActive() == false) {
	                  color.Set(0.5, 0.5, 0.3);
	                  this.DrawShape(s, xf, color);
	               }
	               else if (b.GetType() == b2Body.b2_staticBody) {
	                  color.Set(0.5, 0.9, 0.5);
	                  this.DrawShape(s, xf, color);
	               }
	               else if (b.GetType() == b2Body.b2_kinematicBody) {
	                  color.Set(0.5, 0.5, 0.9);
	                  this.DrawShape(s, xf, color);
	               }
	               else if (b.IsAwake() == false) {
	                  color.Set(0.6, 0.6, 0.6);
	                  this.DrawShape(s, xf, color);
	               }
	               else {
	                  color.Set(0.9, 0.7, 0.7);
	                  this.DrawShape(s, xf, color);
	               }
	            }
	         }
	      }
	      if (flags & b2DebugDraw.e_jointBit) {
	         for (j = this.m_jointList;
	         j; j = j.m_next) {
	            this.DrawJoint(j);
	         }
	      }
	      if (flags & b2DebugDraw.e_controllerBit) {
	         for (var c = this.m_controllerList; c; c = c.m_next) {
	            c.Draw(this.m_debugDraw);
	         }
	      }
	      if (flags & b2DebugDraw.e_pairBit) {
	         color.Set(0.3, 0.9, 0.9);
	         for (var contact = this.m_contactManager.m_contactList; contact; contact = contact.GetNext()) {
	            var fixtureA = contact.GetFixtureA();
	            var fixtureB = contact.GetFixtureB();
	            var cA = fixtureA.GetAABB().GetCenter();
	            var cB = fixtureB.GetAABB().GetCenter();
	            this.m_debugDraw.DrawSegment(cA, cB, color);
	         }
	      }
	      if (flags & b2DebugDraw.e_aabbBit) {
	         bp = this.m_contactManager.m_broadPhase;
	         vs = [new b2Vec2(), new b2Vec2(), new b2Vec2(), new b2Vec2()];
	         for (b = this.m_bodyList;
	         b; b = b.GetNext()) {
	            if (b.IsActive() == false) {
	               continue;
	            }
	            for (f = b.GetFixtureList();
	            f; f = f.GetNext()) {
	               var aabb = bp.GetFatAABB(f.m_proxy);
	               vs[0].Set(aabb.lowerBound.x, aabb.lowerBound.y);
	               vs[1].Set(aabb.upperBound.x, aabb.lowerBound.y);
	               vs[2].Set(aabb.upperBound.x, aabb.upperBound.y);
	               vs[3].Set(aabb.lowerBound.x, aabb.upperBound.y);
	               this.m_debugDraw.DrawPolygon(vs, 4, color);
	            }
	         }
	      }
	      if (flags & b2DebugDraw.e_centerOfMassBit) {
	         for (b = this.m_bodyList;
	         b; b = b.m_next) {
	            xf = b2World.s_xf;
	            xf.R = b.m_xf.R;
	            xf.position = b.GetWorldCenter();
	            this.m_debugDraw.DrawTransform(xf);
	         }
	      }
	   }
	   b2World.prototype.QueryAABB = function (callback, aabb) {
	      var __this = this;
	      var broadPhase = __this.m_contactManager.m_broadPhase;
	
	      function WorldQueryWrapper(proxy) {
	         return callback(broadPhase.GetUserData(proxy));
	      };
	      broadPhase.Query(WorldQueryWrapper, aabb);
	   }
	   b2World.prototype.QueryShape = function (callback, shape, transform) {
	      var __this = this;
	      if (transform === undefined) transform = null;
	      if (transform == null) {
	         transform = new b2Transform();
	         transform.SetIdentity();
	      }
	      var broadPhase = __this.m_contactManager.m_broadPhase;
	
	      function WorldQueryWrapper(proxy) {
	         var fixture = (broadPhase.GetUserData(proxy) instanceof b2Fixture ? broadPhase.GetUserData(proxy) : null);
	         if (b2Shape.TestOverlap(shape, transform, fixture.GetShape(), fixture.GetBody().GetTransform())) return callback(fixture);
	         return true;
	      };
	      var aabb = new b2AABB();
	      shape.ComputeAABB(aabb, transform);
	      broadPhase.Query(WorldQueryWrapper, aabb);
	   }
	   b2World.prototype.QueryPoint = function (callback, p) {
	      var __this = this;
	      var broadPhase = __this.m_contactManager.m_broadPhase;
	
	      function WorldQueryWrapper(proxy) {
	         var fixture = (broadPhase.GetUserData(proxy) instanceof b2Fixture ? broadPhase.GetUserData(proxy) : null);
	         if (fixture.TestPoint(p)) return callback(fixture);
	         return true;
	      };
	      var aabb = new b2AABB();
	      aabb.lowerBound.Set(p.x - b2Settings.b2_linearSlop, p.y - b2Settings.b2_linearSlop);
	      aabb.upperBound.Set(p.x + b2Settings.b2_linearSlop, p.y + b2Settings.b2_linearSlop);
	      broadPhase.Query(WorldQueryWrapper, aabb);
	   }
	   b2World.prototype.RayCast = function (callback, point1, point2) {
	      var __this = this;
	      var broadPhase = __this.m_contactManager.m_broadPhase;
	      var output = new b2RayCastOutput;
	
	      function RayCastWrapper(input, proxy) {
	         var userData = broadPhase.GetUserData(proxy);
	         var fixture = (userData instanceof b2Fixture ? userData : null);
	         var hit = fixture.RayCast(output, input);
	         if (hit) {
	            var fraction = output.fraction;
	            var point = new b2Vec2((1.0 - fraction) * point1.x + fraction * point2.x, (1.0 - fraction) * point1.y + fraction * point2.y);
	            return callback(fixture, point, output.normal, fraction);
	         }
	         return input.maxFraction;
	      };
	      var input = new b2RayCastInput(point1, point2);
	      broadPhase.RayCast(RayCastWrapper, input);
	   }
	   b2World.prototype.RayCastOne = function (point1, point2) {
	      var __this = this;
	      var result;
	
	      function RayCastOneWrapper(fixture, point, normal, fraction) {
	         if (fraction === undefined) fraction = 0;
	         result = fixture;
	         return fraction;
	      };
	      __this.RayCast(RayCastOneWrapper, point1, point2);
	      return result;
	   }
	   b2World.prototype.RayCastAll = function (point1, point2) {
	      var __this = this;
	      var result = new Vector();
	
	      function RayCastAllWrapper(fixture, point, normal, fraction) {
	         if (fraction === undefined) fraction = 0;
	         result[result.length] = fixture;
	         return 1;
	      };
	      __this.RayCast(RayCastAllWrapper, point1, point2);
	      return result;
	   }
	   b2World.prototype.GetBodyList = function () {
	      return this.m_bodyList;
	   }
	   b2World.prototype.GetJointList = function () {
	      return this.m_jointList;
	   }
	   b2World.prototype.GetContactList = function () {
	      return this.m_contactList;
	   }
	   b2World.prototype.IsLocked = function () {
	      return (this.m_flags & b2World.e_locked) > 0;
	   }
	   b2World.prototype.Solve = function (step) {
	      var b;
	      for (var controller = this.m_controllerList; controller; controller = controller.m_next) {
	         controller.Step(step);
	      }
	      var island = this.m_island;
	      island.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
	      for (b = this.m_bodyList;
	      b; b = b.m_next) {
	         b.m_flags &= ~b2Body.e_islandFlag;
	      }
	      for (var c = this.m_contactList; c; c = c.m_next) {
	         c.m_flags &= ~b2Contact.e_islandFlag;
	      }
	      for (var j = this.m_jointList; j; j = j.m_next) {
	         j.m_islandFlag = false;
	      }
	      var stackSize = parseInt(this.m_bodyCount);
	      var stack = this.s_stack;
	      for (var seed = this.m_bodyList; seed; seed = seed.m_next) {
	         if (seed.m_flags & b2Body.e_islandFlag) {
	            continue;
	         }
	         if (seed.IsAwake() == false || seed.IsActive() == false) {
	            continue;
	         }
	         if (seed.GetType() == b2Body.b2_staticBody) {
	            continue;
	         }
	         island.Clear();
	         var stackCount = 0;
	         stack[stackCount++] = seed;
	         seed.m_flags |= b2Body.e_islandFlag;
	         while (stackCount > 0) {
	            b = stack[--stackCount];
	            island.AddBody(b);
	            if (b.IsAwake() == false) {
	               b.SetAwake(true);
	            }
	            if (b.GetType() == b2Body.b2_staticBody) {
	               continue;
	            }
	            var other;
	            for (var ce = b.m_contactList; ce; ce = ce.next) {
	               if (ce.contact.m_flags & b2Contact.e_islandFlag) {
	                  continue;
	               }
	               if (ce.contact.IsSensor() == true || ce.contact.IsEnabled() == false || ce.contact.IsTouching() == false) {
	                  continue;
	               }
	               island.AddContact(ce.contact);
	               ce.contact.m_flags |= b2Contact.e_islandFlag;
	               other = ce.other;
	               if (other.m_flags & b2Body.e_islandFlag) {
	                  continue;
	               }
	               stack[stackCount++] = other;
	               other.m_flags |= b2Body.e_islandFlag;
	            }
	            for (var jn = b.m_jointList; jn; jn = jn.next) {
	               if (jn.joint.m_islandFlag == true) {
	                  continue;
	               }
	               other = jn.other;
	               if (other.IsActive() == false) {
	                  continue;
	               }
	               island.AddJoint(jn.joint);
	               jn.joint.m_islandFlag = true;
	               if (other.m_flags & b2Body.e_islandFlag) {
	                  continue;
	               }
	               stack[stackCount++] = other;
	               other.m_flags |= b2Body.e_islandFlag;
	            }
	         }
	         island.Solve(step, this.m_gravity, this.m_allowSleep);
	         for (var i = 0; i < island.m_bodyCount; ++i) {
	            b = island.m_bodies[i];
	            if (b.GetType() == b2Body.b2_staticBody) {
	               b.m_flags &= ~b2Body.e_islandFlag;
	            }
	         }
	      }
	      for (i = 0;
	      i < stack.length; ++i) {
	         if (!stack[i]) break;
	         stack[i] = null;
	      }
	      for (b = this.m_bodyList;
	      b; b = b.m_next) {
	         if (b.IsAwake() == false || b.IsActive() == false) {
	            continue;
	         }
	         if (b.GetType() == b2Body.b2_staticBody) {
	            continue;
	         }
	         b.SynchronizeFixtures();
	      }
	      this.m_contactManager.FindNewContacts();
	   }
	   b2World.prototype.SolveTOI = function (step) {
	      var b;
	      var fA;
	      var fB;
	      var bA;
	      var bB;
	      var cEdge;
	      var j;
	      var island = this.m_island;
	      island.Initialize(this.m_bodyCount, b2Settings.b2_maxTOIContactsPerIsland, b2Settings.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
	      var queue = b2World.s_queue;
	      for (b = this.m_bodyList;
	      b; b = b.m_next) {
	         b.m_flags &= ~b2Body.e_islandFlag;
	         b.m_sweep.t0 = 0.0;
	      }
	      var c;
	      for (c = this.m_contactList;
	      c; c = c.m_next) {
	         c.m_flags &= ~ (b2Contact.e_toiFlag | b2Contact.e_islandFlag);
	      }
	      for (j = this.m_jointList;
	      j; j = j.m_next) {
	         j.m_islandFlag = false;
	      }
	      for (;;) {
	         var minContact = null;
	         var minTOI = 1.0;
	         for (c = this.m_contactList;
	         c; c = c.m_next) {
	            if (c.IsSensor() == true || c.IsEnabled() == false || c.IsContinuous() == false) {
	               continue;
	            }
	            var toi = 1.0;
	            if (c.m_flags & b2Contact.e_toiFlag) {
	               toi = c.m_toi;
	            }
	            else {
	               fA = c.m_fixtureA;
	               fB = c.m_fixtureB;
	               bA = fA.m_body;
	               bB = fB.m_body;
	               if ((bA.GetType() != b2Body.b2_dynamicBody || bA.IsAwake() == false) && (bB.GetType() != b2Body.b2_dynamicBody || bB.IsAwake() == false)) {
	                  continue;
	               }
	               var t0 = bA.m_sweep.t0;
	               if (bA.m_sweep.t0 < bB.m_sweep.t0) {
	                  t0 = bB.m_sweep.t0;
	                  bA.m_sweep.Advance(t0);
	               }
	               else if (bB.m_sweep.t0 < bA.m_sweep.t0) {
	                  t0 = bA.m_sweep.t0;
	                  bB.m_sweep.Advance(t0);
	               }
	               toi = c.ComputeTOI(bA.m_sweep, bB.m_sweep);
	               b2Settings.b2Assert(0.0 <= toi && toi <= 1.0);
	               if (toi > 0.0 && toi < 1.0) {
	                  toi = (1.0 - toi) * t0 + toi;
	                  if (toi > 1) toi = 1;
	               }
	               c.m_toi = toi;
	               c.m_flags |= b2Contact.e_toiFlag;
	            }
	            if (Number.MIN_VALUE < toi && toi < minTOI) {
	               minContact = c;
	               minTOI = toi;
	            }
	         }
	         if (minContact == null || 1.0 - 100.0 * Number.MIN_VALUE < minTOI) {
	            break;
	         }
	         fA = minContact.m_fixtureA;
	         fB = minContact.m_fixtureB;
	         bA = fA.m_body;
	         bB = fB.m_body;
	         b2World.s_backupA.Set(bA.m_sweep);
	         b2World.s_backupB.Set(bB.m_sweep);
	         bA.Advance(minTOI);
	         bB.Advance(minTOI);
	         minContact.Update(this.m_contactManager.m_contactListener);
	         minContact.m_flags &= ~b2Contact.e_toiFlag;
	         if (minContact.IsSensor() == true || minContact.IsEnabled() == false) {
	            bA.m_sweep.Set(b2World.s_backupA);
	            bB.m_sweep.Set(b2World.s_backupB);
	            bA.SynchronizeTransform();
	            bB.SynchronizeTransform();
	            continue;
	         }
	         if (minContact.IsTouching() == false) {
	            continue;
	         }
	         var seed = bA;
	         if (seed.GetType() != b2Body.b2_dynamicBody) {
	            seed = bB;
	         }
	         island.Clear();
	         var queueStart = 0;
	         var queueSize = 0;
	         queue[queueStart + queueSize++] = seed;
	         seed.m_flags |= b2Body.e_islandFlag;
	         while (queueSize > 0) {
	            b = queue[queueStart++];
	            --queueSize;
	            island.AddBody(b);
	            if (b.IsAwake() == false) {
	               b.SetAwake(true);
	            }
	            if (b.GetType() != b2Body.b2_dynamicBody) {
	               continue;
	            }
	            for (cEdge = b.m_contactList;
	            cEdge; cEdge = cEdge.next) {
	               if (island.m_contactCount == island.m_contactCapacity) {
	                  break;
	               }
	               if (cEdge.contact.m_flags & b2Contact.e_islandFlag) {
	                  continue;
	               }
	               if (cEdge.contact.IsSensor() == true || cEdge.contact.IsEnabled() == false || cEdge.contact.IsTouching() == false) {
	                  continue;
	               }
	               island.AddContact(cEdge.contact);
	               cEdge.contact.m_flags |= b2Contact.e_islandFlag;
	               var other = cEdge.other;
	               if (other.m_flags & b2Body.e_islandFlag) {
	                  continue;
	               }
	               if (other.GetType() != b2Body.b2_staticBody) {
	                  other.Advance(minTOI);
	                  other.SetAwake(true);
	               }
	               queue[queueStart + queueSize] = other;
	               ++queueSize;
	               other.m_flags |= b2Body.e_islandFlag;
	            }
	            for (var jEdge = b.m_jointList; jEdge; jEdge = jEdge.next) {
	               if (island.m_jointCount == island.m_jointCapacity) continue;
	               if (jEdge.joint.m_islandFlag == true) continue;
	               other = jEdge.other;
	               if (other.IsActive() == false) {
	                  continue;
	               }
	               island.AddJoint(jEdge.joint);
	               jEdge.joint.m_islandFlag = true;
	               if (other.m_flags & b2Body.e_islandFlag) continue;
	               if (other.GetType() != b2Body.b2_staticBody) {
	                  other.Advance(minTOI);
	                  other.SetAwake(true);
	               }
	               queue[queueStart + queueSize] = other;
	               ++queueSize;
	               other.m_flags |= b2Body.e_islandFlag;
	            }
	         }
	         var subStep = b2World.s_timestep;
	         subStep.warmStarting = false;
	         subStep.dt = (1.0 - minTOI) * step.dt;
	         subStep.inv_dt = 1.0 / subStep.dt;
	         subStep.dtRatio = 0.0;
	         subStep.velocityIterations = step.velocityIterations;
	         subStep.positionIterations = step.positionIterations;
	         island.SolveTOI(subStep);
	         var i = 0;
	         for (i = 0;
	         i < island.m_bodyCount; ++i) {
	            b = island.m_bodies[i];
	            b.m_flags &= ~b2Body.e_islandFlag;
	            if (b.IsAwake() == false) {
	               continue;
	            }
	            if (b.GetType() != b2Body.b2_dynamicBody) {
	               continue;
	            }
	            b.SynchronizeFixtures();
	            for (cEdge = b.m_contactList;
	            cEdge; cEdge = cEdge.next) {
	               cEdge.contact.m_flags &= ~b2Contact.e_toiFlag;
	            }
	         }
	         for (i = 0;
	         i < island.m_contactCount; ++i) {
	            c = island.m_contacts[i];
	            c.m_flags &= ~ (b2Contact.e_toiFlag | b2Contact.e_islandFlag);
	         }
	         for (i = 0;
	         i < island.m_jointCount; ++i) {
	            j = island.m_joints[i];
	            j.m_islandFlag = false;
	         }
	         this.m_contactManager.FindNewContacts();
	      }
	   }
	   b2World.prototype.DrawJoint = function (joint) {
	      var b1 = joint.GetBodyA();
	      var b2 = joint.GetBodyB();
	      var xf1 = b1.m_xf;
	      var xf2 = b2.m_xf;
	      var x1 = xf1.position;
	      var x2 = xf2.position;
	      var p1 = joint.GetAnchorA();
	      var p2 = joint.GetAnchorB();
	      var color = b2World.s_jointColor;
	      switch (joint.m_type) {
	      case b2Joint.e_distanceJoint:
	         this.m_debugDraw.DrawSegment(p1, p2, color);
	         break;
	      case b2Joint.e_pulleyJoint:
	         {
	            var pulley = ((joint instanceof b2PulleyJoint ? joint : null));
	            var s1 = pulley.GetGroundAnchorA();
	            var s2 = pulley.GetGroundAnchorB();
	            this.m_debugDraw.DrawSegment(s1, p1, color);
	            this.m_debugDraw.DrawSegment(s2, p2, color);
	            this.m_debugDraw.DrawSegment(s1, s2, color);
	         }
	         break;
	      case b2Joint.e_mouseJoint:
	         this.m_debugDraw.DrawSegment(p1, p2, color);
	         break;
	      default:
	         if (b1 != this.m_groundBody) this.m_debugDraw.DrawSegment(x1, p1, color);
	         this.m_debugDraw.DrawSegment(p1, p2, color);
	         if (b2 != this.m_groundBody) this.m_debugDraw.DrawSegment(x2, p2, color);
	      }
	   }
	   b2World.prototype.DrawShape = function (shape, xf, color) {
	      switch (shape.m_type) {
	      case b2Shape.e_circleShape:
	         {
	            var circle = ((shape instanceof b2CircleShape ? shape : null));
	            var center = b2Math.MulX(xf, circle.m_p);
	            var radius = circle.m_radius;
	            var axis = xf.R.col1;
	            this.m_debugDraw.DrawSolidCircle(center, radius, axis, color);
	         }
	         break;
	      case b2Shape.e_polygonShape:
	         {
	            var i = 0;
	            var poly = ((shape instanceof b2PolygonShape ? shape : null));
	            var vertexCount = parseInt(poly.GetVertexCount());
	            var localVertices = poly.GetVertices();
	            var vertices = new Vector(vertexCount);
	            for (i = 0;
	            i < vertexCount; ++i) {
	               vertices[i] = b2Math.MulX(xf, localVertices[i]);
	            }
	            this.m_debugDraw.DrawSolidPolygon(vertices, vertexCount, color);
	         }
	         break;
	      case b2Shape.e_edgeShape:
	         {
	            var edge = (shape instanceof b2EdgeShape ? shape : null);
	            this.m_debugDraw.DrawSegment(b2Math.MulX(xf, edge.GetVertex1()), b2Math.MulX(xf, edge.GetVertex2()), color);
	         }
	         break;
	      }
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.b2World.s_timestep2 = new b2TimeStep();
	      Box2D.Dynamics.b2World.s_xf = new b2Transform();
	      Box2D.Dynamics.b2World.s_backupA = new b2Sweep();
	      Box2D.Dynamics.b2World.s_backupB = new b2Sweep();
	      Box2D.Dynamics.b2World.s_timestep = new b2TimeStep();
	      Box2D.Dynamics.b2World.s_queue = new Vector();
	      Box2D.Dynamics.b2World.s_jointColor = new b2Color(0.5, 0.8, 0.8);
	      Box2D.Dynamics.b2World.e_newFixture = 0x0001;
	      Box2D.Dynamics.b2World.e_locked = 0x0002;
	   });
	})();
	(function () {
	   var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	      b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
	      b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
	      b2MassData = Box2D.Collision.Shapes.b2MassData,
	      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	      b2Shape = Box2D.Collision.Shapes.b2Shape,
	      b2CircleContact = Box2D.Dynamics.Contacts.b2CircleContact,
	      b2Contact = Box2D.Dynamics.Contacts.b2Contact,
	      b2ContactConstraint = Box2D.Dynamics.Contacts.b2ContactConstraint,
	      b2ContactConstraintPoint = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
	      b2ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge,
	      b2ContactFactory = Box2D.Dynamics.Contacts.b2ContactFactory,
	      b2ContactRegister = Box2D.Dynamics.Contacts.b2ContactRegister,
	      b2ContactResult = Box2D.Dynamics.Contacts.b2ContactResult,
	      b2ContactSolver = Box2D.Dynamics.Contacts.b2ContactSolver,
	      b2EdgeAndCircleContact = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
	      b2NullContact = Box2D.Dynamics.Contacts.b2NullContact,
	      b2PolyAndCircleContact = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
	      b2PolyAndEdgeContact = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
	      b2PolygonContact = Box2D.Dynamics.Contacts.b2PolygonContact,
	      b2PositionSolverManifold = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
	      b2Body = Box2D.Dynamics.b2Body,
	      b2BodyDef = Box2D.Dynamics.b2BodyDef,
	      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
	      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
	      b2ContactListener = Box2D.Dynamics.b2ContactListener,
	      b2ContactManager = Box2D.Dynamics.b2ContactManager,
	      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
	      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
	      b2FilterData = Box2D.Dynamics.b2FilterData,
	      b2Fixture = Box2D.Dynamics.b2Fixture,
	      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	      b2Island = Box2D.Dynamics.b2Island,
	      b2TimeStep = Box2D.Dynamics.b2TimeStep,
	      b2World = Box2D.Dynamics.b2World,
	      b2Color = Box2D.Common.b2Color,
	      b2internal = Box2D.Common.b2internal,
	      b2Settings = Box2D.Common.b2Settings,
	      b2Mat22 = Box2D.Common.Math.b2Mat22,
	      b2Mat33 = Box2D.Common.Math.b2Mat33,
	      b2Math = Box2D.Common.Math.b2Math,
	      b2Sweep = Box2D.Common.Math.b2Sweep,
	      b2Transform = Box2D.Common.Math.b2Transform,
	      b2Vec2 = Box2D.Common.Math.b2Vec2,
	      b2Vec3 = Box2D.Common.Math.b2Vec3,
	      b2AABB = Box2D.Collision.b2AABB,
	      b2Bound = Box2D.Collision.b2Bound,
	      b2BoundValues = Box2D.Collision.b2BoundValues,
	      b2Collision = Box2D.Collision.b2Collision,
	      b2ContactID = Box2D.Collision.b2ContactID,
	      b2ContactPoint = Box2D.Collision.b2ContactPoint,
	      b2Distance = Box2D.Collision.b2Distance,
	      b2DistanceInput = Box2D.Collision.b2DistanceInput,
	      b2DistanceOutput = Box2D.Collision.b2DistanceOutput,
	      b2DistanceProxy = Box2D.Collision.b2DistanceProxy,
	      b2DynamicTree = Box2D.Collision.b2DynamicTree,
	      b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase,
	      b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode,
	      b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair,
	      b2Manifold = Box2D.Collision.b2Manifold,
	      b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint,
	      b2Point = Box2D.Collision.b2Point,
	      b2RayCastInput = Box2D.Collision.b2RayCastInput,
	      b2RayCastOutput = Box2D.Collision.b2RayCastOutput,
	      b2Segment = Box2D.Collision.b2Segment,
	      b2SeparationFunction = Box2D.Collision.b2SeparationFunction,
	      b2Simplex = Box2D.Collision.b2Simplex,
	      b2SimplexCache = Box2D.Collision.b2SimplexCache,
	      b2SimplexVertex = Box2D.Collision.b2SimplexVertex,
	      b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact,
	      b2TOIInput = Box2D.Collision.b2TOIInput,
	      b2WorldManifold = Box2D.Collision.b2WorldManifold,
	      ClipVertex = Box2D.Collision.ClipVertex,
	      Features = Box2D.Collision.Features,
	      IBroadPhase = Box2D.Collision.IBroadPhase;
	
	   Box2D.inherit(b2CircleContact, Box2D.Dynamics.Contacts.b2Contact);
	   b2CircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
	   b2CircleContact.b2CircleContact = function () {
	      Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
	   };
	   b2CircleContact.Create = function (allocator) {
	      return new b2CircleContact();
	   }
	   b2CircleContact.Destroy = function (contact, allocator) {}
	   b2CircleContact.prototype.Reset = function (fixtureA, fixtureB) {
	      this.__super.Reset.call(this, fixtureA, fixtureB);
	   }
	   b2CircleContact.prototype.Evaluate = function () {
	      var bA = this.m_fixtureA.GetBody();
	      var bB = this.m_fixtureB.GetBody();
	      b2Collision.CollideCircles(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2CircleShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2CircleShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
	   }
	   b2Contact.b2Contact = function () {
	      this.m_nodeA = new b2ContactEdge();
	      this.m_nodeB = new b2ContactEdge();
	      this.m_manifold = new b2Manifold();
	      this.m_oldManifold = new b2Manifold();
	   };
	   b2Contact.prototype.GetManifold = function () {
	      return this.m_manifold;
	   }
	   b2Contact.prototype.GetWorldManifold = function (worldManifold) {
	      var bodyA = this.m_fixtureA.GetBody();
	      var bodyB = this.m_fixtureB.GetBody();
	      var shapeA = this.m_fixtureA.GetShape();
	      var shapeB = this.m_fixtureB.GetShape();
	      worldManifold.Initialize(this.m_manifold, bodyA.GetTransform(), shapeA.m_radius, bodyB.GetTransform(), shapeB.m_radius);
	   }
	   b2Contact.prototype.IsTouching = function () {
	      return (this.m_flags & b2Contact.e_touchingFlag) == b2Contact.e_touchingFlag;
	   }
	   b2Contact.prototype.IsContinuous = function () {
	      return (this.m_flags & b2Contact.e_continuousFlag) == b2Contact.e_continuousFlag;
	   }
	   b2Contact.prototype.SetSensor = function (sensor) {
	      if (sensor) {
	         this.m_flags |= b2Contact.e_sensorFlag;
	      }
	      else {
	         this.m_flags &= ~b2Contact.e_sensorFlag;
	      }
	   }
	   b2Contact.prototype.IsSensor = function () {
	      return (this.m_flags & b2Contact.e_sensorFlag) == b2Contact.e_sensorFlag;
	   }
	   b2Contact.prototype.SetEnabled = function (flag) {
	      if (flag) {
	         this.m_flags |= b2Contact.e_enabledFlag;
	      }
	      else {
	         this.m_flags &= ~b2Contact.e_enabledFlag;
	      }
	   }
	   b2Contact.prototype.IsEnabled = function () {
	      return (this.m_flags & b2Contact.e_enabledFlag) == b2Contact.e_enabledFlag;
	   }
	   b2Contact.prototype.GetNext = function () {
	      return this.m_next;
	   }
	   b2Contact.prototype.GetFixtureA = function () {
	      return this.m_fixtureA;
	   }
	   b2Contact.prototype.GetFixtureB = function () {
	      return this.m_fixtureB;
	   }
	   b2Contact.prototype.FlagForFiltering = function () {
	      this.m_flags |= b2Contact.e_filterFlag;
	   }
	   b2Contact.prototype.b2Contact = function () {}
	   b2Contact.prototype.Reset = function (fixtureA, fixtureB) {
	      if (fixtureA === undefined) fixtureA = null;
	      if (fixtureB === undefined) fixtureB = null;
	      this.m_flags = b2Contact.e_enabledFlag;
	      if (!fixtureA || !fixtureB) {
	         this.m_fixtureA = null;
	         this.m_fixtureB = null;
	         return;
	      }
	      if (fixtureA.IsSensor() || fixtureB.IsSensor()) {
	         this.m_flags |= b2Contact.e_sensorFlag;
	      }
	      var bodyA = fixtureA.GetBody();
	      var bodyB = fixtureB.GetBody();
	      if (bodyA.GetType() != b2Body.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != b2Body.b2_dynamicBody || bodyB.IsBullet()) {
	         this.m_flags |= b2Contact.e_continuousFlag;
	      }
	      this.m_fixtureA = fixtureA;
	      this.m_fixtureB = fixtureB;
	      this.m_manifold.m_pointCount = 0;
	      this.m_prev = null;
	      this.m_next = null;
	      this.m_nodeA.contact = null;
	      this.m_nodeA.prev = null;
	      this.m_nodeA.next = null;
	      this.m_nodeA.other = null;
	      this.m_nodeB.contact = null;
	      this.m_nodeB.prev = null;
	      this.m_nodeB.next = null;
	      this.m_nodeB.other = null;
	   }
	   b2Contact.prototype.Update = function (listener) {
	      var tManifold = this.m_oldManifold;
	      this.m_oldManifold = this.m_manifold;
	      this.m_manifold = tManifold;
	      this.m_flags |= b2Contact.e_enabledFlag;
	      var touching = false;
	      var wasTouching = (this.m_flags & b2Contact.e_touchingFlag) == b2Contact.e_touchingFlag;
	      var bodyA = this.m_fixtureA.m_body;
	      var bodyB = this.m_fixtureB.m_body;
	      var aabbOverlap = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
	      if (this.m_flags & b2Contact.e_sensorFlag) {
	         if (aabbOverlap) {
	            var shapeA = this.m_fixtureA.GetShape();
	            var shapeB = this.m_fixtureB.GetShape();
	            var xfA = bodyA.GetTransform();
	            var xfB = bodyB.GetTransform();
	            touching = b2Shape.TestOverlap(shapeA, xfA, shapeB, xfB);
	         }
	         this.m_manifold.m_pointCount = 0;
	      }
	      else {
	         if (bodyA.GetType() != b2Body.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != b2Body.b2_dynamicBody || bodyB.IsBullet()) {
	            this.m_flags |= b2Contact.e_continuousFlag;
	         }
	         else {
	            this.m_flags &= ~b2Contact.e_continuousFlag;
	         }
	         if (aabbOverlap) {
	            this.Evaluate();
	            touching = this.m_manifold.m_pointCount > 0;
	            for (var i = 0; i < this.m_manifold.m_pointCount; ++i) {
	               var mp2 = this.m_manifold.m_points[i];
	               mp2.m_normalImpulse = 0.0;
	               mp2.m_tangentImpulse = 0.0;
	               var id2 = mp2.m_id;
	               for (var j = 0; j < this.m_oldManifold.m_pointCount; ++j) {
	                  var mp1 = this.m_oldManifold.m_points[j];
	                  if (mp1.m_id.key == id2.key) {
	                     mp2.m_normalImpulse = mp1.m_normalImpulse;
	                     mp2.m_tangentImpulse = mp1.m_tangentImpulse;
	                     break;
	                  }
	               }
	            }
	         }
	         else {
	            this.m_manifold.m_pointCount = 0;
	         }
	         if (touching != wasTouching) {
	            bodyA.SetAwake(true);
	            bodyB.SetAwake(true);
	         }
	      }
	      if (touching) {
	         this.m_flags |= b2Contact.e_touchingFlag;
	      }
	      else {
	         this.m_flags &= ~b2Contact.e_touchingFlag;
	      }
	      if (wasTouching == false && touching == true) {
	         listener.BeginContact(this);
	      }
	      if (wasTouching == true && touching == false) {
	         listener.EndContact(this);
	      }
	      if ((this.m_flags & b2Contact.e_sensorFlag) == 0) {
	         listener.PreSolve(this, this.m_oldManifold);
	      }
	   }
	   b2Contact.prototype.Evaluate = function () {}
	   b2Contact.prototype.ComputeTOI = function (sweepA, sweepB) {
	      b2Contact.s_input.proxyA.Set(this.m_fixtureA.GetShape());
	      b2Contact.s_input.proxyB.Set(this.m_fixtureB.GetShape());
	      b2Contact.s_input.sweepA = sweepA;
	      b2Contact.s_input.sweepB = sweepB;
	      b2Contact.s_input.tolerance = b2Settings.b2_linearSlop;
	      return b2TimeOfImpact.TimeOfImpact(b2Contact.s_input);
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.Contacts.b2Contact.e_sensorFlag = 0x0001;
	      Box2D.Dynamics.Contacts.b2Contact.e_continuousFlag = 0x0002;
	      Box2D.Dynamics.Contacts.b2Contact.e_islandFlag = 0x0004;
	      Box2D.Dynamics.Contacts.b2Contact.e_toiFlag = 0x0008;
	      Box2D.Dynamics.Contacts.b2Contact.e_touchingFlag = 0x0010;
	      Box2D.Dynamics.Contacts.b2Contact.e_enabledFlag = 0x0020;
	      Box2D.Dynamics.Contacts.b2Contact.e_filterFlag = 0x0040;
	      Box2D.Dynamics.Contacts.b2Contact.s_input = new b2TOIInput();
	   });
	   b2ContactConstraint.b2ContactConstraint = function () {
	      this.localPlaneNormal = new b2Vec2();
	      this.localPoint = new b2Vec2();
	      this.normal = new b2Vec2();
	      this.normalMass = new b2Mat22();
	      this.K = new b2Mat22();
	   };
	   b2ContactConstraint.prototype.b2ContactConstraint = function () {
	      this.points = new Vector(b2Settings.b2_maxManifoldPoints);
	      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
	         this.points[i] = new b2ContactConstraintPoint();
	      }
	   }
	   b2ContactConstraintPoint.b2ContactConstraintPoint = function () {
	      this.localPoint = new b2Vec2();
	      this.rA = new b2Vec2();
	      this.rB = new b2Vec2();
	   };
	   b2ContactEdge.b2ContactEdge = function () {};
	   b2ContactFactory.b2ContactFactory = function () {};
	   b2ContactFactory.prototype.b2ContactFactory = function (allocator) {
	      this.m_allocator = allocator;
	      this.InitializeRegisters();
	   }
	   b2ContactFactory.prototype.AddType = function (createFcn, destroyFcn, type1, type2) {
	      if (type1 === undefined) type1 = 0;
	      if (type2 === undefined) type2 = 0;
	      this.m_registers[type1][type2].createFcn = createFcn;
	      this.m_registers[type1][type2].destroyFcn = destroyFcn;
	      this.m_registers[type1][type2].primary = true;
	      if (type1 != type2) {
	         this.m_registers[type2][type1].createFcn = createFcn;
	         this.m_registers[type2][type1].destroyFcn = destroyFcn;
	         this.m_registers[type2][type1].primary = false;
	      }
	   }
	   b2ContactFactory.prototype.InitializeRegisters = function () {
	      this.m_registers = new Vector(b2Shape.e_shapeTypeCount);
	      for (var i = 0; i < b2Shape.e_shapeTypeCount; i++) {
	         this.m_registers[i] = new Vector(b2Shape.e_shapeTypeCount);
	         for (var j = 0; j < b2Shape.e_shapeTypeCount; j++) {
	            this.m_registers[i][j] = new b2ContactRegister();
	         }
	      }
	      this.AddType(b2CircleContact.Create, b2CircleContact.Destroy, b2Shape.e_circleShape, b2Shape.e_circleShape);
	      this.AddType(b2PolyAndCircleContact.Create, b2PolyAndCircleContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_circleShape);
	      this.AddType(b2PolygonContact.Create, b2PolygonContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_polygonShape);
	      this.AddType(b2EdgeAndCircleContact.Create, b2EdgeAndCircleContact.Destroy, b2Shape.e_edgeShape, b2Shape.e_circleShape);
	      this.AddType(b2PolyAndEdgeContact.Create, b2PolyAndEdgeContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_edgeShape);
	   }
	   b2ContactFactory.prototype.Create = function (fixtureA, fixtureB) {
	      var type1 = parseInt(fixtureA.GetType());
	      var type2 = parseInt(fixtureB.GetType());
	      var reg = this.m_registers[type1][type2];
	      var c;
	      if (reg.pool) {
	         c = reg.pool;
	         reg.pool = c.m_next;
	         reg.poolCount--;
	         c.Reset(fixtureA, fixtureB);
	         return c;
	      }
	      var createFcn = reg.createFcn;
	      if (createFcn != null) {
	         if (reg.primary) {
	            c = createFcn(this.m_allocator);
	            c.Reset(fixtureA, fixtureB);
	            return c;
	         }
	         else {
	            c = createFcn(this.m_allocator);
	            c.Reset(fixtureB, fixtureA);
	            return c;
	         }
	      }
	      else {
	         return null;
	      }
	   }
	   b2ContactFactory.prototype.Destroy = function (contact) {
	      if (contact.m_manifold.m_pointCount > 0) {
	         contact.m_fixtureA.m_body.SetAwake(true);
	         contact.m_fixtureB.m_body.SetAwake(true);
	      }
	      var type1 = parseInt(contact.m_fixtureA.GetType());
	      var type2 = parseInt(contact.m_fixtureB.GetType());
	      var reg = this.m_registers[type1][type2];
	      if (true) {
	         reg.poolCount++;
	         contact.m_next = reg.pool;
	         reg.pool = contact;
	      }
	      var destroyFcn = reg.destroyFcn;
	      destroyFcn(contact, this.m_allocator);
	   }
	   b2ContactRegister.b2ContactRegister = function () {};
	   b2ContactResult.b2ContactResult = function () {
	      this.position = new b2Vec2();
	      this.normal = new b2Vec2();
	      this.id = new b2ContactID();
	   };
	   b2ContactSolver.b2ContactSolver = function () {
	      this.m_step = new b2TimeStep();
	      this.m_constraints = new Vector();
	   };
	   b2ContactSolver.prototype.b2ContactSolver = function () {}
	   b2ContactSolver.prototype.Initialize = function (step, contacts, contactCount, allocator) {
	      if (contactCount === undefined) contactCount = 0;
	      var contact;
	      this.m_step.Set(step);
	      this.m_allocator = allocator;
	      var i = 0;
	      var tVec;
	      var tMat;
	      this.m_constraintCount = contactCount;
	      while (this.m_constraints.length < this.m_constraintCount) {
	         this.m_constraints[this.m_constraints.length] = new b2ContactConstraint();
	      }
	      for (i = 0;
	      i < contactCount; ++i) {
	         contact = contacts[i];
	         var fixtureA = contact.m_fixtureA;
	         var fixtureB = contact.m_fixtureB;
	         var shapeA = fixtureA.m_shape;
	         var shapeB = fixtureB.m_shape;
	         var radiusA = shapeA.m_radius;
	         var radiusB = shapeB.m_radius;
	         var bodyA = fixtureA.m_body;
	         var bodyB = fixtureB.m_body;
	         var manifold = contact.GetManifold();
	         var friction = b2Settings.b2MixFriction(fixtureA.GetFriction(), fixtureB.GetFriction());
	         var restitution = b2Settings.b2MixRestitution(fixtureA.GetRestitution(), fixtureB.GetRestitution());
	         var vAX = bodyA.m_linearVelocity.x;
	         var vAY = bodyA.m_linearVelocity.y;
	         var vBX = bodyB.m_linearVelocity.x;
	         var vBY = bodyB.m_linearVelocity.y;
	         var wA = bodyA.m_angularVelocity;
	         var wB = bodyB.m_angularVelocity;
	         b2Settings.b2Assert(manifold.m_pointCount > 0);
	         b2ContactSolver.s_worldManifold.Initialize(manifold, bodyA.m_xf, radiusA, bodyB.m_xf, radiusB);
	         var normalX = b2ContactSolver.s_worldManifold.m_normal.x;
	         var normalY = b2ContactSolver.s_worldManifold.m_normal.y;
	         var cc = this.m_constraints[i];
	         cc.bodyA = bodyA;
	         cc.bodyB = bodyB;
	         cc.manifold = manifold;
	         cc.normal.x = normalX;
	         cc.normal.y = normalY;
	         cc.pointCount = manifold.m_pointCount;
	         cc.friction = friction;
	         cc.restitution = restitution;
	         cc.localPlaneNormal.x = manifold.m_localPlaneNormal.x;
	         cc.localPlaneNormal.y = manifold.m_localPlaneNormal.y;
	         cc.localPoint.x = manifold.m_localPoint.x;
	         cc.localPoint.y = manifold.m_localPoint.y;
	         cc.radius = radiusA + radiusB;
	         cc.type = manifold.m_type;
	         for (var k = 0; k < cc.pointCount; ++k) {
	            var cp = manifold.m_points[k];
	            var ccp = cc.points[k];
	            ccp.normalImpulse = cp.m_normalImpulse;
	            ccp.tangentImpulse = cp.m_tangentImpulse;
	            ccp.localPoint.SetV(cp.m_localPoint);
	            var rAX = ccp.rA.x = b2ContactSolver.s_worldManifold.m_points[k].x - bodyA.m_sweep.c.x;
	            var rAY = ccp.rA.y = b2ContactSolver.s_worldManifold.m_points[k].y - bodyA.m_sweep.c.y;
	            var rBX = ccp.rB.x = b2ContactSolver.s_worldManifold.m_points[k].x - bodyB.m_sweep.c.x;
	            var rBY = ccp.rB.y = b2ContactSolver.s_worldManifold.m_points[k].y - bodyB.m_sweep.c.y;
	            var rnA = rAX * normalY - rAY * normalX;
	            var rnB = rBX * normalY - rBY * normalX;
	            rnA *= rnA;
	            rnB *= rnB;
	            var kNormal = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rnA + bodyB.m_invI * rnB;
	            ccp.normalMass = 1.0 / kNormal;
	            var kEqualized = bodyA.m_mass * bodyA.m_invMass + bodyB.m_mass * bodyB.m_invMass;
	            kEqualized += bodyA.m_mass * bodyA.m_invI * rnA + bodyB.m_mass * bodyB.m_invI * rnB;
	            ccp.equalizedMass = 1.0 / kEqualized;
	            var tangentX = normalY;
	            var tangentY = (-normalX);
	            var rtA = rAX * tangentY - rAY * tangentX;
	            var rtB = rBX * tangentY - rBY * tangentX;
	            rtA *= rtA;
	            rtB *= rtB;
	            var kTangent = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rtA + bodyB.m_invI * rtB;
	            ccp.tangentMass = 1.0 / kTangent;
	            ccp.velocityBias = 0.0;
	            var tX = vBX + ((-wB * rBY)) - vAX - ((-wA * rAY));
	            var tY = vBY + (wB * rBX) - vAY - (wA * rAX);
	            var vRel = cc.normal.x * tX + cc.normal.y * tY;
	            if (vRel < (-b2Settings.b2_velocityThreshold)) {
	               ccp.velocityBias += (-cc.restitution * vRel);
	            }
	         }
	         if (cc.pointCount == 2) {
	            var ccp1 = cc.points[0];
	            var ccp2 = cc.points[1];
	            var invMassA = bodyA.m_invMass;
	            var invIA = bodyA.m_invI;
	            var invMassB = bodyB.m_invMass;
	            var invIB = bodyB.m_invI;
	            var rn1A = ccp1.rA.x * normalY - ccp1.rA.y * normalX;
	            var rn1B = ccp1.rB.x * normalY - ccp1.rB.y * normalX;
	            var rn2A = ccp2.rA.x * normalY - ccp2.rA.y * normalX;
	            var rn2B = ccp2.rB.x * normalY - ccp2.rB.y * normalX;
	            var k11 = invMassA + invMassB + invIA * rn1A * rn1A + invIB * rn1B * rn1B;
	            var k22 = invMassA + invMassB + invIA * rn2A * rn2A + invIB * rn2B * rn2B;
	            var k12 = invMassA + invMassB + invIA * rn1A * rn2A + invIB * rn1B * rn2B;
	            var k_maxConditionNumber = 100.0;
	            if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
	               cc.K.col1.Set(k11, k12);
	               cc.K.col2.Set(k12, k22);
	               cc.K.GetInverse(cc.normalMass);
	            }
	            else {
	               cc.pointCount = 1;
	            }
	         }
	      }
	   }
	   b2ContactSolver.prototype.InitVelocityConstraints = function (step) {
	      var tVec;
	      var tVec2;
	      var tMat;
	      for (var i = 0; i < this.m_constraintCount; ++i) {
	         var c = this.m_constraints[i];
	         var bodyA = c.bodyA;
	         var bodyB = c.bodyB;
	         var invMassA = bodyA.m_invMass;
	         var invIA = bodyA.m_invI;
	         var invMassB = bodyB.m_invMass;
	         var invIB = bodyB.m_invI;
	         var normalX = c.normal.x;
	         var normalY = c.normal.y;
	         var tangentX = normalY;
	         var tangentY = (-normalX);
	         var tX = 0;
	         var j = 0;
	         var tCount = 0;
	         if (step.warmStarting) {
	            tCount = c.pointCount;
	            for (j = 0;
	            j < tCount; ++j) {
	               var ccp = c.points[j];
	               ccp.normalImpulse *= step.dtRatio;
	               ccp.tangentImpulse *= step.dtRatio;
	               var PX = ccp.normalImpulse * normalX + ccp.tangentImpulse * tangentX;
	               var PY = ccp.normalImpulse * normalY + ccp.tangentImpulse * tangentY;
	               bodyA.m_angularVelocity -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
	               bodyA.m_linearVelocity.x -= invMassA * PX;
	               bodyA.m_linearVelocity.y -= invMassA * PY;
	               bodyB.m_angularVelocity += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
	               bodyB.m_linearVelocity.x += invMassB * PX;
	               bodyB.m_linearVelocity.y += invMassB * PY;
	            }
	         }
	         else {
	            tCount = c.pointCount;
	            for (j = 0;
	            j < tCount; ++j) {
	               var ccp2 = c.points[j];
	               ccp2.normalImpulse = 0.0;
	               ccp2.tangentImpulse = 0.0;
	            }
	         }
	      }
	   }
	   b2ContactSolver.prototype.SolveVelocityConstraints = function () {
	      var j = 0;
	      var ccp;
	      var rAX = 0;
	      var rAY = 0;
	      var rBX = 0;
	      var rBY = 0;
	      var dvX = 0;
	      var dvY = 0;
	      var vn = 0;
	      var vt = 0;
	      var lambda = 0;
	      var maxFriction = 0;
	      var newImpulse = 0;
	      var PX = 0;
	      var PY = 0;
	      var dX = 0;
	      var dY = 0;
	      var P1X = 0;
	      var P1Y = 0;
	      var P2X = 0;
	      var P2Y = 0;
	      var tMat;
	      var tVec;
	      for (var i = 0; i < this.m_constraintCount; ++i) {
	         var c = this.m_constraints[i];
	         var bodyA = c.bodyA;
	         var bodyB = c.bodyB;
	         var wA = bodyA.m_angularVelocity;
	         var wB = bodyB.m_angularVelocity;
	         var vA = bodyA.m_linearVelocity;
	         var vB = bodyB.m_linearVelocity;
	         var invMassA = bodyA.m_invMass;
	         var invIA = bodyA.m_invI;
	         var invMassB = bodyB.m_invMass;
	         var invIB = bodyB.m_invI;
	         var normalX = c.normal.x;
	         var normalY = c.normal.y;
	         var tangentX = normalY;
	         var tangentY = (-normalX);
	         var friction = c.friction;
	         var tX = 0;
	         for (j = 0;
	         j < c.pointCount; j++) {
	            ccp = c.points[j];
	            dvX = vB.x - wB * ccp.rB.y - vA.x + wA * ccp.rA.y;
	            dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
	            vt = dvX * tangentX + dvY * tangentY;
	            lambda = ccp.tangentMass * (-vt);
	            maxFriction = friction * ccp.normalImpulse;
	            newImpulse = b2Math.Clamp(ccp.tangentImpulse + lambda, (-maxFriction), maxFriction);
	            lambda = newImpulse - ccp.tangentImpulse;
	            PX = lambda * tangentX;
	            PY = lambda * tangentY;
	            vA.x -= invMassA * PX;
	            vA.y -= invMassA * PY;
	            wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
	            vB.x += invMassB * PX;
	            vB.y += invMassB * PY;
	            wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
	            ccp.tangentImpulse = newImpulse;
	         }
	         var tCount = parseInt(c.pointCount);
	         if (c.pointCount == 1) {
	            ccp = c.points[0];
	            dvX = vB.x + ((-wB * ccp.rB.y)) - vA.x - ((-wA * ccp.rA.y));
	            dvY = vB.y + (wB * ccp.rB.x) - vA.y - (wA * ccp.rA.x);
	            vn = dvX * normalX + dvY * normalY;
	            lambda = (-ccp.normalMass * (vn - ccp.velocityBias));
	            newImpulse = ccp.normalImpulse + lambda;
	            newImpulse = newImpulse > 0 ? newImpulse : 0.0;
	            lambda = newImpulse - ccp.normalImpulse;
	            PX = lambda * normalX;
	            PY = lambda * normalY;
	            vA.x -= invMassA * PX;
	            vA.y -= invMassA * PY;
	            wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
	            vB.x += invMassB * PX;
	            vB.y += invMassB * PY;
	            wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
	            ccp.normalImpulse = newImpulse;
	         }
	         else {
	            var cp1 = c.points[0];
	            var cp2 = c.points[1];
	            var aX = cp1.normalImpulse;
	            var aY = cp2.normalImpulse;
	            var dv1X = vB.x - wB * cp1.rB.y - vA.x + wA * cp1.rA.y;
	            var dv1Y = vB.y + wB * cp1.rB.x - vA.y - wA * cp1.rA.x;
	            var dv2X = vB.x - wB * cp2.rB.y - vA.x + wA * cp2.rA.y;
	            var dv2Y = vB.y + wB * cp2.rB.x - vA.y - wA * cp2.rA.x;
	            var vn1 = dv1X * normalX + dv1Y * normalY;
	            var vn2 = dv2X * normalX + dv2Y * normalY;
	            var bX = vn1 - cp1.velocityBias;
	            var bY = vn2 - cp2.velocityBias;
	            tMat = c.K;
	            bX -= tMat.col1.x * aX + tMat.col2.x * aY;
	            bY -= tMat.col1.y * aX + tMat.col2.y * aY;
	            var k_errorTol = 0.001;
	            for (;;) {
	               tMat = c.normalMass;
	               var xX = (-(tMat.col1.x * bX + tMat.col2.x * bY));
	               var xY = (-(tMat.col1.y * bX + tMat.col2.y * bY));
	               if (xX >= 0.0 && xY >= 0.0) {
	                  dX = xX - aX;
	                  dY = xY - aY;
	                  P1X = dX * normalX;
	                  P1Y = dX * normalY;
	                  P2X = dY * normalX;
	                  P2Y = dY * normalY;
	                  vA.x -= invMassA * (P1X + P2X);
	                  vA.y -= invMassA * (P1Y + P2Y);
	                  wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
	                  vB.x += invMassB * (P1X + P2X);
	                  vB.y += invMassB * (P1Y + P2Y);
	                  wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
	                  cp1.normalImpulse = xX;
	                  cp2.normalImpulse = xY;
	                  break;
	               }
	               xX = (-cp1.normalMass * bX);
	               xY = 0.0;
	               vn1 = 0.0;
	               vn2 = c.K.col1.y * xX + bY;
	               if (xX >= 0.0 && vn2 >= 0.0) {
	                  dX = xX - aX;
	                  dY = xY - aY;
	                  P1X = dX * normalX;
	                  P1Y = dX * normalY;
	                  P2X = dY * normalX;
	                  P2Y = dY * normalY;
	                  vA.x -= invMassA * (P1X + P2X);
	                  vA.y -= invMassA * (P1Y + P2Y);
	                  wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
	                  vB.x += invMassB * (P1X + P2X);
	                  vB.y += invMassB * (P1Y + P2Y);
	                  wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
	                  cp1.normalImpulse = xX;
	                  cp2.normalImpulse = xY;
	                  break;
	               }
	               xX = 0.0;
	               xY = (-cp2.normalMass * bY);
	               vn1 = c.K.col2.x * xY + bX;
	               vn2 = 0.0;
	               if (xY >= 0.0 && vn1 >= 0.0) {
	                  dX = xX - aX;
	                  dY = xY - aY;
	                  P1X = dX * normalX;
	                  P1Y = dX * normalY;
	                  P2X = dY * normalX;
	                  P2Y = dY * normalY;
	                  vA.x -= invMassA * (P1X + P2X);
	                  vA.y -= invMassA * (P1Y + P2Y);
	                  wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
	                  vB.x += invMassB * (P1X + P2X);
	                  vB.y += invMassB * (P1Y + P2Y);
	                  wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
	                  cp1.normalImpulse = xX;
	                  cp2.normalImpulse = xY;
	                  break;
	               }
	               xX = 0.0;
	               xY = 0.0;
	               vn1 = bX;
	               vn2 = bY;
	               if (vn1 >= 0.0 && vn2 >= 0.0) {
	                  dX = xX - aX;
	                  dY = xY - aY;
	                  P1X = dX * normalX;
	                  P1Y = dX * normalY;
	                  P2X = dY * normalX;
	                  P2Y = dY * normalY;
	                  vA.x -= invMassA * (P1X + P2X);
	                  vA.y -= invMassA * (P1Y + P2Y);
	                  wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
	                  vB.x += invMassB * (P1X + P2X);
	                  vB.y += invMassB * (P1Y + P2Y);
	                  wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
	                  cp1.normalImpulse = xX;
	                  cp2.normalImpulse = xY;
	                  break;
	               }
	               break;
	            }
	         }
	         bodyA.m_angularVelocity = wA;
	         bodyB.m_angularVelocity = wB;
	      }
	   }
	   b2ContactSolver.prototype.FinalizeVelocityConstraints = function () {
	      for (var i = 0; i < this.m_constraintCount; ++i) {
	         var c = this.m_constraints[i];
	         var m = c.manifold;
	         for (var j = 0; j < c.pointCount; ++j) {
	            var point1 = m.m_points[j];
	            var point2 = c.points[j];
	            point1.m_normalImpulse = point2.normalImpulse;
	            point1.m_tangentImpulse = point2.tangentImpulse;
	         }
	      }
	   }
	   b2ContactSolver.prototype.SolvePositionConstraints = function (baumgarte) {
	      if (baumgarte === undefined) baumgarte = 0;
	      var minSeparation = 0.0;
	      for (var i = 0; i < this.m_constraintCount; i++) {
	         var c = this.m_constraints[i];
	         var bodyA = c.bodyA;
	         var bodyB = c.bodyB;
	         var invMassA = bodyA.m_mass * bodyA.m_invMass;
	         var invIA = bodyA.m_mass * bodyA.m_invI;
	         var invMassB = bodyB.m_mass * bodyB.m_invMass;
	         var invIB = bodyB.m_mass * bodyB.m_invI;
	         b2ContactSolver.s_psm.Initialize(c);
	         var normal = b2ContactSolver.s_psm.m_normal;
	         for (var j = 0; j < c.pointCount; j++) {
	            var ccp = c.points[j];
	            var point = b2ContactSolver.s_psm.m_points[j];
	            var separation = b2ContactSolver.s_psm.m_separations[j];
	            var rAX = point.x - bodyA.m_sweep.c.x;
	            var rAY = point.y - bodyA.m_sweep.c.y;
	            var rBX = point.x - bodyB.m_sweep.c.x;
	            var rBY = point.y - bodyB.m_sweep.c.y;
	            minSeparation = minSeparation < separation ? minSeparation : separation;
	            var C = b2Math.Clamp(baumgarte * (separation + b2Settings.b2_linearSlop), (-b2Settings.b2_maxLinearCorrection), 0.0);
	            var impulse = (-ccp.equalizedMass * C);
	            var PX = impulse * normal.x;
	            var PY = impulse * normal.y;bodyA.m_sweep.c.x -= invMassA * PX;
	            bodyA.m_sweep.c.y -= invMassA * PY;
	            bodyA.m_sweep.a -= invIA * (rAX * PY - rAY * PX);
	            bodyA.SynchronizeTransform();
	            bodyB.m_sweep.c.x += invMassB * PX;
	            bodyB.m_sweep.c.y += invMassB * PY;
	            bodyB.m_sweep.a += invIB * (rBX * PY - rBY * PX);
	            bodyB.SynchronizeTransform();
	         }
	      }
	      return minSeparation > (-1.5 * b2Settings.b2_linearSlop);
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new b2WorldManifold();
	      Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new b2PositionSolverManifold();
	   });
	   Box2D.inherit(b2EdgeAndCircleContact, Box2D.Dynamics.Contacts.b2Contact);
	   b2EdgeAndCircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
	   b2EdgeAndCircleContact.b2EdgeAndCircleContact = function () {
	      Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
	   };
	   b2EdgeAndCircleContact.Create = function (allocator) {
	      return new b2EdgeAndCircleContact();
	   }
	   b2EdgeAndCircleContact.Destroy = function (contact, allocator) {}
	   b2EdgeAndCircleContact.prototype.Reset = function (fixtureA, fixtureB) {
	      this.__super.Reset.call(this, fixtureA, fixtureB);
	   }
	   b2EdgeAndCircleContact.prototype.Evaluate = function () {
	      var bA = this.m_fixtureA.GetBody();
	      var bB = this.m_fixtureB.GetBody();
	      this.b2CollideEdgeAndCircle(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2EdgeShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2CircleShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
	   }
	   b2EdgeAndCircleContact.prototype.b2CollideEdgeAndCircle = function (manifold, edge, xf1, circle, xf2) {}
	   Box2D.inherit(b2NullContact, Box2D.Dynamics.Contacts.b2Contact);
	   b2NullContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
	   b2NullContact.b2NullContact = function () {
	      Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
	   };
	   b2NullContact.prototype.b2NullContact = function () {
	      this.__super.b2Contact.call(this);
	   }
	   b2NullContact.prototype.Evaluate = function () {}
	   Box2D.inherit(b2PolyAndCircleContact, Box2D.Dynamics.Contacts.b2Contact);
	   b2PolyAndCircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
	   b2PolyAndCircleContact.b2PolyAndCircleContact = function () {
	      Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
	   };
	   b2PolyAndCircleContact.Create = function (allocator) {
	      return new b2PolyAndCircleContact();
	   }
	   b2PolyAndCircleContact.Destroy = function (contact, allocator) {}
	   b2PolyAndCircleContact.prototype.Reset = function (fixtureA, fixtureB) {
	      this.__super.Reset.call(this, fixtureA, fixtureB);
	      b2Settings.b2Assert(fixtureA.GetType() == b2Shape.e_polygonShape);
	      b2Settings.b2Assert(fixtureB.GetType() == b2Shape.e_circleShape);
	   }
	   b2PolyAndCircleContact.prototype.Evaluate = function () {
	      var bA = this.m_fixtureA.m_body;
	      var bB = this.m_fixtureB.m_body;
	      b2Collision.CollidePolygonAndCircle(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2PolygonShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2CircleShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
	   }
	   Box2D.inherit(b2PolyAndEdgeContact, Box2D.Dynamics.Contacts.b2Contact);
	   b2PolyAndEdgeContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
	   b2PolyAndEdgeContact.b2PolyAndEdgeContact = function () {
	      Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
	   };
	   b2PolyAndEdgeContact.Create = function (allocator) {
	      return new b2PolyAndEdgeContact();
	   }
	   b2PolyAndEdgeContact.Destroy = function (contact, allocator) {}
	   b2PolyAndEdgeContact.prototype.Reset = function (fixtureA, fixtureB) {
	      this.__super.Reset.call(this, fixtureA, fixtureB);
	      b2Settings.b2Assert(fixtureA.GetType() == b2Shape.e_polygonShape);
	      b2Settings.b2Assert(fixtureB.GetType() == b2Shape.e_edgeShape);
	   }
	   b2PolyAndEdgeContact.prototype.Evaluate = function () {
	      var bA = this.m_fixtureA.GetBody();
	      var bB = this.m_fixtureB.GetBody();
	      this.b2CollidePolyAndEdge(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2PolygonShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2EdgeShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
	   }
	   b2PolyAndEdgeContact.prototype.b2CollidePolyAndEdge = function (manifold, polygon, xf1, edge, xf2) {}
	   Box2D.inherit(b2PolygonContact, Box2D.Dynamics.Contacts.b2Contact);
	   b2PolygonContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
	   b2PolygonContact.b2PolygonContact = function () {
	      Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
	   };
	   b2PolygonContact.Create = function (allocator) {
	      return new b2PolygonContact();
	   }
	   b2PolygonContact.Destroy = function (contact, allocator) {}
	   b2PolygonContact.prototype.Reset = function (fixtureA, fixtureB) {
	      this.__super.Reset.call(this, fixtureA, fixtureB);
	   }
	   b2PolygonContact.prototype.Evaluate = function () {
	      var bA = this.m_fixtureA.GetBody();
	      var bB = this.m_fixtureB.GetBody();
	      b2Collision.CollidePolygons(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2PolygonShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2PolygonShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
	   }
	   b2PositionSolverManifold.b2PositionSolverManifold = function () {};
	   b2PositionSolverManifold.prototype.b2PositionSolverManifold = function () {
	      this.m_normal = new b2Vec2();
	      this.m_separations = new Vector_a2j_Number(b2Settings.b2_maxManifoldPoints);
	      this.m_points = new Vector(b2Settings.b2_maxManifoldPoints);
	      for (var i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
	         this.m_points[i] = new b2Vec2();
	      }
	   }
	   b2PositionSolverManifold.prototype.Initialize = function (cc) {
	      b2Settings.b2Assert(cc.pointCount > 0);
	      var i = 0;
	      var clipPointX = 0;
	      var clipPointY = 0;
	      var tMat;
	      var tVec;
	      var planePointX = 0;
	      var planePointY = 0;
	      switch (cc.type) {
	      case b2Manifold.e_circles:
	         {
	            tMat = cc.bodyA.m_xf.R;
	            tVec = cc.localPoint;
	            var pointAX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	            var pointAY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	            tMat = cc.bodyB.m_xf.R;
	            tVec = cc.points[0].localPoint;
	            var pointBX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	            var pointBY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	            var dX = pointBX - pointAX;
	            var dY = pointBY - pointAY;
	            var d2 = dX * dX + dY * dY;
	            if (d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
	               var d = Math.sqrt(d2);
	               this.m_normal.x = dX / d;
	               this.m_normal.y = dY / d;
	            }
	            else {
	               this.m_normal.x = 1.0;
	               this.m_normal.y = 0.0;
	            }
	            this.m_points[0].x = 0.5 * (pointAX + pointBX);
	            this.m_points[0].y = 0.5 * (pointAY + pointBY);
	            this.m_separations[0] = dX * this.m_normal.x + dY * this.m_normal.y - cc.radius;
	         }
	         break;
	      case b2Manifold.e_faceA:
	         {
	            tMat = cc.bodyA.m_xf.R;
	            tVec = cc.localPlaneNormal;
	            this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	            this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	            tMat = cc.bodyA.m_xf.R;
	            tVec = cc.localPoint;
	            planePointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	            planePointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	            tMat = cc.bodyB.m_xf.R;
	            for (i = 0;
	            i < cc.pointCount; ++i) {
	               tVec = cc.points[i].localPoint;
	               clipPointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	               clipPointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	               this.m_separations[i] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
	               this.m_points[i].x = clipPointX;
	               this.m_points[i].y = clipPointY;
	            }
	         }
	         break;
	      case b2Manifold.e_faceB:
	         {
	            tMat = cc.bodyB.m_xf.R;
	            tVec = cc.localPlaneNormal;
	            this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	            this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	            tMat = cc.bodyB.m_xf.R;
	            tVec = cc.localPoint;
	            planePointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	            planePointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	            tMat = cc.bodyA.m_xf.R;
	            for (i = 0;
	            i < cc.pointCount; ++i) {
	               tVec = cc.points[i].localPoint;
	               clipPointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
	               clipPointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
	               this.m_separations[i] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
	               this.m_points[i].Set(clipPointX, clipPointY);
	            }
	            this.m_normal.x *= (-1);
	            this.m_normal.y *= (-1);
	         }
	         break;
	      }
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new b2Vec2();
	      Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB = new b2Vec2();
	   });
	})();
	(function () {
	   var b2Body = Box2D.Dynamics.b2Body,
	      b2BodyDef = Box2D.Dynamics.b2BodyDef,
	      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
	      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
	      b2ContactListener = Box2D.Dynamics.b2ContactListener,
	      b2ContactManager = Box2D.Dynamics.b2ContactManager,
	      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
	      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
	      b2FilterData = Box2D.Dynamics.b2FilterData,
	      b2Fixture = Box2D.Dynamics.b2Fixture,
	      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	      b2Island = Box2D.Dynamics.b2Island,
	      b2TimeStep = Box2D.Dynamics.b2TimeStep,
	      b2World = Box2D.Dynamics.b2World,
	      b2Mat22 = Box2D.Common.Math.b2Mat22,
	      b2Mat33 = Box2D.Common.Math.b2Mat33,
	      b2Math = Box2D.Common.Math.b2Math,
	      b2Sweep = Box2D.Common.Math.b2Sweep,
	      b2Transform = Box2D.Common.Math.b2Transform,
	      b2Vec2 = Box2D.Common.Math.b2Vec2,
	      b2Vec3 = Box2D.Common.Math.b2Vec3,
	      b2Color = Box2D.Common.b2Color,
	      b2internal = Box2D.Common.b2internal,
	      b2Settings = Box2D.Common.b2Settings,
	      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
	      b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef,
	      b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape,
	      b2MassData = Box2D.Collision.Shapes.b2MassData,
	      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
	      b2Shape = Box2D.Collision.Shapes.b2Shape,
	      b2BuoyancyController = Box2D.Dynamics.Controllers.b2BuoyancyController,
	      b2ConstantAccelController = Box2D.Dynamics.Controllers.b2ConstantAccelController,
	      b2ConstantForceController = Box2D.Dynamics.Controllers.b2ConstantForceController,
	      b2Controller = Box2D.Dynamics.Controllers.b2Controller,
	      b2ControllerEdge = Box2D.Dynamics.Controllers.b2ControllerEdge,
	      b2GravityController = Box2D.Dynamics.Controllers.b2GravityController,
	      b2TensorDampingController = Box2D.Dynamics.Controllers.b2TensorDampingController;
	
	   Box2D.inherit(b2BuoyancyController, Box2D.Dynamics.Controllers.b2Controller);
	   b2BuoyancyController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
	   b2BuoyancyController.b2BuoyancyController = function () {
	      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
	      this.normal = new b2Vec2(0, (-1));
	      this.offset = 0;
	      this.density = 0;
	      this.velocity = new b2Vec2(0, 0);
	      this.linearDrag = 2;
	      this.angularDrag = 1;
	      this.useDensity = false;
	      this.useWorldGravity = true;
	      this.gravity = null;
	   };
	   b2BuoyancyController.prototype.Step = function (step) {
	      if (!this.m_bodyList) return;
	      if (this.useWorldGravity) {
	         this.gravity = this.GetWorld().GetGravity().Copy();
	      }
	      for (var i = this.m_bodyList; i; i = i.nextBody) {
	         var body = i.body;
	         if (body.IsAwake() == false) {
	            continue;
	         }
	         var areac = new b2Vec2();
	         var massc = new b2Vec2();
	         var area = 0.0;
	         var mass = 0.0;
	         for (var fixture = body.GetFixtureList(); fixture; fixture = fixture.GetNext()) {
	            var sc = new b2Vec2();
	            var sarea = fixture.GetShape().ComputeSubmergedArea(this.normal, this.offset, body.GetTransform(), sc);
	            area += sarea;
	            areac.x += sarea * sc.x;
	            areac.y += sarea * sc.y;
	            var shapeDensity = 0;
	            if (this.useDensity) {
	               shapeDensity = 1;
	            }
	            else {
	               shapeDensity = 1;
	            }
	            mass += sarea * shapeDensity;
	            massc.x += sarea * sc.x * shapeDensity;
	            massc.y += sarea * sc.y * shapeDensity;
	         }
	         areac.x /= area;
	         areac.y /= area;
	         massc.x /= mass;
	         massc.y /= mass;
	         if (area < Number.MIN_VALUE) continue;
	         var buoyancyForce = this.gravity.GetNegative();
	         buoyancyForce.Multiply(this.density * area);
	         body.ApplyForce(buoyancyForce, massc);
	         var dragForce = body.GetLinearVelocityFromWorldPoint(areac);
	         dragForce.Subtract(this.velocity);
	         dragForce.Multiply((-this.linearDrag * area));
	         body.ApplyForce(dragForce, areac);
	         body.ApplyTorque((-body.GetInertia() / body.GetMass() * area * body.GetAngularVelocity() * this.angularDrag));
	      }
	   }
	   b2BuoyancyController.prototype.Draw = function (debugDraw) {
	      var r = 1000;
	      var p1 = new b2Vec2();
	      var p2 = new b2Vec2();
	      p1.x = this.normal.x * this.offset + this.normal.y * r;
	      p1.y = this.normal.y * this.offset - this.normal.x * r;
	      p2.x = this.normal.x * this.offset - this.normal.y * r;
	      p2.y = this.normal.y * this.offset + this.normal.x * r;
	      var color = new b2Color(0, 0, 1);
	      debugDraw.DrawSegment(p1, p2, color);
	   }
	   Box2D.inherit(b2ConstantAccelController, Box2D.Dynamics.Controllers.b2Controller);
	   b2ConstantAccelController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
	   b2ConstantAccelController.b2ConstantAccelController = function () {
	      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
	      this.A = new b2Vec2(0, 0);
	   };
	   b2ConstantAccelController.prototype.Step = function (step) {
	      var smallA = new b2Vec2(this.A.x * step.dt, this.A.y * step.dt);
	      for (var i = this.m_bodyList; i; i = i.nextBody) {
	         var body = i.body;
	         if (!body.IsAwake()) continue;
	         body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + smallA.x, body.GetLinearVelocity().y + smallA.y));
	      }
	   }
	   Box2D.inherit(b2ConstantForceController, Box2D.Dynamics.Controllers.b2Controller);
	   b2ConstantForceController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
	   b2ConstantForceController.b2ConstantForceController = function () {
	      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
	      this.F = new b2Vec2(0, 0);
	   };
	   b2ConstantForceController.prototype.Step = function (step) {
	      for (var i = this.m_bodyList; i; i = i.nextBody) {
	         var body = i.body;
	         if (!body.IsAwake()) continue;
	         body.ApplyForce(this.F, body.GetWorldCenter());
	      }
	   }
	   b2Controller.b2Controller = function () {};
	   b2Controller.prototype.Step = function (step) {}
	   b2Controller.prototype.Draw = function (debugDraw) {}
	   b2Controller.prototype.AddBody = function (body) {
	      var edge = new b2ControllerEdge();
	      edge.controller = this;
	      edge.body = body;
	      edge.nextBody = this.m_bodyList;
	      edge.prevBody = null;
	      this.m_bodyList = edge;
	      if (edge.nextBody) edge.nextBody.prevBody = edge;
	      this.m_bodyCount++;
	      edge.nextController = body.m_controllerList;
	      edge.prevController = null;
	      body.m_controllerList = edge;
	      if (edge.nextController) edge.nextController.prevController = edge;
	      body.m_controllerCount++;
	   }
	   b2Controller.prototype.RemoveBody = function (body) {
	      var edge = body.m_controllerList;
	      while (edge && edge.controller != this)
	      edge = edge.nextController;
	      if (edge.prevBody) edge.prevBody.nextBody = edge.nextBody;
	      if (edge.nextBody) edge.nextBody.prevBody = edge.prevBody;
	      if (edge.nextController) edge.nextController.prevController = edge.prevController;
	      if (edge.prevController) edge.prevController.nextController = edge.nextController;
	      if (this.m_bodyList == edge) this.m_bodyList = edge.nextBody;
	      if (body.m_controllerList == edge) body.m_controllerList = edge.nextController;
	      body.m_controllerCount--;
	      this.m_bodyCount--;
	   }
	   b2Controller.prototype.Clear = function () {
	      while (this.m_bodyList)
	      this.RemoveBody(this.m_bodyList.body);
	   }
	   b2Controller.prototype.GetNext = function () {
	      return this.m_next;
	   }
	   b2Controller.prototype.GetWorld = function () {
	      return this.m_world;
	   }
	   b2Controller.prototype.GetBodyList = function () {
	      return this.m_bodyList;
	   }
	   b2ControllerEdge.b2ControllerEdge = function () {};
	   Box2D.inherit(b2GravityController, Box2D.Dynamics.Controllers.b2Controller);
	   b2GravityController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
	   b2GravityController.b2GravityController = function () {
	      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
	      this.G = 1;
	      this.invSqr = true;
	   };
	   b2GravityController.prototype.Step = function (step) {
	      var i = null;
	      var body1 = null;
	      var p1 = null;
	      var mass1 = 0;
	      var j = null;
	      var body2 = null;
	      var p2 = null;
	      var dx = 0;
	      var dy = 0;
	      var r2 = 0;
	      var f = null;
	      if (this.invSqr) {
	         for (i = this.m_bodyList;
	         i; i = i.nextBody) {
	            body1 = i.body;
	            p1 = body1.GetWorldCenter();
	            mass1 = body1.GetMass();
	            for (j = this.m_bodyList;
	            j != i; j = j.nextBody) {
	               body2 = j.body;
	               p2 = body2.GetWorldCenter();
	               dx = p2.x - p1.x;
	               dy = p2.y - p1.y;
	               r2 = dx * dx + dy * dy;
	               if (r2 < Number.MIN_VALUE) continue;
	               f = new b2Vec2(dx, dy);
	               f.Multiply(this.G / r2 / Math.sqrt(r2) * mass1 * body2.GetMass());
	               if (body1.IsAwake()) body1.ApplyForce(f, p1);
	               f.Multiply((-1));
	               if (body2.IsAwake()) body2.ApplyForce(f, p2);
	            }
	         }
	      }
	      else {
	         for (i = this.m_bodyList;
	         i; i = i.nextBody) {
	            body1 = i.body;
	            p1 = body1.GetWorldCenter();
	            mass1 = body1.GetMass();
	            for (j = this.m_bodyList;
	            j != i; j = j.nextBody) {
	               body2 = j.body;
	               p2 = body2.GetWorldCenter();
	               dx = p2.x - p1.x;
	               dy = p2.y - p1.y;
	               r2 = dx * dx + dy * dy;
	               if (r2 < Number.MIN_VALUE) continue;
	               f = new b2Vec2(dx, dy);
	               f.Multiply(this.G / r2 * mass1 * body2.GetMass());
	               if (body1.IsAwake()) body1.ApplyForce(f, p1);
	               f.Multiply((-1));
	               if (body2.IsAwake()) body2.ApplyForce(f, p2);
	            }
	         }
	      }
	   }
	   Box2D.inherit(b2TensorDampingController, Box2D.Dynamics.Controllers.b2Controller);
	   b2TensorDampingController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
	   b2TensorDampingController.b2TensorDampingController = function () {
	      Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
	      this.T = new b2Mat22();
	      this.maxTimestep = 0;
	   };
	   b2TensorDampingController.prototype.SetAxisAligned = function (xDamping, yDamping) {
	      if (xDamping === undefined) xDamping = 0;
	      if (yDamping === undefined) yDamping = 0;
	      this.T.col1.x = (-xDamping);
	      this.T.col1.y = 0;
	      this.T.col2.x = 0;
	      this.T.col2.y = (-yDamping);
	      if (xDamping > 0 || yDamping > 0) {
	         this.maxTimestep = 1 / Math.max(xDamping, yDamping);
	      }
	      else {
	         this.maxTimestep = 0;
	      }
	   }
	   b2TensorDampingController.prototype.Step = function (step) {
	      var timestep = step.dt;
	      if (timestep <= Number.MIN_VALUE) return;
	      if (timestep > this.maxTimestep && this.maxTimestep > 0) timestep = this.maxTimestep;
	      for (var i = this.m_bodyList; i; i = i.nextBody) {
	         var body = i.body;
	         if (!body.IsAwake()) {
	            continue;
	         }
	         var damping = body.GetWorldVector(b2Math.MulMV(this.T, body.GetLocalVector(body.GetLinearVelocity())));
	         body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + damping.x * timestep, body.GetLinearVelocity().y + damping.y * timestep));
	      }
	   }
	})();
	(function () {
	   var b2Color = Box2D.Common.b2Color,
	      b2internal = Box2D.Common.b2internal,
	      b2Settings = Box2D.Common.b2Settings,
	      b2Mat22 = Box2D.Common.Math.b2Mat22,
	      b2Mat33 = Box2D.Common.Math.b2Mat33,
	      b2Math = Box2D.Common.Math.b2Math,
	      b2Sweep = Box2D.Common.Math.b2Sweep,
	      b2Transform = Box2D.Common.Math.b2Transform,
	      b2Vec2 = Box2D.Common.Math.b2Vec2,
	      b2Vec3 = Box2D.Common.Math.b2Vec3,
	      b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint,
	      b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef,
	      b2FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint,
	      b2FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef,
	      b2GearJoint = Box2D.Dynamics.Joints.b2GearJoint,
	      b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef,
	      b2Jacobian = Box2D.Dynamics.Joints.b2Jacobian,
	      b2Joint = Box2D.Dynamics.Joints.b2Joint,
	      b2JointDef = Box2D.Dynamics.Joints.b2JointDef,
	      b2JointEdge = Box2D.Dynamics.Joints.b2JointEdge,
	      b2LineJoint = Box2D.Dynamics.Joints.b2LineJoint,
	      b2LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef,
	      b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint,
	      b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
	      b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint,
	      b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef,
	      b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint,
	      b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef,
	      b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint,
	      b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
	      b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint,
	      b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef,
	      b2Body = Box2D.Dynamics.b2Body,
	      b2BodyDef = Box2D.Dynamics.b2BodyDef,
	      b2ContactFilter = Box2D.Dynamics.b2ContactFilter,
	      b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse,
	      b2ContactListener = Box2D.Dynamics.b2ContactListener,
	      b2ContactManager = Box2D.Dynamics.b2ContactManager,
	      b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
	      b2DestructionListener = Box2D.Dynamics.b2DestructionListener,
	      b2FilterData = Box2D.Dynamics.b2FilterData,
	      b2Fixture = Box2D.Dynamics.b2Fixture,
	      b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
	      b2Island = Box2D.Dynamics.b2Island,
	      b2TimeStep = Box2D.Dynamics.b2TimeStep,
	      b2World = Box2D.Dynamics.b2World;
	
	   Box2D.inherit(b2DistanceJoint, Box2D.Dynamics.Joints.b2Joint);
	   b2DistanceJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	   b2DistanceJoint.b2DistanceJoint = function () {
	      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
	      this.m_localAnchor1 = new b2Vec2();
	      this.m_localAnchor2 = new b2Vec2();
	      this.m_u = new b2Vec2();
	   };
	   b2DistanceJoint.prototype.GetAnchorA = function () {
	      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
	   }
	   b2DistanceJoint.prototype.GetAnchorB = function () {
	      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
	   }
	   b2DistanceJoint.prototype.GetReactionForce = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return new b2Vec2(inv_dt * this.m_impulse * this.m_u.x, inv_dt * this.m_impulse * this.m_u.y);
	   }
	   b2DistanceJoint.prototype.GetReactionTorque = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return 0.0;
	   }
	   b2DistanceJoint.prototype.GetLength = function () {
	      return this.m_length;
	   }
	   b2DistanceJoint.prototype.SetLength = function (length) {
	      if (length === undefined) length = 0;
	      this.m_length = length;
	   }
	   b2DistanceJoint.prototype.GetFrequency = function () {
	      return this.m_frequencyHz;
	   }
	   b2DistanceJoint.prototype.SetFrequency = function (hz) {
	      if (hz === undefined) hz = 0;
	      this.m_frequencyHz = hz;
	   }
	   b2DistanceJoint.prototype.GetDampingRatio = function () {
	      return this.m_dampingRatio;
	   }
	   b2DistanceJoint.prototype.SetDampingRatio = function (ratio) {
	      if (ratio === undefined) ratio = 0;
	      this.m_dampingRatio = ratio;
	   }
	   b2DistanceJoint.prototype.b2DistanceJoint = function (def) {
	      this.__super.b2Joint.call(this, def);
	      var tMat;
	      var tX = 0;
	      var tY = 0;
	      this.m_localAnchor1.SetV(def.localAnchorA);
	      this.m_localAnchor2.SetV(def.localAnchorB);
	      this.m_length = def.length;
	      this.m_frequencyHz = def.frequencyHz;
	      this.m_dampingRatio = def.dampingRatio;
	      this.m_impulse = 0.0;
	      this.m_gamma = 0.0;
	      this.m_bias = 0.0;
	   }
	   b2DistanceJoint.prototype.InitVelocityConstraints = function (step) {
	      var tMat;
	      var tX = 0;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      tMat = bA.m_xf.R;
	      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	      r1X = tX;
	      tMat = bB.m_xf.R;
	      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	      r2X = tX;
	      this.m_u.x = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
	      this.m_u.y = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
	      var length = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
	      if (length > b2Settings.b2_linearSlop) {
	         this.m_u.Multiply(1.0 / length);
	      }
	      else {
	         this.m_u.SetZero();
	      }
	      var cr1u = (r1X * this.m_u.y - r1Y * this.m_u.x);
	      var cr2u = (r2X * this.m_u.y - r2Y * this.m_u.x);
	      var invMass = bA.m_invMass + bA.m_invI * cr1u * cr1u + bB.m_invMass + bB.m_invI * cr2u * cr2u;
	      this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
	      if (this.m_frequencyHz > 0.0) {
	         var C = length - this.m_length;
	         var omega = 2.0 * Math.PI * this.m_frequencyHz;
	         var d = 2.0 * this.m_mass * this.m_dampingRatio * omega;
	         var k = this.m_mass * omega * omega;
	         this.m_gamma = step.dt * (d + step.dt * k);
	         this.m_gamma = this.m_gamma != 0.0 ? 1 / this.m_gamma : 0.0;
	         this.m_bias = C * step.dt * k * this.m_gamma;
	         this.m_mass = invMass + this.m_gamma;
	         this.m_mass = this.m_mass != 0.0 ? 1.0 / this.m_mass : 0.0;
	      }
	      if (step.warmStarting) {
	         this.m_impulse *= step.dtRatio;
	         var PX = this.m_impulse * this.m_u.x;
	         var PY = this.m_impulse * this.m_u.y;
	         bA.m_linearVelocity.x -= bA.m_invMass * PX;
	         bA.m_linearVelocity.y -= bA.m_invMass * PY;
	         bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
	         bB.m_linearVelocity.x += bB.m_invMass * PX;
	         bB.m_linearVelocity.y += bB.m_invMass * PY;
	         bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX);
	      }
	      else {
	         this.m_impulse = 0.0;
	      }
	   }
	   b2DistanceJoint.prototype.SolveVelocityConstraints = function (step) {
	      var tMat;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      tMat = bA.m_xf.R;
	      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	      r1X = tX;
	      tMat = bB.m_xf.R;
	      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	      r2X = tX;
	      var v1X = bA.m_linearVelocity.x + ((-bA.m_angularVelocity * r1Y));
	      var v1Y = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
	      var v2X = bB.m_linearVelocity.x + ((-bB.m_angularVelocity * r2Y));
	      var v2Y = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
	      var Cdot = (this.m_u.x * (v2X - v1X) + this.m_u.y * (v2Y - v1Y));
	      var impulse = (-this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse));
	      this.m_impulse += impulse;
	      var PX = impulse * this.m_u.x;
	      var PY = impulse * this.m_u.y;
	      bA.m_linearVelocity.x -= bA.m_invMass * PX;
	      bA.m_linearVelocity.y -= bA.m_invMass * PY;
	      bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
	      bB.m_linearVelocity.x += bB.m_invMass * PX;
	      bB.m_linearVelocity.y += bB.m_invMass * PY;
	      bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX);
	   }
	   b2DistanceJoint.prototype.SolvePositionConstraints = function (baumgarte) {
	      if (baumgarte === undefined) baumgarte = 0;
	      var tMat;
	      if (this.m_frequencyHz > 0.0) {
	         return true;
	      }
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      tMat = bA.m_xf.R;
	      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	      r1X = tX;
	      tMat = bB.m_xf.R;
	      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	      r2X = tX;
	      var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
	      var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
	      var length = Math.sqrt(dX * dX + dY * dY);
	      dX /= length;
	      dY /= length;
	      var C = length - this.m_length;
	      C = b2Math.Clamp(C, (-b2Settings.b2_maxLinearCorrection), b2Settings.b2_maxLinearCorrection);
	      var impulse = (-this.m_mass * C);
	      this.m_u.Set(dX, dY);
	      var PX = impulse * this.m_u.x;
	      var PY = impulse * this.m_u.y;
	      bA.m_sweep.c.x -= bA.m_invMass * PX;
	      bA.m_sweep.c.y -= bA.m_invMass * PY;
	      bA.m_sweep.a -= bA.m_invI * (r1X * PY - r1Y * PX);
	      bB.m_sweep.c.x += bB.m_invMass * PX;
	      bB.m_sweep.c.y += bB.m_invMass * PY;
	      bB.m_sweep.a += bB.m_invI * (r2X * PY - r2Y * PX);
	      bA.SynchronizeTransform();
	      bB.SynchronizeTransform();
	      return b2Math.Abs(C) < b2Settings.b2_linearSlop;
	   }
	   Box2D.inherit(b2DistanceJointDef, Box2D.Dynamics.Joints.b2JointDef);
	   b2DistanceJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	   b2DistanceJointDef.b2DistanceJointDef = function () {
	      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
	      this.localAnchorA = new b2Vec2();
	      this.localAnchorB = new b2Vec2();
	   };
	   b2DistanceJointDef.prototype.b2DistanceJointDef = function () {
	      this.__super.b2JointDef.call(this);
	      this.type = b2Joint.e_distanceJoint;
	      this.length = 1.0;
	      this.frequencyHz = 0.0;
	      this.dampingRatio = 0.0;
	   }
	   b2DistanceJointDef.prototype.Initialize = function (bA, bB, anchorA, anchorB) {
	      this.bodyA = bA;
	      this.bodyB = bB;
	      this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchorA));
	      this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchorB));
	      var dX = anchorB.x - anchorA.x;
	      var dY = anchorB.y - anchorA.y;
	      this.length = Math.sqrt(dX * dX + dY * dY);
	      this.frequencyHz = 0.0;
	      this.dampingRatio = 0.0;
	   }
	   Box2D.inherit(b2FrictionJoint, Box2D.Dynamics.Joints.b2Joint);
	   b2FrictionJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	   b2FrictionJoint.b2FrictionJoint = function () {
	      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
	      this.m_localAnchorA = new b2Vec2();
	      this.m_localAnchorB = new b2Vec2();
	      this.m_linearMass = new b2Mat22();
	      this.m_linearImpulse = new b2Vec2();
	   };
	   b2FrictionJoint.prototype.GetAnchorA = function () {
	      return this.m_bodyA.GetWorldPoint(this.m_localAnchorA);
	   }
	   b2FrictionJoint.prototype.GetAnchorB = function () {
	      return this.m_bodyB.GetWorldPoint(this.m_localAnchorB);
	   }
	   b2FrictionJoint.prototype.GetReactionForce = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return new b2Vec2(inv_dt * this.m_linearImpulse.x, inv_dt * this.m_linearImpulse.y);
	   }
	   b2FrictionJoint.prototype.GetReactionTorque = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return inv_dt * this.m_angularImpulse;
	   }
	   b2FrictionJoint.prototype.SetMaxForce = function (force) {
	      if (force === undefined) force = 0;
	      this.m_maxForce = force;
	   }
	   b2FrictionJoint.prototype.GetMaxForce = function () {
	      return this.m_maxForce;
	   }
	   b2FrictionJoint.prototype.SetMaxTorque = function (torque) {
	      if (torque === undefined) torque = 0;
	      this.m_maxTorque = torque;
	   }
	   b2FrictionJoint.prototype.GetMaxTorque = function () {
	      return this.m_maxTorque;
	   }
	   b2FrictionJoint.prototype.b2FrictionJoint = function (def) {
	      this.__super.b2Joint.call(this, def);
	      this.m_localAnchorA.SetV(def.localAnchorA);
	      this.m_localAnchorB.SetV(def.localAnchorB);
	      this.m_linearMass.SetZero();
	      this.m_angularMass = 0.0;
	      this.m_linearImpulse.SetZero();
	      this.m_angularImpulse = 0.0;
	      this.m_maxForce = def.maxForce;
	      this.m_maxTorque = def.maxTorque;
	   }
	   b2FrictionJoint.prototype.InitVelocityConstraints = function (step) {
	      var tMat;
	      var tX = 0;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      tMat = bA.m_xf.R;
	      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
	      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
	      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
	      rAX = tX;
	      tMat = bB.m_xf.R;
	      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
	      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
	      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
	      rBX = tX;
	      var mA = bA.m_invMass;
	      var mB = bB.m_invMass;
	      var iA = bA.m_invI;
	      var iB = bB.m_invI;
	      var K = new b2Mat22();
	      K.col1.x = mA + mB;
	      K.col2.x = 0.0;
	      K.col1.y = 0.0;
	      K.col2.y = mA + mB;
	      K.col1.x += iA * rAY * rAY;
	      K.col2.x += (-iA * rAX * rAY);
	      K.col1.y += (-iA * rAX * rAY);
	      K.col2.y += iA * rAX * rAX;
	      K.col1.x += iB * rBY * rBY;
	      K.col2.x += (-iB * rBX * rBY);
	      K.col1.y += (-iB * rBX * rBY);
	      K.col2.y += iB * rBX * rBX;
	      K.GetInverse(this.m_linearMass);
	      this.m_angularMass = iA + iB;
	      if (this.m_angularMass > 0.0) {
	         this.m_angularMass = 1.0 / this.m_angularMass;
	      }
	      if (step.warmStarting) {
	         this.m_linearImpulse.x *= step.dtRatio;
	         this.m_linearImpulse.y *= step.dtRatio;
	         this.m_angularImpulse *= step.dtRatio;
	         var P = this.m_linearImpulse;
	         bA.m_linearVelocity.x -= mA * P.x;
	         bA.m_linearVelocity.y -= mA * P.y;
	         bA.m_angularVelocity -= iA * (rAX * P.y - rAY * P.x + this.m_angularImpulse);
	         bB.m_linearVelocity.x += mB * P.x;
	         bB.m_linearVelocity.y += mB * P.y;
	         bB.m_angularVelocity += iB * (rBX * P.y - rBY * P.x + this.m_angularImpulse);
	      }
	      else {
	         this.m_linearImpulse.SetZero();
	         this.m_angularImpulse = 0.0;
	      }
	   }
	   b2FrictionJoint.prototype.SolveVelocityConstraints = function (step) {
	      var tMat;
	      var tX = 0;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var vA = bA.m_linearVelocity;
	      var wA = bA.m_angularVelocity;
	      var vB = bB.m_linearVelocity;
	      var wB = bB.m_angularVelocity;
	      var mA = bA.m_invMass;
	      var mB = bB.m_invMass;
	      var iA = bA.m_invI;
	      var iB = bB.m_invI;
	      tMat = bA.m_xf.R;
	      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
	      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
	      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
	      rAX = tX;
	      tMat = bB.m_xf.R;
	      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
	      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
	      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
	      rBX = tX;
	      var maxImpulse = 0; {
	         var Cdot = wB - wA;
	         var impulse = (-this.m_angularMass * Cdot);
	         var oldImpulse = this.m_angularImpulse;
	         maxImpulse = step.dt * this.m_maxTorque;
	         this.m_angularImpulse = b2Math.Clamp(this.m_angularImpulse + impulse, (-maxImpulse), maxImpulse);
	         impulse = this.m_angularImpulse - oldImpulse;
	         wA -= iA * impulse;
	         wB += iB * impulse;
	      } {
	         var CdotX = vB.x - wB * rBY - vA.x + wA * rAY;
	         var CdotY = vB.y + wB * rBX - vA.y - wA * rAX;
	         var impulseV = b2Math.MulMV(this.m_linearMass, new b2Vec2((-CdotX), (-CdotY)));
	         var oldImpulseV = this.m_linearImpulse.Copy();
	         this.m_linearImpulse.Add(impulseV);
	         maxImpulse = step.dt * this.m_maxForce;
	         if (this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
	            this.m_linearImpulse.Normalize();
	            this.m_linearImpulse.Multiply(maxImpulse);
	         }
	         impulseV = b2Math.SubtractVV(this.m_linearImpulse, oldImpulseV);
	         vA.x -= mA * impulseV.x;
	         vA.y -= mA * impulseV.y;
	         wA -= iA * (rAX * impulseV.y - rAY * impulseV.x);
	         vB.x += mB * impulseV.x;
	         vB.y += mB * impulseV.y;
	         wB += iB * (rBX * impulseV.y - rBY * impulseV.x);
	      }
	      bA.m_angularVelocity = wA;
	      bB.m_angularVelocity = wB;
	   }
	   b2FrictionJoint.prototype.SolvePositionConstraints = function (baumgarte) {
	      if (baumgarte === undefined) baumgarte = 0;
	      return true;
	   }
	   Box2D.inherit(b2FrictionJointDef, Box2D.Dynamics.Joints.b2JointDef);
	   b2FrictionJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	   b2FrictionJointDef.b2FrictionJointDef = function () {
	      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
	      this.localAnchorA = new b2Vec2();
	      this.localAnchorB = new b2Vec2();
	   };
	   b2FrictionJointDef.prototype.b2FrictionJointDef = function () {
	      this.__super.b2JointDef.call(this);
	      this.type = b2Joint.e_frictionJoint;
	      this.maxForce = 0.0;
	      this.maxTorque = 0.0;
	   }
	   b2FrictionJointDef.prototype.Initialize = function (bA, bB, anchor) {
	      this.bodyA = bA;
	      this.bodyB = bB;
	      this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
	      this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor));
	   }
	   Box2D.inherit(b2GearJoint, Box2D.Dynamics.Joints.b2Joint);
	   b2GearJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	   b2GearJoint.b2GearJoint = function () {
	      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
	      this.m_groundAnchor1 = new b2Vec2();
	      this.m_groundAnchor2 = new b2Vec2();
	      this.m_localAnchor1 = new b2Vec2();
	      this.m_localAnchor2 = new b2Vec2();
	      this.m_J = new b2Jacobian();
	   };
	   b2GearJoint.prototype.GetAnchorA = function () {
	      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
	   }
	   b2GearJoint.prototype.GetAnchorB = function () {
	      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
	   }
	   b2GearJoint.prototype.GetReactionForce = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return new b2Vec2(inv_dt * this.m_impulse * this.m_J.linearB.x, inv_dt * this.m_impulse * this.m_J.linearB.y);
	   }
	   b2GearJoint.prototype.GetReactionTorque = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      var tMat = this.m_bodyB.m_xf.R;
	      var rX = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x;
	      var rY = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y;
	      var tX = tMat.col1.x * rX + tMat.col2.x * rY;
	      rY = tMat.col1.y * rX + tMat.col2.y * rY;
	      rX = tX;
	      var PX = this.m_impulse * this.m_J.linearB.x;
	      var PY = this.m_impulse * this.m_J.linearB.y;
	      return inv_dt * (this.m_impulse * this.m_J.angularB - rX * PY + rY * PX);
	   }
	   b2GearJoint.prototype.GetRatio = function () {
	      return this.m_ratio;
	   }
	   b2GearJoint.prototype.SetRatio = function (ratio) {
	      if (ratio === undefined) ratio = 0;
	      this.m_ratio = ratio;
	   }
	   b2GearJoint.prototype.b2GearJoint = function (def) {
	      this.__super.b2Joint.call(this, def);
	      var type1 = parseInt(def.joint1.m_type);
	      var type2 = parseInt(def.joint2.m_type);
	      this.m_revolute1 = null;
	      this.m_prismatic1 = null;
	      this.m_revolute2 = null;
	      this.m_prismatic2 = null;
	      var coordinate1 = 0;
	      var coordinate2 = 0;
	      this.m_ground1 = def.joint1.GetBodyA();
	      this.m_bodyA = def.joint1.GetBodyB();
	      if (type1 == b2Joint.e_revoluteJoint) {
	         this.m_revolute1 = (def.joint1 instanceof b2RevoluteJoint ? def.joint1 : null);
	         this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1);
	         this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2);
	         coordinate1 = this.m_revolute1.GetJointAngle();
	      }
	      else {
	         this.m_prismatic1 = (def.joint1 instanceof b2PrismaticJoint ? def.joint1 : null);
	         this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1);
	         this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2);
	         coordinate1 = this.m_prismatic1.GetJointTranslation();
	      }
	      this.m_ground2 = def.joint2.GetBodyA();
	      this.m_bodyB = def.joint2.GetBodyB();
	      if (type2 == b2Joint.e_revoluteJoint) {
	         this.m_revolute2 = (def.joint2 instanceof b2RevoluteJoint ? def.joint2 : null);
	         this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1);
	         this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2);
	         coordinate2 = this.m_revolute2.GetJointAngle();
	      }
	      else {
	         this.m_prismatic2 = (def.joint2 instanceof b2PrismaticJoint ? def.joint2 : null);
	         this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1);
	         this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2);
	         coordinate2 = this.m_prismatic2.GetJointTranslation();
	      }
	      this.m_ratio = def.ratio;
	      this.m_constant = coordinate1 + this.m_ratio * coordinate2;
	      this.m_impulse = 0.0;
	   }
	   b2GearJoint.prototype.InitVelocityConstraints = function (step) {
	      var g1 = this.m_ground1;
	      var g2 = this.m_ground2;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var ugX = 0;
	      var ugY = 0;
	      var rX = 0;
	      var rY = 0;
	      var tMat;
	      var tVec;
	      var crug = 0;
	      var tX = 0;
	      var K = 0.0;
	      this.m_J.SetZero();
	      if (this.m_revolute1) {
	         this.m_J.angularA = (-1.0);
	         K += bA.m_invI;
	      }
	      else {
	         tMat = g1.m_xf.R;
	         tVec = this.m_prismatic1.m_localXAxis1;
	         ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	         ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	         tMat = bA.m_xf.R;
	         rX = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	         rY = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	         tX = tMat.col1.x * rX + tMat.col2.x * rY;
	         rY = tMat.col1.y * rX + tMat.col2.y * rY;
	         rX = tX;
	         crug = rX * ugY - rY * ugX;
	         this.m_J.linearA.Set((-ugX), (-ugY));
	         this.m_J.angularA = (-crug);
	         K += bA.m_invMass + bA.m_invI * crug * crug;
	      }
	      if (this.m_revolute2) {
	         this.m_J.angularB = (-this.m_ratio);
	         K += this.m_ratio * this.m_ratio * bB.m_invI;
	      }
	      else {
	         tMat = g2.m_xf.R;
	         tVec = this.m_prismatic2.m_localXAxis1;
	         ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
	         ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
	         tMat = bB.m_xf.R;
	         rX = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	         rY = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	         tX = tMat.col1.x * rX + tMat.col2.x * rY;
	         rY = tMat.col1.y * rX + tMat.col2.y * rY;
	         rX = tX;
	         crug = rX * ugY - rY * ugX;
	         this.m_J.linearB.Set((-this.m_ratio * ugX), (-this.m_ratio * ugY));
	         this.m_J.angularB = (-this.m_ratio * crug);
	         K += this.m_ratio * this.m_ratio * (bB.m_invMass + bB.m_invI * crug * crug);
	      }
	      this.m_mass = K > 0.0 ? 1.0 / K : 0.0;
	      if (step.warmStarting) {
	         bA.m_linearVelocity.x += bA.m_invMass * this.m_impulse * this.m_J.linearA.x;
	         bA.m_linearVelocity.y += bA.m_invMass * this.m_impulse * this.m_J.linearA.y;
	         bA.m_angularVelocity += bA.m_invI * this.m_impulse * this.m_J.angularA;
	         bB.m_linearVelocity.x += bB.m_invMass * this.m_impulse * this.m_J.linearB.x;
	         bB.m_linearVelocity.y += bB.m_invMass * this.m_impulse * this.m_J.linearB.y;
	         bB.m_angularVelocity += bB.m_invI * this.m_impulse * this.m_J.angularB;
	      }
	      else {
	         this.m_impulse = 0.0;
	      }
	   }
	   b2GearJoint.prototype.SolveVelocityConstraints = function (step) {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var Cdot = this.m_J.Compute(bA.m_linearVelocity, bA.m_angularVelocity, bB.m_linearVelocity, bB.m_angularVelocity);
	      var impulse = (-this.m_mass * Cdot);
	      this.m_impulse += impulse;
	      bA.m_linearVelocity.x += bA.m_invMass * impulse * this.m_J.linearA.x;
	      bA.m_linearVelocity.y += bA.m_invMass * impulse * this.m_J.linearA.y;
	      bA.m_angularVelocity += bA.m_invI * impulse * this.m_J.angularA;
	      bB.m_linearVelocity.x += bB.m_invMass * impulse * this.m_J.linearB.x;
	      bB.m_linearVelocity.y += bB.m_invMass * impulse * this.m_J.linearB.y;
	      bB.m_angularVelocity += bB.m_invI * impulse * this.m_J.angularB;
	   }
	   b2GearJoint.prototype.SolvePositionConstraints = function (baumgarte) {
	      if (baumgarte === undefined) baumgarte = 0;
	      var linearError = 0.0;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var coordinate1 = 0;
	      var coordinate2 = 0;
	      if (this.m_revolute1) {
	         coordinate1 = this.m_revolute1.GetJointAngle();
	      }
	      else {
	         coordinate1 = this.m_prismatic1.GetJointTranslation();
	      }
	      if (this.m_revolute2) {
	         coordinate2 = this.m_revolute2.GetJointAngle();
	      }
	      else {
	         coordinate2 = this.m_prismatic2.GetJointTranslation();
	      }
	      var C = this.m_constant - (coordinate1 + this.m_ratio * coordinate2);
	      var impulse = (-this.m_mass * C);
	      bA.m_sweep.c.x += bA.m_invMass * impulse * this.m_J.linearA.x;
	      bA.m_sweep.c.y += bA.m_invMass * impulse * this.m_J.linearA.y;
	      bA.m_sweep.a += bA.m_invI * impulse * this.m_J.angularA;
	      bB.m_sweep.c.x += bB.m_invMass * impulse * this.m_J.linearB.x;
	      bB.m_sweep.c.y += bB.m_invMass * impulse * this.m_J.linearB.y;
	      bB.m_sweep.a += bB.m_invI * impulse * this.m_J.angularB;
	      bA.SynchronizeTransform();
	      bB.SynchronizeTransform();
	      return linearError < b2Settings.b2_linearSlop;
	   }
	   Box2D.inherit(b2GearJointDef, Box2D.Dynamics.Joints.b2JointDef);
	   b2GearJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	   b2GearJointDef.b2GearJointDef = function () {
	      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
	   };
	   b2GearJointDef.prototype.b2GearJointDef = function () {
	      this.__super.b2JointDef.call(this);
	      this.type = b2Joint.e_gearJoint;
	      this.joint1 = null;
	      this.joint2 = null;
	      this.ratio = 1.0;
	   }
	   b2Jacobian.b2Jacobian = function () {
	      this.linearA = new b2Vec2();
	      this.linearB = new b2Vec2();
	   };
	   b2Jacobian.prototype.SetZero = function () {
	      this.linearA.SetZero();
	      this.angularA = 0.0;
	      this.linearB.SetZero();
	      this.angularB = 0.0;
	   }
	   b2Jacobian.prototype.Set = function (x1, a1, x2, a2) {
	      if (a1 === undefined) a1 = 0;
	      if (a2 === undefined) a2 = 0;
	      this.linearA.SetV(x1);
	      this.angularA = a1;
	      this.linearB.SetV(x2);
	      this.angularB = a2;
	   }
	   b2Jacobian.prototype.Compute = function (x1, a1, x2, a2) {
	      if (a1 === undefined) a1 = 0;
	      if (a2 === undefined) a2 = 0;
	      return (this.linearA.x * x1.x + this.linearA.y * x1.y) + this.angularA * a1 + (this.linearB.x * x2.x + this.linearB.y * x2.y) + this.angularB * a2;
	   }
	   b2Joint.b2Joint = function () {
	      this.m_edgeA = new b2JointEdge();
	      this.m_edgeB = new b2JointEdge();
	      this.m_localCenterA = new b2Vec2();
	      this.m_localCenterB = new b2Vec2();
	   };
	   b2Joint.prototype.GetType = function () {
	      return this.m_type;
	   }
	   b2Joint.prototype.GetAnchorA = function () {
	      return null;
	   }
	   b2Joint.prototype.GetAnchorB = function () {
	      return null;
	   }
	   b2Joint.prototype.GetReactionForce = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return null;
	   }
	   b2Joint.prototype.GetReactionTorque = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return 0.0;
	   }
	   b2Joint.prototype.GetBodyA = function () {
	      return this.m_bodyA;
	   }
	   b2Joint.prototype.GetBodyB = function () {
	      return this.m_bodyB;
	   }
	   b2Joint.prototype.GetNext = function () {
	      return this.m_next;
	   }
	   b2Joint.prototype.GetUserData = function () {
	      return this.m_userData;
	   }
	   b2Joint.prototype.SetUserData = function (data) {
	      this.m_userData = data;
	   }
	   b2Joint.prototype.IsActive = function () {
	      return this.m_bodyA.IsActive() && this.m_bodyB.IsActive();
	   }
	   b2Joint.Create = function (def, allocator) {
	      var joint = null;
	      switch (def.type) {
	      case b2Joint.e_distanceJoint:
	         {
	            joint = new b2DistanceJoint((def instanceof b2DistanceJointDef ? def : null));
	         }
	         break;
	      case b2Joint.e_mouseJoint:
	         {
	            joint = new b2MouseJoint((def instanceof b2MouseJointDef ? def : null));
	         }
	         break;
	      case b2Joint.e_prismaticJoint:
	         {
	            joint = new b2PrismaticJoint((def instanceof b2PrismaticJointDef ? def : null));
	         }
	         break;
	      case b2Joint.e_revoluteJoint:
	         {
	            joint = new b2RevoluteJoint((def instanceof b2RevoluteJointDef ? def : null));
	         }
	         break;
	      case b2Joint.e_pulleyJoint:
	         {
	            joint = new b2PulleyJoint((def instanceof b2PulleyJointDef ? def : null));
	         }
	         break;
	      case b2Joint.e_gearJoint:
	         {
	            joint = new b2GearJoint((def instanceof b2GearJointDef ? def : null));
	         }
	         break;
	      case b2Joint.e_lineJoint:
	         {
	            joint = new b2LineJoint((def instanceof b2LineJointDef ? def : null));
	         }
	         break;
	      case b2Joint.e_weldJoint:
	         {
	            joint = new b2WeldJoint((def instanceof b2WeldJointDef ? def : null));
	         }
	         break;
	      case b2Joint.e_frictionJoint:
	         {
	            joint = new b2FrictionJoint((def instanceof b2FrictionJointDef ? def : null));
	         }
	         break;
	      default:
	         break;
	      }
	      return joint;
	   }
	   b2Joint.Destroy = function (joint, allocator) {}
	   b2Joint.prototype.b2Joint = function (def) {
	      b2Settings.b2Assert(def.bodyA != def.bodyB);
	      this.m_type = def.type;
	      this.m_prev = null;
	      this.m_next = null;
	      this.m_bodyA = def.bodyA;
	      this.m_bodyB = def.bodyB;
	      this.m_collideConnected = def.collideConnected;
	      this.m_islandFlag = false;
	      this.m_userData = def.userData;
	   }
	   b2Joint.prototype.InitVelocityConstraints = function (step) {}
	   b2Joint.prototype.SolveVelocityConstraints = function (step) {}
	   b2Joint.prototype.FinalizeVelocityConstraints = function () {}
	   b2Joint.prototype.SolvePositionConstraints = function (baumgarte) {
	      if (baumgarte === undefined) baumgarte = 0;
	      return false;
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.Joints.b2Joint.e_unknownJoint = 0;
	      Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint = 1;
	      Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2;
	      Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3;
	      Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4;
	      Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5;
	      Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6;
	      Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7;
	      Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8;
	      Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9;
	      Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0;
	      Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit = 1;
	      Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit = 2;
	      Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3;
	   });
	   b2JointDef.b2JointDef = function () {};
	   b2JointDef.prototype.b2JointDef = function () {
	      this.type = b2Joint.e_unknownJoint;
	      this.userData = null;
	      this.bodyA = null;
	      this.bodyB = null;
	      this.collideConnected = false;
	   }
	   b2JointEdge.b2JointEdge = function () {};
	   Box2D.inherit(b2LineJoint, Box2D.Dynamics.Joints.b2Joint);
	   b2LineJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	   b2LineJoint.b2LineJoint = function () {
	      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
	      this.m_localAnchor1 = new b2Vec2();
	      this.m_localAnchor2 = new b2Vec2();
	      this.m_localXAxis1 = new b2Vec2();
	      this.m_localYAxis1 = new b2Vec2();
	      this.m_axis = new b2Vec2();
	      this.m_perp = new b2Vec2();
	      this.m_K = new b2Mat22();
	      this.m_impulse = new b2Vec2();
	   };
	   b2LineJoint.prototype.GetAnchorA = function () {
	      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
	   }
	   b2LineJoint.prototype.GetAnchorB = function () {
	      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
	   }
	   b2LineJoint.prototype.GetReactionForce = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y));
	   }
	   b2LineJoint.prototype.GetReactionTorque = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return inv_dt * this.m_impulse.y;
	   }
	   b2LineJoint.prototype.GetJointTranslation = function () {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var tMat;
	      var p1 = bA.GetWorldPoint(this.m_localAnchor1);
	      var p2 = bB.GetWorldPoint(this.m_localAnchor2);
	      var dX = p2.x - p1.x;
	      var dY = p2.y - p1.y;
	      var axis = bA.GetWorldVector(this.m_localXAxis1);
	      var translation = axis.x * dX + axis.y * dY;
	      return translation;
	   }
	   b2LineJoint.prototype.GetJointSpeed = function () {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var tMat;
	      tMat = bA.m_xf.R;
	      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	      r1X = tX;
	      tMat = bB.m_xf.R;
	      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	      r2X = tX;
	      var p1X = bA.m_sweep.c.x + r1X;
	      var p1Y = bA.m_sweep.c.y + r1Y;
	      var p2X = bB.m_sweep.c.x + r2X;
	      var p2Y = bB.m_sweep.c.y + r2Y;
	      var dX = p2X - p1X;
	      var dY = p2Y - p1Y;
	      var axis = bA.GetWorldVector(this.m_localXAxis1);
	      var v1 = bA.m_linearVelocity;
	      var v2 = bB.m_linearVelocity;
	      var w1 = bA.m_angularVelocity;
	      var w2 = bB.m_angularVelocity;
	      var speed = (dX * ((-w1 * axis.y)) + dY * (w1 * axis.x)) + (axis.x * (((v2.x + ((-w2 * r2Y))) - v1.x) - ((-w1 * r1Y))) + axis.y * (((v2.y + (w2 * r2X)) - v1.y) - (w1 * r1X)));
	      return speed;
	   }
	   b2LineJoint.prototype.IsLimitEnabled = function () {
	      return this.m_enableLimit;
	   }
	   b2LineJoint.prototype.EnableLimit = function (flag) {
	      this.m_bodyA.SetAwake(true);
	      this.m_bodyB.SetAwake(true);
	      this.m_enableLimit = flag;
	   }
	   b2LineJoint.prototype.GetLowerLimit = function () {
	      return this.m_lowerTranslation;
	   }
	   b2LineJoint.prototype.GetUpperLimit = function () {
	      return this.m_upperTranslation;
	   }
	   b2LineJoint.prototype.SetLimits = function (lower, upper) {
	      if (lower === undefined) lower = 0;
	      if (upper === undefined) upper = 0;
	      this.m_bodyA.SetAwake(true);
	      this.m_bodyB.SetAwake(true);
	      this.m_lowerTranslation = lower;
	      this.m_upperTranslation = upper;
	   }
	   b2LineJoint.prototype.IsMotorEnabled = function () {
	      return this.m_enableMotor;
	   }
	   b2LineJoint.prototype.EnableMotor = function (flag) {
	      this.m_bodyA.SetAwake(true);
	      this.m_bodyB.SetAwake(true);
	      this.m_enableMotor = flag;
	   }
	   b2LineJoint.prototype.SetMotorSpeed = function (speed) {
	      if (speed === undefined) speed = 0;
	      this.m_bodyA.SetAwake(true);
	      this.m_bodyB.SetAwake(true);
	      this.m_motorSpeed = speed;
	   }
	   b2LineJoint.prototype.GetMotorSpeed = function () {
	      return this.m_motorSpeed;
	   }
	   b2LineJoint.prototype.SetMaxMotorForce = function (force) {
	      if (force === undefined) force = 0;
	      this.m_bodyA.SetAwake(true);
	      this.m_bodyB.SetAwake(true);
	      this.m_maxMotorForce = force;
	   }
	   b2LineJoint.prototype.GetMaxMotorForce = function () {
	      return this.m_maxMotorForce;
	   }
	   b2LineJoint.prototype.GetMotorForce = function () {
	      return this.m_motorImpulse;
	   }
	   b2LineJoint.prototype.b2LineJoint = function (def) {
	      this.__super.b2Joint.call(this, def);
	      var tMat;
	      var tX = 0;
	      var tY = 0;
	      this.m_localAnchor1.SetV(def.localAnchorA);
	      this.m_localAnchor2.SetV(def.localAnchorB);
	      this.m_localXAxis1.SetV(def.localAxisA);
	      this.m_localYAxis1.x = (-this.m_localXAxis1.y);
	      this.m_localYAxis1.y = this.m_localXAxis1.x;
	      this.m_impulse.SetZero();
	      this.m_motorMass = 0.0;
	      this.m_motorImpulse = 0.0;
	      this.m_lowerTranslation = def.lowerTranslation;
	      this.m_upperTranslation = def.upperTranslation;
	      this.m_maxMotorForce = def.maxMotorForce;
	      this.m_motorSpeed = def.motorSpeed;
	      this.m_enableLimit = def.enableLimit;
	      this.m_enableMotor = def.enableMotor;
	      this.m_limitState = b2Joint.e_inactiveLimit;
	      this.m_axis.SetZero();
	      this.m_perp.SetZero();
	   }
	   b2LineJoint.prototype.InitVelocityConstraints = function (step) {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var tMat;
	      var tX = 0;
	      this.m_localCenterA.SetV(bA.GetLocalCenter());
	      this.m_localCenterB.SetV(bB.GetLocalCenter());
	      var xf1 = bA.GetTransform();
	      var xf2 = bB.GetTransform();
	      tMat = bA.m_xf.R;
	      var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
	      var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
	      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	      r1X = tX;
	      tMat = bB.m_xf.R;
	      var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
	      var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
	      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	      r2X = tX;
	      var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
	      var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
	      this.m_invMassA = bA.m_invMass;
	      this.m_invMassB = bB.m_invMass;
	      this.m_invIA = bA.m_invI;
	      this.m_invIB = bB.m_invI; {
	         this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
	         this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
	         this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
	         this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
	         this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1.0 / this.m_motorMass : 0.0;
	      } {
	         this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
	         this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
	         this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
	         var m1 = this.m_invMassA;
	         var m2 = this.m_invMassB;
	         var i1 = this.m_invIA;
	         var i2 = this.m_invIB;
	         this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
	         this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
	         this.m_K.col2.x = this.m_K.col1.y;
	         this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
	      }
	      if (this.m_enableLimit) {
	         var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
	         if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
	            this.m_limitState = b2Joint.e_equalLimits;
	         }
	         else if (jointTransition <= this.m_lowerTranslation) {
	            if (this.m_limitState != b2Joint.e_atLowerLimit) {
	               this.m_limitState = b2Joint.e_atLowerLimit;
	               this.m_impulse.y = 0.0;
	            }
	         }
	         else if (jointTransition >= this.m_upperTranslation) {
	            if (this.m_limitState != b2Joint.e_atUpperLimit) {
	               this.m_limitState = b2Joint.e_atUpperLimit;
	               this.m_impulse.y = 0.0;
	            }
	         }
	         else {
	            this.m_limitState = b2Joint.e_inactiveLimit;
	            this.m_impulse.y = 0.0;
	         }
	      }
	      else {
	         this.m_limitState = b2Joint.e_inactiveLimit;
	      }
	      if (this.m_enableMotor == false) {
	         this.m_motorImpulse = 0.0;
	      }
	      if (step.warmStarting) {
	         this.m_impulse.x *= step.dtRatio;
	         this.m_impulse.y *= step.dtRatio;
	         this.m_motorImpulse *= step.dtRatio;
	         var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x;
	         var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y;
	         var L1 = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1;
	         var L2 = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2;
	         bA.m_linearVelocity.x -= this.m_invMassA * PX;
	         bA.m_linearVelocity.y -= this.m_invMassA * PY;
	         bA.m_angularVelocity -= this.m_invIA * L1;
	         bB.m_linearVelocity.x += this.m_invMassB * PX;
	         bB.m_linearVelocity.y += this.m_invMassB * PY;
	         bB.m_angularVelocity += this.m_invIB * L2;
	      }
	      else {
	         this.m_impulse.SetZero();
	         this.m_motorImpulse = 0.0;
	      }
	   }
	   b2LineJoint.prototype.SolveVelocityConstraints = function (step) {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var v1 = bA.m_linearVelocity;
	      var w1 = bA.m_angularVelocity;
	      var v2 = bB.m_linearVelocity;
	      var w2 = bB.m_angularVelocity;
	      var PX = 0;
	      var PY = 0;
	      var L1 = 0;
	      var L2 = 0;
	      if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
	         var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
	         var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
	         var oldImpulse = this.m_motorImpulse;
	         var maxImpulse = step.dt * this.m_maxMotorForce;
	         this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
	         impulse = this.m_motorImpulse - oldImpulse;
	         PX = impulse * this.m_axis.x;
	         PY = impulse * this.m_axis.y;
	         L1 = impulse * this.m_a1;
	         L2 = impulse * this.m_a2;
	         v1.x -= this.m_invMassA * PX;
	         v1.y -= this.m_invMassA * PY;
	         w1 -= this.m_invIA * L1;
	         v2.x += this.m_invMassB * PX;
	         v2.y += this.m_invMassB * PY;
	         w2 += this.m_invIB * L2;
	      }
	      var Cdot1 = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
	      if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
	         var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
	         var f1 = this.m_impulse.Copy();
	         var df = this.m_K.Solve(new b2Vec2(), (-Cdot1), (-Cdot2));
	         this.m_impulse.Add(df);
	         if (this.m_limitState == b2Joint.e_atLowerLimit) {
	            this.m_impulse.y = b2Math.Max(this.m_impulse.y, 0.0);
	         }
	         else if (this.m_limitState == b2Joint.e_atUpperLimit) {
	            this.m_impulse.y = b2Math.Min(this.m_impulse.y, 0.0);
	         }
	         var b = (-Cdot1) - (this.m_impulse.y - f1.y) * this.m_K.col2.x;
	         var f2r = 0;
	         if (this.m_K.col1.x != 0.0) {
	            f2r = b / this.m_K.col1.x + f1.x;
	         }
	         else {
	            f2r = f1.x;
	         }
	         this.m_impulse.x = f2r;
	         df.x = this.m_impulse.x - f1.x;
	         df.y = this.m_impulse.y - f1.y;
	         PX = df.x * this.m_perp.x + df.y * this.m_axis.x;
	         PY = df.x * this.m_perp.y + df.y * this.m_axis.y;
	         L1 = df.x * this.m_s1 + df.y * this.m_a1;
	         L2 = df.x * this.m_s2 + df.y * this.m_a2;
	         v1.x -= this.m_invMassA * PX;
	         v1.y -= this.m_invMassA * PY;
	         w1 -= this.m_invIA * L1;
	         v2.x += this.m_invMassB * PX;
	         v2.y += this.m_invMassB * PY;
	         w2 += this.m_invIB * L2;
	      }
	      else {
	         var df2 = 0;
	         if (this.m_K.col1.x != 0.0) {
	            df2 = ((-Cdot1)) / this.m_K.col1.x;
	         }
	         else {
	            df2 = 0.0;
	         }
	         this.m_impulse.x += df2;
	         PX = df2 * this.m_perp.x;
	         PY = df2 * this.m_perp.y;
	         L1 = df2 * this.m_s1;
	         L2 = df2 * this.m_s2;
	         v1.x -= this.m_invMassA * PX;
	         v1.y -= this.m_invMassA * PY;
	         w1 -= this.m_invIA * L1;
	         v2.x += this.m_invMassB * PX;
	         v2.y += this.m_invMassB * PY;
	         w2 += this.m_invIB * L2;
	      }
	      bA.m_linearVelocity.SetV(v1);
	      bA.m_angularVelocity = w1;
	      bB.m_linearVelocity.SetV(v2);
	      bB.m_angularVelocity = w2;
	   }
	   b2LineJoint.prototype.SolvePositionConstraints = function (baumgarte) {
	      if (baumgarte === undefined) baumgarte = 0;
	      var limitC = 0;
	      var oldLimitImpulse = 0;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var c1 = bA.m_sweep.c;
	      var a1 = bA.m_sweep.a;
	      var c2 = bB.m_sweep.c;
	      var a2 = bB.m_sweep.a;
	      var tMat;
	      var tX = 0;
	      var m1 = 0;
	      var m2 = 0;
	      var i1 = 0;
	      var i2 = 0;
	      var linearError = 0.0;
	      var angularError = 0.0;
	      var active = false;
	      var C2 = 0.0;
	      var R1 = b2Mat22.FromAngle(a1);
	      var R2 = b2Mat22.FromAngle(a2);
	      tMat = R1;
	      var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
	      var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
	      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	      r1X = tX;
	      tMat = R2;
	      var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
	      var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
	      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	      r2X = tX;
	      var dX = c2.x + r2X - c1.x - r1X;
	      var dY = c2.y + r2Y - c1.y - r1Y;
	      if (this.m_enableLimit) {
	         this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
	         this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
	         this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
	         var translation = this.m_axis.x * dX + this.m_axis.y * dY;
	         if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
	            C2 = b2Math.Clamp(translation, (-b2Settings.b2_maxLinearCorrection), b2Settings.b2_maxLinearCorrection);
	            linearError = b2Math.Abs(translation);
	            active = true;
	         }
	         else if (translation <= this.m_lowerTranslation) {
	            C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
	            linearError = this.m_lowerTranslation - translation;
	            active = true;
	         }
	         else if (translation >= this.m_upperTranslation) {
	            C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0.0, b2Settings.b2_maxLinearCorrection);
	            linearError = translation - this.m_upperTranslation;
	            active = true;
	         }
	      }
	      this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
	      this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
	      this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
	      var impulse = new b2Vec2();
	      var C1 = this.m_perp.x * dX + this.m_perp.y * dY;
	      linearError = b2Math.Max(linearError, b2Math.Abs(C1));
	      angularError = 0.0;
	      if (active) {
	         m1 = this.m_invMassA;
	         m2 = this.m_invMassB;
	         i1 = this.m_invIA;
	         i2 = this.m_invIB;
	         this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
	         this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
	         this.m_K.col2.x = this.m_K.col1.y;
	         this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
	         this.m_K.Solve(impulse, (-C1), (-C2));
	      }
	      else {
	         m1 = this.m_invMassA;
	         m2 = this.m_invMassB;
	         i1 = this.m_invIA;
	         i2 = this.m_invIB;
	         var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
	         var impulse1 = 0;
	         if (k11 != 0.0) {
	            impulse1 = ((-C1)) / k11;
	         }
	         else {
	            impulse1 = 0.0;
	         }
	         impulse.x = impulse1;
	         impulse.y = 0.0;
	      }
	      var PX = impulse.x * this.m_perp.x + impulse.y * this.m_axis.x;
	      var PY = impulse.x * this.m_perp.y + impulse.y * this.m_axis.y;
	      var L1 = impulse.x * this.m_s1 + impulse.y * this.m_a1;
	      var L2 = impulse.x * this.m_s2 + impulse.y * this.m_a2;
	      c1.x -= this.m_invMassA * PX;
	      c1.y -= this.m_invMassA * PY;
	      a1 -= this.m_invIA * L1;
	      c2.x += this.m_invMassB * PX;
	      c2.y += this.m_invMassB * PY;
	      a2 += this.m_invIB * L2;
	      bA.m_sweep.a = a1;
	      bB.m_sweep.a = a2;
	      bA.SynchronizeTransform();
	      bB.SynchronizeTransform();
	      return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
	   }
	   Box2D.inherit(b2LineJointDef, Box2D.Dynamics.Joints.b2JointDef);
	   b2LineJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	   b2LineJointDef.b2LineJointDef = function () {
	      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
	      this.localAnchorA = new b2Vec2();
	      this.localAnchorB = new b2Vec2();
	      this.localAxisA = new b2Vec2();
	   };
	   b2LineJointDef.prototype.b2LineJointDef = function () {
	      this.__super.b2JointDef.call(this);
	      this.type = b2Joint.e_lineJoint;
	      this.localAxisA.Set(1.0, 0.0);
	      this.enableLimit = false;
	      this.lowerTranslation = 0.0;
	      this.upperTranslation = 0.0;
	      this.enableMotor = false;
	      this.maxMotorForce = 0.0;
	      this.motorSpeed = 0.0;
	   }
	   b2LineJointDef.prototype.Initialize = function (bA, bB, anchor, axis) {
	      this.bodyA = bA;
	      this.bodyB = bB;
	      this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
	      this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
	      this.localAxisA = this.bodyA.GetLocalVector(axis);
	   }
	   Box2D.inherit(b2MouseJoint, Box2D.Dynamics.Joints.b2Joint);
	   b2MouseJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	   b2MouseJoint.b2MouseJoint = function () {
	      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
	      this.K = new b2Mat22();
	      this.K1 = new b2Mat22();
	      this.K2 = new b2Mat22();
	      this.m_localAnchor = new b2Vec2();
	      this.m_target = new b2Vec2();
	      this.m_impulse = new b2Vec2();
	      this.m_mass = new b2Mat22();
	      this.m_C = new b2Vec2();
	   };
	   b2MouseJoint.prototype.GetAnchorA = function () {
	      return this.m_target;
	   }
	   b2MouseJoint.prototype.GetAnchorB = function () {
	      return this.m_bodyB.GetWorldPoint(this.m_localAnchor);
	   }
	   b2MouseJoint.prototype.GetReactionForce = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y);
	   }
	   b2MouseJoint.prototype.GetReactionTorque = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return 0.0;
	   }
	   b2MouseJoint.prototype.GetTarget = function () {
	      return this.m_target;
	   }
	   b2MouseJoint.prototype.SetTarget = function (target) {
	      if (this.m_bodyB.IsAwake() == false) {
	         this.m_bodyB.SetAwake(true);
	      }
	      this.m_target = target;
	   }
	   b2MouseJoint.prototype.GetMaxForce = function () {
	      return this.m_maxForce;
	   }
	   b2MouseJoint.prototype.SetMaxForce = function (maxForce) {
	      if (maxForce === undefined) maxForce = 0;
	      this.m_maxForce = maxForce;
	   }
	   b2MouseJoint.prototype.GetFrequency = function () {
	      return this.m_frequencyHz;
	   }
	   b2MouseJoint.prototype.SetFrequency = function (hz) {
	      if (hz === undefined) hz = 0;
	      this.m_frequencyHz = hz;
	   }
	   b2MouseJoint.prototype.GetDampingRatio = function () {
	      return this.m_dampingRatio;
	   }
	   b2MouseJoint.prototype.SetDampingRatio = function (ratio) {
	      if (ratio === undefined) ratio = 0;
	      this.m_dampingRatio = ratio;
	   }
	   b2MouseJoint.prototype.b2MouseJoint = function (def) {
	      this.__super.b2Joint.call(this, def);
	      this.m_target.SetV(def.target);
	      var tX = this.m_target.x - this.m_bodyB.m_xf.position.x;
	      var tY = this.m_target.y - this.m_bodyB.m_xf.position.y;
	      var tMat = this.m_bodyB.m_xf.R;
	      this.m_localAnchor.x = (tX * tMat.col1.x + tY * tMat.col1.y);
	      this.m_localAnchor.y = (tX * tMat.col2.x + tY * tMat.col2.y);
	      this.m_maxForce = def.maxForce;
	      this.m_impulse.SetZero();
	      this.m_frequencyHz = def.frequencyHz;
	      this.m_dampingRatio = def.dampingRatio;
	      this.m_beta = 0.0;
	      this.m_gamma = 0.0;
	   }
	   b2MouseJoint.prototype.InitVelocityConstraints = function (step) {
	      var b = this.m_bodyB;
	      var mass = b.GetMass();
	      var omega = 2.0 * Math.PI * this.m_frequencyHz;
	      var d = 2.0 * mass * this.m_dampingRatio * omega;
	      var k = mass * omega * omega;
	      this.m_gamma = step.dt * (d + step.dt * k);
	      this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0.0;
	      this.m_beta = step.dt * k * this.m_gamma;
	      var tMat;tMat = b.m_xf.R;
	      var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
	      var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
	      var tX = (tMat.col1.x * rX + tMat.col2.x * rY);rY = (tMat.col1.y * rX + tMat.col2.y * rY);
	      rX = tX;
	      var invMass = b.m_invMass;
	      var invI = b.m_invI;this.K1.col1.x = invMass;
	      this.K1.col2.x = 0.0;
	      this.K1.col1.y = 0.0;
	      this.K1.col2.y = invMass;
	      this.K2.col1.x = invI * rY * rY;
	      this.K2.col2.x = (-invI * rX * rY);
	      this.K2.col1.y = (-invI * rX * rY);
	      this.K2.col2.y = invI * rX * rX;
	      this.K.SetM(this.K1);
	      this.K.AddM(this.K2);
	      this.K.col1.x += this.m_gamma;
	      this.K.col2.y += this.m_gamma;
	      this.K.GetInverse(this.m_mass);
	      this.m_C.x = b.m_sweep.c.x + rX - this.m_target.x;
	      this.m_C.y = b.m_sweep.c.y + rY - this.m_target.y;
	      b.m_angularVelocity *= 0.98;
	      this.m_impulse.x *= step.dtRatio;
	      this.m_impulse.y *= step.dtRatio;
	      b.m_linearVelocity.x += invMass * this.m_impulse.x;
	      b.m_linearVelocity.y += invMass * this.m_impulse.y;
	      b.m_angularVelocity += invI * (rX * this.m_impulse.y - rY * this.m_impulse.x);
	   }
	   b2MouseJoint.prototype.SolveVelocityConstraints = function (step) {
	      var b = this.m_bodyB;
	      var tMat;
	      var tX = 0;
	      var tY = 0;
	      tMat = b.m_xf.R;
	      var rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
	      var rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * rX + tMat.col2.x * rY);
	      rY = (tMat.col1.y * rX + tMat.col2.y * rY);
	      rX = tX;
	      var CdotX = b.m_linearVelocity.x + ((-b.m_angularVelocity * rY));
	      var CdotY = b.m_linearVelocity.y + (b.m_angularVelocity * rX);
	      tMat = this.m_mass;
	      tX = CdotX + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
	      tY = CdotY + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
	      var impulseX = (-(tMat.col1.x * tX + tMat.col2.x * tY));
	      var impulseY = (-(tMat.col1.y * tX + tMat.col2.y * tY));
	      var oldImpulseX = this.m_impulse.x;
	      var oldImpulseY = this.m_impulse.y;
	      this.m_impulse.x += impulseX;
	      this.m_impulse.y += impulseY;
	      var maxImpulse = step.dt * this.m_maxForce;
	      if (this.m_impulse.LengthSquared() > maxImpulse * maxImpulse) {
	         this.m_impulse.Multiply(maxImpulse / this.m_impulse.Length());
	      }
	      impulseX = this.m_impulse.x - oldImpulseX;
	      impulseY = this.m_impulse.y - oldImpulseY;
	      b.m_linearVelocity.x += b.m_invMass * impulseX;
	      b.m_linearVelocity.y += b.m_invMass * impulseY;
	      b.m_angularVelocity += b.m_invI * (rX * impulseY - rY * impulseX);
	   }
	   b2MouseJoint.prototype.SolvePositionConstraints = function (baumgarte) {
	      if (baumgarte === undefined) baumgarte = 0;
	      return true;
	   }
	   Box2D.inherit(b2MouseJointDef, Box2D.Dynamics.Joints.b2JointDef);
	   b2MouseJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	   b2MouseJointDef.b2MouseJointDef = function () {
	      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
	      this.target = new b2Vec2();
	   };
	   b2MouseJointDef.prototype.b2MouseJointDef = function () {
	      this.__super.b2JointDef.call(this);
	      this.type = b2Joint.e_mouseJoint;
	      this.maxForce = 0.0;
	      this.frequencyHz = 5.0;
	      this.dampingRatio = 0.7;
	   }
	   Box2D.inherit(b2PrismaticJoint, Box2D.Dynamics.Joints.b2Joint);
	   b2PrismaticJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	   b2PrismaticJoint.b2PrismaticJoint = function () {
	      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
	      this.m_localAnchor1 = new b2Vec2();
	      this.m_localAnchor2 = new b2Vec2();
	      this.m_localXAxis1 = new b2Vec2();
	      this.m_localYAxis1 = new b2Vec2();
	      this.m_axis = new b2Vec2();
	      this.m_perp = new b2Vec2();
	      this.m_K = new b2Mat33();
	      this.m_impulse = new b2Vec3();
	   };
	   b2PrismaticJoint.prototype.GetAnchorA = function () {
	      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
	   }
	   b2PrismaticJoint.prototype.GetAnchorB = function () {
	      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
	   }
	   b2PrismaticJoint.prototype.GetReactionForce = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y));
	   }
	   b2PrismaticJoint.prototype.GetReactionTorque = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return inv_dt * this.m_impulse.y;
	   }
	   b2PrismaticJoint.prototype.GetJointTranslation = function () {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var tMat;
	      var p1 = bA.GetWorldPoint(this.m_localAnchor1);
	      var p2 = bB.GetWorldPoint(this.m_localAnchor2);
	      var dX = p2.x - p1.x;
	      var dY = p2.y - p1.y;
	      var axis = bA.GetWorldVector(this.m_localXAxis1);
	      var translation = axis.x * dX + axis.y * dY;
	      return translation;
	   }
	   b2PrismaticJoint.prototype.GetJointSpeed = function () {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var tMat;
	      tMat = bA.m_xf.R;
	      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	      r1X = tX;
	      tMat = bB.m_xf.R;
	      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	      r2X = tX;
	      var p1X = bA.m_sweep.c.x + r1X;
	      var p1Y = bA.m_sweep.c.y + r1Y;
	      var p2X = bB.m_sweep.c.x + r2X;
	      var p2Y = bB.m_sweep.c.y + r2Y;
	      var dX = p2X - p1X;
	      var dY = p2Y - p1Y;
	      var axis = bA.GetWorldVector(this.m_localXAxis1);
	      var v1 = bA.m_linearVelocity;
	      var v2 = bB.m_linearVelocity;
	      var w1 = bA.m_angularVelocity;
	      var w2 = bB.m_angularVelocity;
	      var speed = (dX * ((-w1 * axis.y)) + dY * (w1 * axis.x)) + (axis.x * (((v2.x + ((-w2 * r2Y))) - v1.x) - ((-w1 * r1Y))) + axis.y * (((v2.y + (w2 * r2X)) - v1.y) - (w1 * r1X)));
	      return speed;
	   }
	   b2PrismaticJoint.prototype.IsLimitEnabled = function () {
	      return this.m_enableLimit;
	   }
	   b2PrismaticJoint.prototype.EnableLimit = function (flag) {
	      this.m_bodyA.SetAwake(true);
	      this.m_bodyB.SetAwake(true);
	      this.m_enableLimit = flag;
	   }
	   b2PrismaticJoint.prototype.GetLowerLimit = function () {
	      return this.m_lowerTranslation;
	   }
	   b2PrismaticJoint.prototype.GetUpperLimit = function () {
	      return this.m_upperTranslation;
	   }
	   b2PrismaticJoint.prototype.SetLimits = function (lower, upper) {
	      if (lower === undefined) lower = 0;
	      if (upper === undefined) upper = 0;
	      this.m_bodyA.SetAwake(true);
	      this.m_bodyB.SetAwake(true);
	      this.m_lowerTranslation = lower;
	      this.m_upperTranslation = upper;
	   }
	   b2PrismaticJoint.prototype.IsMotorEnabled = function () {
	      return this.m_enableMotor;
	   }
	   b2PrismaticJoint.prototype.EnableMotor = function (flag) {
	      this.m_bodyA.SetAwake(true);
	      this.m_bodyB.SetAwake(true);
	      this.m_enableMotor = flag;
	   }
	   b2PrismaticJoint.prototype.SetMotorSpeed = function (speed) {
	      if (speed === undefined) speed = 0;
	      this.m_bodyA.SetAwake(true);
	      this.m_bodyB.SetAwake(true);
	      this.m_motorSpeed = speed;
	   }
	   b2PrismaticJoint.prototype.GetMotorSpeed = function () {
	      return this.m_motorSpeed;
	   }
	   b2PrismaticJoint.prototype.SetMaxMotorForce = function (force) {
	      if (force === undefined) force = 0;
	      this.m_bodyA.SetAwake(true);
	      this.m_bodyB.SetAwake(true);
	      this.m_maxMotorForce = force;
	   }
	   b2PrismaticJoint.prototype.GetMotorForce = function () {
	      return this.m_motorImpulse;
	   }
	   b2PrismaticJoint.prototype.b2PrismaticJoint = function (def) {
	      this.__super.b2Joint.call(this, def);
	      var tMat;
	      var tX = 0;
	      var tY = 0;
	      this.m_localAnchor1.SetV(def.localAnchorA);
	      this.m_localAnchor2.SetV(def.localAnchorB);
	      this.m_localXAxis1.SetV(def.localAxisA);
	      this.m_localYAxis1.x = (-this.m_localXAxis1.y);
	      this.m_localYAxis1.y = this.m_localXAxis1.x;
	      this.m_refAngle = def.referenceAngle;
	      this.m_impulse.SetZero();
	      this.m_motorMass = 0.0;
	      this.m_motorImpulse = 0.0;
	      this.m_lowerTranslation = def.lowerTranslation;
	      this.m_upperTranslation = def.upperTranslation;
	      this.m_maxMotorForce = def.maxMotorForce;
	      this.m_motorSpeed = def.motorSpeed;
	      this.m_enableLimit = def.enableLimit;
	      this.m_enableMotor = def.enableMotor;
	      this.m_limitState = b2Joint.e_inactiveLimit;
	      this.m_axis.SetZero();
	      this.m_perp.SetZero();
	   }
	   b2PrismaticJoint.prototype.InitVelocityConstraints = function (step) {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var tMat;
	      var tX = 0;
	      this.m_localCenterA.SetV(bA.GetLocalCenter());
	      this.m_localCenterB.SetV(bB.GetLocalCenter());
	      var xf1 = bA.GetTransform();
	      var xf2 = bB.GetTransform();
	      tMat = bA.m_xf.R;
	      var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
	      var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
	      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	      r1X = tX;
	      tMat = bB.m_xf.R;
	      var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
	      var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
	      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	      r2X = tX;
	      var dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
	      var dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
	      this.m_invMassA = bA.m_invMass;
	      this.m_invMassB = bB.m_invMass;
	      this.m_invIA = bA.m_invI;
	      this.m_invIB = bB.m_invI; {
	         this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
	         this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
	         this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
	         this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
	         if (this.m_motorMass > Number.MIN_VALUE) this.m_motorMass = 1.0 / this.m_motorMass;
	      } {
	         this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
	         this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
	         this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
	         var m1 = this.m_invMassA;
	         var m2 = this.m_invMassB;
	         var i1 = this.m_invIA;
	         var i2 = this.m_invIB;
	         this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
	         this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
	         this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
	         this.m_K.col2.x = this.m_K.col1.y;
	         this.m_K.col2.y = i1 + i2;
	         this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
	         this.m_K.col3.x = this.m_K.col1.z;
	         this.m_K.col3.y = this.m_K.col2.z;
	         this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
	      }
	      if (this.m_enableLimit) {
	         var jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
	         if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
	            this.m_limitState = b2Joint.e_equalLimits;
	         }
	         else if (jointTransition <= this.m_lowerTranslation) {
	            if (this.m_limitState != b2Joint.e_atLowerLimit) {
	               this.m_limitState = b2Joint.e_atLowerLimit;
	               this.m_impulse.z = 0.0;
	            }
	         }
	         else if (jointTransition >= this.m_upperTranslation) {
	            if (this.m_limitState != b2Joint.e_atUpperLimit) {
	               this.m_limitState = b2Joint.e_atUpperLimit;
	               this.m_impulse.z = 0.0;
	            }
	         }
	         else {
	            this.m_limitState = b2Joint.e_inactiveLimit;
	            this.m_impulse.z = 0.0;
	         }
	      }
	      else {
	         this.m_limitState = b2Joint.e_inactiveLimit;
	      }
	      if (this.m_enableMotor == false) {
	         this.m_motorImpulse = 0.0;
	      }
	      if (step.warmStarting) {
	         this.m_impulse.x *= step.dtRatio;
	         this.m_impulse.y *= step.dtRatio;
	         this.m_motorImpulse *= step.dtRatio;
	         var PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x;
	         var PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y;
	         var L1 = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
	         var L2 = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
	         bA.m_linearVelocity.x -= this.m_invMassA * PX;
	         bA.m_linearVelocity.y -= this.m_invMassA * PY;
	         bA.m_angularVelocity -= this.m_invIA * L1;
	         bB.m_linearVelocity.x += this.m_invMassB * PX;
	         bB.m_linearVelocity.y += this.m_invMassB * PY;
	         bB.m_angularVelocity += this.m_invIB * L2;
	      }
	      else {
	         this.m_impulse.SetZero();
	         this.m_motorImpulse = 0.0;
	      }
	   }
	   b2PrismaticJoint.prototype.SolveVelocityConstraints = function (step) {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var v1 = bA.m_linearVelocity;
	      var w1 = bA.m_angularVelocity;
	      var v2 = bB.m_linearVelocity;
	      var w2 = bB.m_angularVelocity;
	      var PX = 0;
	      var PY = 0;
	      var L1 = 0;
	      var L2 = 0;
	      if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
	         var Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
	         var impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
	         var oldImpulse = this.m_motorImpulse;
	         var maxImpulse = step.dt * this.m_maxMotorForce;
	         this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
	         impulse = this.m_motorImpulse - oldImpulse;
	         PX = impulse * this.m_axis.x;
	         PY = impulse * this.m_axis.y;
	         L1 = impulse * this.m_a1;
	         L2 = impulse * this.m_a2;
	         v1.x -= this.m_invMassA * PX;
	         v1.y -= this.m_invMassA * PY;
	         w1 -= this.m_invIA * L1;
	         v2.x += this.m_invMassB * PX;
	         v2.y += this.m_invMassB * PY;
	         w2 += this.m_invIB * L2;
	      }
	      var Cdot1X = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
	      var Cdot1Y = w2 - w1;
	      if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
	         var Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
	         var f1 = this.m_impulse.Copy();
	         var df = this.m_K.Solve33(new b2Vec3(), (-Cdot1X), (-Cdot1Y), (-Cdot2));
	         this.m_impulse.Add(df);
	         if (this.m_limitState == b2Joint.e_atLowerLimit) {
	            this.m_impulse.z = b2Math.Max(this.m_impulse.z, 0.0);
	         }
	         else if (this.m_limitState == b2Joint.e_atUpperLimit) {
	            this.m_impulse.z = b2Math.Min(this.m_impulse.z, 0.0);
	         }
	         var bX = (-Cdot1X) - (this.m_impulse.z - f1.z) * this.m_K.col3.x;
	         var bY = (-Cdot1Y) - (this.m_impulse.z - f1.z) * this.m_K.col3.y;
	         var f2r = this.m_K.Solve22(new b2Vec2(), bX, bY);
	         f2r.x += f1.x;
	         f2r.y += f1.y;
	         this.m_impulse.x = f2r.x;
	         this.m_impulse.y = f2r.y;
	         df.x = this.m_impulse.x - f1.x;
	         df.y = this.m_impulse.y - f1.y;
	         df.z = this.m_impulse.z - f1.z;
	         PX = df.x * this.m_perp.x + df.z * this.m_axis.x;
	         PY = df.x * this.m_perp.y + df.z * this.m_axis.y;
	         L1 = df.x * this.m_s1 + df.y + df.z * this.m_a1;
	         L2 = df.x * this.m_s2 + df.y + df.z * this.m_a2;
	         v1.x -= this.m_invMassA * PX;
	         v1.y -= this.m_invMassA * PY;
	         w1 -= this.m_invIA * L1;
	         v2.x += this.m_invMassB * PX;
	         v2.y += this.m_invMassB * PY;
	         w2 += this.m_invIB * L2;
	      }
	      else {
	         var df2 = this.m_K.Solve22(new b2Vec2(), (-Cdot1X), (-Cdot1Y));
	         this.m_impulse.x += df2.x;
	         this.m_impulse.y += df2.y;
	         PX = df2.x * this.m_perp.x;
	         PY = df2.x * this.m_perp.y;
	         L1 = df2.x * this.m_s1 + df2.y;
	         L2 = df2.x * this.m_s2 + df2.y;
	         v1.x -= this.m_invMassA * PX;
	         v1.y -= this.m_invMassA * PY;
	         w1 -= this.m_invIA * L1;
	         v2.x += this.m_invMassB * PX;
	         v2.y += this.m_invMassB * PY;
	         w2 += this.m_invIB * L2;
	      }
	      bA.m_linearVelocity.SetV(v1);
	      bA.m_angularVelocity = w1;
	      bB.m_linearVelocity.SetV(v2);
	      bB.m_angularVelocity = w2;
	   }
	   b2PrismaticJoint.prototype.SolvePositionConstraints = function (baumgarte) {
	      if (baumgarte === undefined) baumgarte = 0;
	      var limitC = 0;
	      var oldLimitImpulse = 0;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var c1 = bA.m_sweep.c;
	      var a1 = bA.m_sweep.a;
	      var c2 = bB.m_sweep.c;
	      var a2 = bB.m_sweep.a;
	      var tMat;
	      var tX = 0;
	      var m1 = 0;
	      var m2 = 0;
	      var i1 = 0;
	      var i2 = 0;
	      var linearError = 0.0;
	      var angularError = 0.0;
	      var active = false;
	      var C2 = 0.0;
	      var R1 = b2Mat22.FromAngle(a1);
	      var R2 = b2Mat22.FromAngle(a2);
	      tMat = R1;
	      var r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
	      var r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
	      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	      r1X = tX;
	      tMat = R2;
	      var r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
	      var r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
	      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	      r2X = tX;
	      var dX = c2.x + r2X - c1.x - r1X;
	      var dY = c2.y + r2Y - c1.y - r1Y;
	      if (this.m_enableLimit) {
	         this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
	         this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
	         this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
	         var translation = this.m_axis.x * dX + this.m_axis.y * dY;
	         if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
	            C2 = b2Math.Clamp(translation, (-b2Settings.b2_maxLinearCorrection), b2Settings.b2_maxLinearCorrection);
	            linearError = b2Math.Abs(translation);
	            active = true;
	         }
	         else if (translation <= this.m_lowerTranslation) {
	            C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
	            linearError = this.m_lowerTranslation - translation;
	            active = true;
	         }
	         else if (translation >= this.m_upperTranslation) {
	            C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0.0, b2Settings.b2_maxLinearCorrection);
	            linearError = translation - this.m_upperTranslation;
	            active = true;
	         }
	      }
	      this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
	      this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
	      this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
	      var impulse = new b2Vec3();
	      var C1X = this.m_perp.x * dX + this.m_perp.y * dY;
	      var C1Y = a2 - a1 - this.m_refAngle;
	      linearError = b2Math.Max(linearError, b2Math.Abs(C1X));
	      angularError = b2Math.Abs(C1Y);
	      if (active) {
	         m1 = this.m_invMassA;
	         m2 = this.m_invMassB;
	         i1 = this.m_invIA;
	         i2 = this.m_invIB;
	         this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
	         this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
	         this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
	         this.m_K.col2.x = this.m_K.col1.y;
	         this.m_K.col2.y = i1 + i2;
	         this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
	         this.m_K.col3.x = this.m_K.col1.z;
	         this.m_K.col3.y = this.m_K.col2.z;
	         this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
	         this.m_K.Solve33(impulse, (-C1X), (-C1Y), (-C2));
	      }
	      else {
	         m1 = this.m_invMassA;
	         m2 = this.m_invMassB;
	         i1 = this.m_invIA;
	         i2 = this.m_invIB;
	         var k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
	         var k12 = i1 * this.m_s1 + i2 * this.m_s2;
	         var k22 = i1 + i2;
	         this.m_K.col1.Set(k11, k12, 0.0);
	         this.m_K.col2.Set(k12, k22, 0.0);
	         var impulse1 = this.m_K.Solve22(new b2Vec2(), (-C1X), (-C1Y));
	         impulse.x = impulse1.x;
	         impulse.y = impulse1.y;
	         impulse.z = 0.0;
	      }
	      var PX = impulse.x * this.m_perp.x + impulse.z * this.m_axis.x;
	      var PY = impulse.x * this.m_perp.y + impulse.z * this.m_axis.y;
	      var L1 = impulse.x * this.m_s1 + impulse.y + impulse.z * this.m_a1;
	      var L2 = impulse.x * this.m_s2 + impulse.y + impulse.z * this.m_a2;
	      c1.x -= this.m_invMassA * PX;
	      c1.y -= this.m_invMassA * PY;
	      a1 -= this.m_invIA * L1;
	      c2.x += this.m_invMassB * PX;
	      c2.y += this.m_invMassB * PY;
	      a2 += this.m_invIB * L2;
	      bA.m_sweep.a = a1;
	      bB.m_sweep.a = a2;
	      bA.SynchronizeTransform();
	      bB.SynchronizeTransform();
	      return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
	   }
	   Box2D.inherit(b2PrismaticJointDef, Box2D.Dynamics.Joints.b2JointDef);
	   b2PrismaticJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	   b2PrismaticJointDef.b2PrismaticJointDef = function () {
	      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
	      this.localAnchorA = new b2Vec2();
	      this.localAnchorB = new b2Vec2();
	      this.localAxisA = new b2Vec2();
	   };
	   b2PrismaticJointDef.prototype.b2PrismaticJointDef = function () {
	      this.__super.b2JointDef.call(this);
	      this.type = b2Joint.e_prismaticJoint;
	      this.localAxisA.Set(1.0, 0.0);
	      this.referenceAngle = 0.0;
	      this.enableLimit = false;
	      this.lowerTranslation = 0.0;
	      this.upperTranslation = 0.0;
	      this.enableMotor = false;
	      this.maxMotorForce = 0.0;
	      this.motorSpeed = 0.0;
	   }
	   b2PrismaticJointDef.prototype.Initialize = function (bA, bB, anchor, axis) {
	      this.bodyA = bA;
	      this.bodyB = bB;
	      this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
	      this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
	      this.localAxisA = this.bodyA.GetLocalVector(axis);
	      this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
	   }
	   Box2D.inherit(b2PulleyJoint, Box2D.Dynamics.Joints.b2Joint);
	   b2PulleyJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	   b2PulleyJoint.b2PulleyJoint = function () {
	      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
	      this.m_groundAnchor1 = new b2Vec2();
	      this.m_groundAnchor2 = new b2Vec2();
	      this.m_localAnchor1 = new b2Vec2();
	      this.m_localAnchor2 = new b2Vec2();
	      this.m_u1 = new b2Vec2();
	      this.m_u2 = new b2Vec2();
	   };
	   b2PulleyJoint.prototype.GetAnchorA = function () {
	      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
	   }
	   b2PulleyJoint.prototype.GetAnchorB = function () {
	      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
	   }
	   b2PulleyJoint.prototype.GetReactionForce = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return new b2Vec2(inv_dt * this.m_impulse * this.m_u2.x, inv_dt * this.m_impulse * this.m_u2.y);
	   }
	   b2PulleyJoint.prototype.GetReactionTorque = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return 0.0;
	   }
	   b2PulleyJoint.prototype.GetGroundAnchorA = function () {
	      var a = this.m_ground.m_xf.position.Copy();
	      a.Add(this.m_groundAnchor1);
	      return a;
	   }
	   b2PulleyJoint.prototype.GetGroundAnchorB = function () {
	      var a = this.m_ground.m_xf.position.Copy();
	      a.Add(this.m_groundAnchor2);
	      return a;
	   }
	   b2PulleyJoint.prototype.GetLength1 = function () {
	      var p = this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
	      var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
	      var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
	      var dX = p.x - sX;
	      var dY = p.y - sY;
	      return Math.sqrt(dX * dX + dY * dY);
	   }
	   b2PulleyJoint.prototype.GetLength2 = function () {
	      var p = this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
	      var sX = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
	      var sY = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
	      var dX = p.x - sX;
	      var dY = p.y - sY;
	      return Math.sqrt(dX * dX + dY * dY);
	   }
	   b2PulleyJoint.prototype.GetRatio = function () {
	      return this.m_ratio;
	   }
	   b2PulleyJoint.prototype.b2PulleyJoint = function (def) {
	      this.__super.b2Joint.call(this, def);
	      var tMat;
	      var tX = 0;
	      var tY = 0;
	      this.m_ground = this.m_bodyA.m_world.m_groundBody;
	      this.m_groundAnchor1.x = def.groundAnchorA.x - this.m_ground.m_xf.position.x;
	      this.m_groundAnchor1.y = def.groundAnchorA.y - this.m_ground.m_xf.position.y;
	      this.m_groundAnchor2.x = def.groundAnchorB.x - this.m_ground.m_xf.position.x;
	      this.m_groundAnchor2.y = def.groundAnchorB.y - this.m_ground.m_xf.position.y;
	      this.m_localAnchor1.SetV(def.localAnchorA);
	      this.m_localAnchor2.SetV(def.localAnchorB);
	      this.m_ratio = def.ratio;
	      this.m_constant = def.lengthA + this.m_ratio * def.lengthB;
	      this.m_maxLength1 = b2Math.Min(def.maxLengthA, this.m_constant - this.m_ratio * b2PulleyJoint.b2_minPulleyLength);
	      this.m_maxLength2 = b2Math.Min(def.maxLengthB, (this.m_constant - b2PulleyJoint.b2_minPulleyLength) / this.m_ratio);
	      this.m_impulse = 0.0;
	      this.m_limitImpulse1 = 0.0;
	      this.m_limitImpulse2 = 0.0;
	   }
	   b2PulleyJoint.prototype.InitVelocityConstraints = function (step) {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var tMat;
	      tMat = bA.m_xf.R;
	      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	      r1X = tX;
	      tMat = bB.m_xf.R;
	      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	      r2X = tX;
	      var p1X = bA.m_sweep.c.x + r1X;
	      var p1Y = bA.m_sweep.c.y + r1Y;
	      var p2X = bB.m_sweep.c.x + r2X;
	      var p2Y = bB.m_sweep.c.y + r2Y;
	      var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
	      var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
	      var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
	      var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
	      this.m_u1.Set(p1X - s1X, p1Y - s1Y);
	      this.m_u2.Set(p2X - s2X, p2Y - s2Y);
	      var length1 = this.m_u1.Length();
	      var length2 = this.m_u2.Length();
	      if (length1 > b2Settings.b2_linearSlop) {
	         this.m_u1.Multiply(1.0 / length1);
	      }
	      else {
	         this.m_u1.SetZero();
	      }
	      if (length2 > b2Settings.b2_linearSlop) {
	         this.m_u2.Multiply(1.0 / length2);
	      }
	      else {
	         this.m_u2.SetZero();
	      }
	      var C = this.m_constant - length1 - this.m_ratio * length2;
	      if (C > 0.0) {
	         this.m_state = b2Joint.e_inactiveLimit;
	         this.m_impulse = 0.0;
	      }
	      else {
	         this.m_state = b2Joint.e_atUpperLimit;
	      }
	      if (length1 < this.m_maxLength1) {
	         this.m_limitState1 = b2Joint.e_inactiveLimit;
	         this.m_limitImpulse1 = 0.0;
	      }
	      else {
	         this.m_limitState1 = b2Joint.e_atUpperLimit;
	      }
	      if (length2 < this.m_maxLength2) {
	         this.m_limitState2 = b2Joint.e_inactiveLimit;
	         this.m_limitImpulse2 = 0.0;
	      }
	      else {
	         this.m_limitState2 = b2Joint.e_atUpperLimit;
	      }
	      var cr1u1 = r1X * this.m_u1.y - r1Y * this.m_u1.x;
	      var cr2u2 = r2X * this.m_u2.y - r2Y * this.m_u2.x;
	      this.m_limitMass1 = bA.m_invMass + bA.m_invI * cr1u1 * cr1u1;
	      this.m_limitMass2 = bB.m_invMass + bB.m_invI * cr2u2 * cr2u2;
	      this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
	      this.m_limitMass1 = 1.0 / this.m_limitMass1;
	      this.m_limitMass2 = 1.0 / this.m_limitMass2;
	      this.m_pulleyMass = 1.0 / this.m_pulleyMass;
	      if (step.warmStarting) {
	         this.m_impulse *= step.dtRatio;
	         this.m_limitImpulse1 *= step.dtRatio;
	         this.m_limitImpulse2 *= step.dtRatio;
	         var P1X = ((-this.m_impulse) - this.m_limitImpulse1) * this.m_u1.x;
	         var P1Y = ((-this.m_impulse) - this.m_limitImpulse1) * this.m_u1.y;
	         var P2X = ((-this.m_ratio * this.m_impulse) - this.m_limitImpulse2) * this.m_u2.x;
	         var P2Y = ((-this.m_ratio * this.m_impulse) - this.m_limitImpulse2) * this.m_u2.y;
	         bA.m_linearVelocity.x += bA.m_invMass * P1X;
	         bA.m_linearVelocity.y += bA.m_invMass * P1Y;
	         bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
	         bB.m_linearVelocity.x += bB.m_invMass * P2X;
	         bB.m_linearVelocity.y += bB.m_invMass * P2Y;
	         bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
	      }
	      else {
	         this.m_impulse = 0.0;
	         this.m_limitImpulse1 = 0.0;
	         this.m_limitImpulse2 = 0.0;
	      }
	   }
	   b2PulleyJoint.prototype.SolveVelocityConstraints = function (step) {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var tMat;
	      tMat = bA.m_xf.R;
	      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	      var tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	      r1X = tX;
	      tMat = bB.m_xf.R;
	      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	      r2X = tX;
	      var v1X = 0;
	      var v1Y = 0;
	      var v2X = 0;
	      var v2Y = 0;
	      var P1X = 0;
	      var P1Y = 0;
	      var P2X = 0;
	      var P2Y = 0;
	      var Cdot = 0;
	      var impulse = 0;
	      var oldImpulse = 0;
	      if (this.m_state == b2Joint.e_atUpperLimit) {
	         v1X = bA.m_linearVelocity.x + ((-bA.m_angularVelocity * r1Y));
	         v1Y = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
	         v2X = bB.m_linearVelocity.x + ((-bB.m_angularVelocity * r2Y));
	         v2Y = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
	         Cdot = (-(this.m_u1.x * v1X + this.m_u1.y * v1Y)) - this.m_ratio * (this.m_u2.x * v2X + this.m_u2.y * v2Y);
	         impulse = this.m_pulleyMass * ((-Cdot));
	         oldImpulse = this.m_impulse;
	         this.m_impulse = b2Math.Max(0.0, this.m_impulse + impulse);
	         impulse = this.m_impulse - oldImpulse;
	         P1X = (-impulse * this.m_u1.x);
	         P1Y = (-impulse * this.m_u1.y);
	         P2X = (-this.m_ratio * impulse * this.m_u2.x);
	         P2Y = (-this.m_ratio * impulse * this.m_u2.y);
	         bA.m_linearVelocity.x += bA.m_invMass * P1X;
	         bA.m_linearVelocity.y += bA.m_invMass * P1Y;
	         bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
	         bB.m_linearVelocity.x += bB.m_invMass * P2X;
	         bB.m_linearVelocity.y += bB.m_invMass * P2Y;
	         bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
	      }
	      if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
	         v1X = bA.m_linearVelocity.x + ((-bA.m_angularVelocity * r1Y));
	         v1Y = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
	         Cdot = (-(this.m_u1.x * v1X + this.m_u1.y * v1Y));
	         impulse = (-this.m_limitMass1 * Cdot);
	         oldImpulse = this.m_limitImpulse1;
	         this.m_limitImpulse1 = b2Math.Max(0.0, this.m_limitImpulse1 + impulse);
	         impulse = this.m_limitImpulse1 - oldImpulse;
	         P1X = (-impulse * this.m_u1.x);
	         P1Y = (-impulse * this.m_u1.y);
	         bA.m_linearVelocity.x += bA.m_invMass * P1X;
	         bA.m_linearVelocity.y += bA.m_invMass * P1Y;
	         bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
	      }
	      if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
	         v2X = bB.m_linearVelocity.x + ((-bB.m_angularVelocity * r2Y));
	         v2Y = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
	         Cdot = (-(this.m_u2.x * v2X + this.m_u2.y * v2Y));
	         impulse = (-this.m_limitMass2 * Cdot);
	         oldImpulse = this.m_limitImpulse2;
	         this.m_limitImpulse2 = b2Math.Max(0.0, this.m_limitImpulse2 + impulse);
	         impulse = this.m_limitImpulse2 - oldImpulse;
	         P2X = (-impulse * this.m_u2.x);
	         P2Y = (-impulse * this.m_u2.y);
	         bB.m_linearVelocity.x += bB.m_invMass * P2X;
	         bB.m_linearVelocity.y += bB.m_invMass * P2Y;
	         bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
	      }
	   }
	   b2PulleyJoint.prototype.SolvePositionConstraints = function (baumgarte) {
	      if (baumgarte === undefined) baumgarte = 0;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var tMat;
	      var s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
	      var s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
	      var s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
	      var s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
	      var r1X = 0;
	      var r1Y = 0;
	      var r2X = 0;
	      var r2Y = 0;
	      var p1X = 0;
	      var p1Y = 0;
	      var p2X = 0;
	      var p2Y = 0;
	      var length1 = 0;
	      var length2 = 0;
	      var C = 0;
	      var impulse = 0;
	      var oldImpulse = 0;
	      var oldLimitPositionImpulse = 0;
	      var tX = 0;
	      var linearError = 0.0;
	      if (this.m_state == b2Joint.e_atUpperLimit) {
	         tMat = bA.m_xf.R;
	         r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	         r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	         r1X = tX;
	         tMat = bB.m_xf.R;
	         r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	         r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	         r2X = tX;
	         p1X = bA.m_sweep.c.x + r1X;
	         p1Y = bA.m_sweep.c.y + r1Y;
	         p2X = bB.m_sweep.c.x + r2X;
	         p2Y = bB.m_sweep.c.y + r2Y;
	         this.m_u1.Set(p1X - s1X, p1Y - s1Y);
	         this.m_u2.Set(p2X - s2X, p2Y - s2Y);
	         length1 = this.m_u1.Length();
	         length2 = this.m_u2.Length();
	         if (length1 > b2Settings.b2_linearSlop) {
	            this.m_u1.Multiply(1.0 / length1);
	         }
	         else {
	            this.m_u1.SetZero();
	         }
	         if (length2 > b2Settings.b2_linearSlop) {
	            this.m_u2.Multiply(1.0 / length2);
	         }
	         else {
	            this.m_u2.SetZero();
	         }
	         C = this.m_constant - length1 - this.m_ratio * length2;
	         linearError = b2Math.Max(linearError, (-C));
	         C = b2Math.Clamp(C + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
	         impulse = (-this.m_pulleyMass * C);
	         p1X = (-impulse * this.m_u1.x);
	         p1Y = (-impulse * this.m_u1.y);
	         p2X = (-this.m_ratio * impulse * this.m_u2.x);
	         p2Y = (-this.m_ratio * impulse * this.m_u2.y);
	         bA.m_sweep.c.x += bA.m_invMass * p1X;
	         bA.m_sweep.c.y += bA.m_invMass * p1Y;
	         bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
	         bB.m_sweep.c.x += bB.m_invMass * p2X;
	         bB.m_sweep.c.y += bB.m_invMass * p2Y;
	         bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
	         bA.SynchronizeTransform();
	         bB.SynchronizeTransform();
	      }
	      if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
	         tMat = bA.m_xf.R;
	         r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	         r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	         r1X = tX;
	         p1X = bA.m_sweep.c.x + r1X;
	         p1Y = bA.m_sweep.c.y + r1Y;
	         this.m_u1.Set(p1X - s1X, p1Y - s1Y);
	         length1 = this.m_u1.Length();
	         if (length1 > b2Settings.b2_linearSlop) {
	            this.m_u1.x *= 1.0 / length1;
	            this.m_u1.y *= 1.0 / length1;
	         }
	         else {
	            this.m_u1.SetZero();
	         }
	         C = this.m_maxLength1 - length1;
	         linearError = b2Math.Max(linearError, (-C));
	         C = b2Math.Clamp(C + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
	         impulse = (-this.m_limitMass1 * C);
	         p1X = (-impulse * this.m_u1.x);
	         p1Y = (-impulse * this.m_u1.y);
	         bA.m_sweep.c.x += bA.m_invMass * p1X;
	         bA.m_sweep.c.y += bA.m_invMass * p1Y;
	         bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
	         bA.SynchronizeTransform();
	      }
	      if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
	         tMat = bB.m_xf.R;
	         r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	         r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	         r2X = tX;
	         p2X = bB.m_sweep.c.x + r2X;
	         p2Y = bB.m_sweep.c.y + r2Y;
	         this.m_u2.Set(p2X - s2X, p2Y - s2Y);
	         length2 = this.m_u2.Length();
	         if (length2 > b2Settings.b2_linearSlop) {
	            this.m_u2.x *= 1.0 / length2;
	            this.m_u2.y *= 1.0 / length2;
	         }
	         else {
	            this.m_u2.SetZero();
	         }
	         C = this.m_maxLength2 - length2;
	         linearError = b2Math.Max(linearError, (-C));
	         C = b2Math.Clamp(C + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
	         impulse = (-this.m_limitMass2 * C);
	         p2X = (-impulse * this.m_u2.x);
	         p2Y = (-impulse * this.m_u2.y);
	         bB.m_sweep.c.x += bB.m_invMass * p2X;
	         bB.m_sweep.c.y += bB.m_invMass * p2Y;
	         bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
	         bB.SynchronizeTransform();
	      }
	      return linearError < b2Settings.b2_linearSlop;
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2.0;
	   });
	   Box2D.inherit(b2PulleyJointDef, Box2D.Dynamics.Joints.b2JointDef);
	   b2PulleyJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	   b2PulleyJointDef.b2PulleyJointDef = function () {
	      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
	      this.groundAnchorA = new b2Vec2();
	      this.groundAnchorB = new b2Vec2();
	      this.localAnchorA = new b2Vec2();
	      this.localAnchorB = new b2Vec2();
	   };
	   b2PulleyJointDef.prototype.b2PulleyJointDef = function () {
	      this.__super.b2JointDef.call(this);
	      this.type = b2Joint.e_pulleyJoint;
	      this.groundAnchorA.Set((-1.0), 1.0);
	      this.groundAnchorB.Set(1.0, 1.0);
	      this.localAnchorA.Set((-1.0), 0.0);
	      this.localAnchorB.Set(1.0, 0.0);
	      this.lengthA = 0.0;
	      this.maxLengthA = 0.0;
	      this.lengthB = 0.0;
	      this.maxLengthB = 0.0;
	      this.ratio = 1.0;
	      this.collideConnected = true;
	   }
	   b2PulleyJointDef.prototype.Initialize = function (bA, bB, gaA, gaB, anchorA, anchorB, r) {
	      if (r === undefined) r = 0;
	      this.bodyA = bA;
	      this.bodyB = bB;
	      this.groundAnchorA.SetV(gaA);
	      this.groundAnchorB.SetV(gaB);
	      this.localAnchorA = this.bodyA.GetLocalPoint(anchorA);
	      this.localAnchorB = this.bodyB.GetLocalPoint(anchorB);
	      var d1X = anchorA.x - gaA.x;
	      var d1Y = anchorA.y - gaA.y;
	      this.lengthA = Math.sqrt(d1X * d1X + d1Y * d1Y);
	      var d2X = anchorB.x - gaB.x;
	      var d2Y = anchorB.y - gaB.y;
	      this.lengthB = Math.sqrt(d2X * d2X + d2Y * d2Y);
	      this.ratio = r;
	      var C = this.lengthA + this.ratio * this.lengthB;
	      this.maxLengthA = C - this.ratio * b2PulleyJoint.b2_minPulleyLength;
	      this.maxLengthB = (C - b2PulleyJoint.b2_minPulleyLength) / this.ratio;
	   }
	   Box2D.inherit(b2RevoluteJoint, Box2D.Dynamics.Joints.b2Joint);
	   b2RevoluteJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	   b2RevoluteJoint.b2RevoluteJoint = function () {
	      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
	      this.K = new b2Mat22();
	      this.K1 = new b2Mat22();
	      this.K2 = new b2Mat22();
	      this.K3 = new b2Mat22();
	      this.impulse3 = new b2Vec3();
	      this.impulse2 = new b2Vec2();
	      this.reduced = new b2Vec2();
	      this.m_localAnchor1 = new b2Vec2();
	      this.m_localAnchor2 = new b2Vec2();
	      this.m_impulse = new b2Vec3();
	      this.m_mass = new b2Mat33();
	   };
	   b2RevoluteJoint.prototype.GetAnchorA = function () {
	      return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
	   }
	   b2RevoluteJoint.prototype.GetAnchorB = function () {
	      return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
	   }
	   b2RevoluteJoint.prototype.GetReactionForce = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y);
	   }
	   b2RevoluteJoint.prototype.GetReactionTorque = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return inv_dt * this.m_impulse.z;
	   }
	   b2RevoluteJoint.prototype.GetJointAngle = function () {
	      return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle;
	   }
	   b2RevoluteJoint.prototype.GetJointSpeed = function () {
	      return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity;
	   }
	   b2RevoluteJoint.prototype.IsLimitEnabled = function () {
	      return this.m_enableLimit;
	   }
	   b2RevoluteJoint.prototype.EnableLimit = function (flag) {
	      this.m_enableLimit = flag;
	   }
	   b2RevoluteJoint.prototype.GetLowerLimit = function () {
	      return this.m_lowerAngle;
	   }
	   b2RevoluteJoint.prototype.GetUpperLimit = function () {
	      return this.m_upperAngle;
	   }
	   b2RevoluteJoint.prototype.SetLimits = function (lower, upper) {
	      if (lower === undefined) lower = 0;
	      if (upper === undefined) upper = 0;
	      this.m_lowerAngle = lower;
	      this.m_upperAngle = upper;
	   }
	   b2RevoluteJoint.prototype.IsMotorEnabled = function () {
	      this.m_bodyA.SetAwake(true);
	      this.m_bodyB.SetAwake(true);
	      return this.m_enableMotor;
	   }
	   b2RevoluteJoint.prototype.EnableMotor = function (flag) {
	      this.m_enableMotor = flag;
	   }
	   b2RevoluteJoint.prototype.SetMotorSpeed = function (speed) {
	      if (speed === undefined) speed = 0;
	      this.m_bodyA.SetAwake(true);
	      this.m_bodyB.SetAwake(true);
	      this.m_motorSpeed = speed;
	   }
	   b2RevoluteJoint.prototype.GetMotorSpeed = function () {
	      return this.m_motorSpeed;
	   }
	   b2RevoluteJoint.prototype.SetMaxMotorTorque = function (torque) {
	      if (torque === undefined) torque = 0;
	      this.m_maxMotorTorque = torque;
	   }
	   b2RevoluteJoint.prototype.GetMotorTorque = function () {
	      return this.m_maxMotorTorque;
	   }
	   b2RevoluteJoint.prototype.b2RevoluteJoint = function (def) {
	      this.__super.b2Joint.call(this, def);
	      this.m_localAnchor1.SetV(def.localAnchorA);
	      this.m_localAnchor2.SetV(def.localAnchorB);
	      this.m_referenceAngle = def.referenceAngle;
	      this.m_impulse.SetZero();
	      this.m_motorImpulse = 0.0;
	      this.m_lowerAngle = def.lowerAngle;
	      this.m_upperAngle = def.upperAngle;
	      this.m_maxMotorTorque = def.maxMotorTorque;
	      this.m_motorSpeed = def.motorSpeed;
	      this.m_enableLimit = def.enableLimit;
	      this.m_enableMotor = def.enableMotor;
	      this.m_limitState = b2Joint.e_inactiveLimit;
	   }
	   b2RevoluteJoint.prototype.InitVelocityConstraints = function (step) {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var tMat;
	      var tX = 0;
	      if (this.m_enableMotor || this.m_enableLimit) {}
	      tMat = bA.m_xf.R;
	      var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	      var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	      r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	      r1X = tX;
	      tMat = bB.m_xf.R;
	      var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	      var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	      r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	      r2X = tX;
	      var m1 = bA.m_invMass;
	      var m2 = bB.m_invMass;
	      var i1 = bA.m_invI;
	      var i2 = bB.m_invI;
	      this.m_mass.col1.x = m1 + m2 + r1Y * r1Y * i1 + r2Y * r2Y * i2;
	      this.m_mass.col2.x = (-r1Y * r1X * i1) - r2Y * r2X * i2;
	      this.m_mass.col3.x = (-r1Y * i1) - r2Y * i2;
	      this.m_mass.col1.y = this.m_mass.col2.x;
	      this.m_mass.col2.y = m1 + m2 + r1X * r1X * i1 + r2X * r2X * i2;
	      this.m_mass.col3.y = r1X * i1 + r2X * i2;
	      this.m_mass.col1.z = this.m_mass.col3.x;
	      this.m_mass.col2.z = this.m_mass.col3.y;
	      this.m_mass.col3.z = i1 + i2;
	      this.m_motorMass = 1.0 / (i1 + i2);
	      if (this.m_enableMotor == false) {
	         this.m_motorImpulse = 0.0;
	      }
	      if (this.m_enableLimit) {
	         var jointAngle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
	         if (b2Math.Abs(this.m_upperAngle - this.m_lowerAngle) < 2.0 * b2Settings.b2_angularSlop) {
	            this.m_limitState = b2Joint.e_equalLimits;
	         }
	         else if (jointAngle <= this.m_lowerAngle) {
	            if (this.m_limitState != b2Joint.e_atLowerLimit) {
	               this.m_impulse.z = 0.0;
	            }
	            this.m_limitState = b2Joint.e_atLowerLimit;
	         }
	         else if (jointAngle >= this.m_upperAngle) {
	            if (this.m_limitState != b2Joint.e_atUpperLimit) {
	               this.m_impulse.z = 0.0;
	            }
	            this.m_limitState = b2Joint.e_atUpperLimit;
	         }
	         else {
	            this.m_limitState = b2Joint.e_inactiveLimit;
	            this.m_impulse.z = 0.0;
	         }
	      }
	      else {
	         this.m_limitState = b2Joint.e_inactiveLimit;
	      }
	      if (step.warmStarting) {
	         this.m_impulse.x *= step.dtRatio;
	         this.m_impulse.y *= step.dtRatio;
	         this.m_motorImpulse *= step.dtRatio;
	         var PX = this.m_impulse.x;
	         var PY = this.m_impulse.y;
	         bA.m_linearVelocity.x -= m1 * PX;
	         bA.m_linearVelocity.y -= m1 * PY;
	         bA.m_angularVelocity -= i1 * ((r1X * PY - r1Y * PX) + this.m_motorImpulse + this.m_impulse.z);
	         bB.m_linearVelocity.x += m2 * PX;
	         bB.m_linearVelocity.y += m2 * PY;
	         bB.m_angularVelocity += i2 * ((r2X * PY - r2Y * PX) + this.m_motorImpulse + this.m_impulse.z);
	      }
	      else {
	         this.m_impulse.SetZero();
	         this.m_motorImpulse = 0.0;
	      }
	   }
	   b2RevoluteJoint.prototype.SolveVelocityConstraints = function (step) {
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var tMat;
	      var tX = 0;
	      var newImpulse = 0;
	      var r1X = 0;
	      var r1Y = 0;
	      var r2X = 0;
	      var r2Y = 0;
	      var v1 = bA.m_linearVelocity;
	      var w1 = bA.m_angularVelocity;
	      var v2 = bB.m_linearVelocity;
	      var w2 = bB.m_angularVelocity;
	      var m1 = bA.m_invMass;
	      var m2 = bB.m_invMass;
	      var i1 = bA.m_invI;
	      var i2 = bB.m_invI;
	      if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
	         var Cdot = w2 - w1 - this.m_motorSpeed;
	         var impulse = this.m_motorMass * ((-Cdot));
	         var oldImpulse = this.m_motorImpulse;
	         var maxImpulse = step.dt * this.m_maxMotorTorque;
	         this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
	         impulse = this.m_motorImpulse - oldImpulse;
	         w1 -= i1 * impulse;
	         w2 += i2 * impulse;
	      }
	      if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
	         tMat = bA.m_xf.R;
	         r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	         r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	         r1X = tX;
	         tMat = bB.m_xf.R;
	         r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	         r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	         r2X = tX;
	         var Cdot1X = v2.x + ((-w2 * r2Y)) - v1.x - ((-w1 * r1Y));
	         var Cdot1Y = v2.y + (w2 * r2X) - v1.y - (w1 * r1X);
	         var Cdot2 = w2 - w1;
	         this.m_mass.Solve33(this.impulse3, (-Cdot1X), (-Cdot1Y), (-Cdot2));
	         if (this.m_limitState == b2Joint.e_equalLimits) {
	            this.m_impulse.Add(this.impulse3);
	         }
	         else if (this.m_limitState == b2Joint.e_atLowerLimit) {
	            newImpulse = this.m_impulse.z + this.impulse3.z;
	            if (newImpulse < 0.0) {
	               this.m_mass.Solve22(this.reduced, (-Cdot1X), (-Cdot1Y));
	               this.impulse3.x = this.reduced.x;
	               this.impulse3.y = this.reduced.y;
	               this.impulse3.z = (-this.m_impulse.z);
	               this.m_impulse.x += this.reduced.x;
	               this.m_impulse.y += this.reduced.y;
	               this.m_impulse.z = 0.0;
	            }
	         }
	         else if (this.m_limitState == b2Joint.e_atUpperLimit) {
	            newImpulse = this.m_impulse.z + this.impulse3.z;
	            if (newImpulse > 0.0) {
	               this.m_mass.Solve22(this.reduced, (-Cdot1X), (-Cdot1Y));
	               this.impulse3.x = this.reduced.x;
	               this.impulse3.y = this.reduced.y;
	               this.impulse3.z = (-this.m_impulse.z);
	               this.m_impulse.x += this.reduced.x;
	               this.m_impulse.y += this.reduced.y;
	               this.m_impulse.z = 0.0;
	            }
	         }
	         v1.x -= m1 * this.impulse3.x;
	         v1.y -= m1 * this.impulse3.y;
	         w1 -= i1 * (r1X * this.impulse3.y - r1Y * this.impulse3.x + this.impulse3.z);
	         v2.x += m2 * this.impulse3.x;
	         v2.y += m2 * this.impulse3.y;
	         w2 += i2 * (r2X * this.impulse3.y - r2Y * this.impulse3.x + this.impulse3.z);
	      }
	      else {
	         tMat = bA.m_xf.R;
	         r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	         r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	         r1X = tX;
	         tMat = bB.m_xf.R;
	         r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	         r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	         r2X = tX;
	         var CdotX = v2.x + ((-w2 * r2Y)) - v1.x - ((-w1 * r1Y));
	         var CdotY = v2.y + (w2 * r2X) - v1.y - (w1 * r1X);
	         this.m_mass.Solve22(this.impulse2, (-CdotX), (-CdotY));
	         this.m_impulse.x += this.impulse2.x;
	         this.m_impulse.y += this.impulse2.y;
	         v1.x -= m1 * this.impulse2.x;
	         v1.y -= m1 * this.impulse2.y;
	         w1 -= i1 * (r1X * this.impulse2.y - r1Y * this.impulse2.x);
	         v2.x += m2 * this.impulse2.x;
	         v2.y += m2 * this.impulse2.y;
	         w2 += i2 * (r2X * this.impulse2.y - r2Y * this.impulse2.x);
	      }
	      bA.m_linearVelocity.SetV(v1);
	      bA.m_angularVelocity = w1;
	      bB.m_linearVelocity.SetV(v2);
	      bB.m_angularVelocity = w2;
	   }
	   b2RevoluteJoint.prototype.SolvePositionConstraints = function (baumgarte) {
	      if (baumgarte === undefined) baumgarte = 0;
	      var oldLimitImpulse = 0;
	      var C = 0;
	      var tMat;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var angularError = 0.0;
	      var positionError = 0.0;
	      var tX = 0;
	      var impulseX = 0;
	      var impulseY = 0;
	      if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
	         var angle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
	         var limitImpulse = 0.0;
	         if (this.m_limitState == b2Joint.e_equalLimits) {
	            C = b2Math.Clamp(angle - this.m_lowerAngle, (-b2Settings.b2_maxAngularCorrection), b2Settings.b2_maxAngularCorrection);
	            limitImpulse = (-this.m_motorMass * C);
	            angularError = b2Math.Abs(C);
	         }
	         else if (this.m_limitState == b2Joint.e_atLowerLimit) {
	            C = angle - this.m_lowerAngle;
	            angularError = (-C);
	            C = b2Math.Clamp(C + b2Settings.b2_angularSlop, (-b2Settings.b2_maxAngularCorrection), 0.0);
	            limitImpulse = (-this.m_motorMass * C);
	         }
	         else if (this.m_limitState == b2Joint.e_atUpperLimit) {
	            C = angle - this.m_upperAngle;
	            angularError = C;
	            C = b2Math.Clamp(C - b2Settings.b2_angularSlop, 0.0, b2Settings.b2_maxAngularCorrection);
	            limitImpulse = (-this.m_motorMass * C);
	         }
	         bA.m_sweep.a -= bA.m_invI * limitImpulse;
	         bB.m_sweep.a += bB.m_invI * limitImpulse;
	         bA.SynchronizeTransform();
	         bB.SynchronizeTransform();
	      } {
	         tMat = bA.m_xf.R;
	         var r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
	         var r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
	         tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
	         r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
	         r1X = tX;
	         tMat = bB.m_xf.R;
	         var r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
	         var r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
	         tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
	         r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
	         r2X = tX;
	         var CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
	         var CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
	         var CLengthSquared = CX * CX + CY * CY;
	         var CLength = Math.sqrt(CLengthSquared);
	         positionError = CLength;
	         var invMass1 = bA.m_invMass;
	         var invMass2 = bB.m_invMass;
	         var invI1 = bA.m_invI;
	         var invI2 = bB.m_invI;
	         var k_allowedStretch = 10.0 * b2Settings.b2_linearSlop;
	         if (CLengthSquared > k_allowedStretch * k_allowedStretch) {
	            var uX = CX / CLength;
	            var uY = CY / CLength;
	            var k = invMass1 + invMass2;
	            var m = 1.0 / k;
	            impulseX = m * ((-CX));
	            impulseY = m * ((-CY));
	            var k_beta = 0.5;
	            bA.m_sweep.c.x -= k_beta * invMass1 * impulseX;
	            bA.m_sweep.c.y -= k_beta * invMass1 * impulseY;
	            bB.m_sweep.c.x += k_beta * invMass2 * impulseX;
	            bB.m_sweep.c.y += k_beta * invMass2 * impulseY;
	            CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
	            CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
	         }
	         this.K1.col1.x = invMass1 + invMass2;
	         this.K1.col2.x = 0.0;
	         this.K1.col1.y = 0.0;
	         this.K1.col2.y = invMass1 + invMass2;
	         this.K2.col1.x = invI1 * r1Y * r1Y;
	         this.K2.col2.x = (-invI1 * r1X * r1Y);
	         this.K2.col1.y = (-invI1 * r1X * r1Y);
	         this.K2.col2.y = invI1 * r1X * r1X;
	         this.K3.col1.x = invI2 * r2Y * r2Y;
	         this.K3.col2.x = (-invI2 * r2X * r2Y);
	         this.K3.col1.y = (-invI2 * r2X * r2Y);
	         this.K3.col2.y = invI2 * r2X * r2X;
	         this.K.SetM(this.K1);
	         this.K.AddM(this.K2);
	         this.K.AddM(this.K3);
	         this.K.Solve(b2RevoluteJoint.tImpulse, (-CX), (-CY));
	         impulseX = b2RevoluteJoint.tImpulse.x;
	         impulseY = b2RevoluteJoint.tImpulse.y;
	         bA.m_sweep.c.x -= bA.m_invMass * impulseX;
	         bA.m_sweep.c.y -= bA.m_invMass * impulseY;
	         bA.m_sweep.a -= bA.m_invI * (r1X * impulseY - r1Y * impulseX);
	         bB.m_sweep.c.x += bB.m_invMass * impulseX;
	         bB.m_sweep.c.y += bB.m_invMass * impulseY;
	         bB.m_sweep.a += bB.m_invI * (r2X * impulseY - r2Y * impulseX);
	         bA.SynchronizeTransform();
	         bB.SynchronizeTransform();
	      }
	      return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
	   }
	   Box2D.postDefs.push(function () {
	      Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new b2Vec2();
	   });
	   Box2D.inherit(b2RevoluteJointDef, Box2D.Dynamics.Joints.b2JointDef);
	   b2RevoluteJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	   b2RevoluteJointDef.b2RevoluteJointDef = function () {
	      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
	      this.localAnchorA = new b2Vec2();
	      this.localAnchorB = new b2Vec2();
	   };
	   b2RevoluteJointDef.prototype.b2RevoluteJointDef = function () {
	      this.__super.b2JointDef.call(this);
	      this.type = b2Joint.e_revoluteJoint;
	      this.localAnchorA.Set(0.0, 0.0);
	      this.localAnchorB.Set(0.0, 0.0);
	      this.referenceAngle = 0.0;
	      this.lowerAngle = 0.0;
	      this.upperAngle = 0.0;
	      this.maxMotorTorque = 0.0;
	      this.motorSpeed = 0.0;
	      this.enableLimit = false;
	      this.enableMotor = false;
	   }
	   b2RevoluteJointDef.prototype.Initialize = function (bA, bB, anchor) {
	      this.bodyA = bA;
	      this.bodyB = bB;
	      this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
	      this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
	      this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
	   }
	   Box2D.inherit(b2WeldJoint, Box2D.Dynamics.Joints.b2Joint);
	   b2WeldJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
	   b2WeldJoint.b2WeldJoint = function () {
	      Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
	      this.m_localAnchorA = new b2Vec2();
	      this.m_localAnchorB = new b2Vec2();
	      this.m_impulse = new b2Vec3();
	      this.m_mass = new b2Mat33();
	   };
	   b2WeldJoint.prototype.GetAnchorA = function () {
	      return this.m_bodyA.GetWorldPoint(this.m_localAnchorA);
	   }
	   b2WeldJoint.prototype.GetAnchorB = function () {
	      return this.m_bodyB.GetWorldPoint(this.m_localAnchorB);
	   }
	   b2WeldJoint.prototype.GetReactionForce = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y);
	   }
	   b2WeldJoint.prototype.GetReactionTorque = function (inv_dt) {
	      if (inv_dt === undefined) inv_dt = 0;
	      return inv_dt * this.m_impulse.z;
	   }
	   b2WeldJoint.prototype.b2WeldJoint = function (def) {
	      this.__super.b2Joint.call(this, def);
	      this.m_localAnchorA.SetV(def.localAnchorA);
	      this.m_localAnchorB.SetV(def.localAnchorB);
	      this.m_referenceAngle = def.referenceAngle;
	      this.m_impulse.SetZero();
	      this.m_mass = new b2Mat33();
	   }
	   b2WeldJoint.prototype.InitVelocityConstraints = function (step) {
	      var tMat;
	      var tX = 0;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      tMat = bA.m_xf.R;
	      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
	      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
	      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
	      rAX = tX;
	      tMat = bB.m_xf.R;
	      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
	      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
	      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
	      rBX = tX;
	      var mA = bA.m_invMass;
	      var mB = bB.m_invMass;
	      var iA = bA.m_invI;
	      var iB = bB.m_invI;
	      this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
	      this.m_mass.col2.x = (-rAY * rAX * iA) - rBY * rBX * iB;
	      this.m_mass.col3.x = (-rAY * iA) - rBY * iB;
	      this.m_mass.col1.y = this.m_mass.col2.x;
	      this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
	      this.m_mass.col3.y = rAX * iA + rBX * iB;
	      this.m_mass.col1.z = this.m_mass.col3.x;
	      this.m_mass.col2.z = this.m_mass.col3.y;
	      this.m_mass.col3.z = iA + iB;
	      if (step.warmStarting) {
	         this.m_impulse.x *= step.dtRatio;
	         this.m_impulse.y *= step.dtRatio;
	         this.m_impulse.z *= step.dtRatio;
	         bA.m_linearVelocity.x -= mA * this.m_impulse.x;
	         bA.m_linearVelocity.y -= mA * this.m_impulse.y;
	         bA.m_angularVelocity -= iA * (rAX * this.m_impulse.y - rAY * this.m_impulse.x + this.m_impulse.z);
	         bB.m_linearVelocity.x += mB * this.m_impulse.x;
	         bB.m_linearVelocity.y += mB * this.m_impulse.y;
	         bB.m_angularVelocity += iB * (rBX * this.m_impulse.y - rBY * this.m_impulse.x + this.m_impulse.z);
	      }
	      else {
	         this.m_impulse.SetZero();
	      }
	   }
	   b2WeldJoint.prototype.SolveVelocityConstraints = function (step) {
	      var tMat;
	      var tX = 0;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      var vA = bA.m_linearVelocity;
	      var wA = bA.m_angularVelocity;
	      var vB = bB.m_linearVelocity;
	      var wB = bB.m_angularVelocity;
	      var mA = bA.m_invMass;
	      var mB = bB.m_invMass;
	      var iA = bA.m_invI;
	      var iB = bB.m_invI;
	      tMat = bA.m_xf.R;
	      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
	      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
	      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
	      rAX = tX;
	      tMat = bB.m_xf.R;
	      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
	      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
	      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
	      rBX = tX;
	      var Cdot1X = vB.x - wB * rBY - vA.x + wA * rAY;
	      var Cdot1Y = vB.y + wB * rBX - vA.y - wA * rAX;
	      var Cdot2 = wB - wA;
	      var impulse = new b2Vec3();
	      this.m_mass.Solve33(impulse, (-Cdot1X), (-Cdot1Y), (-Cdot2));
	      this.m_impulse.Add(impulse);
	      vA.x -= mA * impulse.x;
	      vA.y -= mA * impulse.y;
	      wA -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
	      vB.x += mB * impulse.x;
	      vB.y += mB * impulse.y;
	      wB += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
	      bA.m_angularVelocity = wA;
	      bB.m_angularVelocity = wB;
	   }
	   b2WeldJoint.prototype.SolvePositionConstraints = function (baumgarte) {
	      if (baumgarte === undefined) baumgarte = 0;
	      var tMat;
	      var tX = 0;
	      var bA = this.m_bodyA;
	      var bB = this.m_bodyB;
	      tMat = bA.m_xf.R;
	      var rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
	      var rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
	      rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
	      rAX = tX;
	      tMat = bB.m_xf.R;
	      var rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
	      var rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
	      tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
	      rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
	      rBX = tX;
	      var mA = bA.m_invMass;
	      var mB = bB.m_invMass;
	      var iA = bA.m_invI;
	      var iB = bB.m_invI;
	      var C1X = bB.m_sweep.c.x + rBX - bA.m_sweep.c.x - rAX;
	      var C1Y = bB.m_sweep.c.y + rBY - bA.m_sweep.c.y - rAY;
	      var C2 = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
	      var k_allowedStretch = 10.0 * b2Settings.b2_linearSlop;
	      var positionError = Math.sqrt(C1X * C1X + C1Y * C1Y);
	      var angularError = b2Math.Abs(C2);
	      if (positionError > k_allowedStretch) {
	         iA *= 1.0;
	         iB *= 1.0;
	      }
	      this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
	      this.m_mass.col2.x = (-rAY * rAX * iA) - rBY * rBX * iB;
	      this.m_mass.col3.x = (-rAY * iA) - rBY * iB;
	      this.m_mass.col1.y = this.m_mass.col2.x;
	      this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
	      this.m_mass.col3.y = rAX * iA + rBX * iB;
	      this.m_mass.col1.z = this.m_mass.col3.x;
	      this.m_mass.col2.z = this.m_mass.col3.y;
	      this.m_mass.col3.z = iA + iB;
	      var impulse = new b2Vec3();
	      this.m_mass.Solve33(impulse, (-C1X), (-C1Y), (-C2));
	      bA.m_sweep.c.x -= mA * impulse.x;
	      bA.m_sweep.c.y -= mA * impulse.y;
	      bA.m_sweep.a -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
	      bB.m_sweep.c.x += mB * impulse.x;
	      bB.m_sweep.c.y += mB * impulse.y;
	      bB.m_sweep.a += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
	      bA.SynchronizeTransform();
	      bB.SynchronizeTransform();
	      return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
	   }
	   Box2D.inherit(b2WeldJointDef, Box2D.Dynamics.Joints.b2JointDef);
	   b2WeldJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
	   b2WeldJointDef.b2WeldJointDef = function () {
	      Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
	      this.localAnchorA = new b2Vec2();
	      this.localAnchorB = new b2Vec2();
	   };
	   b2WeldJointDef.prototype.b2WeldJointDef = function () {
	      this.__super.b2JointDef.call(this);
	      this.type = b2Joint.e_weldJoint;
	      this.referenceAngle = 0.0;
	   }
	   b2WeldJointDef.prototype.Initialize = function (bA, bB, anchor) {
	      this.bodyA = bA;
	      this.bodyB = bB;
	      this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
	      this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor));
	      this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
	   }
	})();
	(function () {
	   var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
	   b2DebugDraw.b2DebugDraw = function () {
	      this.m_drawScale = 1.0;
	      this.m_lineThickness = 1.0;
	      this.m_alpha = 1.0;
	      this.m_fillAlpha = 1.0;
	      this.m_xformScale = 1.0;
	      var __this = this;
	      //#WORKAROUND
	      this.m_sprite = {
	         graphics: {
	            clear: function () {
	               __this.m_ctx.clearRect(0, 0, __this.m_ctx.canvas.width, __this.m_ctx.canvas.height)
	            }
	         }
	      };
	   };
	   b2DebugDraw.prototype._color = function (color, alpha) {
	      return "rgba(" + ((color & 0xFF0000) >> 16) + "," + ((color & 0xFF00) >> 8) + "," + (color & 0xFF) + "," + alpha + ")";
	   };
	   b2DebugDraw.prototype.b2DebugDraw = function () {
	      this.m_drawFlags = 0;
	   };
	   b2DebugDraw.prototype.SetFlags = function (flags) {
	      if (flags === undefined) flags = 0;
	      this.m_drawFlags = flags;
	   };
	   b2DebugDraw.prototype.GetFlags = function () {
	      return this.m_drawFlags;
	   };
	   b2DebugDraw.prototype.AppendFlags = function (flags) {
	      if (flags === undefined) flags = 0;
	      this.m_drawFlags |= flags;
	   };
	   b2DebugDraw.prototype.ClearFlags = function (flags) {
	      if (flags === undefined) flags = 0;
	      this.m_drawFlags &= ~flags;
	   };
	   b2DebugDraw.prototype.SetSprite = function (sprite) {
	      this.m_ctx = sprite;
	   };
	   b2DebugDraw.prototype.GetSprite = function () {
	      return this.m_ctx;
	   };
	   b2DebugDraw.prototype.SetDrawScale = function (drawScale) {
	      if (drawScale === undefined) drawScale = 0;
	      this.m_drawScale = drawScale;
	   };
	   b2DebugDraw.prototype.GetDrawScale = function () {
	      return this.m_drawScale;
	   };
	   b2DebugDraw.prototype.SetLineThickness = function (lineThickness) {
	      if (lineThickness === undefined) lineThickness = 0;
	      this.m_lineThickness = lineThickness;
	      this.m_ctx.strokeWidth = lineThickness;
	   };
	   b2DebugDraw.prototype.GetLineThickness = function () {
	      return this.m_lineThickness;
	   };
	   b2DebugDraw.prototype.SetAlpha = function (alpha) {
	      if (alpha === undefined) alpha = 0;
	      this.m_alpha = alpha;
	   };
	   b2DebugDraw.prototype.GetAlpha = function () {
	      return this.m_alpha;
	   };
	   b2DebugDraw.prototype.SetFillAlpha = function (alpha) {
	      if (alpha === undefined) alpha = 0;
	      this.m_fillAlpha = alpha;
	   };
	   b2DebugDraw.prototype.GetFillAlpha = function () {
	      return this.m_fillAlpha;
	   };
	   b2DebugDraw.prototype.SetXFormScale = function (xformScale) {
	      if (xformScale === undefined) xformScale = 0;
	      this.m_xformScale = xformScale;
	   };
	   b2DebugDraw.prototype.GetXFormScale = function () {
	      return this.m_xformScale;
	   };
	   b2DebugDraw.prototype.DrawPolygon = function (vertices, vertexCount, color) {
	      if (!vertexCount) return;
	      var s = this.m_ctx;
	      var drawScale = this.m_drawScale;
	      s.beginPath();
	      s.strokeStyle = this._color(color.color, this.m_alpha);
	      s.moveTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
	      for (var i = 1; i < vertexCount; i++) {
	         s.lineTo(vertices[i].x * drawScale, vertices[i].y * drawScale);
	      }
	      s.lineTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
	      s.closePath();
	      s.stroke();
	   };
	   b2DebugDraw.prototype.DrawSolidPolygon = function (vertices, vertexCount, color) {
	      if (!vertexCount) return;
	      var s = this.m_ctx;
	      var drawScale = this.m_drawScale;
	      s.beginPath();
	      s.strokeStyle = this._color(color.color, this.m_alpha);
	      s.fillStyle = this._color(color.color, this.m_fillAlpha);
	      s.moveTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
	      for (var i = 1; i < vertexCount; i++) {
	         s.lineTo(vertices[i].x * drawScale, vertices[i].y * drawScale);
	      }
	      s.lineTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
	      s.closePath();
	      s.fill();
	      s.stroke();
	   };
	   b2DebugDraw.prototype.DrawCircle = function (center, radius, color) {
	      if (!radius) return;
	      var s = this.m_ctx;
	      var drawScale = this.m_drawScale;
	      s.beginPath();
	      s.strokeStyle = this._color(color.color, this.m_alpha);
	      s.arc(center.x * drawScale, center.y * drawScale, radius * drawScale, 0, Math.PI * 2, true);
	      s.closePath();
	      s.stroke();
	   };
	   b2DebugDraw.prototype.DrawSolidCircle = function (center, radius, axis, color) {
	      if (!radius) return;
	      var s = this.m_ctx,
	         drawScale = this.m_drawScale,
	         cx = center.x * drawScale,
	         cy = center.y * drawScale;
	      s.moveTo(0, 0);
	      s.beginPath();
	      s.strokeStyle = this._color(color.color, this.m_alpha);
	      s.fillStyle = this._color(color.color, this.m_fillAlpha);
	      s.arc(cx, cy, radius * drawScale, 0, Math.PI * 2, true);
	      s.moveTo(cx, cy);
	      s.lineTo((center.x + axis.x * radius) * drawScale, (center.y + axis.y * radius) * drawScale);
	      s.closePath();
	      s.fill();
	      s.stroke();
	   };
	   b2DebugDraw.prototype.DrawSegment = function (p1, p2, color) {
	      var s = this.m_ctx,
	         drawScale = this.m_drawScale;
	      s.strokeStyle = this._color(color.color, this.m_alpha);
	      s.beginPath();
	      s.moveTo(p1.x * drawScale, p1.y * drawScale);
	      s.lineTo(p2.x * drawScale, p2.y * drawScale);
	      s.closePath();
	      s.stroke();
	   };
	   b2DebugDraw.prototype.DrawTransform = function (xf) {
	      var s = this.m_ctx,
	         drawScale = this.m_drawScale;
	      s.beginPath();
	      s.strokeStyle = this._color(0xff0000, this.m_alpha);
	      s.moveTo(xf.position.x * drawScale, xf.position.y * drawScale);
	      s.lineTo((xf.position.x + this.m_xformScale * xf.R.col1.x) * drawScale, (xf.position.y + this.m_xformScale * xf.R.col1.y) * drawScale);
	
	      s.strokeStyle = this._color(0xff00, this.m_alpha);
	      s.moveTo(xf.position.x * drawScale, xf.position.y * drawScale);
	      s.lineTo((xf.position.x + this.m_xformScale * xf.R.col2.x) * drawScale, (xf.position.y + this.m_xformScale * xf.R.col2.y) * drawScale);
	      s.closePath();
	      s.stroke();
	   };
	})(); //post-definitions
	var i;
	for (i = 0; i < Box2D.postDefs.length; ++i) Box2D.postDefs[i]();
	delete Box2D.postDefs;
	// Exports
	exports.Box2D = Box2D;
	exports.b2AABB = Box2D.Collision.b2AABB;
	exports.b2Body = Box2D.Dynamics.b2Body;
	exports.b2BodyDef = Box2D.Dynamics.b2BodyDef;
	exports.b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	exports.b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
	exports.b2Fixture = Box2D.Dynamics.b2Fixture;
	exports.b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	exports.b2MassData = Box2D.Collision.Shapes.b2MassData;
	exports.b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	exports.b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;
	exports.b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
	exports.b2Transform=Box2D.Common.Math.b2Transform;
	exports.b2Vec2 = Box2D.Common.Math.b2Vec2;
	exports.b2World = Box2D.Dynamics.b2World;


/***/ }
/******/ ]);
//# sourceMappingURL=App.js.map