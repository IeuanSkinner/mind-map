import * as bootstrap from "bootstrap";
import Node from "../components/node";

export default class BaseDetails {
  static RIGHT_ARROW = "<i class='fa fa-long-arrow-right'></i>";

  constructor(app, id) {
    this.app = app;
    this.id = id;
    this.$el = document.getElementById(id);
    this.$title = this.$el.querySelector(".offcanvas-title .text");
    this.$key = this.$el.querySelector(".offcanvas-title .key");

    this.offcanvas = new bootstrap.Offcanvas(this.$el);
  }

  setTitle(text) {
    this.$title.innerHTML = text;
  }

  setColour(colour) {
    this.$key.style.backgroundColor = colour || Node.DEFAULT_COLOUR;
  }

  show() {
    this.offcanvas.show();
  }

  buildLink(type, id, label) {
    return `<span class="link" data-${type}-id="${id}" title="View ${label} Details">${label}</span>`;
  }
  
  addListeners(type) {
    const $links = [...this.$el.querySelectorAll(`[data-${type}-id]`)];

    $links.forEach($link => {
      $link.addEventListener("click", () => {
        const link = this.app[`${type}s`].find(cmp => cmp.id === $link.dataset[`${type}Id`]);

        this.app[`${type}Details`].show(link);
      });
    });
  }
}
