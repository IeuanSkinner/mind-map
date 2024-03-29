import * as bootstrap from "bootstrap";
import Component from "../components/component";

export default class BaseDetails extends Component {
  static RIGHT_ARROW = "<i class='fa fa-long-arrow-right'></i>";

  constructor(app, id) {
    super(document.getElementById(id));
    this.app = app;
    this.id = id;
    this.$title = this.$el.querySelector(".offcanvas-title .text");
    this.$key = this.$el.querySelector(".offcanvas-title .key");

    this.offcanvas = new bootstrap.Offcanvas(this.$el);

    this.$el.addEventListener("shown.bs.offcanvas", () => this.app.calcWidth());
    this.$el.addEventListener("hidden.bs.offcanvas", () => this.app.calcWidth());    
  }

  setTitle(text) {
    this.$title.innerHTML = text;
  }

  setColour(__colour) {
    const _colour = colour.get(__colour);
    const topicArea = this.app.topicAreasData.find(topicArea => topicArea.colour === _colour);

    this.$key.setAttribute("title", topicArea ? topicArea.name : "None");
    this.$key.style.backgroundColor = colour.brighten(_colour);
    this.$key.style.borderColor = _colour;
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

  getWidth() {
    return this.offcanvas._isShown ? super.getWidth() : 0;
  }
  
  getBoundingClientRect() {
    return this.$el.getBoundingClientRect();
}
}
