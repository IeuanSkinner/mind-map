import BaseDetails from "./base";

export default class NodeDetails extends BaseDetails {
  constructor(app) {
    super(app, "node-details");
  }

  show(node) {
    const data = node.data.data;

    this.setTitle(data.label);
    this.setColour(data.colour);

    super.show();
  }
}
