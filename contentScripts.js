chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.url) {
        // Handle the message from background.js
        console.log(message.url);
    }
});