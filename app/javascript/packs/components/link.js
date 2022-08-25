import * as d3 from "d3";
import LinkLabel from "./link-label";
import Node from "./node";
import HideableComponent from "./hideable-component";

export default class Link extends HideableComponent {
  static MAX_CURVE_EXTENT = 200;

  constructor(app, data) {
    super(true);
    this.app = app;
    this.data = data;

    this.fromNodeId = data.from_node_id;
    this.toNodeId = data.to_node_id;
    this.fromNode = app.nodes.find((node) => node.id === this.fromNodeId);
    this.toNode = app.nodes.find((node) => node.id === this.toNodeId);
    this.fromNode.toLinks.push(this);
    this.toNode.fromLinks.push(this);

    this.id = `link_${this.fromNodeId}_${this.toNodeId}`;
    this.linkData = [];
    this.midPoint = {};
    this.colour = this.data.colour || Node.DEFAULT_COLOUR;

    this.path();

    this.label = new LinkLabel(this, this.data.label, this.colour);
  }

  path() {
    // Same mind-map
    if (this.fromNode.side.mindMap === this.toNode.side.mindMap) {
      // Same side of same mind-map => requires mid-point
      if (this.fromNode.side.side === this.toNode.side.side) {
        // If the fromNode and toNode are on the left-side we attach
        // the link at their labels left-side, otherwise this is inverted.
        const onLeftSide = this.fromNode.side.isLeft();
        const source = this.fromNode.label.linkPosition(onLeftSide);
        const target = this.toNode.label.linkPosition(onLeftSide);
        this.midPoint = this.getOffsetMidPoint(source, target, onLeftSide);

        this.linkData.push(
          { source: source, target: this.midPoint },
          { source: this.midPoint, target: target }
        );
      // Different side of same mind-map
      } else {
        let source, target;
        // Attach fromNode at right-side and toNode at left-side
        if (this.fromNode.side.isLeft()) {
          source = this.fromNode.label.linkPosition(false);
          target = this.toNode.label.linkPosition(true);
          // Attach fromNode at left-side and toNode at right-side
        } else {
          source = this.fromNode.label.linkPosition(true);
          target = this.toNode.label.linkPosition(false);
        }

        this.midPoint = this.getMidPoint(source, target);
        this.linkData.push({ source: source, target: target });
      }
    // Different mind-maps
    } else {
      // If the fromNode is on a higher-order mind-map then we connect from the labels
      // left-side to the toNode labels right-side, otherwise this is inverted.
      const onLeftSide = this.fromNode.side.mindMap.index > this.toNode.side.mindMap.index;
      const source = this.fromNode.label.linkPosition(onLeftSide);
      const target = this.toNode.label.linkPosition(!onLeftSide);

      this.midPoint = this.getMidPoint(source, target);
      this.linkData.push({ source: source, target: target });
    }

    this.getLastLinkData().end = true;
  }

  getLastLinkData() {
    return this.linkData[this.linkData.length - 1];
  }

  getMidPoint(source, target) {
    const diffX = target.x - source.x;
    const diffY = target.y - source.y;

    return {
      x: source.x + diffX / 2,
      y: source.y + diffY / 2,
    };
  }

  getOffsetMidPoint(source, target, leftSide) {
    const midPoint = this.getMidPoint(source, target);
    const diffY = target.y - source.y;
    const curveExtent = diffY > Link.MAX_CURVE_EXTENT ? Link.MAX_CURVE_EXTENT : diffY;

    midPoint.x += leftSide ? -curveExtent : curveExtent;

    return midPoint;
  }

  draw() {
    this.$el = this.app.$links.append("g");

    this.$link = this.$el
      .selectAll(null)
      .data(this.linkData)
      .join("path")
      .attr("fill", "none")
      .attr("stroke", this.colour)
      .attr("stroke-opacity", 1)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 2)
      .attr("marker-end", d => d.end ? this.buildArrowHead(this.colour) : "")
      .attr(
        "d",
        d3
          .link(d3.curveBumpX)
          .x((d) => d.x)
          .y((d) => d.y)
      )
  }

  buildMenu() {
    const contextMenu = this.app.contextMenu;

    contextMenu.add("info-circle", "Details", () => this.showDetails());
    contextMenu.add("eye-slash", "Hide", () => this.hide());
  }

  hide() {
    super.hide();
    this.label.hide();
  }

  show() {
    if (!this.hidden) return;
    if (this.fromNode.hidden) this.fromNode.show();
    if (this.toNode.hidden) this.toNode.show();

    super.show();
    this.label.show();
  }

  showDetails() {
    this.app.linkDetails.show(this);
  }

  setActive() {
    if (!this.hidden) this.hide();
    this.show();

    if (this.$link) {
      this.$link.attr("stroke", HideableComponent.ACTIVE_COLOUR);

      if (this.$link.attr("marker-end")) this.$link.attr("marker-end", this.buildArrowHead(HideableComponent.ACTIVE_COLOUR));
    }

    super.setActive();
  }

  setInactive() {
    if (this.$link) { 
      this.$link.attr("stroke", this.colour);

      if (this.$link.attr("marker-end")) this.$link.attr("marker-end", this.buildArrowHead(this.colour));
    }

    super.setInactive();
  }

  buildArrowHead(colour) {
    return `url(#arrowhead-${colour.replace("#", "")})`;
  }
}
