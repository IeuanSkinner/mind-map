import * as bootstrap from "bootstrap";

class MotivationsModal {
  constructor() {
    this.$el = document.getElementById("motivations");
    this.modal = new bootstrap.Modal(this.$el);
  }

  show() {
    this.modal.show();
  }
}

window.motivationsModal = new MotivationsModal();
