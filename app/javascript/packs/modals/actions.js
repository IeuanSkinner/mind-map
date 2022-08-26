class ActionMenu {
  constructor() {
    this.$actionMenu = document.getElementById("action-menu");
    this.$feedbackBtn = document.getElementById("feedback-btn")
    this.$motivationsBtn = this.$actionMenu.querySelector("#motivations-btn");
    this.$shortcutsBtn = this.$actionMenu.querySelector("#shortcuts-btn");
    this.$topicAreasKeyBtn = this.$actionMenu.querySelector("#topic-areas-key-btn");
    this.$informationBtn = this.$actionMenu.querySelector("#information-btn");

    this.addListeners();
  }

  addListeners() {
    this.$motivationsBtn.addEventListener("click", () => window.motivationsModal.show());
    this.$shortcutsBtn.addEventListener("click", () => window.shortcutsModal.show());
    this.$topicAreasKeyBtn.addEventListener("click", () => window.topicAreasKeyModal.show());
    this.$informationBtn.addEventListener("click", () => window.informationModal.show());
  }

  setStyle(key, value) {
    this.$actionMenu.style[key] = value;
    this.$feedbackBtn.style[key] = value;
  }
}

window.actionMenu = new ActionMenu();
