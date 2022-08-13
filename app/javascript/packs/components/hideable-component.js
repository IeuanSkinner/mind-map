import Component from "./component";

export default class HideableComponent extends Component {
    constructor(hidden = false) {
        super();
        this.hidden = hidden;
    }

    draw() {
        this.overrideError("draw");
    }

    erase() {
        if (!this.$el) return;
        
        this.$el.remove();
    }

    hide() {
        if (this.hidden) return;

        this.hidden = true;
        this.erase();
    }

    show() {
        if (!this.hidden) return;

        this.hidden = false;
        this.draw();
    }
}
