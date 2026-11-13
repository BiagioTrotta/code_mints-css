(function (global) {
  "use strict";
  const Mint = global.Mint || {};
  global.Mint = Mint;
  const components = new Map();
  Mint.register = function (name, initializer) {
    if (!name || typeof initializer !== "function") throw new TypeError("Mint component requires a name and initializer.");
    components.set(name, initializer);
  };
  Mint.elements = function (selector, root) {
    const scope = root || global.document;
    const found = Array.from(scope.querySelectorAll(selector));
    if (scope.nodeType === 1 && scope.matches(selector)) found.unshift(scope);
    return found;
  };
  Mint.initComponent = function (name, root) {
    const initialize = components.get(name);
    if (!initialize) return false;
    initialize(root || global.document);
    return true;
  };
  Mint._components = components;
})(window);
