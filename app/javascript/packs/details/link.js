import BaseDetails from "./base";

export default class LinkDetails extends BaseDetails {
  constructor(app) {
    super(app, "link-details");
  }

  show(link) {
    const data = link.data;
    
    this.setColour(data.colour);

    super.show();
  }
}
