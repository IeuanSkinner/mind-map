
export default class Component {
    constructor($el) {
        this.$el = $el;
    }

    getX() {
        if (!this.$el) return 0;

        return Math.ceil(this.getBoundingClientRect().x);
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

    overrideError(functionName) {
        console.error(`${this.className} ${functionName}() function was not overridden!`, this);
    }
}