import * as d3 from "d3";
import Label from "./label";
import NodeLabel from "./node-label";

export default class Node {
  constructor(side, data, parentNode) {
    this.parentNode = parentNode;
    this.side = side;
    this.data = data;
    this.id = this.data.data.id;
    this.colour = this.isRoot() ? null : this.data.data.colour || "#000000";
    this.branch = this.isRoot() ? null : this.data.branch;
    this.children = [];
    this.fromLinks = [];
    this.toLinks = [];

    if (this.hasChildren()) {
      const childBranches = this.data.links().filter((l) => l.source === this.data);

      this.children = this.data.children.map((data, index) => {
        data["branch"] = childBranches[index];
        return new Node(side, data, this);
      });
    }

    if (parentNode) {
      this.drawBranch();
    }

    this.label();

    window.nodes.push(this);
  }

  drawBranch() {
    this.$branch = this.side.$side
      .selectAll(null)
      .data([this.branch])
      .join("path")
      .attr("fill", "none")
      .attr("stroke", this.colour)
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

  label() {
    if (this.isRoot() && this.side.side !== "r") return;

    if (this.hasChildren()) {
      this.label = new NodeLabel(this, 
                                 this.isRoot() ? 0 : this.data.y, 
                                 this.isRoot() ? this.side.getMidPoint() : this.data.x, 
                                 this.data.data)
    } else {
      this.label = new Label(this, this.data.y, this.data.x, this.data.data);
    }
  }

  isRoot() {
    return !this.parentNode;
  }

  hasChildren() {
    return !!this.data.children;
  }

  buildMenu(contextMenu) {
    if (!this.isRoot()) {
      const hideListItem = contextMenu.newListItem();
      hideListItem.innerHTML = '<i class="fa fa-eye-slash"></i> Hide';
      contextMenu.add(hideListItem);
    }
    
    if (this.hasChildren()) {
      const hideChildrenListItem = contextMenu.newListItem();
      hideChildrenListItem.innerHTML = '<i class="fa fa-eye-slash"></i> Hide Children';
      contextMenu.add(hideChildrenListItem);
    }

    if (this.hasHiddenLinks(this.fromLinks)) {
      const showFromLinksListItem = contextMenu.newListItem();
      showFromLinksListItem.innerHTML = '<i class="fa fa-arrow-left"></i> Show From Links';
      
      contextMenu.addClick(this, showFromLinksListItem, () => this.showLinks(this.fromLinks));
      contextMenu.add(showFromLinksListItem);
    }

    if (this.hasVisibleLinks(this.fromLinks)) {
      const hideFromLinksListItem = contextMenu.newListItem();
      hideFromLinksListItem.innerHTML = '<i class="fa fa-arrow-left"></i> Hide From Links';
      
      contextMenu.addClick(this, hideFromLinksListItem, () => this.hideLinks(this.fromLinks));
      contextMenu.add(hideFromLinksListItem);
    }

    if (this.hasHiddenLinks(this.toLinks)) {
      const showToLinksListItem = contextMenu.newListItem();
      showToLinksListItem.innerHTML = '<i class="fa fa-arrow-right"></i> Show To Links';

      contextMenu.addClick(this, showToLinksListItem, () => this.showLinks(this.toLinks));
      contextMenu.add(showToLinksListItem);
    }

    if (this.hasVisibleLinks(this.toLinks)) {
      const hideToLinksListItem = contextMenu.newListItem();
      hideToLinksListItem.innerHTML = '<i class="fa fa-arrow-right"></i> Hide To Links';

      contextMenu.addClick(this, hideToLinksListItem, () => this.hideLinks(this.toLinks));
      contextMenu.add(hideToLinksListItem);
    }
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
