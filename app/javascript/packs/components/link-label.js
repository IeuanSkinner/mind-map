import Component from "./component";

export default class LinkLabel extends Component {
  static WIDTH = 175;

  constructor(link, label, colour) {
    super(link.$el.append("foreignObject"));
    this.link = link;
    this.label = label;
    this.colour = colour;
    this.id = `link_label_${link.id}`;
    this.x = link.midPoint.x - LinkLabel.WIDTH / 2;
    this.y = link.midPoint.y;
    this.height = 0;

    this.draw();
  }

  draw() {
    this.$el
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("width", LinkLabel.WIDTH)
      .attr("height", this.height)
      .html(
        `<div id="${this.id}" class="link-label" style="background-color: ${this.colour};">${this.label}</div>`
      );

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
    this.y = this.y - this.height / 2;

    this.$el.attr("y", this.y);
  }

  hasYScroll() {
    return this.$html.scrollHeight > this.height;
  }
}
