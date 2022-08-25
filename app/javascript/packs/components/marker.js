export default class Marker {
    constructor(app, colour, markerHeight = 8, markerWidth = 6) {
        this.app = app;
        this.$defs = app.$defs;
        this.colour = colour;
        this.markerWidth = markerWidth;
        this.markerHeight = markerHeight;
        
        this.draw();
    }

    draw() {
        this.$marker = this.$defs
            .append("marker")
            .attr("id", `arrowhead-${this.colour.replace("#", "")}`)
            .attr("markerWidth", this.markerWidth)
            .attr("markerHeight", this.markerHeight)
            .attr("refX", 0)
            .attr("refY", this.markerHeight / 2)
            .attr("orient", "auto")
            .append("polygon")
            .attr("fill", this.colour)
            .attr("points",`0 0, ${this.markerWidth} ${this.markerHeight / 2}, 0 ${this.markerHeight}`);
    }
}