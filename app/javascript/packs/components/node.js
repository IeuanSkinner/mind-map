import * as d3 from "d3";
import NodeLeafLabel from "./node-leaf-label";
import NodeBoxLabel from "./node-box-label";
import Component from "./component";

export default class Node extends Component {
  static DEFAULT_COLOUR = "#000000";

  constructor(side, data, parentNode) {
    super();
    this.side = side;
    this.data = data;
    this.parentNode = parentNode;
    this.id = data.data.id;
    this.children = [];
    this.fromLinks = [];
    this.toLinks = [];

    this.draw()
    this.createChildren();
    this.label();

    side.mindMap.app.nodes.push(this);
  }

  draw() {
    if (this.isRoot()) return;

    this.$el = this.side.$el
      .selectAll(null)
      .data([this.data.branch])
      .join("path")
      .attr("fill", "none")
      .attr("stroke", this.data.data.colour || Node.DEFAULT_COLOUR)
      .attr("stroke-opacity", 1)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 2)
      .attr(
        "d",
        d3
          .link(d3.curveBumpX)
          .x((d) => d.y)
          .y((d) => (!d.depth ? this.side.getMidPoint() : d.x))
      );
  }

  createChildren() {
    if (!this.hasChildren()) return;

    const childBranches = this.data.links().filter((l) => l.source === this.data);

    this.children = this.data.children.map((data, index) => {
      data["branch"] = childBranches[index];

      return new Node(this.side, data, this);
    });
  }

  label() {
    if (this.isRoot() && this.side.isLeft()) return; // Hack

    if (this.hasChildren()) {
      const x = this.isRoot() ? 0 : this.data.y;
      const y = this.isRoot() ? this.side.getMidPoint() : this.data.x;

      this.label = new NodeBoxLabel(this, x, y, this.data.data)
    } else {
      this.label = new NodeLeafLabel(this, this.data.y, this.data.x, this.data.data);
    }
  }

  isRoot() {
    return !this.parentNode;
  }

  hasChildren() {
    return !!this.data.children;
  }

  buildMenu() {
    const contextMenu = this.side.mindMap.app.contextMenu;

    if (!this.isRoot()) contextMenu.add("eye-slash", "Hide", () => console.log("Hide Clicked!"));
    if (this.hasChildren()) contextMenu.add("eye-slash", "Hide Children", () => console.log("Hide Children Clicked!"));
    if (this.hasHiddenLinks(this.fromLinks)) contextMenu.add("arrow-left", "Show From Links", () => this.showLinks(this.fromLinks));
    if (this.hasVisibleLinks(this.fromLinks)) contextMenu.add("arrow-left", "Hide From Links", () => this.hideLinks(this.fromLinks));
    if (this.hasHiddenLinks(this.toLinks)) contextMenu.add("arrow-right", "Show To Links", () => this.showLinks(this.toLinks));
    if (this.hasVisibleLinks(this.toLinks)) contextMenu.add("arrow-right", "Hide To Links", () => this.hideLinks(this.toLinks));
  }

  hasHiddenLinks(links) {
    return !!links.find(link => link.hidden);
  }

  hasVisibleLinks(links) {
    return !!links.find(link => !link.hidden);
  }

  showLinks(links) {
    links.forEach(link => link.show());
  }

  hideLinks(links) {
    links.forEach(link => link.hide());
  }
}
