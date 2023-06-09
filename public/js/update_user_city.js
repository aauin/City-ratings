/*
    Group 55 - Erwin Laird and Amanda Dohring - Project Step 6

    Citation for code adapted from CS340 Node.js Starter App
    Date: 6/12/2023
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let updateUserCityForm = document.getElementById('update-user-city-form');

// Track if the update city form is displayed
let isUpdateUserCityFormDisplayed = false;


// Modify the objects we need
updateUserCityForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUser = document.getElementById("update-username");
    console.log("inputUser!!!!:", inputUser);

    let inputCity = document.getElementById("update-city");
    let inputStartYear = document.getElementById("update-start-year");
    let inputEndYear = document.getElementById("update-end-year");
    let inputCurrentResident = document.getElementById("update-current-resident");

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

    // Get the city_id from the form data attribute
    let user_city_id = updateUserCityForm.getAttribute("data-user-city-id");

    // Put our data we want to send in a JavaScript object
    let data = {
        user_city_id: user_city_id,
        user_id: userValue,
        city_id: cityValue,
        start_year: startYearValue,
        end_year: endYearValue,
        current_resident: currentresidentValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `/put-user-city/${user_city_id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                // Update the values based on the response
                updateRow(data);

                // Hide the update city section and show the table
                hideUpdateSection();
                // location.reload();

            } else {
            console.log("error with data:", data);
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
    if (isUpdateUserCityFormDisplayed) {

        window.addEventListener("popstate", function(event) {
        if (isUpdateUserCityFormDisplayed) {
            location.reload();
        }});
    }
});


// Function to update a row
function updateRow(data) {
    let table = document.getElementById("users-cities-table");

    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        let rowUserCityId = row.getAttribute("data-value");

        if (rowUserCityId == data.user_city_id) {
            // Get td of user value
            let td = row.cells[1];

            // Reassign username to the updated value
            td.innerHTML = data.user_id;

            // Get td of city, state value
            let td1 = row.cells[2];

            // Reassign city, state to the updated value
            td1.innerHTML = data.city_id;

            // Get td of start year value
            let td2 = row.cells[3];

            // Reassign start year to the updated value
            td2.innerHTML = data.start_year;

            // Get td of end year value
            let td3 = row.cells[4];

            // Reassign end year to the updated value
            td3.innerHTML = data.end_year;

            // Get td of current resident value
            let td4 = row.cells[5];

            // Reassign current resident to the updated value
            td4.innerHTML = data.current_resident;

            // Show the addIcon
            let addIcon = document.getElementById('addIcon');
            addIcon.style.display = 'block';
        }
    }
}


// Handle edit action when edit icon is clicked
function updateUserCity(userCityId) {
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
    let user_city_id = userCityId;

    // Set the city_id in the update city form data attribute
    updateUserCityForm.setAttribute("data-user-city-id", user_city_id);

    // Get the values from the table row
    let row = document.querySelector(`tr[data-value="${user_city_id}"]`);
    let username = row.cells[0].innerHTML;
    let cityState = row.cells[2].innerHTML;
    let startYear = row.cells[3].innerHTML;
    let endYear = row.cells[4].innerHTML;
    let currentResident = row.cells[5].innerHTML;

    // Set the values in the update user-city form
    let inputUsername = document.getElementById("update-username");
    let inputCityState = document.getElementById("update-city");
    let inputStartYear = document.getElementById("update-start-year");
    let inputEndYear = document.getElementById("update-end-year");
    let inputCurrentResident = document.getElementById("update-current-resident");

    // Find the option with the matching username value and select it
    for (let i = 0; i < inputUsername.options.length; i++) {
        if (inputUsername.options[i].value === username) {
            inputUsername.selectedIndex = i;
        break;
        }
    }

    // Find the option with the matching city state value and select it
    for (let i = 0; i < inputCityState.options.length; i++) {
        if (inputCityState.options[i].value === cityState) {
            inputCityState.selectedIndex = i;
        break;
        }
    }

    inputStartYear.value = startYear;
    inputEndYear.value = endYear;

    // Find the option with the matching current resident value and select it
    for (let i = 0; i < inputCurrentResident.options.length; i++) {
        if (inputCurrentResident.options[i].text === currentResident) {
          inputCurrentResident.selectedIndex = i;
          break;
        }
    }

    inputUsername.disabled = true;
    inputCityState.disabled = true;

    // Set to true indicating the update city form is displayed
    isUpdateUserCityFormDisplayed = true;
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

    let table = document.getElementById('users-cities-table');
    table.style.display = 'table';
    location.reload();

    // Set to true indicating the update city form is displayed
    isUpdateUserCityFormDisplayed = false;
}
