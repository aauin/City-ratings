/*
    Group 55 - Erwin Laird and Amanda Dohring - Project Step 6

    Citation for code adapted from CS340 Node.js Starter App
    Date: 6/12/2023
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

// Get the objects we need to modify
let addCategoryForm = document.getElementById('add-category-form');


// Track if the add city form is displayed
let isAddCategoryFormDisplayed = false;


// Modify the objects we need
addCategoryForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-cat_name");
    let inputDescription = document.getElementById("input-description");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let descrValue = inputDescription.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        category_name: nameValue,
        category_description: descrValue,
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-category", true);
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
    let table = document.getElementById('categories-table');
    table.style.display = 'table';

    // Show the add icon
    let addIcon = document.getElementById('addIcon');
    addIcon.style.display = 'block';
});


// Event listener for the back button
window.addEventListener("popstate", function(event) {
    // Check if the add city form is displayed
    if (isAddCategoryFormDisplayed) {

        window.addEventListener("popstate", function(event) {
        if (isAddCategoryFormDisplayed) {
            location.reload();
        }});
    }
});


// Creates a single row from an Object representing a single record
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("categories-table");

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and cells
    let row = document.createElement("tr");
    let idCell = document.createElement("td");
    let nameCell = document.createElement("td");
    let descriptionCell = document.createElement("td");
    let deleteCell = document.createElement("td");

    // Fill the cells with correct data
    idCell.innerText = newRow.category_id;
    nameCell.innerText = newRow.category_name;
    descriptionCell.innerText = newRow.category_description;

    // Create delete cell
    deleteCell.innerHTML = `<a href="#" onClick="deleteCategory(${newRow.category_id})">
        <img src="/images/delete.png" alt="Delete" style="max-width: 15px; max-height: 80px; opacity: 0.7;" /></a>`;


    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(descriptionCell);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.category_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (city, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    // let selectMenu = document.getElementById("update-user-city");
    // let option = document.createElement("option");
    // option.text = newRow.city;
    // option.value = newRow.city_id;
    // selectMenu.add(option);
    // DO WE NEED TO ADD THIS !!!!!!!!!! 
};


// Handle insert action when add icon is clicked
function addCategory() {
    // Hide the browse section
    let browseSection = document.getElementById('browse');
    browseSection.style.display = 'none';
  
    // Hide the add icon
    let addIcon = document.getElementById('addIcon');
    addIcon.style.display = 'none';
    
    // Show the insert city form
    let insertSection = document.getElementById('insert');
    insertSection.style.display = 'block';

    // Set to true indicating the add rating form is displayed
    isAddCategoryFormDisplayed = true;
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
  
    let table = document.getElementById('ratings-table');
    table.style.display = 'table';

    // Set to false indicating the add city form is not displayed
    isAddCategoryFormDisplayed = false;
};
