import chroma from "chroma-js";

export default class Colour {
  static DEFAULT = "#A457D7";
  static DEFAULT_BRIGHT = "#E0A5FB";
  static ACTIVE = "#FF0000";
  static BLACK = "#000000";

  constructor() {}

  get(colour) {
    return colour || Colour.DEFAULT;
  }

  brighten(colour) {
    return colour === Colour.DEFAULT ? Colour.DEFAULT_BRIGHT : chroma(colour).brighten(2).hex();
  }
}

window.colour = new Colour();