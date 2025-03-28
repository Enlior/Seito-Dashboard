(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["seitoComp"] = factory(require("vue"));
	else
		root["seitoComp"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__9274__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 34:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(4901);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 81:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var tryToString = __webpack_require__(6823);
var getIteratorMethod = __webpack_require__(851);

var $TypeError = TypeError;

module.exports = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  throw new $TypeError(tryToString(argument) + ' is not iterable');
};


/***/ }),

/***/ 116:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);

// `Iterator.prototype.find` method
// https://tc39.es/ecma262/#sec-iterator.prototype.find
$({ target: 'Iterator', proto: true, real: true }, {
  find: function find(predicate) {
    anObject(this);
    aCallable(predicate);
    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop(value);
    }, { IS_RECORD: true, INTERRUPTED: true }).result;
  }
});


/***/ }),

/***/ 283:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);
var hasOwn = __webpack_require__(9297);
var DESCRIPTORS = __webpack_require__(3724);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(350).CONFIGURABLE);
var inspectSource = __webpack_require__(3706);
var InternalStateModule = __webpack_require__(1181);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 350:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var hasOwn = __webpack_require__(9297);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 397:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(7751);

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ 421:
/***/ (function(module) {


module.exports = {};


/***/ }),

/***/ 507:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9565);

module.exports = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
  var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator;
  var next = record.next;
  var step, result;
  while (!(step = call(next, iterator)).done) {
    result = fn(step.value);
    if (result !== undefined) return result;
  }
};


/***/ }),

/***/ 616:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(9039);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 679:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isPrototypeOf = __webpack_require__(1625);

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw new $TypeError('Incorrect invocation');
};


/***/ }),

/***/ 713:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var createIteratorProxy = __webpack_require__(9462);
var callWithSafeIterationClosing = __webpack_require__(6319);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var result = anObject(call(this.next, iterator));
  var done = this.done = !!result.done;
  if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true);
});

// `Iterator.prototype.map` method
// https://github.com/tc39/proposal-iterator-helpers
module.exports = function map(mapper) {
  anObject(this);
  aCallable(mapper);
  return new IteratorProxy(getIteratorDirect(this), {
    mapper: mapper
  });
};


/***/ }),

/***/ 741:
/***/ (function(module) {


var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 757:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(7751);
var isCallable = __webpack_require__(4901);
var isPrototypeOf = __webpack_require__(1625);
var USE_SYMBOL_AS_UID = __webpack_require__(7040);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 851:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var classof = __webpack_require__(6955);
var getMethod = __webpack_require__(5966);
var isNullOrUndefined = __webpack_require__(4117);
var Iterators = __webpack_require__(6269);
var wellKnownSymbol = __webpack_require__(8227);

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
    || getMethod(it, '@@iterator')
    || Iterators[classof(it)];
};


/***/ }),

/***/ 1072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var internalObjectKeys = __webpack_require__(1828);
var enumBugKeys = __webpack_require__(8727);

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ 1148:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);

// `Iterator.prototype.every` method
// https://tc39.es/ecma262/#sec-iterator.prototype.every
$({ target: 'Iterator', proto: true, real: true }, {
  every: function every(predicate) {
    anObject(this);
    aCallable(predicate);
    var record = getIteratorDirect(this);
    var counter = 0;
    return !iterate(record, function (value, stop) {
      if (!predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});


/***/ }),

/***/ 1181:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_WEAK_MAP = __webpack_require__(8622);
var globalThis = __webpack_require__(4576);
var isObject = __webpack_require__(34);
var createNonEnumerableProperty = __webpack_require__(6699);
var hasOwn = __webpack_require__(9297);
var shared = __webpack_require__(7629);
var sharedKey = __webpack_require__(6119);
var hiddenKeys = __webpack_require__(421);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = globalThis.TypeError;
var WeakMap = globalThis.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 1291:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var trunc = __webpack_require__(741);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 1625:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 1698:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var union = __webpack_require__(4204);
var setMethodAcceptSetLike = __webpack_require__(4916);

// `Set.prototype.union` method
// https://tc39.es/ecma262/#sec-set.prototype.union
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('union') }, {
  union: union
});


/***/ }),

/***/ 1701:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var map = __webpack_require__(713);
var IS_PURE = __webpack_require__(6395);

// `Iterator.prototype.map` method
// https://tc39.es/ecma262/#sec-iterator.prototype.map
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  map: map
});


/***/ }),

/***/ 1767:
/***/ (function(module) {


// `GetIteratorDirect(obj)` abstract operation
// https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
module.exports = function (obj) {
  return {
    iterator: obj,
    next: obj.next,
    done: false
  };
};


/***/ }),

/***/ 1828:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var hasOwn = __webpack_require__(9297);
var toIndexedObject = __webpack_require__(5397);
var indexOf = (__webpack_require__(9617).indexOf);
var hiddenKeys = __webpack_require__(421);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 2106:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var makeBuiltIn = __webpack_require__(283);
var defineProperty = __webpack_require__(4913);

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var wellKnownSymbol = __webpack_require__(8227);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 2195:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 2211:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(9039);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 2360:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* global ActiveXObject -- old IE, WSH */
var anObject = __webpack_require__(8551);
var definePropertiesModule = __webpack_require__(6801);
var enumBugKeys = __webpack_require__(8727);
var hiddenKeys = __webpack_require__(421);
var html = __webpack_require__(397);
var documentCreateElement = __webpack_require__(4055);
var sharedKey = __webpack_require__(6119);

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
  activeXDocument = null;
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};


/***/ }),

/***/ 2475:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var isSupersetOf = __webpack_require__(8527);
var setMethodAcceptSetLike = __webpack_require__(4916);

var INCORRECT = !setMethodAcceptSetLike('isSupersetOf', function (result) {
  return !result;
});

// `Set.prototype.isSupersetOf` method
// https://tc39.es/ecma262/#sec-set.prototype.issupersetof
$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
  isSupersetOf: isSupersetOf
});


/***/ }),

/***/ 2489:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var call = __webpack_require__(9565);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);
var createIteratorProxy = __webpack_require__(9462);
var callWithSafeIterationClosing = __webpack_require__(6319);
var IS_PURE = __webpack_require__(6395);

var IteratorProxy = createIteratorProxy(function () {
  var iterator = this.iterator;
  var predicate = this.predicate;
  var next = this.next;
  var result, done, value;
  while (true) {
    result = anObject(call(next, iterator));
    done = this.done = !!result.done;
    if (done) return;
    value = result.value;
    if (callWithSafeIterationClosing(iterator, predicate, [value, this.counter++], true)) return value;
  }
});

// `Iterator.prototype.filter` method
// https://tc39.es/ecma262/#sec-iterator.prototype.filter
$({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
  filter: function filter(predicate) {
    anObject(this);
    aCallable(predicate);
    return new IteratorProxy(getIteratorDirect(this), {
      predicate: predicate
    });
  }
});


/***/ }),

/***/ 2529:
/***/ (function(module) {


// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
module.exports = function (value, done) {
  return { value: value, done: done };
};


/***/ }),

/***/ 2652:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var bind = __webpack_require__(6080);
var call = __webpack_require__(9565);
var anObject = __webpack_require__(8551);
var tryToString = __webpack_require__(6823);
var isArrayIteratorMethod = __webpack_require__(4209);
var lengthOfArrayLike = __webpack_require__(6198);
var isPrototypeOf = __webpack_require__(1625);
var getIterator = __webpack_require__(81);
var getIteratorMethod = __webpack_require__(851);
var iteratorClose = __webpack_require__(9539);

var $TypeError = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

module.exports = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};


/***/ }),

/***/ 2777:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9565);
var isObject = __webpack_require__(34);
var isSymbol = __webpack_require__(757);
var getMethod = __webpack_require__(5966);
var ordinaryToPrimitive = __webpack_require__(4270);
var wellKnownSymbol = __webpack_require__(8227);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw new $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 2787:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var hasOwn = __webpack_require__(9297);
var isCallable = __webpack_require__(4901);
var toObject = __webpack_require__(8981);
var sharedKey = __webpack_require__(6119);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(2211);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 2796:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL ? true
    : value === NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 2839:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(4576);

var navigator = globalThis.navigator;
var userAgent = navigator && navigator.userAgent;

module.exports = userAgent ? String(userAgent) : '';


/***/ }),

/***/ 3392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3440:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aSet = __webpack_require__(7080);
var SetHelpers = __webpack_require__(4402);
var clone = __webpack_require__(9286);
var size = __webpack_require__(5170);
var getSetRecord = __webpack_require__(3789);
var iterateSet = __webpack_require__(8469);
var iterateSimple = __webpack_require__(507);

var has = SetHelpers.has;
var remove = SetHelpers.remove;

// `Set.prototype.difference` method
// https://github.com/tc39/proposal-set-methods
module.exports = function difference(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  var result = clone(O);
  if (size(O) <= otherRec.size) iterateSet(O, function (e) {
    if (otherRec.includes(e)) remove(result, e);
  });
  else iterateSimple(otherRec.getIterator(), function (e) {
    if (has(O, e)) remove(result, e);
  });
  return result;
};


/***/ }),

/***/ 3579:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);

// `Iterator.prototype.some` method
// https://tc39.es/ecma262/#sec-iterator.prototype.some
$({ target: 'Iterator', proto: true, real: true }, {
  some: function some(predicate) {
    anObject(this);
    aCallable(predicate);
    var record = getIteratorDirect(this);
    var counter = 0;
    return iterate(record, function (value, stop) {
      if (predicate(value, counter++)) return stop();
    }, { IS_RECORD: true, INTERRUPTED: true }).stopped;
  }
});


/***/ }),

/***/ 3650:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aSet = __webpack_require__(7080);
var SetHelpers = __webpack_require__(4402);
var clone = __webpack_require__(9286);
var getSetRecord = __webpack_require__(3789);
var iterateSimple = __webpack_require__(507);

var add = SetHelpers.add;
var has = SetHelpers.has;
var remove = SetHelpers.remove;

// `Set.prototype.symmetricDifference` method
// https://github.com/tc39/proposal-set-methods
module.exports = function symmetricDifference(other) {
  var O = aSet(this);
  var keysIter = getSetRecord(other).getIterator();
  var result = clone(O);
  iterateSimple(keysIter, function (e) {
    if (has(O, e)) remove(result, e);
    else add(result, e);
  });
  return result;
};


/***/ }),

/***/ 3706:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var isCallable = __webpack_require__(4901);
var store = __webpack_require__(7629);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 3717:
/***/ (function(__unused_webpack_module, exports) {


// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 3724:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(9039);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
});


/***/ }),

/***/ 3789:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var call = __webpack_require__(9565);
var toIntegerOrInfinity = __webpack_require__(1291);
var getIteratorDirect = __webpack_require__(1767);

var INVALID_SIZE = 'Invalid size';
var $RangeError = RangeError;
var $TypeError = TypeError;
var max = Math.max;

var SetRecord = function (set, intSize) {
  this.set = set;
  this.size = max(intSize, 0);
  this.has = aCallable(set.has);
  this.keys = aCallable(set.keys);
};

SetRecord.prototype = {
  getIterator: function () {
    return getIteratorDirect(anObject(call(this.keys, this.set)));
  },
  includes: function (it) {
    return call(this.has, this.set, it);
  }
};

// `GetSetRecord` abstract operation
// https://tc39.es/proposal-set-methods/#sec-getsetrecord
module.exports = function (obj) {
  anObject(obj);
  var numSize = +obj.size;
  // NOTE: If size is undefined, then numSize will be NaN
  // eslint-disable-next-line no-self-compare -- NaN check
  if (numSize !== numSize) throw new $TypeError(INVALID_SIZE);
  var intSize = toIntegerOrInfinity(numSize);
  if (intSize < 0) throw new $RangeError(INVALID_SIZE);
  return new SetRecord(obj, intSize);
};


/***/ }),

/***/ 3838:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aSet = __webpack_require__(7080);
var size = __webpack_require__(5170);
var iterate = __webpack_require__(8469);
var getSetRecord = __webpack_require__(3789);

// `Set.prototype.isSubsetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
module.exports = function isSubsetOf(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) > otherRec.size) return false;
  return iterate(O, function (e) {
    if (!otherRec.includes(e)) return false;
  }, true) !== false;
};


/***/ }),

/***/ 3853:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var isDisjointFrom = __webpack_require__(4449);
var setMethodAcceptSetLike = __webpack_require__(4916);

var INCORRECT = !setMethodAcceptSetLike('isDisjointFrom', function (result) {
  return !result;
});

// `Set.prototype.isDisjointFrom` method
// https://tc39.es/ecma262/#sec-set.prototype.isdisjointfrom
$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
  isDisjointFrom: isDisjointFrom
});


/***/ }),

/***/ 4055:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(4576);
var isObject = __webpack_require__(34);

var document = globalThis.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 4114:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var toObject = __webpack_require__(8981);
var lengthOfArrayLike = __webpack_require__(6198);
var setArrayLength = __webpack_require__(4527);
var doesNotExceedSafeInteger = __webpack_require__(6837);
var fails = __webpack_require__(9039);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),

/***/ 4117:
/***/ (function(module) {


// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 4204:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aSet = __webpack_require__(7080);
var add = (__webpack_require__(4402).add);
var clone = __webpack_require__(9286);
var getSetRecord = __webpack_require__(3789);
var iterateSimple = __webpack_require__(507);

// `Set.prototype.union` method
// https://github.com/tc39/proposal-set-methods
module.exports = function union(other) {
  var O = aSet(this);
  var keysIter = getSetRecord(other).getIterator();
  var result = clone(O);
  iterateSimple(keysIter, function (it) {
    add(result, it);
  });
  return result;
};


/***/ }),

/***/ 4209:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var wellKnownSymbol = __webpack_require__(8227);
var Iterators = __webpack_require__(6269);

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ 4270:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9565);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw new $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 4376:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var classof = __webpack_require__(2195);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) === 'Array';
};


/***/ }),

/***/ 4402:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);

// eslint-disable-next-line es/no-set -- safe
var SetPrototype = Set.prototype;

module.exports = {
  // eslint-disable-next-line es/no-set -- safe
  Set: Set,
  add: uncurryThis(SetPrototype.add),
  has: uncurryThis(SetPrototype.has),
  remove: uncurryThis(SetPrototype['delete']),
  proto: SetPrototype
};


/***/ }),

/***/ 4449:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aSet = __webpack_require__(7080);
var has = (__webpack_require__(4402).has);
var size = __webpack_require__(5170);
var getSetRecord = __webpack_require__(3789);
var iterateSet = __webpack_require__(8469);
var iterateSimple = __webpack_require__(507);
var iteratorClose = __webpack_require__(9539);

// `Set.prototype.isDisjointFrom` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
module.exports = function isDisjointFrom(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) <= otherRec.size) return iterateSet(O, function (e) {
    if (otherRec.includes(e)) return false;
  }, true) !== false;
  var iterator = otherRec.getIterator();
  return iterateSimple(iterator, function (e) {
    if (has(O, e)) return iteratorClose(iterator, 'normal', false);
  }) !== false;
};


/***/ }),

/***/ 4495:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(9519);
var fails = __webpack_require__(9039);
var globalThis = __webpack_require__(4576);

var $String = globalThis.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol('symbol detection');
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 4527:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var isArray = __webpack_require__(4376);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw new $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ 4576:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  check(typeof this == 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 4659:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var definePropertyModule = __webpack_require__(4913);
var createPropertyDescriptor = __webpack_require__(6980);

module.exports = function (object, key, value) {
  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
  else object[key] = value;
};


/***/ }),

/***/ 4901:
/***/ (function(module) {


// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
var documentAll = typeof document == 'object' && document.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
module.exports = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4913:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var IE8_DOM_DEFINE = __webpack_require__(5917);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(8686);
var anObject = __webpack_require__(8551);
var toPropertyKey = __webpack_require__(6969);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 4916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(7751);

var createSetLike = function (size) {
  return {
    size: size,
    has: function () {
      return false;
    },
    keys: function () {
      return {
        next: function () {
          return { done: true };
        }
      };
    }
  };
};

var createSetLikeWithInfinitySize = function (size) {
  return {
    size: size,
    has: function () {
      return true;
    },
    keys: function () {
      throw new Error('e');
    }
  };
};

module.exports = function (name, callback) {
  var Set = getBuiltIn('Set');
  try {
    new Set()[name](createSetLike(0));
    try {
      // late spec change, early WebKit ~ Safari 17.0 beta implementation does not pass it
      // https://github.com/tc39/proposal-set-methods/pull/88
      new Set()[name](createSetLike(-1));
      return false;
    } catch (error2) {
      if (!callback) return true;
      // early V8 implementation bug
      // https://issues.chromium.org/issues/351332634
      try {
        new Set()[name](createSetLikeWithInfinitySize(-Infinity));
        return false;
      } catch (error) {
        var set = new Set();
        set.add(1);
        set.add(2);
        return callback(set[name](createSetLikeWithInfinitySize(Infinity)));
      }
    }
  } catch (error) {
    return false;
  }
};


/***/ }),

/***/ 5024:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var symmetricDifference = __webpack_require__(3650);
var setMethodAcceptSetLike = __webpack_require__(4916);

// `Set.prototype.symmetricDifference` method
// https://tc39.es/ecma262/#sec-set.prototype.symmetricdifference
$({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('symmetricDifference') }, {
  symmetricDifference: symmetricDifference
});


/***/ }),

/***/ 5031:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var getBuiltIn = __webpack_require__(7751);
var uncurryThis = __webpack_require__(9504);
var getOwnPropertyNamesModule = __webpack_require__(8480);
var getOwnPropertySymbolsModule = __webpack_require__(3717);
var anObject = __webpack_require__(8551);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 5170:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThisAccessor = __webpack_require__(6706);
var SetHelpers = __webpack_require__(4402);

module.exports = uncurryThisAccessor(SetHelpers.proto, 'size', 'get') || function (set) {
  return set.size;
};


/***/ }),

/***/ 5397:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(7055);
var requireObjectCoercible = __webpack_require__(7750);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 5610:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIntegerOrInfinity = __webpack_require__(1291);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5745:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var store = __webpack_require__(7629);

module.exports = function (key, value) {
  return store[key] || (store[key] = value || {});
};


/***/ }),

/***/ 5876:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var isSubsetOf = __webpack_require__(3838);
var setMethodAcceptSetLike = __webpack_require__(4916);

var INCORRECT = !setMethodAcceptSetLike('isSubsetOf', function (result) {
  return result;
});

// `Set.prototype.isSubsetOf` method
// https://tc39.es/ecma262/#sec-set.prototype.issubsetof
$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
  isSubsetOf: isSubsetOf
});


/***/ }),

/***/ 5907:
/***/ (function(__unused_webpack_module, exports) {

var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
// runtime helper for setting properties on components
// in a tree-shakable way
exports.A = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

/***/ }),

/***/ 5917:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var fails = __webpack_require__(9039);
var createElement = __webpack_require__(4055);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a !== 7;
});


/***/ }),

/***/ 5966:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aCallable = __webpack_require__(9306);
var isNullOrUndefined = __webpack_require__(4117);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 6080:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(7476);
var aCallable = __webpack_require__(9306);
var NATIVE_BIND = __webpack_require__(616);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 6119:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var shared = __webpack_require__(5745);
var uid = __webpack_require__(3392);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 6198:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toLength = __webpack_require__(8014);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 6269:
/***/ (function(module) {


module.exports = {};


/***/ }),

