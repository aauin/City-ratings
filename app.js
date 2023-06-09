/*
    Group 55 - Erwin Laird and Amanda Dohring - Project Step 6

    Citation for code adapted from CS340 Node.js Starter App
    Date: 6/12/2023
    Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
*/

/*
    SETUP
*/
const express   = require('express');   
const app       = express();            
const PORT      = 1150;                 
const db        = require('./database/db-connector');

const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs",}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

/*
    ROUTES
*/

/*
    GET requests to populate data for the various pages
*/

// Get the HomePage
app.get('/', function(req, res)
    {
        res.render('index');                    
    });                                         

// Get Users page
app.get('/users', function(req, res)
    {
        let queryGetUsers = "SELECT * FROM Users;";
        db.pool.query(queryGetUsers, function(error, rows, fields){
        
            res.render('users', {data: rows}); 
        })
                           
    });

// Get Cities page
app.get('/cities', function(req, res)
    {
        let queryGetCities = "SELECT * FROM Cities;";
        db.pool.query(queryGetCities, function(error, rows, fields){
        
            res.render('cities', {data: rows}); 
        })
                        
    });

// Get Users-Cities page
app.get('/users_cities', function(req, res)
{
    let queryGetUsersCities =  `SELECT user_city_id, Users.username AS user_id, CONCAT(Cities.city,', ', Cities.state) AS city_id, start_year, end_year, current_resident
                                FROM Users_Cities
                                INNER JOIN Users ON Users_Cities.user_id = Users.user_id
                                INNER JOIN Cities ON Users_Cities.city_id = Cities.city_id;`
    
    let queryGetAllCities = `SELECT * FROM Cities;`;

    let queryGetAllUsers = `SELECT * FROM Users;`;

    db.pool.query(queryGetUsersCities, function(error, rows, fields){
        let usersCities = rows;

        db.pool.query(queryGetAllUsers, function(error, rows, fields){
            let users = rows;

            db.pool.query(queryGetAllCities, function(error, rows, fields){
                let cities = rows;
                res.render('users_cities', {data: usersCities, users: users, cities: cities}); 
                console.log(rows)
            })
        })
        
    })                   
});

// Get Reviews page
app.get('/reviews', function(req, res)
{
    let queryGetReviews =  `SELECT review_id, 
                            CONCAT(Cities.city,', ', Cities.state) AS city_id, 
                            Users.username AS user_id, 
                            DATE_FORMAT(Reviews.date, '%m/%d/%y') AS date, 
                            review
                            FROM Reviews
                            INNER JOIN Cities ON Reviews.city_id = Cities.city_id
                            LEFT JOIN Users ON Reviews.user_id = Users.user_id;`
    
    let queryGetUsers = `SELECT * FROM Users;`;

    let queryGetCities = `SELECT * FROM Cities;`;

    db.pool.query(queryGetReviews, function(error, rows, fields){
        let reviews = rows;

        db.pool.query(queryGetUsers, function(error, rows, fields){
            let users = rows;

            db.pool.query(queryGetCities, function(error, rows, fields){
                let cities = rows;
                res.render('reviews', {data: reviews, users: users, cities: cities}); 
                console.log(rows)
            })
        })
        
    })                   
});


// Get Categories page
app.get('/categories', function(req, res)
    {   let queryGetCategories =    `SELECT * FROM Categories;`;
        db.pool.query(queryGetCategories, function(error, rows, fields){
        
            res.render('categories', {data: rows}); 
        });

    });

// Get Ratings page
app.get('/ratings', function(req, res)
{   
    let queryGetRatings =  `SELECT rating_id, CONCAT(Cities.city,', ', Cities.state) AS city_id, Categories.category_name AS category_id, score, Users.username AS user_id
                            FROM Ratings
                            INNER JOIN Cities ON Ratings.city_id = Cities.city_id
                            INNER JOIN Categories ON Ratings.category_id = Categories.category_id
                            INNER JOIN Users ON Ratings.user_id = Users.user_id
                            ORDER BY Ratings.rating_id ASC`;
    
    let queryGetCities = `SELECT * FROM Cities;`;

    let queryGetCategories = `SELECT * FROM Categories;`;

    let queryGetUsers =     `SELECT * FROM Users;`;

    db.pool.query(queryGetRatings, function(error, rows, fields){
        let ratings = rows;

        db.pool.query(queryGetCities, function(error, rows, fields){
            let cities = rows;

            db.pool.query(queryGetCategories, function(error, rows, fields){
                let categories = rows;

                db.pool.query(queryGetUsers, function(error, rows, fields){
                    let users = rows;
                    res.render('ratings', {data: ratings, cities: cities, categories: categories, users: users});
                })
            })
        })
    });                      
});


