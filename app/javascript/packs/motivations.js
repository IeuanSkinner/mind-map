import * as bootstrap from "bootstrap";

class MotivationsModal {
  constructor() {
    this.$el = document.getElementById("motivations");
    this.modal = new bootstrap.Modal(this.$el);

    this.$carousel = this.$el.querySelector("#carousel");
    this.carousel = new bootstrap.Carousel(this.$carousel, {});

    this.$showAgain = this.$el.querySelector("#showAgain");
    this.$showAgain.addEventListener("change", () => {
      localStorage.setItem("hideMotivationsModal", this.$showAgain.checked);
    });

    const hideMotivationsModal = localStorage.getItem("hideMotivationsModal");

    if (!hideMotivationsModal || hideMotivationsModal === "false") {
      this.$showAgain.checked = false;
      this.$showAgain.removeAttribute("checked");
      this.modal.show();
    }
  }
}

window.motivationsModal = new MotivationsModal();
