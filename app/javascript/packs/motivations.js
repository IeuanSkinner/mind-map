import * as bootstrap from "bootstrap";

class MotivationsModal {
  constructor() {
    this.$el = document.getElementById("motivations");
    this.modal = new bootstrap.Modal(this.$el);

    this.$carousel = this.$el.querySelector(".carousel");
    this.carousel = new bootstrap.Carousel(this.$carousel, {});
  }

  show() {
    this.modal.show();
  }
}

window.motivationsModal = new MotivationsModal();
