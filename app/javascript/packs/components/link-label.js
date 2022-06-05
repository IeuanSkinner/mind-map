export default class LinkLabel {
  constructor(link, label, colour) {
    this.link = link;
    this.id = `link_label_${link.id}`;
    this.width = 175;
    this.height = 0;
    this.x = link.midPoint.x - this.width / 2;
    this.y = link.midPoint.y;
    this.label = label;
    this.colour = colour;

    this.draw();
  }

  draw() {
    this.$text = this.link.$group
      .append("foreignObject")
      .attr("x", this.x)
      .attr("y", this.y)
      .attr("width", this.width)
      .attr("height", this.height)
      .html(
        `<div id="${this.id}" class="link-label" style="background-color: ${this.colour};">${this.label}</div>`
      );

    this.$html = document.querySelector(`#${this.id}`);

    while (this.hasYScroll()) this.setHeight(1);
    this.setHeight(10); // Padding
    this.positionY();
  }

  setHeight(add) {
    this.height += add;

    this.$text.attr("height", this.height);
  }

  positionY() {
    this.y = this.y - this.height / 2;

    this.$text.attr("y", this.y);
  }

  hasYScroll() {
    return this.$html.scrollHeight > this.height;
  }
}
