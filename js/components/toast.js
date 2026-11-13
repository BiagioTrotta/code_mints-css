(function (global) {
  "use strict";
  const Mint = global.Mint;
  const seen = new WeakSet();
  Mint.register("toast", function (root) {
    Mint.elements(".toast-close", root).forEach(function (button) {
      if (seen.has(button)) return;
      seen.add(button);
      button.addEventListener("click", function () {
        const toast = button.closest(".toast");
        if (toast) toast.remove();
      });
    });
  });
  Mint.toast = function (options) {
    const config = typeof options === "string" ? { message: options } : (options || {});
    const allowed = ["success", "warning", "danger", "info"];
    const type = allowed.includes(config.type) ? config.type : "info";
    let container = global.document.querySelector(config.container || ".toast-container");
    if (!container) {
      container = global.document.createElement("div");
      container.className = "toast-container";
      container.setAttribute("aria-live", "polite");
      container.setAttribute("aria-atomic", "false");
      global.document.body.appendChild(container);
    }
    const toast = global.document.createElement("div");
    toast.className = "toast toast-" + type;
    toast.setAttribute("role", "status");
    const content = global.document.createElement("div");
    content.className = "toast-content";
    if (config.title) {
      const title = global.document.createElement("h2");
      title.className = "toast-title";
      title.textContent = String(config.title);
      content.appendChild(title);
    }
    const message = global.document.createElement("div");
    message.className = "toast-message";
    message.textContent = String(config.message || "");
    content.appendChild(message);
    const close = global.document.createElement("button");
    close.className = "toast-close";
    close.type = "button";
    close.setAttribute("aria-label", "Chiudi notifica");
    close.textContent = "×";
    toast.append(content, close);
    container.appendChild(toast);
    Mint.initComponent("toast", toast);
    return toast;
  };
})(window);
