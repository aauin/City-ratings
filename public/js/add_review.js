/*
    Group 55 - Erwin Laird and Amanda Dohring - Project Step 6

    Citation for code adapted from CS340 Node.js Starter App
    Date: 6/12/2023
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addReviewForm = document.getElementById('add-review-form');


// Track if the add review form is displayed
let isAddReviewFormDisplayed = false;


// Modify the objects we need
addReviewForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCity = document.getElementById("input-city");
    let inputUsername = document.getElementById("input-username");
    let inputDate = document.getElementById("input-date");
    let inputReview = document.getElementById("input-review");

    // Get the values from the form fields
    let cityValue = inputCity.value;
    let usernameValue = inputUsername.value;
    let dateValue = inputDate.value;
    let reviewValue = inputReview.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        city_id: cityValue,
        user_id: usernameValue,
        date: dateValue,
        review: reviewValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-review", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Reload the page and clear the input fields
            location.reload();

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    };

    // Reload the page and clear the input fields
    cancelAdd();

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    console.log("this is data", data);

    // Show the table
    let table = document.getElementById('reviews-table');
    table.style.display = 'table';

    // Show the add icon
    let addIcon = document.getElementById('addIcon');
    addIcon.style.display = 'block';
});


// Event listener for the back button
window.addEventListener("popstate", function(event) {
    // Check if the add user form is displayed
    if (isAddReviewFormDisplayed) {

        window.addEventListener("popstate", function(event) {
        if (isAddReviewFormDisplayed) {
            location.reload();
        }});
    }
});


// Creates a single row from an Object representing a single record
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("reviews-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    console.log('this is parsed data', parsedData)
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let cityCell = document.createElement("td");
    let usernameCell = document.createElement("td");
    let dateCell = document.createElement("td");
    let reviewCell = document.createElement("td");
    // let deleteCell = document.createElement("td");

    // Fill the cells with correct data
    idCell.innerText = newRow.review_id;
    cityCell.innerText = newRow.city_id;
    usernameCell.innerText = newRow.user_id;
    dateCell.innerText = newRow.date;
    reviewCell.innerText = newRow.review;

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(cityCell);
    row.appendChild(usernameCell);
    row.appendChild(dateCell);
    row.appendChild(reviewCell);
    // row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.review_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option,
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("update-username");
    let option = document.createElement("option");
    option.text = newRow.user_id;
    option.value = newRow.review_id;
    selectMenu.add(option);
};


// Handle insert action when add icon is clicked
function addReview() {
    // Hide the browse section
    let browseSection = document.getElementById('browse');
    browseSection.style.display = 'none';
  
    // Hide the add icon
    let addIcon = document.getElementById('addIcon');
    addIcon.style.display = 'none';
    
    // Show the insert review form
    let insertSection = document.getElementById('insert');
    insertSection.style.display = 'block';

    // Set to true indicating the add review form is displayed
    isAddReviewFormDisplayed = true;
};


// Handle cancel action when cancel button is clicked
function cancelAdd() {
    // Go back to the previous page
    history.back();
    
    // Reload the page and clear the input fields
    location.reload();
};
