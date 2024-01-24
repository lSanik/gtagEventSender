# gtagEventSender
 Gtag event sender for GA4

This class provides a simple way to send Google Analytics events. It checks if the page is loaded, if Google Analytics is loaded, and if Google Analytics is blocked by an ad blocker. If all conditions are met, the event is sent. If any condition is not met, the event is added to a queue and sent later, when all conditions are met.

Usage:

To use this class, you need to create an instance of the class and then call the sendEvent() method to send an event. For example, you can use the following code:

JavaScript
const gtagEventSender = new GtagEventSender();

// Send an event
gtagEventSender.sendEvent({
  name: "select_item", //Event name
  parameters: {
    item_id: "SKU_12345",
    item_name: "Stan and Friends Tee",
  },
});
This code will send a select_item event with parameters item_id and item_name.

Functions:

constructor(): Class constructor.
isPageLoaded(): Checks if the page is loaded.
isAnalyticsLoaded(): Checks if Google Analytics is loaded.
isAnalyticsBlocked(): Checks if Google Analytics is blocked by an ad blocker.
sendEvent(): Sends an event.

License:
MIT License
Author: lSanik and Bard
