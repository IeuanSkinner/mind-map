import Zoom from "../components/zoom";

export default class ZoomControls {
  static ZOOM_PERCENTAGE = 10; // +-10% on button click

  constructor(zoom) {
    this.zoom = zoom;
    this.transform = {};

    this.translateMax = zoom.translateMax;
    this.translateMin = Zoom.TRANSLATE_MIN;
    this.scaleMin = Zoom.SCALE_MIN;
    this.scaleMax = Zoom.SCALE_MAX;

    this.$controls = document.querySelector("#zoom-controls");
    this.$zoomIn = this.$controls.querySelector("#zoom-in");
    this.$zoomOut = this.$controls.querySelector("#zoom-out");
    this.$text = this.$controls.querySelector("#zoom-text");
    this.$fullscreen = this.$controls.querySelector("#fullscreen");
    this.$fullscreenIcon = this.$fullscreen.querySelector("i");

    this.zoomAmount = (this.scaleMax - this.scaleMin) / ZoomControls.ZOOM_PERCENTAGE;

    this.$zoomIn.addEventListener("click", () => {
      let k = this.transform.k + this.zoomAmount;
      if (k > this.scaleMax) k = this.scaleMax;

      this.handleZoom(k);
    });

    this.$zoomOut.addEventListener("click", () => {
      let k = this.transform.k - this.zoomAmount;
      if (k < this.scaleMin) k = this.scaleMin;

      this.handleZoom(k);
    });

    this.$fullscreen.addEventListener("click", () => {
      if (document.fullscreen) {
        document.exitFullscreen();
      } else {
        document.documentElement.requestFullscreen();
      }
    });

    document.documentElement.addEventListener("fullscreenchange", () => {
      if (document.fullscreen) {
        this.$fullscreenIcon.classList.remove("fa-expand");
        this.$fullscreenIcon.classList.add("fa-compress");
        this.$fullscreen.setAttribute("title", "Exit Fullscreen");
      } else {
        this.$fullscreenIcon.classList.remove("fa-compress");
        this.$fullscreenIcon.classList.add("fa-expand");
        this.$fullscreen.setAttribute("title", "Enter Fullscreen");
      }
    });

    if (!document.fullscreenEnabled) this.$fullscreen.remove();
  }

  handleZoom(k) {
    this.transform.k = k;
    this.zoom.handleZoom({ transform: this.transform });
  }

  update(transform) {
    this.transform = transform;
    
    this.setText();
  }

  setText() {
    this.$text.innerHTML = `${Math.floor(this.calcPercentage(this.transform.k) * 100)}%`;
  }

  calcPercentage(k) {
    return (k - this.scaleMin) / (this.scaleMax - this.scaleMin);
  }

  setStyle(key, value) {
    this.$controls.style[key] = value;
  }
}