/***/ 6279:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var defineBuiltIn = __webpack_require__(6840);

module.exports = function (target, src, options) {
  for (var key in src) defineBuiltIn(target, key, src[key], options);
  return target;
};


/***/ }),

/***/ 6319:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var anObject = __webpack_require__(8551);
var iteratorClose = __webpack_require__(9539);

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};


/***/ }),

/***/ 6395:
/***/ (function(module) {


module.exports = false;


/***/ }),

/***/ 6518:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(4576);
var getOwnPropertyDescriptor = (__webpack_require__(7347).f);
var createNonEnumerableProperty = __webpack_require__(6699);
var defineBuiltIn = __webpack_require__(6840);
var defineGlobalProperty = __webpack_require__(9433);
var copyConstructorProperties = __webpack_require__(7740);
var isForced = __webpack_require__(2796);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = globalThis;
  } else if (STATIC) {
    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = globalThis[TARGET] && globalThis[TARGET].prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 6699:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var definePropertyModule = __webpack_require__(4913);
var createPropertyDescriptor = __webpack_require__(6980);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 6706:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var aCallable = __webpack_require__(9306);

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ 6801:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(8686);
var definePropertyModule = __webpack_require__(4913);
var anObject = __webpack_require__(8551);
var toIndexedObject = __webpack_require__(5397);
var objectKeys = __webpack_require__(1072);

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var props = toIndexedObject(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  return O;
};


/***/ }),

/***/ 6823:
/***/ (function(module) {


var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 6837:
/***/ (function(module) {


var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 6840:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(4901);
var definePropertyModule = __webpack_require__(4913);
var makeBuiltIn = __webpack_require__(283);
var defineGlobalProperty = __webpack_require__(9433);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 6955:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var TO_STRING_TAG_SUPPORT = __webpack_require__(2140);
var isCallable = __webpack_require__(4901);
var classofRaw = __webpack_require__(2195);
var wellKnownSymbol = __webpack_require__(8227);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 6969:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toPrimitive = __webpack_require__(2777);
var isSymbol = __webpack_require__(757);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 6980:
/***/ (function(module) {


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 7040:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(4495);

module.exports = NATIVE_SYMBOL &&
  !Symbol.sham &&
  typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 7055:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var fails = __webpack_require__(9039);
var classof = __webpack_require__(2195);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) === 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 7080:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var has = (__webpack_require__(4402).has);

// Perform ? RequireInternalSlot(M, [[SetData]])
module.exports = function (it) {
  has(it);
  return it;
};


/***/ }),

/***/ 7347:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var call = __webpack_require__(9565);
var propertyIsEnumerableModule = __webpack_require__(8773);
var createPropertyDescriptor = __webpack_require__(6980);
var toIndexedObject = __webpack_require__(5397);
var toPropertyKey = __webpack_require__(6969);
var hasOwn = __webpack_require__(9297);
var IE8_DOM_DEFINE = __webpack_require__(5917);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 7476:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var classofRaw = __webpack_require__(2195);
var uncurryThis = __webpack_require__(9504);

module.exports = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
};


/***/ }),

/***/ 7588:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);

// `Iterator.prototype.forEach` method
// https://tc39.es/ecma262/#sec-iterator.prototype.foreach
$({ target: 'Iterator', proto: true, real: true }, {
  forEach: function forEach(fn) {
    anObject(this);
    aCallable(fn);
    var record = getIteratorDirect(this);
    var counter = 0;
    iterate(record, function (value) {
      fn(value, counter++);
    }, { IS_RECORD: true });
  }
});


/***/ }),

/***/ 7629:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var IS_PURE = __webpack_require__(6395);
var globalThis = __webpack_require__(4576);
var defineGlobalProperty = __webpack_require__(9433);

var SHARED = '__core-js_shared__';
var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

(store.versions || (store.versions = [])).push({
  version: '3.41.0',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.41.0/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 7642:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var difference = __webpack_require__(3440);
var setMethodAcceptSetLike = __webpack_require__(4916);

var INCORRECT = !setMethodAcceptSetLike('difference', function (result) {
  return result.size === 0;
});

// `Set.prototype.difference` method
// https://tc39.es/ecma262/#sec-set.prototype.difference
$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
  difference: difference
});


/***/ }),

/***/ 7657:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var fails = __webpack_require__(9039);
var isCallable = __webpack_require__(4901);
var isObject = __webpack_require__(34);
var create = __webpack_require__(2360);
var getPrototypeOf = __webpack_require__(2787);
var defineBuiltIn = __webpack_require__(6840);
var wellKnownSymbol = __webpack_require__(8227);
var IS_PURE = __webpack_require__(6395);

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype[ITERATOR].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable(IteratorPrototype[ITERATOR])) {
  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
    return this;
  });
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ 7740:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var hasOwn = __webpack_require__(9297);
var ownKeys = __webpack_require__(5031);
var getOwnPropertyDescriptorModule = __webpack_require__(7347);
var definePropertyModule = __webpack_require__(4913);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 7750:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isNullOrUndefined = __webpack_require__(4117);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 7751:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(4576);
var isCallable = __webpack_require__(4901);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
};


/***/ }),

/***/ 8004:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var fails = __webpack_require__(9039);
var intersection = __webpack_require__(8750);
var setMethodAcceptSetLike = __webpack_require__(4916);

var INCORRECT = !setMethodAcceptSetLike('intersection', function (result) {
  return result.size === 2 && result.has(1) && result.has(2);
}) || fails(function () {
  // eslint-disable-next-line es/no-array-from, es/no-set, es/no-set-prototype-intersection -- testing
  return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== '3,2';
});

// `Set.prototype.intersection` method
// https://tc39.es/ecma262/#sec-set.prototype.intersection
$({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
  intersection: intersection
});


/***/ }),

/***/ 8014:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIntegerOrInfinity = __webpack_require__(1291);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  var len = toIntegerOrInfinity(argument);
  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 8111:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var globalThis = __webpack_require__(4576);
var anInstance = __webpack_require__(679);
var anObject = __webpack_require__(8551);
var isCallable = __webpack_require__(4901);
var getPrototypeOf = __webpack_require__(2787);
var defineBuiltInAccessor = __webpack_require__(2106);
var createProperty = __webpack_require__(4659);
var fails = __webpack_require__(9039);
var hasOwn = __webpack_require__(9297);
var wellKnownSymbol = __webpack_require__(8227);
var IteratorPrototype = (__webpack_require__(7657).IteratorPrototype);
var DESCRIPTORS = __webpack_require__(3724);
var IS_PURE = __webpack_require__(6395);

var CONSTRUCTOR = 'constructor';
var ITERATOR = 'Iterator';
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var $TypeError = TypeError;
var NativeIterator = globalThis[ITERATOR];

// FF56- have non-standard global helper `Iterator`
var FORCED = IS_PURE
  || !isCallable(NativeIterator)
  || NativeIterator.prototype !== IteratorPrototype
  // FF44- non-standard `Iterator` passes previous tests
  || !fails(function () { NativeIterator({}); });

var IteratorConstructor = function Iterator() {
  anInstance(this, IteratorPrototype);
  if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable');
};

var defineIteratorPrototypeAccessor = function (key, value) {
  if (DESCRIPTORS) {
    defineBuiltInAccessor(IteratorPrototype, key, {
      configurable: true,
      get: function () {
        return value;
      },
      set: function (replacement) {
        anObject(this);
        if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property");
        if (hasOwn(this, key)) this[key] = replacement;
        else createProperty(this, key, replacement);
      }
    });
  } else IteratorPrototype[key] = value;
};

if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR);

if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
  defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor);
}

IteratorConstructor.prototype = IteratorPrototype;

// `Iterator` constructor
// https://tc39.es/ecma262/#sec-iterator
$({ global: true, constructor: true, forced: FORCED }, {
  Iterator: IteratorConstructor
});


/***/ }),

/***/ 8227:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(4576);
var shared = __webpack_require__(5745);
var hasOwn = __webpack_require__(9297);
var uid = __webpack_require__(3392);
var NATIVE_SYMBOL = __webpack_require__(4495);
var USE_SYMBOL_AS_UID = __webpack_require__(7040);

var Symbol = globalThis.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 8237:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {


var $ = __webpack_require__(6518);
var iterate = __webpack_require__(2652);
var aCallable = __webpack_require__(9306);
var anObject = __webpack_require__(8551);
var getIteratorDirect = __webpack_require__(1767);

var $TypeError = TypeError;

// `Iterator.prototype.reduce` method
// https://tc39.es/ecma262/#sec-iterator.prototype.reduce
$({ target: 'Iterator', proto: true, real: true }, {
  reduce: function reduce(reducer /* , initialValue */) {
    anObject(this);
    aCallable(reducer);
    var record = getIteratorDirect(this);
    var noInitial = arguments.length < 2;
    var accumulator = noInitial ? undefined : arguments[1];
    var counter = 0;
    iterate(record, function (value) {
      if (noInitial) {
        noInitial = false;
        accumulator = value;
      } else {
        accumulator = reducer(accumulator, value, counter);
      }
      counter++;
    }, { IS_RECORD: true });
    if (noInitial) throw new $TypeError('Reduce of empty iterator with no initial value');
    return accumulator;
  }
});


/***/ }),

/***/ 8469:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var iterateSimple = __webpack_require__(507);
var SetHelpers = __webpack_require__(4402);

var Set = SetHelpers.Set;
var SetPrototype = SetHelpers.proto;
var forEach = uncurryThis(SetPrototype.forEach);
var keys = uncurryThis(SetPrototype.keys);
var next = keys(new Set()).next;

module.exports = function (set, fn, interruptible) {
  return interruptible ? iterateSimple({ iterator: keys(set), next: next }, fn) : forEach(set, fn);
};


/***/ }),

/***/ 8480:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var internalObjectKeys = __webpack_require__(1828);
var enumBugKeys = __webpack_require__(8727);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 8527:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aSet = __webpack_require__(7080);
var has = (__webpack_require__(4402).has);
var size = __webpack_require__(5170);
var getSetRecord = __webpack_require__(3789);
var iterateSimple = __webpack_require__(507);
var iteratorClose = __webpack_require__(9539);

// `Set.prototype.isSupersetOf` method
// https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
module.exports = function isSupersetOf(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  if (size(O) < otherRec.size) return false;
  var iterator = otherRec.getIterator();
  return iterateSimple(iterator, function (e) {
    if (!has(O, e)) return iteratorClose(iterator, 'normal', false);
  }) !== false;
};


/***/ }),

/***/ 8551:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isObject = __webpack_require__(34);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw new $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 8622:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(4576);
var isCallable = __webpack_require__(4901);

var WeakMap = globalThis.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 8686:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var DESCRIPTORS = __webpack_require__(3724);
var fails = __webpack_require__(9039);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype !== 42;
});


/***/ }),

/***/ 8727:
/***/ (function(module) {


// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 8750:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var aSet = __webpack_require__(7080);
var SetHelpers = __webpack_require__(4402);
var size = __webpack_require__(5170);
var getSetRecord = __webpack_require__(3789);
var iterateSet = __webpack_require__(8469);
var iterateSimple = __webpack_require__(507);

var Set = SetHelpers.Set;
var add = SetHelpers.add;
var has = SetHelpers.has;

// `Set.prototype.intersection` method
// https://github.com/tc39/proposal-set-methods
module.exports = function intersection(other) {
  var O = aSet(this);
  var otherRec = getSetRecord(other);
  var result = new Set();

  if (size(O) > otherRec.size) {
    iterateSimple(otherRec.getIterator(), function (e) {
      if (has(O, e)) add(result, e);
    });
  } else {
    iterateSet(O, function (e) {
      if (otherRec.includes(e)) add(result, e);
    });
  }

  return result;
};


/***/ }),

/***/ 8773:
/***/ (function(__unused_webpack_module, exports) {


var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 8981:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var requireObjectCoercible = __webpack_require__(7750);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 9039:
/***/ (function(module) {


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 9274:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__9274__;

/***/ }),

/***/ 9286:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var SetHelpers = __webpack_require__(4402);
var iterate = __webpack_require__(8469);

var Set = SetHelpers.Set;
var add = SetHelpers.add;

module.exports = function (set) {
  var result = new Set();
  iterate(set, function (it) {
    add(result, it);
  });
  return result;
};


/***/ }),

/***/ 9297:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var uncurryThis = __webpack_require__(9504);
var toObject = __webpack_require__(8981);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 9306:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var isCallable = __webpack_require__(4901);
var tryToString = __webpack_require__(6823);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw new $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 9433:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(4576);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    globalThis[key] = value;
  } return value;
};


/***/ }),

/***/ 9462:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9565);
var create = __webpack_require__(2360);
var createNonEnumerableProperty = __webpack_require__(6699);
var defineBuiltIns = __webpack_require__(6279);
var wellKnownSymbol = __webpack_require__(8227);
var InternalStateModule = __webpack_require__(1181);
var getMethod = __webpack_require__(5966);
var IteratorPrototype = (__webpack_require__(7657).IteratorPrototype);
var createIterResultObject = __webpack_require__(2529);
var iteratorClose = __webpack_require__(9539);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ITERATOR_HELPER = 'IteratorHelper';
var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator';
var setInternalState = InternalStateModule.set;

var createIteratorProxyPrototype = function (IS_ITERATOR) {
  var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER);

  return defineBuiltIns(create(IteratorPrototype), {
    next: function next() {
      var state = getInternalState(this);
      // for simplification:
      //   for `%WrapForValidIteratorPrototype%.next` or with `state.returnHandlerResult` our `nextHandler` returns `IterResultObject`
      //   for `%IteratorHelperPrototype%.next` - just a value
      if (IS_ITERATOR) return state.nextHandler();
      if (state.done) return createIterResultObject(undefined, true);
      try {
        var result = state.nextHandler();
        return state.returnHandlerResult ? result : createIterResultObject(result, state.done);
      } catch (error) {
        state.done = true;
        throw error;
      }
    },
    'return': function () {
      var state = getInternalState(this);
      var iterator = state.iterator;
      state.done = true;
      if (IS_ITERATOR) {
        var returnMethod = getMethod(iterator, 'return');
        return returnMethod ? call(returnMethod, iterator) : createIterResultObject(undefined, true);
      }
      if (state.inner) try {
        iteratorClose(state.inner.iterator, 'normal');
      } catch (error) {
        return iteratorClose(iterator, 'throw', error);
      }
      if (iterator) iteratorClose(iterator, 'normal');
      return createIterResultObject(undefined, true);
    }
  });
};

var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true);
var IteratorHelperPrototype = createIteratorProxyPrototype(false);

createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper');

module.exports = function (nextHandler, IS_ITERATOR, RETURN_HANDLER_RESULT) {
  var IteratorProxy = function Iterator(record, state) {
    if (state) {
      state.iterator = record.iterator;
      state.next = record.next;
    } else state = record;
    state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER;
    state.returnHandlerResult = !!RETURN_HANDLER_RESULT;
    state.nextHandler = nextHandler;
    state.counter = 0;
    state.done = false;
    setInternalState(this, state);
  };

  IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype;

  return IteratorProxy;
};


/***/ }),

/***/ 9504:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(616);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 9519:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var globalThis = __webpack_require__(4576);
var userAgent = __webpack_require__(2839);

var process = globalThis.process;
var Deno = globalThis.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 9539:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var call = __webpack_require__(9565);
var anObject = __webpack_require__(8551);
var getMethod = __webpack_require__(5966);

module.exports = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject(iterator);
  try {
    innerResult = getMethod(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject(innerResult);
  return value;
};


/***/ }),

/***/ 9565:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var NATIVE_BIND = __webpack_require__(616);

var call = Function.prototype.call;
// eslint-disable-next-line es/no-function-prototype-bind -- safe
module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 9617:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {


var toIndexedObject = __webpack_require__(5397);
var toAbsoluteIndex = __webpack_require__(5610);
var lengthOfArrayLike = __webpack_require__(6198);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    if (length === 0) return !IS_INCLUDES && -1;
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value !== value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.constructor.js
var es_iterator_constructor = __webpack_require__(8111);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.for-each.js
var es_iterator_for_each = __webpack_require__(7588);
// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(9274);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/base-card/index.vue?vue&type=script&setup=true&lang=js

const _hoisted_1 = {
  class: "table-content",
  style: {
    "margin-top": "20px"
  }
};

// 显式定义组件名称
const __default__ = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.defineComponent)({
  name: "BaseCard"
});
/* harmony default export */ var base_cardvue_type_script_setup_true_lang_js = (/*@__PURE__*/Object.assign(__default__, {
  props: {
    className: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      const _component_el_col = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-col");
      const _component_el_row = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-row");
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["card-content", __props.className])
      }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_row, {
        type: "flex",
        justify: "space-between",
        class: "row-bg"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_col, {
          span: 4,
          class: "sidebar"
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderSlot)(_ctx.$slots, "h-left")]),
          _: 3
        }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_col, {
          span: 20,
          class: "table-content"
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderSlot)(_ctx.$slots, "h-right", {}, () => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_1, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderSlot)(_ctx.$slots, "default")])])]),
          _: 3
        })]),
        _: 3
      })], 2);
    };
  }
}));
;// ./src/components/base-card/index.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/base-card/index.vue?vue&type=style&index=0&id=22849fe0&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ./src/components/base-card/index.vue?vue&type=style&index=0&id=22849fe0&scoped=true&lang=css

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(5907);
;// ./src/components/base-card/index.vue



;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.A)(base_cardvue_type_script_setup_true_lang_js, [['__scopeId',"data-v-22849fe0"]])

