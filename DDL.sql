-- Group 55 - Erwin Laird and Amanda Dohring - Project Step 2, Project Step 3 DDL.sql

-- Citation for city population data:
-- Data for city populations taken from 'List of United States Cities by Population'
-- Date: 5/1/2023
-- Source URL: https://en.wikipedia.org/wiki/List_of_United_States_cities_by_population

-- Citation for code adapted from CS340 Project Step 2 Draft Assignment Guidelines
-- Date 5/3/2023
-- Source URL: https://canvas.oregonstate.edu/courses/1914747/assignments/9180999?module_item_id=23040579
-- The following uses Create or Replace to create our various entities


SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;




-- --------------------------------------------------------------------------
-- -------------------------   Create tables   ------------------------------
-- --------------------------------------------------------------------------


-- Cities
CREATE OR REPLACE TABLE `Cities` (
    `city_id` int NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `city` varchar(45) NOT NULL,
    `state` varchar(45) NOT NULL,
    `region` varchar(45) NOT NULL,
    `population` int NOT NULL,
    `timezone` varchar(45) NOT NULL
) ENGINE=InnoDB;


-- Users
CREATE OR REPLACE TABLE `Users` (
    `user_id` int NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(45) UNIQUE NOT NULL,
    `user_fname` varchar(45) NOT NULL,
    `user_lname` varchar(45) NOT NULL,
    `email` varchar(145) NOT NULL,
    `gender` varchar(45) NOT NULL,
    `race_ethnicity` varchar(145) NOT NULL
) ENGINE=InnoDB;


-- User_Cities (intersection table between M:M Users and Cities)
CREATE OR REPLACE TABLE `Users_Cities` (
    `user_city_id` int NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `user_id` int NOT NULL,
    `city_id` int NOT NULL,
    `start_year` year NOT NULL,
    `end_year` varchar(4),
    `current_resident` boolean NOT NULL,
    CONSTRAINT fk_uc_user_id 
        FOREIGN KEY (user_id)
        REFERENCES Users(user_id)
        ON DELETE CASCADE,  -- Delete relationship with city when user is deleted
    CONSTRAINT fk_uc_city_id 
        FOREIGN KEY (city_id)
        REFERENCES Cities(city_id)
        ON DELETE CASCADE  -- Delete relationship with user when city is deleted
) ENGINE=InnoDB;


-- Reviews
CREATE OR REPLACE TABLE `Reviews` (
    `review_id` int NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `city_id` int NOT NULL,
    `user_id` int,
    `date` date NOT NULL,
    `review` varchar(1000) NOT NULL, 
    CONSTRAINT fk_rev_city_id 
        FOREIGN KEY (city_id) 
        REFERENCES Cities(city_id)
        ON DELETE CASCADE,  -- Delete review when city is deleted
    CONSTRAINT fk_rev_user_id 
        FOREIGN KEY (user_id) 
        REFERENCES Users(user_id)
        ON DELETE SET NULL  -- Keep review even when user is deleted
) ENGINE=InnoDB;


-- Categories
CREATE OR REPLACE TABLE `Categories` (
    `category_id` int NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `category_name` varchar(45) NOT NULL,
    `category_description` varchar(500) NOT NULL
) ENGINE=InnoDB;


-- Ratings
CREATE OR REPLACE TABLE `Ratings` (
    `rating_id` int NOT NULL UNIQUE AUTO_INCREMENT PRIMARY KEY,
    `city_id` int NOT NULL,
    `category_id` int NOT NULL,
    `score` tinyint(5) NOT NULL,
    `user_id` int NOT NULL,
    CHECK (score >= 1 AND score <= 5),
    CONSTRAINT fk_rat_city_id
        FOREIGN KEY (city_id) 
        REFERENCES Cities(city_id)
        ON DELETE CASCADE,  -- Delete rating when city is deleted
    CONSTRAINT fk_rat_user_id
        FOREIGN KEY (user_id) 
        REFERENCES Users(user_id)
        ON DELETE CASCADE,  -- Delete rating when user is deleted
    CONSTRAINT fk_rat_category_id
        FOREIGN KEY (category_id) 
        REFERENCES Categories(category_id)
        ON DELETE CASCADE  -- Delete rating when category is deleted
) ENGINE=InnoDB;




