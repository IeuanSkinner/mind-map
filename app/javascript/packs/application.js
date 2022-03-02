// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import * as d3 from "d3";
import MindMap from "./components/mind-map";

Rails.start();
Turbolinks.start();
ActiveStorage.start();

const padding = 0;

class App {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.mind_maps = [];
    this.$data = this.fetchData();

    console.log(this.$data);

    this.$svg = d3
      .select("svg#visualization")
      .attr("width", width)
      .attr("height", height);

    this.build();

    this.$svg.attr("viewBox", [
      -(width / 2),
      -(height / 1.5),
      width,
      height * 1.5,
    ]); // Need to calculate optimal view port after mind-maps are drawn...
  }

  fetchData() {
    return [...document.querySelectorAll("[data-mind-map]")].map(($el) =>
      JSON.parse($el.dataset.mindMap)
    ); // data taken from DOM || localStorage
  }

  build() {
    this.mind_maps = this.$data.map(
      (data, i) => new MindMap(this.$svg, data, i)
    );
  }
}

window.app = new App(window.innerWidth - padding, window.innerHeight - padding);