/* harmony default export */ var base_card = (__exports__);
;// ./src/assets/seito-black-logo-big.png
var seito_black_logo_big_namespaceObject = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAVUAAABRCAYAAABi6jWMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAABrsSURBVHgB7Z15sGVXVca/nud0CBmaTux+hHTEEDACCgGFOBApEXBCpbDKaBVa/oGW4j9SpWhZpeVQlghqlYoDSiGDBBlKBmO6RQhDJMEIEkLC7UxNQjqdTs9puuP+9dor9/TlDfe+t/c59963vqpV5433nLPP2d/+9lprr71CgUAgEGhiY7I1ya7IX1+cbGW2U8lOJ7sr2YFk9yQ7nuyk//NqBQKBQKCJDck2J7s62fnJvkvGlRAtBAqpfizZnckOyoj2CVJdoUAgEAiAc5N9e7LvSfZtyW6RqdH/kREptkrGm8+TEe/Tku1J9oX896FUA4FAQKZCtya7LNmlyS5IdijZQ8nukKlRzN0AT0/2pGTbkl2Y7Giy25KdDqUaCAQC5j9Fnb4h2ZuT3Zhse7K1MrJ9PP/d/mSPyQgUUsXfel2yFyZ7VbJjbSlVyHt1Pq7U3G4HLvxUPn5DgUBg0uBKzqfJc/X1wX7+uLoFflOu+aZk9yU7LCPac2TXBpFyrTtkbgAI9Uiyfcm+kmxLsucmu78NpeqNvDFf9Jp8XDnwd97Ix/PFu0O468YOBALDY52sf2/IRxdTDvoz/fpEPh5RX0x1iQ8n+2qyt+YjivR62dT+bhnJYt8qI9AHku1O9pfJnpNsZ7JXJ/tCKaW6XtaYT5WR5858Mdj2/Ducuk6qgw0NBkkVH8WBbHfk778oewgP5b9r60Fw/dzjbIPBNIB2PCaLYA7bpjw/RvE1Kg863GPZ5htUOff6fJzG5zIfICSel7dVG/A+i0pjWrxLNjWmv2/LPyda7v2Ffr5Ks/d1J1WIir58v0whPqx+VH2f6t+fvz/nydKjbpdxjYNzf0RGrBj3Csf9QbK9svvn2Ev2G8n2lyJVTzcgekZHQyJ/SzYcv01SXavZSdWja96I3BijwYP5ZzTyvflvZvv/mvDBYFo7L4OYT29GAe2xTuVxeshrWan+c1luQVcf/NoiVAf9jj4MGRHMuUj94A6E6iLKRchCSpVgEELpyflzN8lU4qn8vydVF9631+brPDTwe9oXHoJQmeYzAECq56ifz/po/jnXvn4pL+Kzkl2e7BpZGsIlyWa0dGxpfH1ZPv5oPvJAUK6QK47kryf7K9mNH1Q9vDzZT8nu81xNH3hZ3pLsE7Kk5oXgL+Lfy3L5SoNp1/uS/YfOVg2DeLYsSIAva0bLC6ijz8qewU2qC8jjWhlx8rxpb1TpVi0em/Pxgnx8pqyfAfo5zx3leEc23om9+WclwfkZDHjv983ye8j2O2SDBRF/z13dnexW2azZ3ZRc24OjkCofviZ/OKMQDYsUJvp1Xv5ZG6BD80AuyUcczIx0PRmxPqLyftgVOtt1MW1wNTGq+nclUhqzTRlngwc+V2v5KVXud76g71KBuKF/QToQ6JWyPsf37jetCT4fMkfB4ppC0KCKt+bvIUCPuywV8MV87Yh/GBXqbcLXcM1Rnc01Z/rQKC+i52S9VjZiXav+S90WON/WbJfmn71S5o95f7bPy6YMJYkVMuUB06DnaPrAS8KgOcqz5Fn4NKg0eImH8dWuVn/1yzQ+l/lA23swqDT4TFSZzwQgtl1qD7xbiLQd2QCzVcQTifb/nezdsin5US0NkDKuhrkEEz9HOPKOIR5J9ocL3y7zAZ8e+NtVC5EqN8eoRA7Wd2bblT98XHyL3OxMslfIfLjcKBE53ARHFAgEhgVKEBJ7icy1hyFeNqh7eEYBU3GuEeVMAAkX4Afz3yxGSDGzRfFy77gVVwx8Dq5F3Cz35N8TyGIAf2m+pj3qq1x4cfOwpOq+hB9U36E7LlifDR8vNwWZvkc2RQhSDQSGB2QBudDPd2YbFyDi4CIIFeVIoj5TcPysH9LiZ6YoXUiVe980y++Z9fZkfl1iDwSyEHK/luzL6otLn7ltnItU3b/2SzIVeJ1slFir8cZTZC/F3yT7XLI/lKVo7FcgEJgLz5C59t4kmwLv1Hj7qJ1gf0aWRQDRoiD/TiakRsmI8OWnn5EJspfJ1vAz44VwPRPFSftw/v5IPsKJL5K5BT6a7CtzNRzKz/NNMXwqk7CkdVU23ADcNI51GozGKuHQDgSmCeuyIURmZAqQ/tNW0HmxcC7akG0mf08QnRRMhNSw+dZOlvvy13zG3vwZ9+fP9xxu5SOkjisAheu+1ovy3z88F6kSUX+xLCg1iSlERCiJ1P2tTLViEGvbOX2BwDgDdUXAmTXrZPOM+0x0LnAPiKgXJPtjWVk+cktHWRz0ezJ/Lev+Ue03J/ttGaE2BdnD+UjgjJRP0sCIOdGW+FlPDZLq+vyBz8wXWCOxuy1wbwwITG3wEdHQjGJdL4cLBMYBxCAgke9VX6FOMhgQWMFJ2T6yg94pS8o/NuT/ozrvzf8Hd8B/CDPIGtfCCfV9r/yeFC9m8O56wGVwJutoNlJlqamT6rhPA+aDkypRQmS9J+oGqQYCRgrMSL9P/dVPkwzSmZxUyVq4QUZyiyHVn5UF5mdkwbDH8xFjAMIl8KrG/5Je9Zl8vrOc0fgJCPS8JtlVMp/qJPhRF8KMbAUEq4W25GMgsFyBaCLK/XqZmwyCmKal15Ae/s3rZDPTP1V/C5SFgBoldeqfZCv6iMlA1kzt12Y7mj/vXbKgFX5U8mWfyDRqkiqjFcqOKiw09qSPXA5fAcHLhFL1gSKqXwWWE/y9Z7rK9Jh+7oHdaYKnRSEMveDJUQ23SADiRdmSPkW7EN1nuu9FYiBVyBNFSnoVOa735r97grSbpMrqCfwsz9F0Lfnz9LBrZEr8X2UjTdRrDSwnQAgQwy/K+voku/aGAW4NgkqsviJ5/+YR/vcb2W7J3+8Z4X/PIk8IB8drjfJ2XCAq0atNEYU/3bgGHjhLv5iKbFWd0ZPR5kA+D/6TRxQILB/gb0Sl0seXUghlksDAgWL9mmwPKfp99Rlqk1Spcj2j8mkV3ARymQgZPg5WIUCsEK2v8d2az0+OGIGlGqR6ST4fPhcWAwSpBpYTCN58v2x15DZNPxCGiDRSn0iv+rRM2FVPq2ySKsu+zlc5+EqFf5SR2G7ZSAGhejHkZvUnV6pMTcj/Yv2x+0NLwJOaGbkg9p66B/4Z1DOJxzVLFy4EVo/gcF9qcYrA+AFyIUZCtJ98ztqFZ9h5FBL7P5lw4b32XE/vg16vg6/J7VyjfinAkuDeCU6TOvYTssj+A6qMwel/yUR/r/7CCEF0jCVcw0hv1Cy+3efLGrsUqXodAxTrQxoPMGpCqj3ZFKUrPKhYHDGtgMiYCfLek7NdO8GfwZnapNTCRSzwXns5Ti/biXhD3MA3LPH0Ival4TNhVlgSK4KDWiXVq1Q2QIX6Ifr2b7KGHdaXAQmzbQp5pa/NVgoo4R+WNfb71X0GAGT2X8neluxTCowKlD4pMOepXPEcOqAX6SkJ3zZkn8qAqDP3vtB9o0xJn4JUagSnfD85ZqS8w++V3etc8Ij5rfn7f5C5/t4oI/3tKg9cHmT/XJ/PX1XAOIn6bqclA1R8HiOQ1ykcJdqOwmU1BFOHAypXFBcl5oV9V6m/L1ZgMsG0ElXE+1Wqo/CuoaRKExDvM2QzShR6PnC/bFA3X2zA6x1zP6VmfE3QdyB1UpB6+ZpGne3gCqRtCCQxVfe6xSUFnhcyxw3yFLVAqh7t36iy4PN4mDQU5Hh8hP/Ft0dgC/8MKRH4WEtsMOd+HaZAG9RP5A1MJr6YrSTeIVM256ksuM7/Tfarag/0Gab+1PGoUROV/sQg8ReyfrpXo4OBhrb5zWS/LOuTrOYsSaq+j9l3y/joFlXEYrfRGAab8uf/pEzuMz1ArZ4Y4TM+KfOB0BAllCovASMpI1WprRgCgXEFARqqzJVWfg76J+46iHUpcQr6If2RvbZwj1AIH0FWeiC4Ih8RVR5IL46aSf5eVowHSwOx/QENNwqp3pktEAiMDtIHCVDVKoxE38T9creWBtwICC5Pu2Rmiy+4NKnCQ83iMdVI1Rkb2Y0boLQv6RqZ34Q8uZ5sdCM4g6+UBgyfZiBQBwiap6o8nIz+XNaHS4EZJNujUFGOfPWXqCzIz+XaKRhFmmcVwQapOqmhImukW+BbhVRZzYHMJysAic/D8PW1J9Xfe9437QuyDQQWB3fp+SaZpeErk5jyD1sFahiczgY/bFefA0q5Jz0nHhV8WJXQnP5/KZ/sSpWHV3rBWNXhASLOyejk9QhJEfly/v0hBQKBxYDpPlNn+vIOlQeJ/Z5fXQP/Ist3/RGV3QYdHiI+Q0Hu21Q+yHkGzYslPYOSWTVIdRBntnKVjUaMpKxHZppCagWNyShCgIqREJkO8eKL9W0SpiVJnWAePi92qa2R/DwbaEOitLT1SQWmEcw4eZ9YpVhj546eLPhcC55KiW1W2b4B71AHodrKsiap9tTelNvToy7Ox8sbvyPv7lC+ntuzkSgM0TLVgFynhVRxjZBsTrHgS9QOyCkkt7C5705guuCkSlpYjel/T9YvawEOYPCHVH0VVinweYjHVkiV3UfxlfjGVl3VWaQBmbpw0+Snst2DqyrU9IF8hGhpfPLjGAwmMT2Ke+UeechtERxpK9SCZCYQa/2nE8yAUGOQa41+3JO5AGqBvsy76Qs7LlA5wG3MkEvnIT+BJqlCUKhBbqjLiv+r1V+N5aOsp1wwnYEMeFlwZvvqqEmFVxNva+oP8FlPW7X3wNmg/5DFUysHHcJ7VPXg/X3U7aaHgVevqpZO2vxgCrEiuXfLAkqXaXzAi4HLYFc2Vkb8fP4dwS3SMD6e7COy5W74ZaMIdWC5gmAMaqwWceBPvUN1gcD7vCze8gyVA8p9W/5cFD3uxKJc0Wx0RgfUKktD8fXN5AsYdyXItTLVoXQhQSy2iWCFB0qWgIynaQQCywU+0ysN+hEEVG01UgOcBzU8ymKhYeB1ThBp69Sv8l8MTVKlwfBXfkDmzyRxuEYRhtJ4cj4S6GELBe7jrbKUCZbGPqYoaRdYXoAwamzcCfkQ4PR88prg83H1lao+1gQuN6/rekKFiXtwesAN4HPbo/66fR7OpGwO5sVhfkC2auJS2daxrE9eTAWdQGAS4UWDSpMq6hQCamPmx7lwAZTus16hzrdxKh5bGCRVRiJGB/wlBImoPVqjuk0tuGMevyvpWkQNeQm4H/zFQaqB5QAnjtKk6lsjtZF66UVWasRGPLupdLnTM5jLkX1zNvJFqXLzBtmUonbV8JJAYeNf/fVkr0v2u7L0qxsVCEw3vH7opKPWcnVvnypKdaEPZDUTa/XxTxJR971mJgnegCTZs8gAsq1VtScQGAfUzNtuO3Bd43zePqdVgbQXGs1IUcKhS2mvl2djWj1JLgEvUPtq2X38pyzLodS2FoHAuMGXctdQeW2Saq1catrHCzgVH3wWIlX3obCC6QYZEbErI+uJr5YpvknIEAC+ygQ/MbmsVMmqMlIFAh3Di7GXfrfxQ9Ln21g4wrmYVZZ2OdImnZKq8sl7MkKlDipVplhWyZYTJBlPCqnygHgZUNs8qH9X5K8GphOQRo2Akq/UaoNUOQfcUmIbpUF0TqoOz037kPqkxCZarHZgO+kZWRpTrT28S4AXgl0l9+cjewZFicHAtIGoOTnnpQnDl3huyVaz73AeyhaWLgjDQENsiPRR2qh4vu0opOqROE+W9eLSKMBt+W8oUrAuHz1lYd3AubpeoQWx8kL4NXaJxxvHttwQ4fKYfrhSLQ3vu21kAtVco++rqGinTpXqIGD7XrYP55+RbI+/9dmyaDuGevUSdzyMGnuPjwIeFiMgBXCp1vSIuoP7vtosw3dQlaY9gbGB1yOutZSU2ASplvtVD/AE9UdKV5OiTajT7P2gOEqPAshpCIIyghAW0p3VTDQQRahxC7CslA24ULCX5WPp7bEXwuZ8PfhsUKtdbVMNofdk9RbuUTu4M5+r9JrqwPiAZ+ukgSIr3c8hVUTS51QPa/N5SsdsEBMsBKqx/PUMapAqaKYr+ZI5VjlBqIxwJOVTXwByheDaJlWm/6hq30a7S1JlS4frVfcFbQJ/W42SaoHxAaRKMRKPg9Qg1RrbtDhwM9QiVfo6pNrKHlW1wMjAg0UhUTKM4rbkikK2b5MRHI03I8sqeJFseenFqgff/Itze1GFLsADRtmjKpayb/qo5wy/6nTDA1X0NwjqaSqLq2QFjN6sOmCG69tJ11CqpIiW3AX2LLRBql5w1ovODsJJ1Qvf4o+tnT2AX9X3yepyOZ/nzKEoYjoeKAUPVDFgH1d5EDepGXBGpfrmhaX7J20DD1WLYYzD+uBD2XwP7rfIKvxDri/LxlS95LVCpusbFghME7zcJUWemQWVLPIM2BwUQUBMhL77gMrilbLSo1tUFgg7pv2fVcUVlRCVR9hKJdm6MqXU3r789ahTTUZYag3cmq/xx2WjY9u+10BgkgHZ1RINKFWEz90qR6q+pxbuihobYTIAEMdgp5Bq28FAWOzk+TyV213Qp/lUg2KUXMzFM2XB93pf/hyuEWIOUg0EhgdB0GMqD19RhdjZnexTKgP6Nz7UF8uyc0oDQkXskZlULTgNqbKXDdODnSoDyI+pB6MCoxirlhbrv/B6ir4tSqngVdPPG9s0B6YVX5LFKhA5NRL2UaqIJgJXpOktJW8VombKz7ZIrNQsPfUHkClirWpNWEiVqT9kVXKjPwiQ2qVE8JDziyUu9w3xsEo2crP0VyTBB6YVvvMw4sTTlEpiRzZyVpeavcL1zcgKNhFTqVEJj1SqmosizgBSRQ5TGf/pKgdGHapYkZd6dz7HQY0OCJkRFtLfrnJwh/UhVcxXCwQ6BoKEKS8rHlnZ+CyVBX0T19yfJHuXLNf6Y+pvdT8MIE8E3Wtk034v1FQyu8DzdT+gFvLBIVWmBjUiYeSa4VKgkagNgHL1vMyF4FtSk68KMZO/eq7KgQaGUNvYwGw+MGjgy6Z9LlX3eDRbW1tmBOrCa0qw79x29Z9pKcLic3wBza78Pbmx5MgSDDqZzfOifbujVQP/h9K9Mh9LEyrABcLgglKtlp/q4Kbwu6DcfkFlcWG2N8oi+b8luyl8Lwsln0OouA7YHZVSg/hZSuauQqgkANfYAncU4HrBn01bXK3uQVFyght0iK5WmQXKgnf83TJx8kKVL6XnReAJWvEe41/Fd/lB2XuEHVefVL0GMySKoHh9/r5GYMoB5xDb6aluvYIzgFTxMUBykIsnxZcETmca7edkDYyr4aF8vuZiAE/G5+EzWpFWAZmidHkQJUcvRi0c1kfVLZj6oFJp95ov1bCAUAkKtrW6K1Af9G36HXngtyS7QnWCQN4/mcrTh5lZHsx2JF9Hs3Qg7z3pXgivWhWvvMwfJL9bLRVPcp8qJ2Mq7D7MkqDxmL6Td4Zipeo+05HBpGHfO4qHwrSfyCIjWel6ioAHDalWK6owJDaoT6zjAHxvDIBtFCEOtAOvynSXLO+bwFItUvWdjAG+1mPqL8OGVL2aP4S7RvXLgDqpIuT2aHFxnZHhPlUU2ztkxPdDKg8aD/LAx4pvh2n9KZ09xfSH4qReo8I4jcxUBL8P9QciSBVYLviETEjgu6dfXaT6oA8jlJo58Jy7rZrKiEXqE3xcNqi04tKCVN2ZTaI9DYB/daXKE5oTZo3tEUbBYfUj/5GjGlguQLER0yAb5yK1Q6oulLqY+RzNhj+V+26trzfX0/+1LPmWKlHI8ydp+gCZUmbvJplaDQSWC45no5+/V7Yt0jRjtyw+8HaZUGwNTVKF1fGvUmwAZzaSvU2pXhsQKr4lnPVfVSCwPEEcA9V6syz7hADptPRx4Bk9pHAinFrPYmmSKk5cpgbvTPZj6lflnxYwBWDkQqnWWA8dCEwCevlImhXBYOIc0ySePI3rn2UisVWVCgbL6UGsBHBoYEjopzUeG+QtBV6rlEZm9CIxOXIwA8sdBKZvl/kanyuL2k9yP0cooUyZ7sNhBKY6iZkMOpC5CKbIBK24qDZ3+awF3+MbhzVK/DEFqQYC96jfJzw5f5JBnyb4TPoUif6d9fO5Cj+zWR++VXLLZpK9TnUyAmrCl8S+JxvlyR5WIBBwkLdK3jh9g5V9vyPr4+NQvH4UUG+AlaG/L0uj6tS9N1/jMXLh1MYVcJssIZ/VD20k7S4VnnDMqIXiZmlarGcPBL4ZCCePp7CrL4s/8LOOQ/rjXPAqc/hMce3BT3vz153PQuciVZ/248wmaR9yekU2lqDVWlZWCizJ4wX5I1nDf02BQGAQXvrS4yiIKHyrvyKrvXG+xhO483BZEHSGTP9Mdh+tB6Vmw0Iynwv1vW64CdKRrpUFr56vOstaRwXk71WnIH+Wwr5P9oIw+kakPxBYGPQjaj/QZ0hL8lKBBLHIAqqxXHwUeG1llrizlv/TsjJ+xIDGgkwdw/hOICwCVzQ00UKU6owsHQPFOg5TBMifPFtIlUb/qCzKH3vbBwLDgxKgCCXK4+ESQL2SWrlV3ZMq03qEnbspqIJFoG3sRNMoDmmS57mBN8lcAkhv6h8ykuHk3pa/X6F6jm7fqoV6BXfl67lBlpfGKilGLRRr6cIJJ/Jn4pud5swB2pP7G8b3zN8QFKhR0cpr3XbhA+c9r3FfiJKuq6INA4+i35jsk7Li0xDqS2V9nJJ9FGWBAzapDlCevIv0673ZKIgC6d+af0dbjuWuHaOQX3NfJ0gNCc7IwcjGDeJ/IbqOcmU11jqdvXf3KH5YJ8+T+eid/VD+GnKDVOkAjFp0gr35+xrqlA6GSufeS9Z1HTf01C/TNh88UEDEtUZuIz5x3qUupnU92XtduoIZbXWnJgM+88PIBqA/4wJEwR7OR6pNUdaT508fp6/Tx9fnnw0bzPbg0tH8Nf2XAYi+Tp++LxszUGIjpbfDLo5SUXyIFOJ8gewBoFwvzoZvhka/cMhz0mFpXIjTG5EXkoeJzweCY5kpvtPjagcbs3Gf01wWj5fZN1tcSCXyHHEF1Vh15yXjusifJF7Au1zarcU7Tbu2UtOzErxACrWOUanEVXgHWOq6I399ueydGLb9SNiHQOnjnqmDUIK4Sffy3QMmBqVI1Ucmpv80KARKzcZz1E/D2jTkOelEPnJ5RSmIlBHs6+pvjcCDaEvJeHrJNC3nmw0+Oxh2WsVAU0Op+i63w7oiSgIBUCMnm3uhXdsSArXA+0+xJVQppUK9PiouAtoOYmVQGva9wK3Ge0cfp18zQ0BI0c8hVm+3icH/Ay/1XN/C9qbuAAAAAElFTkSuQmCC";
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/sidebarMenu/components/SidebarLogo.vue?vue&type=script&setup=true&lang=js