-- --------------------------------------------------------------------------
-- ------------------------   Populate tables   -----------------------------
-- --------------------------------------------------------------------------


-- Cities data
INSERT INTO `Cities` (`city`, `state`, `region`, `population`, `timezone`) VALUES
('Boston', 'Massachusetts', 'New England', 654776, 'Eastern'),
('Buffalo', 'New York', 'Mideast', 276807, 'Eastern'),
('Madison', 'Wisconsin', 'Great Lakes', 269196, 'Central'),
('Minneapolis', 'Minnesota', 'Plains', 425336, 'Central'),
('New Orleans', 'Louisiana', 'Southeast', 376971, 'Central'),
('Austin', 'Texas', 'Southwest', 946177, 'Central'),
('Denver', 'Colorado', 'Rocky Mountain', 711463, 'Mountain'),
('San Francisco', 'California', 'Far West', 815201, 'Pacific');


-- Users data
INSERT INTO `Users` (`username`, `user_fname`, `user_lname`, `email`, `gender`, `race_ethnicity`) VALUES
('AngularVisage', 'Laura', 'Kim', 'kimlau@gmail.com', 'Female', 'Asian'),
('TigerKnife', 'Xavier', 'Habib', 'xavierhabib@gmail.com', 'Male', 'Prefer not to answer'),
('blissful_sunset', 'Emily', 'Green', 'emilyyyyy@yahoo.com', 'Non-Binary', 'White, non-Hispanic'),
('terribleP3t', 'Tyrone', 'Lee', 'killer_gudlooks@hotmail.com', 'Male', 'Black or African-American'),
('Viscarte', 'Olivia', 'Jackson', 'olivia_jackson_223@gmail.com', 'Decline to state', 'White, non-Hispanic'),
('Kitties_Only', 'Mauricio', 'Rodriguez', 'pmaumau@mindspring.com', 'Male', 'Hispanic or Latino'),
('wirelucy', 'Sofia', 'Patel', 'wirelucysp@yahoo.com', 'Female', 'Two or more races, non-Hispanic'),
('anon78654', 'Ethan', 'Thongkham', 'thongkhame2@gmail.com', 'Non-Binary', 'Asian');


