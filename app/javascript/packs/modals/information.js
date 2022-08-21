import Modal from "./modal";

class InformationModal extends Modal {
  static KEY = "hideInformationModal";

  constructor() {
    super("information");
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

  // @Override
  show() {
    this.clearShowAgain();
    this.modal.show();
  }
}

window.informationModal = new InformationModal();
