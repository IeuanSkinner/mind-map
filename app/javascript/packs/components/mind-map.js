import Side from "./side";

export default class MindMap {
  constructor(app, data, index) {
    this.app = app;
    this.data = data;
    this.index = index;

    this.$mindMap = this.app.$svg.append("g");
    this.left = new Side(this, this.data, "l");
    this.right = new Side(this, this.data, "r");
    window.sides.push(this.left, this.right);
    window.mindMaps.push(this);

    this.priorMindMap = index > 0 ? this.app.mindMaps[index - 1] : null;
    this.$mindMap.attr("transform", `translate(${this.getX()}, 1)`);
  }

  hasSide(side) {
    return (side === "l" ? this.left : this.right).hasChildren();
  }

  handleZoom(e) {
    this.$mindMap.attr(
      "transform",
      `translate(${e.transform.x + this.getX()}, ${e.transform.y}) scale(${
        e.transform.k
      })`
    );
  }

  getWidth() {
    return this.left.getWidth() || this.right.getWidth();
  }

  getHeight() {
    return this.left.getHeight() || this.right.getHeight();
  }

  getX() {
    const x = this.priorMindMap
      ? this.priorMindMap.getX() +
        this.priorMindMap.getWidth() +
        this.app.gap +
        this.left.getWidth()
      : 0;

    return Math.ceil(x);
  }
}
