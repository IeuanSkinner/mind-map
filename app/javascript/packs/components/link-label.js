import HideableComponent from "./hideable-component";

export default class LinkLabel extends HideableComponent {
  static WIDTH = 175;

  constructor(link, label, colour) {
    super(true);
    this.link = link;
    this.id = link.id;
    this.label = label;
    this.colour = colour;
    this.x = link.midPoint.x - LinkLabel.WIDTH / 2;
    this.y = link.midPoint.y;
    this.height = 0;
  }

  draw() {
    this.$el = this.link.$el.append("foreignObject");
    
    this.$el
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("width", LinkLabel.WIDTH)
      .attr("height", this.height)
      .html(
        `<div id="${this.id}" class="link-label" style="background-color: ${this.colour};">${this.label}</div>`
      )
      .on("click", e => { if (e.ctrlKey) this.link.hide(); });

    this.$html = document.querySelector(`#${this.id}`);

    while (this.hasYScroll()) this.setHeight(1);
    this.setHeight(15); // Padding
    this.positionY();
  }

  setHeight(add) {
    this.height += add;

    this.$el.attr("height", this.height);
  }

  positionY() {
    const y = this.y - this.height / 2;

    this.$el.attr("y", y);
  }

  hasYScroll() {
    return this.$html.scrollHeight > this.height;
  }

  erase() {
    this.height = 0;
    this.$html = null;
    super.erase();
  }
}
