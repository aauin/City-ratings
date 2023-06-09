-- Group 55 - Erwin Laird and Amanda Dohring - Project Step 3 DML.sql


-- Citation for code adapted from --CS340 Exploration - Database Application Design 
-- Date 5/10/2023
-- Source URL: https://canvas.oregonstate.edu/courses/1914747/pages/exploration-database-application-design?module_item_id=23040585


-- The following demonstrates SQL queries for various dropdown and CRUD operations for our database entities



------------------------------------
--  Dropdowns for Selecting FKs
------------------------------------

-- Select Usernames for dropdown for FK User ID
SELECT user_id, username FROM Users

-- Select City, State for dropdown for FK City ID
SELECT city_id, city, state FROM Cities

-- Category name for dropdown for FK Category ID
SELECT category_id, category_name FROM Categories




------------------------------------------------------------
--
--             CRUD Operations for Entities      
--
------------------------------------------------------------


------------------------------------
--             Users
------------------------------------

-- Browse all 
-- Displays all attributes for the Users entity
SELECT * FROM Users

-- Search for users information
SELECT user_id, username, user_fname, user_lname, email, gender, race_ethnicity FROM Users
    WHERE user_id = :user_id_selected_from_browse

-- New
-- Adds a new user into the Users entity with all attributes
INSERT INTO Users (username, user_fname, user_lname, email, gender, race_ethnicity)
VALUES (:usernameInput, :user_fnameInput, :user_lnameInput, :emailInput, :genderInput, :race_ethnicityInput)

-- Update
-- Updates or edits a user's data 
UPDATE Users
    SET username = :usernameInput, user_fname = user_fnameInput, user_lname = user_lnameInput, email = emailInput, gender = genderInput
    WHERE user_id = :user_id_from_the_update_form

-- Delete
-- Deletes a city from the Cities entity
DELETE FROM Users WHERE user_id = :user_id_selected_from_browse



------------------------------------
--             Cities
------------------------------------

-- Browse all 
-- Displays all attributes for the Cities entity
SELECT * FROM Cities

-- Search for city information
SELECT * FROM Cities
    WHERE city_id = :city_id_selected_from_browse

-- New
-- Adds a new city into the Cities entity with all attributes
INSERT INTO Cities (city, region, state, population, timezone)
VALUES (:cityInput, :regionInput, :stateInput, :populationInput, :timezoneInput)

-- Update
-- Updates or edits a city's data 
UPDATE Cities
    SET city = :cityInput, region = regionInput, state = stateInput, population = populationInput, timezone = timezoneInput
    WHERE city_id = :city_id_from_the_update_form

-- Delete
-- Deletes a city from the Cities entity
DELETE FROM Cities WHERE city_id = :city_id_selected_from_browse



------------------------------------
--          Users_Cities
------------------------------------

-- Browse all 
-- Displays all attributes for the Users_Cities entity
SELECT user_city_id, Users.username AS user_id, CONCAT(Cities.city,',', Cities.state) AS city_id, start_year, end_year, current_resident
FROM Users_Cities
INNER JOIN Users ON Users_Cities.user_id = Users.user_id
INNER JOIN Cities ON Users_Cities.city_id = Cities.city_id

-- New
-- Adds a new user into the Users entity with all attributes
INSERT INTO Users_Cities (user_id, city_id, start_year, end_year, current_resident)
VALUES (:user_id_from_dropdownInput, :city_id_from_dropdownInput, :start_yearInput, :end_yearInput, :current_residentInput)

-- Update
-- Updates or edits Users_Cities' data 
UPDATE Users_Cities
    SET user_id = :user_id_from_dropdownInput, city_id = :city_id_from_dropdownInput, start_year = :start_yearInput, end_year = :end_yearInput, current_resident = :current_residentInput
    WHERE user_city_id = :user_city_id_from_the_update_form

-- Delete
-- Deletes a relationship from the Users_Cities entity
DELETE FROM Users_Cities WHERE user_city_id = :user_city_id_selected_from_browse




------------------------------------
--            Reviews
------------------------------------

-- Browse all 
-- Displays all attributes for the Reviews entity
SELECT review_id, CONCAT(Cities.city,', ', Cities.state) AS city_id, Users.username AS user_id, 
    DATE_FORMAT(Reviews.date, '%m/%d/%y') AS date, review
FROM Reviews
INNER JOIN Cities ON Reviews.city_id = Cities.city_id
LEFT JOIN Users ON Reviews.user_id = Users.user_id;

-- New
-- Adds a new user into the Reviews entity with all attributes
INSERT INTO Reviews (city_id, user_id, date, review)
VALUES (:city_id_from_dropdownInput, :user_id_from_dropdownInput, :dateInput, :reviewInput)




------------------------------------
--            Ratings
------------------------------------

-- Browse all 
-- Displays all attributes for the Ratings entity
SELECT rating_id, CONCAT(Cities.city,', ', Cities.state) AS city_id, Categories.category_name AS category_id, Users.username AS user_id, score
FROM Ratings
INNER JOIN Cities ON Ratings.city_id = Cities.city_id
INNER JOIN Categories ON Ratings.category_id = Categories.category_id
INNER JOIN Users ON Ratings.user_id = Users.user_id
ORDER BY Ratings.rating_id ASC

-- New
-- Adds a new user into the Ratings entity with all attributes
INSERT INTO Ratings (city_id, category_id, score, user_id)
VALUES (:city_id_from_dropdownInput, :category_id_from_dropdownInput, :scoreInput, :user_id_from_dropdownInput)

-- Delete
-- Deletes a rating from the Ratings entity
DELETE FROM Ratings WHERE rating_id = :rating_id_selected_from_browse



------------------------------------
--           Categories
------------------------------------

-- Browse all 
-- Displays all attributes for the Categories entity
SELECT * FROM Categories

-- New
-- Adds a new user into the Users entity with all attributes
INSERT INTO Categories (category_name, category_description)
VALUES (:category_nameInput, category_descriptionInput)

-- Delete
-- Deletes a category from the Categories entity
DELETE FROM Categories WHERE category_id = :category_id_selected_from_browse







