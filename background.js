chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length > 0) {
        const currentURL = tabs[0].url;
        console.log("Current URL: " + currentURL);

        //send message to popup.js
        chrome.runtime.sendMessage({
            url : currentURL
        })

        // Now you can use the currentURL as needed within your background script.
    }
});
