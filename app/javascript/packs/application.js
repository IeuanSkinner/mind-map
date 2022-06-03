// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import * as d3 from "d3";
import MindMap from "./components/mind-map";
import Zoom from "./components/zoom";

Rails.start();
Turbolinks.start();
ActiveStorage.start();

class App {
  constructor(gap = 600, sideWidth = 800) {
    this.data = this.fetchData();
    this.$svg = d3.select("svg#visualization");
    this.sideWidth = sideWidth;
    this.initGap = gap;
    this.gap = gap;

    this.mindMaps = [];
    this.data.forEach((data, i) =>
      this.mindMaps.push(new MindMap(this, data, i))
    );

    window.nodes.forEach((node) => node.draw());
    window.branches.forEach((branch) => branch.label());

    this.zoom = new Zoom(this);
  }

  fetchData() {
    return [...document.querySelectorAll("[data-mind-map]")].map(($el) =>
      JSON.parse($el.dataset.mindMap)
    ); // fetch data from DOM || localStorage || remote?
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
