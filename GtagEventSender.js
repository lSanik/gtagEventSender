class GtagEventSender {
    constructor() {
        this.queue = [];
        document.addEventListener("DOMContentLoaded", this.onDOMContentLoaded);
    }

    isPageLoaded() {
        return (document.readyState === "complete");
    }

    isAnalyticsLoaded() {
        return (typeof gtag === "function");
    }

    isAnalyticsBlocked() {
        return !this.isAnalyticsLoaded();
    }

    sendEvent(event) {
        if (!this.isPageLoaded()) {
            this.queue.push(event);
            return;
        }

        if (!this.isAnalyticsLoaded()) {
            this.queue.push(event);
            return;
        }

        if (this.isAnalyticsBlocked()) {
            return false;
        }

        gtag("event", event.name, event.parameters);
    }

    onDOMContentLoaded() {
        while (this.queue.length) {
            this.sendEvent(this.queue.shift());
        }
    }
}

const gtagEventSender = new GtagEventSender();

// eventTracker.sendEvent({
//     name: "select_item", //Event name
//     parameters: {
//         item_id: "SKU_12345",
//         item_name: "Stan and Friends Tee",
//     },
// });
