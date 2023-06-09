/*
    Group 55 - Erwin Laird and Amanda Dohring - Project Step 6

    Citation for code adapted from CS340 Node.js Starter App
    Date: 6/12/2023
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let updateUserForm = document.getElementById('update-user-form');

// Track if the update user form is displayed
let isUpdateUserFormDisplayed = false;


// Modify the objects we need
updateUserForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUsername = document.getElementById("update-username");
    let inputUserFname = document.getElementById("update-fname");
    let inputUserLname = document.getElementById("update-lname");
    let inputEmail = document.getElementById("update-email");
    let inputGender = document.getElementById("update-gender");
    let inputRaceEthnicity = document.getElementById("update-race-ethnicity");

    // Get the values from the form fields
    let usernameValue = inputUsername.value;
    let firstNameValue = inputUserFname.value;
    let lastNameValue = inputUserLname.value;
    let emailValue = inputEmail.value;
    let genderValue = inputGender.value;
    let raceEthnicityValue = inputRaceEthnicity.value;

    // Get the user_id from the form data attribute
    let user_id = updateUserForm.getAttribute("data-user-id");

    // Put our data we want to send in a JavaScript object
    let data = {
        user_id: user_id,
        username: usernameValue,
        user_fname: firstNameValue,
        user_lname: lastNameValue,
        email: emailValue,
        gender: genderValue,
        race_ethnicity: raceEthnicityValue
    };

 
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", `/put-user/${user_id}`, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                // Update the values based on the response
                updateRow(data);

                // Hide the update user section and show the table
                hideUpdateSection();

            } else {
            console.log("There was an error with the input.");
            }
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});


// Event listener for the back button
window.addEventListener("popstate", function(event) {
    // Check if the update user form is displayed
    if (isUpdateUserFormDisplayed) {

        window.addEventListener("popstate", function(event) {
        if (isUpdateUserFormDisplayed) {
            location.reload();
        }});
    }
});


// Function to update a row
function updateRow(data) {
    let table = document.getElementById("users-table");

    for (let i = 0; i < table.rows.length; i++) {
        let row = table.rows[i];
        let rowUserId = row.getAttribute("data-value");

        if (rowUserId == data.user_id) {
            // Get td of username value
            let td = row.cells[1];

            // Reassign username to the updated value
            td.innerHTML = data.username;

            // Get td of first name value
            let td1 = row.cells[2];

            // Reassign first name to the updated value
            td1.innerHTML = data.user_fname;

            // Get td of last name value
            let td2 = row.cells[3];

            // Reassign last name to the updated value
            td2.innerHTML = data.user_lname;

            // Get td of email value
            let td3 = row.cells[4];

            // Reassign email to the updated value
            td3.innerHTML = data.email;

            // Get td of gender value
            let td4 = row.cells[5];

            // Reassign gender to the updated value
            td4.innerHTML = data.gender;

            // Get td of race_ethnicity value
            let td5 = row.cells[6];

            // Reassign email to the updated value
            td5.innerHTML = data.race_ethnicity;

            // Show the addIcon
            let addIcon = document.getElementById('addIcon');
            addIcon.style.display = 'block';
        }
    }
}


// Handle edit action when edit icon is clicked
function updateUser(userId) {
    // Hide the browse section
    let browseSection = document.getElementById('browse');
    browseSection.style.display = 'none';

    // Hide the add icon
    let addIcon = document.getElementById('addIcon');
    addIcon.style.display = 'none';

    // Show the update user section
    let updateSection = document.getElementById('update');
    updateSection.style.display = 'block';

    // Get the user_id from the edit icon data attribute
    let user_id = userId;

    // Set the user_id in the update user form data attribute
    updateUserForm.setAttribute("data-user-id", user_id);

    // Get the values from the table row
    let row = document.querySelector(`tr[data-value="${user_id}"]`);
    let username = row.cells[1].innerHTML;
    let firstName = row.cells[2].innerHTML;
    let lastName = row.cells[3].innerHTML;
    let email = row.cells[4].innerHTML;
    let gender = row.cells[5].innerHTML;
    let raceEthnicity = row.cells[6].innerHTML;

    // Set the values in the update user form
    let inputUsername = document.getElementById("update-username");
    let inputUserFname = document.getElementById("update-fname");
    let inputUserLname = document.getElementById("update-lname");
    let inputEmail = document.getElementById("update-email");
    let inputGender = document.getElementById("update-gender");
    let inputRaceEthnicity = document.getElementById("update-race-ethnicity");

    inputUsername.value = username;
    inputUserFname.value = firstName;
    inputUserLname.value = lastName;
    inputEmail.value = email;
    inputGender.value = gender;
    inputRaceEthnicity.value = raceEthnicity;

    inputUserFname.disabled = true;
    inputUserLname.disabled = true;

    // Set to true indicating the update user form is displayed
    isUpdateUserFormDisplayed = true;
}


// Handle cancel action when cancel button is clicked
function cancelUpdate() {
    // Go back to the previous page
    history.back();
    
    // Reload the page and clear the input fields
    location.reload();
}


// Function to hide the update user section and show the table
function hideUpdateSection() {
    let updateSection = document.getElementById('update');
    updateSection.style.display = 'none';

    let table = document.getElementById('users-table');
    table.style.display = 'table';

    // Set to true indicating the update user form is displayed
    isUpdateUserFormDisplayed = false;
    location.reload();
}
