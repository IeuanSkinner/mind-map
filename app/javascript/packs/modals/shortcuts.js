import * as bootstrap from "bootstrap";

class ShortcutsModal {
    constructor() {
        this.$el = document.getElementById("shortcuts");
        this.modal = new bootstrap.Modal(this.$el);
    }

    show() {
        this.modal.show();
    }
}

window.shortcutsModal = new ShortcutsModal();