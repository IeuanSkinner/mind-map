import * as d3 from "d3";
import MindMap from "./mind-map";

export default class Zoom {
  static SCALE_MIN = 0.25;
  static SCALE_MAX = 1.5;
  static BUFFER = 100;
  static TRANSLATE_MIN = [-Zoom.BUFFER, -Zoom.BUFFER];
  static TRANSLATE_Y = -4;

  constructor(app) {
    this.app = app;
    this.fitRatio = this.getFitRatio();
    
    const translateMax = [this.getMaxWidth() + Zoom.BUFFER, this.getMaxHeight() + Zoom.BUFFER];

    this.zoom = d3
      .zoom()
      .scaleExtent([Zoom.SCALE_MIN, Zoom.SCALE_MAX])
      .translateExtent([Zoom.TRANSLATE_MIN, translateMax])
      .on("zoom", (e) => this.handleZoom(e));

    this.app.$el
      .call(this.zoom)
      .on("dblclick.zoom", null);

    this.initZoomPosition();
  }

  handleZoom(e) {
    // console.log("x", e.transform.x, "y", e.transform.y, "k", e.transform.k);

    this.app.contextMenu.close();

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
        width += MindMap.GAP;
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
  initZoomPosition() {
    const centerMindMap = this.app.mindMaps[1];
    const halfWidth = this.app.getWidth() / 2;
    const x = centerMindMap.getX(this.fitRatio);
    const midX = x - halfWidth;

    this.app.$el.call(
      this.zoom.transform,
      d3.zoomIdentity.translate(-midX, Zoom.TRANSLATE_Y).scale(this.fitRatio)
    );
  }
}
