let curerntURL = ""
chrome.storage.local.get(
    ["table"],
    (res) => {
        if(chrome.runtime.error) {
            console.log("Something isnt working")
        } else {
            const data = res.table
            function populateTable() {
                const dataBody = document.getElementById('data-body');
                data.forEach((entry) => {
                    entry.hyperlinks.forEach((link) => {
                        const row = document.createElement('tr');
                        const websiteCell = document.createElement('td');
                        const hyperlinkCell = document.createElement('td');
                        const occurrenceCell = document.createElement('td');
                       
                        const websiteLink = document.createElement('a');
                        if(curerntURL != entry.website) {
                            websiteLink.textContent = new URL(entry.website).hostname;
                            curerntURL = entry.website
                        } else {
                            websiteLink.textContent = ""
                        }
                        websiteLink.href = entry.website;                     
                        websiteCell.appendChild(websiteLink);

                        const hyperlinkLink = document.createElement('a');
                        hyperlinkLink.href = link.hyperlink;
                        hyperlinkLink.textContent = link.hyperlink;
                        hyperlinkCell.appendChild(hyperlinkLink);

                        occurrenceCell.textContent = link.occurence;
                        
                        row.appendChild(websiteCell);
                        row.appendChild(hyperlinkCell);
                        row.appendChild(occurrenceCell);
            
                        dataBody.appendChild(row);
                    });
                });
            }
            populateTable()

        }
    }
)

