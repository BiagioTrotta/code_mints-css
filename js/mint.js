(function (global) {
  "use strict";
  global.Mint.version = "0.4.0";
  global.Mint.components = function () { return Array.from(global.Mint._components.keys()); };
  global.Mint.init = function (root) {
    global.Mint._components.forEach(function (initialize) { initialize(root || global.document); });
    return global.Mint;
  };
})(window);
