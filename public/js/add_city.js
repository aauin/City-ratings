/*
    Group 55 - Erwin Laird and Amanda Dohring - Project Step 6

    Citation for code adapted from CS340 Node.js Starter App
    Date: 6/12/2023
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addCityForm = document.getElementById('add-city-form');


// Track if the add city form is displayed
let isAddCityFormDisplayed = false;


// Modify the objects we need
addCityForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCity = document.getElementById("input-city");
    let inputState = document.getElementById("input-state");
    let inputRegion = document.getElementById("input-region");
    let inputPopulation = document.getElementById("input-population");
    let inputTimezone = document.getElementById("input-timezone");

    // Get the values from the form fields
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let regionValue = inputRegion.value;
    let populationValue = inputPopulation.value;
    let timezoneValue = inputTimezone.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        city: cityValue,
        state: stateValue,
        region: regionValue,
        population: populationValue,
        timezone: timezoneValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-city", true);
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

    // Show the table
    let table = document.getElementById('cities-table');
    table.style.display = 'table';

    // Show the add icon
    let addIcon = document.getElementById('addIcon');
    addIcon.style.display = 'block';
});


// Event listener for the back button
window.addEventListener("popstate", function(event) {
    // Check if the add city form is displayed
    if (isAddCityFormDisplayed) {

        window.addEventListener("popstate", function(event) {
        if (isAddCityFormDisplayed) {
            location.reload();
        }});
    }
});


// Creates a single row from an Object representing a single record
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("cities-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let cityCell = document.createElement("td");
    let stateCell = document.createElement("td");
    let regionCell = document.createElement("td");
    let populationCell = document.createElement("td");
    let timezoneCell = document.createElement("td");
    let editCell = document.createElement("td");
    let deleteCell = document.createElement("td");

    // Fill the cells with correct data
    idCell.innerText = newRow.city_id;
    cityCell.innerText = newRow.city;
    stateCell.innerText = newRow.state;
    regionCell.innerText = newRow.region;
    populationCell.innerText = newRow.population;
    timezoneCell.innerText = newRow.timezone;

    // Create delete cell
    deleteCell.innerHTML = `<a href="#" onClick="deleteCity(${newRow.city_id})">
        <img src="/images/delete.png" alt="Delete" style="max-width: 15px; max-height: 80px; opacity: 0.7;" /></a>`;

    // Create edit cell
    editCell.innerHTML = `<a href="#" onClick="updateCity(${newRow.city_id})">
        <img src="/images/edit.png" alt="Edit" style="max-width: 18px; max-height: 80px; opacity: 0.7;" /></a>`;

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(cityCell);
    row.appendChild(stateCell);
    row.appendChild(regionCell);
    row.appendChild(populationCell);
    row.appendChild(timezoneCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.city_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (city, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("update-city");
    let option = document.createElement("option");
    option.text = newRow.city;
    option.value = newRow.city_id;
    selectMenu.add(option);
};


// Handle insert action when add icon is clicked
function addCity() {
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
    isAddCityFormDisplayed = true;
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
  
    let table = document.getElementById('cities-table');
    table.style.display = 'table';

    // Set to false indicating the add city form is not displayed
    isAddCityFormDisplayed = false;

    // Reload the page and clear the input fields
    location.reload();
};
