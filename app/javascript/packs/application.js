// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import Rails from "@rails/ujs";
import * as bootstrap from "bootstrap";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import * as d3 from "d3";
import MindMap from "./components/mind-map";
import Zoom from "./components/zoom";
import Link from "./components/link";
import ContextMenu from "./components/context-menu";

Rails.start();
Turbolinks.start();
ActiveStorage.start();

class App {
  constructor(gap = 100, sideWidth = 200) {
    this.data = this.fetchData();
    this.linksData = this.fetchLinksData();
    this.topicAreasData = this.fetchTopicAreasData();
    this.sideWidth = sideWidth;
    this.gap = gap;
    this.$svg = d3.select("svg#visualization");
    this.$defs = this.$svg.append("defs");
    this.mindMaps = [];
    this.data.forEach((data, i) =>
      this.mindMaps.push(new MindMap(this, data, i))
    );
    this.$links = this.$svg.append("g");
    this.addMarkers("#000000"); // Default marker.
    this.topicAreasData.forEach((data) => this.addMarkers(data.colour));
    this.links = this.linksData.map((data) => new Link(this, data));
    this.contextMenu = new ContextMenu(this);
    this.zoom = new Zoom(this);
  }

  fetchData() {
    return [...document.querySelectorAll("[data-mind-map]")].map(($el) =>
      JSON.parse($el.dataset.mindMap)
    ); // fetch data from DOM || localStorage || remote?
  }

  fetchLinksData() {
    return [...document.querySelectorAll("[data-link]")].map(($el) =>
      JSON.parse($el.dataset.link)
    );
  }

  fetchTopicAreasData() {
    return [...document.querySelectorAll("[data-topic-area]")].map(($el) =>
      JSON.parse($el.dataset.topicArea)
    );
  }

  addMarkers(colour) {
    const markerWidth = 8;
    const markerHeight = 6;

    this.$defs
      .append("marker")
      .attr("id", `arrowhead-${colour.replace("#", "")}`)
      .attr("markerWidth", markerWidth)
      .attr("markerHeight", markerHeight)
      .attr("refX", 0)
      .attr("refY", markerHeight / 2)
      .attr("orient", "auto")
      .append("polygon")
      .attr("fill", colour)
      .attr(
        "points",
        `0 0, ${markerWidth} ${markerHeight / 2}, 0 ${markerHeight}`
      );
  }

  // Useful for debugging
  drawLinks(speed) {
    let i = 0;

    this.drawLinksInterval = setInterval(() => {
      this.links.forEach((link) => link.remove());
      this.links[i].draw();
      i++;

      if (i < this.links.length) return;

      this.stopDrawLinks();
    }, speed || 1000);
  }

  hideLinks(branch) {
    this.links.forEach((link) => {
      if (link.fromBranch === branch || link.toBranch === branch) return;

      link.hide();
    });
  }

  stopDrawLinks() {
    if (!this.drawLinksInterval) return;

    clearInterval(this.drawLinksInterval);
    this.clearLinks();
  }

  getWidth() {
    if (!this.$svg) return 0;

    return Math.ceil(this.getBoundingClientRect().width);
  }

  getHeight() {
    if (!this.$svg) return 0;

    return Math.ceil(this.getBoundingClientRect().height);
  }

  getBoundingClientRect() {
    if (!this.$svg) return;

    return this.$svg.node().getBoundingClientRect();
  }
}

window.nodes = [];
window.mindMaps = [];
window.sides = [];
window.branches = [];
window.app = new App();
