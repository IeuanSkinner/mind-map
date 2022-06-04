// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import * as d3 from "d3";
import MindMap from "./components/mind-map";
import Zoom from "./components/zoom";
import Link from "./components/link";

Rails.start();
Turbolinks.start();
ActiveStorage.start();

class App {
  constructor(gap = 400, sideWidth = 200) {
    this.data = this.fetchData();
    this.linksData = this.fetchLinksData();
    this.topicAreasData = this.fetchTopicAreasData();
    this.$svg = d3.select("svg#visualization");
    this.$defs = this.$svg.append("defs");
    this.sideWidth = sideWidth;
    this.gap = gap;

    this.addMarkers("#000000"); // Default marker.
    this.topicAreasData.forEach((data) => {
      this.addMarkers(data.colour);
    });

    this.mindMaps = [];
    this.data.forEach((data, i) =>
      this.mindMaps.push(new MindMap(this, data, i))
    );

    this.$links = this.$svg.append("g");
    // this.links = this.linksData.map((data) => new Link(this, data));
    this.links = [this.linksData[0]].map((data) => new Link(this, data));

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
    const width = 8;
    const height = 6;

    this.$defs
      .append("marker")
      .attr("id", `arrowhead-${colour.replace("#", "")}`)
      .attr("markerWidth", width)
      .attr("markerHeight", height)
      .attr("refX", 0)
      .attr("refY", height / 2)
      .attr("orient", "auto")
      .append("polygon")
      .attr("fill", colour)
      .attr("points", `0 0, ${width} ${height / 2}, 0 ${height}`);
  }

  getWidth() {
    if (!this.$svg) return 0;

    return this.getBoundingClientRect().width;
  }

  getHeight() {
    if (!this.$svg) return 0;

    return this.getBoundingClientRect().height;
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
