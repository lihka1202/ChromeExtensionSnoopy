
//Get the data from the popup.html
const urlHolder = document.getElementById("url")

const websiteCounter = document.getElementById("website-counter")
const hyoerlinkCounter = document.getElementById("hyperlink-counter")


chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  if (tabs.length > 0) {
      const currentURL = tabs[0].url;
      urlHolder.textContent = currentURL
      console.log("Current URL: " + currentURL)


      chrome.storage.local.get(["website", "table", "hyperlink"],
      (res) => {
        if(chrome.runtime.error) {
          console.log("Error has occured")
        } else  {
          const websites_local = res.website || []
          const table_local = res.table || []
          const hyperlinks_local = res.hyperlink


          // Check if the website exists in array already
          if(!websites_local.includes(currentURL)) {
            websites_local.push(currentURL)
          }

          // CHeck if the current URL already exists in the table
          if(table_local.some(obj => obj.website === currentURL)==false) {
            empty_obj = {
              website : currentURL,
              hyperlinks : []
            }
            table_local.push(empty_obj)
          }

          // Enter the value in the storage here:
          // setting the data, after getting the Websites Array and the Table Array
          chrome.storage.local.set({
            currentURL : currentURL,
            website : websites_local,
            table : table_local

          }, ()=>{
            console.log("URL has been set in the chrome storage")
            console.log("websites array has been set in the chrome storage")
            console.log("table array has been set in the chrome storage")
            console.log(table_local)
            console.log(websites_local)

            // Add the data to the webpage
            websiteCounter.textContent = `The number of websites visited: ${websites_local.length}`
            hyoerlinkCounter.textContent = `The number of hyperlinks encountered: ${hyperlinks_local.length}`

          })

        }
      })


      
      
  }
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
  if(changes.website) {
    websiteCounter.textContent = `The number of websites visited: ${changes.website.newValue.length}`
  } else if(changes.hyperlink) {
    hyoerlinkCounter.textContent = `The number of hyperlinks encountered: ${changes.hyperlink.newValue.length}`
  }
})



