chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  const urlDisplay = document.getElementById('url-holder');
  const linkCounter = document.getElementById('link-counter');

  if (tabs.length > 0) {
      const currentURL = tabs[0].url;
      chrome.storage.local.get(["websites"], (result) => {
          if (chrome.runtime.lastError) {
              console.error(chrome.runtime.lastError);
              return;
          }
          
          const websites = result.websites || [];
          if(!websites.includes(currentURL)) {
            websites.push(currentURL);
          }

          chrome.storage.local.set({ websites }, () => {
              if (chrome.runtime.lastError) {
                  console.error(chrome.runtime.lastError);
                  return;
              }

              console.log("Website has been added to the list");
              urlDisplay.textContent = `Current URL: ${currentURL}`;

              // Update the linkCounter element with the number of links visited
              linkCounter.textContent = `The number of links visited are ${websites.length}`;
          });
      });
  } else {
      urlDisplay.textContent = 'Unable to retrieve the current URL';
  }
});
