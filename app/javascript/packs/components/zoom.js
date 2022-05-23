import * as d3 from "d3";

export default class Zoom {
  constructor(app) {
    this.app = app;

    app.$svg.call(d3.zoom().on("zoom", (e) => this.handleZoom(e)));
  }

  handleZoom(e) {
    this.app.gap = this.app.initGap * e.transform.k;

    this.app.mindMaps.forEach((mindMap) => mindMap.handleZoom(e));
  }
}