/*
    POST to ADD/INSERT data into various entities/pages
*/

// POST to Add/INSERT into Users table
app.post('/add-user', function(req, res)
{
    let data = req.body;

    // Setup query to INSERT the VALUES
    addUserQuery = `INSERT INTO Users (username, user_fname, user_lname, email, gender, race_ethnicity)
                    VALUES ('${data.username}', '${data.user_fname}', '${data.user_lname}', 
                            '${data.email}', '${data.gender}', '${data.race_ethnicity}');`
    db.pool.query(addUserQuery, function(error, rows, fields){

        if(error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            addNewUserQuery = `SELECT * FROM Users;`;
            db.pool.query(addNewUserQuery, function(error, rows, fields){
                if(error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// POST to Add/INSERT into Cities table
app.post('/add-city', function(req, res)
{
    let data = req.body;

    // Setup query to INSERT the VALUES
    addCityQuery = `INSERT INTO Cities (city, state, region, population, timezone)
                    VALUES ('${data.city}', '${data.state}', '${data.region}', 
                            '${data.population}', '${data.timezone}');`
    db.pool.query(addCityQuery, function(error, rows, fields){

        if(error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            addNewCityQuery = `SELECT * FROM Cities;`;
            db.pool.query(addNewCityQuery, function(error, rows, fields){
                if(error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// POST to Add/INSERT into Users-Cities table
app.post('/add-user-city', function(req, res) {
    let data = req.body;

    // Setup query to INSERT the VALUES
    addUserCityQuery = `INSERT INTO Users_Cities (user_id, city_id, start_year, end_year, current_resident)
                        VALUES ('${data.user_id}', '${data.city_id}', '${data.start_year}', 
                                '${data.end_year}', '${data.current_resident}');`;

    db.pool.query(addUserCityQuery, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            addNewUserCityQuery = `SELECT user_city_id, Users.username AS user_id, CONCAT(Cities.city,', ', Cities.state) AS city_id, start_year, end_year, current_resident
                                    FROM Users_Cities
                                    INNER JOIN Users ON Users_Cities.user_id = Users.user_id
                                    INNER JOIN Cities ON Users_Cities.city_id = Cities.city_id;`;
            db.pool.query(addNewUserCityQuery, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});



// POST to Add/INSERT into Reviews table
app.post('/add-review', function(req, res)
{
    let data = req.body;

    // Account for NULL values
    let user = parseInt(data.user_id);
    if (isNaN(user)) {
        user = 'NULL'
    };

    // Setup query to INSERT the VALUES
    addReviewQuery =    `INSERT INTO Reviews (city_id, user_id, date, review)
                        VALUES ('${data.city_id}', '${data.user_id}', '${data.date}', '${data.review}');`

    db.pool.query(addReviewQuery, function(error, rows, fields){

        if(error) {
            console.log("insert query error", error)
            res.sendStatus(400);
        }
        else
        {
            addNewReviewQuery =     `SELECT review_id, 
                                    CONCAT(Cities.city,', ', Cities.state) AS city_id, 
                                    Users.username AS user_id, 
                                    DATE_FORMAT(Reviews.date, '%m/%d/%y') AS date, 
                                    review
                                    FROM Reviews
                                    INNER JOIN Cities ON Reviews.city_id = Cities.city_id
                                    LEFT JOIN Users ON Reviews.user_id = Users.user_id;`;
            db.pool.query(addNewReviewQuery, function(error, rows, fields){
                if(error) {
                    console.log("add new error", error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


// POST to Add/INSERT into Ratings table
app.post('/add-rating', function(req, res)
{
    let data = req.body;

    // Account for NULL values


    // Setup query to INSERT the VALUES
    addRatingQuery =    `INSERT INTO Ratings (city_id, category_id, score, user_id)
                        VALUES ('${data.city_id}', '${data.category_id}', '${data.score}', '${data.user_id}');`

    db.pool.query(addRatingQuery, function(error, rows, fields){

        if(error) {
            console.log("first query error", error)
            res.sendStatus(400);
        }
        else
        {
            addNewRatingQuery = `SELECT rating_id, CONCAT(Cities.city,', ', Cities.state) AS city_id, Categories.category_name AS category_id, score, Users.username AS user_id
                                FROM Ratings
                                INNER JOIN Cities ON Ratings.city_id = Cities.city_id
                                INNER JOIN Categories ON Ratings.category_id = Categories.category_id
                                INNER JOIN Users ON Ratings.user_id = Users.user_id
                                ORDER BY Ratings.rating_id ASC`;

            db.pool.query(addNewRatingQuery, function(error, rows, fields){
                if(error) {
                    console.log("add new error", error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// POST to Add/INSERT into Categories table
app.post('/add-category', function(req, res)
{
    let data = req.body;

    // Setup query to INSERT the VALUES
    addCategoryQuery = `INSERT INTO Categories (category_name, category_description)
                        VALUES ('${data.category_name}', '${data.category_description}');`

    db.pool.query(addCategoryQuery, function(error, rows, fields){

        if(error) {
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            addNewCategoryQuery = `SELECT * FROM Categories;`;
            db.pool.query(addNewCategoryQuery, function(error, rows, fields){
                if(error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});
  
  
  
  
/*
    UPDATE Requests
*/

// Update User
app.put('/put-user/:user_id', function(req, res) {
    let data = req.body;
    let user_id = parseInt(req.params.user_id);
    let usernameInput = data.username;
    let user_fnameInput = data.user_fname;
    let user_lnameInput = data.user_lname;
    let emailInput = data.email;
    let genderInput = data.gender;
    let race_ethnicityInput = data.race_ethnicity;
  
    let updateUserQuery =   `UPDATE Users
                            SET username = ?, user_fname = ?, user_lname = ?, email = ?, gender = ?, race_ethnicity = ?
                            WHERE user_id = ?`;
  
    // Run query
    db.pool.query(updateUserQuery, [usernameInput, user_fnameInput, user_lnameInput, emailInput, genderInput, race_ethnicityInput, user_id], (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.sendStatus(400);
      } else {
        // Update was successful
        res.sendStatus(200);
      }
    });
});

// Update City
app.put('/put-city/:city_id', function(req, res) {
    let data = req.body;
    let city_id = parseInt(req.params.city_id);
    let cityInput = data.city;
    let stateInput = data.state;
    let regionInput = data.region;
    let populationInput = data.population;
    let timezoneInput = data.timezone;
  
    let updateCityQuery =   `UPDATE Cities
                            SET city = ?, state = ?, region = ?, population = ?, timezone = ?
                            WHERE city_id = ?`;
  
    // Run query
    db.pool.query(updateCityQuery, [cityInput, stateInput, regionInput, populationInput, timezoneInput, city_id], (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.sendStatus(400);
      } else {
        // Update was successful
        res.sendStatus(200);
      }
    });
});


// Update User-City
app.put('/put-user-city/:user_city_id', function(req, res) {
    let data = req.body;
    let user_city_id = parseInt(req.params.user_city_id);
    let userInput = data.user_id
    let cityInput = data.city_id;
    let startYearInput = data.start_year;
    let endYearInput = data.end_year;
    let currentResidentInput = data.current_resident;
  
    let updateUserCityQuery =   `UPDATE Users_Cities
                                SET user_id = ?, city_id = ?, start_year = ?, end_year = ?, current_resident = ?
                                WHERE user_city_id = ?`;
  
    // Run query
    db.pool.query(updateUserCityQuery, [userInput, cityInput, startYearInput, endYearInput, currentResidentInput, user_city_id], (error, results) => {
      if (error) {
        console.error(error);
        // Handle the error
        res.sendStatus(400);
      } else {
        // Update was successful
        res.sendStatus(200);
      }
    });
});
  

/*
    DELETE Requests
*/

// Delete User
app.delete('/delete-user/:user_id', function(req, res) {
    
    let deleteUser = `DELETE FROM Users WHERE user_id = ?`;

    db.pool.query(deleteUser, [req.params.user_id], function(error) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

// Delete City
app.delete('/delete-city/:city_id', function(req, res) {
    console.log("Here is delete route");
    let deleteCity = `DELETE FROM Cities WHERE city_id = ?`;

    db.pool.query(deleteCity, [req.params.city_id], function(error) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

// Delete User City
app.delete('/delete-user-city/:user_city_id', function(req, res) {
    
    let deleteUserCity = `DELETE FROM Users_Cities WHERE user_city_id = ?`;

    db.pool.query(deleteUserCity, [req.params.user_city_id], function(error) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

// Delete Review
app.delete('/delete-review/:review_id', function(req, res) {
    
    let deleteReview = `DELETE FROM Reviews WHERE review_id = ?`;

    db.pool.query(deleteReview, [req.params.review_id], function(error) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

// Delete Rating
app.delete('/delete-rating/:rating_id', function(req, res) {
    
    let deleteRating = `DELETE FROM Ratings WHERE rating_id = ?`;

    db.pool.query(deleteRating, [req.params.rating_id], function(error) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
            console.log("delete successful")
        }
    })
});

// Delete Category
app.delete('/delete-category/:category_id', function(req, res) {

    let deleteCategory = `DELETE FROM Categories WHERE category_id = ?`;

    db.pool.query(deleteCategory, [req.params.category_id], function(error) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});


/*
    LISTENER
*/
app.listen(PORT, function(){            
    // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