const SidebarLogovue_type_script_setup_true_lang_js_hoisted_1 = {
  class: "sidebar-logo"
};
const _hoisted_2 = ["src"];


/* harmony default export */ var SidebarLogovue_type_script_setup_true_lang_js = ({
  __name: 'SidebarLogo',
  setup(__props) {
    const logoImg = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.ref)(seito_black_logo_big_namespaceObject);
    return (_ctx, _cache) => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", SidebarLogovue_type_script_setup_true_lang_js_hoisted_1, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("img", {
        class: "sidebar-logo-img",
        src: logoImg.value
      }, null, 8, _hoisted_2)]);
    };
  }
});
;// ./src/components/sidebarMenu/components/SidebarLogo.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/sidebarMenu/components/SidebarLogo.vue?vue&type=style&index=0&id=3a267cb8&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ./src/components/sidebarMenu/components/SidebarLogo.vue?vue&type=style&index=0&id=3a267cb8&scoped=true&lang=css

;// ./src/components/sidebarMenu/components/SidebarLogo.vue



;


const SidebarLogo_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(SidebarLogovue_type_script_setup_true_lang_js, [['__scopeId',"data-v-3a267cb8"]])

/* harmony default export */ var SidebarLogo = (SidebarLogo_exports_);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(4114);
;// ./src/utils/validate.js
/**
 * 判断设备是Mobile Device / Desktop Device
 * Check if the user is accessing the page on a mobile device
 */
function checkDeviceIsMobile() {
  // const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const userAgent = navigator.userAgent;
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isMobile = mobileRegex.test(userAgent);
  return isMobile;
}

/**
 * 判断是否为空
 */
function validatenull(val) {
  if (typeof val === 'boolean') {
    return false;
  }
  if (typeof val === 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
    return false;
  }
  return false;
}
let validateInteger = async (rule, value) => {
  if (!value) {
    return Promise.reject('不能为空');
  } else {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue) || intValue <= 0) {
      // return Promise.reject('请输入大于0的正整数')
      return Promise.reject('錯誤 - 輸入資料不正確');
    }
    if (value.includes('.')) {
      return Promise.reject('请输入正整数');
    }
    return Promise.resolve();
  }
};

/**
 * 只包含大/小写字母
 * @param {*} str 
 * @returns 
 */
function isLetter(str) {
  return /^[A-Za-z]+$/.test(str);
}

/**
 * 字符串是否包含字母和数字
 * @param {*} str 
 * @returns 
 */
function containsLetter(str) {
  return /[A-Za-z]/.test(str);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.every.js
var es_iterator_every = __webpack_require__(1148);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.filter.js
var es_iterator_filter = __webpack_require__(2489);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.find.js
var es_iterator_find = __webpack_require__(116);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.map.js
var es_iterator_map = __webpack_require__(1701);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.reduce.js
var es_iterator_reduce = __webpack_require__(8237);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.iterator.some.js
var es_iterator_some = __webpack_require__(3579);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.difference.v2.js
var es_set_difference_v2 = __webpack_require__(7642);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.intersection.v2.js
var es_set_intersection_v2 = __webpack_require__(8004);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.is-disjoint-from.v2.js
var es_set_is_disjoint_from_v2 = __webpack_require__(3853);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.is-subset-of.v2.js
var es_set_is_subset_of_v2 = __webpack_require__(5876);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.is-superset-of.v2.js
var es_set_is_superset_of_v2 = __webpack_require__(2475);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.symmetric-difference.v2.js
var es_set_symmetric_difference_v2 = __webpack_require__(5024);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.set.union.v2.js
var es_set_union_v2 = __webpack_require__(1698);
;// ./node_modules/vue-router/dist/vue-router.mjs
















/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */


const isBrowser = typeof document !== 'undefined';

/**
 * Allows differentiating lazy components from functional components and vue-class-component
 * @internal
 *
 * @param component
 */
function isRouteComponent(component) {
  return typeof component === 'object' || 'displayName' in component || 'props' in component || '__vccOpts' in component;
}
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === 'Module' ||
  // support CF with dynamic imports that do not
  // add the Module string tag
  obj.default && isRouteComponent(obj.default);
}
const vue_router_assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {};
/**
 * Typesafe alternative to Array.isArray
 * https://github.com/microsoft/TypeScript/pull/48228
 */
const isArray = Array.isArray;
function warn(msg) {
  // avoid using ...args as it breaks in older Edge builds
  const args = Array.from(arguments).slice(1);
  console.warn.apply(console, ['[Vue Router warn]: ' + msg].concat(args));
}

/**
 * Encoding Rules (␣ = Space)
 * - Path: ␣ " < > # ? { }
 * - Query: ␣ " < > # & =
 * - Hash: ␣ " < > `
 *
 * On top of that, the RFC3986 (https://tools.ietf.org/html/rfc3986#section-2.2)
 * defines some extra characters to be encoded. Most browsers do not encode them
 * in encodeURI https://github.com/whatwg/url/issues/369, so it may be safer to
 * also encode `!'()*`. Leaving un-encoded only ASCII alphanumeric(`a-zA-Z0-9`)
 * plus `-._~`. This extra safety should be applied to query by patching the
 * string returned by encodeURIComponent encodeURI also encodes `[\]^`. `\`
 * should be encoded to avoid ambiguity. Browsers (IE, FF, C) transform a `\`
 * into a `/` if directly typed in. The _backtick_ (`````) should also be
 * encoded everywhere because some browsers like FF encode it when directly
 * written while others don't. Safari and IE don't encode ``"<>{}``` in hash.
 */
// const EXTRA_RESERVED_RE = /[!'()*]/g
// const encodeReservedReplacer = (c: string) => '%' + c.charCodeAt(0).toString(16)
const HASH_RE = /#/g; // %23
const AMPERSAND_RE = /&/g; // %26
const SLASH_RE = /\//g; // %2F
const EQUAL_RE = /=/g; // %3D
const IM_RE = /\?/g; // %3F
const PLUS_RE = /\+/g; // %2B
/**
 * NOTE: It's not clear to me if we should encode the + symbol in queries, it
 * seems to be less flexible than not doing so and I can't find out the legacy
 * systems requiring this for regular requests like text/html. In the standard,
 * the encoding of the plus character is only mentioned for
 * application/x-www-form-urlencoded
 * (https://url.spec.whatwg.org/#urlencoded-parsing) and most browsers seems lo
 * leave the plus character as is in queries. To be more flexible, we allow the
 * plus character on the query, but it can also be manually encoded by the user.
 *
 * Resources:
 * - https://url.spec.whatwg.org/#urlencoded-parsing
 * - https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20
 */
const ENC_BRACKET_OPEN_RE = /%5B/g; // [
const ENC_BRACKET_CLOSE_RE = /%5D/g; // ]
const ENC_CARET_RE = /%5E/g; // ^
const ENC_BACKTICK_RE = /%60/g; // `
const ENC_CURLY_OPEN_RE = /%7B/g; // {
const ENC_PIPE_RE = /%7C/g; // |
const ENC_CURLY_CLOSE_RE = /%7D/g; // }
const ENC_SPACE_RE = /%20/g; // }
/**
 * Encode characters that need to be encoded on the path, search and hash
 * sections of the URL.
 *
 * @internal
 * @param text - string to encode
 * @returns encoded string
 */
function commonEncode(text) {
  return encodeURI('' + text).replace(ENC_PIPE_RE, '|').replace(ENC_BRACKET_OPEN_RE, '[').replace(ENC_BRACKET_CLOSE_RE, ']');
}
/**
 * Encode characters that need to be encoded on the hash section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, '{').replace(ENC_CURLY_CLOSE_RE, '}').replace(ENC_CARET_RE, '^');
}
/**
 * Encode characters that need to be encoded query values on the query
 * section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */
function encodeQueryValue(text) {
  return commonEncode(text)
  // Encode the space as +, encode the + to differentiate it from the space
  .replace(PLUS_RE, '%2B').replace(ENC_SPACE_RE, '+').replace(HASH_RE, '%23').replace(AMPERSAND_RE, '%26').replace(ENC_BACKTICK_RE, '`').replace(ENC_CURLY_OPEN_RE, '{').replace(ENC_CURLY_CLOSE_RE, '}').replace(ENC_CARET_RE, '^');
}
/**
 * Like `encodeQueryValue` but also encodes the `=` character.
 *
 * @param text - string to encode
 */
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, '%3D');
}
/**
 * Encode characters that need to be encoded on the path section of the URL.
 *
 * @param text - string to encode
 * @returns encoded string
 */
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, '%23').replace(IM_RE, '%3F');
}
/**
 * Encode characters that need to be encoded on the path section of the URL as a
 * param. This function encodes everything {@link encodePath} does plus the
 * slash (`/`) character. If `text` is `null` or `undefined`, returns an empty
 * string instead.
 *
 * @param text - string to encode
 * @returns encoded string
 */
function encodeParam(text) {
  return text == null ? '' : encodePath(text).replace(SLASH_RE, '%2F');
}
/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */
function decode(text) {
  try {
    return decodeURIComponent('' + text);
  } catch (err) {
     false && 0;
  }
  return '' + text;
}
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = path => path.replace(TRAILING_SLASH_RE, '');
/**
 * Transforms a URI into a normalized history location
 *
 * @param parseQuery
 * @param location - URI to normalize
 * @param currentLocation - current absolute location. Allows resolving relative
 * paths. Must start with `/`. Defaults to `/`
 * @returns a normalized history location
 */
function parseURL(parseQuery, location, currentLocation = '/') {
  let path,
    query = {},
    searchString = '',
    hash = '';
  // Could use URL and URLSearchParams but IE 11 doesn't support it
  // TODO: move to new URL()
  const hashPos = location.indexOf('#');
  let searchPos = location.indexOf('?');
  // the hash appears before the search, so it's not part of the search string
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location.slice(0, searchPos);
    searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length);
    query = parseQuery(searchString);
  }
  if (hashPos > -1) {
    path = path || location.slice(0, hashPos);
    // keep the # character
    hash = location.slice(hashPos, location.length);
  }
  // no search and no query
  path = resolveRelativePath(path != null ? path : location, currentLocation);
  // empty path means a relative query or hash `?foo=f`, `#thing`
  return {
    fullPath: path + (searchString && '?') + searchString + hash,
    path,
    query,
    hash: decode(hash)
  };
}
/**
 * Stringifies a URL object
 *
 * @param stringifyQuery
 * @param location
 */
function stringifyURL(stringifyQuery, location) {
  const query = location.query ? stringifyQuery(location.query) : '';
  return location.path + (query && '?') + query + (location.hash || '');
}
/**
 * Strips off the base from the beginning of a location.pathname in a non-case-sensitive way.
 *
 * @param pathname - location.pathname
 * @param base - base to strip off
 */
function stripBase(pathname, base) {
  // no base or base is not found at the beginning
  if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase())) return pathname;
  return pathname.slice(base.length) || '/';
}
/**
 * Checks if two RouteLocation are equal. This means that both locations are
 * pointing towards the same {@link RouteRecord} and that all `params`, `query`
 * parameters and `hash` are the same
 *
 * @param stringifyQuery - A function that takes a query object of type LocationQueryRaw and returns a string representation of it.
 * @param a - first {@link RouteLocation}
 * @param b - second {@link RouteLocation}
 */
function isSameRouteLocation(stringifyQuery, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams(a.params, b.params) && stringifyQuery(a.query) === stringifyQuery(b.query) && a.hash === b.hash;
}
/**
 * Check if two `RouteRecords` are equal. Takes into account aliases: they are
 * considered equal to the `RouteRecord` they are aliasing.
 *
 * @param a - first {@link RouteRecord}
 * @param b - second {@link RouteRecord}
 */
function isSameRouteRecord(a, b) {
  // since the original record has an undefined value for aliasOf
  // but all aliases point to the original record, this will always compare
  // the original record
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) return false;
  for (const key in a) {
    if (!isSameRouteLocationParamsValue(a[key], b[key])) return false;
  }
  return true;
}
function isSameRouteLocationParamsValue(a, b) {
  return isArray(a) ? isEquivalentArray(a, b) : isArray(b) ? isEquivalentArray(b, a) : a === b;
}
/**
 * Check if two arrays are the same or if an array with one single entry is the
 * same as another primitive value. Used to check query and parameters
 *
 * @param a - array of values
 * @param b - array of values or a single value
 */
function isEquivalentArray(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
/**
 * Resolves a relative path that starts with `.`.
 *
 * @param to - path location we are resolving
 * @param from - currentLocation.path, should start with `/`
 */
function resolveRelativePath(to, from) {
  if (to.startsWith('/')) return to;
  if (false) {}
  if (!to) return from;
  const fromSegments = from.split('/');
  const toSegments = to.split('/');
  const lastToSegment = toSegments[toSegments.length - 1];
  // make . and ./ the same (../ === .., ../../ === ../..)
  // this is the same behavior as new URL()
  if (lastToSegment === '..' || lastToSegment === '.') {
    toSegments.push('');
  }
  let position = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    // we stay on the same position
    if (segment === '.') continue;
    // go up in the from array
    if (segment === '..') {
      // we can't go below zero, but we still need to increment toPosition
      if (position > 1) position--;
      // continue
    }
    // we reached a non-relative path, we stop here
    else break;
  }
  return fromSegments.slice(0, position).join('/') + '/' + toSegments.slice(toPosition).join('/');
}
/**
 * Initial route location where the router is. Can be used in navigation guards
 * to differentiate the initial navigation.
 *
 * @example
 * ```js
 * import { START_LOCATION } from 'vue-router'
 *
 * router.beforeEach((to, from) => {
 *   if (from === START_LOCATION) {
 *     // initial navigation
 *   }
 * })
 * ```
 */
