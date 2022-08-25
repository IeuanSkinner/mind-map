import Component from "./component";

export default class HideableComponent extends Component {
  static ACTIVE_COLOUR = "#D80303";

  constructor(hidden = false) {
    super();
    this.hidden = hidden;
  }

  draw() {
    this.overrideError("draw");
  }

  erase() {
    if (!this.$el) return;
    
    this.$el.remove();
  }

  hide() {
    if (this.hidden) return;

    this.hidden = true;
    this.erase();
  }

  show() {
    if (!this.hidden) return;

    this.hidden = false;
    this.draw();
  }

  showDetails() {
    this.overrideError("showDetails");
  }

  setActive() {
    if (!this.label) return;

    this.label.setActive();
  }

  setInactive() {
    if (!this.label) return;

    this.label.setInactive();
  }
}
