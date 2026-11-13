(function (global) {
  "use strict";
  const Mint = global.Mint;
  const seen = new WeakSet();
  Mint.register("reveal", function (root) {
    const elements = Mint.elements("[data-mint-reveal]", root).filter(function (element) { return !seen.has(element); });
    if (!elements.length) return;
    const reduce = global.matchMedia && global.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in global)) {
      elements.forEach(function (element) { seen.add(element); element.classList.add("is-visible"); });
      return;
    }
    const observer = new global.IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: "0px 0px -40px 0px" });
    elements.forEach(function (element) {
      seen.add(element);
      element.classList.add("mint-reveal-pending");
      observer.observe(element);
    });
  });
})(window);