const START_LOCATION_NORMALIZED = {
  path: '/',
  // TODO: could we use a symbol in the future?
  name: undefined,
  params: {},
  query: {},
  hash: '',
  fullPath: '/',
  matched: [],
  meta: {},
  redirectedFrom: undefined
};
var NavigationType;
(function (NavigationType) {
  NavigationType["pop"] = "pop";
  NavigationType["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function (NavigationDirection) {
  NavigationDirection["back"] = "back";
  NavigationDirection["forward"] = "forward";
  NavigationDirection["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
/**
 * Starting location for Histories
 */
const START = '';
// Generic utils
/**
 * Normalizes a base by removing any trailing slash and reading the base tag if
 * present.
 *
 * @param base - base to normalize
 */
function normalizeBase(base) {
  if (!base) {
    if (isBrowser) {
      // respect <base> tag
      const baseEl = document.querySelector('base');
      base = baseEl && baseEl.getAttribute('href') || '/';
      // strip full URL origin
      base = base.replace(/^\w+:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // ensure leading slash when it was removed by the regex above avoid leading
  // slash with hash because the file could be read from the disk like file://
  // and the leading slash would cause problems
  if (base[0] !== '/' && base[0] !== '#') base = '/' + base;
  // remove the trailing slash so all other method can just do `base + fullPath`
  // to build an href
  return removeTrailingSlash(base);
}
// remove any character before the hash
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base, location) {
  return base.replace(BEFORE_HASH_RE, '#') + location;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function scrollToPosition(position) {
  let scrollToOptions;
  if ('el' in position) {
    const positionEl = position.el;
    const isIdSelector = typeof positionEl === 'string' && positionEl.startsWith('#');
    /**
     * `id`s can accept pretty much any characters, including CSS combinators
     * like `>` or `~`. It's still possible to retrieve elements using
     * `document.getElementById('~')` but it needs to be escaped when using
     * `document.querySelector('#\\~')` for it to be valid. The only
     * requirements for `id`s are them to be unique on the page and to not be
     * empty (`id=""`). Because of that, when passing an id selector, it should
     * be properly escaped for it to work with `querySelector`. We could check
     * for the id selector to be simple (no CSS combinators `+ >~`) but that
     * would make things inconsistent since they are valid characters for an
     * `id` but would need to be escaped when using `querySelector`, breaking
     * their usage and ending up in no selector returned. Selectors need to be
     * escaped:
     *
     * - `#1-thing` becomes `#\31 -thing`
     * - `#with~symbols` becomes `#with\\~symbols`
     *
     * - More information about  the topic can be found at
     *   https://mathiasbynens.be/notes/html5-id-class.
     * - Practical example: https://mathiasbynens.be/demo/html5-id
     */
    if (false) {}
    const el = typeof positionEl === 'string' ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
       false && 0;
      return;
    }
    scrollToOptions = getElementPosition(el, position);
  } else {
    scrollToOptions = position;
  }
  if ('scrollBehavior' in document.documentElement.style) window.scrollTo(scrollToOptions);else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.scrollX, scrollToOptions.top != null ? scrollToOptions.top : window.scrollY);
  }
}
function getScrollKey(path, delta) {
  const position = history.state ? history.state.position - delta : -1;
  return position + path;
}
const scrollPositions = new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  // consume it so it's not used again
  scrollPositions.delete(key);
  return scroll;
}
// TODO: RFC about how to save scroll position
/**
 * ScrollBehavior instance used by the router to compute and restore the scroll
 * position when navigating.
 */
// export interface ScrollHandler<ScrollPositionEntry extends HistoryStateValue, ScrollPosition extends ScrollPositionEntry> {
//   // returns a scroll position that can be saved in history
//   compute(): ScrollPositionEntry
//   // can take an extended ScrollPositionEntry
//   scroll(position: ScrollPosition): void
// }
// export const scrollHandler: ScrollHandler<ScrollPosition> = {
//   compute: computeScroll,
//   scroll: scrollToPosition,
// }

let createBaseLocation = () => location.protocol + '//' + location.host;
/**
 * Creates a normalized history location from a window.location object
 * @param base - The base path
 * @param location - The window.location object
 */
function createCurrentLocation(base, location) {
  const {
    pathname,
    search,
    hash
  } = location;
  // allows hash bases like #, /#, #/, #!, #!/, /#!/, or even /folder#end
  const hashPos = base.indexOf('#');
  if (hashPos > -1) {
    let slicePos = hash.includes(base.slice(hashPos)) ? base.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    // prepend the starting slash to hash so the url starts with /#
    if (pathFromHash[0] !== '/') pathFromHash = '/' + pathFromHash;
    return stripBase(pathFromHash, '');
  }
  const path = stripBase(pathname, base);
  return path + search + hash;
}
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  // TODO: should it be a stack? a Dict. Check if the popstate listener
  // can trigger twice
  let pauseState = null;
  const popStateHandler = ({
    state
  }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      // ignore the popstate and reset the pauseState
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    // Here we could also revert the navigation by calling history.go(-delta)
    // this listener will have to be adapted to not trigger again and to wait for the url
    // to be updated before triggering the listeners. Some kind of validation function would also
    // need to be passed to the listeners so the navigation can be accepted
    // call all listeners
    listeners.forEach(listener => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    // set up the listener and prepare teardown callbacks
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const {
      history
    } = window;
    if (!history.state) return;
    history.replaceState(vue_router_assign({}, history.state, {
      scroll: computeScrollPosition()
    }), '');
  }
  function destroy() {
    for (const teardown of teardowns) teardown();
    teardowns = [];
    window.removeEventListener('popstate', popStateHandler);
    window.removeEventListener('beforeunload', beforeUnloadListener);
  }
  // set up the listeners and prepare teardown callbacks
  window.addEventListener('popstate', popStateHandler);
  // TODO: could we use 'pagehide' or 'visibilitychange' instead?
  // https://developer.chrome.com/blog/page-lifecycle-api/
  window.addEventListener('beforeunload', beforeUnloadListener, {
    passive: true
  });
  return {
    pauseListeners,
    listen,
    destroy
  };
}
/**
 * Creates a state object
 */
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base) {
  const {
    history,
    location
  } = window;
  // private variables
  const currentLocation = {
    value: createCurrentLocation(base, location)
  };
  const historyState = {
    value: history.state
  };
  // build current history entry as this is a fresh navigation
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      // the length is off by one, we need to decrease it
      position: history.length - 1,
      replaced: true,
      // don't add a scroll as the user may have an anchor, and we want
      // scrollBehavior to be triggered without a saved position
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace) {
    /**
     * if a base tag is provided, and we are on a normal domain, we have to
     * respect the provided `base` attribute because pushState() will use it and
     * potentially erase anything before the `#` like at
     * https://github.com/vuejs/router/issues/685 where a base of
     * `/folder/#` but a base of `/` would erase the `/folder/` section. If
     * there is no host, the `<base>` tag makes no sense and if there isn't a
     * base tag we can just use everything after the `#`.
     */
    const hashIndex = base.indexOf('#');
    const url = hashIndex > -1 ? (location.host && document.querySelector('base') ? base : base.slice(hashIndex)) + to : createBaseLocation() + base + to;
    try {
      // BROWSER QUIRK
      // NOTE: Safari throws a SecurityError when calling this function 100 times in 30 seconds
      history[replace ? 'replaceState' : 'pushState'](state, '', url);
      historyState.value = state;
    } catch (err) {
      if (false) {} else {
        console.error(err);
      }
      // Force the navigation, this also resets the call count
      location[replace ? 'replace' : 'assign'](url);
    }
  }
  function replace(to, data) {
    const state = vue_router_assign({}, history.state, buildState(historyState.value.back,
    // keep back and forward entries but override current position
    to, historyState.value.forward, true), data, {
      position: historyState.value.position
    });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    // Add to current entry the information of where we are going
    // as well as saving the current position
    const currentState = vue_router_assign({},
    // use current history state to gracefully handle a wrong call to
    // history.replaceState
    // https://github.com/vuejs/router/issues/366
    historyState.value, history.state, {
      forward: to,
      scroll: computeScrollPosition()
    });
    if (false) {}
    changeLocation(currentState.current, currentState, true);
    const state = vue_router_assign({}, buildState(currentLocation.value, to, null), {
      position: currentState.position + 1
    }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
/**
 * Creates an HTML5 history. Most common history for single page applications.
 *
 * @param base -
 */
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners) historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = vue_router_assign({
    // it's overridden right after
    location: '',
    base,
    go,
    createHref: createHref.bind(null, base)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, 'location', {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, 'state', {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}

/**
 * Creates an in-memory based history. The main purpose of this history is to handle SSR. It starts in a special location that is nowhere.
 * It's up to the user to replace that location with the starter location by either calling `router.push` or `router.replace`.
 *
 * @param base - Base applied to all urls, defaults to '/'
 * @returns a history object that can be passed to the router constructor
 */
function createMemoryHistory(base = '') {
  let listeners = [];
  let queue = [START];
  let position = 0;
  base = normalizeBase(base);
  function setLocation(location) {
    position++;
    if (position !== queue.length) {
      // we are in the middle, we remove everything from here in the queue
      queue.splice(position);
    }
    queue.push(location);
  }
  function triggerListeners(to, from, {
    direction,
    delta
  }) {
    const info = {
      direction,
      delta,
      type: NavigationType.pop
    };
    for (const callback of listeners) {
      callback(to, from, info);
    }
  }
  const routerHistory = {
    // rewritten by Object.defineProperty
    location: START,
    // TODO: should be kept in queue
    state: {},
    base,
    createHref: createHref.bind(null, base),
    replace(to) {
      // remove current entry and decrement position
      queue.splice(position--, 1);
      setLocation(to);
    },
    push(to, data) {
      setLocation(to);
    },
    listen(callback) {
      listeners.push(callback);
      return () => {
        const index = listeners.indexOf(callback);
        if (index > -1) listeners.splice(index, 1);
      };
    },
    destroy() {
      listeners = [];
      queue = [START];
      position = 0;
    },
    go(delta, shouldTrigger = true) {
      const from = this.location;
      const direction =
      // we are considering delta === 0 going forward, but in abstract mode
      // using 0 for the delta doesn't make sense like it does in html5 where
      // it reloads the page
      delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
      position = Math.max(0, Math.min(position + delta, queue.length - 1));
      if (shouldTrigger) {
        triggerListeners(this.location, from, {
          direction,
          delta
        });
      }
    }
  };
  Object.defineProperty(routerHistory, 'location', {
    enumerable: true,
    get: () => queue[position]
  });
  return routerHistory;
}

/**
 * Creates a hash history. Useful for web applications with no host (e.g. `file://`) or when configuring a server to
 * handle any URL is not possible.
 *
 * @param base - optional base to provide. Defaults to `location.pathname + location.search` If there is a `<base>` tag
 * in the `head`, its value will be ignored in favor of this parameter **but note it affects all the history.pushState()
 * calls**, meaning that if you use a `<base>` tag, it's `href` value **has to match this parameter** (ignoring anything
 * after the `#`).
 *
 * @example
 * ```js
 * // at https://example.com/folder
 * createWebHashHistory() // gives a url of `https://example.com/folder#`
 * createWebHashHistory('/folder/') // gives a url of `https://example.com/folder/#`
 * // if the `#` is provided in the base, it won't be added by `createWebHashHistory`
 * createWebHashHistory('/folder/#/app/') // gives a url of `https://example.com/folder/#/app/`
 * // you should avoid doing this because it changes the original url and breaks copying urls
 * createWebHashHistory('/other-folder/') // gives a url of `https://example.com/other-folder/#`
 *
 * // at file:///usr/etc/folder/index.html
 * // for locations with no `host`, the base is ignored
 * createWebHashHistory('/iAmIgnored') // gives a url of `file:///usr/etc/folder/index.html#`
 * ```
 */
function createWebHashHistory(base) {
  // Make sure this implementation is fine in terms of encoding, specially for IE11
  // for `file://`, directly use the pathname and ignore the base
  // location.pathname contains an initial `/` even at the root: `https://example.com`
  base = location.host ? base || location.pathname + location.search : '';
  // allow the user to provide a `#` in the middle: `/base/#/app`
  if (!base.includes('#')) base += '#';
  if (false) {}
  return createWebHistory(base);
}
function isRouteLocation(route) {
  return typeof route === 'string' || route && typeof route === 'object';
}
function isRouteName(name) {
  return typeof name === 'string' || typeof name === 'symbol';
}
const NavigationFailureSymbol = Symbol( false ? 0 : '');
/**
 * Enumeration with all possible types for navigation failures. Can be passed to
 * {@link isNavigationFailure} to check for specific failures.
 */
var NavigationFailureType;
(function (NavigationFailureType) {
  /**
   * An aborted navigation is a navigation that failed because a navigation
   * guard returned `false` or called `next(false)`
   */
  NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
  /**
   * A cancelled navigation is a navigation that failed because a more recent
   * navigation finished started (not necessarily finished).
   */
  NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
  /**
   * A duplicated navigation is a navigation that failed because it was
   * initiated while already being at the exact same location.
   */
  NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
// DEV only debug messages
const ErrorTypeMessages = {
  [1 /* ErrorTypes.MATCHER_NOT_FOUND */]({
    location,
    currentLocation
  }) {
    return `No match for\n ${JSON.stringify(location)}${currentLocation ? '\nwhile being at\n' + JSON.stringify(currentLocation) : ''}`;
  },
  [2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */]({
    from,
    to
  }) {
    return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
  },
  [4 /* ErrorTypes.NAVIGATION_ABORTED */]({
    from,
    to
  }) {
    return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
  },
  [8 /* ErrorTypes.NAVIGATION_CANCELLED */]({
    from,
    to
  }) {
    return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
  },
  [16 /* ErrorTypes.NAVIGATION_DUPLICATED */]({
    from,
    to
  }) {
    return `Avoided redundant navigation to current location: "${from.fullPath}".`;
  }
};
/**
 * Creates a typed NavigationFailure object.
 * @internal
 * @param type - NavigationFailureType
 * @param params - { from, to }
 */
function createRouterError(type, params) {
  // keep full error messages in cjs versions
  if (false) {} else {
    return vue_router_assign(new Error(), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const propertiesToLog = ['params', 'query', 'hash'];
function stringifyRoute(to) {
  if (typeof to === 'string') return to;
  if (to.path != null) return to.path;
  const location = {};
  for (const key of propertiesToLog) {
    if (key in to) location[key] = to[key];
  }
  return JSON.stringify(location, null, 2);
}

// default pattern for a param: non-greedy everything but /
const BASE_PARAM_PATTERN = '[^/]+?';
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
// Special Regex characters that must be escaped in static tokens
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
/**
 * Creates a path parser from an array of Segments (a segment is an array of Tokens)
 *
 * @param segments - array of segments returned by tokenizePath
 * @param extraOptions - optional options for the regexp
 * @returns a PathParser
 */
function tokensToParser(segments, extraOptions) {
  const options = vue_router_assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  // the amount of scores is the same as the length of segments except for the root segment "/"
  const score = [];
  // the regexp as a string
  let pattern = options.start ? '^' : '';
  // extracted keys
  const keys = [];
  for (const segment of segments) {
    // the root segment needs special treatment
    const segmentScores = segment.length ? [] : [90 /* PathScore.Root */];
    // allow trailing slash
    if (options.strict && !segment.length) pattern += '/';
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      // resets the score if we are inside a sub-segment /:a-other-:b
      let subSegmentScore = 40 /* PathScore.Segment */ + (options.sensitive ? 0.25 /* PathScore.BonusCaseSensitive */ : 0);
      if (token.type === 0 /* TokenType.Static */) {
        // prepend the slash if we are starting a new segment
        if (!tokenIndex) pattern += '/';
        pattern += token.value.replace(REGEX_CHARS_RE, '\\$&');
        subSegmentScore += 40 /* PathScore.Static */;
      } else if (token.type === 1 /* TokenType.Param */) {
        const {
          value,
          repeatable,
          optional,
          regexp
        } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re = regexp ? regexp : BASE_PARAM_PATTERN;
        // the user provided a custom regexp /:id(\\d+)
        if (re !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10 /* PathScore.BonusCustomRegExp */;
          // make sure the regexp is valid before using it
          try {
            new RegExp(`(${re})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re}): ` + err.message);
          }
        }
        // when we repeat we must take care of the repeating leading slash
        let subPattern = repeatable ? `((?:${re})(?:/(?:${re}))*)` : `(${re})`;
        // prepend the slash if we are starting a new segment
        if (!tokenIndex) subPattern =
        // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        optional && segment.length < 2 ? `(?:/${subPattern})` : '/' + subPattern;
        if (optional) subPattern += '?';
        pattern += subPattern;
        subSegmentScore += 20 /* PathScore.Dynamic */;
        if (optional) subSegmentScore += -8 /* PathScore.BonusOptional */;
        if (repeatable) subSegmentScore += -20 /* PathScore.BonusRepeatable */;
        if (re === '.*') subSegmentScore += -50 /* PathScore.BonusWildcard */;
      }
      segmentScores.push(subSegmentScore);
    }
    // an empty array like /home/ -> [[{home}], []]
    // if (!segment.length) pattern += '/'
    score.push(segmentScores);
  }
  // only apply the strict bonus to the last score
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += 0.7000000000000001 /* PathScore.BonusStrict */;
  }
  // TODO: dev only warn double trailing slash
  if (!options.strict) pattern += '/?';
  if (options.end) pattern += '$';
  // allow paths like /dynamic to only match dynamic or dynamic/... but not dynamic_something_else
  else if (options.strict && !pattern.endsWith('/')) pattern += '(?:/|$)';
  const re = new RegExp(pattern, options.sensitive ? '' : 'i');
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match) return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || '';
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split('/') : value;
    }
    return params;
  }
  function stringify(params) {
    let path = '';
    // for optional parameters to allow to be empty
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith('/')) path += '/';
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0 /* TokenType.Static */) {
          path += token.value;
        } else if (token.type === 1 /* TokenType.Param */) {
          const {
            value,
            repeatable,
            optional
          } = token;
          const param = value in params ? params[value] : '';
          if (isArray(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text = isArray(param) ? param.join('/') : param;
          if (!text) {
            if (optional) {
              // if we have more than one optional param like /:a?-static we don't need to care about the optional param
              if (segment.length < 2) {
                // remove the last slash as we could be at the end
                if (path.endsWith('/')) path = path.slice(0, -1);
                // do not append a slash on the next iteration
                else avoidDuplicatedSlash = true;
              }
            } else throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    // avoid empty path when we have multiple optional params
    return path || '/';
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
/**
 * Compares an array of numbers as used in PathParser.score and returns a
 * number. This function can be used to `sort` an array
 *
 * @param a - first array of numbers
 * @param b - second array of numbers
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 * should be sorted first
 */
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    // only keep going if diff === 0
    if (diff) return diff;
    i++;
  }
  // if the last subsegment was Static, the shorter segments should be sorted first
  // otherwise sort the longest segment first
  if (a.length < b.length) {
    return a.length === 1 && a[0] === 40 /* PathScore.Static */ + 40 /* PathScore.Segment */ ? -1 : 1;
  } else if (a.length > b.length) {
    return b.length === 1 && b[0] === 40 /* PathScore.Static */ + 40 /* PathScore.Segment */ ? 1 : -1;
  }
  return 0;
}
/**
 * Compare function that can be used with `sort` to sort an array of PathParser
 *
 * @param a - first PathParser
 * @param b - second PathParser
 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
 */
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    // do not return if both are equal
    if (comp) return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore)) return 1;
    if (isLastScoreNegative(bScore)) return -1;
  }
  // if a and b share the same score entries but b has more, sort b first
  return bScore.length - aScore.length;
  // this is the ternary version
  // return aScore.length < bScore.length
  //   ? 1
  //   : aScore.length > bScore.length
  //   ? -1
  //   : 0
}
/**
 * This allows detecting splats at the end of a path: /home/:id(.*)*
 *
 * @param score - score to check
 * @returns true if the last entry is negative
 */
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0 /* TokenType.Static */,
  value: ''
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
// After some profiling, the cache seems to be unnecessary because tokenizePath
// (the slowest part of adding a route) is very fast
// const tokenCache = new Map<string, Token[][]>()
function tokenizePath(path) {
  if (!path) return [[]];
  if (path === '/') return [[ROOT_TOKEN]];
  if (!path.startsWith('/')) {
    throw new Error( false ? 0 : `Invalid path "${path}"`);
  }
  // if (tokenCache.has(path)) return tokenCache.get(path)!
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = 0 /* TokenizerState.Static */;
  let previousState = state;
  const tokens = [];
  // the segment will always be valid because we get into the initial state
  // with the leading /
  let segment;
  function finalizeSegment() {
    if (segment) tokens.push(segment);
    segment = [];
  }
  // index on the path
  let i = 0;
  // char at index
  let char;
  // buffer of the value read
  let buffer = '';
  // custom regexp for a param
  let customRe = '';
  function consumeBuffer() {
    if (!buffer) return;
    if (state === 0 /* TokenizerState.Static */) {
      segment.push({
        type: 0 /* TokenType.Static */,
        value: buffer
      });
    } else if (state === 1 /* TokenizerState.Param */ || state === 2 /* TokenizerState.ParamRegExp */ || state === 3 /* TokenizerState.ParamRegExpEnd */) {
      if (segment.length > 1 && (char === '*' || char === '+')) crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1 /* TokenType.Param */,
        value: buffer,
        regexp: customRe,
        repeatable: char === '*' || char === '+',
        optional: char === '*' || char === '?'
      });
    } else {
      crash('Invalid state to consume buffer');
    }
    buffer = '';
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === '\\' && state !== 2 /* TokenizerState.ParamRegExp */) {
      previousState = state;
      state = 4 /* TokenizerState.EscapeNext */;
      continue;
    }
    switch (state) {
      case 0 /* TokenizerState.Static */:
        if (char === '/') {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ':') {
          consumeBuffer();
          state = 1 /* TokenizerState.Param */;
        } else {
          addCharToBuffer();
        }
        break;
      case 4 /* TokenizerState.EscapeNext */:
        addCharToBuffer();
        state = previousState;
        break;
      case 1 /* TokenizerState.Param */:
        if (char === '(') {
          state = 2 /* TokenizerState.ParamRegExp */;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0 /* TokenizerState.Static */;
          // go back one character if we were not modifying
          if (char !== '*' && char !== '?' && char !== '+') i--;
        }
        break;
      case 2 /* TokenizerState.ParamRegExp */:
        // TODO: is it worth handling nested regexp? like :p(?:prefix_([^/]+)_suffix)
        // it already works by escaping the closing )
        // https://paths.esm.dev/?p=AAMeJbiAwQEcDKbAoAAkP60PG2R6QAvgNaA6AFACM2ABuQBB#
        // is this really something people need since you can also write
        // /prefix_:p()_suffix
        if (char === ')') {
          // handle the escaped )
          if (customRe[customRe.length - 1] == '\\') customRe = customRe.slice(0, -1) + char;else state = 3 /* TokenizerState.ParamRegExpEnd */;
        } else {
          customRe += char;
        }
        break;
      case 3 /* TokenizerState.ParamRegExpEnd */:
        // same as finalizing a param
        consumeBuffer();
        state = 0 /* TokenizerState.Static */;
        // go back one character if we were not modifying
        if (char !== '*' && char !== '?' && char !== '+') i--;
        customRe = '';
        break;
      default:
        crash('Unknown state');
        break;
    }
  }
  if (state === 2 /* TokenizerState.ParamRegExp */) crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  // tokenCache.set(path, tokens)
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  // warn against params with the same name
  if (false) {}
  const matcher = vue_router_assign(parser, {
    record,
    parent,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  if (parent) {
    // both are aliases or both are not aliases
    // we don't want to mix them because the order is used when
    // passing originalRecord in Matcher.addRoute
    if (!matcher.record.aliasOf === !parent.record.aliasOf) parent.children.push(matcher);
  }
  return matcher;
}

/**
 * Creates a Router Matcher.
 *
 * @internal
 * @param routes - array of initial routes
 * @param globalOptions - global route options
 */
function createRouterMatcher(routes, globalOptions) {
  // normalized ordered array of matchers
  const matchers = [];
  const matcherMap = new Map();
  globalOptions = mergeOptions({
    strict: false,
    end: true,
    sensitive: false
  }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    // used later on to remove by name
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    if (false) {}
    // we might be the child of an alias
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    // generate an array of records to correctly handle aliases
    const normalizedRecords = [mainNormalizedRecord];
    if ('alias' in record) {
      const aliases = typeof record.alias === 'string' ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(
        // we need to normalize again to ensure the `mods` property
        // being non enumerable
        normalizeRouteRecord(vue_router_assign({}, mainNormalizedRecord, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          // we might be the child of an alias
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        })));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const {
        path
      } = normalizedRecord;
      // Build up the path for nested routes if the child isn't an absolute
      // route. Only add the / delimiter if the child path isn't empty and if the
      // parent path doesn't have a trailing slash
      if (parent && path[0] !== '/') {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === '/' ? '' : '/';
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      if (false) {}
      // create the object beforehand, so it can be passed to children
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (false) {}
      // if we are an alias we must tell the original record that we exist,
      // so we can be removed
      if (originalRecord) {
        originalRecord.alias.push(matcher);
        if (false) {}
      } else {
        // otherwise, the first record is the original and others are aliases
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
        // remove the route if named and only for the top record (avoid in nested calls)
        // this works because the original record is the first one
        if (isRootAdd && record.name && !isAliasRecord(matcher)) {
          if (false) {}
          removeRoute(record.name);
        }
      }
      // Avoid adding a record that doesn't display anything. This allows passing through records without a component to
      // not be reached and pass through the catch all route
      if (isMatchable(matcher)) {
        insertMatcher(matcher);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
      }
      // if there was no original record, then the first one was not an alias and all
      // other aliases (if any) need to reference this record when adding children
      originalRecord = originalRecord || matcher;
      // TODO: add normalized records for more flexibility
      // if (parent && isAliasRecord(originalRecord)) {
      //   parent.children.push(originalRecord)
      // }
    }
    return originalMatcher ? () => {
      // since other matchers are aliases, they should be removed by the original matcher
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name) matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    const index = findInsertionIndex(matcher, matchers);
    matchers.splice(index, 0, matcher);
    // only add the original record to the name map
    if (matcher.record.name && !isAliasRecord(matcher)) matcherMap.set(matcher.record.name, matcher);
  }
  function resolve(location, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ('name' in location && location.name) {
      matcher = matcherMap.get(location.name);
      if (!matcher) throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
        location
      });
      // warn if the user is passing invalid params so they can debug it better when they get removed
      if (false) {}
      name = matcher.record.name;
      params = vue_router_assign(
      // paramsFromLocation is a new object
      paramsFromLocation(currentLocation.params,
      // only keep params that exist in the resolved location
      // only keep optional params coming from a parent record
      matcher.keys.filter(k => !k.optional).concat(matcher.parent ? matcher.parent.keys.filter(k => k.optional) : []).map(k => k.name)),
      // discard any existing params in the current location that do not exist here
      // #1497 this ensures better active/exact matching
      location.params && paramsFromLocation(location.params, matcher.keys.map(k => k.name)));
      // throws if cannot be stringified
      path = matcher.stringify(params);
    } else if (location.path != null) {
      // no need to resolve the path with the matcher as it was provided
      // this also allows the user to control the encoding
      path = location.path;
      if (false) {}
      matcher = matchers.find(m => m.re.test(path));
      // matcher should have a value after the loop
      if (matcher) {
        // we know the matcher works because we tested the regexp
        params = matcher.parse(path);
        name = matcher.record.name;
      }
      // location is a relative path
    } else {
      // match by name or path of current route
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find(m => m.re.test(currentLocation.path));
      if (!matcher) throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
        location,
        currentLocation
      });
      name = matcher.record.name;
      // since we are navigating to the same location, we don't need to pick the
      // params like when `name` is provided
      params = vue_router_assign({}, currentLocation.params, location.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      // reversed order so parents are at the beginning
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  // add initial routes
  routes.forEach(route => addRoute(route));
  function clearRoutes() {
    matchers.length = 0;
    matcherMap.clear();
  }
  return {
    addRoute,
    resolve,
    removeRoute,
    clearRoutes,
    getRoutes,
    getRecordMatcher
  };
}
function paramsFromLocation(params, keys) {
  const newParams = {};
  for (const key of keys) {
    if (key in params) newParams[key] = params[key];
  }
  return newParams;
}
/**
 * Normalizes a RouteRecordRaw. Creates a copy
 *
 * @param record
 * @returns the normalized version
 */
function normalizeRouteRecord(record) {
  const normalized = {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: record.aliasOf,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    // must be declared afterwards
    // mods: {},
    components: 'components' in record ? record.components || null : record.component && {
      default: record.component
    }
  };
  // mods contain modules and shouldn't be copied,
  // logged or anything. It's just used for internal
  // advanced use cases like data loaders
  Object.defineProperty(normalized, 'mods', {
    value: {}
  });
  return normalized;
}
/**
 * Normalize the optional `props` in a record to always be an object similar to
 * components. Also accept a boolean for components.
 * @param record
 */
function normalizeRecordProps(record) {
  const propsObject = {};
  // props does not exist on redirect records, but we can set false directly
  const props = record.props || false;
  if ('component' in record) {
    propsObject.default = props;
  } else {
    // NOTE: we could also allow a function to be applied to every component.
    // Would need user feedback for use cases
    for (const name in record.components) propsObject[name] = typeof props === 'object' ? props[name] : props;
  }
  return propsObject;
}
/**
 * Checks if a record or any of its parent is an alias
 * @param record
 */
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf) return true;
    record = record.parent;
  }
  return false;
}
/**
 * Merge meta fields of an array of records
 *
 * @param matched - array of matched records
 */
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => vue_router_assign(meta, record.meta), {});
}
function mergeOptions(defaults, partialOptions) {
  const options = {};
  for (const key in defaults) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
  }
  return options;
}
function isSameParam(a, b) {
  return a.name === b.name && a.optional === b.optional && a.repeatable === b.repeatable;
}
/**
 * Check if a path and its alias have the same required params
 *
 * @param a - original record
 * @param b - alias record
 */
