class GtagEventSender {
    constructor() {
        this.queue = [];
        let onDOMContentLoaded = this.onDOMContentLoaded.bind(this);
        window.onload = function (){
            onDOMContentLoaded();
        }
    }

    isPageLoaded() {
        return (document.readyState === "complete");
    }

    isAnalyticsLoaded() {
        return (typeof gtag === "function");
    }

    addEvent(event) {
        if (!this.isPageLoaded()) {
            this.queue.push(event);
            return;
        }

        this.#privateSendEvent(event);
    }

    #privateSendEvent(event) {
        //If not blocked by adblock, bad internet, firewall etc....
        if (!this.isAnalyticsLoaded()) {
            return;
        }

        if(typeof event !==  "object"){
            console.warn('Warning! Bad data type on GtagEventSender!',event);
        }

        if(typeof event.name === "string" && typeof event.parameters === "object"){
            gtag("event", event.name, event.parameters);
        }else{
            console.warn('Warning! Bad data type on GtagEventSender!',event);
        }
    }

    onDOMContentLoaded() {
        if (this.queue) {
            let i;
            for (i=0; i < this.queue.length; i++) {
                this.#privateSendEvent(this.queue.shift());
            }
        }
    }
}

const gtagEventSender = new GtagEventSender();

// gtagEventSender.sendEvent({
//     name: "select_item", //Event name
//     parameters: {
//         item_id: "SKU_12345",
//         item_name: "Stan and Friends Tee",
//     },
// });
