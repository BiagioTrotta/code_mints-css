(function (global) {
  "use strict";
  const Mint = global.Mint;
  const seen = new WeakSet();
  function valueOf(element, key, fallback) {
    const value = Number(element.getAttribute(key));
    return Number.isFinite(value) ? value : fallback;
  }
  function format(element, value, digits) {
    const locale = global.document.documentElement.lang || "it";
    const number = new Intl.NumberFormat(locale, { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value);
    element.textContent = (element.getAttribute("data-mint-prefix") || "") + number + (element.getAttribute("data-mint-suffix") || "");
  }
  function run(element) {
    const target = valueOf(element, "data-mint-count", 0);
    const start = valueOf(element, "data-mint-start", 0);
    const digits = Math.max(0, Math.min(6, valueOf(element, "data-mint-decimals", 0)));
    const duration = Math.max(0, valueOf(element, "data-mint-duration", 1200));
    if (duration === 0) { format(element, target, digits); return; }
    const began = global.performance.now();
    function frame(now) {
      const progress = Math.min(1, (now - began) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      format(element, start + (target - start) * eased, digits);
      if (progress < 1) global.requestAnimationFrame(frame);
    }
    global.requestAnimationFrame(frame);
  }
  Mint.register("counter", function (root) {
    const elements = Mint.elements("[data-mint-count]", root).filter(function (element) { return !seen.has(element); });
    if (!elements.length) return;
    const reduce = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in global)) {
      elements.forEach(function (element) { seen.add(element); format(element, valueOf(element, "data-mint-count", 0), Math.max(0, Math.min(6, valueOf(element, "data-mint-decimals", 0)))); });
      return;
    }
    const observer = new global.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        run(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: .25 });
    elements.forEach(function (element) { seen.add(element); observer.observe(element); });
  });
})(window);
