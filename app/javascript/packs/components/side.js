import * as d3 from "d3";
import Component from "./component";
import Node from "./node";

export default class Side extends Component {
  static LEFT = "l";
  static RIGHT = "r";
  static WIDTH = 200;

  constructor(mindMap, data, side) {
    super(mindMap.$el.append("g"));
    this.mindMap = mindMap;
    this.data = { ...data, children: data.children.filter(d => d.position === side) };
    this.side = side;

    if (this.hasChildren()) {
      this.draw();
    }
  }

  draw() {
    if (this.isLeft()) {
      this.flip();
    }

    const hierarchy = d3.hierarchy(this.data);
    d3.tree()
      .size([this.getAppHeight(), Side.WIDTH * hierarchy.height])(hierarchy);
    this.root = new Node(this, hierarchy, null);
  }

  isLeft() {
    return this.isSide(Side.LEFT);
  }

  isRight() {
    return this.isSide(Side.RIGHT);
  }
  
  getMidPoint() {
    return this.getAppHeight() / 2;
  }

  flip() {
    this.$el.attr("transform", "scale(-1, 1)");
  }

  isSide(side) {
    return this.side === side
  }

  hasChildren() {
    return !!this.data.children;
  }

  // Can this be calculated dynamically?
  getAppHeight() {
    return 2000;
  }
}
