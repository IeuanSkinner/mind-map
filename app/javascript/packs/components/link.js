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
    this.fromBranchMindMap = this.fromBranch.mindMap;
    this.toBranchMindMap = this.toBranch.mindMap;
    this.fromBranchSide = this.fromBranch.side;
    this.toBranchSide = this.toBranch.side;
    this.fromBranchLabel = this.fromBranch.label;
    this.toBranchLabel = this.toBranch.label;

    this.fromBranch.toLinks.push(this);
    this.toBranch.fromLinks.push(this);

    this.data = [];
    this.midPoint = {};
    // this.lineCurve = d3
    //   .line()
    //   .x((d) => d.x)
    //   .y((d) => d.y)
    //   .curve(d3.curveMonotoneY);

    this.path();
    this.draw();
  }

  path() {
    const arrowHeadHeight =
      10 + (this.toBranchLabel.type === "NodeLabel" ? 5 : 0);

    // Same mind-map
    if (this.fromBranchMindMap === this.toBranchMindMap) {
      // Same side of mind-map => requires mid-point
      if (this.fromBranchSide.side === this.toBranchSide.side) {
        const leftSide = this.fromBranchSide.side === "l";
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
        if (this.fromBranchSide.side === "l") {
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
        this.fromBranchMindMap.index > this.toBranchMindMap.index;
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

    this.$group = this.app.$links.append("g").attr("opacity", 0);

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

    // this.$text = this.$group
    //   .append("text")
    //   .append("textPath")
    //   .attr("xlink:href", `#${this.id}`)
    //   .attr("startOffset", "50%")
    //   .attr("text-anchor", "middle")
    //   .text(this.label);
    this.label = new LinkLabel(this, this.text, this.colour);

    // this.$link = this.app.$links
    //   .append("path")
    //   .attr("id", this.id)
    //   .attr("fill", "none")
    //   .attr("stroke", colour)
    //   .attr("stroke-opacity", 1)
    //   .attr("stroke-linecap", "round")
    //   .attr("stroke-linejoin", "round")
    //   .attr("stroke-width", 2)
    //   .attr("marker-end", `url(#arrowhead-${colour.replace("#", "")})`)
    //   .attr("d", this.lineCurve(this.data));
  }

  show() {
    if (!this.$link) return;

    this.$group.transition().duration(500).style("opacity", 1);
    this.hidden = false;
  }

  hide() {
    if (!this.$link) return;

    this.$group.transition().duration(500).style("opacity", 0);
    this.hidden = true;
  }

  remove() {
    if (!this.$link) return;

    this.$link.remove();
  }
}