-- Users_Cities data
INSERT INTO `Users_Cities` (`user_id`, `city_id`, `start_year`, `end_year`, `current_resident`) VALUES
(   (SELECT user_id FROM `Users` WHERE username = 'AngularVisage'),
    (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    2006,
    NULL,
    TRUE
),
(   (SELECT user_id FROM `Users` WHERE username = 'TigerKnife'),
    (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    1997,
    2010,
    FALSE
),
(   (SELECT user_id FROM `Users` WHERE username = 'TigerKnife'),
    (SELECT city_id FROM `Cities` WHERE `city` = 'Buffalo' AND `state` = 'New York'),
    2010,
    NULL,
    TRUE
),
(   (SELECT user_id FROM `Users` WHERE username = 'terribleP3t'),
    (SELECT city_id FROM `Cities` WHERE `city` = 'Minneapolis' AND `state` = 'Minnesota'),
    2013,
    NULL,
    TRUE
),
(   (SELECT user_id FROM `Users` WHERE username = 'Viscarte'),
    (SELECT city_id FROM `Cities` WHERE `city` = 'New Orleans' AND `state` = 'Louisiana'),
    2018,
    NULL,
    TRUE
),
(   (SELECT user_id FROM `Users` WHERE username = 'Kitties_Only'),
    (SELECT city_id FROM `Cities` WHERE `city` = 'Austin' AND `state` = 'Texas'),
    1984,
    2015,
    FALSE
);


-- Reviews data
INSERT INTO `Reviews` (`user_id`, `city_id`, `date`, `review`) VALUES
(   (SELECT user_id FROM `Users` WHERE username = 'AngularVisage'),
    (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    '2023-01-23',
    'Boston is a fantastic place to live. The city is vibrant, diverse, and filled with opportunities. The cost of living may be a bit high, but it is worth it for the quality of life that the city offers. Boston has excellent schools, beautiful parks, and a rich history that is woven into the fabric of the city. The food scene is incredible, with a range of options from local seafood to international cuisine. Public transportation is reliable and extensive, making it easy to get around without a car. Overall, Boston is a top-notch place to call home.'
),
(   (SELECT user_id FROM `Users` WHERE username = 'AngularVisage'),
    (SELECT city_id FROM `Cities` WHERE `city` = 'Buffalo' AND `state` = 'New York'),
    '2023-02-04',
    "Buffalo is a hidden gem of a city. The neighborhoods are full of character and charm, and the locals are incredibly friendly. The food scene is top-notch, with some of the best wings and pizza you'll ever taste. The city is also rich in history, with many historic sites and museums to explore. Housing is affordable and there are many great schools in the area. Buffalo may not be the first city that comes to mind when thinking of places to live, but it's definitely worth considering."
),
(   (SELECT user_id FROM `Users` WHERE username = 'AngularVisage'),
    (SELECT city_id FROM `Cities` WHERE `city` = 'Madison' AND `state` = 'Wisconsin'),
    '2023-02-05',
    "As a resident of this city, I can say with confidence that it's a fantastic place to live. Madison offers a unique blend of city and small-town charm, with plenty of great restaurants, coffee shops, and local businesses to explore. The community is welcoming and friendly, and there's always something to do or see. Whether you're into outdoor activities like hiking and biking or prefer cultural experiences like visiting museums and attending concerts, Madison has it all. And if you're a fan of the University of Wisconsin-Madison, you'll love the excitement that comes with living in a college town."
),
(   (SELECT user_id FROM `Users` WHERE username = 'terribleP3t'),
    (SELECT city_id FROM `Cities` WHERE `city` = 'Minneapolis' AND `state` = 'Minnesota'),
    '2023-02-27',
    "I lived in Minneapolis for 13 years and it was one of the worst experiences of my life. The cost of living was incredibly high, and I found it difficult to afford even basic necessities. The job market was also tough, and it was a struggle to find work that paid enough to support myself. In addition, the winters were brutal and seemed to last forever, making it difficult to enjoy any outdoor activities. On top of that, I didn't feel safe in certain parts of the city and there were several incidents of crime in my neighborhood. Overall, I would not recommend Minneapolis as a place to live."
),
(   (SELECT user_id FROM `Users` WHERE username = 'Viscarte'),
    (SELECT city_id FROM `Cities` WHERE `city` = 'New Orleans' AND `state` = 'Louisiana'),
    '2023-03-01',
    "I recently moved to New Orleans and it's been nothing but a disappointment. The crime rate is so high that I can't even leave my apartment after dark. The heat and humidity are unbearable for most of the year and there's not enough green spaces to escape the concrete jungle. The streets are littered with garbage and the public transportation system is a nightmare. Finding affordable housing in a safe neighborhood is nearly impossible. The job market is weak and there's a lack of opportunities for professionals. Overall, I regret moving to New Orleans and would not recommend it as a place to live."
),
(   (SELECT user_id FROM `Users` WHERE username = 'Kitties_Only'),
    (SELECT city_id FROM `Cities` WHERE `city` = 'Austin' AND `state` = 'Texas'),
    '2023-03-15',
    "Austin has been my home for over 30 years and it has been a good place to live. The weather can be hot and humid during the summer months, but overall the climate is mild and enjoyable. The city has grown significantly during the time I have lived here, which has led to increased traffic and some issues with infrastructure. However, the people are friendly and there is a lot to do here, from hiking and biking on the many trails to enjoying live music and great food. While I have enjoyed my time in Austin, I have also seen it change a lot over the years and some of the character that made it special has been lost."
);


-- Categories data
INSERT INTO `Categories` (`category_name`, `category_description`) VALUES
(   'Cost of Living',
    "The amount of money required to maintain a certain standard of living in a particular area. It takes into account factors such as housing, food, utilities, transportation, and other expenses."
),
(   'Crime',
    "The level of criminal activity and the safety of a particular area. Crime rates can be measured by the number of reported incidents of various types of crime, such as property crime or violent crime."
),
(   'Housing',
    "The availability and affordability of housing in a particular area. It includes factors such as the median home price, the average rent for apartments, the availability of affordable housing, and the quality of housing."
),
(   'Employment',
    "The job market in a particular area, including the number of available jobs, the types of jobs available, and the average wages and salaries for those jobs."
),
(   'Schools',
    "The quality and availability of education in a particular area, including the availability of schools, the quality of teachers, and the quality of educational resources."
),
(   'Culture/Amenities',
    "The availability of cultural and recreational activities in a particular area, including museums, theaters, parks, and other amenities. It also includes the diversity and vibrancy of the local community."
);


-- Ratings data
INSERT INTO `Ratings` (`city_id`, `category_id`, `score`, `user_id`) VALUES
(   (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    (SELECT category_id FROM `Categories` WHERE category_name = 'Cost of Living'),
    2,
    (SELECT user_id FROM `Users` WHERE username = 'AngularVisage')
),
(   (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    (SELECT category_id FROM `Categories` WHERE category_name = 'Crime'),
    2,
    (SELECT user_id FROM `Users` WHERE username = 'AngularVisage')
),
(   (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    (SELECT category_id FROM `Categories` WHERE category_name = 'Housing'),
    1,
    (SELECT user_id FROM `Users` WHERE username = 'AngularVisage')
),
(   (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    (SELECT category_id FROM `Categories` WHERE category_name = 'Employment'),
    3,
    (SELECT user_id FROM `Users` WHERE username = 'AngularVisage')
),
(   (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    (SELECT category_id FROM `Categories` WHERE category_name = 'Schools'),
    5,
    (SELECT user_id FROM `Users` WHERE username = 'AngularVisage')
),
(   (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    (SELECT category_id FROM `Categories` WHERE category_name = 'Culture/Amenities'),
    4,
    (SELECT user_id FROM `Users` WHERE username = 'AngularVisage')
),
(   (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    (SELECT category_id FROM `Categories` WHERE category_name = 'Cost of Living'),
    3,
    (SELECT user_id FROM `Users` WHERE username = 'TigerKnife')
),
(   (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    (SELECT category_id FROM `Categories` WHERE category_name = 'Crime'),
    3,
    (SELECT user_id FROM `Users` WHERE username = 'TigerKnife')
),
(   (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    (SELECT category_id FROM `Categories` WHERE category_name = 'Housing'),
    2,
    (SELECT user_id FROM `Users` WHERE username = 'TigerKnife')
),
(   (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    (SELECT category_id FROM `Categories` WHERE category_name = 'Employment'),
    3,
    (SELECT user_id FROM `Users` WHERE username = 'TigerKnife')
),
(   (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    (SELECT category_id FROM `Categories` WHERE category_name = 'Schools'),
    5,
    (SELECT user_id FROM `Users` WHERE username = 'TigerKnife')
),
(   (SELECT city_id FROM `Cities` WHERE `city` = 'Boston' AND `state` = 'Massachusetts'),
    (SELECT category_id FROM `Categories` WHERE category_name = 'Culture/Amenities'),
    5,
    (SELECT user_id FROM `Users` WHERE username = 'TigerKnife')
);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;