function checkSameParams(a, b) {
  for (const key of a.keys) {
    if (!key.optional && !b.keys.find(isSameParam.bind(null, key))) return warn(`Alias "${b.record.path}" and the original record: "${a.record.path}" must have the exact same param named "${key.name}"`);
  }
  for (const key of b.keys) {
    if (!key.optional && !a.keys.find(isSameParam.bind(null, key))) return warn(`Alias "${b.record.path}" and the original record: "${a.record.path}" must have the exact same param named "${key.name}"`);
  }
}
/**
 * A route with a name and a child with an empty path without a name should warn when adding the route
 *
 * @param mainNormalizedRecord - RouteRecordNormalized
 * @param parent - RouteRecordMatcher
 */
function checkChildMissingNameWithEmptyPath(mainNormalizedRecord, parent) {
  if (parent && parent.record.name && !mainNormalizedRecord.name && !mainNormalizedRecord.path) {
    warn(`The route named "${String(parent.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
  }
}
function checkSameNameAsAncestor(record, parent) {
  for (let ancestor = parent; ancestor; ancestor = ancestor.parent) {
    if (ancestor.record.name === record.name) {
      throw new Error(`A route named "${String(record.name)}" has been added as a ${parent === ancestor ? 'child' : 'descendant'} of a route with the same name. Route names must be unique and a nested route cannot use the same name as an ancestor.`);
    }
  }
}
function checkMissingParamsInAbsolutePath(record, parent) {
  for (const key of parent.keys) {
    if (!record.keys.find(isSameParam.bind(null, key))) return warn(`Absolute path "${record.record.path}" must have the exact same param named "${key.name}" as its parent "${parent.record.path}".`);
  }
}
/**
 * Performs a binary search to find the correct insertion index for a new matcher.
 *
 * Matchers are primarily sorted by their score. If scores are tied then we also consider parent/child relationships,
 * with descendants coming before ancestors. If there's still a tie, new routes are inserted after existing routes.
 *
 * @param matcher - new matcher to be inserted
 * @param matchers - existing matchers
 */
function findInsertionIndex(matcher, matchers) {
  // First phase: binary search based on score
  let lower = 0;
  let upper = matchers.length;
  while (lower !== upper) {
    const mid = lower + upper >> 1;
    const sortOrder = comparePathParserScore(matcher, matchers[mid]);
    if (sortOrder < 0) {
      upper = mid;
    } else {
      lower = mid + 1;
    }
  }
  // Second phase: check for an ancestor with the same score
  const insertionAncestor = getInsertionAncestor(matcher);
  if (insertionAncestor) {
    upper = matchers.lastIndexOf(insertionAncestor, upper - 1);
    if (false) {}
  }
  return upper;
}
function getInsertionAncestor(matcher) {
  let ancestor = matcher;
  while (ancestor = ancestor.parent) {
    if (isMatchable(ancestor) && comparePathParserScore(matcher, ancestor) === 0) {
      return ancestor;
    }
  }
  return;
}
/**
 * Checks if a matcher can be reachable. This means if it's possible to reach it as a route. For example, routes without
 * a component, or name, or redirect, are just used to group other routes.
 * @param matcher
 * @param matcher.record record of the matcher
 * @returns
 */
function isMatchable({
  record
}) {
  return !!(record.name || record.components && Object.keys(record.components).length || record.redirect);
}

/**
 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
 * version with the leading `?` and without Should work as URLSearchParams

 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */
function parseQuery(search) {
  const query = {};
  // avoid creating an object with an empty key and empty value
  // because of split('&')
  if (search === '' || search === '?') return query;
  const hasLeadingIM = search[0] === '?';
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
  for (let i = 0; i < searchParams.length; ++i) {
    // pre decode the + into space
    const searchParam = searchParams[i].replace(PLUS_RE, ' ');
    // allow the = character
    const eqPos = searchParam.indexOf('=');
    const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
    if (key in query) {
      // an extra variable for ts types
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
/**
 * Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
 * doesn't prepend a `?`
 *
 * @internal
 *
 * @param query - query object to stringify
 * @returns string version of the query without the leading `?`
 */
function stringifyQuery(query) {
  let search = '';
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      // only null adds the value
      if (value !== undefined) {
        search += (search.length ? '&' : '') + key;
      }
      continue;
    }
    // keep null values
    const values = isArray(value) ? value.map(v => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach(value => {
      // skip undefined values in arrays as if they were not present
      // smaller code than using filter
      if (value !== undefined) {
        // only append & with non-empty search
        search += (search.length ? '&' : '') + key;
        if (value != null) search += '=' + value;
      }
    });
  }
  return search;
}
/**
 * Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
 * numbers into strings, removing keys with an undefined value and replacing
 * undefined with null in arrays
 *
 * @param query - query object to normalize
 * @returns a normalized query object
 */
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== undefined) {
      normalizedQuery[key] = isArray(value) ? value.map(v => v == null ? null : '' + v) : value == null ? value : '' + value;
    }
  }
  return normalizedQuery;
}

/**
 * RouteRecord being rendered by the closest ancestor Router View. Used for
 * `onBeforeRouteUpdate` and `onBeforeRouteLeave`. rvlm stands for Router View
 * Location Matched
 *
 * @internal
 */
const matchedRouteKey = Symbol( false ? 0 : '');
/**
 * Allows overriding the router view depth to control which component in
 * `matched` is rendered. rvd stands for Router View Depth
 *
 * @internal
 */
const viewDepthKey = Symbol( false ? 0 : '');
/**
 * Allows overriding the router instance returned by `useRouter` in tests. r
 * stands for router
 *
 * @internal
 */
const routerKey = Symbol( false ? 0 : '');
/**
 * Allows overriding the current route returned by `useRoute` in tests. rl
 * stands for route location
 *
 * @internal
 */
const routeLocationKey = Symbol( false ? 0 : '');
/**
 * Allows overriding the current route used by router-view. Internally this is
 * used when the `route` prop is passed.
 *
 * @internal
 */
const routerViewLocationKey = Symbol( false ? 0 : '');

/**
 * Create a list of callbacks that can be reset. Used to create before and after navigation guards list
 */
function useCallbacks() {
  let handlers = [];
  function add(handler) {
    handlers.push(handler);
    return () => {
      const i = handlers.indexOf(handler);
      if (i > -1) handlers.splice(i, 1);
    };
  }
  function reset() {
    handlers = [];
  }
  return {
    add,
    list: () => handlers.slice(),
    reset
  };
}
function registerGuard(record, name, guard) {
  const removeFromList = () => {
    record[name].delete(guard);
  };
  onUnmounted(removeFromList);
  onDeactivated(removeFromList);
  onActivated(() => {
    record[name].add(guard);
  });
  record[name].add(guard);
}
/**
 * Add a navigation guard that triggers whenever the component for the current
 * location is about to be left. Similar to {@link beforeRouteLeave} but can be
 * used in any component. The guard is removed when the component is unmounted.
 *
 * @param leaveGuard - {@link NavigationGuard}
 */
function onBeforeRouteLeave(leaveGuard) {
  if (false) {}
  const activeRecord = inject(matchedRouteKey,
  // to avoid warning
  {}).value;
  if (!activeRecord) {
     false && 0;
    return;
  }
  registerGuard(activeRecord, 'leaveGuards', leaveGuard);
}
/**
 * Add a navigation guard that triggers whenever the current location is about
 * to be updated. Similar to {@link beforeRouteUpdate} but can be used in any
 * component. The guard is removed when the component is unmounted.
 *
 * @param updateGuard - {@link NavigationGuard}
 */
function onBeforeRouteUpdate(updateGuard) {
  if (false) {}
  const activeRecord = inject(matchedRouteKey,
  // to avoid warning
  {}).value;
  if (!activeRecord) {
     false && 0;
    return;
  }
  registerGuard(activeRecord, 'updateGuards', updateGuard);
}
function guardToPromiseFn(guard, to, from, record, name, runWithContext = fn => fn()) {
  // keep a reference to the enterCallbackArray to prevent pushing callbacks if a new navigation took place
  const enterCallbackArray = record && (
  // name is defined if record is because of the function overload
  record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve, reject) => {
    const next = valid => {
      if (valid === false) {
        reject(createRouterError(4 /* ErrorTypes.NAVIGATION_ABORTED */, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray &&
        // since enterCallbackArray is truthy, both record and name also are
        record.enterCallbacks[name] === enterCallbackArray && typeof valid === 'function') {
          enterCallbackArray.push(valid);
        }
        resolve();
      }
    };
    // wrapping with Promise.resolve allows it to work with both async and sync guards
    const guardReturn = runWithContext(() => guard.call(record && record.instances[name], to, from,  false ? 0 : next));
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3) guardCall = guardCall.then(next);
    if (false) {}
    guardCall.catch(err => reject(err));
  });
}
function canOnlyBeCalledOnce(next, to, from) {
  let called = 0;
  return function () {
    if (called++ === 1) warn(`The "next" callback was called more than once in one navigation guard when going from "${from.fullPath}" to "${to.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`);
    // @ts-expect-error: we put it in the original one because it's easier to check
    next._called = true;
    if (called === 1) next.apply(null, arguments);
  };
}
function extractComponentsGuards(matched, guardType, to, from, runWithContext = fn => fn()) {
  const guards = [];
  for (const record of matched) {
    if (false) {}
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (false) {}
      // skip update and leave guards if the route component is not mounted
      if (guardType !== 'beforeRouteEnter' && !record.instances[name]) continue;
      if (isRouteComponent(rawComponent)) {
        // __vccOpts is added by vue-class-component and contain the regular options
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name, runWithContext));
      } else {
        // start requesting the chunk already
        let componentPromise = rawComponent();
        if (false) {}
        guards.push(() => componentPromise.then(resolved => {
          if (!resolved) throw new Error(`Couldn't resolve component "${name}" at "${record.path}"`);
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          // keep the resolved module for plugins like data loaders
          record.mods[name] = resolved;
          // replace the function with the resolved component
          // cannot be null or undefined because we went into the for loop
          record.components[name] = resolvedComponent;
          // __vccOpts is added by vue-class-component and contain the regular options
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name, runWithContext)();
        }));
      }
    }
  }
  return guards;
}
/**
 * Ensures a route is loaded, so it can be passed as o prop to `<RouterView>`.
 *
 * @param route - resolved route to load
 */
function loadRouteLocation(route) {
  return route.matched.every(record => record.redirect) ? Promise.reject(new Error('Cannot load a route that redirects.')) : Promise.all(route.matched.map(record => record.components && Promise.all(Object.keys(record.components).reduce((promises, name) => {
    const rawComponent = record.components[name];
    if (typeof rawComponent === 'function' && !('displayName' in rawComponent)) {
      promises.push(rawComponent().then(resolved => {
        if (!resolved) return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}". Ensure you passed a function that returns a promise.`));
        const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
        // keep the resolved module for plugins like data loaders
        record.mods[name] = resolved;
        // replace the function with the resolved component
        // cannot be null or undefined because we went into the for loop
        record.components[name] = resolvedComponent;
        return;
      }));
    }
    return promises;
  }, [])))).then(() => route);
}

// TODO: we could allow currentRoute as a prop to expose `isActive` and
// `isExactActive` behavior should go through an RFC
/**
 * Returns the internal behavior of a {@link RouterLink} without the rendering part.
 *
 * @param props - a `to` location and an optional `replace` flag
 */
