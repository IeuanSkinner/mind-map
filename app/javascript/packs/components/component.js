
export default class Component {
    constructor($el) {
        this.$el = $el;
    }
    
    getWidth() {
        if (!this.$el) return 0;

        return Math.ceil(this.getBoundingClientRect().width);
    }

    getHeight() {
        if (!this.$el) return 0;

        return Math.ceil(this.getBoundingClientRect().height);
    }

    getBoundingClientRect() {
        if (!this.$el) return;

        return this.$el.node().getBoundingClientRect();
    }
}