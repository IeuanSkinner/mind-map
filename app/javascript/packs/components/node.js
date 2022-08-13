import * as d3 from "d3";
import NodeLeafLabel from "./node-leaf-label";
import NodeBoxLabel from "./node-box-label";
import HideableComponent from "./hideable-component";

export default class Node extends HideableComponent {
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
    this.hidden = false;

    this.draw()
    this.createChildren();
    this.drawLabel();

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
      )
  }

  createChildren() {
    if (!this.hasChildren()) return;

    const childBranches = this.data.links().filter((l) => l.source === this.data);

    this.children = this.data.children.map((data, index) => {
      data["branch"] = childBranches[index];

      return new Node(this.side, data, this);
    });

    this.redrawChildrenLabels();
  }

  drawLabel() {
    if (this.isRoot() && this.side.isLeft()) return; // Hack

    if (this.hasChildren()) {
      const x = this.isRoot() ? 0 : this.data.y;
      const y = this.isRoot() ? this.side.getMidPoint() : this.data.x;

      this.label = new NodeBoxLabel(this, x, y, this.data.data)
    } else {
      this.label = new NodeLeafLabel(this, this.data.y, this.data.x, this.data.data);
    }
  }

  buildMenu() {
    const mindMap = this.side.mindMap;
    const contextMenu = mindMap.app.contextMenu;

    if (this.isRoot()) {
      if (mindMap.hasVisibleChildren()) contextMenu.add("eye-slash", "Hide Children", () => mindMap.hideChildren());
      if (mindMap.hasHiddenChildren()) { 
        contextMenu.add("eye", "Show Children", () => mindMap.showChildren());
        contextMenu.add("eye", "Show All Children", () => mindMap.showChildren(true));
      }
    } else { 
      contextMenu.add("eye-slash", "Hide", () => this.hide());

      if (this.hasVisible(this.children)) contextMenu.add("eye-slash", "Hide Children", () => this.hideChildren());
      if (this.hasHidden(this.children)) { 
        contextMenu.add("eye", "Show Children", () => this.showChildren());
        contextMenu.add("eye", "Show All Children", () => this.showChildren(true));
      }
    }

    if (this.hasHidden(this.fromLinks)) contextMenu.add("arrow-left", "Show From Links", () => this.showComponents(this.fromLinks));
    if (this.hasVisible(this.fromLinks)) contextMenu.add("arrow-left", "Hide From Links", () => this.hideComponents(this.fromLinks));
    if (this.hasHidden(this.toLinks)) contextMenu.add("arrow-right", "Show To Links", () => this.showComponents(this.toLinks));
    if (this.hasVisible(this.toLinks)) contextMenu.add("arrow-right", "Hide To Links", () => this.hideComponents(this.toLinks));
  }

  redrawLabel() {
    if (!this.label) return;

    this.label.hide();
    this.label.show();
  }

  // Redrawing the label prevents the branch paths overlapping the labels due to their draw order.
  redrawChildrenLabels() {
    this.children.forEach(child => child.redrawLabel());
  }

  show(bubble = false) {
    super.show();
    
    if (this.label) this.label.show();

    if (bubble) this.showChildren(bubble);
  }

  hide() {
    if (this.label) this.label.hide();
    this.hideChildren();

    super.hide();
  }

  isRoot() {
    return !this.parentNode;
  }

  showChildren(bubble = false) {
    this.showComponents(this.children, bubble);
    this.redrawLabel();
    this.redrawChildrenLabels();
  }

  hideChildren() {
    this.hideComponents(this.children);
  }

  hasChildren() {
    return !!this.data.children;
  }

  hasHidden(hideableComponents) {
    return !!hideableComponents.find(hideableComponent => hideableComponent.hidden);
  }

  hasVisible(hideableComponents) {
    return !!hideableComponents.find(hideableComponent => !hideableComponent.hidden);
  }

  showComponents(hideableComponents, bubble = false) {
    hideableComponents.forEach(hideableComponent => hideableComponent.show(bubble));
  }

  hideComponents(hideableComponents) {
    hideableComponents.forEach(hideableComponent => hideableComponent.hide());
  }
}