function useLink(props) {
  const router = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.inject)(routerKey);
  const currentRoute = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.inject)(routeLocationKey);
  let hasPrevious = false;
  let previousTo = null;
  const route = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.computed)(() => {
    const to = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.unref)(props.to);
    if (false) {}
    return router.resolve(to);
  });
  const activeRecordIndex = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.computed)(() => {
    const {
      matched
    } = route.value;
    const {
      length
    } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length) return -1;
    const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
    if (index > -1) return index;
    // possible parent record
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return (
      // we are dealing with nested routes
      length > 1 &&
      // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      getOriginalPath(routeMatched) === parentRecordPath &&
      // avoid comparing the child with its parent
      currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2])) : index
    );
  });
  const isActive = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.computed)(() => activeRecordIndex.value > -1 && includesParams(currentRoute.params, route.value.params));
  const isExactActive = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.computed)(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams(currentRoute.params, route.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      const p = router[(0,external_commonjs_vue_commonjs2_vue_root_Vue_.unref)(props.replace) ? 'replace' : 'push']((0,external_commonjs_vue_commonjs2_vue_root_Vue_.unref)(props.to)
      // avoid uncaught errors are they are logged anyway
      ).catch(noop);
      if (props.viewTransition && typeof document !== 'undefined' && 'startViewTransition' in document) {
        document.startViewTransition(() => p);
      }
      return p;
    }
    return Promise.resolve();
  }
  // devtools only
  if (false) {}
  /**
   * NOTE: update {@link _RouterLinkI}'s `$slots` type when updating this
   */
  return {
    route,
    href: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.computed)(() => route.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
function preferSingleVNode(vnodes) {
  return vnodes.length === 1 ? vnodes[0] : vnodes;
}
const RouterLinkImpl = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.defineComponent)({
  name: 'RouterLink',
  compatConfig: {
    MODE: 3
  },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: 'page'
    }
  },
  useLink,
  setup(props, {
    slots
  }) {
    const link = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.reactive)(useLink(props));
    const {
      options
    } = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.inject)(routerKey);
    const elClass = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.computed)(() => ({
      [getLinkClass(props.activeClass, options.linkActiveClass, 'router-link-active')]: link.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, 'router-link-exact-active')]: link.isExactActive
    }));
    return () => {
      const children = slots.default && preferSingleVNode(slots.default(link));
      return props.custom ? children : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.h)('a', {
        'aria-current': link.isExactActive ? props.ariaCurrentValue : null,
        href: link.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
/**
 * Component to render a link that triggers a navigation on click.
 */
const RouterLink = (/* unused pure expression or super */ null && (RouterLinkImpl));
function guardEvent(e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  // don't redirect when preventDefault called
  if (e.defaultPrevented) return;
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) return;
  // don't redirect if `target="_blank"`
  // @ts-expect-error getAttribute does exist
  if (e.currentTarget && e.currentTarget.getAttribute) {
    // @ts-expect-error getAttribute exists
    const target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) return;
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) e.preventDefault();
  return true;
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === 'string') {
      if (innerValue !== outerValue) return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i])) return false;
    }
  }
  return true;
}
/**
 * Get the original path value of a record by following its aliasOf
 * @param record
 */
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : '';
}
/**
 * Utility class to get the active class based on defaults.
 * @param propClass
 * @param globalClass
 * @param defaultClass
 */
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.defineComponent)({
  name: 'RouterView',
  // #674 we manually inherit them
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: 'default'
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: {
    MODE: 3
  },
  setup(props, {
    attrs,
    slots
  }) {
     false && 0;
    const injectedRoute = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.inject)(routerViewLocationKey);
    const routeToDisplay = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.computed)(() => props.route || injectedRoute.value);
    const injectedDepth = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.inject)(viewDepthKey, 0);
    // The depth changes based on empty components option, which allows passthrough routes e.g. routes with children
    // that are used to reuse the `path` property
    const depth = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.computed)(() => {
      let initialDepth = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.unref)(injectedDepth);
      const {
        matched
      } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.computed)(() => routeToDisplay.value.matched[depth.value]);
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.provide)(viewDepthKey, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.computed)(() => depth.value + 1));
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.provide)(matchedRouteKey, matchedRouteRef);
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.provide)(routerViewLocationKey, routeToDisplay);
    const viewRef = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.ref)();
    // watch at the same time the component instance, the route record we are
    // rendering, and the name
    (0,external_commonjs_vue_commonjs2_vue_root_Vue_.watch)(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      // copy reused instances
      if (to) {
        // this will update the instance for new instances as well as reused
        // instances when navigating to a new route
        to.instances[name] = instance;
        // the component instance is reused for a different route or name, so
        // we copy any saved update or leave guards. With async setup, the
        // mounting component will mount before the matchedRoute changes,
        // making instance === oldInstance, so we check if guards have been
        // added before. This works because we remove guards when
        // unmounting/deactivating components
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      // trigger beforeRouteEnter next callbacks
      if (instance && to && (
      // if there is no instance but to and from are the same this might be
      // the first visit
      !from || !isSameRouteRecord(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach(callback => callback(instance));
      }
    }, {
      flush: 'post'
    });
    return () => {
      const route = routeToDisplay.value;
      // we need the value at the time we render because when we unmount, we
      // navigated to a different location so the value is different
      const currentName = props.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, {
          Component: ViewComponent,
          route
        });
      }
      // props from route configuration
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route.params : typeof routePropsOption === 'function' ? routePropsOption(route) : routePropsOption : null;
      const onVnodeUnmounted = vnode => {
        // remove the instance reference to prevent leak
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.h)(ViewComponent, vue_router_assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      if (false) {}
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        normalizeSlot(slots.default, {
          Component: component,
          route
        }) || component
      );
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot) return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
// export the public type for h/tsx inference
// also to avoid inline import() in generated d.ts files
/**
 * Component to display the current route the user is at.
 */
