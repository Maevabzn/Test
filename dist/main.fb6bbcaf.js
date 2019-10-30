// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
document.addEventListener('DOMContentLoaded', function () {
  var closeButtons = document.getElementsByClassName('btn-close'),
      openButtons = document.getElementsByClassName('btn-play'),
      radios = document.querySelectorAll('input[name="select-advantage"]'),
      thumbs = document.getElementsByClassName('thumb');

  for (var r = 0; r < radios.length; r++) {
    radios[r].addEventListener('change', setadvantageClasses, this);
  }

  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', onCloseFrame, this);
  }

  for (var j = 0; j < openButtons.length; j++) {
    openButtons[j].addEventListener('click', onOpenFrame, this);
  }

  for (var t = 0; t < thumbs.length; t++) {
    thumbs[t].addEventListener('touchstart', onStartTouch, this);
  }

  for (var e = 0; e < thumbs.length; e++) {
    thumbs[e].addEventListener('touchend', onEndTouch, this);
  }

  setadvantageCaroussel();
});

function setadvantageCaroussel() {
  setadvantageClasses();
}

function setadvantageClasses() {
  var input = document.getElementById('advantage-caroussel').querySelector('input:checked'),
      items = document.getElementsByClassName('advantage-carrousel__item'),
      classes = ['right-out', 'right', 'center', 'left', 'left-out'];

  for (var i = 0; i < items.length; i++) {
    for (var c = 0; c < classes.length; c++) {
      items[i].classList.remove(classes[c]);
    }
  }

  setLeftside(input, items.length > 4);
  getSibling(input, 1, 'next').classList.add('center');
  setRightside(input, items.length > 4);
  setActiveDot();
}

function setLeftside(input, moreThenFour) {
  if (getSibling(input, 1, 'prev') === null) {
    getLastChild(input).classList.add('left');

    if (moreThenFour) {
      getSibling(getLastChild(input), 2, 'prev').classList.add('left-out');
    }
  } else {
    getSibling(input, 1, 'prev').classList.add('left');

    if (moreThenFour) {
      if (getSibling(input, 3, 'prev') === null) {
        getLastChild(input).classList.add('left-out');
      } else {
        getSibling(input, 3, 'prev').classList.add('left-out');
      }
    }
  }
}

function setRightside(input, moreThenFour) {
  if (getSibling(input, 2, 'next') === null) {
    getSibling(getFirstChild(input), 1, 'next').classList.add('right');

    if (moreThenFour) {
      getSibling(getFirstChild(input), 3, 'next').classList.add('right-out');
    }
  } else {
    getSibling(input, 3, 'next').classList.add('right');

    if (moreThenFour) {
      if (getSibling(input, 4, 'next') === null) {
        getSibling(getFirstChild(input), 1, 'next').classList.add('right-out');
      } else {
        getSibling(input, 5, 'next').classList.add('right-out');
      }
    }
  }
}

function getSibling(elem, num, target) {
  var tempElem = elem;

  for (var i = 0; i < num; i++) {
    if (tempElem !== null) {
      tempElem = target === 'next' ? tempElem.nextElementSibling : tempElem.previousElementSibling;
    }
  }

  return tempElem;
}

function getFirstChild(node) {
  var tempObj = node.parentNode.firstChild;

  while (tempObj.nodeType !== 1 && tempObj.nextSibling !== null) {
    tempObj = tempObj.nextSibling;
  }

  return tempObj.nodeType === 1 ? tempObj : false;
}

function getLastChild(node) {
  var tempObj = node.parentNode.lastChild;

  while (tempObj.nodeType !== 1 && tempObj.previousSibling !== null) {
    tempObj = tempObj.previousSibling;
  }

  return tempObj.nodeType === 1 ? tempObj : false;
}

function onStartTouch(e) {
  this.touchStartX = e.changedTouches[0].pageX;
}

function onEndTouch(e) {
  if (e.changedTouches[0].pageX - this.touchStartX > 100) {
    selectadvantage('prev');
  } else if (e.changedTouches[0].pageX - this.touchStartX < -100) {
    selectadvantage('next');
  }
}

function selectadvantage(target) {
  var input = document.getElementById('advantage-caroussel').querySelector('input:checked'),
      elem;

  if (getSibling(input, 2, target) === null) {
    elem = target === 'next' ? getFirstChild(input) : getSibling(getLastChild(input), 1, 'prev');
  } else {
    elem = getSibling(input, 2, target);
  }

  elem.click();
  setActiveDot(input, elem);
}

function setActiveDots() {
  var l = document.getElementsByClassName('advantage-carrousel__item').length,
      items = document.getElementsByClassName('advantage-carrousel__item'),
      dot = undefined;

  for (var i = 0; i < items.length; i++) {
    dot = items[i].getElementsByClassName('active-dot')[0];

    if (dot) {
      dot.style.marginLeft = (i - l / 2) * 25 + 12 + 'px';
    }
  }
}

function setActiveDot() {
  var navItems = document.getElementsByClassName('advantage-carousel-nav')[0].querySelectorAll('li > label'),
      thumb = document.getElementById('advantage-caroussel').querySelector('input:checked').nextElementSibling;

  for (var n = 0; n < navItems.length; n++) {
    navItems[n].classList.remove('active');
  }

  document.getElementById(thumb.getAttribute('data-id')).classList.add('active');
}

function onCloseFrame(e) {
  var frame = e.currentTarget.nextElementSibling;
  frame.setAttribute('data-src', frame.src);
  frame.src = '';
}

function onOpenFrame(e) {
  var frame = document.getElementById(e.currentTarget.getAttribute('for')).nextElementSibling.querySelector('iframe');
  frame.src = frame.getAttribute('data-src');
  console.log(frame.src);
}

function onYouTubeIframeAPIReady() {
  var event = document.createEvent('Event');
  event.initEvent('youtube-api-ready', true, true);
  window.dispatchEvent(event);
}

var cross = document.querySelector('.cross');
var pop = document.querySelector('.pop');
var svg = document.querySelector('svg');

function tooglePop() {
  pop.classList.toggle('invisible');
}

svg.addEventListener('click', function () {
  tooglePop();
});
cross.addEventListener('click', function () {
  tooglePop();
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58985" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map