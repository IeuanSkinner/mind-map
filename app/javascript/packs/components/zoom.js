import * as d3 from "d3";
import { max } from "d3";

export default class Zoom {
  constructor(app) {
    this.app = app;
    this.scaleMin = 0.24;
    this.scaleMax = 1.5;
    this.fitRatio = this.getFitRatio();

    const buffer = 100;
    this.translateMin = [-buffer, -buffer];
    this.translateMax = [
      this.getMaxWidth() + buffer,
      this.getMaxHeight() + buffer,
    ];

    this.zoom = d3
      .zoom()
      .scaleExtent([this.scaleMin, this.scaleMax])
      .translateExtent([this.translateMin, this.translateMax])
      .on("zoom", (e) => this.handleZoom(e));

    this.app.$svg.call(this.zoom);

    this.init();
  }

  handleZoom(e) {
    // console.log("x", e.transform.x, "y", e.transform.y, "k", e.transform.k);

    this.app.mindMaps.forEach((mindMap) => mindMap.handleZoom(e));
    this.app.$links.attr(
      "transform",
      `translate(${e.transform.x}, ${e.transform.y}) scale(${e.transform.k})`
    );
  }

  getMaxWidth() {
    let width = 0;

    this.app.mindMaps.forEach((mindMap, i) => {
      width += mindMap.getWidth();

      if (i < this.app.mindMaps.length - 1) {
        width += this.app.gap;
      }
    });

    return width;
  }

  getMaxHeight() {
    let maxHeight = 0;

    this.app.mindMaps.forEach((mindMap) => {
      const height = mindMap.getHeight();

      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    return maxHeight;
  }

  getFitRatio() {
    const maxHeight = this.getMaxHeight();
    const viewPortHeight = this.app.getHeight();

    return viewPortHeight / maxHeight;
  }

  // Center the WJEC GCE Mathematics mind-map
  init() {
    const centerMindMap = this.app.mindMaps[1];
    const halfWidth = this.app.getWidth() / 2;
    const x = centerMindMap.getX(this.fitRatio);
    const midX = x - halfWidth;

    this.app.$svg.call(
      this.zoom.transform,
      d3.zoomIdentity.translate(-midX, -8).scale(this.fitRatio)
    );
  }
}
