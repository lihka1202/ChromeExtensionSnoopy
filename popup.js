
//Get the data from the popup.html
const urlHolder = document.getElementById("url")

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.url) {
      // Handle the message from background.js
      console.log(message.url);
      urlHolder.textContent = message.url
  }
});


