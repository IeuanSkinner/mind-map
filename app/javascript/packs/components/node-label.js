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
        this.$el = this.$el.on("click", (e) => { 
            if (e.ctrlKey) { 
                this.onCtrlClick(e);
            } else if (e.shiftKey) {
                this.node.hide();
            }
        });
    }

    onShiftClick() {

    }

    onCtrlClick(e) {
        this.overrideError("onCtrlClick");
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
}
