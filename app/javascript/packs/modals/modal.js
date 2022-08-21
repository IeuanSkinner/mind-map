import * as bootstrap from "bootstrap";

export default class Modal {
  constructor(id) {
    this.id = id;
    this.$el = document.getElementById(id);
    this.modal = new bootstrap.Modal(this.$el);
  }

  show() {
    this.modal.show();
  }
}
