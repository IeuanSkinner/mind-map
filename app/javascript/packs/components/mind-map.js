import Side from "./side";

export default class MindMap {
  constructor(app, data, index) {
    this.app = app;
    this.data = data;
    this.index = index;
    this.id = `mind_map_${index}`;

    this.$mindMap = this.app.$svg.append("g");
    this.left = new Side(this, this.data, "l");
    this.right = new Side(this, this.data, "r");
    this.leftWidth = this.left.getWidth();
    this.rightWidth = this.right.getWidth();
    window.sides.push(this.left, this.right);
    window.mindMaps.push(this);

    this.priorMindMap = index > 0 ? this.app.mindMaps[index - 1] : null;
    this.$mindMap.attr("transform", `translate(${this.getX(1)}, 1)`);
  }

  hasSide(side) {
    return (side === "l" ? this.left : this.right).hasChildren();
  }

  handleZoom(e) {
    this.$mindMap.attr(
      "transform",
      `translate(${e.transform.x + this.getX(e.transform.k)}, ${
        e.transform.y
      }) scale(${e.transform.k})`
    );
  }

  getWidth() {
    if (!this.$mindMap) return 0;

    return this.getBoundingClientRect().width;
  }

  getHeight() {
    if (!this.$mindMap) return 0;

    return this.getBoundingClientRect().height;
  }

  getX(scale) {
    const x = this.priorMindMap
      ? this.priorMindMap.getX(scale) +
        this.priorMindMap.rightWidth * scale +
        this.app.gap * scale +
        this.leftWidth * scale
      : 0;

    return x;
  }

  getBoundingClientRect() {
    return this.$mindMap.node().getBoundingClientRect();
  }
}
