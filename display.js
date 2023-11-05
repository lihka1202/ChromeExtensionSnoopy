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
            
                        websiteCell.textContent = entry.website;
                        hyperlinkCell.textContent = link.hyperlink;
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

// // Function to populate the table
// function populateTable() {
//     const dataBody = document.getElementById('data-body');
//     data.forEach((entry) => {
//         entry.hyperlinks.forEach((link) => {
//             const row = document.createElement('tr');
//             const websiteCell = document.createElement('td');
//             const hyperlinkCell = document.createElement('td');
//             const occurrenceCell = document.createElement('td');

//             websiteCell.textContent = entry.website;
//             hyperlinkCell.textContent = link.hyperlink;
//             occurrenceCell.textContent = link.occurrence;

//             row.appendChild(websiteCell);
//             row.appendChild(hyperlinkCell);
//             row.appendChild(occurrenceCell);

//             dataBody.appendChild(row);
//         });
//     });
// }

// // Call the function to populate the table
// populateTable();
