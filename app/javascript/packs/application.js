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
  constructor(width, height, gap = 200, sideWidth = 240) {
    this.width = width;
    this.height = height;
    this.sideWidth = sideWidth;
    this.initGap = gap;
    this.gap = gap;
    this.data = this.fetchData();
    this.$svg = d3
      .select("svg#visualization")
      .attr("width", width)
      .attr("height", height);

    this.mindMaps = [];
    this.data.forEach((data, i) =>
      this.mindMaps.push(new MindMap(this, data, i))
    );

    // this.zoom = 1;
    // this.initZoom = 1;
    // this.zoomBtn = document.querySelector("#zoom");
    // this.zoomIn = this.zoomBtn.querySelector("#in");
    // this.zoomOut = this.zoomBtn.querySelector("#out");

    // this.zoomIn.addEventListener("click", () => {
    //   this.zoom += 0.1;
    //   this.gap = this.initGap * this.zoom;
    //   window.mindMaps.forEach((mindMap) =>
    //     mindMap.handleZoom({ transform: { k: this.zoom } })
    //   );
    // });

    // this.zoomOut.addEventListener("click", () => {
    //   this.zoom -= 0.1;
    //   this.gap = this.initGap * this.zoom;
    //   window.mindMaps.forEach((mindMap) =>
    //     mindMap.handleZoom({ transform: { k: this.zoom } })
    //   );
    // });

    const zoom = d3.zoom().on("zoom", (e) => {
      // this.zoom = this.initZoom * e.transform.k;
      this.gap = this.initGap * e.transform.k;
      window.mindMaps.forEach((mindMap) => mindMap.handleZoom(e));
    });
    this.$svg.call(zoom);
  }

  fetchData() {
    return [...document.querySelectorAll("[data-mind-map]")].map(($el) =>
      JSON.parse($el.dataset.mindMap)
    ); // fetch data from DOM || localStorage || remote?
  }
}

window.nodes = [];
window.mindMaps = [];
window.sides = [];
window.branches = [];
window.app = new App(window.innerWidth, window.innerHeight);
