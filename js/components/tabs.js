(function (global) {
  "use strict";
  const Mint = global.Mint;
  const seen = new WeakSet();
  function activate(tab, tabs, focus) {
    tabs.querySelectorAll('[role="tab"]').forEach(function (item) {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      const id = item.getAttribute("aria-controls");
      const panel = id && global.CSS && global.CSS.escape ? tabs.querySelector("#" + global.CSS.escape(id)) : null;
      if (panel) panel.hidden = !selected;
    });
    if (focus) tab.focus();
  }
  Mint.register("tabs", function (root) {
    Mint.elements(".tabs", root).forEach(function (tabs) {
      if (seen.has(tabs)) return;
      const buttons = Array.from(tabs.querySelectorAll('[role="tab"]'));
      if (!buttons.length) return;
      seen.add(tabs);
      activate(buttons.find(function (tab) { return tab.getAttribute("aria-selected") === "true"; }) || buttons[0], tabs, false);
      tabs.addEventListener("click", function (event) {
        const tab = event.target.closest('[role="tab"]');
        if (tab && tabs.contains(tab)) activate(tab, tabs, false);
      });
      tabs.addEventListener("keydown", function (event) {
        const current = event.target.closest('[role="tab"]');
        if (!current) return;
        const vertical = tabs.querySelector('[role="tablist"]')?.getAttribute("aria-orientation") === "vertical";
        const previous = vertical ? "ArrowUp" : "ArrowLeft";
        const next = vertical ? "ArrowDown" : "ArrowRight";
        let index = buttons.indexOf(current);
        if (event.key === previous) index = (index - 1 + buttons.length) % buttons.length;
        else if (event.key === next) index = (index + 1) % buttons.length;
        else if (event.key === "Home") index = 0;
        else if (event.key === "End") index = buttons.length - 1;
        else return;
        event.preventDefault();
        activate(buttons[index], tabs, true);
      });
    });
  });
})(window);
