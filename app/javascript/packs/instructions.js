import * as bootstrap from "bootstrap";

class InstructionsModal {
  static KEY = "hideInstructionsModal";

  constructor() {
    this.$el = document.getElementById("instructions");
    this.modal = new bootstrap.Modal(this.$el);
    this.$showAgain = this.$el.querySelector("#showAgain");

    this.addListeners();
    this.initShow();
  }

  addListeners() {
    this.$showAgain.addEventListener("change", () => localStorage.setItem(InstructionsModal.KEY, this.$showAgain.checked));
  }

  // Check local storage to see if the "Don't show again" checkbox was selected.
  initShow() {
    const hideInstructionsModal = localStorage.getItem(InstructionsModal.KEY);
    if (!hideInstructionsModal || hideInstructionsModal === "false") this.show();
  }

  clearShowAgain() {
    this.$showAgain.checked = false;
    this.$showAgain.removeAttribute("checked");
    localStorage.removeItem(InstructionsModal.KEY);
  }

  show() {
    this.clearShowAgain();
    this.modal.show();
  }
}

window.instructionsModal = new InstructionsModal();
