(function (global) {
  "use strict";
  const Mint = global.Mint;
  const seen = new WeakSet();
  Mint.register("modal", function (root) {
    Mint.elements('[data-mint-toggle="modal"]', root).forEach(function (trigger) {
      if (seen.has(trigger)) return;
      seen.add(trigger);
      trigger.addEventListener("click", function () {
        const selector = trigger.getAttribute("data-mint-target");
        if (!selector) return;
        let dialog;
        try { dialog = global.document.querySelector(selector); } catch (_) { return; }
        if (!dialog || !dialog.matches("dialog")) return;
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
      });
    });
    Mint.elements('[data-mint-dismiss="modal"]', root).forEach(function (trigger) {
      if (seen.has(trigger)) return;
      seen.add(trigger);
      trigger.addEventListener("click", function () {
        const dialog = trigger.closest("dialog");
        if (dialog && typeof dialog.close === "function") dialog.close();
        else if (dialog) dialog.removeAttribute("open");
      });
    });
    Mint.elements("dialog.modal", root).forEach(function (dialog) {
      if (seen.has(dialog)) return;
      seen.add(dialog);
      dialog.addEventListener("click", function (event) {
        if (event.target === dialog && typeof dialog.close === "function") dialog.close();
      });
    });
  });
})(window);
