import Component from "./component";
import Side from "./side";

export default class MindMap extends Component {
  static GAP = 100;

  constructor(app, data, index) {
    super(app.$el.append("g"));

    this.app = app;
    this.data = data;
    this.index = index;
    this.id = data.id;
    this.priorMindMap = this.app.mindMaps[index - 1];

    this.left = new Side(this, this.data, Side.LEFT);
    this.right = new Side(this, this.data, Side.RIGHT);
    this.leftWidth = this.left.getWidth();
    this.rightWidth = this.right.getWidth();

    this.initMindMapPosition();
  }

  initMindMapPosition() {
    this.$el.attr("transform", `translate(${this.getX()}, 1)`);
  }

  handleZoom(e) {
    this.$el.attr(
      "transform",
      `translate(${e.transform.x + this.getX(e.transform.k)}, ${
        e.transform.y
      }) scale(${e.transform.k})`
    );
  }

  // @Override
  // First mind-maps center is positioned at x=0.
  // All other mind-maps centers are calculated.
  getX(scale = 1) {
    return this.priorMindMap ? this.getMidPoint(scale) : 0;
  }

  getMidPoint(scale = 1) {
    const priorMindMapX = this.priorMindMap.getX(scale);
    const priorMindRightWidth = this.priorMindMap.rightWidth * scale;
    const gap = MindMap.GAP * scale;
    const leftWidth = this.leftWidth * scale;
    
    return priorMindMapX + priorMindRightWidth + gap + leftWidth;
  }
}
