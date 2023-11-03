// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message.url) {
//         // Handle the message from background.js
//         console.log(message.url);
//     }
// });
let currentURL = ""
chrome.storage.onChanged.addListener(function(changes, areaName) { //changes --> Key, areaname --> type of storage
    for (const key in changes) {
        if (Object.hasOwnProperty.call(changes, key)) {
            const change = changes[key];

            if(key === 'currentURL') // Strict Target matching needed
            console.log(`Storage key '${key}' in area '${areaName}' changed.`);
            console.log(`Old value: ${change.oldValue}`);
            console.log(`New value: ${change.newValue}`);
            currentURL = change.newValue
            console.log("CurrentURL Value changed to: ", currentURL)
            console.log("URL has been set in the chrome storage")
            console.log("websites array has been set in the chrome storage")
            console.log("table array has been set in the chrome storage")

            console.log()
        }
    }
});

console.log(currentURL)
