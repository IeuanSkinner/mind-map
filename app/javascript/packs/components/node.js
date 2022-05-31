import * as d3 from "d3";
import Branch from "./branch";

export default class Node {
  constructor(mindMap, side, data) {
    this.mindMap = mindMap;
    this.side = side;
    this.data = data;

    if (this.hasChildren()) {
      this.children = this.data.children.map(
        (data) => new Node(mindMap, side, data)
      );

      const links = this.data.links().filter((l) => l.source === this.data);
      this.branches = links.map((data) => new Branch(this, data));

      this.draw();
    } else {
      this.children = [];
      this.branches = [];
    }

    window.nodes.push(this);
  }

  draw() {
    if (this.data.depth > 0 || this.side.side !== "r") return;

    const text = [...this.data.data.label.split(" ")];
    const nodeText = [text[0] + " " + text[1]].concat(text.slice(2));

    const width = 115;
    const height = nodeText.length * 25;
    const x = -(width / 2);
    const y = (this.mindMap.app.getHeight() - height) / 2;

    this.$nodeGroup = this.side.$side.append("g");

    this.$nodeShape = this.$nodeGroup
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("x", x)
      .attr("y", y)
      .attr("rx", 5)
      .attr("stroke", "black")
      .attr("stroke-width", 3)
      .attr("fill", "white");

    nodeText.map((text, i) => {
      const xOffset = 15;
      const yOffset = 20;
      const spacing = i * yOffset;

      return this.$nodeGroup
        .append("text")
        .attr("x", x + xOffset)
        .attr("y", y + yOffset + spacing)
        .text(text);
    });
  }

  hasChildren() {
    return !!this.data.children;
  }
}