const RouterView = (/* unused pure expression or super */ null && (RouterViewImpl));
// warn against deprecated usage with <transition> & <keep-alive>
// due to functional component being no longer eager in Vue 3
function warnDeprecatedUsage() {
  const instance = getCurrentInstance();
  const parentName = instance.parent && instance.parent.type.name;
  const parentSubTreeType = instance.parent && instance.parent.subTree && instance.parent.subTree.type;
  if (parentName && (parentName === 'KeepAlive' || parentName.includes('Transition')) && typeof parentSubTreeType === 'object' && parentSubTreeType.name === 'RouterView') {
    const comp = parentName === 'KeepAlive' ? 'keep-alive' : 'transition';
    warn(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.\n` + `Use slot props instead:\n\n` + `<router-view v-slot="{ Component }">\n` + `  <${comp}>\n` + `    <component :is="Component" />\n` + `  </${comp}>\n` + `</router-view>`);
  }
}

/**
 * Copies a route location and removes any problematic properties that cannot be shown in devtools (e.g. Vue instances).
 *
 * @param routeLocation - routeLocation to format
 * @param tooltip - optional tooltip
 * @returns a copy of the routeLocation
 */
function formatRouteLocation(routeLocation, tooltip) {
  const copy = vue_router_assign({}, routeLocation, {
    // remove variables that can contain vue instances
    matched: routeLocation.matched.map(matched => omit(matched, ['instances', 'children', 'aliasOf']))
  });
  return {
    _custom: {
      type: null,
      readOnly: true,
      display: routeLocation.fullPath,
      tooltip,
      value: copy
    }
  };
}
function formatDisplay(display) {
  return {
    _custom: {
      display
    }
  };
}
// to support multiple router instances
let routerId = 0;
function addDevtools(app, router, matcher) {
  // Take over router.beforeEach and afterEach
  // make sure we are not registering the devtool twice
  if (router.__hasDevtools) return;
  router.__hasDevtools = true;
  // increment to support multiple router instances
  const id = routerId++;
  setupDevtoolsPlugin({
    id: 'org.vuejs.router' + (id ? '.' + id : ''),
    label: 'Vue Router',
    packageName: 'vue-router',
    homepage: 'https://router.vuejs.org',
    logo: 'https://router.vuejs.org/logo.png',
    componentStateTypes: ['Routing'],
    app
  }, api => {
    if (typeof api.now !== 'function') {
      console.warn('[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html.');
    }
    // display state added by the router
    api.on.inspectComponent((payload, ctx) => {
      if (payload.instanceData) {
        payload.instanceData.state.push({
          type: 'Routing',
          key: '$route',
          editable: false,
          value: formatRouteLocation(router.currentRoute.value, 'Current Route')
        });
      }
    });
    // mark router-link as active and display tags on router views
    api.on.visitComponentTree(({
      treeNode: node,
      componentInstance
    }) => {
      if (componentInstance.__vrv_devtools) {
        const info = componentInstance.__vrv_devtools;
        node.tags.push({
          label: (info.name ? `${info.name.toString()}: ` : '') + info.path,
          textColor: 0,
          tooltip: 'This component is rendered by &lt;router-view&gt;',
          backgroundColor: PINK_500
        });
      }
      // if multiple useLink are used
      if (isArray(componentInstance.__vrl_devtools)) {
        componentInstance.__devtoolsApi = api;
        componentInstance.__vrl_devtools.forEach(devtoolsData => {
          let label = devtoolsData.route.path;
          let backgroundColor = ORANGE_400;
          let tooltip = '';
          let textColor = 0;
          if (devtoolsData.error) {
            label = devtoolsData.error;
            backgroundColor = RED_100;
            textColor = RED_700;
          } else if (devtoolsData.isExactActive) {
            backgroundColor = LIME_500;
            tooltip = 'This is exactly active';
          } else if (devtoolsData.isActive) {
            backgroundColor = BLUE_600;
            tooltip = 'This link is active';
          }
          node.tags.push({
            label,
            textColor,
            tooltip,
            backgroundColor
          });
        });
      }
    });
    watch(router.currentRoute, () => {
      // refresh active state
      refreshRoutesView();
      api.notifyComponentUpdate();
      api.sendInspectorTree(routerInspectorId);
      api.sendInspectorState(routerInspectorId);
    });
    const navigationsLayerId = 'router:navigations:' + id;
    api.addTimelineLayer({
      id: navigationsLayerId,
      label: `Router${id ? ' ' + id : ''} Navigations`,
      color: 0x40a8c4
    });
    // const errorsLayerId = 'router:errors'
    // api.addTimelineLayer({
    //   id: errorsLayerId,
    //   label: 'Router Errors',
    //   color: 0xea5455,
    // })
    router.onError((error, to) => {
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: 'Error during Navigation',
          subtitle: to.fullPath,
          logType: 'error',
          time: api.now(),
          data: {
            error
          },
          groupId: to.meta.__navigationId
        }
      });
    });
    // attached to `meta` and used to group events
    let navigationId = 0;
    router.beforeEach((to, from) => {
      const data = {
        guard: formatDisplay('beforeEach'),
        from: formatRouteLocation(from, 'Current Location during this navigation'),
        to: formatRouteLocation(to, 'Target location')
      };
      // Used to group navigations together, hide from devtools
      Object.defineProperty(to.meta, '__navigationId', {
        value: navigationId++
      });
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          time: api.now(),
          title: 'Start of navigation',
          subtitle: to.fullPath,
          data,
          groupId: to.meta.__navigationId
        }
      });
    });
    router.afterEach((to, from, failure) => {
      const data = {
        guard: formatDisplay('afterEach')
      };
      if (failure) {
        data.failure = {
          _custom: {
            type: Error,
            readOnly: true,
            display: failure ? failure.message : '',
            tooltip: 'Navigation Failure',
            value: failure
          }
        };
        data.status = formatDisplay('❌');
      } else {
        data.status = formatDisplay('✅');
      }
      // we set here to have the right order
      data.from = formatRouteLocation(from, 'Current Location during this navigation');
      data.to = formatRouteLocation(to, 'Target location');
      api.addTimelineEvent({
        layerId: navigationsLayerId,
        event: {
          title: 'End of navigation',
          subtitle: to.fullPath,
          time: api.now(),
          data,
          logType: failure ? 'warning' : 'default',
          groupId: to.meta.__navigationId
        }
      });
    });
    /**
     * Inspector of Existing routes
     */
    const routerInspectorId = 'router-inspector:' + id;
    api.addInspector({
      id: routerInspectorId,
      label: 'Routes' + (id ? ' ' + id : ''),
      icon: 'book',
      treeFilterPlaceholder: 'Search routes'
    });
    function refreshRoutesView() {
      // the routes view isn't active
      if (!activeRoutesPayload) return;
      const payload = activeRoutesPayload;
      // children routes will appear as nested
      let routes = matcher.getRoutes().filter(route => !route.parent ||
      // these routes have a parent with no component which will not appear in the view
      // therefore we still need to include them
      !route.parent.record.components);
      // reset match state to false
      routes.forEach(resetMatchStateOnRouteRecord);
      // apply a match state if there is a payload
      if (payload.filter) {
        routes = routes.filter(route =>
        // save matches state based on the payload
        isRouteMatching(route, payload.filter.toLowerCase()));
      }
      // mark active routes
      routes.forEach(route => markRouteRecordActive(route, router.currentRoute.value));
      payload.rootNodes = routes.map(formatRouteRecordForInspector);
    }
    let activeRoutesPayload;
    api.on.getInspectorTree(payload => {
      activeRoutesPayload = payload;
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        refreshRoutesView();
      }
    });
    /**
     * Display information about the currently selected route record
     */
    api.on.getInspectorState(payload => {
      if (payload.app === app && payload.inspectorId === routerInspectorId) {
        const routes = matcher.getRoutes();
        const route = routes.find(route => route.record.__vd_id === payload.nodeId);
        if (route) {
          payload.state = {
            options: formatRouteRecordMatcherForStateInspector(route)
          };
        }
      }
    });
    api.sendInspectorTree(routerInspectorId);
    api.sendInspectorState(routerInspectorId);
  });
}
function modifierForKey(key) {
  if (key.optional) {
    return key.repeatable ? '*' : '?';
  } else {
    return key.repeatable ? '+' : '';
  }
}
function formatRouteRecordMatcherForStateInspector(route) {
  const {
    record
  } = route;
  const fields = [{
    editable: false,
    key: 'path',
    value: record.path
  }];
  if (record.name != null) {
    fields.push({
      editable: false,
      key: 'name',
      value: record.name
    });
  }
  fields.push({
    editable: false,
    key: 'regexp',
    value: route.re
  });
  if (route.keys.length) {
    fields.push({
      editable: false,
      key: 'keys',
      value: {
        _custom: {
          type: null,
          readOnly: true,
          display: route.keys.map(key => `${key.name}${modifierForKey(key)}`).join(' '),
          tooltip: 'Param keys',
          value: route.keys
        }
      }
    });
  }
  if (record.redirect != null) {
    fields.push({
      editable: false,
      key: 'redirect',
      value: record.redirect
    });
  }
  if (route.alias.length) {
    fields.push({
      editable: false,
      key: 'aliases',
      value: route.alias.map(alias => alias.record.path)
    });
  }
  if (Object.keys(route.record.meta).length) {
    fields.push({
      editable: false,
      key: 'meta',
      value: route.record.meta
    });
  }
  fields.push({
    key: 'score',
    editable: false,
    value: {
      _custom: {
        type: null,
        readOnly: true,
        display: route.score.map(score => score.join(', ')).join(' | '),
        tooltip: 'Score used to sort routes',
        value: route.score
      }
    }
  });
  return fields;
}
/**
 * Extracted from tailwind palette
 */
const PINK_500 = 0xec4899;
const BLUE_600 = 0x2563eb;
const LIME_500 = 0x84cc16;
const CYAN_400 = 0x22d3ee;
const ORANGE_400 = 0xfb923c;
// const GRAY_100 = 0xf4f4f5
const DARK = 0x666666;
const RED_100 = 0xfee2e2;
const RED_700 = 0xb91c1c;
function formatRouteRecordForInspector(route) {
  const tags = [];
  const {
    record
  } = route;
  if (record.name != null) {
    tags.push({
      label: String(record.name),
      textColor: 0,
      backgroundColor: CYAN_400
    });
  }
  if (record.aliasOf) {
    tags.push({
      label: 'alias',
      textColor: 0,
      backgroundColor: ORANGE_400
    });
  }
  if (route.__vd_match) {
    tags.push({
      label: 'matches',
      textColor: 0,
      backgroundColor: PINK_500
    });
  }
  if (route.__vd_exactActive) {
    tags.push({
      label: 'exact',
      textColor: 0,
      backgroundColor: LIME_500
    });
  }
  if (route.__vd_active) {
    tags.push({
      label: 'active',
      textColor: 0,
      backgroundColor: BLUE_600
    });
  }
  if (record.redirect) {
    tags.push({
      label: typeof record.redirect === 'string' ? `redirect: ${record.redirect}` : 'redirects',
      textColor: 0xffffff,
      backgroundColor: DARK
    });
  }
  // add an id to be able to select it. Using the `path` is not possible because
  // empty path children would collide with their parents
  let id = record.__vd_id;
  if (id == null) {
    id = String(routeRecordId++);
    record.__vd_id = id;
  }
  return {
    id,
    label: record.path,
    tags,
    children: route.children.map(formatRouteRecordForInspector)
  };
}
//  incremental id for route records and inspector state
let routeRecordId = 0;
const EXTRACT_REGEXP_RE = /^\/(.*)\/([a-z]*)$/;
function markRouteRecordActive(route, currentRoute) {
  // no route will be active if matched is empty
  // reset the matching state
  const isExactActive = currentRoute.matched.length && isSameRouteRecord(currentRoute.matched[currentRoute.matched.length - 1], route.record);
  route.__vd_exactActive = route.__vd_active = isExactActive;
  if (!isExactActive) {
    route.__vd_active = currentRoute.matched.some(match => isSameRouteRecord(match, route.record));
  }
  route.children.forEach(childRoute => markRouteRecordActive(childRoute, currentRoute));
}
function resetMatchStateOnRouteRecord(route) {
  route.__vd_match = false;
  route.children.forEach(resetMatchStateOnRouteRecord);
}
function isRouteMatching(route, filter) {
  const found = String(route.re).match(EXTRACT_REGEXP_RE);
  route.__vd_match = false;
  if (!found || found.length < 3) {
    return false;
  }
  // use a regexp without $ at the end to match nested routes better
  const nonEndingRE = new RegExp(found[1].replace(/\$$/, ''), found[2]);
  if (nonEndingRE.test(filter)) {
    // mark children as matches
    route.children.forEach(child => isRouteMatching(child, filter));
    // exception case: `/`
    if (route.record.path !== '/' || filter === '/') {
      route.__vd_match = route.re.test(filter);
      return true;
    }
    // hide the / route
    return false;
  }
  const path = route.record.path.toLowerCase();
  const decodedPath = decode(path);
  // also allow partial matching on the path
  if (!filter.startsWith('/') && (decodedPath.includes(filter) || path.includes(filter))) return true;
  if (decodedPath.startsWith(filter) || path.startsWith(filter)) return true;
  if (route.record.name && String(route.record.name).includes(filter)) return true;
  return route.children.some(child => isRouteMatching(child, filter));
}
function omit(obj, keys) {
  const ret = {};
  for (const key in obj) {
    if (!keys.includes(key)) {
      // @ts-expect-error
      ret[key] = obj[key];
    }
  }
  return ret;
}

/**
 * Creates a Router instance that can be used by a Vue app.
 *
 * @param options - {@link RouterOptions}
 */
function createRouter(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  if (false) {}
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  // leave the scrollRestoration if no scrollBehavior is provided
  if (isBrowser && options.scrollBehavior && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  const normalizeParams = applyToParams.bind(null, paramValue => '' + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams =
  // @ts-expect-error: intentionally avoid the type check
  applyToParams.bind(null, decode);
  function addRoute(parentOrRoute, route) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      if (false) {}
      record = route;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    } else if (false) {}
  }
  function getRoutes() {
    return matcher.getRoutes().map(routeMatcher => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve(rawLocation, currentLocation) {
    // const resolve: Router['resolve'] = (rawLocation: RouteLocationRaw, currentLocation) => {
    // const objectLocation = routerLocationAsObject(rawLocation)
    // we create a copy to modify it later
    currentLocation = vue_router_assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === 'string') {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute = matcher.resolve({
        path: locationNormalized.path
      }, currentLocation);
      const href = routerHistory.createHref(locationNormalized.fullPath);
      if (false) {}
      // locationNormalized is always a new object
      return vue_router_assign(locationNormalized, matchedRoute, {
        params: decodeParams(matchedRoute.params),
        hash: decode(locationNormalized.hash),
        redirectedFrom: undefined,
        href
      });
    }
    if (false) {}
    let matcherLocation;
    // path could be relative in object as well
    if (rawLocation.path != null) {
      if (false) {}
      matcherLocation = vue_router_assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      // remove any nullish param
      const targetParams = vue_router_assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      // pass encoded values to the matcher, so it can produce encoded path and fullPath
      matcherLocation = vue_router_assign({}, rawLocation, {
        params: encodeParams(targetParams)
      });
      // current location params are decoded, we need to encode them in case the
      // matcher merges the params
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || '';
    if (false) {}
    // the matcher might have merged current location params, so
    // we need to run the decoding again
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, vue_router_assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href = routerHistory.createHref(fullPath);
    if (false) {}
    return vue_router_assign({
      fullPath,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash,
      query:
      // if the user is using a custom query lib like qs, we might have
      // nested objects, so we keep the query as is, meaning it can contain
      // numbers at `$route.query`, but at the point, the user will have to
      // use their own type anyway.
      // https://github.com/vuejs/router/issues/328#issuecomment-649481567
      stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: undefined,
      href
    });
  }
  function locationAsObject(to) {
    return typeof to === 'string' ? parseURL(parseQuery$1, to, currentRoute.value.path) : vue_router_assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8 /* ErrorTypes.NAVIGATION_CANCELLED */, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(vue_router_assign(locationAsObject(to), {
      replace: true
    }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const {
        redirect
      } = lastMatched;
      let newTargetLocation = typeof redirect === 'function' ? redirect(to) : redirect;
      if (typeof newTargetLocation === 'string') {
        newTargetLocation = newTargetLocation.includes('?') || newTargetLocation.includes('#') ? newTargetLocation = locationAsObject(newTargetLocation) :
        // force empty params
        {
          path: newTargetLocation
        };
        // @ts-expect-error: force empty params when a string is passed to let
        // the router parse them again
        newTargetLocation.params = {};
      }
      if (false) {}
      return vue_router_assign({
        query: to.query,
        hash: to.hash,
        // avoid transferring params if the redirect has a path
        params: newTargetLocation.path != null ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    // to could be a string where `replace` is a function
    const replace = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect) return pushWithRedirect(vue_router_assign(locationAsObject(shouldRedirect), {
      state: typeof shouldRedirect === 'object' ? vue_router_assign({}, data, shouldRedirect.state) : data,
      force,
      replace
    }),
    // keep original redirectedFrom if it exists
    redirectedFrom || targetLocation);
    // if it was a redirect we already called `pushWithRedirect` above
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16 /* ErrorTypes.NAVIGATION_DUPLICATED */, {
        to: toLocation,
        from
      });
      // trigger scroll to allow scrolling to the same anchor
      handleScroll(from, from,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      true,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      false);
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch(error => isNavigationFailure(error) ?
    // navigation redirects still mark the router as ready
    isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */) ? error : markAsReady(error) // also returns the error
    :
    // reject any unknown error
    triggerError(error, toLocation, from)).then(failure => {
      if (failure) {
        if (isNavigationFailure(failure, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
          if (false) {}
          return pushWithRedirect(
          // keep options
          vue_router_assign({
            // preserve an existing replacement but allow the redirect to override it
            replace
          }, locationAsObject(failure.to), {
            state: typeof failure.to === 'object' ? vue_router_assign({}, data, failure.to.state) : data,
            force
          }),
          // preserve the original redirectedFrom if any
          redirectedFrom || toLocation);
        }
      } else {
        // if we fail we don't finalize the navigation
        failure = finalizeNavigation(toLocation, from, true, replace, data);
      }
      triggerAfterEach(toLocation, from, failure);
      return failure;
    });
  }
  /**
   * Helper to reject and skip all navigation guards if a new navigation happened
   * @param to
   * @param from
   */
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app = installedApps.values().next().value;
    // support Vue < 3.3
    return app && typeof app.runWithContext === 'function' ? app.runWithContext(fn) : fn();
  }
  // TODO: refactor the whole before guards by internally using router.beforeEach
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    // all components here have been resolved once because we are leaving
    guards = extractComponentsGuards(leavingRecords.reverse(), 'beforeRouteLeave', to, from);
    // leavingRecords is already reversed
    for (const record of leavingRecords) {
      record.leaveGuards.forEach(guard => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    // run the queue of per route beforeRouteLeave guards
    return runGuardQueue(guards).then(() => {
      // check global guards beforeEach
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      // check in components beforeRouteUpdate
      guards = extractComponentsGuards(updatingRecords, 'beforeRouteUpdate', to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach(guard => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      // run the queue of per route beforeEnter guards
      return runGuardQueue(guards);
    }).then(() => {
      // check the route beforeEnter
      guards = [];
      for (const record of enteringRecords) {
        // do not trigger beforeEnter on reused views
        if (record.beforeEnter) {
          if (isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter) guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      // run the queue of per route beforeEnter guards
      return runGuardQueue(guards);
    }).then(() => {
      // NOTE: at this point to.matched is normalized and does not contain any () => Promise<Component>
      // clear existing enterCallbacks, these are added by extractComponentsGuards
      to.matched.forEach(record => record.enterCallbacks = {});
      // check in-component beforeRouteEnter
      guards = extractComponentsGuards(enteringRecords, 'beforeRouteEnter', to, from, runWithContext);
      guards.push(canceledNavigationCheck);
      // run the queue of per route beforeEnter guards
      return runGuardQueue(guards);
    }).then(() => {
      // check global guards beforeResolve
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    })
    // catch any navigation canceled
    .catch(err => isNavigationFailure(err, 8 /* ErrorTypes.NAVIGATION_CANCELLED */) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    // navigation is confirmed, call afterGuards
    // TODO: wrap with error handlers
    afterGuards.list().forEach(guard => runWithContext(() => guard(to, from, failure)));
  }
  /**
   * - Cleans up any navigation guards
   * - Changes the url if necessary
   * - Calls the scrollBehavior
   */
  function finalizeNavigation(toLocation, from, isPush, replace, data) {
    // a more recent navigation took place
    const error = checkCanceledNavigation(toLocation, from);
    if (error) return error;
    // only consider as push if it's not the first navigation
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    // change URL only if the user did a push/replace and if it's not the initial navigation because
    // it's just reflecting the url
    if (isPush) {
      // on the initial navigation, we want to reuse the scroll position from
      // history state if it exists
      if (replace || isFirstNavigation) routerHistory.replace(toLocation.fullPath, vue_router_assign({
        scroll: isFirstNavigation && state && state.scroll
      }, data));else routerHistory.push(toLocation.fullPath, data);
    }
    // accept current navigation
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  // attach listener to history to trigger navigations
  function setupListeners() {
    // avoid setting up listeners twice due to an invalid first navigation
    if (removeHistoryListener) return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening) return;
      // cannot be a redirect route because it was in history
      const toLocation = resolve(to);
      // due to dynamic routing, and to hash history with manual navigation
      // (manually changing the url or calling history.hash = '#/somewhere'),
      // there could be a redirect record in history
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(vue_router_assign(shouldRedirect, {
          replace: true,
          force: true
        }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      // TODO: should be moved to web history?
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch(error => {
        if (isNavigationFailure(error, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 8 /* ErrorTypes.NAVIGATION_CANCELLED */)) {
          return error;
        }
        if (isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
          // Here we could call if (info.delta) routerHistory.go(-info.delta,
          // false) but this is bug prone as we have no way to wait the
          // navigation to be finished before calling pushWithRedirect. Using
          // a setTimeout of 16ms seems to work but there is no guarantee for
          // it to work on every browser. So instead we do not restore the
          // history entry and trigger a new navigation as requested by the
          // navigation guard.
          // the error is already handled by router.push we just want to avoid
          // logging the error
          pushWithRedirect(vue_router_assign(locationAsObject(error.to), {
            force: true
          }), toLocation
          // avoid an uncaught rejection, let push call triggerError
          ).then(failure => {
            // manual change in hash history #916 ending up in the URL not
            // changing, but it was changed by the manual url change, so we
            // need to manually change it ourselves
            if (isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 16 /* ErrorTypes.NAVIGATION_DUPLICATED */) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop);
          // avoid the then branch
          return Promise.reject();
        }
        // do not restore history on unknown direction
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        // unrecognized error, transfer to the global handler
        return triggerError(error, toLocation, from);
      }).then(failure => {
        failure = failure || finalizeNavigation(
        // after navigation, all matched components are resolved
        toLocation, from, false);
        // revert the navigation
        if (failure) {
          if (info.delta &&
          // a new navigation has been triggered, so we do not want to revert, that will change the current history
          // entry while a different route is displayed
          !isNavigationFailure(failure, 8 /* ErrorTypes.NAVIGATION_CANCELLED */)) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 16 /* ErrorTypes.NAVIGATION_DUPLICATED */)) {
            // manual change in hash history #916
            // it's like a push but lacks the information of the direction
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      })
      // avoid warnings in the console about uncaught rejections, they are logged by triggerErrors
      .catch(noop);
    });
  }
  // Initialization and Errors
  let readyHandlers = useCallbacks();
  let errorListeners = useCallbacks();
  let ready;
  /**
   * Trigger errorListeners added via onError and throws the error as well
   *
   * @param error - error to throw
   * @param to - location we were navigating to when the error happened
   * @param from - location we were navigating from when the error happened
   * @returns the error as a rejected promise
   */
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorListeners.list();
    if (list.length) {
      list.forEach(handler => handler(error, to, from));
    } else {
      if (false) {}
      console.error(error);
    }
    // reject the error no matter there were error listeners or not
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED) return Promise.resolve();
    return new Promise((resolve, reject) => {
      readyHandlers.add([resolve, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      // still not ready if an error happened
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve, reject]) => err ? reject(err) : resolve());
      readyHandlers.reset();
    }
    return err;
  }
  // Scroll behavior
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const {
      scrollBehavior
    } = options;
    if (!isBrowser || !scrollBehavior) return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then(position => position && scrollToPosition(position)).catch(err => triggerError(err, to, from));
  }
  const go = delta => routerHistory.go(delta);
  let started;
  const installedApps = new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    clearRoutes: matcher.clearRoutes,
    hasRoute,
    getRoutes,
    resolve,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorListeners.add,
    isReady,
    install(app) {
      const router = this;
      app.component('RouterLink', RouterLink);
      app.component('RouterView', RouterView);
      app.config.globalProperties.$router = router;
      Object.defineProperty(app.config.globalProperties, '$route', {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      // this initial navigation is only necessary on client, on server it doesn't
      // make sense because it will create an extra unnecessary navigation and could
      // lead to problems
      if (isBrowser &&
      // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        // see above
        started = true;
        push(routerHistory.location).catch(err => {
          if (false) {}
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        Object.defineProperty(reactiveRoute, key, {
          get: () => currentRoute.value[key],
          enumerable: true
        });
      }
      app.provide(routerKey, router);
      app.provide(routeLocationKey, shallowReactive(reactiveRoute));
      app.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app.unmount;
      installedApps.add(app);
      app.unmount = function () {
        installedApps.delete(app);
        // the router is not attached to an app anymore
        if (installedApps.size < 1) {
          // invalidate the current navigation
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
      // TODO: this probably needs to be updated so it can be used by vue-termui
      if (false) {}
    }
  };
  // TODO: type this as NavigationGuardReturn or similar instead of any
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) {
      if (to.matched.find(record => isSameRouteRecord(record, recordFrom))) updatingRecords.push(recordFrom);else leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i];
    if (recordTo) {
      // the type doesn't matter because we are comparing per reference
      if (!from.matched.find(record => isSameRouteRecord(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}

/**
 * Returns the router instance. Equivalent to using `$router` inside
 * templates.
 */
function useRouter() {
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.inject)(routerKey);
}
/**
 * Returns the current route location. Equivalent to using `$route` inside
 * templates.
 */
function useRoute(_name) {
  return inject(routeLocationKey);
}

;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/sidebarMenu/components/SidebarMenuItem.vue?vue&type=script&setup=true&lang=js


const SidebarMenuItemvue_type_script_setup_true_lang_js_hoisted_1 = ["src"];
const SidebarMenuItemvue_type_script_setup_true_lang_js_hoisted_2 = ["src"];
const _hoisted_3 = {
  class: "menu-item"
};


// import sidebarItem from "@/components/sidebarMenu/components/SidebarMenuItem.vue";


// 使用 defineComponent 显式定义组件名称
const SidebarMenuItemvue_type_script_setup_true_lang_js_default_ = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.defineComponent)({
  name: "SidebarMenuItem"
});
/* harmony default export */ var SidebarMenuItemvue_type_script_setup_true_lang_js = (/*@__PURE__*/Object.assign(SidebarMenuItemvue_type_script_setup_true_lang_js_default_, {
  props: {
    menuData: {
      default: () => [],
      type: Array
    }
  },
  setup(__props) {
    const props = __props;
    const router = useRouter();
    const handleClick = path => {
      router.push({
        path: path
      });
    };
    return (_ctx, _cache) => {
      const _component_sidebar_menu_item = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("sidebar-menu-item", true);
      const _component_el_sub_menu = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-sub-menu");
      const _component_el_menu_item = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-menu-item");
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)(__props.menuData, menu => {
        return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
          class: "menu-wrapper",
          key: menu.key
        }, [!(0,external_commonjs_vue_commonjs2_vue_root_Vue_.unref)(validatenull)(menu.children) ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_sub_menu, {
          key: 0,
          index: menu.key
        }, {
          title: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("img", {
            class: "menu-icon",
            src: _ctx.$route.name == menu.key ? menu['iconSelected'] : menu['icon']
          }, null, 8, SidebarMenuItemvue_type_script_setup_true_lang_js_hoisted_1), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)(_ctx.$t("menu." + menu.key)), 1)]),
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_sidebar_menu_item, {
            "menu-data": menu.children
          }, null, 8, ["menu-data"])]),
          _: 2
        }, 1032, ["index"])) : ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_menu_item, {
          key: 1,
          index: menu.key,
          onClick: $event => handleClick(menu.path)
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("img", {
            class: "menu-icon",
            src: _ctx.$route.name == menu.key ? menu['iconSelected'] : menu['icon']
          }, null, 8, SidebarMenuItemvue_type_script_setup_true_lang_js_hoisted_2), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", _hoisted_3, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)(_ctx.$t("menu." + menu.key)), 1)]),
          _: 2
        }, 1032, ["index", "onClick"]))]);
      }), 128);
    };
  }
}));
;// ./src/components/sidebarMenu/components/SidebarMenuItem.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/sidebarMenu/components/SidebarMenuItem.vue?vue&type=style&index=0&id=ae73d924&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ./src/components/sidebarMenu/components/SidebarMenuItem.vue?vue&type=style&index=0&id=ae73d924&scoped=true&lang=css

;// ./src/components/sidebarMenu/components/SidebarMenuItem.vue



;


const SidebarMenuItem_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(SidebarMenuItemvue_type_script_setup_true_lang_js, [['__scopeId',"data-v-ae73d924"]])

/* harmony default export */ var SidebarMenuItem = (SidebarMenuItem_exports_);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/sidebarMenu/components/SidebarMenu.vue?vue&type=script&setup=true&lang=js




// 使用 defineComponent 显式定义组件名称
const SidebarMenuvue_type_script_setup_true_lang_js_default_ = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.defineComponent)({
  name: "SidebarMenu"
});
/* harmony default export */ var SidebarMenuvue_type_script_setup_true_lang_js = (/*@__PURE__*/Object.assign(SidebarMenuvue_type_script_setup_true_lang_js_default_, {
  props: {
    data: {
      default: () => [],
      type: Array
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      const _component_el_menu = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-menu");
      const _component_el_scrollbar = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-scrollbar");
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_scrollbar, {
        class: "sidebar-menu-div"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_menu, {
          "default-active": "2",
          class: "sidebar-menu-ul"
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(SidebarMenuItem, {
            "menu-data": __props.data
          }, null, 8, ["menu-data"])]),
          _: 1
        })]),
        _: 1
      });
    };
  }
}));
;// ./src/components/sidebarMenu/components/SidebarMenu.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/sidebarMenu/components/SidebarMenu.vue?vue&type=style&index=0&id=597b9c1b&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ./src/components/sidebarMenu/components/SidebarMenu.vue?vue&type=style&index=0&id=597b9c1b&scoped=true&lang=css

;// ./src/components/sidebarMenu/components/SidebarMenu.vue



;


const SidebarMenu_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(SidebarMenuvue_type_script_setup_true_lang_js, [['__scopeId',"data-v-597b9c1b"]])

/* harmony default export */ var SidebarMenu = (SidebarMenu_exports_);
;// ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/sidebarMenu/index.vue?vue&type=script&setup=true&lang=js

const sidebarMenuvue_type_script_setup_true_lang_js_hoisted_1 = {
  class: "sidebar-menu"
};



// 使用 defineComponent 显式定义组件名称
const sidebarMenuvue_type_script_setup_true_lang_js_default_ = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.defineComponent)({
  name: "Sidebar"
});
/* harmony default export */ var sidebarMenuvue_type_script_setup_true_lang_js = (/*@__PURE__*/Object.assign(sidebarMenuvue_type_script_setup_true_lang_js_default_, {
  props: {
    data: {
      default: () => [],
      type: Array
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", sidebarMenuvue_type_script_setup_true_lang_js_hoisted_1, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(SidebarLogo), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(SidebarMenu, {
        data: __props.data
      }, null, 8, ["data"])]);
    };
  }
}));
;// ./src/components/sidebarMenu/index.vue?vue&type=script&setup=true&lang=js
 
;// ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/sidebarMenu/index.vue?vue&type=style&index=0&id=04b1157a&scoped=true&lang=css
// extracted by mini-css-extract-plugin

;// ./src/components/sidebarMenu/index.vue?vue&type=style&index=0&id=04b1157a&scoped=true&lang=css

;// ./src/components/sidebarMenu/index.vue



;


const sidebarMenu_exports_ = /*#__PURE__*/(0,exportHelper/* default */.A)(sidebarMenuvue_type_script_setup_true_lang_js, [['__scopeId',"data-v-04b1157a"]])

/* harmony default export */ var sidebarMenu = (sidebarMenu_exports_);
;// ./src/components/index.js



// import BasicContainer from './basic-container/Main.vue';
// import BaseDialog from './base-dialog/index.vue';
// import BaseDrawer from './base-drawer/index.vue';
// import Form from './base-form/Form.vue';
// import CopyInput from './base-form/CopyInput.vue';
// import UploadDrag from './base-form/UploadDrag.vue';
// import WeekCheckBox from './base-form/WeekCheckBox.vue';
// import WeekCheckboxGroup from './base-form/WeekCheckboxGroup.vue';
// import Button from './button/Button.vue';
// import ButtonGroup from './button/ButtonGroup.vue';
// import Buttons from './button/Buttons.vue';

// import PageTable from './pageTable/Table.vue';
// import SearchFormItem from './pageTable/SearchFormItem.vue';

// 创建一个数组，包含所有需要导出的组件
// const components = [BaseCard, BasicContainer,BaseDialog,BaseDrawer,Form,CopyInput,UploadDrag,WeekCheckBox,WeekCheckboxGroup,Button,ButtonGroup,Buttons,Sidebar,PageTable,SearchFormItem];
const components = [base_card, sidebarMenu];
// 定义 installGlobalComponent 方法，用于全局注册组件
const installGlobalComponent = app => {
  components.forEach(component => {
    app.component(component.name, component);
  });
};

// 导出所有组件，方便按需加载
// export {
//   BaseCard,
//   BasicContainer,
//   BaseDialog,
//   Form,
//   CopyInput,
//   UploadDrag,
//   WeekCheckBox,
//   WeekCheckboxGroup,
//   Button,
//   ButtonGroup,
//   Buttons,
//   Sidebar,
//   PageTable,
//   SearchFormItem
//   // 其他组件...
// };

// 导出 installGlobalComponent 方法
/* harmony default export */ var src_components = ({
  installGlobalComponent
});
;// ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (src_components);


/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=seitoComp.umd.js.map