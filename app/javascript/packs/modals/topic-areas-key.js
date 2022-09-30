import Modal from "./modal";

class TopicAreasKeyModal extends Modal {
  constructor(id) {
    super(id);
    this.$row = this.$el.querySelector(".modal-body .row");
  }

  show() {
    const data = app.topicAreasData;

    if (!this.$row.children.length) {
      data.forEach(topicArea => this.addTopicArea(topicArea.colour, topicArea.name));
      this.addTopicArea(colour.get(), "None");
    }

    super.show();
  }

  addTopicArea(_colour, name) {
    const col = document.createElement("div");
    col.classList.add("topic-area", "col-6");

    const box = document.createElement("div");
    box.classList.add("box");
    box.style.borderColor = colour.get(_colour);
    box.style.backgroundColor = colour.brighten(_colour);

    const text = document.createElement("div");
    text.classList.add("text");
    text.innerHTML = name;

    col.append(box, text);
    this.$row.append(col);
  }
}

window.topicAreasKeyModal = new TopicAreasKeyModal("topic-areas-key");