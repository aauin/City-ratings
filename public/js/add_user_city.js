/*
    Group 55 - Erwin Laird and Amanda Dohring - Project Step 6

    Citation for code adapted from CS340 Node.js Starter App
    Date: 6/12/2023
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addUserCityForm = document.getElementById('add-user-city-form');


// Track if the add city form is displayed
let isAddUserCityFormDisplayed = false;


// Modify the objects we need
addUserCityForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUser = document.getElementById("input-username")
    let inputCity = document.getElementById("input-city");
    let inputStartYear = document.getElementById("input-start-year");
    let inputEndYear = document.getElementById("input-end-year");
    let inputCurrentResident = document.getElementById("input-current-resident");

    // Get the values from the form fields
    let userValue = inputUser.value;
    let cityValue = inputCity.value;
    let startYearValue = inputStartYear.value;
    let endYearValue = inputEndYear.value;
    let currentresidentValue = inputCurrentResident.value;

    // Perform validation on the start_year value
    if (!/^\d{4}$/.test(startYearValue)) {
        // Display an error message
        alert("Please enter a valid year.");
        return;
    };

    // Perform validation on the end_year value
    if (endYearValue !== "" && !/^\d{4}$/.test(endYearValue)) {
        // Display an error message
        alert("Please enter a valid year.");
        return;
    };

    // Error if end year is blank but user is not current resident
    if (endYearValue === "" && currentresidentValue === "0") {
        // Display an error message
        alert("Please enter the year you have moved out of this city.");
        return;
    };

    // Error if user is current resident but entered an end year
    if (endYearValue !== "" && currentresidentValue === "1") {
        // Display an error message
        alert("Please leave the end year blank if you're currently living in this city.");
        return;
    };

    // Check if end_year is smaller than start_year
    if (endYearValue !== "" && parseInt(endYearValue) < parseInt(startYearValue)) {
        // Display an error message
        alert("The end year has to be more recent than the start year.");
        return;
    };

    // Put our data we want to send in a JavaScript object
    let data = {
        user_id: userValue,
        city_id: cityValue,
        start_year: startYearValue,
        end_year: endYearValue,
        current_resident: currentresidentValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-user-city", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Hide the insert city form
            hideInsertSection();

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    };

    // Reload the page and clear the input fields
    cancelAdd();

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
    console.log("This is data", data);

    // Show the table
    let table = document.getElementById('users-cities-table');
    table.style.display = 'table';

    // Show the add icon
    let addIcon = document.getElementById('addIcon');
    addIcon.style.display = 'block';
});


// Event listener for the back button
window.addEventListener("popstate", function(event) {
    // Check if the add city form is displayed
    if (isAddUserCityFormDisplayed) {

        window.addEventListener("popstate", function(event) {
        if (isAddUserCityFormDisplayed) {
            location.reload();
        }});
    }
});


// Creates a single row from an Object representing a single record
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("users-cities-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);

    // Create a row and cells
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let userCell = document.createElement("td");
    let cityCell = document.createElement("td");
    let startYearCell = document.createElement("td");
    let endYearCell = document.createElement("td");
    let currentResidentCell = document.createElement("td");
    let editCell = document.createElement("td");
    let deleteCell = document.createElement("td");

    // Fill the cells with correct data
    idCell.innerText = newRow.user_city_id;
    userCell.innerText = newRow.user_id;
    cityCell.innerText = newRow.city_id;
    startYearCell.innerText = newRow.start_year;
    endYearCell.innerText = newRow.end_year;
    currentResidentCell.innerText = newRow.current_resident;
    
    // Create delete cell
    deleteCell.innerHTML = `<a href="#" onClick="deleteUserCity(${newRow.user_city_id})">
        <img src="/images/delete.png" alt="Delete" style="max-width: 15px; max-height: 80px; opacity: 0.7;" /></a>`;

    // Create edit cell
    editCell.innerHTML = `<a href="#" onClick="updateCity(${newRow.user_city_id})">
        <img src="/images/edit.png" alt="Edit" style="max-width: 18px; max-height: 80px; opacity: 0.7;" /></a>`;

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(userCell);
    row.appendChild(cityCell);
    row.appendChild(startYearCell);
    row.appendChild(endYearCell);
    row.appendChild(currentResidentCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.user_city_id);
    
    // Add the row to the table
    currentTable.appendChild(row);
};


// Handle insert action when add icon is clicked
function addUserCity() {
    // Hide the browse section
    let browseSection = document.getElementById('browse');
    browseSection.style.display = 'none';
  
    // Hide the add icon
    let addIcon = document.getElementById('addIcon');
    addIcon.style.display = 'none';
    
    // Show the insert city form
    let insertSection = document.getElementById('insert');
    insertSection.style.display = 'block';

    // Set to true indicating the add city form is displayed
    isAddUserCityFormDisplayed = true;
};


// Handle cancel action when cancel button is clicked
function cancelAdd() {
    // Go back to the previous page
    history.back();
    
    // Reload the page and clear the input fields
    location.reload();
};


// Function to hide the update city section and show the table
function hideInsertSection() {
    let insertSection = document.getElementById('insert');
    insertSection.style.display = 'none';
  
    let table = document.getElementById('users-cities-table');
    table.style.display = 'table';

    // Set to false indicating the add city form is not displayed
    isAddUserCityFormDisplayed = false;

    // Reload the page
    location.reload();
};

