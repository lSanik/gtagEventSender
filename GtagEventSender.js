//TODO: <script async src="https://www.googletagmanager.com/gtag/js?id=XXX" onload="innitAnalytics()"></script>

    class GtagEventSender {
        constructor() {
            this.queue = [];
        }

        isPageLoaded() {
            return (document.readyState === "complete");
        }

        isAnalyticsInnit() {
            return (typeof gtag === "function");
        }

        addEvent(event) {
            //Page not loaded yet - add to queue
            if (!this.isPageLoaded()) {
                this.queue.push(event);
                return;
            }
            //Google Analytics not loaded yet - add to queue
            //Anyway if Analytics block by some reason(adblock/bad connection) - we will not send events
            if (!this.isAnalyticsInnit()) {
                this.queue.push(event);
                return;
            }

            //All load, just send
            this.#privateSendEvent(event);
        }

        #privateSendEvent(event) {
            if(typeof event !==  "object"){
                console.warn('Warning! Bad data type on GtagEventSender!',event);
            }

            if(typeof event.name === "string" && typeof event.parameters === "object"){
                gtag("event", event.name, event.parameters);
            }else{
                console.warn('Warning! Bad data type on GtagEventSender!',event);
            }
        }

        analyticsLoaded() {
            console.log(gtag);
            console.log('all good');
            return this.onDOMContentLoaded();
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
    function innitAnalytics(){
        setTimeout(function (){gtagEventSender.analyticsLoaded();},200);
    }

// gtagEventSender.sendEvent({
//     name: "select_item", //Event name
//     parameters: {
//         item_id: "SKU_12345",
//         item_name: "Stan and Friends Tee",
//     },
// });
