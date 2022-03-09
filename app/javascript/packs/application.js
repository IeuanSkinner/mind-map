// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import * as d3 from "d3";
import MindMap from "./components/mind-map";
import { min } from "d3";

Rails.start();
Turbolinks.start();
ActiveStorage.start();

class App {
  constructor(width, height, gap = 100) {
    this.width = width;
    this.height = height;
    this.gap = gap;
    this.data = this.fetchData();
    this.count = this.data.length;
    this.$svg = d3
      .select("svg#visualization")
      .attr("width", width)
      .attr("height", height);

    this.availableWidth = this.width - this.gap * (this.count - 1);
    this.maxWidth = this.availableWidth / this.count;

    this.mindMaps = [];
    this.data.forEach((data, i) =>
      this.mindMaps.push(new MindMap(this, data, i))
    );
  }

  fetchData() {
    return [...document.querySelectorAll("[data-mind-map]")].map(($el) =>
      JSON.parse($el.dataset.mindMap)
    ); // fetch data from DOM || localStorage || remote?
  }
}

window.nodes = [];
window.mindMaps = [];
window.branches = [];
window.app = new App(window.innerWidth, window.innerHeight);
