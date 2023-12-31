let currentURL = ""
chrome.storage.onChanged.addListener(function(changes, areaName) { //changes --> Key, areaname --> type of storage
    for (const key in changes) {
        if (Object.hasOwnProperty.call(changes, key)) {
            const change = changes[key];

            if(key === 'currentURL') {
                console.log(`Storage key '${key}' in area '${areaName}' changed.`);
                console.log(`Old value: ${change.oldValue}`);
                console.log(`New value: ${change.newValue}`);
                currentURL = change.newValue
                console.log("CurrentURL Value changed to: ", currentURL)
                console.log("URL has been set in the chrome storage")
                console.log("websites array has been set in the chrome storage")
                console.log("table array has been set in the chrome storage")
                trackHyperlinks();
                // Listen for page updates (e.g., AJAX) and re-run the tracking function.
                const observer = new MutationObserver(trackHyperlinks);
                observer.observe(document.body, { childList: true, subtree: true });
            } // Strict Target matching needed
            
        }
    }
});

function trackHyperlinks() {
    const links = Array.from(document.querySelectorAll('a'));
    const linkData = links.map(link => link.href);

    // Get the current data and then go through the system

    chrome.storage.local.get(
        ["website", "table", "currentURL", "hyperlink"],
        (res) => {
            if(chrome.runtime.error) {
                console.log("Error has occured")
            } else {
                const website_local = res.website || []
                const table_local = res.table || []
                const hyperlink_local = res.hyperlink || []
                
                for(const link of linkData) {
                    const foundObject = table_local.find(obj => obj.website === res.currentURL);
                    if(foundObject && link!="") {
                        //TODO: Convert from link to an object
                        const ObjectFinder = foundObject.hyperlinks.find(ob => ob.hyperlink === link)
                        if(ObjectFinder) {

                            // Object Exists, now you can increment the hyperlink
                            ObjectFinder.occurence += 1

                        } else {

                            // Object not found and new object created and tagged
                            holder = {
                                hyperlink : link,
                                occurence : 1
                            }
                            foundObject.hyperlinks.push(holder)
                            console.log("Hyperlink tagged to object, with object instantiated")

                        }
                    }

                    console.log("Table Logged: ", table_local)

                    if(hyperlink_local.includes(link)===false && link!="")  {
                        hyperlink_local.push(link)
                        console.log("Hyperlink added to the hyperlink list")
                    } 
                }

                // Set the data in the chrome storage
                chrome.storage.local.set(
                    {
                        hyperlink : hyperlink_local,
                        table : table_local,
                        website : website_local
                    }, () => {
                        console.log("The data has been set in the chrome storage")
                    }
                )
            }
        }
    )

  }
  


