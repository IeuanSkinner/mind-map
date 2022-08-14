import * as bootstrap from "bootstrap";

class InformationModal {
  static KEY = "hideInformationModal";

  constructor() {
    this.$el = document.getElementById("information");
    this.modal = new bootstrap.Modal(this.$el);
    this.$showAgain = this.$el.querySelector("#showAgain");

    this.addListeners();
    this.initShow();
  }

  addListeners() {
    this.$showAgain.addEventListener("change", () => localStorage.setItem(InformationModal.KEY, this.$showAgain.checked));
  }

  // Check local storage to see if the "Don't show again" checkbox was selected.
  initShow() {
    const hideInformationModal = localStorage.getItem(InformationModal.KEY);
    if (!hideInformationModal || hideInformationModal === "false") this.show();
  }

  clearShowAgain() {
    this.$showAgain.checked = false;
    this.$showAgain.removeAttribute("checked");
    localStorage.removeItem(InformationModal.KEY);
  }

  show() {
    this.clearShowAgain();
    this.modal.show();
  }
}

window.informationModal = new InformationModal();
