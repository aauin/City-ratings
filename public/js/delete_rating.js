/*
    Group 55 - Erwin Laird and Amanda Dohring - Project Step 6

    Citation for code adapted from CS340 Node.js Starter App
    Date: 6/12/2023
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

function deleteRating(rating_id) {
    // Put our data we want to send in a JavaScript object
    let data = {
        id: rating_id
    };
  
    // Set up our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-rating/" + rating_id, true);
    xhttp.setRequestHeader("Content-type", "application/json");
  
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            // Add the new data to the table
            deleteRow(rating_id);
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.", data);
        }
    };
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
  }
  
  function deleteRow(rating_id) {
    let table = document.getElementById("ratings-table");
    for (let i = 0, row; (row = table.rows[i]); i++) {
        // iterate through rows
        // rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == rating_id) {
            table.deleteRow(i);
            break;
        }
    }
  }