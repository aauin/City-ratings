/*
    Group 55 - Erwin Laird and Amanda Dohring - Project Step 6

    Citation for code adapted from CS340 Node.js Starter App
    Date: 6/12/2023
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addUserForm = document.getElementById('add-user-form');


// Track if the add user form is displayed
let isAddUserFormDisplayed = false;


// Modify the objects we need
addUserForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUsername = document.getElementById("input-username");
    let inputUserFname = document.getElementById("input-fname");
    let inputUserLName = document.getElementById("input-lname");
    let inputEmail = document.getElementById("input-email");
    let inputGender = document.getElementById("input-gender");
    let inputRaceEthicity = document.getElementById("input-race_ethnicity");

    // Get the values from the form fields
    let usernameValue = inputUsername.value;
    let firstNameValue = inputUserFname.value;
    let lastNameValue = inputUserLName.value;
    let emailValue = inputEmail.value;
    let genderValue = inputGender.value;
    let raceEthnicityValue = inputRaceEthicity.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        username: usernameValue,
        user_fname: firstNameValue,
        user_lname: lastNameValue,
        email: emailValue,
        gender: genderValue,
        race_ethnicity: raceEthnicityValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-user", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Hide the insert user form
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
    let table = document.getElementById('users-table');
    table.style.display = 'table';

    // Show the add icon
    let addIcon = document.getElementById('addIcon');
    addIcon.style.display = 'block';
});


// Event listener for the back button
window.addEventListener("popstate", function(event) {
    // Check if the add user form is displayed
    if (isAddUserFormDisplayed) {

        window.addEventListener("popstate", function(event) {
        if (isAddUserFormDisplayed) {
            location.reload();
        }});
    }
});


// Creates a single row from an Object representing a single record
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("users-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let usernameCell = document.createElement("td");
    let firstNameCell = document.createElement("td");
    let lastNameCell = document.createElement("td");
    let emailCell = document.createElement("td");
    let genderCell = document.createElement("td");
    let raceEthnicityCell = document.createElement("td");
    let editCell = document.createElement("td");
    let deleteCell = document.createElement("td");

    // Fill the cells with correct data
    idCell.innerText = newRow.user_id;
    usernameCell.innerText = newRow.username;
    firstNameCell.innerText = newRow.user_fname;
    lastNameCell.innerText = newRow.user_lname;
    emailCell.innerText = newRow.email;
    genderCell.innerText = newRow.gender;
    raceEthnicityCell.innerText = newRow.race_ethnicity;

    // Create delete cell
    deleteCell.innerHTML = `<a href="#" onClick="deleteUser(${newRow.user_id})">
        <img src="/images/delete.png" alt="Delete" style="max-width: 15px; max-height: 80px; opacity: 0.7;" /></a>`;

    // Create edit cell
    editCell.innerHTML = `<a href="#" onClick="updateUser(${newRow.user_id})">
        <img src="/images/edit.png" alt="Edit" style="max-width: 18px; max-height: 80px; opacity: 0.7;" /></a>`;

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(usernameCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(genderCell);
    row.appendChild(raceEthnicityCell);
    row.appendChild(editCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.user_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (username, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("update-username");
    let option = document.createElement("option");
    option.text = newRow.username;
    option.value = newRow.user_id;
    selectMenu.add(option);
};


// Handle insert action when add icon is clicked
function addUser() {
    // Hide the browse section
    let browseSection = document.getElementById('browse');
    browseSection.style.display = 'none';
  
    // Hide the add icon
    let addIcon = document.getElementById('addIcon');
    addIcon.style.display = 'none';
    
    // Show the insert user form
    let insertSection = document.getElementById('insert');
    insertSection.style.display = 'block';

    // Set to true indicating the add user form is displayed
    isAddUserFormDisplayed = true;
};


// Handle cancel action when cancel button is clicked
function cancelAdd() {
    // Go back to the previous page
    history.back();
    
    // Reload the page and clear the input fields
    location.reload();
};


// Function to hide the update user section and show the table
function hideInsertSection() {
    let insertSection = document.getElementById('insert');
    insertSection.style.display = 'none';
  
    let table = document.getElementById('users-table');
    table.style.display = 'table';

    // Set to false indicating the add user form is not displayed
    isAddUserFormDisplayed = false;
};
