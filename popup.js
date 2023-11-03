
//Get the data from the popup.html
const urlHolder = document.getElementById("url")


chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  if (tabs.length > 0) {
      const currentURL = tabs[0].url;
      urlHolder.textContent = currentURL
      console.log("Current URL: " + currentURL)

      chrome.storage.local.set({
        currentURL : currentURL
      }, ()=>{
        console.log("URL has been set in the chrome storage")
      })
  }
});

