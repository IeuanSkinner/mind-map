import HideableComponent from "./hideable-component";

export default class NodeLabel extends HideableComponent {
  constructor(node, x, y, data) {
    super();
    this.node = node;
    this.x = x;
    this.y = y;
    this.data = data;
  }

  addClickListener() {
    this.$el.on("click", (e) => { 
      if (e.shiftKey) { 
        this.onShiftClick(e);
      } else if (e.ctrlKey) {
        this.onCtrlClick(e);
      }
    });

    this.$el.on("dblclick", (e) => this.onDblClick(e));
  }

  onShiftClick(e) {
    this.overrideError("onShiftClick");
  }

  onCtrlClick(e) {
    this.node.hide();
  }

  onDblClick(e) {
    this.node.showDetails();
  }
  
  xOffset(onLeftSide) {
    return 0;
  }

  yOffset() {
    return 0;
  }

  linkPosition(onLeftSide) {
    const x = this.getX() + this.xOffset(onLeftSide);
    const y = this.y + this.yOffset();
    return { x: x, y: y }
  }

  setActive() {
    this.overrideError("setActive");
  }

  setInactive() {
    this.overrideError("setInactive");
  }
}
