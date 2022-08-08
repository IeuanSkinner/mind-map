import * as d3 from "d3";
import e from "turbolinks";
import LinkLabel from "./link-label";

export default class Link {
  constructor(app, data) {
    this.app = app;
    this.fromBranchId = data.from_branch_id;
    this.toBranchId = data.to_branch_id;
    this.id = `link_${this.fromBranchId}_${this.toBranchId}`;
    this.text = data.label;
    this.colour = data.colour || "#000000";
    this.hidden = true;
    this.fromBranch = window.branches.find(
      (branch) => branch.targetId === this.fromBranchId
    );
    this.toBranch = window.branches.find(
      (branch) => branch.targetId === this.toBranchId
    );
    this.fromNode = this.fromBranch.sourceNode;
    this.toNode = this.toBranch.sourceNode;
    this.fromNodeMindMap = this.fromNode.mindMap;
    this.toNodeMindMap = this.toNode.mindMap;
    this.fromNodeSide = this.fromNode.side;
    this.toNodeSide = this.toNode.side;
    this.fromBranchLabel = this.fromBranch.label;
    this.toBranchLabel = this.toBranch.label;

    this.fromNode.toLinks.push(this);
    this.toNode.fromLinks.push(this);
    this.fromBranch.toLinks.push(this);
    this.toBranch.fromLinks.push(this);

    this.data = [];
    this.midPoint = {};

    this.path();
  }

  path() {
    const arrowHeadHeight =
      10 + (this.toBranchLabel.type === "NodeLabel" ? 5 : 0);

    // Same mind-map
    if (this.fromNodeMindMap === this.toNodeMindMap) {
      // Same side of mind-map => requires mid-point
      if (this.fromNodeSide.side === this.toNodeSide.side) {
        const leftSide = this.fromNodeSide.side === "l";
        const source = this.fromBranchLabel.position(leftSide);
        const target = this.toBranchLabel.position(leftSide);
        this.midPoint = this.getOffsetMidPoint(source, target, leftSide);

        // this.data.push(source, midPoint, target);
        this.data.push(
          { source: source, target: this.midPoint },
          { source: this.midPoint, target: target }
        );
        // Different side of same mind-map
      } else {
        let source, target;
        // Right
        if (this.fromNodeSide.side === "l") {
          source = this.fromBranchLabel.position(false);
          target = this.toBranchLabel.position(true);
          // Left
        } else {
          source = this.fromBranchLabel.position(true);
          target = this.toBranchLabel.position(false);
        }

        this.midPoint = this.getMidPoint(source, target);
        this.data.push({ source: source, target: target });
      }
      // Different mind-map
    } else {
      // If the from branch is on a higher-order mind-map then we connect from the labels
      // Left edge to a right edge, otherwise this is inverted.
      const leftSide =
        this.fromNodeMindMap.index > this.toNodeMindMap.index;
      const source = this.fromBranchLabel.position(leftSide);
      const target = this.toBranchLabel.position(!leftSide);

      this.midPoint = this.getMidPoint(source, target);
      this.data.push({ source: source, target: target });
    }

    this.data[this.data.length - 1].end = true;
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

    const maxCurveExtent = 200;
    const curveExtent = diffY > maxCurveExtent ? maxCurveExtent : diffY;

    midPoint.x += leftSide ? -curveExtent : curveExtent;

    return midPoint;
  }

  draw() {
    const colour = this.colour || this.defaultColour;

    this.$group = this.app.$links.append("g");

    this.$link = this.$group
      .selectAll(null)
      .data(this.data)
      .join("path")
      .attr("id", this.id)
      .attr("fill", "none")
      .attr("stroke", colour)
      .attr("stroke-opacity", 1)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 2)
      .attr("marker-end", (d) =>
        d.end ? `url(#arrowhead-${colour.replace("#", "")})` : ""
      )
      .attr(
        "d",
        d3
          .link(d3.curveBumpX)
          .x((d) => d.x)
          .y((d) => d.y)
      );

    this.label = new LinkLabel(this, this.text, this.colour);
  }

  show() {
    this.draw();
    this.hidden = false;
  }

  hide() {
    this.$group.remove();
    this.hidden = true;
  }

  remove() {
    if (!this.$link) return;

    this.$link.remove();
  }
}
