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
  constructor(width, height, gap = 300) {
    this.width = width;
    this.height = height;
    this.gap = gap;
    this.mind_maps = [];
    this.$data = this.fetchData();
    this.$svg = d3
      .select("svg#visualization")
      .attr("width", width)
      .attr("height", height);

    this.build();
    this.position();

    this.$svg.attr("viewBox", [0, -(height / 1.5), width, height * 1.5]); // Need to calculate optimal view port after mind-maps are drawn...
  }

  fetchData() {
    return [...document.querySelectorAll("[data-mind-map]")].map(($el) =>
      JSON.parse($el.dataset.mindMap)
    ); // fetch data from DOM || localStorage || remote?
  }

  build() {
    this.mind_maps = this.$data.map((data) => new MindMap(this, data));
  }

  position() {
    let buffer = 0;

    this.mind_maps.forEach((current, i) => {
      const previous = this.mind_maps[i - 1];

      if (previous) {
        buffer +=
          previous.width() / previous.sides +
          this.gap +
          current.width() / current.sides;

        current.$mind_map.attr("transform", `translate(${buffer}, 0)`);
      }
    });
  }

  findMap(position) {
    return this.mind_maps.find((m) => m.data.position === position);
  }
}

window.app = new App(window.innerWidth - padding, window.innerHeight - padding);
