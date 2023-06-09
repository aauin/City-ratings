/*
    Group 55 - Erwin Laird and Amanda Dohring - Project Step 6

    Citation for code adapted from CS340 Node.js Starter App
    Date: 6/12/2023
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let updateCityForm = document.getElementById('update-city-form');

// Track if the update city form is displayed
let isUpdateCityFormDisplayed = false;


// Modify the objects we need
updateCityForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCity = document.getElementById("update-city");
    let inputState = document.getElementById("update-state");
    let inputRegion = document.getElementById("update-region");
    let inputPopulation = document.getElementById("update-population");
    let inputTimezone = document.getElementById("update-timezone");

    // Get the values from the form fields
    let cityValue = inputCity.value;
    let stateValue = inputState.value;
    let regionValue = inputRegion.value;
    let populationValue = inputPopulation.value;
    let timezoneValue = inputTimezone.value;

    // Get the city_id from the form data attribute
    let city_id = updateCityForm.getAttribute("data-city-id");

    // Put our data we want to send in a JavaScript object
    let data = {
        city_id: city_id,
        city: cityValue,
        state: stateValue,
        region: regionValue,
        population: populationValue,
        timezone: timezoneValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `/put-city/${city_id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                // Update the values based on the response
                updateRow(data);

                // Hide the update city section and show the table
                hideUpdateSection();

            } else {
                //console.log("updateRow called with data:", data);
            console.log("There was an error with the input.");
            }
        }
    };
    console.log("updateRow called with data:", data);
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


// Event listener for the back button
window.addEventListener("popstate", function(event) {
    // Check if the update city form is displayed
    if (isUpdateCityFormDisplayed) {

        window.addEventListener("popstate", function(event) {
        if (isUpdateCityFormDisplayed) {
            location.reload();
        }});
    }
});


// Function to update a row
function updateRow(data) {
    let table = document.getElementById("cities-table");

    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        let rowCityId = row.getAttribute("data-value");

        if (rowCityId == data.city_id) {
            // Get td of city value
            let td = row.cells[1];

            // Reassign city to the updated value
            td.innerHTML = data.city;

            // Get td of state value
            let td1 = row.cells[2];

            // Reassign state to the updated value
            td1.innerHTML = data.state;

            // Get td of region value
            let td2 = row.cells[3];

            // Reassign region to the updated value
            td2.innerHTML = data.region;

            // Get td of population value
            let td3 = row.cells[4];

            // Reassign population to the updated value
            td3.innerHTML = data.population;

            // Get td of timezone value
            let td4 = row.cells[5];

            // Reassign timezone to the updated value
            td4.innerHTML = data.timezone;

            // Show the addIcon
            let addIcon = document.getElementById('addIcon');
            addIcon.style.display = 'block';
        }
    }
}


// Handle edit action when edit icon is clicked
function updateCity(cityId) {
    // Hide the browse section
    let browseSection = document.getElementById('browse');
    browseSection.style.display = 'none';

    // Hide the add icon
    let addIcon = document.getElementById('addIcon');
    addIcon.style.display = 'none';

    // Show the update city section
    let updateSection = document.getElementById('update');
    updateSection.style.display = 'block';

    // Get the city_id from the edit icon data attribute
    let city_id = cityId;

    // Set the city_id in the update city form data attribute
    updateCityForm.setAttribute("data-city-id", city_id);

    // Get the values from the table row
    let row = document.querySelector(`tr[data-value="${city_id}"]`);
    let city = row.cells[1].innerHTML;
    let state = row.cells[2].innerHTML;
    let region = row.cells[3].innerHTML;
    let population = row.cells[4].innerHTML;
    let timezone = row.cells[5].innerHTML;

    // Set the values in the update city form
    let inputCity = document.getElementById("update-city");
    let inputState = document.getElementById("update-state");
    let inputRegion = document.getElementById("update-region");
    let inputPopulation = document.getElementById("update-population");
    let inputTimezone = document.getElementById("update-timezone");

    inputCity.value = city;
    inputState.value = state;
    inputRegion.value = region;
    inputPopulation.value = population;
    inputTimezone.value = timezone;

    inputCity.disabled = true;
    inputState.disabled = true;
    inputRegion.disabled = true;
    inputTimezone.disabled = true;

    // Set to true indicating the update city form is displayed
    isUpdateCityFormDisplayed = true;
}


// Handle cancel action when cancel button is clicked
function cancelUpdate() {
    // Go back to the previous page
    history.back();
    
    // Reload the page and clear the input fields
    location.reload();
}


// Function to hide the update city section and show the table
function hideUpdateSection() {
    let updateSection = document.getElementById('update');
    updateSection.style.display = 'none';

    let table = document.getElementById('cities-table');
    table.style.display = 'table';

    // Set to true indicating the update city form is displayed
    isUpdateCityFormDisplayed = false;
    location.reload();
}
