
export default class Component {
    constructor($el) {
        this.$el = $el;
    }

    getX() {
        if (!this.$el) return 0;

        return this.getBoundingClientRect().x;
    }
    
    getWidth() {
        if (!this.$el) return 0;

        return this.getBoundingClientRect().width;
    }

    getHeight() {
        if (!this.$el) return 0;

        return this.getBoundingClientRect().height;
    }

    getBoundingClientRect() {
        if (!this.$el) return;

        return this.$el.node().getBoundingClientRect();
    }
}