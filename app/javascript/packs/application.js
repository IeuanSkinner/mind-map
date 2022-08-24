// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import Rails from "@rails/ujs";
import Turbolinks from "turbolinks";
import * as ActiveStorage from "@rails/activestorage";
import "channels";
import * as d3 from "d3";
import MindMap from "./components/mind-map";
import Zoom from "./components/zoom";
import Link from "./components/link";
import ContextMenu from "./components/context-menu";
import Component from "./components/component";
import Marker from "./components/marker";
import NodeDetails from "./details/node";
import LinkDetails from "./details/link";

Rails.start();
Turbolinks.start();
ActiveStorage.start();

class App extends Component {
  static GAP = 100;

  constructor() {
    super(d3.select("svg"));

    this.mindMapsData = this.fetchData("mind-maps");
    this.linksData = this.fetchData("links");
    this.topicAreasData = this.fetchData("topic-areas");

    this.nodeDetails = new NodeDetails(this);
    this.linkDetails = new LinkDetails(this);

    this.mindMaps = [];
    this.nodes = [];
    this.mindMapsData.forEach((data, index) => this.mindMaps.push(new MindMap(this, data, index)));

    this.$defs = this.$el.append("defs");
    this.markers = [new Marker(this.$defs, "#000000")]; // Default marker.
    this.topicAreasData.forEach((data) => this.markers.push(new Marker(this.$defs, data.colour)));

    this.$links = this.$el.append("g");
    this.links = this.linksData.map((data) => new Link(this, data));

    this.contextMenu = new ContextMenu(this);
    this.zoom = new Zoom(this);

    this.width = this.getWidth();
  }

  fetchData(type) {
    const dataNode = document.querySelector(`[data-${type}]`);
    const data = JSON.parse(dataNode.getAttribute(`data-${type}`));

    return data.map(datum => JSON.parse(datum));
  }

  calcWidth() {
    const width = this.width - this.nodeDetails.getWidth() - this.linkDetails.getWidth();

    this.setStyle("width", `${width}px`);
  }
}

window.app = new App();
