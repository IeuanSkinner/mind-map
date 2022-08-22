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
}
